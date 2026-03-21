import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { GroundCoach } from "@/types/sports";

// Fetch coaches for a specific ground
export function useGroundCoaches(groundId?: string) {
  return useQuery({
    queryKey: ["ground-coaches", groundId],
    queryFn: async (): Promise<GroundCoach[]> => {
      let query = supabase
        .from("ground_coaches")
        .select(`
          *,
          ground:grounds(*),
          coach:profiles!ground_coaches_coach_id_fkey(id, full_name, email, avatar_url),
          sport:sports(id, name)
        `)
        .eq("status", "active")
        .order("assigned_date", { ascending: false });

      if (groundId) {
        query = query.eq("ground_id", groundId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as unknown as GroundCoach[];
    },
  });
}

// Fetch grounds for a specific coach
export function useCoachGrounds(coachId?: string) {
  return useQuery({
    queryKey: ["coach-grounds", coachId],
    queryFn: async (): Promise<GroundCoach[]> => {
      if (!coachId) return [];

      const { data, error } = await supabase
        .from("ground_coaches")
        .select(`
          *,
          ground:grounds(*)
        `)
        .eq("coach_id", coachId)
        .eq("status", "active")
        .order("assigned_date", { ascending: false });

      if (error) throw error;
      return data as unknown as GroundCoach[];
    },
    enabled: !!coachId,
  });
}

// Get ground admin status for a coach
export function useIsGroundAdmin(coachId?: string, groundId?: string) {
  return useQuery({
    queryKey: ["ground-admin", coachId, groundId],
    queryFn: async (): Promise<boolean> => {
      if (!coachId || !groundId) return false;

      const { data, error } = await supabase
        .from("ground_coaches")
        .select("is_ground_admin")
        .eq("coach_id", coachId)
        .eq("ground_id", groundId)
        .eq("status", "active")
        .single();

      if (error) return false;
      return data?.is_ground_admin ?? false;
    },
    enabled: !!coachId && !!groundId,
  });
}

// Assign coach to ground
export function useAssignCoachToGround() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      ground_id: string;
      coach_id: string;
      sport_id?: string;
      is_ground_admin?: boolean;
    }) => {
      const insertData: any = {
        ground_id: data.ground_id,
        coach_id: data.coach_id,
        is_ground_admin: data.is_ground_admin ?? false,
      };
      if (data.sport_id) insertData.sport_id = data.sport_id;

      const { data: result, error } = await supabase
        .from("ground_coaches")
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ground-coaches"] });
      queryClient.invalidateQueries({ queryKey: ["coach-grounds"] });
    },
  });
}

// Update coach ground assignment
export function useUpdateGroundCoach() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<GroundCoach> & { id: string }) => {
      const { data: result, error } = await supabase
        .from("ground_coaches")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ground-coaches"] });
      queryClient.invalidateQueries({ queryKey: ["coach-grounds"] });
    },
  });
}
