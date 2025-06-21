
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calculator, User } from "lucide-react";

type BmiReportProps = {
  report: {
    bmi: number;
    category: string;
    bodyType: string;
    calculated_at?: string;
    nutrition_summary?: string;
    nutrition_details?: any;
    age?: number;
    gender?: string;
    height?: number;
    weight?: number;
    activity_level?: string;
    height_unit?: string;
  };
};

export function BmiReport({ report }: BmiReportProps) {
  return (
    <Card className="bg-black/60 border-green-500/20 mb-4">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="w-6 h-6 text-green-400" />
          BMI Report
        </CardTitle>
        <p className="text-xs text-gray-400">
          {report.calculated_at &&
            new Date(report.calculated_at).toLocaleString()}
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-300 text-sm">
          {report.gender && <>Gender: <span className="font-bold">{report.gender}</span></>}
          {report.age && <>Age: <span className="font-bold">{report.age}</span></>}
          {report.height && (
            <>Height: <span className="font-bold">{report.height} {report.height_unit}</span></>
          )}
          {report.weight && <>Weight: <span className="font-bold">{report.weight} kg</span></>}
          {report.activity_level && (
            <>Activity: <span className="font-bold">{report.activity_level}</span></>
          )}
        </div>
        <div className="text-4xl font-bold text-green-400">
          {report.bmi}
        </div>
        <div className="text-lg font-semibold text-white mb-2">
          {report.category}
        </div>
        {report.nutrition_summary && (
          <div className="text-gray-200 mb-2">
            <strong>Nutrition Advice:</strong> {report.nutrition_summary}
          </div>
        )}
        {report.nutrition_details && (
          <div className="rounded bg-green-700/20 p-2 mb-1 text-green-200 text-xs">
            <pre>{JSON.stringify(report.nutrition_details, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
