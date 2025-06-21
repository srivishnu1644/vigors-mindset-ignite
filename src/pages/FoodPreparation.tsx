
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Leaf, Beef } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FoodItemsList from "@/components/FoodItemsList";

type FoodCategory = "vegetarian" | "non-vegetarian";

const FoodPreparation = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] =
    useState<FoodCategory | null>(null);

  const header = (
    <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            onClick={() =>
              selectedCategory
                ? setSelectedCategory(null)
                : navigate("/training-options")
            }
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-white">
            Food{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              Preparation
            </span>
          </h1>
        </div>
      </div>
    </header>
  );

  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
        {header}
        <main className="container mx-auto px-4 py-8">
          <FoodItemsList category={selectedCategory} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      {header}

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            CHOOSE YOUR{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              NUTRITION PATH
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Select the dietary approach that suits your lifestyle
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-green-900/40 to-lime-900/40 border-green-500/20 hover:border-green-500/40 transition-all cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-all">
                <Leaf className="w-8 h-8 text-green-400" />
              </div>
              <CardTitle className="text-white text-2xl">Vegetarian</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Plant-based nutrition for optimal health and sustainable energy
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Plant-based proteins</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Nutrient-rich meals</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Sustainable eating</span>
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700 text-white font-bold py-3"
                onClick={() => setSelectedCategory("vegetarian")}
              >
                EXPLORE VEGETARIAN
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/40 to-yellow-900/40 border-amber-500/20 hover:border-amber-500/40 transition-all cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center group-hover:bg-amber-500/30 transition-all">
                <Beef className="w-8 h-8 text-amber-400" />
              </div>
              <CardTitle className="text-white text-2xl">
                Non-Vegetarian
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Complete protein sources and balanced nutrition with lean meats
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>Lean protein sources</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>Balanced meal plans</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>Muscle building nutrition</span>
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold py-3"
                onClick={() => setSelectedCategory("non-vegetarian")}
              >
                EXPLORE NON-VEGETARIAN
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <blockquote className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 italic">
            "LET FOOD BE THY MEDICINE AND MEDICINE BE THY FOOD"
          </blockquote>
        </div>
      </main>
    </div>
  );
};

export default FoodPreparation;
