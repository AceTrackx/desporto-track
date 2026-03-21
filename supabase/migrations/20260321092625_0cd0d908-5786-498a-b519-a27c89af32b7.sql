CREATE TABLE public.bmi_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  height_cm numeric NOT NULL,
  weight_kg numeric NOT NULL,
  bmi_value numeric NOT NULL,
  recorded_by uuid REFERENCES public.profiles(id),
  notes text,
  recorded_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.bmi_records ENABLE ROW LEVEL SECURITY;

-- Everyone can view BMI records
CREATE POLICY "Anyone can view bmi records" ON public.bmi_records
  FOR SELECT USING (true);

-- Authenticated users can insert
CREATE POLICY "Authenticated users can insert bmi records" ON public.bmi_records
  FOR INSERT TO authenticated WITH CHECK (true);

-- Only coaches/admins can delete (not students)
CREATE POLICY "Coaches and admins can delete bmi records" ON public.bmi_records
  FOR DELETE TO authenticated
  USING (
    has_role(auth.uid(), 'coach'::app_role) OR 
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'superadmin'::app_role)
  );

-- Coaches/admins can update
CREATE POLICY "Coaches and admins can update bmi records" ON public.bmi_records
  FOR UPDATE TO authenticated
  USING (
    has_role(auth.uid(), 'coach'::app_role) OR 
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'superadmin'::app_role)
  );