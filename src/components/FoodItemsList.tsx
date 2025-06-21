import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface FoodItemsListProps {
  category: "vegetarian" | "non-vegetarian";
}

const fetchFoodItems = async (category: "vegetarian" | "non-vegetarian") => {
  const { data, error } = await supabase
    .from("food_items")
    .select("*")
    .eq("category", category)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const FoodItemsList = ({ category }: FoodItemsListProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const {
    data: foodItems,
    isLoading,
    isError,
    error,
  } = useQuery<Tables<"food_items">[]>({
    queryKey: ["food_items", category],
    queryFn: () => fetchFoodItems(category),
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(foodItems?.map((item) => item.id) || []);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const handleGetPreparationIdeas = () => {
    console.log("Selected items for preparation ideas:", selectedItems);
    // In the future, we can implement a feature to generate preparation ideas based on the selection.
  };

  if (isLoading) {
    return <p className="text-white text-center">Loading food items...</p>;
  }

  if (isError) {
    return <p className="text-red-500 text-center">Error: {error.message}</p>;
  }

  const allItemsCount = foodItems?.length || 0;
  const selectedItemsCount = selectedItems.length;

  const isAllSelected = allItemsCount > 0 && selectedItemsCount === allItemsCount;
  const isSomeSelected = selectedItemsCount > 0 && selectedItemsCount < allItemsCount;

  return (
    <Card className="bg-black/60 border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-white capitalize">
          {category} Food Items
        </CardTitle>
        <CardDescription>
          Select items to get food preparation ideas. Nutritional information
          per 100g serving.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>
                  <Checkbox
                    checked={
                      isAllSelected
                        ? true
                        : isSomeSelected
                        ? "indeterminate"
                        : false
                    }
                    onCheckedChange={(checked) => handleSelectAll(checked === true)}
                    aria-label="Select all rows"
                    className="border-gray-500 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                </TableHead>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white text-right">Calories</TableHead>
                <TableHead className="text-white text-right">
                  Protein (g)
                </TableHead>
                <TableHead className="text-white text-right">Carbs (g)</TableHead>
                <TableHead className="text-white text-right">Fat (g)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foodItems?.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-purple-900/20 border-gray-800 data-[state=selected]:bg-purple-900/30"
                  data-state={
                    selectedItems.includes(item.id) ? "selected" : undefined
                  }
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) =>
                        handleSelectItem(item.id, !!checked)
                      }
                      aria-label={`Select row for ${item.name}`}
                      className="border-gray-500 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-gray-300">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-gray-300 text-right">
                    {item.calories_per_100g}
                  </TableCell>
                  <TableCell className="text-gray-300 text-right">
                    {item.protein_g}
                  </TableCell>
                  <TableCell className="text-gray-300 text-right">
                    {item.carbs_g}
                  </TableCell>
                  <TableCell className="text-gray-300 text-right">
                    {item.fat_g}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {selectedItems.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleGetPreparationIdeas}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
            >
              Get Preparation Ideas for {selectedItems.length} item(s)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FoodItemsList;
