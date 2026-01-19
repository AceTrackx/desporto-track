import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { SessionAttendance } from "@/types/sports";

// Fetch attendance for a session
export function useSessionAttendance(sessionId?: string) {
  return useQuery({
    queryKey: ["session-attendance", sessionId],
    queryFn: async (): Promise<SessionAttendance[]> => {
      if (!sessionId) return [];

      const { data, error } = await supabase
        .from("session_attendance")
        .select(`
          *,
          player:players(
            *,
            profile:profiles!players_user_id_fkey(full_name, avatar_url)
          )
        `)
        .eq("session_id", sessionId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as unknown as SessionAttendance[];
    },
    enabled: !!sessionId,
  });
}

// Fetch attendance history for a player
export function usePlayerAttendanceHistory(playerId?: string, limit = 20) {
  return useQuery({
    queryKey: ["player-attendance", playerId, limit],
    queryFn: async (): Promise<SessionAttendance[]> => {
      if (!playerId) return [];

      const { data, error } = await supabase
        .from("session_attendance")
        .select(`
          *,
          session:training_sessions(
            *,
            sport:sports(name),
            ground:grounds(name)
          )
        `)
        .eq("player_id", playerId)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as unknown as SessionAttendance[];
    },
    enabled: !!playerId,
  });
}

// Get attendance stats for a session
export function useSessionAttendanceStats(sessionId?: string) {
  return useQuery({
    queryKey: ["session-attendance-stats", sessionId],
    queryFn: async () => {
      if (!sessionId) return { present: 0, absent: 0, late: 0, excused: 0, total: 0 };

      const { data, error } = await supabase
        .from("session_attendance")
        .select("status")
        .eq("session_id", sessionId);

      if (error) throw error;

      const stats = { present: 0, absent: 0, late: 0, excused: 0, total: data?.length || 0 };
      data?.forEach((record) => {
        if (record.status in stats) {
          stats[record.status as keyof typeof stats]++;
        }
      });

      return stats;
    },
    enabled: !!sessionId,
  });
}

// Get attendance rate for a player
export function usePlayerAttendanceRate(playerId?: string) {
  return useQuery({
    queryKey: ["player-attendance-rate", playerId],
    queryFn: async () => {
      if (!playerId) return { rate: 0, present: 0, total: 0 };

      const { data, error } = await supabase
        .from("session_attendance")
        .select("status")
        .eq("player_id", playerId);

      if (error) throw error;

      const total = data?.length || 0;
      const present = data?.filter((r) => r.status === "present" || r.status === "late").length || 0;
      const rate = total > 0 ? Math.round((present / total) * 100) : 0;

      return { rate, present, total };
    },
    enabled: !!playerId,
  });
}

// Mark attendance for a single player
export function useMarkAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      session_id: string;
      player_id: string;
      status: "present" | "absent" | "late" | "excused";
      check_in_time?: string;
      notes?: string;
    }) => {
      const { data: userData } = await supabase.auth.getUser();

      // Upsert to handle re-marking attendance
      const { data: result, error } = await supabase
        .from("session_attendance")
        .upsert(
          {
            session_id: data.session_id,
            player_id: data.player_id,
            status: data.status,
            check_in_time: data.check_in_time,
            notes: data.notes,
            marked_by: userData.user?.id,
          },
          { onConflict: "session_id,player_id" }
        )
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["session-attendance", variables.session_id] });
      queryClient.invalidateQueries({ queryKey: ["session-attendance-stats", variables.session_id] });
      queryClient.invalidateQueries({ queryKey: ["player-attendance", variables.player_id] });
      queryClient.invalidateQueries({ queryKey: ["player-attendance-rate", variables.player_id] });
    },
  });
}

// Bulk mark attendance for multiple players
export function useBulkMarkAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      records: Array<{
        session_id: string;
        player_id: string;
        status: "present" | "absent" | "late" | "excused";
        check_in_time?: string;
        notes?: string;
      }>
    ) => {
      const { data: userData } = await supabase.auth.getUser();

      const recordsWithMarker = records.map((r) => ({
        ...r,
        marked_by: userData.user?.id,
      }));

      const { data, error } = await supabase
        .from("session_attendance")
        .upsert(recordsWithMarker, { onConflict: "session_id,player_id" })
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session-attendance"] });
      queryClient.invalidateQueries({ queryKey: ["session-attendance-stats"] });
      queryClient.invalidateQueries({ queryKey: ["player-attendance"] });
      queryClient.invalidateQueries({ queryKey: ["player-attendance-rate"] });
    },
  });
}
