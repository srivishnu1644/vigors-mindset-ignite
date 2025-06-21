
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Dumbbell, Users, Star, TrendingUp, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const VideoTraining = () => {
  const navigate = useNavigate();
  const [selectedTraining, setSelectedTraining] = useState<string | null>(null);

  const renderLevels = (trainingType: string, color: string) => (
    <div className="space-y-4">
      <Button
        onClick={() => setSelectedTraining(null)}
        variant="outline"
        size="sm"
        className="mb-4 border-gray-600 text-gray-300 hover:bg-gray-800"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Training Types
      </Button>
      
      <h3 className="text-2xl font-bold text-white text-center mb-6">
        Choose Your {trainingType} Level
      </h3>
      
      <div className="grid gap-4">
        {/* Beginner Level */}
        <Card className={`bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/20 hover:border-green-500/40 transition-all cursor-pointer`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-white">Beginner</h4>
                <p className="text-gray-300">Perfect for those starting their fitness journey</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                START BEGINNER
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Intermediate Level */}
        <Card className={`bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-yellow-500/20 hover:border-yellow-500/40 transition-all cursor-pointer`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-white">Intermediate</h4>
                <p className="text-gray-300">For those with some experience and foundation</p>
              </div>
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                START INTERMEDIATE
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Level */}
        <Card className={`bg-gradient-to-r from-red-900/40 to-rose-900/40 border-red-500/20 hover:border-red-500/40 transition-all cursor-pointer`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-white">Advanced</h4>
                <p className="text-gray-300">For experienced athletes pushing their limits</p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                START ADVANCED
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/training-options')}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-white">
              Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Training</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {selectedTraining ? (
          renderLevels(selectedTraining, selectedTraining === "Strength Training" ? "red" : "purple")
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">TRAINING STYLE</span>
              </h2>
              <p className="text-xl text-gray-300">Select the type of training that matches your goals</p>
            </div>

            {/* Training Options */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Strength Training Card */}
              <Card className="bg-gradient-to-br from-red-900/40 to-orange-900/40 border-red-500/20 hover:border-red-500/40 transition-all cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center group-hover:bg-red-500/30 transition-all">
                    <Dumbbell className="w-8 h-8 text-red-400" />
                  </div>
                  <CardTitle className="text-white text-2xl">Strength Training</CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    Build muscle mass and increase strength with weights and resistance training
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span>Weight lifting techniques</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span>Progressive overload</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span>Muscle building programs</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3"
                    onClick={() => setSelectedTraining("Strength Training")}
                  >
                    START STRENGTH TRAINING
                  </Button>
                </CardContent>
              </Card>

              {/* Calisthenics Card */}
              <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:bg-purple-500/30 transition-all">
                    <Users className="w-8 h-8 text-purple-400" />
                  </div>
                  <CardTitle className="text-white text-2xl">Calisthenics</CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    Master bodyweight movements and build functional strength naturally
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Bodyweight exercises</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Movement progressions</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Functional fitness</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3"
                    onClick={() => setSelectedTraining("Calisthenics")}
                  >
                    START CALISTHENICS
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Motivational Quote */}
            <div className="mt-16 text-center">
              <blockquote className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 italic">
                "STRENGTH DOESN'T COME FROM WHAT YOU CAN DO. IT COMES FROM OVERCOMING THE THINGS YOU ONCE THOUGHT YOU COULDN'T."
              </blockquote>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default VideoTraining;
