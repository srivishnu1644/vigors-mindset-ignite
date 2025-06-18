
-- Create a table for food items with nutritional information
CREATE TABLE public.food_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('vegetarian', 'non-vegetarian')),
  serving_size_g NUMERIC NOT NULL DEFAULT 100,
  calories_per_100g NUMERIC NOT NULL,
  protein_g NUMERIC NOT NULL DEFAULT 0,
  carbs_g NUMERIC NOT NULL DEFAULT 0,
  fat_g NUMERIC NOT NULL DEFAULT 0,
  fiber_g NUMERIC DEFAULT 0,
  sugar_g NUMERIC DEFAULT 0,
  sodium_mg NUMERIC DEFAULT 0,
  potassium_mg NUMERIC DEFAULT 0,
  calcium_mg NUMERIC DEFAULT 0,
  iron_mg NUMERIC DEFAULT 0,
  vitamin_c_mg NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.food_items ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read food items (public data)
CREATE POLICY "Anyone can view food items" 
  ON public.food_items 
  FOR SELECT 
  TO public 
  USING (true);

-- Insert vegetarian food items
INSERT INTO public.food_items (name, category, calories_per_100g, protein_g, carbs_g, fat_g, fiber_g, sugar_g, sodium_mg, potassium_mg, calcium_mg, iron_mg, vitamin_c_mg) VALUES
('Brown Rice', 'vegetarian', 123, 2.6, 25.0, 0.9, 1.8, 0.4, 5, 43, 10, 0.4, 0),
('Quinoa', 'vegetarian', 120, 4.4, 21.3, 1.9, 2.8, 0.9, 5, 172, 17, 1.5, 0),
('Lentils (Cooked)', 'vegetarian', 116, 9.0, 20.1, 0.4, 7.9, 1.8, 2, 369, 19, 3.3, 1.5),
('Chickpeas (Cooked)', 'vegetarian', 164, 8.9, 27.4, 2.6, 7.6, 4.8, 7, 291, 49, 2.9, 1.3),
('Black Beans (Cooked)', 'vegetarian', 132, 8.9, 23.7, 0.5, 8.7, 0.3, 2, 355, 27, 2.1, 0),
('Tofu (Firm)', 'vegetarian', 144, 15.8, 4.3, 8.7, 2.3, 0.6, 11, 178, 683, 2.7, 0.1),
('Tempeh', 'vegetarian', 190, 20.3, 7.6, 10.8, 9.0, 2.3, 9, 412, 111, 2.7, 0),
('Almonds', 'vegetarian', 579, 21.2, 21.6, 49.9, 12.5, 4.4, 1, 733, 269, 3.7, 0),
('Walnuts', 'vegetarian', 654, 15.2, 13.7, 65.2, 6.7, 2.6, 2, 441, 98, 2.9, 1.3),
('Spinach (Raw)', 'vegetarian', 23, 2.9, 3.6, 0.4, 2.2, 0.4, 79, 558, 99, 2.7, 28.1),
('Broccoli (Raw)', 'vegetarian', 34, 2.8, 6.6, 0.4, 2.6, 1.5, 33, 316, 47, 0.7, 89.2),
('Sweet Potato (Baked)', 'vegetarian', 90, 2.0, 20.7, 0.1, 3.3, 6.8, 6, 475, 38, 0.7, 19.6),
('Avocado', 'vegetarian', 160, 2.0, 8.5, 14.7, 6.7, 0.7, 7, 485, 12, 0.6, 10.0),
('Banana', 'vegetarian', 89, 1.1, 22.8, 0.3, 2.6, 12.2, 1, 358, 5, 0.3, 8.7),
('Greek Yogurt (Plain)', 'vegetarian', 59, 10.0, 3.6, 0.4, 0, 3.6, 36, 141, 110, 0.1, 0);

-- Insert non-vegetarian food items
INSERT INTO public.food_items (name, category, calories_per_100g, protein_g, carbs_g, fat_g, fiber_g, sugar_g, sodium_mg, potassium_mg, calcium_mg, iron_mg, vitamin_c_mg) VALUES
('Chicken Breast (Skinless)', 'non-vegetarian', 165, 31.0, 0, 3.6, 0, 0, 74, 256, 15, 1.0, 0),
('Salmon (Atlantic)', 'non-vegetarian', 208, 25.4, 0, 12.4, 0, 0, 59, 363, 12, 0.8, 0),
('Tuna (Yellowfin)', 'non-vegetarian', 144, 30.2, 0, 0.6, 0, 0, 50, 527, 16, 0.8, 0),
('Lean Ground Beef (93/7)', 'non-vegetarian', 152, 22.6, 0, 5.8, 0, 0, 67, 270, 18, 2.3, 0),
('Turkey Breast (Skinless)', 'non-vegetarian', 135, 30.1, 0, 0.7, 0, 0, 54, 298, 10, 1.4, 0),
('Eggs (Whole)', 'non-vegetarian', 155, 13.0, 1.1, 10.6, 0, 0.7, 124, 126, 50, 1.8, 0),
('Shrimp', 'non-vegetarian', 106, 20.1, 0.9, 1.7, 0, 0, 111, 259, 70, 0.5, 0),
('Cod Fish', 'non-vegetarian', 105, 23.0, 0, 0.9, 0, 0, 78, 413, 18, 0.4, 0),
('Lean Pork Tenderloin', 'non-vegetarian', 143, 26.0, 0, 3.5, 0, 0, 53, 423, 6, 1.0, 0),
('Chicken Thigh (Skinless)', 'non-vegetarian', 209, 26.0, 0, 10.9, 0, 0, 95, 229, 11, 1.3, 0),
('Ground Turkey (93/7)', 'non-vegetarian', 120, 22.0, 0, 2.7, 0, 0, 59, 246, 21, 1.4, 0),
('Sardines (Canned)', 'non-vegetarian', 208, 24.6, 0, 11.5, 0, 0, 307, 397, 382, 2.9, 0),
('Lean Ham', 'non-vegetarian', 145, 21.0, 1.5, 5.5, 0, 0, 1203, 287, 6, 0.9, 0),
('Cottage Cheese (Low-fat)', 'non-vegetarian', 98, 11.1, 3.4, 4.3, 0, 2.7, 364, 104, 83, 0.1, 0),
('Milk (2% fat)', 'non-vegetarian', 50, 3.3, 4.8, 2.0, 0, 4.8, 44, 150, 113, 0.0, 0);
