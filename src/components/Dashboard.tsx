import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Dumbbell, Target, TrendingUp, Calendar, Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { DashboardMenu } from "./DashboardMenu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import { useCreateSession } from "@/hooks/useCreateSession";
import { BackgroundEffect } from "@/components/ui/background-effect";

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // ADD: Record session/visit for current user
  useCreateSession(user?.id);

  // Mock data for the chart
  const chartData = [
    { date: "Mon", target: 2200, burnt: 1800 },
    { date: "Tue", target: 2200, burnt: 2100 },
    { date: "Wed", target: 2200, burnt: 2300 },
    { date: "Thu", target: 2200, burnt: 1900 },
    { date: "Fri", target: 2200, burnt: 2400 },
    { date: "Sat", target: 2500, burnt: 2800 },
    { date: "Sun", target: 2500, burnt: 500 },
  ];

  const chartConfig = {
    target: {
      label: "Target Calories",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <BackgroundEffect />
      </div>
      <div className="absolute inset-0 bg-black opacity-100 -z-10"></div>
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">VIGORS</span> CLUB
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {/* Dashboard menu button */}
            <DashboardMenu />
            <span className="ml-2 text-gray-300 hidden md:inline">
              Welcome, {user?.user_metadata?.full_name || user?.email}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Motivational Section - Moved to top */}
        <Card className="mb-8 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              DAILY WARRIOR MINDSET
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="text-center text-lg text-white italic">
              "The pain you feel today will be the strength you feel tomorrow. Every rep, every set, every drop of sweat is building the warrior within you."
            </blockquote>
            <div className="flex justify-center mt-4">
              <Badge variant="outline" className="border-cyan-500/40 text-cyan-400">
                <Calendar className="w-4 h-4 mr-1" />
                Day 1 of Your Journey
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Top section: READY TO DOMINATE left, START button right */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
          {/* Welcome Section (left side) */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold text-white mb-2">
              READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">DOMINATE</span>?
            </h2>
            <p className="text-xl text-gray-300">Your transformation journey starts here, warrior.</p>
          </div>
          {/* Start Workout Button (right side) */}
          <Button
            onClick={() => navigate('/training-options')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-6 py-3"
          >
            START
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Profile Card - updated to navigate to profile page */}
          <Card className="bg-black/60 border-purple-500/20 flex flex-col items-center justify-center text-center min-h-[160px]">
            <CardHeader className="pb-2 w-full flex items-center justify-center">
              <CardTitle className="text-white flex items-center gap-2 justify-center">
                <User className="w-5 h-5 text-purple-400" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline"
                className="border-purple-600 text-purple-300 hover:text-white hover:bg-purple-950 transition"
                onClick={() => navigate('/profile')}
              >
                View Profile
              </Button>
            </CardContent>
          </Card>

          {/* Workouts and Goals cards unchanged */}
          <Card className="bg-black/60 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-purple-400" />
                Workouts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-gray-400">This Week</p>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-gray-400">Active Goals</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {/* Goals Action Card */}
          <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/20 hover:border-blue-500/40 transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-400" />
                Goals
              </CardTitle>
              <CardDescription className="text-gray-300">
                Define and track your fitness objectives easily.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 mb-2"
                onClick={() => navigate('/goals')}
              >
                VIEW/SET GOALS
              </Button>
              <Button
                variant="outline"
                className="w-full border-blue-400 text-blue-300 hover:bg-blue-950"
                onClick={() => navigate('/goals-reports')}
              >
                View Goals Report
              </Button>
            </CardContent>
          </Card>

          {/* Progress Action Card */}
          <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-purple-400" />
                Progress
              </CardTitle>
              <CardDescription className="text-gray-300">
                Track your calorie goals and workout achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => navigate('/progress')}
              >
                VIEW PROGRESS
              </Button>
            </CardContent>
          </Card>

          {/* Your Health Card */}
          <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/20 hover:border-green-500/40 transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Heart className="w-6 h-6 text-green-400" />
                Your Health
              </CardTitle>
              <CardDescription className="text-gray-300">
                BMI calculator and personalized health insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  onClick={() => navigate('/health')}
                >
                  VIEW
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-green-400 text-green-300 hover:bg-green-950"
                  onClick={() => navigate('/bmi-reports')}
                >
                  View BMI Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Marketplace Action Card */}
          <Card className="bg-gradient-to-br from-orange-900/40 to-yellow-900/40 border-orange-500/20 hover:border-orange-500/40 transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-orange-400" />
                Accessories
              </CardTitle>
              <CardDescription className="text-gray-300">
                Gear up with the best fitness accessories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700"
                onClick={() => navigate('/my-cart')}
              >
                EXPLORE ACCESSORIES
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
