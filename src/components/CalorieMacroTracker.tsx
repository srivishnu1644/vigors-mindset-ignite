
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Utensils, Plus, Minus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export const CalorieMacroTracker = () => {
  const [dailyGoals, setDailyGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65
  });

  const [currentIntake, setCurrentIntake] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

  const [newEntry, setNewEntry] = useState({
    food: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: ""
  });

  const addEntry = () => {
    if (!newEntry.food || !newEntry.calories) {
      toast({
        title: "Missing Information",
        description: "Please enter at least food name and calories.",
        variant: "destructive"
      });
      return;
    }

    const calories = parseFloat(newEntry.calories) || 0;
    const protein = parseFloat(newEntry.protein) || 0;
    const carbs = parseFloat(newEntry.carbs) || 0;
    const fat = parseFloat(newEntry.fat) || 0;

    setCurrentIntake(prev => ({
      calories: prev.calories + calories,
      protein: prev.protein + protein,
      carbs: prev.carbs + carbs,
      fat: prev.fat + fat
    }));

    setNewEntry({
      food: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: ""
    });

    toast({
      title: "Entry Added!",
      description: `${newEntry.food} has been added to your daily intake.`
    });
  };

  const resetDay = () => {
    setCurrentIntake({
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    });
    toast({
      title: "Day Reset",
      description: "Your daily intake has been reset to zero."
    });
  };

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 100) return "bg-green-500";
    if (percentage >= 80) return "bg-yellow-500";
    return "bg-blue-500";
  };

  const calculatePercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Daily Goals Setting */}
      <Card className="bg-black/60 border-green-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Utensils className="w-6 h-6 text-green-400" />
            Daily Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label className="text-white text-sm">Calories</Label>
            <Input
              type="number"
              value={dailyGoals.calories}
              onChange={(e) => setDailyGoals({...dailyGoals, calories: parseFloat(e.target.value) || 0})}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-white text-sm">Protein (g)</Label>
            <Input
              type="number"
              value={dailyGoals.protein}
              onChange={(e) => setDailyGoals({...dailyGoals, protein: parseFloat(e.target.value) || 0})}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-white text-sm">Carbs (g)</Label>
            <Input
              type="number"
              value={dailyGoals.carbs}
              onChange={(e) => setDailyGoals({...dailyGoals, carbs: parseFloat(e.target.value) || 0})}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-white text-sm">Fat (g)</Label>
            <Input
              type="number"
              value={dailyGoals.fat}
              onChange={(e) => setDailyGoals({...dailyGoals, fat: parseFloat(e.target.value) || 0})}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Progress Tracking */}
      <Card className="bg-black/60 border-green-500/20">
        <CardHeader>
          <CardTitle className="text-white">Today's Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Calories */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-white">Calories</Label>
              <span className="text-green-400 font-semibold">
                {currentIntake.calories.toFixed(0)} / {dailyGoals.calories}
              </span>
            </div>
            <Progress 
              value={calculatePercentage(currentIntake.calories, dailyGoals.calories)} 
              className="h-3"
            />
          </div>

          {/* Protein */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-white">Protein</Label>
              <span className="text-green-400 font-semibold">
                {currentIntake.protein.toFixed(1)}g / {dailyGoals.protein}g
              </span>
            </div>
            <Progress 
              value={calculatePercentage(currentIntake.protein, dailyGoals.protein)} 
              className="h-3"
            />
          </div>

          {/* Carbs */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-white">Carbs</Label>
              <span className="text-green-400 font-semibold">
                {currentIntake.carbs.toFixed(1)}g / {dailyGoals.carbs}g
              </span>
            </div>
            <Progress 
              value={calculatePercentage(currentIntake.carbs, dailyGoals.carbs)} 
              className="h-3"
            />
          </div>

          {/* Fat */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-white">Fat</Label>
              <span className="text-green-400 font-semibold">
                {currentIntake.fat.toFixed(1)}g / {dailyGoals.fat}g
              </span>
            </div>
            <Progress 
              value={calculatePercentage(currentIntake.fat, dailyGoals.fat)} 
              className="h-3"
            />
          </div>
        </CardContent>
      </Card>

      {/* Add Food Entry */}
      <Card className="bg-black/60 border-green-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-6 h-6 text-green-400" />
            Add Food Entry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label className="text-white">Food Name</Label>
              <Input
                placeholder="e.g., Chicken Breast, Rice, Apple"
                value={newEntry.food}
                onChange={(e) => setNewEntry({...newEntry, food: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Calories</Label>
              <Input
                type="number"
                placeholder="250"
                value={newEntry.calories}
                onChange={(e) => setNewEntry({...newEntry, calories: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Protein (g)</Label>
              <Input
                type="number"
                placeholder="30"
                value={newEntry.protein}
                onChange={(e) => setNewEntry({...newEntry, protein: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Carbs (g)</Label>
              <Input
                type="number"
                placeholder="45"
                value={newEntry.carbs}
                onChange={(e) => setNewEntry({...newEntry, carbs: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Fat (g)</Label>
              <Input
                type="number"
                placeholder="10"
                value={newEntry.fat}
                onChange={(e) => setNewEntry({...newEntry, fat: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={addEntry}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Entry
            </Button>
            <Button 
              onClick={resetDay}
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-950"
            >
              <Minus className="w-4 h-4 mr-2" />
              Reset Day
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
