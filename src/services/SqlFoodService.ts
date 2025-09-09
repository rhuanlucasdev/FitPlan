import { apiClient } from "./ApiClient";
import type { Food } from "../types/Food";

export class SqlFoodService {
  // Get all foods
  static async getAllFoods(): Promise<Food[]> {
    try {
      const foods = await apiClient.getFoods({ limit: 1000 });
      return this.mapApiFoodsToLocal(foods);
    } catch (error) {
      console.error("Error fetching foods from API:", error);
      return [];
    }
  }

  // Search foods
  static async searchFoods(query: string): Promise<Food[]> {
    try {
      const foods = await apiClient.getFoods({
        search: query,
        limit: 50,
      });
      return this.mapApiFoodsToLocal(foods);
    } catch (error) {
      console.error("Error searching foods:", error);
      return [];
    }
  }

  // Get food by ID
  static async getFoodById(id: string): Promise<Food | null> {
    try {
      const food = await apiClient.getFood(id);
      return this.mapApiFoodToLocal(food);
    } catch (error) {
      console.error("Error fetching food by ID:", error);
      return null;
    }
  }

  // Add food
  static async addFood(food: Omit<Food, "id" | "createdAt">): Promise<Food> {
    try {
      const apiFood = await apiClient.createFood({
        name: food.name,
        categoryId: food.category,
        unitId: food.unit,
        caloriesPerUnit: food.caloriesPerUnit,
        proteinPerUnit: food.proteinPerUnit,
        carbsPerUnit: food.carbsPerUnit,
        fatPerUnit: food.fatPerUnit,
        fiberPerUnit: food.fiberPerUnit,
        sugarPerUnit: food.sugarPerUnit,
        sodiumPerUnit: food.sodiumPerUnit,
        description: food.description,
        isCustom: food.isCustom,
        isFromApi: food.isFromApi || false,
        brand: (food as any).brand,
        imageUrl: (food as any).imageUrl,
        originalQuery: (food as any).originalQuery,
        translatedQuery: (food as any).translatedQuery,
        apiProductName: (food as any).apiProductName,
      });

      return this.mapApiFoodToLocal(apiFood);
    } catch (error) {
      console.error("Error adding food:", error);
      throw error;
    }
  }

  // Update food
  static async updateFood(id: string, food: Partial<Food>): Promise<Food> {
    try {
      const apiFood = await apiClient.updateFood(id, {
        name: food.name,
        categoryId: food.category,
        unitId: food.unit,
        caloriesPerUnit: food.caloriesPerUnit,
        proteinPerUnit: food.proteinPerUnit,
        carbsPerUnit: food.carbsPerUnit,
        fatPerUnit: food.fatPerUnit,
        fiberPerUnit: food.fiberPerUnit,
        sugarPerUnit: food.sugarPerUnit,
        sodiumPerUnit: food.sodiumPerUnit,
        description: food.description,
        isCustom: food.isCustom,
        isFromApi: food.isFromApi,
        brand: (food as any).brand,
        imageUrl: (food as any).imageUrl,
        originalQuery: (food as any).originalQuery,
        translatedQuery: (food as any).translatedQuery,
        apiProductName: (food as any).apiProductName,
      });

      return this.mapApiFoodToLocal(apiFood);
    } catch (error) {
      console.error("Error updating food:", error);
      throw error;
    }
  }

  // Delete food
  static async deleteFood(id: string): Promise<void> {
    try {
      await apiClient.deleteFood(id);
    } catch (error) {
      console.error("Error deleting food:", error);
      throw error;
    }
  }

  // Get categories
  static async getAllCategories() {
    try {
      const categories = await apiClient.getFoodCategories();
      return categories.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        description: cat.description,
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  // Get units
  static async getAllUnits() {
    try {
      const units = await apiClient.getFoodUnits();
      return units.map((unit: any) => ({
        id: unit.id,
        name: unit.name,
        abbreviation: unit.abbreviation,
      }));
    } catch (error) {
      console.error("Error fetching units:", error);
      return [];
    }
  }

  // Calculate macros
  static calculateMacros(food: Food, quantity: number) {
    return {
      calories: food.caloriesPerUnit * quantity,
      protein: food.proteinPerUnit * quantity,
      carbs: food.carbsPerUnit * quantity,
      fat: food.fatPerUnit * quantity,
      fiber: food.fiberPerUnit * quantity,
      sugar: food.sugarPerUnit * quantity,
      sodium: food.sodiumPerUnit * quantity,
    };
  }

  // Map API food to local Food type
  private static mapApiFoodToLocal(apiFood: any): Food {
    return {
      id: apiFood.id,
      name: apiFood.name,
      category: apiFood.categoryId,
      unit: apiFood.unitId,
      caloriesPerUnit: apiFood.caloriesPerUnit,
      proteinPerUnit: apiFood.proteinPerUnit,
      carbsPerUnit: apiFood.carbsPerUnit,
      fatPerUnit: apiFood.fatPerUnit,
      fiberPerUnit: apiFood.fiberPerUnit,
      sugarPerUnit: apiFood.sugarPerUnit,
      sodiumPerUnit: apiFood.sodiumPerUnit,
      description: apiFood.description,
      isCustom: apiFood.isCustom,
      createdAt: apiFood.createdAt,
      // Add API-specific properties
      ...(apiFood.isFromApi && {
        isFromApi: apiFood.isFromApi,
        brand: apiFood.brand,
        imageUrl: apiFood.imageUrl,
        originalQuery: apiFood.originalQuery,
        translatedQuery: apiFood.translatedQuery,
        apiProductName: apiFood.apiProductName,
      }),
    } as Food & {
      isFromApi?: boolean;
      brand?: string;
      imageUrl?: string;
      originalQuery?: string;
      translatedQuery?: string;
      apiProductName?: string;
    };
  }

  // Map multiple API foods to local Food type
  private static mapApiFoodsToLocal(apiFoods: any[]): Food[] {
    return apiFoods.map((food) => this.mapApiFoodToLocal(food));
  }
}
