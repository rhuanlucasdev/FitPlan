export interface Food {
  id: string;
  name: string;
  category: string;
  unit: string; // 'g', 'ml', 'unidade', 'colher', etc.
  caloriesPerUnit: number; // calories per unit
  proteinPerUnit: number; // grams per unit
  carbsPerUnit: number; // grams per unit
  fatPerUnit: number; // grams per unit
  fiberPerUnit?: number; // grams per unit
  sugarPerUnit?: number; // grams per unit
  sodiumPerUnit?: number; // mg per unit
  description?: string;
  isCustom: boolean;
  createdAt: Date;
}

export interface FoodCategory {
  id: string;
  name: string;
  description?: string;
}

export interface FoodUnit {
  id: string;
  name: string;
  abbreviation: string;
  description?: string;
}

export interface FoodMacros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}
