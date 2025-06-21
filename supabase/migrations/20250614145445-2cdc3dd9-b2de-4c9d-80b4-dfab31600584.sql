
-- 1. Table for storing BMI calculation reports/history
CREATE TABLE public.bmi_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  gender TEXT NOT NULL,
  age INTEGER NOT NULL,
  height NUMERIC NOT NULL,
  height_unit TEXT NOT NULL,
  weight NUMERIC NOT NULL,
  activity_level TEXT NOT NULL,
  bmi NUMERIC NOT NULL,
  category TEXT NOT NULL,
  nutrition_summary TEXT,
  nutrition_details JSONB,
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Enable RLS and policies for bmi_reports
ALTER TABLE public.bmi_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own BMI reports"
ON public.bmi_reports
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own BMI reports"
ON public.bmi_reports
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- 2. Optionally, add nutrition field to goals table if you want to store extra macros
ALTER TABLE public.goals
ADD COLUMN nutrition_macros JSONB;

