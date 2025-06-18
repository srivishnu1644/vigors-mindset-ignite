
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TablesInsert, Tables } from "@/integrations/supabase/types";

type BmiReportInsert = TablesInsert<"bmi_reports">;
type BmiReport = Tables<"bmi_reports">;

export function useBmiReports(userId: string | undefined | null) {
  const queryClient = useQueryClient();
  // Fetch history
  const history = useQuery({
    queryKey: ["bmi_reports", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("bmi_reports")
        .select("*")
        .eq("user_id", userId)
        .order("calculated_at", { ascending: false });
      if (error) throw error;
      return data as BmiReport[];
    },
    enabled: !!userId,
  });

  // Save new BMI report
  const addReport = useMutation({
    mutationFn: async (report: BmiReportInsert) => {
      const { data, error } = await supabase
        .from("bmi_reports")
        .insert([report])
        .select()
        .single();
      if (error) throw error;
      return data as BmiReport;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bmi_reports", userId] });
    },
  });

  return {
    bmiHistory: history.data ?? [],
    isHistoryLoading: history.isLoading,
    addBmiReport: addReport.mutateAsync,
  };
}
