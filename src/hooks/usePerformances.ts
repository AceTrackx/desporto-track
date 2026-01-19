import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type {
  MatchPerformance,
  PracticePerformance,
  MatchPerformanceFormData,
  PracticePerformanceFormData,
} from "@/types/sports";

// Match Performances
export function useMatchPerformances(matchId?: string) {
  return useQuery({
    queryKey: ["match-performances", matchId],
    queryFn: async (): Promise<MatchPerformance[]> => {
      let query = supabase
        .from("match_performances")
        .select(`
          *,
          player:players!match_performances_player_id_fkey(
            *,
            profile:profiles!players_user_id_fkey(full_name, avatar_url)
          ),
          match:matches!match_performances_match_id_fkey(*)
        `)
        .order("created_at", { ascending: false });

      if (matchId) {
        query = query.eq("match_id", matchId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as MatchPerformance[];
    },
  });
}

export function usePlayerMatchPerformances(playerId?: string) {
  return useQuery({
    queryKey: ["match-performances", "player", playerId],
    queryFn: async (): Promise<MatchPerformance[]> => {
      if (!playerId) return [];

      const { data, error } = await supabase
        .from("match_performances")
        .select(`
          *,
          match:matches!match_performances_match_id_fkey(*)
        `)
        .eq("player_id", playerId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as MatchPerformance[];
    },
    enabled: !!playerId,
  });
}

export function useCreateMatchPerformance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (performance: MatchPerformanceFormData) => {
      const { data: userData } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("match_performances")
        .insert({
          ...performance,
          created_by: userData.user?.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["match-performances"] });
    },
  });
}

export function useUpdateMatchPerformance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...performance }: Partial<MatchPerformance> & { id: string }) => {
      const { data, error } = await supabase
        .from("match_performances")
        .update(performance)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["match-performances"] });
    },
  });
}

// Practice Performances
export function usePracticePerformances(sessionId?: string) {
  return useQuery({
    queryKey: ["practice-performances", sessionId],
    queryFn: async (): Promise<PracticePerformance[]> => {
      let query = supabase
        .from("practice_performances")
        .select(`
          *,
          player:players!practice_performances_player_id_fkey(
            *,
            profile:profiles!players_user_id_fkey(full_name, avatar_url)
          ),
          session:training_sessions!practice_performances_session_id_fkey(*)
        `)
        .order("created_at", { ascending: false });

      if (sessionId) {
        query = query.eq("session_id", sessionId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as PracticePerformance[];
    },
  });
}

export function usePlayerPracticePerformances(playerId?: string) {
  return useQuery({
    queryKey: ["practice-performances", "player", playerId],
    queryFn: async (): Promise<PracticePerformance[]> => {
      if (!playerId) return [];

      const { data, error } = await supabase
        .from("practice_performances")
        .select(`
          *,
          session:training_sessions!practice_performances_session_id_fkey(*)
        `)
        .eq("player_id", playerId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as PracticePerformance[];
    },
    enabled: !!playerId,
  });
}

export function useCreatePracticePerformance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (performance: PracticePerformanceFormData) => {
      const { data: userData } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("practice_performances")
        .insert({
          ...performance,
          created_by: userData.user?.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["practice-performances"] });
    },
  });
}

export function useUpdatePracticePerformance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...performance }: Partial<PracticePerformance> & { id: string }) => {
      const { data, error } = await supabase
        .from("practice_performances")
        .update(performance)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["practice-performances"] });
    },
  });
}

// Bulk create performances for a session/match
export function useBulkCreatePracticePerformances() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (performances: PracticePerformanceFormData[]) => {
      const { data: userData } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("practice_performances")
        .insert(
          performances.map((p) => ({
            ...p,
            created_by: userData.user?.id,
          }))
        )
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["practice-performances"] });
    },
  });
}

export function useBulkCreateMatchPerformances() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (performances: MatchPerformanceFormData[]) => {
      const { data: userData } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("match_performances")
        .insert(
          performances.map((p) => ({
            ...p,
            created_by: userData.user?.id,
          }))
        )
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["match-performances"] });
    },
  });
}
