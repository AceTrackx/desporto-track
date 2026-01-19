
-- Create sports table
CREATE TABLE public.sports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create metric templates table
CREATE TABLE public.metric_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sport_id UUID REFERENCES public.sports(id) ON DELETE CASCADE NOT NULL,
    metric_name TEXT NOT NULL,
    metric_key TEXT NOT NULL,
    metric_type TEXT NOT NULL CHECK (metric_type IN ('match', 'practice')),
    data_type TEXT NOT NULL CHECK (data_type IN ('number', 'percentage', 'score', 'time', 'boolean')),
    min_value NUMERIC,
    max_value NUMERIC,
    unit TEXT,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(sport_id, metric_key, metric_type)
);

-- Create players table (extends user profiles for sport-specific data)
CREATE TABLE public.players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    sport_id UUID REFERENCES public.sports(id) ON DELETE CASCADE NOT NULL,
    position TEXT,
    jersey_number INTEGER,
    joined_date DATE DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'injured', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, sport_id)
);

-- Create matches table
CREATE TABLE public.matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sport_id UUID REFERENCES public.sports(id) ON DELETE CASCADE NOT NULL,
    opponent_name TEXT NOT NULL,
    match_date TIMESTAMP WITH TIME ZONE NOT NULL,
    venue TEXT,
    match_type TEXT DEFAULT 'friendly' CHECK (match_type IN ('friendly', 'league', 'tournament', 'cup')),
    home_score INTEGER,
    away_score INTEGER,
    result TEXT CHECK (result IN ('win', 'loss', 'draw', NULL)),
    notes TEXT,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create training sessions table
CREATE TABLE public.training_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sport_id UUID REFERENCES public.sports(id) ON DELETE CASCADE NOT NULL,
    coach_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    session_date TIMESTAMP WITH TIME ZONE NOT NULL,
    session_type TEXT DEFAULT 'regular' CHECK (session_type IN ('regular', 'intensive', 'recovery', 'tactical', 'fitness')),
    duration_minutes INTEGER,
    focus_area TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create match performances table (stores individual player match stats)
CREATE TABLE public.match_performances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES public.players(id) ON DELETE CASCADE NOT NULL,
    match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE NOT NULL,
    metrics JSONB NOT NULL DEFAULT '{}',
    minutes_played INTEGER,
    started_match BOOLEAN DEFAULT false,
    coach_rating INTEGER CHECK (coach_rating >= 1 AND coach_rating <= 10),
    coach_notes TEXT,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(player_id, match_id)
);

-- Create practice performances table (stores individual player practice assessments)
CREATE TABLE public.practice_performances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES public.players(id) ON DELETE CASCADE NOT NULL,
    session_id UUID REFERENCES public.training_sessions(id) ON DELETE CASCADE NOT NULL,
    metrics JSONB NOT NULL DEFAULT '{}',
    attended BOOLEAN DEFAULT true,
    effort_level INTEGER CHECK (effort_level >= 1 AND effort_level <= 5),
    coach_rating INTEGER CHECK (coach_rating >= 1 AND coach_rating <= 10),
    coach_notes TEXT,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(player_id, session_id)
);

-- Enable RLS on all tables
ALTER TABLE public.sports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metric_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_performances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_performances ENABLE ROW LEVEL SECURITY;

-- Sports: Public read, admin/superadmin write
CREATE POLICY "Anyone can view sports" ON public.sports FOR SELECT USING (true);
CREATE POLICY "Admins can manage sports" ON public.sports FOR ALL USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'superadmin'));

-- Metric templates: Public read, admin/superadmin write
CREATE POLICY "Anyone can view metric templates" ON public.metric_templates FOR SELECT USING (true);
CREATE POLICY "Admins can manage metric templates" ON public.metric_templates FOR ALL USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'superadmin'));

-- Players: Users can view themselves, coaches/admins can view all
CREATE POLICY "Users can view their own player profile" ON public.players FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Coaches and admins can view all players" ON public.players FOR SELECT USING (has_role(auth.uid(), 'coach') OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'superadmin'));
CREATE POLICY "Coaches and admins can manage players" ON public.players FOR ALL USING (has_role(auth.uid(), 'coach') OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'superadmin'));

-- Matches: Authenticated users can view, coaches/admins can manage
CREATE POLICY "Authenticated users can view matches" ON public.matches FOR SELECT TO authenticated USING (true);
CREATE POLICY "Coaches and admins can manage matches" ON public.matches FOR ALL USING (has_role(auth.uid(), 'coach') OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'superadmin'));

-- Training sessions: Authenticated users can view, coaches/admins can manage
CREATE POLICY "Authenticated users can view training sessions" ON public.training_sessions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Coaches and admins can manage training sessions" ON public.training_sessions FOR ALL USING (has_role(auth.uid(), 'coach') OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'superadmin'));

-- Match performances: Players can view their own, coaches/admins can view/manage all
CREATE POLICY "Players can view their own match performances" ON public.match_performances FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.players WHERE players.id = match_performances.player_id AND players.user_id = auth.uid())
);
CREATE POLICY "Coaches and admins can view all match performances" ON public.match_performances FOR SELECT USING (has_role(auth.uid(), 'coach') OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'superadmin'));
CREATE POLICY "Coaches and admins can manage match performances" ON public.match_performances FOR ALL USING (has_role(auth.uid(), 'coach') OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'superadmin'));

-- Practice performances: Players can view their own, coaches/admins can view/manage all
CREATE POLICY "Players can view their own practice performances" ON public.practice_performances FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.players WHERE players.id = practice_performances.player_id AND players.user_id = auth.uid())
);
CREATE POLICY "Coaches and admins can view all practice performances" ON public.practice_performances FOR SELECT USING (has_role(auth.uid(), 'coach') OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'superadmin'));
CREATE POLICY "Coaches and admins can manage practice performances" ON public.practice_performances FOR ALL USING (has_role(auth.uid(), 'coach') OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'superadmin'));

-- Create triggers for updated_at columns
CREATE TRIGGER update_players_updated_at BEFORE UPDATE ON public.players FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON public.matches FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_training_sessions_updated_at BEFORE UPDATE ON public.training_sessions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_match_performances_updated_at BEFORE UPDATE ON public.match_performances FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_practice_performances_updated_at BEFORE UPDATE ON public.practice_performances FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add 'coach' to the app_role enum if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'coach' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'app_role')) THEN
        ALTER TYPE public.app_role ADD VALUE 'coach';
    END IF;
END $$;
