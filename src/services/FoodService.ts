import type { Food, FoodCategory, FoodUnit, FoodMacros } from "../types/Food";

class FoodService {
  private foods: Food[] = [];
  private categories: FoodCategory[] = [];
  private units: FoodUnit[] = [];

  constructor() {
    this.initializeData();
    this.loadFromLocalStorage();
  }

  private initializeData() {
    // Initialize categories
    this.categories = [
      {
        id: "1",
        name: "Cereais e Grãos",
        description: "Arroz, aveia, quinoa, etc.",
      },
      { id: "2", name: "Proteínas", description: "Carnes, ovos, peixes, etc." },
      { id: "3", name: "Frutas", description: "Frutas frescas e secas" },
      { id: "4", name: "Vegetais", description: "Legumes e verduras" },
      {
        id: "5",
        name: "Laticínios",
        description: "Leite, queijo, iogurte, etc.",
      },
      {
        id: "6",
        name: "Gorduras",
        description: "Óleos, azeite, manteiga, etc.",
      },
      { id: "7", name: "Bebidas", description: "Água, sucos, chás, etc." },
      { id: "8", name: "Snacks", description: "Biscoitos, doces, etc." },
      { id: "9", name: "Tubérculos", description: "Batata, mandioca, etc." },
      {
        id: "10",
        name: "Leguminosas",
        description: "Feijão, lentilha, grão-de-bico, etc.",
      },
    ];

    // Initialize units
    this.units = [
      {
        id: "1",
        name: "Gramas",
        abbreviation: "g",
        description: "Peso em gramas",
      },
      {
        id: "2",
        name: "Mililitros",
        abbreviation: "ml",
        description: "Volume em mililitros",
      },
      {
        id: "3",
        name: "Unidade",
        abbreviation: "un",
        description: "Quantidade unitária",
      },
      {
        id: "4",
        name: "Colher de sopa",
        abbreviation: "colher",
        description: "Colher de sopa",
      },
      {
        id: "5",
        name: "Colher de chá",
        abbreviation: "colher chá",
        description: "Colher de chá",
      },
      {
        id: "6",
        name: "Xícara",
        abbreviation: "xícara",
        description: "Xícara padrão",
      },
      {
        id: "7",
        name: "Fatia",
        abbreviation: "fatia",
        description: "Fatia média",
      },
      {
        id: "8",
        name: "Copo",
        abbreviation: "copo",
        description: "Copo padrão",
      },
    ];

    // Initialize sample foods with comprehensive nutritional data
    this.foods = [
      // Cereais e Grãos
      {
        id: "1",
        name: "Arroz branco cozido",
        category: "1",
        unit: "g",
        caloriesPerUnit: 1.3,
        proteinPerUnit: 0.03,
        carbsPerUnit: 0.28,
        fatPerUnit: 0.003,
        fiberPerUnit: 0.001,
        description: "Arroz branco cozido sem sal",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Arroz integral cozido",
        category: "1",
        unit: "g",
        caloriesPerUnit: 1.1,
        proteinPerUnit: 0.025,
        carbsPerUnit: 0.23,
        fatPerUnit: 0.009,
        fiberPerUnit: 0.018,
        description: "Arroz integral cozido sem sal",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "3",
        name: "Aveia em flocos",
        category: "1",
        unit: "g",
        caloriesPerUnit: 3.8,
        proteinPerUnit: 0.17,
        carbsPerUnit: 0.66,
        fatPerUnit: 0.07,
        fiberPerUnit: 0.11,
        description: "Aveia em flocos seca",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "4",
        name: "Quinoa cozida",
        category: "1",
        unit: "g",
        caloriesPerUnit: 1.2,
        proteinPerUnit: 0.04,
        carbsPerUnit: 0.22,
        fatPerUnit: 0.02,
        fiberPerUnit: 0.025,
        description: "Quinoa cozida sem sal",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "5",
        name: "Pão integral",
        category: "1",
        unit: "fatia",
        caloriesPerUnit: 80,
        proteinPerUnit: 4,
        carbsPerUnit: 15,
        fatPerUnit: 1,
        fiberPerUnit: 2,
        description: "Pão integral industrializado",
        isCustom: false,
        createdAt: new Date(),
      },

      // Proteínas
      {
        id: "6",
        name: "Peito de frango grelhado",
        category: "2",
        unit: "g",
        caloriesPerUnit: 1.65,
        proteinPerUnit: 0.31,
        carbsPerUnit: 0,
        fatPerUnit: 0.036,
        description: "Peito de frango sem pele grelhado",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "7",
        name: "Salmão grelhado",
        category: "2",
        unit: "g",
        caloriesPerUnit: 2.31,
        proteinPerUnit: 0.25,
        carbsPerUnit: 0,
        fatPerUnit: 0.14,
        description: "Salmão grelhado sem óleo",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "8",
        name: "Ovo inteiro",
        category: "2",
        unit: "un",
        caloriesPerUnit: 70,
        proteinPerUnit: 6,
        carbsPerUnit: 0.6,
        fatPerUnit: 5,
        description: "Ovo de galinha inteiro",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "9",
        name: "Clara de ovo",
        category: "2",
        unit: "un",
        caloriesPerUnit: 17,
        proteinPerUnit: 3.6,
        carbsPerUnit: 0.2,
        fatPerUnit: 0.1,
        description: "Apenas a clara do ovo",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "10",
        name: "Carne bovina magra grelhada",
        category: "2",
        unit: "g",
        caloriesPerUnit: 2.5,
        proteinPerUnit: 0.26,
        carbsPerUnit: 0,
        fatPerUnit: 0.15,
        description: "Carne bovina magra grelhada",
        isCustom: false,
        createdAt: new Date(),
      },

      // Frutas
      {
        id: "11",
        name: "Banana",
        category: "3",
        unit: "un",
        caloriesPerUnit: 90,
        proteinPerUnit: 1.1,
        carbsPerUnit: 23,
        fatPerUnit: 0.3,
        fiberPerUnit: 2.6,
        sugarPerUnit: 12,
        description: "Banana média (120g)",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "12",
        name: "Maçã",
        category: "3",
        unit: "un",
        caloriesPerUnit: 80,
        proteinPerUnit: 0.4,
        carbsPerUnit: 21,
        fatPerUnit: 0.3,
        fiberPerUnit: 3.7,
        sugarPerUnit: 16,
        description: "Maçã média (180g)",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "13",
        name: "Abacate",
        category: "3",
        unit: "un",
        caloriesPerUnit: 160,
        proteinPerUnit: 2,
        carbsPerUnit: 9,
        fatPerUnit: 15,
        fiberPerUnit: 7,
        description: "Abacate médio (150g)",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "14",
        name: "Morango",
        category: "3",
        unit: "g",
        caloriesPerUnit: 0.32,
        proteinPerUnit: 0.007,
        carbsPerUnit: 0.077,
        fatPerUnit: 0.003,
        fiberPerUnit: 0.02,
        sugarPerUnit: 0.049,
        description: "Morango fresco",
        isCustom: false,
        createdAt: new Date(),
      },

      // Vegetais
      {
        id: "15",
        name: "Brócolis cozido",
        category: "4",
        unit: "g",
        caloriesPerUnit: 0.35,
        proteinPerUnit: 0.038,
        carbsPerUnit: 0.07,
        fatPerUnit: 0.004,
        fiberPerUnit: 0.032,
        description: "Brócolis cozido sem sal",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "16",
        name: "Espinafre cru",
        category: "4",
        unit: "g",
        caloriesPerUnit: 0.23,
        proteinPerUnit: 0.029,
        carbsPerUnit: 0.036,
        fatPerUnit: 0.004,
        fiberPerUnit: 0.022,
        description: "Espinafre cru",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "17",
        name: "Tomate",
        category: "4",
        unit: "un",
        caloriesPerUnit: 20,
        proteinPerUnit: 1,
        carbsPerUnit: 4,
        fatPerUnit: 0.2,
        fiberPerUnit: 1.2,
        description: "Tomate médio (100g)",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "18",
        name: "Cenoura crua",
        category: "4",
        unit: "g",
        caloriesPerUnit: 0.41,
        proteinPerUnit: 0.009,
        carbsPerUnit: 0.096,
        fatPerUnit: 0.002,
        fiberPerUnit: 0.028,
        description: "Cenoura crua",
        isCustom: false,
        createdAt: new Date(),
      },

      // Laticínios
      {
        id: "19",
        name: "Leite integral",
        category: "5",
        unit: "ml",
        caloriesPerUnit: 0.64,
        proteinPerUnit: 0.032,
        carbsPerUnit: 0.048,
        fatPerUnit: 0.034,
        description: "Leite de vaca integral",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "20",
        name: "Leite desnatado",
        category: "5",
        unit: "ml",
        caloriesPerUnit: 0.34,
        proteinPerUnit: 0.034,
        carbsPerUnit: 0.05,
        fatPerUnit: 0.001,
        description: "Leite de vaca desnatado",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "21",
        name: "Queijo minas",
        category: "5",
        unit: "g",
        caloriesPerUnit: 2.65,
        proteinPerUnit: 0.17,
        carbsPerUnit: 0.03,
        fatPerUnit: 0.21,
        sodiumPerUnit: 0.4,
        description: "Queijo minas frescal",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "22",
        name: "Iogurte natural",
        category: "5",
        unit: "g",
        caloriesPerUnit: 0.59,
        proteinPerUnit: 0.033,
        carbsPerUnit: 0.045,
        fatPerUnit: 0.032,
        description: "Iogurte natural integral",
        isCustom: false,
        createdAt: new Date(),
      },

      // Gorduras
      {
        id: "23",
        name: "Azeite de oliva",
        category: "6",
        unit: "colher",
        caloriesPerUnit: 90,
        proteinPerUnit: 0,
        carbsPerUnit: 0,
        fatPerUnit: 10,
        description: "Azeite de oliva extra virgem (1 colher de sopa)",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "24",
        name: "Manteiga",
        category: "6",
        unit: "colher",
        caloriesPerUnit: 100,
        proteinPerUnit: 0.1,
        carbsPerUnit: 0.1,
        fatPerUnit: 11,
        description: "Manteiga sem sal (1 colher de sopa)",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "25",
        name: "Abacate",
        category: "6",
        unit: "g",
        caloriesPerUnit: 1.6,
        proteinPerUnit: 0.02,
        carbsPerUnit: 0.09,
        fatPerUnit: 0.15,
        fiberPerUnit: 0.07,
        description: "Abacate (por grama)",
        isCustom: false,
        createdAt: new Date(),
      },

      // Tubérculos
      {
        id: "26",
        name: "Batata cozida",
        category: "9",
        unit: "g",
        caloriesPerUnit: 0.87,
        proteinPerUnit: 0.02,
        carbsPerUnit: 0.2,
        fatPerUnit: 0.001,
        fiberPerUnit: 0.02,
        description: "Batata cozida sem sal",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "27",
        name: "Batata doce cozida",
        category: "9",
        unit: "g",
        caloriesPerUnit: 0.86,
        proteinPerUnit: 0.016,
        carbsPerUnit: 0.2,
        fatPerUnit: 0.001,
        fiberPerUnit: 0.03,
        description: "Batata doce cozida sem sal",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "28",
        name: "Mandioca cozida",
        category: "9",
        unit: "g",
        caloriesPerUnit: 1.6,
        proteinPerUnit: 0.01,
        carbsPerUnit: 0.38,
        fatPerUnit: 0.001,
        fiberPerUnit: 0.018,
        description: "Mandioca cozida sem sal",
        isCustom: false,
        createdAt: new Date(),
      },

      // Leguminosas
      {
        id: "29",
        name: "Feijão preto cozido",
        category: "10",
        unit: "g",
        caloriesPerUnit: 1.32,
        proteinPerUnit: 0.086,
        carbsPerUnit: 0.24,
        fatPerUnit: 0.005,
        fiberPerUnit: 0.086,
        description: "Feijão preto cozido sem sal",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "30",
        name: "Lentilha cozida",
        category: "10",
        unit: "g",
        caloriesPerUnit: 1.16,
        proteinPerUnit: 0.09,
        carbsPerUnit: 0.2,
        fatPerUnit: 0.004,
        fiberPerUnit: 0.078,
        description: "Lentilha cozida sem sal",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "31",
        name: "Grão-de-bico cozido",
        category: "10",
        unit: "g",
        caloriesPerUnit: 1.64,
        proteinPerUnit: 0.089,
        carbsPerUnit: 0.27,
        fatPerUnit: 0.027,
        fiberPerUnit: 0.078,
        description: "Grão-de-bico cozido sem sal",
        isCustom: false,
        createdAt: new Date(),
      },

      // Bebidas
      {
        id: "32",
        name: "Água",
        category: "7",
        unit: "ml",
        caloriesPerUnit: 0,
        proteinPerUnit: 0,
        carbsPerUnit: 0,
        fatPerUnit: 0,
        description: "Água pura",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "33",
        name: "Suco de laranja natural",
        category: "7",
        unit: "ml",
        caloriesPerUnit: 0.45,
        proteinPerUnit: 0.007,
        carbsPerUnit: 0.1,
        fatPerUnit: 0.002,
        sugarPerUnit: 0.08,
        description: "Suco de laranja natural sem açúcar",
        isCustom: false,
        createdAt: new Date(),
      },
    ];
  }

  private loadFromLocalStorage() {
    try {
      const savedFoods = localStorage.getItem("foods");
      if (savedFoods) {
        const parsed = JSON.parse(savedFoods);
        this.foods = parsed.map((food: any) => ({
          ...food,
          createdAt: new Date(food.createdAt),
        }));
      }
    } catch (error) {
      console.error("Error loading foods from localStorage:", error);
    }
  }

  private saveToLocalStorage() {
    try {
      localStorage.setItem("foods", JSON.stringify(this.foods));
    } catch (error) {
      console.error("Error saving foods to localStorage:", error);
    }
  }

  // Food CRUD operations
  getAllFoods(): Food[] {
    return [...this.foods];
  }

  getFoodById(id: string): Food | undefined {
    return this.foods.find((food) => food.id === id);
  }

  searchFoods(query: string): Food[] {
    const lowerQuery = query.toLowerCase();
    return this.foods.filter(
      (food) =>
        food.name.toLowerCase().includes(lowerQuery) ||
        this.getCategoryName(food.category)
          .toLowerCase()
          .includes(lowerQuery) ||
        food.description?.toLowerCase().includes(lowerQuery)
    );
  }

  addFood(food: Omit<Food, "id" | "createdAt">): Food {
    const newFood: Food = {
      ...food,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    this.foods.push(newFood);
    this.saveToLocalStorage();
    return newFood;
  }

  updateFood(id: string, updates: Partial<Food>): Food | null {
    const index = this.foods.findIndex((food) => food.id === id);
    if (index === -1) return null;

    this.foods[index] = { ...this.foods[index], ...updates };
    this.saveToLocalStorage();
    return this.foods[index];
  }

  deleteFood(id: string): boolean {
    const index = this.foods.findIndex((food) => food.id === id);
    if (index === -1) return false;

    this.foods.splice(index, 1);
    this.saveToLocalStorage();
    return true;
  }

  // Calculate macros for a given quantity
  calculateMacros(foodId: string, quantity: number): FoodMacros | null {
    const food = this.getFoodById(foodId);
    if (!food) return null;

    return {
      calories: Math.round(food.caloriesPerUnit * quantity * 100) / 100,
      protein: Math.round(food.proteinPerUnit * quantity * 100) / 100,
      carbs: Math.round(food.carbsPerUnit * quantity * 100) / 100,
      fat: Math.round(food.fatPerUnit * quantity * 100) / 100,
      fiber: food.fiberPerUnit
        ? Math.round(food.fiberPerUnit * quantity * 100) / 100
        : undefined,
      sugar: food.sugarPerUnit
        ? Math.round(food.sugarPerUnit * quantity * 100) / 100
        : undefined,
      sodium: food.sodiumPerUnit
        ? Math.round(food.sodiumPerUnit * quantity * 100) / 100
        : undefined,
    };
  }

  // Category operations
  getAllCategories(): FoodCategory[] {
    return [...this.categories];
  }

  getCategoryById(id: string): FoodCategory | undefined {
    return this.categories.find((cat) => cat.id === id);
  }

  getCategoryName(id: string): string {
    const category = this.getCategoryById(id);
    return category?.name || "Categoria não encontrada";
  }

  // Unit operations
  getAllUnits(): FoodUnit[] {
    return [...this.units];
  }

  getUnitById(id: string): FoodUnit | undefined {
    return this.units.find((unit) => unit.id === id);
  }

  getUnitName(id: string): string {
    const unit = this.getUnitById(id);
    return unit?.name || "Unidade não encontrada";
  }

  getUnitAbbreviation(id: string): string {
    const unit = this.getUnitById(id);
    return unit?.abbreviation || "un";
  }
}

export const foodService = new FoodService();
