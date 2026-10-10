import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { PageHeading, PublicLayout } from "@/components/site/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { availabilityQuery, DEFAULT_MAX_PARTY, UNAVAILABLE_ERRORS, type Slot } from "@/lib/availability";
import { useI18n, type Key } from "@/lib/i18n";
import { formatDate, romeToday, VENUE } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a table · Divin Ostilia Wine Bar" },
      { name: "description", content: "Reserve a table online at Divin Ostilia Wine Bar, Via Ostilia 4, Rome." },
      { property: "og:title", content: "Book a table · Divin Ostilia Wine Bar" },
      { property: "og:description", content: "Reserve a table online for up to 4 guests." },
    ],
  }),
  component: Booking,
});

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function slotLabel(s: Slot, guests: number): Key | null {
  if (s.state === "closed") return "closed";
  if (s.state === "past") return "past";
  if (s.state === "full") return "full";
  if (s.remaining < guests) return "too_few";
  return null;
}

function Booking() {
  const { t, lang } = useI18n();
  const qc = useQueryClient();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(romeToday());
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const avail = useQuery({ ...availabilityQuery(date), enabled: step >= 2 });
  const maxParty = avail.data?.[0]?.max_party ?? DEFAULT_MAX_PARTY;
  const usable = (avail.data ?? []).filter((s) => !slotLabel(s, guests));

  const steps: Key[] = ["step_party", "step_time", "step_details", "step_done"];

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (saving || !time) return;
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = t("err_required");
    if (!form.email.trim()) errs.email = t("err_required");
    else if (!EMAIL_RE.test(form.email.trim())) errs.email = t("err_email");
    if (!form.phone.trim()) errs.phone = t("err_required");
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    setSubmitError(null);
    const { error } = await supabase.rpc("create_booking", {
      p_date: date, p_time: time, p_guests: guests, p_name: form.name.trim(), p_email: form.email.trim(),
      p_phone: form.phone.trim(), p_notes: form.notes.trim() || undefined, p_source: "online",
    });
    setSaving(false);
    if (error) {
      if (UNAVAILABLE_ERRORS.some((c) => error.message.includes(c))) {
        await qc.invalidateQueries({ queryKey: ["availability", date] });
        setTime(null);
        setNotice(t("err_unavailable"));
        setStep(2);
      } else {
        setSubmitError(t("err_generic"));
      }
      return;
    }
    qc.invalidateQueries({ queryKey: ["availability", date] });
    setStep(4);
  }

  function reset() {
    setStep(1); setTime(null); setForm({ name: "", email: "", phone: "", notes: "" }); setErrors({}); setNotice(null); setSubmitError(null);
  }

  return (
    <PublicLayout>
      <PageHeading eyebrow={VENUE.name} title={t("book_title")} intro={t("book_intro", { n: maxParty })} />
      <div className="mx-auto max-w-3xl px-5 pb-24">
        <ol className="mb-8 grid grid-cols-4 gap-2 text-xs font-semibold uppercase tracking-wider">
          {steps.map((s, i) => (
            <li key={s} className={cn("border-t-2 pt-2", step > i ? "border-primary text-primary" : "border-border text-muted-foreground")}>
              <span className="hidden sm:inline">{i + 1}. </span>{t(s)}
            </li>
          ))}
        </ol>

        <div className="rounded-lg border bg-card p-6 md:p-8">
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setNotice(null); setTime(null); setStep(2); }} className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">{t("date")}</Label>
                <Input id="date" type="date" required min={romeToday()} value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests">{t("guests")}</Label>
                <select id="guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="h-10 w-full rounded-md border border-input bg-card px-3">
                  {Array.from({ length: maxParty }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n === 1 ? t("guest_1") : t("guest_n", { n })}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2"><Button type="submit" size="lg" disabled={!date}>{t("continue")}</Button></div>
            </form>
          )}

          {step === 2 && (
            <div>
              <p className="font-display text-2xl">{formatDate(date, lang)} · {guests === 1 ? t("guest_1") : t("guest_n", { n: guests })}</p>
              {notice && <p role="alert" className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{notice}</p>}
              {avail.isLoading && <p className="mt-6 flex items-center gap-2 text-muted-foreground"><Loader2 className="size-4 animate-spin" /> {t("loading_slots")}</p>}
              {avail.isError && <p className="mt-6 text-destructive">{t("err_generic")}</p>}
              {avail.data && (
                <>
                  {usable.length === 0 && <p className="mt-6 rounded-md bg-muted p-4 text-sm">{t("no_slots")}</p>}
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {avail.data.map((s) => {
                      const reason = slotLabel(s, guests);
                      const selected = time === s.slot;
                      return (
                        <button
                          key={s.slot}
                          type="button"
                          disabled={!!reason}
                          onClick={() => setTime(s.slot)}
                          aria-pressed={selected}
                          className={cn(
                            "rounded-md border px-3 py-3 text-left transition-colors",
                            reason ? "cursor-not-allowed border-dashed bg-muted text-muted-foreground opacity-60" : "hover:border-primary",
                            selected && "border-primary bg-primary text-primary-foreground",
                          )}
                        >
                          <span className="block font-display text-xl">{s.slot}</span>
                          <span className="block text-xs">{reason ? t(reason) : t("seats_left", { n: s.remaining })}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
              <div className="mt-8 flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>{t("back")}</Button>
                <Button disabled={!time} onClick={() => setStep(3)}>{t("continue")}</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={submit} noValidate className="space-y-5">
              <p className="font-display text-2xl">{formatDate(date, lang)} · {time} · {guests === 1 ? t("guest_1") : t("guest_n", { n: guests })}</p>
              {([["name", "text", "name"], ["email", "email", "email"], ["phone", "tel", "phone"]] as const).map(([k, type, label]) => (
                <div key={k} className="space-y-2">
                  <Label htmlFor={k}>{t(label)}</Label>
                  <Input id={k} type={type} value={form[k]} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined}
                    onChange={(e) => setForm({ ...form, [k]: e.target.value })} maxLength={k === "phone" ? 40 : 200} />
                  {errors[k] && <p id={`${k}-err`} className="text-sm text-destructive">{errors[k]}</p>}
                </div>
              ))}
              <div className="space-y-2">
                <Label htmlFor="notes">{t("notes")} <span className="text-muted-foreground">({t("optional")})</span></Label>
                <Textarea id="notes" value={form.notes} maxLength={1000} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
              {submitError && <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{submitError}</p>}
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(2)} disabled={saving}>{t("back")}</Button>
                <Button type="submit" disabled={saving}>{saving ? <><Loader2 className="animate-spin" /> {t("saving")}</> : t("confirm_booking")}</Button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-success text-primary-foreground"><Check className="size-7" /></div>
              <h2 className="mt-4 text-4xl text-primary">{t("done_title")}</h2>
              <p className="mt-2 text-muted-foreground">{t("done_body")}</p>
              <dl className="mx-auto mt-6 max-w-sm space-y-2 text-left text-sm">
                <div className="flex justify-between gap-4 border-b pb-2"><dt className="text-muted-foreground">{t("when")}</dt><dd className="text-right">{formatDate(date, lang)}, {time}</dd></div>
                <div className="flex justify-between gap-4 border-b pb-2"><dt className="text-muted-foreground">{t("guests")}</dt><dd>{guests}</dd></div>
                <div className="flex justify-between gap-4 border-b pb-2"><dt className="text-muted-foreground">{t("name")}</dt><dd>{form.name}</dd></div>
                <div className="flex justify-between gap-4 border-b pb-2"><dt className="text-muted-foreground">{t("email")}</dt><dd className="break-all">{form.email}</dd></div>
                <div className="flex justify-between gap-4 border-b pb-2"><dt className="text-muted-foreground">{t("phone")}</dt><dd>{form.phone}</dd></div>
                {form.notes && <div className="flex justify-between gap-4"><dt className="text-muted-foreground">{t("notes")}</dt><dd className="text-right">{form.notes}</dd></div>}
              </dl>
              <Button className="mt-8" onClick={reset}>{t("another")}</Button>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
