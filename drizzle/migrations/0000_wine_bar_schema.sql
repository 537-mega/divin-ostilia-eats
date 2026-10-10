create type public.app_role as enum ('admin', 'staff');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create policy "Users read own roles" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

-- Single place for booking rules
create or replace function public.booking_capacity() returns int language sql immutable as $$ select 10 $$;
create or replace function public.booking_max_party() returns int language sql immutable as $$ select 4 $$;
create or replace function public.booking_slots() returns text[] language sql immutable as
$$ select array['12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00'] $$;

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  time text not null,
  guests int not null check (guests > 0 and guests <= 50),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 255),
  phone text check (phone is null or char_length(phone) <= 40),
  notes text check (notes is null or char_length(notes) <= 1000),
  status text not null default 'confirmed' check (status in ('confirmed','cancelled')),
  source text not null default 'online' check (source in ('online','staff')),
  created_at timestamptz not null default now()
);
create index bookings_date_idx on public.bookings(date, status);
grant select, insert, update, delete on public.bookings to authenticated;
grant all on public.bookings to service_role;
alter table public.bookings enable row level security;
create policy "Admins manage bookings" on public.bookings for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.seat_holds (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  time text not null,
  seats int not null check (seats > 0),
  booking_id uuid references public.bookings(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index seat_holds_date_idx on public.seat_holds(date, time);
grant select, insert, update, delete on public.seat_holds to authenticated;
grant all on public.seat_holds to service_role;
alter table public.seat_holds enable row level security;
create policy "Admins manage holds" on public.seat_holds for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.closures (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  time text not null default 'all',
  reason text check (reason is null or char_length(reason) <= 500),
  created_at timestamptz not null default now(),
  unique (date, time)
);
grant select, insert, update, delete on public.closures to authenticated;
grant all on public.closures to service_role;
alter table public.closures enable row level security;
create policy "Admins manage closures" on public.closures for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.menu_content (
  id int primary key default 1 check (id = 1),
  data jsonb not null,
  updated_at timestamptz not null default now()
);
grant select on public.menu_content to anon, authenticated;
grant insert, update, delete on public.menu_content to authenticated;
grant all on public.menu_content to service_role;
alter table public.menu_content enable row level security;
create policy "Anyone reads menu" on public.menu_content for select to anon, authenticated using (true);
create policy "Admins insert menu" on public.menu_content for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update menu" on public.menu_content for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete menu" on public.menu_content for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Public availability: counts only, never guest details or closure reasons
create or replace function public.get_availability(p_date date)
returns table(slot text, held int, remaining int, state text, capacity int, max_party int)
language sql stable security definer set search_path = public
as $$
  with s as (select unnest(public.booking_slots()) as slot),
  h as (select time, coalesce(sum(seats),0)::int as held from public.seat_holds where date = p_date group by time),
  c as (select time from public.closures where date = p_date),
  nowr as (select (now() at time zone 'Europe/Rome') as ts)
  select s.slot,
    coalesce(h.held,0),
    greatest(public.booking_capacity() - coalesce(h.held,0), 0),
    case
      when exists (select 1 from c where c.time = 'all' or c.time = s.slot) then 'closed'
      when (p_date + s.slot::time) <= (select ts from nowr) then 'past'
      when coalesce(h.held,0) >= public.booking_capacity() then 'full'
      else 'open' end,
    public.booking_capacity(),
    public.booking_max_party()
  from s left join h on h.time = s.slot
  order by s.slot;
$$;
grant execute on function public.get_availability(date) to anon, authenticated;

-- Atomic booking creation: serialises per slot with an advisory lock
create or replace function public.create_booking(
  p_date date, p_time text, p_guests int, p_name text, p_email text,
  p_phone text default null, p_notes text default null, p_source text default 'online')
returns json language plpgsql security definer set search_path = public
as $$
declare v_held int; v_id uuid; v_is_admin boolean := public.has_role(auth.uid(), 'admin');
begin
  if p_source not in ('online','staff') then raise exception 'invalid_source'; end if;
  if p_source = 'staff' and not v_is_admin then raise exception 'forbidden'; end if;
  if not (p_time = any(public.booking_slots())) then raise exception 'invalid_time'; end if;
  if p_guests < 1 then raise exception 'invalid_guests'; end if;
  if p_source = 'online' and p_guests > public.booking_max_party() then raise exception 'party_too_large'; end if;
  if coalesce(trim(p_name),'') = '' or p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' then raise exception 'invalid_contact'; end if;
  if p_source = 'online' and (p_date + p_time::time) <= (now() at time zone 'Europe/Rome') then raise exception 'slot_past'; end if;

  perform pg_advisory_xact_lock(hashtext(p_date::text || p_time));

  if exists (select 1 from public.closures where date = p_date and (time = 'all' or time = p_time)) then
    raise exception 'slot_closed';
  end if;
  select coalesce(sum(seats),0) into v_held from public.seat_holds where date = p_date and time = p_time;
  if v_held + p_guests > public.booking_capacity() then raise exception 'slot_full'; end if;

  insert into public.bookings(date, time, guests, name, email, phone, notes, source)
  values (p_date, p_time, p_guests, trim(p_name), trim(p_email), nullif(trim(p_phone),''), nullif(trim(p_notes),''), p_source)
  returning id into v_id;
  insert into public.seat_holds(date, time, seats, booking_id) values (p_date, p_time, p_guests, v_id);
  return json_build_object('id', v_id);
end;
$$;
grant execute on function public.create_booking(date,text,int,text,text,text,text,text) to anon, authenticated;

create or replace function public.cancel_booking(p_id uuid)
returns void language plpgsql security definer set search_path = public
as $$
begin
  if not public.has_role(auth.uid(), 'admin') then raise exception 'forbidden'; end if;
  update public.bookings set status = 'cancelled' where id = p_id;
  delete from public.seat_holds where booking_id = p_id;
end;
$$;
grant execute on function public.cancel_booking(uuid) to authenticated;

alter publication supabase_realtime add table public.bookings;
alter publication supabase_realtime add table public.seat_holds;
alter publication supabase_realtime add table public.closures;
