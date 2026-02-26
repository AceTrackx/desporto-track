import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { 
  Player, 
  MatchPerformance, 
  PracticePerformance, 
  SessionAttendance,
  Match,
  TrainingSession,
  PlayerGroundAssignment 
} from "@/types/sports";

// Helper: get current user's player ID
function useCurrentPlayerId() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["current-player-id", user?.id],
    queryFn: async (): Promise<string | null> => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from("players")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) return null;
      return data?.id ?? null;
    },
    enabled: !!user?.id,
  });
}

// Get current player data
export function useCurrentPlayer() {
  const { data: playerId } = useCurrentPlayerId();

  return useQuery({
    queryKey: ["current-player", playerId],
    queryFn: async (): Promise<Player | null> => {
      if (!playerId) return null;
      const { data, error } = await supabase
        .from("players")
        .select(`
          *,
          profile:profiles!players_user_id_fkey(full_name, email, avatar_url),
          sport:sports(*)
        `)
        .eq("id", playerId)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as Player | null;
    },
    enabled: !!playerId,
  });
}

// Get player's ground assignment
export function usePlayerAssignment() {
  const { data: playerId } = useCurrentPlayerId();

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
        .maybeSingle();
      if (error) throw error;
      return data as unknown as PlayerGroundAssignment | null;
    },
    enabled: !!playerId,
  });
}

// Get player's match performances
export function usePlayerMatchHistory(limit = 20) {
  const { data: playerId } = useCurrentPlayerId();

  return useQuery({
    queryKey: ["player-match-history", playerId, limit],
    queryFn: async (): Promise<MatchPerformance[]> => {
      if (!playerId) return [];
      const { data, error } = await supabase
        .from("match_performances")
        .select(`*, match:matches(*, sport:sports(name, icon))`)
        .eq("player_id", playerId)
        .order("created_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data as unknown as MatchPerformance[];
    },
    enabled: !!playerId,
  });
}

// Get player's practice performances
export function usePlayerPracticeHistory(limit = 20) {
  const { data: playerId } = useCurrentPlayerId();

  return useQuery({
    queryKey: ["player-practice-history", playerId, limit],
    queryFn: async (): Promise<PracticePerformance[]> => {
      if (!playerId) return [];
      const { data, error } = await supabase
        .from("practice_performances")
        .select(`*, session:training_sessions(*, sport:sports(name, icon), ground:grounds(name))`)
        .eq("player_id", playerId)
        .order("created_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data as unknown as PracticePerformance[];
    },
    enabled: !!playerId,
  });
}

// Get player's session attendance
export function usePlayerSessionAttendance(limit = 30) {
  const { data: playerId } = useCurrentPlayerId();

  return useQuery({
    queryKey: ["player-session-attendance", playerId, limit],
    queryFn: async (): Promise<SessionAttendance[]> => {
      if (!playerId) return [];
      const { data, error } = await supabase
        .from("session_attendance")
        .select(`*, session:training_sessions(*, sport:sports(name), ground:grounds(name))`)
        .eq("player_id", playerId)
        .order("created_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data as unknown as SessionAttendance[];
    },
    enabled: !!playerId,
  });
}

// Get combined attendance stats
export function usePlayerCombinedAttendance() {
  const { data: playerId } = useCurrentPlayerId();

  return useQuery({
    queryKey: ["player-combined-attendance", playerId],
    queryFn: async () => {
      if (!playerId) return { total: 0, present: 0, absent: 0, rate: 0, sessionCount: 0, matchCount: 0, monthlyData: [] };

      const { data: sessionData } = await supabase
        .from("session_attendance").select("status, created_at").eq("player_id", playerId);
      const { data: matchData } = await supabase
        .from("match_attendance").select("status, created_at").eq("player_id", playerId);

      const allAttendance = [...(sessionData || []), ...(matchData || [])];
      const total = allAttendance.length;
      const present = allAttendance.filter(a => a.status === 'present' || a.status === 'late').length;
      const absent = allAttendance.filter(a => a.status === 'absent').length;
      const rate = total > 0 ? Math.round((present / total) * 100) : 0;

      const monthlyData: Record<string, { present: number; absent: number; late: number; total: number }> = {};
      allAttendance.forEach(record => {
        const month = new Date(record.created_at).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        if (!monthlyData[month]) monthlyData[month] = { present: 0, absent: 0, late: 0, total: 0 };
        monthlyData[month].total++;
        if (record.status === 'present') monthlyData[month].present++;
        else if (record.status === 'absent') monthlyData[month].absent++;
        else if (record.status === 'late') monthlyData[month].late++;
      });

      return {
        total, present, absent, rate,
        sessionCount: sessionData?.length || 0,
        matchCount: matchData?.length || 0,
        monthlyData: Object.entries(monthlyData).map(([month, data]) => ({
          month, ...data,
          rate: data.total > 0 ? Math.round(((data.present + data.late) / data.total) * 100) : 0
        })).reverse()
      };
    },
    enabled: !!playerId,
  });
}

// Get upcoming sessions for player's ground
export function usePlayerUpcomingSessions() {
  const { data: playerId } = useCurrentPlayerId();

  return useQuery({
    queryKey: ["player-upcoming-sessions", playerId],
    queryFn: async () => {
      if (!playerId) return { sessions: [], matches: [] };

      const { data: assignment } = await supabase
        .from("player_ground_assignments")
        .select("ground_id")
        .eq("player_id", playerId)
        .eq("is_active", true)
        .maybeSingle();

      if (!assignment) return { sessions: [], matches: [] };

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayISO = today.toISOString();

      const { data: sessions } = await supabase
        .from("training_sessions")
        .select(`*, sport:sports(name, icon), ground:grounds(name, location), coach:profiles!training_sessions_coach_id_fkey(full_name)`)
        .eq("ground_id", assignment.ground_id)
        .gte("session_date", todayISO)
        .order("session_date", { ascending: true })
        .limit(10);

      const { data: playerData } = await supabase
        .from("players").select("age_group, sport_id").eq("id", playerId).maybeSingle();

      let matches: Match[] = [];
      if (playerData?.age_group) {
        const { data: matchData } = await supabase
          .from("matches")
          .select(`*, sport:sports(name, icon), ground:grounds(name, location)`)
          .eq("age_group", playerData.age_group)
          .gte("match_date", todayISO)
          .order("match_date", { ascending: true })
          .limit(10);
        matches = (matchData || []) as unknown as Match[];
      }

      return { sessions: (sessions || []) as unknown as TrainingSession[], matches };
    },
    enabled: !!playerId,
  });
}

// Get performance metrics
export function usePlayerPerformanceMetrics() {
  const { data: playerId } = useCurrentPlayerId();

  return useQuery({
    queryKey: ["player-performance-metrics", playerId],
    queryFn: async () => {
      if (!playerId) return { matchRatings: [], practiceRatings: [], allRatings: [], avgMatchRating: 0, avgPracticeRating: 0, totalMatches: 0, totalPractices: 0 };

      const { data: matchPerf } = await supabase
        .from("match_performances")
        .select(`coach_rating, minutes_played, created_at, match:matches(match_date, opponent_name)`)
        .eq("player_id", playerId).order("created_at", { ascending: true });

      const { data: practicePerf } = await supabase
        .from("practice_performances")
        .select(`coach_rating, effort_level, created_at, session:training_sessions(session_date, focus_area)`)
        .eq("player_id", playerId).order("created_at", { ascending: true });

      const matchRatings = (matchPerf || []).filter(p => p.coach_rating).map(p => ({
        date: p.match?.match_date || p.created_at,
        rating: p.coach_rating!, label: p.match?.opponent_name || 'Match', type: 'match' as const
      }));

      const practiceRatings = (practicePerf || []).filter(p => p.coach_rating).map(p => ({
        date: p.session?.session_date || p.created_at,
        rating: p.coach_rating!, label: p.session?.focus_area || 'Practice', type: 'practice' as const
      }));

      const avgMatch = matchRatings.length > 0 ? matchRatings.reduce((s, r) => s + r.rating, 0) / matchRatings.length : 0;
      const avgPractice = practiceRatings.length > 0 ? practiceRatings.reduce((s, r) => s + r.rating, 0) / practiceRatings.length : 0;

      const allRatings = [...matchRatings, ...practiceRatings]
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(-15);

      return {
        matchRatings, practiceRatings, allRatings,
        avgMatchRating: Math.round(avgMatch * 10) / 10,
        avgPracticeRating: Math.round(avgPractice * 10) / 10,
        totalMatches: matchPerf?.length || 0,
        totalPractices: practicePerf?.length || 0,
      };
    },
    enabled: !!playerId,
  });
}
