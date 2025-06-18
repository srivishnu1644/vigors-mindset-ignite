
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type ProgressRecord = Tables<"progress_tracking">;

export function useProgressTracking(
  userId: string | undefined | null,
  metricType: string
) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["progress_tracking", userId, metricType],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("progress_tracking")
        .select("*")
        .eq("user_id", userId)
        .eq("metric_type", metricType)
        .order("recorded_date", { ascending: true });

      if (error) {
        console.error("Error fetching progress tracking data:", error);
        throw error;
      }
      return data as ProgressRecord[];
    },
    enabled: !!userId,
  });

  return {
    progressData: data ?? [],
    isLoading,
    error,
  };
}
