
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StartWorkoutPage from "@/pages/StartWorkout";
import Goals from "@/pages/Goals";
import Health from "@/pages/Health";
import BmiReports from "@/pages/BmiReports";
import WorkoutReports from "@/pages/WorkoutReports";
import GoalsReports from "@/pages/GoalsReports";
import TrainingOptions from "@/pages/TrainingOptions";
import VideoTraining from "@/pages/VideoTraining";
import FoodPreparation from "@/pages/FoodPreparation";
import Progress from "@/pages/Progress";
import Profile from "@/pages/Profile";
import { PageTransition } from "@/components/PageTransition";
import BodyAnalysis from "@/pages/BodyAnalysis";
import MyCart from "@/pages/MyCart";
import ProductDetail from "@/pages/ProductDetail";
import Billing from "@/pages/Billing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Index />
                </PageTransition>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PageTransition>
                  <ProtectedRoute />
                </PageTransition>
              }
            />
            <Route
              path="/profile"
              element={
                <PageTransition>
                  <Profile />
                </PageTransition>
              }
            />
            <Route
              path="/start-workout"
              element={
                <PageTransition>
                  <StartWorkoutPage />
                </PageTransition>
              }
            />
            <Route
              path="/goals"
              element={
                <PageTransition>
                  <Goals />
                </PageTransition>
              }
            />
            <Route
              path="/health"
              element={
                <PageTransition>
                  <Health />
                </PageTransition>
              }
            />
            <Route
              path="/bmi-reports"
              element={
                <PageTransition>
                  <BmiReports />
                </PageTransition>
              }
            />
            <Route
              path="/workout-reports"
              element={
                <PageTransition>
                  <WorkoutReports />
                </PageTransition>
              }
            />
            <Route
              path="/goals-reports"
              element={
                <PageTransition>
                  <GoalsReports />
                </PageTransition>
              }
            />
            <Route
              path="/training-options"
              element={
                <PageTransition>
                  <TrainingOptions />
                </PageTransition>
              }
            />
            <Route
              path="/video-training"
              element={
                <PageTransition>
                  <VideoTraining />
                </PageTransition>
              }
            />
            <Route
              path="/food-preparation"
              element={
                <PageTransition>
                  <FoodPreparation />
                </PageTransition>
              }
            />
            <Route
              path="/progress"
              element={
                <PageTransition>
                  <Progress />
                </PageTransition>
              }
            />
            <Route
              path="/body-analysis"
              element={
                <PageTransition>
                  <BodyAnalysis />
                </PageTransition>
              }
            />
            <Route
              path="/my-cart"
              element={
                <PageTransition>
                  <MyCart />
                </PageTransition>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PageTransition>
                  <ProductDetail />
                </PageTransition>
              }
            />
            <Route
              path="/billing"
              element={
                <PageTransition>
                  <Billing />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
