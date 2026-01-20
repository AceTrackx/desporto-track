import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { 
  Player, 
  MatchPerformance, 
  PracticePerformance, 
  SessionAttendance,
  Match,
  TrainingSession,
  PlayerGroundAssignment 
} from "@/types/sports";

// Mock player ID for demo - in real app, get from auth context
const MOCK_PLAYER_ID = "7eac84a8-6025-4881-92d9-636da99535db";

// Get current player data
export function useCurrentPlayer() {
  return useQuery({
    queryKey: ["current-player"],
    queryFn: async (): Promise<Player | null> => {
      const { data, error } = await supabase
        .from("players")
        .select(`
          *,
          profile:profiles!players_user_id_fkey(full_name, email, avatar_url),
          sport:sports(*)
        `)
        .eq("id", MOCK_PLAYER_ID)
        .maybeSingle();

      if (error) throw error;
      return data as unknown as Player | null;
    },
  });
}

// Get player's ground assignment
export function usePlayerAssignment() {
  return useQuery({
    queryKey: ["player-assignment", MOCK_PLAYER_ID],
    queryFn: async (): Promise<PlayerGroundAssignment | null> => {
      const { data, error } = await supabase
        .from("player_ground_assignments")
        .select(`
          *,
          ground:grounds(*),
          primary_coach:profiles!player_ground_assignments_primary_coach_id_fkey(id, full_name, avatar_url)
        `)
        .eq("player_id", MOCK_PLAYER_ID)
        .eq("is_active", true)
        .maybeSingle();

      if (error) throw error;
      return data as unknown as PlayerGroundAssignment | null;
    },
  });
}

// Get player's match performances with match details
export function usePlayerMatchHistory(limit = 20) {
  return useQuery({
    queryKey: ["player-match-history", MOCK_PLAYER_ID, limit],
    queryFn: async (): Promise<MatchPerformance[]> => {
      const { data, error } = await supabase
        .from("match_performances")
        .select(`
          *,
          match:matches(
            *,
            sport:sports(name, icon)
          )
        `)
        .eq("player_id", MOCK_PLAYER_ID)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as unknown as MatchPerformance[];
    },
  });
}

// Get player's practice performances with session details
export function usePlayerPracticeHistory(limit = 20) {
  return useQuery({
    queryKey: ["player-practice-history", MOCK_PLAYER_ID, limit],
    queryFn: async (): Promise<PracticePerformance[]> => {
      const { data, error } = await supabase
        .from("practice_performances")
        .select(`
          *,
          session:training_sessions(
            *,
            sport:sports(name, icon),
            ground:grounds(name)
          )
        `)
        .eq("player_id", MOCK_PLAYER_ID)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as unknown as PracticePerformance[];
    },
  });
}

// Get player's session attendance history
export function usePlayerSessionAttendance(limit = 30) {
  return useQuery({
    queryKey: ["player-session-attendance", MOCK_PLAYER_ID, limit],
    queryFn: async (): Promise<SessionAttendance[]> => {
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
        .eq("player_id", MOCK_PLAYER_ID)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as unknown as SessionAttendance[];
    },
  });
}

// Get player's match attendance history
export function usePlayerMatchAttendance(limit = 30) {
  return useQuery({
    queryKey: ["player-match-attendance", MOCK_PLAYER_ID, limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("match_attendance")
        .select(`
          *,
          match:matches(
            *,
            sport:sports(name)
          )
        `)
        .eq("player_id", MOCK_PLAYER_ID)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    },
  });
}

// Get combined attendance stats (sessions + matches)
export function usePlayerCombinedAttendance() {
  return useQuery({
    queryKey: ["player-combined-attendance", MOCK_PLAYER_ID],
    queryFn: async () => {
      // Get session attendance
      const { data: sessionData, error: sessionError } = await supabase
        .from("session_attendance")
        .select("status, created_at")
        .eq("player_id", MOCK_PLAYER_ID);

      if (sessionError) throw sessionError;

      // Get match attendance
      const { data: matchData, error: matchError } = await supabase
        .from("match_attendance")
        .select("status, created_at")
        .eq("player_id", MOCK_PLAYER_ID);

      if (matchError) throw matchError;

      // Combine stats
      const allAttendance = [...(sessionData || []), ...(matchData || [])];
      const total = allAttendance.length;
      const present = allAttendance.filter(a => a.status === 'present' || a.status === 'late').length;
      const absent = allAttendance.filter(a => a.status === 'absent').length;
      const rate = total > 0 ? Math.round((present / total) * 100) : 0;

      // Monthly breakdown for graph
      const monthlyData: Record<string, { present: number; absent: number; late: number; total: number }> = {};
      allAttendance.forEach(record => {
        const month = new Date(record.created_at).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        if (!monthlyData[month]) {
          monthlyData[month] = { present: 0, absent: 0, late: 0, total: 0 };
        }
        monthlyData[month].total++;
        if (record.status === 'present') monthlyData[month].present++;
        else if (record.status === 'absent') monthlyData[month].absent++;
        else if (record.status === 'late') monthlyData[month].late++;
      });

      return {
        total,
        present,
        absent,
        rate,
        sessionCount: sessionData?.length || 0,
        matchCount: matchData?.length || 0,
        monthlyData: Object.entries(monthlyData).map(([month, data]) => ({
          month,
          ...data,
          rate: data.total > 0 ? Math.round(((data.present + data.late) / data.total) * 100) : 0
        })).reverse()
      };
    },
  });
}

// Get upcoming sessions for player's ground
export function usePlayerUpcomingSessions() {
  return useQuery({
    queryKey: ["player-upcoming-sessions", MOCK_PLAYER_ID],
    queryFn: async () => {
      // First get player's ground assignment
      const { data: assignment, error: assignmentError } = await supabase
        .from("player_ground_assignments")
        .select("ground_id, player:players(sport_id)")
        .eq("player_id", MOCK_PLAYER_ID)
        .eq("is_active", true)
        .maybeSingle();

      if (assignmentError) throw assignmentError;
      if (!assignment) return { sessions: [], matches: [] };

      // Use start of today to include all sessions scheduled for today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayISO = today.toISOString();

      // Get upcoming sessions for player's ground
      const { data: sessions, error: sessionsError } = await supabase
        .from("training_sessions")
        .select(`
          *,
          sport:sports(name, icon),
          ground:grounds(name, location),
          coach:profiles!training_sessions_coach_id_fkey(full_name)
        `)
        .eq("ground_id", assignment.ground_id)
        .gte("session_date", todayISO)
        .order("session_date", { ascending: true })
        .limit(10);

      if (sessionsError) throw sessionsError;

      // Get upcoming matches for player's age group
      const { data: playerData } = await supabase
        .from("players")
        .select("age_group, sport_id")
        .eq("id", MOCK_PLAYER_ID)
        .maybeSingle();

      let matches: Match[] = [];
      if (playerData?.age_group) {
        const { data: matchData, error: matchError } = await supabase
          .from("matches")
          .select(`
            *,
            sport:sports(name, icon),
            ground:grounds(name, location)
          `)
          .eq("age_group", playerData.age_group)
          .gte("match_date", todayISO)
          .order("match_date", { ascending: true })
          .limit(10);

        if (matchError) throw matchError;
        matches = matchData as unknown as Match[];
      }

      return {
        sessions: sessions as unknown as TrainingSession[],
        matches
      };
    },
  });
}

// Get performance metrics over time for graphs
export function usePlayerPerformanceMetrics() {
  return useQuery({
    queryKey: ["player-performance-metrics", MOCK_PLAYER_ID],
    queryFn: async () => {
      // Get match performances
      const { data: matchPerf, error: matchError } = await supabase
        .from("match_performances")
        .select(`
          coach_rating,
          minutes_played,
          created_at,
          match:matches(match_date, opponent_name)
        `)
        .eq("player_id", MOCK_PLAYER_ID)
        .order("created_at", { ascending: true });

      if (matchError) throw matchError;

      // Get practice performances
      const { data: practicePerf, error: practiceError } = await supabase
        .from("practice_performances")
        .select(`
          coach_rating,
          effort_level,
          created_at,
          session:training_sessions(session_date, focus_area)
        `)
        .eq("player_id", MOCK_PLAYER_ID)
        .order("created_at", { ascending: true });

      if (practiceError) throw practiceError;

      // Calculate averages and trends
      const matchRatings = (matchPerf || [])
        .filter(p => p.coach_rating)
        .map(p => ({
          date: p.match?.match_date || p.created_at,
          rating: p.coach_rating!,
          label: p.match?.opponent_name || 'Match',
          type: 'match' as const
        }));

      const practiceRatings = (practicePerf || [])
        .filter(p => p.coach_rating)
        .map(p => ({
          date: p.session?.session_date || p.created_at,
          rating: p.coach_rating!,
          label: p.session?.focus_area || 'Practice',
          type: 'practice' as const
        }));

      const avgMatchRating = matchRatings.length > 0 
        ? matchRatings.reduce((sum, r) => sum + r.rating, 0) / matchRatings.length 
        : 0;

      const avgPracticeRating = practiceRatings.length > 0
        ? practiceRatings.reduce((sum, r) => sum + r.rating, 0) / practiceRatings.length
        : 0;

      // Combine and sort by date
      const allRatings = [...matchRatings, ...practiceRatings]
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(-15); // Last 15 entries

      return {
        matchRatings,
        practiceRatings,
        allRatings,
        avgMatchRating: Math.round(avgMatchRating * 10) / 10,
        avgPracticeRating: Math.round(avgPracticeRating * 10) / 10,
        totalMatches: matchPerf?.length || 0,
        totalPractices: practicePerf?.length || 0
      };
    },
  });
}
