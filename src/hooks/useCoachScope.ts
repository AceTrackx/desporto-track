import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Returns the ground IDs the current coach is assigned to.
 * Used to scope all coach views to their assigned grounds.
 */
export function useCoachGroundIds() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["coach-ground-ids", user?.id],
    queryFn: async (): Promise<string[]> => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("ground_coaches")
        .select("ground_id")
        .eq("coach_id", user.id)
        .eq("status", "active");

      if (error) throw error;
      return (data || []).map((d) => d.ground_id);
    },
    enabled: !!user?.id,
  });
}

/**
 * Returns player IDs assigned to grounds the current coach manages.
 */
export function useCoachPlayerIds() {
  const { data: groundIds = [] } = useCoachGroundIds();

  return useQuery({
    queryKey: ["coach-player-ids", groundIds],
    queryFn: async (): Promise<string[]> => {
      if (!groundIds.length) return [];

      const { data, error } = await supabase
        .from("player_ground_assignments")
        .select("player_id")
        .in("ground_id", groundIds)
        .eq("is_active", true);

      if (error) throw error;
      return (data || []).map((d) => d.player_id);
    },
    enabled: groundIds.length > 0,
  });
}
