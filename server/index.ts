import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "FitPlan API is running!" });
});

// Food routes
app.get("/api/foods", async (req, res) => {
  try {
    const { search, category, limit = 50 } = req.query;

    const where: any = {};

    if (search) {
      where.name = {
        contains: search as string,
      };
    }

    if (category) {
      where.categoryId = category as string;
    }

    const foods = await prisma.food.findMany({
      where,
      include: {
        category: true,
        unit: true,
      },
      take: Number(limit),
      orderBy: {
        name: "asc",
      },
    });

    res.json(foods);
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).json({ error: "Failed to fetch foods" });
  }
});

app.get("/api/foods/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const food = await prisma.food.findUnique({
      where: { id },
      include: {
        category: true,
        unit: true,
      },
    });

    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    res.json(food);
  } catch (error) {
    console.error("Error fetching food:", error);
    res.status(500).json({ error: "Failed to fetch food" });
  }
});

app.post("/api/foods", async (req, res) => {
  try {
    const foodData = req.body;

    const food = await prisma.food.create({
      data: {
        name: foodData.name,
        categoryId: foodData.categoryId,
        unitId: foodData.unitId,
        caloriesPerUnit: foodData.caloriesPerUnit || 0,
        proteinPerUnit: foodData.proteinPerUnit || 0,
        carbsPerUnit: foodData.carbsPerUnit || 0,
        fatPerUnit: foodData.fatPerUnit || 0,
        fiberPerUnit: foodData.fiberPerUnit || 0,
        sugarPerUnit: foodData.sugarPerUnit || 0,
        sodiumPerUnit: foodData.sodiumPerUnit || 0,
        description: foodData.description,
        isCustom: foodData.isCustom || false,
        isFromApi: foodData.isFromApi || false,
        brand: foodData.brand,
        imageUrl: foodData.imageUrl,
        originalQuery: foodData.originalQuery,
        translatedQuery: foodData.translatedQuery,
        apiProductName: foodData.apiProductName,
      },
      include: {
        category: true,
        unit: true,
      },
    });

    res.status(201).json(food);
  } catch (error) {
    console.error("Error creating food:", error);
    res.status(500).json({ error: "Failed to create food" });
  }
});

app.put("/api/foods/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foodData = req.body;

    const food = await prisma.food.update({
      where: { id },
      data: {
        name: foodData.name,
        categoryId: foodData.categoryId,
        unitId: foodData.unitId,
        caloriesPerUnit: foodData.caloriesPerUnit,
        proteinPerUnit: foodData.proteinPerUnit,
        carbsPerUnit: foodData.carbsPerUnit,
        fatPerUnit: foodData.fatPerUnit,
        fiberPerUnit: foodData.fiberPerUnit,
        sugarPerUnit: foodData.sugarPerUnit,
        sodiumPerUnit: foodData.sodiumPerUnit,
        description: foodData.description,
        isCustom: foodData.isCustom,
        isFromApi: foodData.isFromApi,
        brand: foodData.brand,
        imageUrl: foodData.imageUrl,
        originalQuery: foodData.originalQuery,
        translatedQuery: foodData.translatedQuery,
        apiProductName: foodData.apiProductName,
      },
      include: {
        category: true,
        unit: true,
      },
    });

    res.json(food);
  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({ error: "Failed to update food" });
  }
});

app.delete("/api/foods/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.food.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting food:", error);
    res.status(500).json({ error: "Failed to delete food" });
  }
});

// Food categories
app.get("/api/food-categories", async (req, res) => {
  try {
    const categories = await prisma.foodCategory.findMany({
      orderBy: { name: "asc" },
    });
    res.json(categories);
  } catch (error) {
    console.error("Error fetching food categories:", error);
    res.status(500).json({ error: "Failed to fetch food categories" });
  }
});

// Food units
app.get("/api/food-units", async (req, res) => {
  try {
    const units = await prisma.foodUnit.findMany({
      orderBy: { name: "asc" },
    });
    res.json(units);
  } catch (error) {
    console.error("Error fetching food units:", error);
    res.status(500).json({ error: "Failed to fetch food units" });
  }
});

// Exercise routes
app.get("/api/exercises", async (req, res) => {
  try {
    const { search, category, muscleGroup, limit = 50 } = req.query;

    const where: any = {};

    if (search) {
      where.name = {
        contains: search as string,
      };
    }

    if (category) {
      where.categoryId = category as string;
    }

    if (muscleGroup) {
      where.muscleGroups = {
        some: {
          muscleGroupId: muscleGroup as string,
        },
      };
    }

    const exercises = await prisma.exercise.findMany({
      where,
      include: {
        category: true,
        muscleGroups: {
          include: {
            muscleGroup: true,
          },
        },
      },
      take: Number(limit),
      orderBy: {
        name: "asc",
      },
    });

    res.json(exercises);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    res.status(500).json({ error: "Failed to fetch exercises" });
  }
});

app.post("/api/exercises", async (req, res) => {
  try {
    const exerciseData = req.body;

    const exercise = await prisma.exercise.create({
      data: {
        name: exerciseData.name,
        categoryId: exerciseData.categoryId,
        description: exerciseData.description,
        isCustom: exerciseData.isCustom || false,
        muscleGroups: {
          create:
            exerciseData.muscleGroupIds?.map((muscleGroupId: string) => ({
              muscleGroupId,
            })) || [],
        },
      },
      include: {
        category: true,
        muscleGroups: {
          include: {
            muscleGroup: true,
          },
        },
      },
    });

    res.status(201).json(exercise);
  } catch (error) {
    console.error("Error creating exercise:", error);
    res.status(500).json({ error: "Failed to create exercise" });
  }
});

// Exercise categories
app.get("/api/exercise-categories", async (req, res) => {
  try {
    const categories = await prisma.exerciseCategory.findMany({
      orderBy: { name: "asc" },
    });
    res.json(categories);
  } catch (error) {
    console.error("Error fetching exercise categories:", error);
    res.status(500).json({ error: "Failed to fetch exercise categories" });
  }
});

// Muscle groups
app.get("/api/muscle-groups", async (req, res) => {
  try {
    const muscleGroups = await prisma.muscleGroup.findMany({
      orderBy: { name: "asc" },
    });
    res.json(muscleGroups);
  } catch (error) {
    console.error("Error fetching muscle groups:", error);
    res.status(500).json({ error: "Failed to fetch muscle groups" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 FitPlan API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🍎 Foods API: http://localhost:${PORT}/api/foods`);
  console.log(`💪 Exercises API: http://localhost:${PORT}/api/exercises`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down server...");
  await prisma.$disconnect();
  process.exit(0);
});
