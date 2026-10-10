export const VENUE = {
  name: "Divin Ostilia Wine Bar",
  short: "Divin Ostilia",
  address: "Via Ostilia 4, 00184 Roma, Italia",
  street: "Via Ostilia 4",
  city: "00184 Roma, Italia",
  phone: "+39 06 7049 6526",
  tel: "tel:+390670496526",
  maps: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Via Ostilia 4, 00184 Roma"),
  tripadvisor: "https://www.tripadvisor.com/Search?q=" + encodeURIComponent("Divin Ostilia Wine Bar Roma"),
  timeZone: "Europe/Rome",
};

export function romeToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: VENUE.timeZone }).format(new Date());
}

export function shiftDate(iso: string, days: number): string {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function formatDate(iso: string, lang: "en" | "it"): string {
  const d = new Date(iso + "T12:00:00Z");
  return new Intl.DateTimeFormat(lang === "it" ? "it-IT" : "en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(d);
}
