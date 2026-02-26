
-- Add approval-related columns to profiles
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS registration_status TEXT NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS requested_role TEXT NOT NULL DEFAULT 'member',
  ADD COLUMN IF NOT EXISTS sport_id UUID REFERENCES public.sports(id) DEFAULT NULL;

-- Update the handle_new_user trigger function to capture requested_role and sport_id
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, requested_role, sport_id, registration_status)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
        COALESCE(NEW.raw_user_meta_data->>'requested_role', 'member'),
        CASE 
          WHEN NEW.raw_user_meta_data->>'sport_id' IS NOT NULL AND NEW.raw_user_meta_data->>'sport_id' != '' 
          THEN (NEW.raw_user_meta_data->>'sport_id')::uuid 
          ELSE NULL 
        END,
        'pending'
    );
    RETURN NEW;
END;
$function$;

-- Recreate trigger (drop if exists first)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
