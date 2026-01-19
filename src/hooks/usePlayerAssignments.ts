import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { PlayerGroundAssignment } from "@/types/sports";

// Fetch player assignments for a ground
export function usePlayerAssignments(groundId?: string, coachId?: string) {
  return useQuery({
    queryKey: ["player-assignments", groundId, coachId],
    queryFn: async (): Promise<PlayerGroundAssignment[]> => {
      let query = supabase
        .from("player_ground_assignments")
        .select(`
          *,
          player:players(
            *,
            profile:profiles!players_user_id_fkey(full_name, avatar_url),
            sport:sports(*)
          ),
          ground:grounds(*),
          primary_coach:profiles!player_ground_assignments_primary_coach_id_fkey(id, full_name, avatar_url)
        `)
        .eq("is_active", true)
        .order("batch_name", { ascending: true });

      if (groundId) {
        query = query.eq("ground_id", groundId);
      }

      if (coachId) {
        query = query.eq("primary_coach_id", coachId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as unknown as PlayerGroundAssignment[];
    },
  });
}

// Fetch assignments for a specific player
export function usePlayerGroundAssignment(playerId?: string) {
  return useQuery({
    queryKey: ["player-assignment", playerId],
    queryFn: async (): Promise<PlayerGroundAssignment | null> => {
      if (!playerId) return null;

      const { data, error } = await supabase
        .from("player_ground_assignments")
        .select(`
          *,
          ground:grounds(*),
          primary_coach:profiles!player_ground_assignments_primary_coach_id_fkey(id, full_name, avatar_url)
        `)
        .eq("player_id", playerId)
        .eq("is_active", true)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data as unknown as PlayerGroundAssignment | null;
    },
    enabled: !!playerId,
  });
}

// Get players for a ground grouped by batch
export function useGroundPlayersByBatch(groundId?: string) {
  return useQuery({
    queryKey: ["ground-players-batch", groundId],
    queryFn: async () => {
      if (!groundId) return {};

      const { data, error } = await supabase
        .from("player_ground_assignments")
        .select(`
          *,
          player:players(
            *,
            profile:profiles!players_user_id_fkey(full_name, avatar_url),
            sport:sports(name)
          )
        `)
        .eq("ground_id", groundId)
        .eq("is_active", true)
        .order("batch_name", { ascending: true });

      if (error) throw error;

      // Group by batch
      const grouped: Record<string, PlayerGroundAssignment[]> = {};
      (data || []).forEach((assignment) => {
        const batch = assignment.batch_name || "Unassigned";
        if (!grouped[batch]) grouped[batch] = [];
        grouped[batch].push(assignment as unknown as PlayerGroundAssignment);
      });

      return grouped;
    },
    enabled: !!groundId,
  });
}

// Assign player to ground
export function useAssignPlayerToGround() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      player_id: string;
      ground_id: string;
      primary_coach_id?: string;
      batch_name?: string;
    }) => {
      const { data: result, error } = await supabase
        .from("player_ground_assignments")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["player-assignments"] });
      queryClient.invalidateQueries({ queryKey: ["ground-players-batch"] });
    },
  });
}

// Update player assignment
export function useUpdatePlayerAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<PlayerGroundAssignment> & { id: string }) => {
      const { data: result, error } = await supabase
        .from("player_ground_assignments")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["player-assignments"] });
      queryClient.invalidateQueries({ queryKey: ["ground-players-batch"] });
    },
  });
}
