
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { WorkoutReport } from "@/components/WorkoutReport";

export default function WorkoutReports() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: workouts, isLoading } = useQuery({
    queryKey: ["workout_reports", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("user_id", user.id)
        .order("workout_date", { ascending: false });
      if (error) throw error;
      return data as any[];
    },
    enabled: !!user?.id,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 pb-16">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/dashboard")}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <Dumbbell className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">
                WORKOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">REPORTS</span>
              </h1>
            </div>
          </div>
          <span className="text-gray-300">Welcome, {user?.user_metadata?.full_name || user?.email}</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="bg-black/70 border-purple-400/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Dumbbell className="w-6 h-6 text-purple-400" />
              Your Workout Sessions History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-gray-300 py-8">Loading reports...</div>
            ) : (
              <>
                {(!workouts || workouts.length === 0) ? (
                  <div className="text-gray-400 py-8">No workouts found. Complete a workout to see reports.</div>
                ) : (
                  workouts.map((report) => (
                    <WorkoutReport key={report.id} report={report} />
                  ))
                )}
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
