
-- Create ground_sports junction table
CREATE TABLE public.ground_sports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ground_id UUID NOT NULL REFERENCES public.grounds(id) ON DELETE CASCADE,
  sport_id UUID NOT NULL REFERENCES public.sports(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(ground_id, sport_id)
);

-- Enable RLS
ALTER TABLE public.ground_sports ENABLE ROW LEVEL SECURITY;

-- Anyone can view
CREATE POLICY "Anyone can view ground sports"
ON public.ground_sports FOR SELECT
USING (true);

-- Admins/superadmins can manage
CREATE POLICY "Admins can manage ground sports"
ON public.ground_sports FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'superadmin'::app_role));
