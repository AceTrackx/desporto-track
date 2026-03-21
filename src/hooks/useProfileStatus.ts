import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface ProfileWithStatus {
  id: string;
  email: string | null;
  full_name: string | null;
  registration_status: string;
  requested_role: string;
  sport_id: string | null;
  created_at: string;
  sport?: { id: string; name: string } | null;
}

export function useCurrentProfile() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["current-profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (error) throw error;
      return data as ProfileWithStatus;
    },
    enabled: !!user,
  });
}

export function usePendingUsers() {
  return useQuery({
    queryKey: ["pending-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*, sport:sports(id, name)")
        .in("registration_status", ["pending"])
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ProfileWithStatus[];
    },
  });
}

export function useAllRegisteredUsers() {
  return useQuery({
    queryKey: ["all-registered-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*, sport:sports(id, name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ProfileWithStatus[];
    },
  });
}

export function useApproveUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      role,
      groundId,
      sportId,
    }: {
      userId: string;
      role: string;
      groundId: string;
      sportId?: string;
    }) => {
      // 1. Update profile status
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ registration_status: "approved" })
        .eq("id", userId);
      if (profileError) throw profileError;

      // 2. Insert role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role: role as any });
      if (roleError) throw roleError;

      // 3. If coach, assign to ground + sport combo
      if (role === "coach") {
        const insertData: any = { ground_id: groundId, coach_id: userId };
        if (sportId) insertData.sport_id = sportId;
        const { error: gcError } = await supabase
          .from("ground_coaches")
          .insert(insertData);
        if (gcError) throw gcError;
      }

      // 4. If admin, assign as ground admin (no sport needed)
      if (role === "admin") {
        const { error: gcError } = await supabase
          .from("ground_coaches")
          .insert({ ground_id: groundId, coach_id: userId, is_ground_admin: true });
        if (gcError) throw gcError;
      }

      // 4. If member, create player + assign to ground
      if (role === "member" && sportId) {
        const { data: player, error: playerError } = await supabase
          .from("players")
          .insert({ user_id: userId, sport_id: sportId })
          .select()
          .single();
        if (playerError) throw playerError;

        const { error: assignError } = await supabase
          .from("player_ground_assignments")
          .insert({ player_id: player.id, ground_id: groundId });
        if (assignError) throw assignError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-users"] });
      queryClient.invalidateQueries({ queryKey: ["all-registered-users"] });
      queryClient.invalidateQueries({ queryKey: ["grounds"] });
    },
  });
}

export function useRejectUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from("profiles")
        .update({ registration_status: "rejected" })
        .eq("id", userId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-users"] });
      queryClient.invalidateQueries({ queryKey: ["all-registered-users"] });
    },
  });
}
