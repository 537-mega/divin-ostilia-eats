import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeading, PublicLayout } from "@/components/site/PublicLayout";
import { useI18n } from "@/lib/i18n";
import { menuQuery } from "@/lib/menu";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu · Divin Ostilia Wine Bar" },
      { name: "description", content: "Roman pasta, boards, mains, desserts and Italian wines at Divin Ostilia, Rome." },
      { property: "og:title", content: "Menu · Divin Ostilia Wine Bar" },
      { property: "og:description", content: "Roman pasta, boards, mains, desserts and Italian wines." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { t, l } = useI18n();
  const { data, isLoading, isError } = useQuery(menuQuery);

  return (
    <PublicLayout>
      <PageHeading eyebrow="Divin Ostilia" title={t("menu_title")} intro={t("menu_intro")} />
      {isLoading && <p className="mx-auto max-w-6xl px-5 pb-20 text-muted-foreground">{t("menu_loading")}</p>}
      {isError && <p className="mx-auto max-w-6xl px-5 pb-20 text-destructive">{t("err_generic")}</p>}
      {data && (
        <>
          <div className="sticky top-16 z-30 border-y bg-background/95 backdrop-blur">
            <div className="mx-auto max-w-6xl px-5 py-3">
              <label className="sr-only" htmlFor="cat">{t("category")}</label>
              <select id="cat" className="h-10 w-full rounded-md border bg-card px-3 md:hidden" onChange={(e) => document.getElementById(e.target.value)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                {data.categories.map((c) => <option key={c.id} value={c.id}>{l(c.title)}</option>)}
              </select>
              <nav className="hidden gap-6 md:flex">
                {data.categories.map((c) => (
                  <a key={c.id} href={`#${c.id}`} className="text-sm font-semibold uppercase tracking-wider text-foreground/70 hover:text-primary">{l(c.title)}</a>
                ))}
              </nav>
            </div>
          </div>
          <div className="mx-auto max-w-3xl px-5 py-12">
            {data.categories.map((c) => (
              <section key={c.id} id={c.id} className="scroll-mt-36 py-8">
                <h2 className="text-4xl text-primary">{l(c.title)}</h2>
                {c.note && l(c.note) && <p className="mt-1 text-sm italic text-muted-foreground">{l(c.note)}</p>}
                <ul className="mt-6 divide-y">
                  {c.dishes.map((d, i) => (
                    <li key={i} className="flex items-baseline justify-between gap-6 py-4">
                      <div>
                        <p className="font-display text-xl">{d.name}</p>
                        <p className="text-sm text-muted-foreground">{l(d.desc)}</p>
                      </div>
                      <p className="shrink-0 text-right text-sm font-semibold">{d.price ? `€ ${d.price}` : <span className="font-normal italic text-muted-foreground">{t("price_tbc")}</span>}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </>
      )}
    </PublicLayout>
  );
}
