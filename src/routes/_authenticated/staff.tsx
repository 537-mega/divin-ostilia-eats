import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { LangSwitch } from "@/components/site/LangSwitch";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/staff")({
  head: () => ({
    meta: [
      { title: "Staff · Divin Ostilia" },
      { name: "description", content: "Staff area for Divin Ostilia Wine Bar." },
      { property: "og:title", content: "Staff · Divin Ostilia" },
      { property: "og:description", content: "Staff area." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Staff,
});

function Staff() {
  const { t } = useI18n();
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const admin = useQuery({
    queryKey: ["is-admin", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      if (error) throw error;
      return !!data;
    },
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <div className="min-h-screen bg-secondary">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <span className="font-display text-2xl text-primary">Divin Ostilia · Staff</span>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground md:inline">{user.email}</span>
            <LangSwitch />
            <Button asChild variant="outline" size="sm"><Link to="/">{t("back_site")}</Link></Button>
            <Button size="sm" onClick={signOut}>{t("sign_out")}</Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10">
        {admin.isLoading && <p className="text-muted-foreground">{t("loading")}</p>}
        {admin.data === false && (
          <div className="rounded-lg border bg-card p-8">
            <h1 className="text-3xl">{t("denied_title")}</h1>
            <p className="mt-2 text-muted-foreground">{t("denied_body")}</p>
          </div>
        )}
        {admin.data === true && (
          <div className="rounded-lg border bg-card p-8">
            <h1 className="text-3xl">{t("tab_bookings")} · {t("tab_menu")}</h1>
            <p className="mt-2 text-muted-foreground">Management tools are not finished yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
