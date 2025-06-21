import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toggle } from "@/components/ui/toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Heart, Calculator, User, Activity, FileText, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { useBmiReports } from "@/hooks/useBmiReports";
import { BmiReport } from "@/components/BmiReport";
import { CalorieMacroTracker } from "@/components/CalorieMacroTracker";
import { supabase } from "@/integrations/supabase/client";

export const Health = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    height: "",
    weight: "",
    activityLevel: ""
  });

  // Body Fat Calculator Form Data
  const [bodyFatData, setBodyFatData] = useState({
    gender: "",
    age: "",
    height: "",
    weight: "",
    neck: "",
    waist: "",
    hip: "" // Only for females
  });

  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [bodyFatHeightUnit, setBodyFatHeightUnit] = useState<"cm" | "in">("cm");
  const [bodyFatResult, setBodyFatResult] = useState<{
    bodyFat: number;
    category: string;
    description: string;
  } | null>(null);

  const [bmiResult, setBmiResult] = useState<{
    bmi: number;
    category: string;
    bodyType: string;
    nutrition_summary?: string;
    nutrition_details?: any;
  } | null>(null);

  // BMI calculation history
  const { bmiHistory, isHistoryLoading, addBmiReport } = useBmiReports(user?.id);

  // Stable human outline for BMI result (rotatable)
  const [rotation, setRotation] = useState(0);

  // Body Fat Percentage Calculator
  const calculateBodyFat = async () => {
    const { gender, age, height, weight, neck, waist, hip } = bodyFatData;
    
    if (!gender || !age || !height || !weight || !neck || !waist || (gender === 'female' && !hip)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    let heightInCm = parseFloat(height);
    if (bodyFatHeightUnit === 'in') {
      heightInCm = parseFloat(height) * 2.54;
    }

    const weightKg = parseFloat(weight);
    const neckCm = parseFloat(neck);
    const waistCm = parseFloat(waist);
    const hipCm = gender === 'female' ? parseFloat(hip) : 0;

    let bodyFatPercentage: number;

    // Navy Method for Body Fat Calculation
    if (gender === 'male') {
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightInCm)) - 450;
    } else {
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightInCm)) - 450;
    }

    // Determine category
    let category = "";
    let description = "";

    if (gender === 'male') {
      if (bodyFatPercentage < 6) {
        category = "Essential Fat";
        description = "Dangerously low - below essential fat levels";
      } else if (bodyFatPercentage < 14) {
        category = "Athletic";
        description = "Very lean - typical for athletes";
      } else if (bodyFatPercentage < 18) {
        category = "Fitness";
        description = "Lean - good fitness level";
      } else if (bodyFatPercentage < 25) {
        category = "Average";
        description = "Average body fat for men";
      } else {
        category = "Obese";
        description = "High body fat - consider lifestyle changes";
      }
    } else {
      if (bodyFatPercentage < 16) {
        category = "Essential Fat";
        description = "Dangerously low - below essential fat levels";
      } else if (bodyFatPercentage < 21) {
        category = "Athletic";
        description = "Very lean - typical for athletes";
      } else if (bodyFatPercentage < 25) {
        category = "Fitness";
        description = "Lean - good fitness level";
      } else if (bodyFatPercentage < 32) {
        category = "Average";
        description = "Average body fat for women";
      } else {
        category = "Obese";
        description = "High body fat - consider lifestyle changes";
      }
    }

    const roundedBodyFat = Math.round(bodyFatPercentage * 10) / 10;

    setBodyFatResult({
      bodyFat: roundedBodyFat,
      category,
      description
    });

    // Save to progress tracking
    try {
      const { error } = await supabase
        .from('progress_tracking')
        .insert({
          user_id: user?.id!,
          metric_type: 'body_fat_percentage',
          value: roundedBodyFat,
          unit: '%',
          recorded_date: new Date().toISOString().split('T')[0],
          notes: `Gender: ${gender}, Method: Navy Method, Category: ${category}`
        });

      if (error) throw error;

      toast({
        title: "Body Fat Calculated & Saved!",
        description: `Your body fat percentage is ${roundedBodyFat}% and has been saved to your progress.`,
      });
    } catch (error: any) {
      toast({
        title: "Body Fat Calculated!",
        description: `Your body fat percentage is ${roundedBodyFat}%. Note: Could not save to progress - ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const calculateBMI = async () => {
    let heightInMeters: number;
    if (heightUnit === "cm") {
      heightInMeters = parseFloat(formData.height) / 100;
    } else {
      heightInMeters = parseFloat(formData.height) * 0.3048;
    }
    const weight = parseFloat(formData.weight);
    const bmi = weight / (heightInMeters * heightInMeters);

    let category = "";
    let bodyType = "";

    if (bmi < 18.5) {
      category = "Underweight";
      bodyType = "thin";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal weight";
      bodyType = "normal";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
      bodyType = "medium";
    } else {
      category = "Obese";
      bodyType = "heavy";
    }

    // Nutrition advice
    const nutrition = getNutritionAdvice(category, parseFloat(formData.weight));
    const nutrition_summary = nutrition.summary;
    const nutrition_details = nutrition.macros;

    // Save BMI report to Supabase
    try {
      await addBmiReport({
        user_id: user?.id!,
        gender: formData.gender,
        age: parseInt(formData.age),
        height: parseFloat(formData.height),
        height_unit: heightUnit,
        weight: weight,
        activity_level: formData.activityLevel,
        bmi: parseFloat(bmi.toFixed(1)),
        category,
        nutrition_summary,
        nutrition_details,
      });
      setBmiResult({
        bmi: parseFloat(bmi.toFixed(1)),
        category,
        bodyType,
        nutrition_summary,
        nutrition_details,
      });
      toast({
        title: "BMI Report Saved!",
        description: "Your BMI and nutrition suggestion have been saved.",
      });
    } catch (e: any) {
      toast({
        title: "Error saving BMI report",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  // --- Human Outline ---
  const getHumanOutline = (bodyType: string) => {
    // Shape mapping (all stable)
    const getBodySize = (type: string) => {
      switch (type) {
        case 'thin': return 'w-14';
        case 'normal': return 'w-20';
        case 'medium': return 'w-24';
        case 'heavy': return 'w-28';
        default: return 'w-20';
      }
    };
    const bodyColor = "from-green-400 to-green-700";
    const bodySize = getBodySize(bodyType);

    // Horizontal rotation (swipe/mouse drag)
    const handleSwipe = (e: React.TouchEvent | React.MouseEvent) => {
      if ('touches' in e) {
        const touch = e.touches[0];
        const centerX = (e.currentTarget as HTMLElement).offsetWidth / 2;
        const touchX = touch.clientX - (e.currentTarget as HTMLElement).getBoundingClientRect().left;
        const newRotation = ((touchX - centerX) / centerX) * 90; // less aggressive
        setRotation(Math.max(-90, Math.min(90, newRotation)));
      } else {
        const centerX = (e.currentTarget as HTMLElement).offsetWidth / 2;
        const mouseX = e.clientX - (e.currentTarget as HTMLElement).getBoundingClientRect().left;
        const newRotation = ((mouseX - centerX) / centerX) * 90;
        setRotation(Math.max(-90, Math.min(90, newRotation)));
      }
    };

    return (
      <div 
        className="flex flex-col items-center cursor-grab active:cursor-grabbing select-none"
        onTouchMove={handleSwipe}
        onMouseMove={handleSwipe}
        style={{ transform: `rotateY(${rotation}deg)`, transformStyle: 'preserve-3d' }}
      >
        {/* HEAD */}
        <div className={`w-12 h-12 rounded-full bg-gradient-to-b ${bodyColor} mb-1 border-2 border-white/10`} />
        <div className={`${bodySize} h-40 relative`}>
          {/* TORSO */}
          <div className={`w-full h-28 bg-gradient-to-b ${bodyColor} rounded-t-3xl border-2 border-white/10 mx-auto`} />
          {/* HIP */}
          <div className={`w-5/6 h-10 bg-gradient-to-b ${bodyColor} mx-auto rounded-b-2xl border-x-2 border-b-2 border-white/10`} />
          {/* LEGS */}
          <div className="flex justify-center gap-2 mt-1">
            <div className={`w-4 h-14 bg-gradient-to-b ${bodyColor} rounded-b-xl border-2 border-white/10`}></div>
            <div className={`w-4 h-14 bg-gradient-to-b ${bodyColor} rounded-b-xl border-2 border-white/10`}></div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Swipe or move mouse to rotate
        </p>
      </div>
    );
  };

  // Nutrition advice builder (very basic)
  function getNutritionAdvice(category: string, weight: number) {
    // These are general placeholder macros (could adjust by gender/activity)
    let macros = { protein: 0, carbs: 0, fat: 0, calories: 0 };
    let summary = "";

    switch (category) {
      case "Underweight":
        macros = {
          protein: Math.round(weight * 1.4),
          carbs: Math.round(weight * 7),
          fat: Math.round(weight * 1),
          calories: Math.round(weight * 37),
        };
        summary = "Increase calorie-dense foods, aim for higher carbs and adequate protein.";
        break;
      case "Normal weight":
        macros = {
          protein: Math.round(weight * 1.2),
          carbs: Math.round(weight * 5),
          fat: Math.round(weight * 0.9),
          calories: Math.round(weight * 33),
        };
        summary = "Maintain with balanced macros and sufficient protein intake.";
        break;
      case "Overweight":
        macros = {
          protein: Math.round(weight * 1.3),
          carbs: Math.round(weight * 3.5),
          fat: Math.round(weight * 0.7),
          calories: Math.round(weight * 30),
        };
        summary = "Create a slight calorie deficit, moderate carbs and higher protein.";
        break;
      case "Obese":
        macros = {
          protein: Math.round(weight * 1.5),
          carbs: Math.round(weight * 2.9),
          fat: Math.round(weight * 0.7),
          calories: Math.round(weight * 27),
        };
        summary = "Focus on reducing calories, high protein, lower carbs/fats.";
        break;
      default:
        summary = "Eat a balanced diet.";
        break;
    }

    return { summary, macros };
  }

  // Handler to save a Nutrition Goal from BMI result
  async function createNutritionGoalFromReport() {
    if (!user?.id || !bmiResult) return;

    const macros = bmiResult.nutrition_details;
    try {
      // Insert Nutrition Goal to goals table
      const { error } = await supabase.from("goals").insert({
        user_id: user.id,
        goal_type: "nutrition",
        title: "Nutrition Goal (from BMI)",
        description: bmiResult.nutrition_summary,
        status: "active",
        nutrition_macros: macros,
      });

      if (error) throw error;

      toast({
        title: "Nutrition Goal saved!",
        description: "Check your Goals page for details.",
      });
    } catch (e: any) {
      toast({
        title: "Could not save goal",
        description: e.message,
        variant: "destructive",
      });
    }
  }

  // --- MAIN RENDER ---
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
              <Heart className="w-8 h-8 text-green-400" />
              <h1 className="text-2xl font-bold text-white">
                YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">HEALTH</span>
              </h1>
            </div>
          </div>
          <span className="text-gray-300">Welcome, {user?.user_metadata?.full_name || user?.email}</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Body Analysis Option moved to top */}
        <div className="mb-8 flex justify-center">
          <Button
            className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white w-full max-w-xs"
            onClick={() => window.location.href = "/body-analysis"}
          >
            <FileText className="w-4 h-4 mr-2" />
            Go to Body Analysis
          </Button>
        </div>
        {/* Tabs moved below */}
        <Tabs defaultValue="bmi" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/60 border border-gray-700">
            <TabsTrigger value="bmi" className="data-[state=active]:bg-green-600">BMI Calculator</TabsTrigger>
            <TabsTrigger value="bodyfat" className="data-[state=active]:bg-green-600">Body Fat %</TabsTrigger>
            <TabsTrigger value="nutrition" className="data-[state=active]:bg-green-600">Nutrition Tracker</TabsTrigger>
          </TabsList>

          <TabsContent value="bmi" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* BMI Calculator */}
              <Card className="bg-black/60 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-green-400" />
                    BMI Calculator
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Calculate your Body Mass Index and get personalized insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Gender */}
                  <div className="space-y-3">
                    <Label className="text-white">Gender</Label>
                    <RadioGroup 
                      value={formData.gender} 
                      onValueChange={(value) => setFormData({...formData, gender: value})}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" className="border-green-400 text-green-400" />
                        <Label htmlFor="male" className="text-gray-300">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" className="border-green-400 text-green-400" />
                        <Label htmlFor="female" className="text-gray-300">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Age */}
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-white">Age (years)</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>

                  {/* Height with Unit Toggle */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="height" className="text-white">Height</Label>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${heightUnit === 'cm' ? 'text-green-400' : 'text-gray-400'}`}>cm</span>
                        <Toggle
                          pressed={heightUnit === 'ft'}
                          onPressedChange={(pressed) => setHeightUnit(pressed ? 'ft' : 'cm')}
                          className="data-[state=on]:bg-green-600"
                        />
                        <span className={`text-sm ${heightUnit === 'ft' ? 'text-green-400' : 'text-gray-400'}`}>ft</span>
                      </div>
                    </div>
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      placeholder={heightUnit === 'cm' ? '175' : '5.8'}
                      value={formData.height}
                      onChange={(e) => setFormData({...formData, height: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <p className="text-xs text-gray-400">
                      {heightUnit === 'ft' ? 'Enter as decimal (e.g., 5.8 for 5\'8")' : 'Enter in centimeters'}
                    </p>
                  </div>

                  {/* Weight */}
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-white">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>

                  {/* Activity Level */}
                  <div className="space-y-2">
                    <Label htmlFor="activity" className="text-white">Activity Level</Label>
                    <Select value={formData.activityLevel} onValueChange={(value) => setFormData({...formData, activityLevel: value})}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                        <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                        <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                        <SelectItem value="very">Very Active (6-7 days/week)</SelectItem>
                        <SelectItem value="extra">Extra Active (2x/day, intense)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={calculateBMI}
                    disabled={!formData.gender || !formData.age || !formData.height || !formData.weight || !formData.activityLevel}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                  >
                    VIEW
                  </Button>
                </CardContent>
              </Card>

              {/* BMI Results */}
              {bmiResult && (
                <Card className="bg-black/60 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <User className="w-6 h-6 text-green-400" />
                      Your Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-400 mb-2">{bmiResult.bmi}</div>
                      <div className="text-xl text-white mb-4">{bmiResult.category}</div>
                      <div className="flex justify-center mb-4 perspective-1000">
                        {getHumanOutline(bmiResult.bodyType)}
                      </div>
                    </div>
                    {/* Nutrition Goal Button */}
                    <Button onClick={createNutritionGoalFromReport} className="w-full bg-gradient-to-r from-green-700 to-emerald-700 mb-2">
                      Save as Nutrition Goal
                    </Button>
                    {/* Nutrition Suggestions */}
                    {bmiResult.nutrition_summary && (
                      <div className="bg-gray-800/70 p-3 rounded text-green-200 mb-2">
                        {bmiResult.nutrition_summary}
                      </div>
                    )}
                    {bmiResult.nutrition_details && (
                      <div className="rounded bg-green-800/20 p-2 mb-1 text-green-200 text-xs">
                        <pre>{JSON.stringify(bmiResult.nutrition_details, null, 2)}</pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="bodyfat" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Body Fat Calculator */}
              <Card className="bg-black/60 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Percent className="w-6 h-6 text-green-400" />
                    Body Fat Percentage Calculator
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Calculate your body fat percentage using the Navy Method
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Gender */}
                  <div className="space-y-3">
                    <Label className="text-white">Gender</Label>
                    <RadioGroup 
                      value={bodyFatData.gender} 
                      onValueChange={(value) => setBodyFatData({...bodyFatData, gender: value})}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="bf-male" className="border-green-400 text-green-400" />
                        <Label htmlFor="bf-male" className="text-gray-300">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="bf-female" className="border-green-400 text-green-400" />
                        <Label htmlFor="bf-female" className="text-gray-300">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Age */}
                  <div className="space-y-2">
                    <Label htmlFor="bf-age" className="text-white">Age (years)</Label>
                    <Input
                      id="bf-age"
                      type="number"
                      placeholder="25"
                      value={bodyFatData.age}
                      onChange={(e) => setBodyFatData({...bodyFatData, age: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>

                  {/* Height with Unit Toggle */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="bf-height" className="text-white">Height</Label>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${bodyFatHeightUnit === 'cm' ? 'text-green-400' : 'text-gray-400'}`}>cm</span>
                        <Toggle
                          pressed={bodyFatHeightUnit === 'in'}
                          onPressedChange={(pressed) => setBodyFatHeightUnit(pressed ? 'in' : 'cm')}
                          className="data-[state=on]:bg-green-600"
                        />
                        <span className={`text-sm ${bodyFatHeightUnit === 'in' ? 'text-green-400' : 'text-gray-400'}`}>in</span>
                      </div>
                    </div>
                    <Input
                      id="bf-height"
                      type="number"
                      step="0.1"
                      placeholder={bodyFatHeightUnit === 'cm' ? '175' : '69'}
                      value={bodyFatData.height}
                      onChange={(e) => setBodyFatData({...bodyFatData, height: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>

                  {/* Weight */}
                  <div className="space-y-2">
                    <Label htmlFor="bf-weight" className="text-white">Weight (kg)</Label>
                    <Input
                      id="bf-weight"
                      type="number"
                      placeholder="70"
                      value={bodyFatData.weight}
                      onChange={(e) => setBodyFatData({...bodyFatData, weight: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>

                  {/* Neck Circumference */}
                  <div className="space-y-2">
                    <Label htmlFor="bf-neck" className="text-white">Neck Circumference (cm)</Label>
                    <Input
                      id="bf-neck"
                      type="number"
                      step="0.1"
                      placeholder="37"
                      value={bodyFatData.neck}
                      onChange={(e) => setBodyFatData({...bodyFatData, neck: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>

                  {/* Waist Circumference */}
                  <div className="space-y-2">
                    <Label htmlFor="bf-waist" className="text-white">Waist Circumference (cm)</Label>
                    <Input
                      id="bf-waist"
                      type="number"
                      step="0.1"
                      placeholder="85"
                      value={bodyFatData.waist}
                      onChange={(e) => setBodyFatData({...bodyFatData, waist: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <p className="text-xs text-gray-400">Measure at the narrowest point</p>
                  </div>

                  {/* Hip Circumference (Female only) */}
                  {bodyFatData.gender === 'female' && (
                    <div className="space-y-2">
                      <Label htmlFor="bf-hip" className="text-white">Hip Circumference (cm)</Label>
                      <Input
                        id="bf-hip"
                        type="number"
                        step="0.1"
                        placeholder="95"
                        value={bodyFatData.hip}
                        onChange={(e) => setBodyFatData({...bodyFatData, hip: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                      <p className="text-xs text-gray-400">Measure at the widest point</p>
                    </div>
                  )}

                  <Button 
                    onClick={calculateBodyFat}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                  >
                    Calculate Body Fat %
                  </Button>
                </CardContent>
              </Card>

              {/* Body Fat Results */}
              {bodyFatResult && (
                <Card className="bg-black/60 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Percent className="w-6 h-6 text-green-400" />
                      Your Body Fat Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-400 mb-2">{bodyFatResult.bodyFat}%</div>
                      <div className="text-xl text-white mb-2">{bodyFatResult.category}</div>
                      <div className="text-gray-300 text-sm mb-4">{bodyFatResult.description}</div>
                    </div>
                    
                    {/* Body Fat Categories Reference */}
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="text-white font-semibold mb-3">Reference Ranges</h4>
                      <div className="space-y-2 text-sm">
                        {bodyFatData.gender === 'male' ? (
                          <>
                            <div className="flex justify-between text-gray-300">
                              <span>Essential Fat:</span><span>2-5%</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                              <span>Athletic:</span><span>6-13%</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                              <span>Fitness:</span><span>14-17%</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                              <span>Average:</span><span>18-24%</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                              <span>Obese:</span><span>25%+</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between text-gray-300">
                              <span>Essential Fat:</span><span>10-13%</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                              <span>Athletic:</span><span>14-20%</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                              <span>Fitness:</span><span>21-24%</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                              <span>Average:</span><span>25-31%</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                              <span>Obese:</span><span>32%+</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="mt-6">
            <CalorieMacroTracker />
          </TabsContent>
        </Tabs>

        {/* Link to BMI Reports page */}
        <div className="mt-10 flex items-center gap-4">
          <Button
            onClick={() => window.location.href = "/bmi-reports"}
            variant="outline"
            className="border-green-500 text-green-400"
          >
            <FileText className="w-4 h-4 mr-2" />
            View Full BMI Report History
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Health;
