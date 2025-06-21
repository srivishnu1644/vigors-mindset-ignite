import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Target, Apple, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Goals = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<"nutrition" | "daily">("nutrition");

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <Target className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">
                CREATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">GOALS</span>
              </h1>
            </div>
          </div>
          <span className="text-gray-300">Welcome, {user?.user_metadata?.full_name || user?.email}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Section Selector */}
        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => setActiveSection("nutrition")}
            className={`flex items-center gap-2 px-6 py-3 ${
              activeSection === "nutrition"
                ? "bg-gradient-to-r from-green-600 to-emerald-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <Apple className="w-5 h-5" />
            Nutrition Goals
          </Button>
          <Button
            onClick={() => setActiveSection("daily")}
            className={`flex items-center gap-2 px-6 py-3 ${
              activeSection === "daily"
                ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <Calendar className="w-5 h-5" />
            Daily Goals
          </Button>
        </div>

        {/* Nutrition Goals Section */}
        {activeSection === "nutrition" && (
          <Card className="bg-black/60 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Apple className="w-6 h-6 text-green-400" />
                Nutrition Goals
              </CardTitle>
              <CardDescription className="text-gray-300">
                Set your nutrition targets to fuel your transformation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="calories" className="text-white">Daily Calories Target</Label>
                  <Input
                    id="calories"
                    type="number"
                    placeholder="2500"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protein" className="text-white">Protein (grams)</Label>
                  <Input
                    id="protein"
                    type="number"
                    placeholder="150"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carbs" className="text-white">Carbohydrates (grams)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    placeholder="300"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fats" className="text-white">Fats (grams)</Label>
                  <Input
                    id="fats"
                    type="number"
                    placeholder="80"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="water" className="text-white">Daily Water Intake (liters)</Label>
                <Input
                  id="water"
                  type="number"
                  step="0.1"
                  placeholder="3.0"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nutrition-notes" className="text-white">Additional Notes</Label>
                <Textarea
                  id="nutrition-notes"
                  placeholder="Any specific dietary preferences or restrictions..."
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                CREATE NUTRITION GOAL
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Daily Goals Section */}
        {activeSection === "daily" && (
          <Card className="bg-black/60 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-400" />
                Daily Goals
              </CardTitle>
              <CardDescription className="text-gray-300">
                Set daily habits and targets to build consistency
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="goal-title" className="text-white">Goal Title</Label>
                <Input
                  id="goal-title"
                  placeholder="Complete morning workout"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal-type" className="text-white">Goal Type</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Select goal type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="workout">Workout</SelectItem>
                    <SelectItem value="steps">Steps</SelectItem>
                    <SelectItem value="meditation">Meditation</SelectItem>
                    <SelectItem value="sleep">Sleep</SelectItem>
                    <SelectItem value="reading">Reading</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-value" className="text-white">Target Value (Calories)</Label>
                <Input
                  id="target-value"
                  type="number"
                  placeholder="2500"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-date" className="text-white">Target Date</Label>
                <Input
                  id="target-date"
                  type="date"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="daily-notes" className="text-white">Description</Label>
                <Textarea
                  id="daily-notes"
                  placeholder="Describe your daily goal and why it's important to you..."
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                CREATE DAILY GOAL
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Goals;
