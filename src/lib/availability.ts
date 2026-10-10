import { supabase } from "@/integrations/supabase/client";

export type Slot = { slot: string; held: number; remaining: number; state: "open" | "closed" | "full" | "past"; capacity: number; max_party: number };

export const availabilityQuery = (date: string) => ({
  queryKey: ["availability", date],
  queryFn: async (): Promise<Slot[]> => {
    const { data, error } = await supabase.rpc("get_availability", { p_date: date });
    if (error) throw error;
    return (data ?? []) as Slot[];
  },
});

export const UNAVAILABLE_ERRORS = ["slot_full", "slot_closed", "slot_past"];
export const DEFAULT_MAX_PARTY = 4;
