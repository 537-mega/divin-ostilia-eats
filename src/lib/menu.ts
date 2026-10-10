import { supabase } from "@/integrations/supabase/client";
import type { L } from "./i18n";

export type Dish = { name: string; desc: L; price: string };
export type Category = { id: string; title: L; note?: L; dishes: Dish[] };
export type MenuData = { categories: Category[] };

// Seeded menu. Prices are left empty for the owner to complete in the staff area.
export const SEED_MENU: MenuData = {
  categories: [
    {
      id: "antipasti",
      title: { en: "Starters", it: "Antipasti" },
      dishes: [
        { name: "Bruschetta al pomodoro", desc: { en: "Toasted bread, tomato, basil, olive oil", it: "Pane tostato, pomodoro, basilico, olio" }, price: "" },
        { name: "Tagliere di prosciutto e pecorino", desc: { en: "Prosciutto and pecorino romano board", it: "Tagliere di prosciutto e pecorino romano" }, price: "" },
        { name: "Polpo alla griglia", desc: { en: "Grilled octopus with potatoes", it: "Polpo alla griglia con patate" }, price: "" },
      ],
    },
    {
      id: "primi",
      title: { en: "Pasta", it: "Primi" },
      note: { en: "Roman classics", it: "Classici romani" },
      dishes: [
        { name: "Cacio e pepe", desc: { en: "Tonnarelli, pecorino romano, black pepper", it: "Tonnarelli, pecorino romano, pepe nero" }, price: "" },
        { name: "Carbonara", desc: { en: "Guanciale, egg yolk, pecorino, pepper", it: "Guanciale, tuorlo, pecorino, pepe" }, price: "" },
        { name: "Amatriciana", desc: { en: "Guanciale, tomato, pecorino", it: "Guanciale, pomodoro, pecorino" }, price: "" },
        { name: "Gnocchi al pomodoro", desc: { en: "Potato gnocchi, tomato and basil", it: "Gnocchi di patate, pomodoro e basilico" }, price: "" },
      ],
    },
    {
      id: "secondi",
      title: { en: "Mains", it: "Secondi" },
      dishes: [
        { name: "Polpette al sugo", desc: { en: "Meatballs in tomato sauce with potato wedges", it: "Polpette al sugo con patate a spicchi" }, price: "" },
      ],
    },
    {
      id: "dolci",
      title: { en: "Desserts", it: "Dolci" },
      dishes: [
        { name: "Tiramisù", desc: { en: "Mascarpone, coffee, cocoa", it: "Mascarpone, caffè, cacao" }, price: "" },
        { name: "Panna cotta", desc: { en: "With red berries", it: "Con frutti di bosco" }, price: "" },
      ],
    },
    {
      id: "vini",
      title: { en: "Wine", it: "Vini" },
      note: { en: "Ask us about today's wines by the glass", it: "Chiedici i vini al calice del giorno" },
      dishes: [
        { name: "Vino rosso al calice", desc: { en: "Red wine by the glass", it: "Vino rosso al calice" }, price: "" },
        { name: "Vino bianco al calice", desc: { en: "White wine by the glass", it: "Vino bianco al calice" }, price: "" },
        { name: "Aperitivo", desc: { en: "Spritz or a glass of wine with small bites", it: "Spritz o calice con stuzzichini" }, price: "" },
      ],
    },
  ],
};

export const menuQuery = {
  queryKey: ["menu"],
  queryFn: async (): Promise<MenuData> => {
    const { data, error } = await supabase.from("menu_content").select("data").eq("id", 1).maybeSingle();
    if (error) throw error;
    const d = data?.data as unknown as MenuData | undefined;
    return d && Array.isArray(d.categories) ? d : SEED_MENU;
  },
};
