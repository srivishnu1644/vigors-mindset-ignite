
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Video, ChefHat, Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const featureList = [
  {
    icon: <Video className="w-8 h-8 text-blue-400" />,
    iconBg: "bg-blue-500/20 group-hover:bg-blue-500/30",
    title: "Video Training",
    description: "Access professional workout videos and guided training sessions",
    points: [
      "Professional trainers",
      "Step-by-step guidance",
      "Various difficulty levels",
    ],
    bulletColor: "bg-blue-400",
    buttonColor: "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
    path: "/video-training",
    buttonText: "START VIDEO TRAINING",
  },
  {
    icon: <Dumbbell className="w-8 h-8 text-purple-400" />,
    iconBg: "bg-purple-500/20 group-hover:bg-purple-500/30",
    title: "Normal Training",
    description: "Start a daily workout routine without guidance videos",
    points: [
      "Classic workout plans",
      "Track progress & consistency",
      "Focus on discipline",
    ],
    bulletColor: "bg-purple-400",
    buttonColor: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
    path: "/start-workout",
    buttonText: "START NORMAL TRAINING",
  },
  {
    icon: <ChefHat className="w-8 h-8 text-green-400" />,
    iconBg: "bg-green-500/20 group-hover:bg-green-500/30",
    title: "Food Preparation",
    description: "Learn meal prep techniques and nutrition planning for optimal results",
    points: [
      "Meal prep strategies",
      "Nutrition guidelines",
      "Healthy recipes",
    ],
    bulletColor: "bg-green-400",
    buttonColor: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
    path: "/food-preparation",
    buttonText: "EXPLORE NUTRITION",
  },
];

const TrainingOptions = () => {
  const navigate = useNavigate();

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
              Back
            </Button>
            <h1 className="text-2xl font-bold text-white">
              Training <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Options</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">PATH</span>
          </h2>
          <p className="text-xl text-gray-300">Select your training focus and start your transformation</p>
        </div>

        {/* Training Options */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {featureList.map((opt, idx) => (
            <Card
              key={opt.title}
              className={`flex flex-col justify-between ${idx === 0
                ? "bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/20 hover:border-blue-500/40"
                : idx === 1
                ? "bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/20 hover:border-purple-500/40"
                : "bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/20 hover:border-green-500/40"
                } transition-all cursor-pointer group h-full`}
            >
              <CardHeader className="text-center flex flex-col items-center">
                <div className={`mb-4 w-16 h-16 ${opt.iconBg} rounded-full flex items-center justify-center transition-all`}>
                  {opt.icon}
                </div>
                <CardTitle className="text-white text-2xl">{opt.title}</CardTitle>
                <CardDescription className="text-gray-300 text-lg min-h-[5.5rem]">{opt.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between items-center px-6 pt-0 pb-6">
                <div className="w-full flex justify-center mb-6 mt-2">
                  <ul className="space-y-3 text-left">
                    {opt.points.map((point, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300">
                        <div className={`w-2 h-2 ${opt.bulletColor} rounded-full shrink-0`}></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  className={`w-full ${opt.buttonColor} text-white font-bold py-3`}
                  onClick={() => navigate(opt.path)}
                >
                  {opt.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Motivational Quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 italic">
            "SUCCESS IS WHERE PREPARATION AND OPPORTUNITY MEET"
          </blockquote>
        </div>
      </main>
    </div>
  );
};

export default TrainingOptions;
