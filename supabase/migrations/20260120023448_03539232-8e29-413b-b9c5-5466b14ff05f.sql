
-- Add age_group to players table
ALTER TABLE public.players ADD COLUMN IF NOT EXISTS age_group text;

-- Add age_group to matches table for selecting eligible players
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS age_group text;

-- Create match_players table for per-match player selection
CREATE TABLE IF NOT EXISTS public.match_players (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id uuid NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
    player_id uuid NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    is_selected boolean NOT NULL DEFAULT true,
    position_in_match text,
    jersey_number_in_match integer,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(match_id, player_id)
);

-- Create match_attendance table for tracking match attendance (separate from practice)
CREATE TABLE IF NOT EXISTS public.match_attendance (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id uuid NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
    player_id uuid NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('present', 'absent', 'late', 'excused', 'pending')),
    check_in_time time without time zone,
    marked_by uuid REFERENCES public.profiles(id),
    notes text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(match_id, player_id)
);

-- Enable RLS
ALTER TABLE public.match_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_attendance ENABLE ROW LEVEL SECURITY;

-- RLS policies for match_players
CREATE POLICY "Anyone can view match players" ON public.match_players FOR SELECT USING (true);
CREATE POLICY "Anyone can manage match players" ON public.match_players FOR ALL USING (true);

-- RLS policies for match_attendance
CREATE POLICY "Anyone can view match attendance" ON public.match_attendance FOR SELECT USING (true);
CREATE POLICY "Anyone can manage match attendance" ON public.match_attendance FOR ALL USING (true);

-- Updated_at triggers
CREATE TRIGGER update_match_players_updated_at
    BEFORE UPDATE ON public.match_players
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_match_attendance_updated_at
    BEFORE UPDATE ON public.match_attendance
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Update existing players with age groups
UPDATE public.players SET age_group = 'U-15' WHERE id IN (
    SELECT id FROM public.players ORDER BY created_at LIMIT 4
);
UPDATE public.players SET age_group = 'U-13' WHERE id IN (
    SELECT id FROM public.players WHERE age_group IS NULL ORDER BY created_at LIMIT 4
);
UPDATE public.players SET age_group = 'U-17' WHERE id IN (
    SELECT id FROM public.players WHERE age_group IS NULL ORDER BY created_at LIMIT 4
);

-- Update existing matches with age groups
UPDATE public.matches SET age_group = 'U-15' WHERE sport_id = 'f6738847-da39-46c5-a419-c0dc1fe43cac';
UPDATE public.matches SET age_group = 'U-13' WHERE sport_id = '6cff9eb9-75d9-4cee-a093-59edc15d4af0';
UPDATE public.matches SET age_group = 'U-17' WHERE sport_id = '3dd7c405-be9a-477c-b5f1-ced1ad89cd67';
