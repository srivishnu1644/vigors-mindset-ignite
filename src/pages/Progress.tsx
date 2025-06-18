
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Calendar, Target, Dumbbell, Activity, PersonStanding } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Area, AreaChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { useProgressTracking } from "@/hooks/useProgressTracking";

export const Progress = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { progressData: bodyFatData, isLoading: isBodyFatLoading } = useProgressTracking(user?.id, "body_fat_percentage");

  // Mock data for the calorie chart
  const calorieData = [
    { date: "Mon", target: 2200, burnt: 1800 },
    { date: "Tue", target: 2200, burnt: 2100 },
    { date: "Wed", target: 2200, burnt: 2300 },
    { date: "Thu", target: 2200, burnt: 1900 },
    { date: "Fri", target: 2200, burnt: 2400 },
    { date: "Sat", target: 2500, burnt: 2800 },
    { date: "Sun", target: 2500, burnt: 500 },
  ];

  // Mock data for workout progress
  const workoutData = [
    { week: "Week 1", workouts: 3, duration: 180 },
    { week: "Week 2", workouts: 4, duration: 240 },
    { week: "Week 3", workouts: 2, duration: 120 },
    { week: "Week 4", workouts: 5, duration: 300 },
    { week: "Week 5", workouts: 4, duration: 280 },
    { week: "Week 6", workouts: 6, duration: 360 },
  ];

  // Mock data for goals progress
  const goalsData = [
    { month: "Jan", weightLoss: 2, muscleGain: 0.5, strength: 10 },
    { month: "Feb", weightLoss: 4, muscleGain: 1.2, strength: 25 },
    { month: "Mar", weightLoss: 6, muscleGain: 1.8, strength: 40 },
    { month: "Apr", weightLoss: 7, muscleGain: 2.5, strength: 55 },
    { month: "May", weightLoss: 9, muscleGain: 3.0, strength: 70 },
    { month: "Jun", weightLoss: 10, muscleGain: 3.8, strength: 85 },
  ];

  const latestBodyFat = bodyFatData && bodyFatData.length > 0 ? bodyFatData[bodyFatData.length - 1] : null;

  const formattedBodyFatData = bodyFatData.map(d => ({ 
      value: d.value, 
      date: new Date(d.recorded_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
  }));

  const calorieChartConfig = {
    target: {
      label: "Target Calories",
      // Now uses same color as 'workouts' (sky-400)
      color: "#38bdf8", // Tailwind sky-400
    },
    burnt: {
      label: "Burnt Calories",
      // Now uses same color as 'duration' (lime-400)
      color: "#a3e635", // Tailwind lime-400
    },
  } satisfies ChartConfig;

  const workoutChartConfig = {
    workouts: {
      label: "Workouts Count",
      color: "#38bdf8", // Tailwind sky-400
    },
    duration: {
      label: "Duration (min)",
      color: "#a3e635", // Tailwind lime-400
    },
  } satisfies ChartConfig;

  const goalsChartConfig = {
    weightLoss: {
      label: "Weight Loss (kg)",
      color: "#fbbf24", // Tailwind yellow-400
    },
    muscleGain: {
      label: "Muscle Gain (kg)",
      color: "#4ade80", // Tailwind green-400
    },
    strength: {
      label: "Strength Score",
      color: "#a78bfa", // Tailwind purple-400
    },
  } satisfies ChartConfig;

  const bodyFatChartConfig = {
      value: {
        label: "Body Fat %",
        color: "#fb923c", // Tailwind orange-400
      },
  } satisfies ChartConfig;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">
                YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">PROGRESS</span>
              </h1>
            </div>
          </div>
          <span className="text-gray-300">Welcome, {user?.user_metadata?.full_name || user?.email}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            TRACK YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">JOURNEY</span>
          </h2>
          <p className="text-xl text-gray-300">Monitor your calorie goals, workouts, and achievements, warrior.</p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-black/60 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Weekly Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">15,400</p>
              <p className="text-gray-400">Total Target Calories</p>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-purple-400" />
                Calories Burnt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">14,300</p>
              <p className="text-gray-400">This Week</p>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-blue-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Workouts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">24</p>
              <p className="text-gray-400">This Month</p>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-green-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-400" />
                Achievement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">93%</p>
              <p className="text-gray-400">Goal Completion</p>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-orange-500/20">
            <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                    <PersonStanding className="w-5 h-5 text-orange-400" />
                    Body Fat %
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isBodyFatLoading ? (
                    <p className="text-2xl font-bold text-white">...</p>
                ) : (
                    <p className="text-2xl font-bold text-white">{latestBodyFat ? `${Number(latestBodyFat.value).toFixed(1)}%` : 'N/A'}</p>
                )}
                <p className="text-gray-400">Latest Record</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Progress Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Calorie Progress Chart */}
          <Card className="bg-black/60 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Weekly Calorie Progress
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your target vs. burnt calories over the last 7 days.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer config={calorieChartConfig} className="h-80 w-full">
                <BarChart accessibilityLayer data={calorieData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-gray-800" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    width={60}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                    wrapperClassName="bg-black/80 border-gray-700 rounded-lg"
                    labelClassName="text-white font-bold"
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="target" fill="var(--color-target)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="burnt" fill="var(--color-burnt)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Workout Progress Chart */}
          <Card className="bg-black/60 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-blue-400" />
                Weekly Workout Progress
              </CardTitle>
              <CardDescription className="text-gray-400">
                Number of workouts and total duration over the last 6 weeks.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer config={workoutChartConfig} className="h-80 w-full">
                <BarChart accessibilityLayer data={workoutData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-gray-800" />
                  <XAxis
                    dataKey="week"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    width={60}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                    wrapperClassName="bg-black/80 border-gray-700 rounded-lg"
                    labelClassName="text-white font-bold"
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="workouts" fill="var(--color-workouts)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="duration" fill="var(--color-duration)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Goals Progress Chart */}
        <Card className="bg-black/60 border-green-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-green-400" />
              Monthly Goals Progress
            </CardTitle>
            <CardDescription className="text-gray-400">
              Track your weight loss, muscle gain, and strength improvements over time.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={goalsChartConfig} className="h-96 w-full">
              <AreaChart accessibilityLayer data={goalsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-gray-800" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  width={60}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                  wrapperClassName="bg-black/80 border-gray-700 rounded-lg"
                  labelClassName="text-white font-bold"
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Area 
                  dataKey="weightLoss" 
                  type="monotone" 
                  fill="var(--color-weightLoss)" 
                  fillOpacity={0.4} 
                  stroke="var(--color-weightLoss)" 
                  strokeWidth={2}
                />
                <Area 
                  dataKey="muscleGain" 
                  type="monotone" 
                  fill="var(--color-muscleGain)" 
                  fillOpacity={0.4} 
                  stroke="var(--color-muscleGain)" 
                  strokeWidth={2}
                />
                <Area 
                  dataKey="strength" 
                  type="monotone" 
                  fill="var(--color-strength)" 
                  fillOpacity={0.4} 
                  stroke="var(--color-strength)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Body Fat Percentage Chart */}
        <Card className="bg-black/60 border-orange-500/20 mb-8">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                    <PersonStanding className="w-5 h-5 text-orange-400" />
                    Body Fat Percentage Progress
                </CardTitle>
                <CardDescription className="text-gray-400">
                    Track your body fat percentage over time.
                </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                {isBodyFatLoading ? (
                    <div className="flex justify-center items-center h-80">
                        <p className="text-white">Loading chart data...</p>
                    </div>
                ) : formattedBodyFatData.length > 0 ? (
                    <ChartContainer config={bodyFatChartConfig} className="h-80 w-full">
                        <LineChart accessibilityLayer data={formattedBodyFatData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-gray-800" />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                width={60}
                                domain={['dataMin - 1', 'dataMax + 1']}
                                tickFormatter={(value) => `${Number(value).toFixed(1)}%`}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" />}
                                wrapperClassName="bg-black/80 border-gray-700 rounded-lg"
                                labelClassName="text-white font-bold"
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Line
                                dataKey="value"
                                type="monotone"
                                stroke="var(--color-value)"
                                strokeWidth={2}
                                dot={{
                                    fill: "var(--color-value)",
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            />
                        </LineChart>
                    </ChartContainer>
                ) : (
                    <div className="flex justify-center items-center h-80">
                        <p className="text-white">No body fat data recorded yet.</p>
                    </div>
                )}
            </CardContent>
        </Card>

        {/* Additional Progress Insights */}
        <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              WARRIOR INSIGHTS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-white text-lg font-semibold mb-2">Best Calorie Day</p>
                <p className="text-green-400 text-2xl font-bold">Saturday</p>
                <p className="text-gray-400">2,800 calories burnt</p>
              </div>
              <div className="text-center">
                <p className="text-white text-lg font-semibold mb-2">Best Workout Week</p>
                <p className="text-blue-400 text-2xl font-bold">Week 6</p>
                <p className="text-gray-400">6 workouts, 360 minutes</p>
              </div>
              <div className="text-center">
                <p className="text-white text-lg font-semibold mb-2">Top Goal Progress</p>
                <p className="text-purple-400 text-2xl font-bold">Strength</p>
                <p className="text-gray-400">85% improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Progress;
