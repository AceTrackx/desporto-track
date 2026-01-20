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
  age_group: 'U-11' | 'U-13' | 'U-15' | 'U-17' | 'U-19' | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  profile?: {
    full_name: string | null;
    email?: string | null;
    avatar_url: string | null;
  };
  sport?: Sport;
}

// Ground-Coach relationship
export interface GroundCoach {
  id: string;
  ground_id: string;
  coach_id: string;
  is_ground_admin: boolean;
  assigned_date: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  // Joined fields
  ground?: Ground;
  coach?: {
    id: string;
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
}

// Player-Ground assignment
export interface PlayerGroundAssignment {
  id: string;
  player_id: string;
  ground_id: string;
  primary_coach_id: string | null;
  batch_name: string | null;
  is_active: boolean;
  joined_date: string;
  created_at: string;
  updated_at: string;
  // Joined fields
  player?: Player;
  ground?: Ground;
  primary_coach?: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
}

// Session attendance
export interface SessionAttendance {
  id: string;
  session_id: string;
  player_id: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  check_in_time: string | null;
  marked_by: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  player?: Player;
  session?: TrainingSession;
}

// Ground interface
export interface Ground {
  id: string;
  name: string;
  location: string;
  address: string | null;
  ground_type: 'indoor' | 'outdoor' | 'covered';
  surface: string | null;
  capacity: number | null;
  facilities: string[] | null;
  hourly_rate: number | null;
  opening_time: string | null;
  closing_time: string | null;
  latitude: number | null;
  longitude: number | null;
  status: 'available' | 'maintenance' | 'closed';
  created_at: string;
  updated_at: string;
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
  age_group: 'U-11' | 'U-13' | 'U-15' | 'U-17' | 'U-19' | null;
  ground_id: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  sport?: Sport;
  ground?: Ground;
}

export interface MatchPlayer {
  id: string;
  match_id: string;
  player_id: string;
  is_selected: boolean;
  position_in_match: string | null;
  jersey_number_in_match: number | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  player?: Player;
  match?: Match;
}

export interface MatchAttendance {
  id: string;
  match_id: string;
  player_id: string;
  status: 'present' | 'absent' | 'late' | 'excused' | 'pending';
  check_in_time: string | null;
  marked_by: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  player?: Player;
  match?: Match;
}

export interface TrainingSession {
  id: string;
  sport_id: string;
  coach_id: string | null;
  ground_id: string | null;
  session_date: string;
  session_type: 'regular' | 'intensive' | 'recovery' | 'tactical' | 'fitness';
  duration_minutes: number | null;
  focus_area: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  sport?: Sport;
  ground?: Ground;
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
