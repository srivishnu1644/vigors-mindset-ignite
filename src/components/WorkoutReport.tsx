
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, User } from "lucide-react";

type Workout = {
  id: string;
  name: string;
  description?: string;
  workout_date: string;
  duration_minutes?: number;
  calories_burned?: number;
};

type WorkoutReportProps = {
  report: Workout;
};

export function WorkoutReport({ report }: WorkoutReportProps) {
  return (
    <Card className="bg-black/60 border-purple-500/20 mb-4">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Dumbbell className="w-6 h-6 text-purple-400" />
          Workout Report
        </CardTitle>
        <p className="text-xs text-gray-400">
          {report.workout_date && new Date(report.workout_date).toLocaleString()}
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-lg text-white font-bold">{report.name}</div>
        {report.description && (
          <div className="text-gray-300 mb-1">{report.description}</div>
        )}
        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
          {report.duration_minutes !== undefined && (
            <span>Duration: <span className="font-semibold">{report.duration_minutes} min</span></span>
          )}
          {report.calories_burned !== undefined && (
            <span>Calories: <span className="font-semibold">{report.calories_burned}</span></span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
