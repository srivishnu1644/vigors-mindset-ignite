
-- Add body fat percentage as a metric type to progress_tracking table
-- The table already exists, so we just need to ensure it can handle body fat data

-- Let's also create an index for better performance when querying body fat progress
CREATE INDEX IF NOT EXISTS idx_progress_tracking_user_metric_date 
ON progress_tracking (user_id, metric_type, recorded_date DESC);

-- Add a constraint to ensure metric_type includes body_fat_percentage
-- (This is informational - the table already allows any text for metric_type)
