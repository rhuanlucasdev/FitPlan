import { supabase } from "../config/supabase";
import type { Food, FoodCategory, FoodUnit } from "../types/Food";

export class SupabaseFoodService {
  // Buscar todos os alimentos
  static async getAllFoods(): Promise<Food[]> {
    try {
      const { data, error } = await supabase
        .from("foods")
        .select(
          `
          *,
          category:food_categories(*),
          unit:food_units(*)
        `
        )
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching foods:", error);
        return [];
      }

      return (
        data?.map((food) => ({
          id: food.id,
          name: food.name,
          category: food.category?.name || "Outros",
          unit: food.unit?.name || "Gramas",
          caloriesPerUnit: food.calories_per_unit || 0,
          proteinPerUnit: food.protein_per_unit || 0,
          carbsPerUnit: food.carbs_per_unit || 0,
          fatPerUnit: food.fat_per_unit || 0,
          fiberPerUnit: food.fiber_per_unit || 0,
          sugarPerUnit: food.sugar_per_unit || 0,
          sodiumPerUnit: food.sodium_per_unit || 0,
          description: food.description || "",
          isCustom: food.is_custom || false,
          isFromApi: food.is_from_api || false,
          brand: food.brand || "",
          imageUrl: food.image_url || "",
          originalQuery: food.original_query || "",
          translatedQuery: food.translated_query || "",
          apiProductName: food.api_product_name || "",
          createdAt: food.created_at || new Date().toISOString(),
          updatedAt: food.updated_at || new Date().toISOString(),
        })) || []
      );
    } catch (error) {
      console.error("Error fetching foods:", error);
      return [];
    }
  }

  // Buscar alimentos por query
  static async searchFoods(query: string): Promise<Food[]> {
    try {
      const { data, error } = await supabase
        .from("foods")
        .select(
          `
          *,
          category:food_categories(*),
          unit:food_units(*)
        `
        )
        .ilike("name", `%${query}%`)
        .order("name", { ascending: true })
        .limit(50);

      if (error) {
        console.error("Error searching foods:", error);
        return [];
      }

      return (
        data?.map((food) => ({
          id: food.id,
          name: food.name,
          category: food.category?.name || "Outros",
          unit: food.unit?.name || "Gramas",
          caloriesPerUnit: food.calories_per_unit || 0,
          proteinPerUnit: food.protein_per_unit || 0,
          carbsPerUnit: food.carbs_per_unit || 0,
          fatPerUnit: food.fat_per_unit || 0,
          fiberPerUnit: food.fiber_per_unit || 0,
          sugarPerUnit: food.sugar_per_unit || 0,
          sodiumPerUnit: food.sodium_per_unit || 0,
          description: food.description || "",
          isCustom: food.is_custom || false,
          isFromApi: food.is_from_api || false,
          brand: food.brand || "",
          imageUrl: food.image_url || "",
          originalQuery: food.original_query || "",
          translatedQuery: food.translated_query || "",
          apiProductName: food.api_product_name || "",
          createdAt: food.created_at || new Date().toISOString(),
          updatedAt: food.updated_at || new Date().toISOString(),
        })) || []
      );
    } catch (error) {
      console.error("Error searching foods:", error);
      return [];
    }
  }

  // Adicionar alimento
  static async addFood(
    food: Omit<Food, "id" | "createdAt" | "updatedAt">
  ): Promise<Food | null> {
    try {
      // Buscar IDs das categorias e unidades
      const { data: categoryData, error: categoryError } = await supabase
        .from("food_categories")
        .select("id")
        .eq("name", food.category)
        .maybeSingle();

      const { data: unitData, error: unitError } = await supabase
        .from("food_units")
        .select("id")
        .eq("name", food.unit)
        .maybeSingle();

      if (categoryError || unitError) {
        console.error(
          "Error fetching category or unit:",
          categoryError || unitError
        );
        return null;
      }

      if (!categoryData || !unitData) {
        console.error("Category or unit not found:", {
          category: food.category,
          unit: food.unit,
        });
        return null;
      }

      const { data, error } = await supabase
        .from("foods")
        .insert({
          name: food.name,
          category_id: categoryData.id,
          unit_id: unitData.id,
          calories_per_unit: food.caloriesPerUnit,
          protein_per_unit: food.proteinPerUnit,
          carbs_per_unit: food.carbsPerUnit,
          fat_per_unit: food.fatPerUnit,
          fiber_per_unit: food.fiberPerUnit,
          sugar_per_unit: food.sugarPerUnit,
          sodium_per_unit: food.sodiumPerUnit,
          description: food.description,
          is_custom: food.isCustom,
          is_from_api: food.isFromApi,
          brand: food.brand,
          image_url: food.imageUrl,
          original_query: food.originalQuery,
          translated_query: food.translatedQuery,
          api_product_name: food.apiProductName,
        })
        .select(
          `
          *,
          category:food_categories(*),
          unit:food_units(*)
        `
        )
        .single();

      if (error) {
        console.error("Error adding food:", error);
        return null;
      }

      return {
        id: data.id,
        name: data.name,
        category: data.category?.name || "Outros",
        unit: data.unit?.name || "Gramas",
        caloriesPerUnit: data.calories_per_unit || 0,
        proteinPerUnit: data.protein_per_unit || 0,
        carbsPerUnit: data.carbs_per_unit || 0,
        fatPerUnit: data.fat_per_unit || 0,
        fiberPerUnit: data.fiber_per_unit || 0,
        sugarPerUnit: data.sugar_per_unit || 0,
        sodiumPerUnit: data.sodium_per_unit || 0,
        description: data.description || "",
        isCustom: data.is_custom || false,
        isFromApi: data.is_from_api || false,
        brand: data.brand || "",
        imageUrl: data.image_url || "",
        originalQuery: data.original_query || "",
        translatedQuery: data.translated_query || "",
        apiProductName: data.api_product_name || "",
        createdAt: data.created_at || new Date().toISOString(),
        updatedAt: data.updated_at || new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error adding food:", error);
      return null;
    }
  }

  // Buscar categorias
  static async getAllCategories(): Promise<FoodCategory[]> {
    try {
      const { data, error } = await supabase
        .from("food_categories")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error);
        return [];
      }

      return (
        data?.map((cat) => ({
          id: cat.id,
          name: cat.name,
          description: cat.description || "",
        })) || []
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  // Buscar unidades
  static async getAllUnits(): Promise<FoodUnit[]> {
    try {
      const { data, error } = await supabase
        .from("food_units")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching units:", error);
        return [];
      }

      return (
        data?.map((unit) => ({
          id: unit.id,
          name: unit.name,
          abbreviation: unit.abbreviation || unit.name,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching units:", error);
      return [];
    }
  }

  // Salvar alimento selecionado da API
  static async saveSelectedFood(food: Food): Promise<Food | null> {
    try {
      // Verificar se o alimento já existe
      const { data: existingFood } = await supabase
        .from("foods")
        .select("id")
        .eq("name", food.name)
        .eq("is_from_api", true)
        .maybeSingle();

      if (existingFood) {
        console.log("Food already exists in database:", food.name);
        return food;
      }

      // Adicionar o alimento ao banco
      return await this.addFood(food);
    } catch (error) {
      console.error("Error saving selected food:", error);
      return null;
    }
  }

  // Calcular macros
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
}
