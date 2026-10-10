import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { VENUE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { LangSwitch } from "./LangSwitch";

function useRomeClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const f = () => setTime(new Intl.DateTimeFormat("it-IT", { timeZone: VENUE.timeZone, hour: "2-digit", minute: "2-digit" }).format(new Date()));
    f();
    const id = setInterval(f, 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function Wordmark() {
  const { t } = useI18n();
  return (
    <Link to="/" className="flex flex-col leading-none">
      <span className="font-display text-2xl font-semibold text-primary">Divin Ostilia</span>
      <span className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground">{t("identity")}</span>
    </Link>
  );
}

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const time = useRomeClock();
  const links = [
    { to: "/", label: t("nav_home") },
    { to: "/menu", label: t("nav_menu") },
    { to: "/booking", label: t("nav_booking") },
    { to: "/contact", label: t("nav_contact") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Wordmark />
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: true }} className="text-sm font-medium text-foreground/80 hover:text-primary" activeProps={{ className: "text-primary" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href={VENUE.tel} className="hidden items-center gap-1.5 text-sm text-foreground/80 hover:text-primary lg:flex">
            <Phone className="size-4" /> {VENUE.phone}
          </a>
          <LangSwitch />
          <Button asChild><Link to="/booking">{t("reserve")}</Link></Button>
        </div>
        <button type="button" className="md:hidden" aria-label={open ? t("close_menu") : t("open_menu")} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-background px-5 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="border-b py-3 font-display text-2xl" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <Button asChild size="lg" className="mt-5 w-full"><Link to="/booking" onClick={() => setOpen(false)}>{t("reserve_table")}</Link></Button>
          <div className="mt-5 flex items-center justify-between">
            <a href={VENUE.tel} className="flex items-center gap-2 text-sm"><Phone className="size-4" /> {VENUE.phone}</a>
            <LangSwitch />
          </div>
          {time && <p className="mt-3 text-xs text-muted-foreground">{t("rome_time")}: {time}</p>}
        </div>
      )}
    </header>
  );
}
