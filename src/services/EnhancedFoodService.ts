import { SupabaseFoodService } from "./SupabaseFoodService";
import { ApiService } from "./ApiService";
import { TranslationService } from "./TranslationService";
import type { Food } from "../types/Food";

export class EnhancedFoodService {
  // Search foods using both local database and Open Food Facts API
  static async searchFoods(query: string, useApi: boolean = true) {
    const localResults = await SupabaseFoodService.searchFoods(query);

    if (!useApi) {
      return localResults;
    }

    try {
      // Translate Portuguese query to English for API search
      const translatedQuery = TranslationService.translateFoodName(query);
      // Search Open Food Facts API with translated query
      const apiResults = await ApiService.searchFood(translatedQuery, 10);

      // Convert API results to our Food format (but don't save to database yet)
      const apiFoods: Food[] = [];

      for (const product of apiResults.filter(
        (p: any) => p.nutriments && p.product_name
      )) {
        const nutriments = product.nutriments;

        // Create food with Portuguese name (original query) if translation exists
        const foodName =
          query !== translatedQuery ? query : product.product_name;

        // Check if food already exists in local database
        const existingFoods = await SupabaseFoodService.searchFoods(foodName);
        const existingFood = existingFoods.find(
          (f) => f.name.toLowerCase() === foodName.toLowerCase()
        );

        let savedFood: Food;

        if (existingFood) {
          // Use existing food
          savedFood = existingFood;
        } else {
          // Create new food object (but don't save to database yet)
          const newFood = {
            name: foodName, // Use Portuguese name from original query
            category: this.mapCategory(product.categories_tags?.[0] || ""),
            unit: "Gramas",
            caloriesPerUnit:
              parseFloat(nutriments["energy-kcal_100g"]) / 100 || 0,
            proteinPerUnit: parseFloat(nutriments["proteins_100g"]) / 100 || 0,
            carbsPerUnit:
              parseFloat(nutriments["carbohydrates_100g"]) / 100 || 0,
            fatPerUnit: parseFloat(nutriments["fat_100g"]) / 100 || 0,
            fiberPerUnit: parseFloat(nutriments["fiber_100g"]) / 100 || 0,
            sugarPerUnit: parseFloat(nutriments["sugars_100g"]) / 100 || 0,
            sodiumPerUnit: parseFloat(nutriments["sodium_100g"]) / 100 || 0,
            description:
              product.ingredients_text ||
              `Alimento encontrado via API: ${product.product_name}`,
            isCustom: false,
          };

          // Don't save to database yet - just use the object
          savedFood = newFood as Food;
        }

        // Add API metadata for display
        const foodWithApiData = {
          ...savedFood,
          isFromApi: true,
          brand: product.brands || "",
          image: product.image_url || "",
          originalQuery: query,
          translatedQuery: translatedQuery,
          apiProductName: product.product_name, // Store original API product name
        } as Food & {
          isFromApi: boolean;
          brand: string;
          image: string;
          originalQuery: string;
          translatedQuery: string;
          apiProductName: string;
        };

        apiFoods.push(foodWithApiData);
      }

      // Combine local and API results, removing duplicates
      const combinedResults = [...localResults];
      apiFoods.forEach((apiFood) => {
        if (
          !localResults.some(
            (local) => local.name.toLowerCase() === apiFood.name.toLowerCase()
          )
        ) {
          combinedResults.push(apiFood);
        }
      });

      return combinedResults;
    } catch (error) {
      console.error("Error searching foods with API:", error);
      return localResults;
    }
  }

  // Map Open Food Facts categories to our categories
  private static mapCategory(apiCategory: string): string {
    const categoryMap: { [key: string]: string } = {
      "cereals-and-potatoes": "Cereais e Grãos",
      meat: "Proteínas",
      "fish-and-seafood": "Proteínas",
      eggs: "Proteínas",
      fruits: "Frutas",
      vegetables: "Verduras e Legumes",
      dairy: "Laticínios",
      fats: "Oleaginosas",
      beverages: "Outros",
      snacks: "Outros",
      legumes: "Proteínas",
    };

    const lowerCategory = apiCategory.toLowerCase();
    for (const [key, value] of Object.entries(categoryMap)) {
      if (lowerCategory.includes(key)) {
        return value;
      }
    }

    return "Outros"; // Default to Outros
  }

  // Get all foods (local + API search)
  static async getAllFoods() {
    return await SupabaseFoodService.getAllFoods();
  }

  // Add food to local database
  static async addFood(food: Omit<Food, "id" | "createdAt">) {
    return await SupabaseFoodService.addFood(food);
  }

  // Calculate macros
  static calculateMacros(food: Food, quantity: number) {
    return SupabaseFoodService.calculateMacros(food, quantity);
  }

  // Get categories
  static async getAllCategories() {
    return await SupabaseFoodService.getAllCategories();
  }

  // Get units
  static async getAllUnits() {
    return await SupabaseFoodService.getAllUnits();
  }

  // Save a specific food to the database when user selects it
  static async saveSelectedFood(
    food: Food & {
      isFromApi?: boolean;
      brand?: string;
      image?: string;
      originalQuery?: string;
      translatedQuery?: string;
      apiProductName?: string;
    }
  ) {
    console.log("🔍 Tentando salvar alimento:", food.name);
    console.log("📊 Dados do alimento:", {
      name: food.name,
      category: food.category,
      unit: food.unit,
      isFromApi: food.isFromApi,
    });

    // Check if food already exists in local database
    const existingFoods = await SupabaseFoodService.searchFoods(food.name);
    const existingFood = existingFoods.find(
      (f) => f.name.toLowerCase() === food.name.toLowerCase()
    );

    if (existingFood) {
      console.log("✅ Alimento já existe no banco:", existingFood.name);
      return existingFood;
    } else {
      console.log("💾 Salvando novo alimento no banco...");
      // Save the food to the database
      const foodToSave = {
        name: food.name,
        category: food.category,
        unit: food.unit,
        caloriesPerUnit: food.caloriesPerUnit,
        proteinPerUnit: food.proteinPerUnit,
        carbsPerUnit: food.carbsPerUnit,
        fatPerUnit: food.fatPerUnit,
        fiberPerUnit: food.fiberPerUnit,
        sugarPerUnit: food.sugarPerUnit,
        sodiumPerUnit: food.sodiumPerUnit,
        description: food.description,
        isCustom: false,
        isFromApi: food.isFromApi || false,
        brand: food.brand,
        imageUrl: food.image,
        originalQuery: food.originalQuery,
        translatedQuery: food.translatedQuery,
        apiProductName: food.apiProductName,
      };

      const result = await SupabaseFoodService.addFood(foodToSave);
      if (result) {
        console.log("✅ Alimento salvo com sucesso:", result.name);
        return result;
      } else {
        console.error("❌ Erro ao salvar alimento");
        return null;
      }
    }
  }
}
