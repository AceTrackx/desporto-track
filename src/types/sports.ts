// Sports Performance Metrics Types

export interface Sport {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  created_at: string;
}

export interface MetricTemplate {
  id: string;
  sport_id: string;
  metric_name: string;
  metric_key: string;
  metric_type: 'match' | 'practice';
  data_type: 'number' | 'percentage' | 'score' | 'time' | 'boolean';
  min_value: number | null;
  max_value: number | null;
  unit: string | null;
  description: string | null;
  display_order: number;
  created_at: string;
}

export interface Player {
  id: string;
  user_id: string;
  sport_id: string;
  position: string | null;
  jersey_number: number | null;
  joined_date: string | null;
  status: 'active' | 'inactive' | 'injured' | 'suspended';
  created_at: string;
  updated_at: string;
  // Joined fields
  profile?: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
  sport?: Sport;
}

export interface Match {
  id: string;
  sport_id: string;
  opponent_name: string;
  match_date: string;
  venue: string | null;
  match_type: 'friendly' | 'league' | 'tournament' | 'cup';
  home_score: number | null;
  away_score: number | null;
  result: 'win' | 'loss' | 'draw' | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  sport?: Sport;
}

export interface TrainingSession {
  id: string;
  sport_id: string;
  coach_id: string | null;
  session_date: string;
  session_type: 'regular' | 'intensive' | 'recovery' | 'tactical' | 'fitness';
  duration_minutes: number | null;
  focus_area: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  sport?: Sport;
  coach?: {
    full_name: string | null;
  };
}

export interface MatchPerformance {
  id: string;
  player_id: string;
  match_id: string;
  metrics: Record<string, number | boolean>;
  minutes_played: number | null;
  started_match: boolean;
  coach_rating: number | null;
  coach_notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  player?: Player;
  match?: Match;
}

export interface PracticePerformance {
  id: string;
  player_id: string;
  session_id: string;
  metrics: Record<string, number | boolean>;
  attended: boolean;
  effort_level: number | null;
  coach_rating: number | null;
  coach_notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  player?: Player;
  session?: TrainingSession;
}

// Form types
export interface MatchPerformanceFormData {
  player_id: string;
  match_id: string;
  metrics: Record<string, number | boolean>;
  minutes_played?: number;
  started_match?: boolean;
  coach_rating?: number;
  coach_notes?: string;
}

export interface PracticePerformanceFormData {
  player_id: string;
  session_id: string;
  metrics: Record<string, number | boolean>;
  attended?: boolean;
  effort_level?: number;
  coach_rating?: number;
  coach_notes?: string;
}

export interface CreateMatchFormData {
  sport_id: string;
  opponent_name: string;
  match_date: string;
  venue?: string;
  match_type?: 'friendly' | 'league' | 'tournament' | 'cup';
  home_score?: number;
  away_score?: number;
  result?: 'win' | 'loss' | 'draw';
  notes?: string;
}

export interface CreateSessionFormData {
  sport_id: string;
  session_date: string;
  session_type?: 'regular' | 'intensive' | 'recovery' | 'tactical' | 'fitness';
  duration_minutes?: number;
  focus_area?: string;
  notes?: string;
}
