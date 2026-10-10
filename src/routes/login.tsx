import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LangSwitch } from "@/components/site/LangSwitch";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Staff sign in · Divin Ostilia" },
      { name: "description", content: "Staff sign in for Divin Ostilia Wine Bar." },
      { property: "og:title", content: "Staff sign in · Divin Ostilia" },
      { property: "og:description", content: "Staff sign in for Divin Ostilia Wine Bar." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Login,
});

function Login() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) { setError(t("login_failed")); return; }
    navigate({ to: "/staff", replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-5">
      <div className="w-full max-w-sm rounded-lg border bg-card p-8 shadow-soft">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-display text-2xl text-primary">Divin Ostilia</Link>
          <LangSwitch />
        </div>
        <h1 className="mt-6 text-3xl">{t("login_title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("login_note")}</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="space-y-2"><Label htmlFor="em">{t("email")}</Label><Input id="em" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="pw">{t("password")}</Label><Input id="pw" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={busy}>{busy && <Loader2 className="animate-spin" />}{t("sign_in")}</Button>
        </form>
        <Link to="/" className="mt-6 inline-block text-sm text-muted-foreground hover:text-primary">← {t("back_site")}</Link>
      </div>
    </div>
  );
}
