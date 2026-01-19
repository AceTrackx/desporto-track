import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Player } from "@/types/sports";

export function usePlayers(sportId?: string) {
  return useQuery({
    queryKey: ["players", sportId],
    queryFn: async (): Promise<Player[]> => {
      let query = supabase
        .from("players")
        .select(`
          *,
          profile:profiles!players_user_id_fkey(full_name, email, avatar_url),
          sport:sports!players_sport_id_fkey(*)
        `)
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (sportId) {
        query = query.eq("sport_id", sportId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Player[];
    },
  });
}

export function usePlayer(playerId: string | undefined) {
  return useQuery({
    queryKey: ["players", playerId],
    queryFn: async (): Promise<Player | null> => {
      if (!playerId) return null;

      const { data, error } = await supabase
        .from("players")
        .select(`
          *,
          profile:profiles!players_user_id_fkey(full_name, email, avatar_url),
          sport:sports!players_sport_id_fkey(*)
        `)
        .eq("id", playerId)
        .maybeSingle();

      if (error) throw error;
      return data as Player | null;
    },
    enabled: !!playerId,
  });
}

export function useCreatePlayer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (player: {
      user_id: string;
      sport_id: string;
      position?: string;
      jersey_number?: number;
    }) => {
      const { data, error } = await supabase
        .from("players")
        .insert(player)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
}
