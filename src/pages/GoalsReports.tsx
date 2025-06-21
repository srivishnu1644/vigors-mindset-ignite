
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GoalsReport } from "@/components/GoalsReport";

export default function GoalsReports() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: goals, isLoading } = useQuery({
    queryKey: ["goals_reports", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
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
              <Target className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">
                GOALS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">REPORTS</span>
              </h1>
            </div>
          </div>
          <span className="text-gray-300">Welcome, {user?.user_metadata?.full_name || user?.email}</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="bg-black/70 border-blue-400/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Target className="w-6 h-6 text-blue-400" />
              Your Goals Progress History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-gray-300 py-8">Loading reports...</div>
            ) : (
              <>
                {(!goals || goals.length === 0) ? (
                  <div className="text-gray-400 py-8">No goals found. Create a goal to see reports.</div>
                ) : (
                  goals.map((report) => (
                    <GoalsReport key={report.id} report={report} />
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
