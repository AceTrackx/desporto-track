import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { TrainingSession, CreateSessionFormData } from "@/types/sports";

export function useSessions(sportId?: string) {
  return useQuery({
    queryKey: ["training-sessions", sportId],
    queryFn: async (): Promise<TrainingSession[]> => {
      let query = supabase
        .from("training_sessions")
        .select(`
          *,
          sport:sports!training_sessions_sport_id_fkey(*),
          coach:profiles!training_sessions_coach_id_fkey(full_name)
        `)
        .order("session_date", { ascending: false });

      if (sportId) {
        query = query.eq("sport_id", sportId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as TrainingSession[];
    },
  });
}

export function useSession(sessionId: string | undefined) {
  return useQuery({
    queryKey: ["training-sessions", sessionId],
    queryFn: async (): Promise<TrainingSession | null> => {
      if (!sessionId) return null;

      const { data, error } = await supabase
        .from("training_sessions")
        .select(`
          *,
          sport:sports!training_sessions_sport_id_fkey(*),
          coach:profiles!training_sessions_coach_id_fkey(full_name)
        `)
        .eq("id", sessionId)
        .maybeSingle();

      if (error) throw error;
      return data as TrainingSession | null;
    },
    enabled: !!sessionId,
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (session: CreateSessionFormData) => {
      // Get session synchronously - faster than getUser()
      const { data: { session: authSession } } = await supabase.auth.getSession();
      
      const { data, error } = await supabase
        .from("training_sessions")
        .insert({
          ...session,
          coach_id: authSession?.user?.id || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["training-sessions"] });
      queryClient.invalidateQueries({ queryKey: ["player-upcoming-sessions"] });
    },
  });
}

export function useUpdateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...session }: Partial<TrainingSession> & { id: string }) => {
      const { data, error } = await supabase
        .from("training_sessions")
        .update(session)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["training-sessions"] });
    },
  });
}
