-- Phase 1: Create relationship tables and update existing tables

-- 1.1 Create ground_coaches table (maps coaches to grounds with optional admin privileges)
CREATE TABLE public.ground_coaches (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    ground_id UUID NOT NULL REFERENCES public.grounds(id) ON DELETE CASCADE,
    coach_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    is_ground_admin BOOLEAN NOT NULL DEFAULT false,
    assigned_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (ground_id, coach_id)
);

-- 1.2 Create player_ground_assignments table (assigns players to grounds with primary coach)
CREATE TABLE public.player_ground_assignments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    ground_id UUID NOT NULL REFERENCES public.grounds(id) ON DELETE CASCADE,
    primary_coach_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    batch_name TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    joined_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (player_id, ground_id)
);

-- 1.3 Create session_attendance table (dedicated attendance tracking per session)
CREATE TABLE public.session_attendance (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES public.training_sessions(id) ON DELETE CASCADE,
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'excused')),
    check_in_time TIME,
    marked_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (session_id, player_id)
);

-- 1.4 Add ground_id to training_sessions
ALTER TABLE public.training_sessions 
ADD COLUMN ground_id UUID REFERENCES public.grounds(id) ON DELETE SET NULL;

-- 1.5 Add ground_id to matches
ALTER TABLE public.matches 
ADD COLUMN ground_id UUID REFERENCES public.grounds(id) ON DELETE SET NULL;

-- Enable RLS on new tables
ALTER TABLE public.ground_coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_ground_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_attendance ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ground_coaches
CREATE POLICY "Anyone can view ground coaches"
ON public.ground_coaches FOR SELECT
USING (true);

CREATE POLICY "Anyone can manage ground coaches"
ON public.ground_coaches FOR ALL
USING (true);

-- RLS Policies for player_ground_assignments
CREATE POLICY "Anyone can view player assignments"
ON public.player_ground_assignments FOR SELECT
USING (true);

CREATE POLICY "Anyone can manage player assignments"
ON public.player_ground_assignments FOR ALL
USING (true);

-- RLS Policies for session_attendance
CREATE POLICY "Anyone can view attendance"
ON public.session_attendance FOR SELECT
USING (true);

CREATE POLICY "Anyone can manage attendance"
ON public.session_attendance FOR ALL
USING (true);

-- Create updated_at triggers for new tables
CREATE TRIGGER update_ground_coaches_updated_at
BEFORE UPDATE ON public.ground_coaches
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_player_ground_assignments_updated_at
BEFORE UPDATE ON public.player_ground_assignments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_session_attendance_updated_at
BEFORE UPDATE ON public.session_attendance
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();