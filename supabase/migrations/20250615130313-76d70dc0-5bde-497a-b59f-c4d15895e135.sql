
-- Create table to track user sessions/visits
CREATE TABLE public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_agent TEXT, -- Optional: Store the browser info
  ip_address TEXT, -- Optional: Store the IP if provided by frontend/edge function
  metadata JSONB,  -- Optional: Store any additional info as JSON
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Only users can insert their own session records
CREATE POLICY "Users can create their own session records"
  ON public.user_sessions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can view only their own session records
CREATE POLICY "Users can view their own session records"
  ON public.user_sessions
  FOR SELECT
  USING (auth.uid() = user_id);

