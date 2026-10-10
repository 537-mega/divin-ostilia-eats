import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "it";
export type L = { en: string; it: string };

const dict = {
  nav_home: { en: "Home", it: "Home" },
  nav_menu: { en: "Menu", it: "Menu" },
  nav_booking: { en: "Booking", it: "Prenota" },
  nav_contact: { en: "Contact", it: "Contatti" },
  reserve: { en: "Reserve", it: "Prenota" },
  reserve_table: { en: "Reserve a table", it: "Prenota un tavolo" },
  view_menu: { en: "View the menu", it: "Guarda il menu" },
  identity: { en: "Wine Bar · Roma", it: "Wine Bar · Roma" },
  rome_time: { en: "Rome time", it: "Ora di Roma" },
  open_menu: { en: "Open menu", it: "Apri menu" },
  close_menu: { en: "Close menu", it: "Chiudi menu" },
  hours: { en: "Opening hours", it: "Orari" },
  mon_sat: { en: "Monday–Saturday", it: "Lunedì–Sabato" },
  sunday: { en: "Sunday", it: "Domenica" },
  directions: { en: "Get directions", it: "Indicazioni" },
  call: { en: "Call us", it: "Chiamaci" },
  staff: { en: "Staff", it: "Staff" },
  footer_intro: {
    en: "A neighbourhood wine bar near the Colosseum: classic Italian cooking, a long wine list and an easy welcome.",
    it: "Un wine bar di quartiere vicino al Colosseo: cucina italiana classica, tanti vini e un'accoglienza semplice.",
  },
  hero_welcome: {
    en: "Wine, Roman cooking and a warm table, a few steps from the Colosseum.",
    it: "Vino, cucina romana e un tavolo accogliente, a pochi passi dal Colosseo.",
  },
  room_eyebrow: { en: "The room", it: "La sala" },
  room_title: { en: "A Roman wine bar, warm and lively", it: "Un wine bar romano, caldo e vivace" },
  room_body: {
    en: "Divin Ostilia is a welcoming, lively place for a glass after work or a long dinner with friends. We cook classic Italian dishes and pour from a wide selection of wines.",
    it: "Divin Ostilia è un locale accogliente e vivace, per un calice dopo il lavoro o una lunga cena tra amici. Cuciniamo piatti classici italiani e serviamo un'ampia selezione di vini.",
  },
  sig_eyebrow: { en: "From our counter", it: "Dal nostro banco" },
  sig_title: { en: "What people come back for", it: "Quello per cui si torna" },
  car_eyebrow: { en: "From the kitchen", it: "Dalla cucina" },
  car_title: { en: "Plates to share", it: "Piatti da condividere" },
  prev: { en: "Previous", it: "Precedente" },
  next: { en: "Next", it: "Successivo" },
  gal_eyebrow: { en: "Gallery", it: "Galleria" },
  gal_title: { en: "Inside Divin Ostilia", it: "Dentro Divin Ostilia" },
  loc_eyebrow: { en: "Find us", it: "Dove siamo" },
  loc_title: { en: "In the Celio, by the Colosseum", it: "Al Celio, accanto al Colosseo" },
  loc_body: {
    en: "Via Ostilia is a quiet street a short walk from the Colosseum metro stop (line B). Come for lunch, aperitivo or dinner.",
    it: "Via Ostilia è una strada tranquilla a pochi minuti a piedi dalla fermata metro Colosseo (linea B). Vieni a pranzo, per l'aperitivo o a cena.",
  },
  rev_eyebrow: { en: "Guests say", it: "Dicono di noi" },
  rev_title: { en: "Reviews", it: "Recensioni" },
  rev_sample: {
    en: "Sample quotes — to be replaced with verified guest reviews.",
    it: "Citazioni di esempio — da sostituire con recensioni verificate.",
  },
  rev_read: { en: "Read reviews on", it: "Leggi le recensioni su" },
  rev_rating_note: { en: "See current rating", it: "Vedi la valutazione attuale" },
  cta_title: { en: "Keep a table for you?", it: "Ti teniamo un tavolo?" },
  cta_body: { en: "Book online for up to 4 guests, or call us for larger groups.", it: "Prenota online fino a 4 persone, o chiamaci per gruppi più grandi." },
  menu_title: { en: "Menu", it: "Menu" },
  menu_intro: { en: "Classic Roman and Italian cooking, with wines by the glass and bottle.", it: "Cucina romana e italiana classica, con vini al calice e in bottiglia." },
  menu_loading: { en: "Loading the menu…", it: "Caricamento del menu…" },
  price_tbc: { en: "Price to be confirmed", it: "Prezzo da confermare" },
  category: { en: "Category", it: "Categoria" },
  contact_title: { en: "Contact", it: "Contatti" },
  contact_intro: { en: "Call us, or just come by.", it: "Chiamaci, o passa a trovarci." },
  address: { en: "Address", it: "Indirizzo" },
  phone: { en: "Phone", it: "Telefono" },
  // booking
  book_title: { en: "Book a table", it: "Prenota un tavolo" },
  book_intro: { en: "Online booking for up to {n} guests. For larger groups, please call.", it: "Prenotazione online fino a {n} persone. Per gruppi più grandi, chiamaci." },
  step_party: { en: "Date & guests", it: "Data e ospiti" },
  step_time: { en: "Time", it: "Orario" },
  step_details: { en: "Details", it: "Dati" },
  step_done: { en: "Confirmed", it: "Confermata" },
  date: { en: "Date", it: "Data" },
  guests: { en: "Guests", it: "Ospiti" },
  guest_n: { en: "{n} guests", it: "{n} ospiti" },
  guest_1: { en: "1 guest", it: "1 ospite" },
  continue: { en: "Continue", it: "Continua" },
  back: { en: "Back", it: "Indietro" },
  loading_slots: { en: "Checking availability…", it: "Verifica disponibilità…" },
  no_slots: { en: "No times are available for this date and party size. Try another day.", it: "Nessun orario disponibile per questa data e numero di ospiti. Prova un altro giorno." },
  seats_left: { en: "{n} seats left", it: "{n} posti liberi" },
  closed: { en: "Closed", it: "Chiuso" },
  full: { en: "Full", it: "Completo" },
  past: { en: "Passed", it: "Passato" },
  too_few: { en: "Not enough seats", it: "Posti insufficienti" },
  name: { en: "Name", it: "Nome" },
  email: { en: "Email", it: "Email" },
  notes: { en: "Notes (allergies, occasion, seating)", it: "Note (allergie, occasione, posto)" },
  optional: { en: "optional", it: "facoltativo" },
  confirm_booking: { en: "Confirm booking", it: "Conferma prenotazione" },
  saving: { en: "Saving…", it: "Salvataggio…" },
  err_required: { en: "This field is required.", it: "Campo obbligatorio." },
  err_email: { en: "Enter a valid email address.", it: "Inserisci un'email valida." },
  err_generic: { en: "Something went wrong. Please try again or call us.", it: "Qualcosa è andato storto. Riprova o chiamaci." },
  err_unavailable: { en: "Sorry, that time was just taken or closed. Please pick another time.", it: "Spiacenti, quell'orario è appena stato occupato o chiuso. Scegline un altro." },
  done_title: { en: "Your table is booked", it: "Il tavolo è prenotato" },
  done_body: { en: "We look forward to seeing you.", it: "Ti aspettiamo." },
  another: { en: "Make another booking", it: "Nuova prenotazione" },
  when: { en: "When", it: "Quando" },
  // staff
  login_title: { en: "Staff sign in", it: "Accesso staff" },
  login_note: { en: "Accounts are by invitation only.", it: "Accesso solo su invito." },
  password: { en: "Password", it: "Password" },
  sign_in: { en: "Sign in", it: "Accedi" },
  sign_out: { en: "Sign out", it: "Esci" },
  back_site: { en: "Back to site", it: "Torna al sito" },
  login_failed: { en: "Sign in failed. Check your email and password.", it: "Accesso non riuscito. Controlla email e password." },
  denied_title: { en: "Access denied", it: "Accesso negato" },
  denied_body: { en: "Your account does not have permission to manage the wine bar.", it: "Il tuo account non ha i permessi per gestire il locale." },
  tab_bookings: { en: "Bookings", it: "Prenotazioni" },
  tab_menu: { en: "Menu", it: "Menu" },
  today: { en: "Today", it: "Oggi" },
  prev_day: { en: "Previous day", it: "Giorno precedente" },
  next_day: { en: "Next day", it: "Giorno successivo" },
  bookings_count: { en: "Bookings", it: "Prenotazioni" },
  guests_count: { en: "Guests", it: "Ospiti" },
  occupancy: { en: "Slot occupancy", it: "Occupazione orari" },
  no_bookings: { en: "No bookings for this date.", it: "Nessuna prenotazione per questa data." },
  add_booking: { en: "Add booking", it: "Aggiungi prenotazione" },
  cancel_booking: { en: "Cancel", it: "Annulla" },
  cancel_confirm: { en: "Cancel this booking and release its seats?", it: "Annullare la prenotazione e liberare i posti?" },
  closures: { en: "Closures", it: "Chiusure" },
  block: { en: "Block", it: "Blocca" },
  whole_day: { en: "Whole day", it: "Tutto il giorno" },
  reason: { en: "Internal note", it: "Nota interna" },
  remove: { en: "Remove", it: "Rimuovi" },
  no_closures: { en: "No closures for this date.", it: "Nessuna chiusura per questa data." },
  saved: { en: "Saved", it: "Salvato" },
  loading: { en: "Loading…", it: "Caricamento…" },
  time: { en: "Time", it: "Orario" },
  save_menu: { en: "Save menu", it: "Salva menu" },
  reset_menu: { en: "Reset to original menu", it: "Ripristina menu originale" },
  reset_confirm: { en: "Replace the saved menu with the original seeded menu?", it: "Sostituire il menu salvato con quello originale?" },
  add_category: { en: "Add category", it: "Aggiungi categoria" },
  add_dish: { en: "Add dish", it: "Aggiungi piatto" },
  title_en: { en: "Title (EN)", it: "Titolo (EN)" },
  title_it: { en: "Title (IT)", it: "Titolo (IT)" },
  note_en: { en: "Note (EN)", it: "Nota (EN)" },
  note_it: { en: "Note (IT)", it: "Nota (IT)" },
  dish_name: { en: "Dish name", it: "Nome piatto" },
  desc_en: { en: "Description (EN)", it: "Descrizione (EN)" },
  desc_it: { en: "Description (IT)", it: "Descrizione (IT)" },
  price: { en: "Price", it: "Prezzo" },
  remove_category: { en: "Remove category", it: "Rimuovi categoria" },
  unsaved: { en: "Unsaved changes", it: "Modifiche non salvate" },
  source_staff: { en: "staff", it: "staff" },
  source_online: { en: "online", it: "online" },
} satisfies Record<string, L>;

export type Key = keyof typeof dict;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: Key, vars?: Record<string, string | number>) => string; l: (v: L | undefined) => string };
const I18n = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = window.localStorage.getItem("divin-lang");
    if (saved === "it" || saved === "en") setLangState(saved);
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => { setLangState(l); window.localStorage.setItem("divin-lang", l); };
  const t: Ctx["t"] = (k, vars) => {
    let s = dict[k][lang];
    if (vars) for (const [a, b] of Object.entries(vars)) s = s.replace(`{${a}}`, String(b));
    return s;
  };
  const l: Ctx["l"] = (v) => (v ? v[lang] || v.en : "");
  return <I18n.Provider value={{ lang, setLang, t, l }}>{children}</I18n.Provider>;
}

export function useI18n() {
  const c = useContext(I18n);
  if (!c) throw new Error("useI18n outside provider");
  return c;
}
