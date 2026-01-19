import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Sport } from "@/types/sports";

export function useSports() {
  return useQuery({
    queryKey: ["sports"],
    queryFn: async (): Promise<Sport[]> => {
      const { data, error } = await supabase
        .from("sports")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as Sport[];
    },
  });
}

export function useSport(sportId: string | undefined) {
  return useQuery({
    queryKey: ["sports", sportId],
    queryFn: async (): Promise<Sport | null> => {
      if (!sportId) return null;
      
      const { data, error } = await supabase
        .from("sports")
        .select("*")
        .eq("id", sportId)
        .maybeSingle();

      if (error) throw error;
      return data as Sport | null;
    },
    enabled: !!sportId,
  });
}
