import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { PageHeading, PublicLayout } from "@/components/site/PublicLayout";
import { Hours } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { VENUE } from "@/lib/site";
import street from "@/assets/street.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · Divin Ostilia Wine Bar" },
      { name: "description", content: "Via Ostilia 4, 00184 Roma. Phone +39 06 7049 6526. Opening hours and directions." },
      { property: "og:title", content: "Contact · Divin Ostilia Wine Bar" },
      { property: "og:description", content: "Address, phone, opening hours and directions." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  return (
    <PublicLayout>
      <PageHeading eyebrow={VENUE.name} title={t("contact_title")} intro={t("contact_intro")} />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 md:grid-cols-2">
        <div className="space-y-8">
          <div>
            <p className="eyebrow">{t("address")}</p>
            <p className="mt-2 font-display text-3xl">{VENUE.street}<br />{VENUE.city}</p>
            <Button asChild variant="outline" className="mt-4"><a href={VENUE.maps} target="_blank" rel="noopener noreferrer"><MapPin /> {t("directions")}</a></Button>
          </div>
          <div>
            <p className="eyebrow">{t("phone")}</p>
            <a href={VENUE.tel} className="mt-2 flex items-center gap-2 font-display text-3xl hover:text-primary"><Phone className="size-6" /> {VENUE.phone}</a>
          </div>
          <div>
            <p className="eyebrow">{t("hours")}</p>
            <Hours className="mt-3 max-w-xs space-y-2" />
          </div>
          <Button asChild size="lg"><Link to="/booking">{t("reserve_table")}</Link></Button>
        </div>
        <img src={street} alt="Via Ostilia" loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full rounded-lg object-cover" />
      </div>
    </PublicLayout>
  );
}
