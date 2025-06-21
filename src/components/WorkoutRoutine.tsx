import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle, Circle } from "lucide-react";

// Days of week
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type Workout = {
  text: string;
  done: boolean;
};

export const WorkoutRoutine = () => {
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  // In a real app, move this to backend/storage! Here, keep it simple for demo.
  const [routines, setRoutines] = useState<{ [day: string]: Workout[] }>({});

  const [input, setInput] = useState("");

  const addWorkout = () => {
    if (!input) return;
    setRoutines((prev) => ({
      ...prev,
      [selectedDay]: [
        ...(prev[selectedDay] || []),
        { text: input, done: false },
      ],
    }));
    setInput("");
  };

  const toggleWorkout = (idx: number) => {
    setRoutines((prev) => ({
      ...prev,
      [selectedDay]: prev[selectedDay]?.map((w, i) =>
        i === idx ? { ...w, done: !w.done } : w
      ),
    }));
  };

  const workouts = routines[selectedDay] || [];

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {DAYS.map((d) => (
          <Button
            key={d}
            size="sm"
            variant={selectedDay === d ? "default" : "outline"}
            className={selectedDay === d ? "bg-purple-600 text-white" : ""}
            onClick={() => setSelectedDay(d)}
          >
            {d}
          </Button>
        ))}
      </div>
      <div className="bg-black/50 rounded-xl shadow-lg p-6 mb-4 max-w-xl mx-auto">
        <h3 className="text-xl font-bold text-white mb-3 text-center">{selectedDay} Routine</h3>
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            className="flex-1 px-3 py-2 rounded bg-gray-900 text-white border border-gray-700 outline-none"
            placeholder="Add a workout (e.g., Push-ups)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addWorkout()}
            aria-label="Add workout"
          />
          <Button size="sm" variant="secondary" onClick={addWorkout}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <ul>
          {workouts.length === 0 && (
            <li className="text-gray-400 text-sm text-center">No workouts added yet.</li>
          )}
          {workouts.map((w, i) => (
            <li key={i} className="flex items-center gap-2 mb-2">
              <Button
                size="icon"
                variant="ghost"
                className="p-0"
                onClick={() => toggleWorkout(i)}
                aria-label={w.done ? "Mark as incomplete" : "Mark as done"}
              >
                {w.done
                  ? <CheckCircle className="w-5 h-5 text-green-400" />
                  : <Circle className="w-5 h-5 text-gray-400" />}
              </Button>
              <span className={`text-white ${w.done ? "line-through opacity-60" : ""}`}>{w.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutRoutine;
