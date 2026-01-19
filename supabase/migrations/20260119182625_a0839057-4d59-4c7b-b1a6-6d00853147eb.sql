
-- Drop the foreign key constraint on profiles.id that references auth.users
-- This allows creating test profiles without auth records
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Add a more permissive insert policy for profiles (for demo purposes)
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Anyone can insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);

-- Update players table to allow unauthenticated access for demo
DROP POLICY IF EXISTS "Users can view their own player profile" ON public.players;
DROP POLICY IF EXISTS "Coaches and admins can view all players" ON public.players;
DROP POLICY IF EXISTS "Coaches and admins can manage players" ON public.players;

-- Create permissive policies for demo
CREATE POLICY "Anyone can view players" ON public.players FOR SELECT USING (true);
CREATE POLICY "Anyone can manage players" ON public.players FOR ALL USING (true);

-- Update matches to be viewable by anyone for demo
DROP POLICY IF EXISTS "Authenticated users can view matches" ON public.matches;
DROP POLICY IF EXISTS "Coaches and admins can manage matches" ON public.matches;
CREATE POLICY "Anyone can view matches" ON public.matches FOR SELECT USING (true);
CREATE POLICY "Anyone can manage matches" ON public.matches FOR ALL USING (true);

-- Update training_sessions to be viewable by anyone for demo
DROP POLICY IF EXISTS "Authenticated users can view training sessions" ON public.training_sessions;
DROP POLICY IF EXISTS "Coaches and admins can manage training sessions" ON public.training_sessions;
CREATE POLICY "Anyone can view training sessions" ON public.training_sessions FOR SELECT USING (true);
CREATE POLICY "Anyone can manage training sessions" ON public.training_sessions FOR ALL USING (true);

-- Update performance tables for demo access
DROP POLICY IF EXISTS "Players can view their own match performances" ON public.match_performances;
DROP POLICY IF EXISTS "Coaches and admins can view all match performances" ON public.match_performances;
DROP POLICY IF EXISTS "Coaches and admins can manage match performances" ON public.match_performances;
CREATE POLICY "Anyone can view match performances" ON public.match_performances FOR SELECT USING (true);
CREATE POLICY "Anyone can manage match performances" ON public.match_performances FOR ALL USING (true);

DROP POLICY IF EXISTS "Players can view their own practice performances" ON public.practice_performances;
DROP POLICY IF EXISTS "Coaches and admins can view all practice performances" ON public.practice_performances;
DROP POLICY IF EXISTS "Coaches and admins can manage practice performances" ON public.practice_performances;
CREATE POLICY "Anyone can view practice performances" ON public.practice_performances FOR SELECT USING (true);
CREATE POLICY "Anyone can manage practice performances" ON public.practice_performances FOR ALL USING (true);
