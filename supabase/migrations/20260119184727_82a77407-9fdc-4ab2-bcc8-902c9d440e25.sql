-- Create grounds table
CREATE TABLE public.grounds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    address TEXT,
    ground_type TEXT NOT NULL DEFAULT 'outdoor',
    surface TEXT,
    capacity INTEGER,
    facilities TEXT[],
    hourly_rate DECIMAL(10,2),
    status TEXT NOT NULL DEFAULT 'available',
    latitude DECIMAL(10,6),
    longitude DECIMAL(10,6),
    opening_time TIME DEFAULT '06:00',
    closing_time TIME DEFAULT '22:00',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create schedule_bookings table for ground bookings
CREATE TABLE public.schedule_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ground_id UUID REFERENCES public.grounds(id) ON DELETE CASCADE,
    sport_id UUID REFERENCES public.sports(id) ON DELETE SET NULL,
    session_id UUID REFERENCES public.training_sessions(id) ON DELETE SET NULL,
    match_id UUID REFERENCES public.matches(id) ON DELETE SET NULL,
    booked_by UUID,
    title TEXT NOT NULL,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    booking_type TEXT NOT NULL DEFAULT 'training',
    status TEXT NOT NULL DEFAULT 'confirmed',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.grounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule_bookings ENABLE ROW LEVEL SECURITY;

-- Permissive policies for demo
CREATE POLICY "Anyone can view grounds" ON public.grounds FOR SELECT USING (true);
CREATE POLICY "Anyone can manage grounds" ON public.grounds FOR ALL USING (true);

CREATE POLICY "Anyone can view bookings" ON public.schedule_bookings FOR SELECT USING (true);
CREATE POLICY "Anyone can manage bookings" ON public.schedule_bookings FOR ALL USING (true);

-- Create updated_at triggers
CREATE TRIGGER update_grounds_updated_at
    BEFORE UPDATE ON public.grounds
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_schedule_bookings_updated_at
    BEFORE UPDATE ON public.schedule_bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();