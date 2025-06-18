
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

type Goal = {
  id: string;
  title: string;
  description?: string;
  goal_type: string;
  status: string;
  target_value?: number;
  target_unit?: string;
  target_date?: string;
  current_value?: number;
  created_at: string;
  updated_at: string;
};

type GoalsReportProps = {
  report: Goal;
};

export function GoalsReport({ report }: GoalsReportProps) {
  return (
    <Card className="bg-black/60 border-blue-500/20 mb-4">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-400" />
          Goal Report
        </CardTitle>
        <p className="text-xs text-gray-400">
          {report.created_at && new Date(report.created_at).toLocaleString()}
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-lg text-white">{report.title}</span>
          <span className="capitalize text-blue-300 text-xs">{report.goal_type}</span>
        </div>
        {report.description && (
          <div className="text-gray-300 mb-1">{report.description}</div>
        )}
        <div className="flex flex-wrap gap-x-6 text-sm text-gray-300">
          {report.status && <span>Status: <span className={`font-bold ${report.status === "completed" ? "text-green-400" : "text-yellow-400"}`}>{report.status}</span></span>}
          {report.target_value !== undefined && <span>Target: <span className="font-semibold">{report.target_value} {report.target_unit ?? ""}</span></span>}
          {report.current_value !== undefined && <span>Current: <span className="font-semibold">{report.current_value} {report.target_unit ?? ""}</span></span>}
          {report.target_date && <span>Target Date: <span className="font-semibold">{new Date(report.target_date).toLocaleDateString()}</span></span>}
        </div>
      </CardContent>
    </Card>
  );
}
