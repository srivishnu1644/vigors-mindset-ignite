
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  date_of_birth DATE,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create memberships table
CREATE TABLE public.memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  membership_type TEXT NOT NULL CHECK (membership_type IN ('basic', 'premium', 'elite')),
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'expired', 'cancelled')),
  price DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create workouts table
CREATE TABLE public.workouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER,
  calories_burned INTEGER,
  workout_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create exercises table
CREATE TABLE public.exercises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('strength', 'cardio', 'flexibility', 'balance', 'sports')),
  muscle_groups TEXT[],
  instructions TEXT,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  equipment_needed TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create workout_exercises junction table
CREATE TABLE public.workout_exercises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workout_id UUID REFERENCES public.workouts(id) ON DELETE CASCADE NOT NULL,
  exercise_id UUID REFERENCES public.exercises(id) ON DELETE CASCADE NOT NULL,
  sets INTEGER,
  reps INTEGER,
  weight_kg DECIMAL(5,2),
  rest_seconds INTEGER,
  notes TEXT,
  order_in_workout INTEGER NOT NULL DEFAULT 1
);

-- Create progress_tracking table
CREATE TABLE public.progress_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  metric_type TEXT NOT NULL CHECK (metric_type IN ('weight', 'body_fat', 'muscle_mass', 'measurements')),
  value DECIMAL(8,2) NOT NULL,
  unit TEXT NOT NULL,
  body_part TEXT, -- for measurements like chest, waist, arms, etc.
  recorded_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create goals table
CREATE TABLE public.goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  goal_type TEXT NOT NULL CHECK (goal_type IN ('weight_loss', 'muscle_gain', 'strength', 'endurance', 'general_fitness')),
  target_value DECIMAL(8,2),
  target_unit TEXT,
  target_date DATE,
  current_value DECIMAL(8,2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create RLS policies for memberships
CREATE POLICY "Users can view their own memberships" 
  ON public.memberships 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own memberships" 
  ON public.memberships 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own memberships" 
  ON public.memberships 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create RLS policies for workouts
CREATE POLICY "Users can view their own workouts" 
  ON public.workouts 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own workouts" 
  ON public.workouts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workouts" 
  ON public.workouts 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workouts" 
  ON public.workouts 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for exercises (public read access)
CREATE POLICY "Anyone can view exercises" 
  ON public.exercises 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Create RLS policies for workout_exercises
CREATE POLICY "Users can view their own workout exercises" 
  ON public.workout_exercises 
  FOR SELECT 
  USING (auth.uid() IN (SELECT user_id FROM public.workouts WHERE id = workout_id));

CREATE POLICY "Users can manage their own workout exercises" 
  ON public.workout_exercises 
  FOR ALL 
  USING (auth.uid() IN (SELECT user_id FROM public.workouts WHERE id = workout_id));

-- Create RLS policies for progress tracking
CREATE POLICY "Users can view their own progress" 
  ON public.progress_tracking 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress entries" 
  ON public.progress_tracking 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress entries" 
  ON public.progress_tracking 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress entries" 
  ON public.progress_tracking 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for goals
CREATE POLICY "Users can view their own goals" 
  ON public.goals 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own goals" 
  ON public.goals 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals" 
  ON public.goals 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals" 
  ON public.goals 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create trigger function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample exercises
INSERT INTO public.exercises (name, category, muscle_groups, instructions, difficulty_level, equipment_needed) VALUES
('Push-ups', 'strength', '{"chest", "triceps", "shoulders"}', 'Start in plank position, lower body to ground, push back up', 'beginner', '{}'),
('Squats', 'strength', '{"quadriceps", "glutes", "hamstrings"}', 'Stand with feet shoulder-width apart, lower into sitting position, return to standing', 'beginner', '{}'),
('Deadlift', 'strength', '{"hamstrings", "glutes", "back", "traps"}', 'Lift barbell from ground to hip level, keep back straight', 'intermediate', '{"barbell", "plates"}'),
('Running', 'cardio', '{"legs", "cardiovascular"}', 'Maintain steady pace, proper breathing technique', 'beginner', '{}'),
('Bench Press', 'strength', '{"chest", "triceps", "shoulders"}', 'Lie on bench, press barbell from chest to full extension', 'intermediate', '{"barbell", "bench", "plates"}'),
('Pull-ups', 'strength', '{"lats", "biceps", "shoulders"}', 'Hang from bar, pull body up until chin over bar', 'intermediate', '{"pull-up bar"}'),
('Plank', 'strength', '{"core", "shoulders"}', 'Hold straight body position supported by forearms and toes', 'beginner', '{}'),
('Burpees', 'cardio', '{"full body"}', 'Squat, jump back to plank, push-up, jump forward, jump up', 'intermediate', '{}');
