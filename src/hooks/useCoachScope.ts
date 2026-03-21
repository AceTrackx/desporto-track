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

/**
 * Returns sports available on the coach's assigned grounds.
 */
export function useCoachSports() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["coach-sports", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      // Get sports directly from ground_coaches assignments
      const { data, error } = await supabase
        .from("ground_coaches")
        .select("sport_id, sport:sports(id, name), ground_id")
        .eq("coach_id", user.id)
        .eq("status", "active");

      if (error) throw error;

      // If coach is a ground admin (sport_id is null), get all sports for their grounds
      const directSports: any[] = [];
      const adminGroundIds: string[] = [];

      (data || []).forEach((gc: any) => {
        if (gc.sport_id && gc.sport) {
          directSports.push(gc.sport);
        } else if (!gc.sport_id) {
          adminGroundIds.push(gc.ground_id);
        }
      });

      if (adminGroundIds.length > 0) {
        const { data: groundSports, error: gsError } = await supabase
          .from("ground_sports")
          .select("*, sport:sports(id, name)")
          .in("ground_id", adminGroundIds);

        if (!gsError && groundSports) {
          groundSports.forEach((gs: any) => {
            if (gs.sport) directSports.push(gs.sport);
          });
        }
      }

      // Deduplicate by sport id
      const seen = new Set<string>();
      return directSports.filter((s: any) => {
        if (!s?.id || seen.has(s.id)) return false;
        seen.add(s.id);
        return true;
      });
    },
    enabled: !!user?.id,
  });
}
