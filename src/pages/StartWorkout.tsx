
import React from "react";
import { Dumbbell, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import WorkoutRoutine from "@/components/WorkoutRoutine";
import { useNavigate } from "react-router-dom";

const StartWorkoutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <div className="w-full max-w-2xl p-4 flex flex-col items-center">
        <h1 className="flex items-center gap-2 text-3xl font-bold text-white mb-6">
          <Dumbbell className="w-8 h-8 text-purple-400" />
          Start Workout
        </h1>
        <WorkoutRoutine /> {/* Show routine features directly, no extra button/page */}
        <Button
          variant="outline"
          className="text-white border-gray-400 mt-4"
          onClick={() => navigate("/training-options")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  );
};

export default StartWorkoutPage;
