import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Phone } from "lucide-react";
import { PublicLayout } from "@/components/site/PublicLayout";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { useI18n, type L } from "@/lib/i18n";
import { VENUE } from "@/lib/site";

import hero from "@/assets/hero.jpg";
import room from "@/assets/room.jpg";
import sigWine from "@/assets/sig-wine.jpg";
import sigBoard from "@/assets/sig-board.jpg";
import sigCacio from "@/assets/sig-cacio.jpg";
import carBruschetta from "@/assets/car-bruschetta.jpg";
import carPastas from "@/assets/car-pastas.jpg";
import carOctopus from "@/assets/car-octopus.jpg";
import carGnocchi from "@/assets/car-gnocchi.jpg";
import carDesserts from "@/assets/car-desserts.jpg";
import carAperitivo from "@/assets/car-aperitivo.jpg";
import carMenu from "@/assets/car-menu.jpg";
import carMeatballs from "@/assets/car-meatballs.jpg";
import galRoom from "@/assets/gal-room.jpg";
import galGuests from "@/assets/gal-guests.jpg";
import galBoard from "@/assets/gal-board.jpg";
import galPastas from "@/assets/gal-pastas.jpg";
import galDesserts from "@/assets/gal-desserts.jpg";
import galBottles from "@/assets/gal-bottles.jpg";
import street from "@/assets/street.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Divin Ostilia Wine Bar · Roman wine bar near the Colosseum" },
      { name: "description", content: "Wine, classic Roman cooking and a warm welcome at Via Ostilia 4, Rome. Book a table online." },
      { property: "og:title", content: "Divin Ostilia Wine Bar · Roma" },
      { property: "og:description", content: "Wine, classic Roman cooking and a warm welcome at Via Ostilia 4, Rome." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const signatures: { img: string; title: L; desc: L }[] = [
  { img: sigWine, title: { en: "Wine by the glass", it: "Vino al calice" }, desc: { en: "A wide list of Italian reds and whites, poured generously.", it: "Un'ampia scelta di rossi e bianchi italiani, serviti con generosità." } },
  { img: sigBoard, title: { en: "Prosciutto & pecorino", it: "Prosciutto e pecorino" }, desc: { en: "A board for the table, made for a bottle of red.", it: "Un tagliere da condividere, perfetto con un rosso." } },
  { img: sigCacio, title: { en: "Roman pasta", it: "Pasta romana" }, desc: { en: "Cacio e pepe and the other Roman classics.", it: "Cacio e pepe e gli altri classici romani." } },
];

const slides: { img: string; cap: L }[] = [
  { img: carBruschetta, cap: { en: "Bruschetta", it: "Bruschetta" } },
  { img: carPastas, cap: { en: "Roman pastas", it: "Paste romane" } },
  { img: carOctopus, cap: { en: "Grilled octopus", it: "Polpo alla griglia" } },
  { img: carGnocchi, cap: { en: "Gnocchi", it: "Gnocchi" } },
  { img: carDesserts, cap: { en: "Desserts", it: "Dolci" } },
  { img: carAperitivo, cap: { en: "Aperitivo", it: "Aperitivo" } },
  { img: carMenu, cap: { en: "The menu", it: "Il menu" } },
  { img: carMeatballs, cap: { en: "Meatballs with potato wedges", it: "Polpette con patate a spicchi" } },
];

const gallery: { img: string; alt: L; cls: string }[] = [
  { img: galRoom, alt: { en: "The wine bar by candlelight", it: "Il wine bar a lume di candela" }, cls: "col-span-2 row-span-2" },
  { img: galBottles, alt: { en: "Wine shelves", it: "Scaffali di vini" }, cls: "" },
  { img: galBoard, alt: { en: "Cured meat and cheese board", it: "Tagliere di salumi e formaggi" }, cls: "" },
  { img: galGuests, alt: { en: "Guests at dinner", it: "Ospiti a cena" }, cls: "row-span-2" },
  { img: galPastas, alt: { en: "Roman pastas", it: "Paste romane" }, cls: "" },
  { img: galDesserts, alt: { en: "Tiramisù and panna cotta", it: "Tiramisù e panna cotta" }, cls: "" },
];

const quotes: L[] = [
  { en: "Friendly staff, great wine list and a perfect cacio e pepe.", it: "Personale gentile, ottima carta dei vini e una cacio e pepe perfetta." },
  { en: "A cosy spot near the Colosseum, away from the crowds.", it: "Un posto accogliente vicino al Colosseo, lontano dalla folla." },
  { en: "We came for one glass and stayed for dinner.", it: "Siamo venuti per un calice e siamo rimasti a cena." },
];

function Carousel() {
  const { t, l } = useI18n();
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  };
  useEffect(update, []);
  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("figure");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 300) + 16), behavior: "smooth" });
  };
  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{t("car_eyebrow")}</p>
          <h2 className="mt-2 text-4xl text-primary md:text-5xl">{t("car_title")}</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => go(-1)} disabled={edge.start} aria-label={t("prev")}><ChevronLeft /></Button>
          <Button variant="outline" size="icon" onClick={() => go(1)} disabled={edge.end} aria-label={t("next")}><ChevronRight /></Button>
        </div>
      </div>
      <div ref={track} onScroll={update} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none]">
        {slides.map((s) => (
          <figure key={s.cap.en} className="relative aspect-[4/5] w-[80%] shrink-0 snap-start overflow-hidden rounded-lg sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
            <img src={s.img} alt={l(s.cap)} loading="lazy" width={1024} height={1280} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-caption-overlay" />
            <figcaption className="absolute bottom-0 left-0 p-5 font-display text-2xl text-ink-foreground">{l(s.cap)}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function Home() {
  const { t, l } = useI18n();
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative isolate flex min-h-[88vh] items-end overflow-hidden bg-ink">
        <img src={hero} alt="" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full animate-slowzoom object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-32 text-ink-foreground md:pb-24">
          <p className="eyebrow animate-rise text-cream">{t("identity")}</p>
          <h1 className="mt-3 max-w-3xl animate-rise text-6xl leading-[0.95] md:text-8xl">Divin Ostilia</h1>
          <p className="mt-5 max-w-xl animate-rise text-lg text-ink-foreground/90 md:text-xl">{t("hero_welcome")}</p>
          <p className="mt-3 flex animate-rise items-center gap-2 text-sm text-ink-foreground/80"><MapPin className="size-4" /> {VENUE.address}</p>
          <div className="mt-8 flex animate-rise flex-wrap gap-3">
            <Button asChild variant="hero" size="lg"><Link to="/booking">{t("reserve_table")}</Link></Button>
            <Button asChild variant="heroOutline" size="lg"><Link to="/menu">{t("view_menu")}</Link></Button>
          </div>
        </div>
      </section>

      {/* Room */}
      <Reveal className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="eyebrow">{t("room_eyebrow")}</p>
          <h2 className="mt-2 text-4xl text-primary md:text-5xl">{t("room_title")}</h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground/80">{t("room_body")}</p>
          <div className="mt-8 grid grid-cols-2 gap-4 border-t pt-6">
            <div><p className="text-xs uppercase tracking-widest text-muted-foreground">{t("mon_sat")}</p><p className="mt-1 font-display text-3xl">11:30–23:00</p></div>
            <div><p className="text-xs uppercase tracking-widest text-muted-foreground">{t("sunday")}</p><p className="mt-1 font-display text-3xl">11:30–22:30</p></div>
          </div>
        </div>
        <img src={room} alt={l({ en: "The dining room", it: "La sala" })} loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full rounded-lg object-cover shadow-soft" />
      </Reveal>

      {/* Signatures */}
      <section className="bg-secondary">
        <Reveal as="div" className="mx-auto max-w-6xl px-5 py-20">
          <p className="eyebrow">{t("sig_eyebrow")}</p>
          <h2 className="mt-2 text-4xl text-primary md:text-5xl">{t("sig_title")}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {signatures.map((s) => (
              <article key={s.title.en} className="overflow-hidden rounded-lg border bg-card">
                <img src={s.img} alt={l(s.title)} loading="lazy" width={1024} height={1280} className="aspect-[4/3] w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-2xl">{l(s.title)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{l(s.desc)}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Carousel */}
      <Reveal className="mx-auto max-w-6xl px-5 py-20"><Carousel /></Reveal>

      {/* Gallery */}
      <Reveal className="mx-auto max-w-6xl px-5 pb-20">
        <p className="eyebrow">{t("gal_eyebrow")}</p>
        <h2 className="mt-2 text-4xl text-primary md:text-5xl">{t("gal_title")}</h2>
        <div className="mt-8 grid auto-rows-[150px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4">
          {gallery.map((g) => (
            <img key={g.alt.en} src={g.img} alt={l(g.alt)} loading="lazy" className={`h-full w-full rounded-md object-cover ${g.cls}`} />
          ))}
        </div>
      </Reveal>

      {/* Location */}
      <section className="bg-ink text-ink-foreground">
        <Reveal as="div" className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
          <img src={street} alt={l({ en: "Street near the wine bar", it: "La strada vicino al wine bar" })} loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full rounded-lg object-cover" />
          <div>
            <p className="eyebrow">{t("loc_eyebrow")}</p>
            <h2 className="mt-2 text-4xl md:text-5xl">{t("loc_title")}</h2>
            <p className="mt-5 text-ink-foreground/80">{t("loc_body")}</p>
            <p className="mt-6 font-display text-2xl">{VENUE.address}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="hero"><a href={VENUE.maps} target="_blank" rel="noopener noreferrer"><MapPin /> {t("directions")}</a></Button>
              <Button asChild variant="heroOutline"><a href={VENUE.tel}><Phone /> {VENUE.phone}</a></Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Reviews */}
      <Reveal className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{t("rev_eyebrow")}</p>
            <h2 className="mt-2 text-4xl text-primary">{t("rev_title")}</h2>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href={VENUE.tripadvisor} target="_blank" rel="noopener noreferrer" className="rounded-md border bg-card px-4 py-2.5 hover:border-primary">
              <span className="font-semibold">TripAdvisor</span> · <span className="text-muted-foreground">{t("rev_rating_note")}</span>
            </a>
            <a href={VENUE.maps} target="_blank" rel="noopener noreferrer" className="rounded-md border bg-card px-4 py-2.5 hover:border-primary">
              <span className="font-semibold">Google</span> · <span className="text-muted-foreground">{t("rev_rating_note")}</span>
            </a>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {quotes.map((q) => (
            <blockquote key={q.en} className="rounded-lg border bg-card p-5 font-display text-xl leading-snug">“{l(q)}”</blockquote>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{t("rev_sample")}</p>
      </Reveal>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <Reveal as="div" className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="text-4xl md:text-5xl">{t("cta_title")}</h2>
            <p className="mt-2 text-primary-foreground/80">{t("cta_body")}</p>
          </div>
          <Button asChild variant="secondary" size="lg"><Link to="/booking">{t("reserve_table")}</Link></Button>
        </Reveal>
      </section>
    </PublicLayout>
  );
}
