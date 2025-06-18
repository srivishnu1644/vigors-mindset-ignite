
import { useAuth } from "@/hooks/useAuth";
import { useBmiReports } from "@/hooks/useBmiReports";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BmiReports() {
  const { user } = useAuth();
  const { bmiHistory, isHistoryLoading } = useBmiReports(user?.id);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 pb-16">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/health")}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Health
            </Button>
            <div className="flex items-center gap-2">
              <FileText className="w-8 h-8 text-green-400" />
              <h1 className="text-2xl font-bold text-white">
                BMI <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">REPORTS</span>
              </h1>
            </div>
          </div>
          <span className="text-gray-300">Welcome, {user?.user_metadata?.full_name || user?.email}</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="bg-black/70 border-green-400/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Calculator className="w-6 h-6 text-green-400" />
              Your BMI Calculation History
            </CardTitle>
            <CardDescription className="text-gray-300">
              All your previous BMI results & personalized nutrition suggestions.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {isHistoryLoading ? (
              <div className="text-gray-300 py-8">Loading reports...</div>
            ) : (
              <>
                {bmiHistory.length === 0 ? (
                  <div className="text-gray-400 py-8">No reports yet. Calculate your BMI to see reports.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>BMI</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Height</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>Nutrition Advice</TableHead>
                        <TableHead>Macros</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bmiHistory.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell>
                            {r.calculated_at ? new Date(r.calculated_at).toLocaleString() : "-"}
                          </TableCell>
                          <TableCell>
                            <span className="font-bold text-green-400">{r.bmi}</span>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-white">{r.category}</span>
                          </TableCell>
                          <TableCell>{r.age}</TableCell>
                          <TableCell className="capitalize">{r.gender}</TableCell>
                          <TableCell>
                            {r.height} {r.height_unit}
                          </TableCell>
                          <TableCell>{r.weight} kg</TableCell>
                          <TableCell className="capitalize">{r.activity_level}</TableCell>
                          <TableCell className="text-xs text-green-200">{r.nutrition_summary ?? "-"}</TableCell>
                          <TableCell>
                            {r.nutrition_details
                              ? <div className="text-xs">
                                {Object.entries(r.nutrition_details).map(([key, val], i) => (
                                  <div key={i}><span className="capitalize">{key}</span>: <span className="font-semibold">{val}</span></div>
                                ))}
                              </div>
                              : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
