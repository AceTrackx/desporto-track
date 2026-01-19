import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Match, CreateMatchFormData } from "@/types/sports";

export function useMatches(sportId?: string) {
  return useQuery({
    queryKey: ["matches", sportId],
    queryFn: async (): Promise<Match[]> => {
      let query = supabase
        .from("matches")
        .select(`
          *,
          sport:sports!matches_sport_id_fkey(*)
        `)
        .order("match_date", { ascending: false });

      if (sportId) {
        query = query.eq("sport_id", sportId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Match[];
    },
  });
}

export function useMatch(matchId: string | undefined) {
  return useQuery({
    queryKey: ["matches", matchId],
    queryFn: async (): Promise<Match | null> => {
      if (!matchId) return null;

      const { data, error } = await supabase
        .from("matches")
        .select(`
          *,
          sport:sports!matches_sport_id_fkey(*)
        `)
        .eq("id", matchId)
        .maybeSingle();

      if (error) throw error;
      return data as Match | null;
    },
    enabled: !!matchId,
  });
}

export function useCreateMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (match: CreateMatchFormData) => {
      const { data: userData } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from("matches")
        .insert({
          ...match,
          created_by: userData.user?.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });
}

export function useUpdateMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...match }: Partial<Match> & { id: string }) => {
      const { data, error } = await supabase
        .from("matches")
        .update(match)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });
}
