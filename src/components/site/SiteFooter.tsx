import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { VENUE } from "@/lib/site";

export function Hours({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <dl className={className}>
      <div className="flex justify-between gap-4"><dt>{t("mon_sat")}</dt><dd>11:30–23:00</dd></div>
      <div className="flex justify-between gap-4"><dt>{t("sunday")}</dt><dd>11:30–22:30</dd></div>
    </dl>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-2xl">{VENUE.name}</p>
          <p className="mt-3 text-sm text-ink-foreground/75">{t("footer_intro")}</p>
        </div>
        <div className="text-sm">
          <p className="eyebrow">{t("address")}</p>
          <p className="mt-3">{VENUE.street}<br />{VENUE.city}</p>
          <a href={VENUE.maps} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline underline-offset-4 hover:text-rose">{t("directions")}</a>
          <p className="mt-4"><a href={VENUE.tel} className="hover:text-rose">{VENUE.phone}</a></p>
        </div>
        <div className="text-sm">
          <p className="eyebrow">{t("hours")}</p>
          <Hours className="mt-3 space-y-1.5" />
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          <Link to="/" className="hover:text-rose">{t("nav_home")}</Link>
          <Link to="/menu" className="hover:text-rose">{t("nav_menu")}</Link>
          <Link to="/booking" className="hover:text-rose">{t("nav_booking")}</Link>
          <Link to="/contact" className="hover:text-rose">{t("nav_contact")}</Link>
        </nav>
      </div>
      <div className="border-t border-ink-foreground/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 text-xs text-ink-foreground/60">
          <span>© {new Date().getFullYear()} {VENUE.name}</span>
          <Link to="/staff" className="hover:text-ink-foreground">{t("staff")}</Link>
        </div>
      </div>
    </footer>
  );
}
