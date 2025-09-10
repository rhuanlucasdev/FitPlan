import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create food categories
  const foodCategories = await Promise.all([
    prisma.foodCategory.upsert({
      where: { id: "1" },
      update: {},
      create: {
        id: "1",
        name: "Cereais e Grãos",
        description: "Arroz, trigo, aveia, quinoa, etc.",
      },
    }),
    prisma.foodCategory.upsert({
      where: { id: "2" },
      update: {},
      create: {
        id: "2",
        name: "Proteínas",
        description: "Carnes, peixes, ovos, leguminosas, etc.",
      },
    }),
    prisma.foodCategory.upsert({
      where: { id: "3" },
      update: {},
      create: {
        id: "3",
        name: "Frutas",
        description: "Frutas frescas e secas",
      },
    }),
    prisma.foodCategory.upsert({
      where: { id: "4" },
      update: {},
      create: {
        id: "4",
        name: "Vegetais",
        description: "Verduras e legumes",
      },
    }),
    prisma.foodCategory.upsert({
      where: { id: "5" },
      update: {},
      create: {
        id: "5",
        name: "Laticínios",
        description: "Leite, queijo, iogurte, etc.",
      },
    }),
    prisma.foodCategory.upsert({
      where: { id: "6" },
      update: {},
      create: {
        id: "6",
        name: "Gorduras",
        description: "Óleos, manteiga, azeite, etc.",
      },
    }),
    prisma.foodCategory.upsert({
      where: { id: "7" },
      update: {},
      create: {
        id: "7",
        name: "Bebidas",
        description: "Sucos, água, chás, etc.",
      },
    }),
    prisma.foodCategory.upsert({
      where: { id: "8" },
      update: {},
      create: {
        id: "8",
        name: "Snacks",
        description: "Biscoitos, salgadinhos, etc.",
      },
    }),
    prisma.foodCategory.upsert({
      where: { id: "9" },
      update: {},
      create: {
        id: "9",
        name: "Tubérculos",
        description: "Batata, mandioca, inhame, etc.",
      },
    }),
    prisma.foodCategory.upsert({
      where: { id: "10" },
      update: {},
      create: {
        id: "10",
        name: "Leguminosas",
        description: "Feijão, lentilha, grão-de-bico, etc.",
      },
    }),
  ]);

  console.log("✅ Food categories created");

  // Create food units
  const foodUnits = await Promise.all([
    prisma.foodUnit.upsert({
      where: { id: "1" },
      update: {},
      create: {
        id: "1",
        name: "Grama",
        abbreviation: "g",
      },
    }),
    prisma.foodUnit.upsert({
      where: { id: "2" },
      update: {},
      create: {
        id: "2",
        name: "Quilograma",
        abbreviation: "kg",
      },
    }),
    prisma.foodUnit.upsert({
      where: { id: "3" },
      update: {},
      create: {
        id: "3",
        name: "Mililitro",
        abbreviation: "ml",
      },
    }),
    prisma.foodUnit.upsert({
      where: { id: "4" },
      update: {},
      create: {
        id: "4",
        name: "Litro",
        abbreviation: "l",
      },
    }),
    prisma.foodUnit.upsert({
      where: { id: "5" },
      update: {},
      create: {
        id: "5",
        name: "Unidade",
        abbreviation: "un",
      },
    }),
    prisma.foodUnit.upsert({
      where: { id: "6" },
      update: {},
      create: {
        id: "6",
        name: "Colher de sopa",
        abbreviation: "colher",
      },
    }),
    prisma.foodUnit.upsert({
      where: { id: "7" },
      update: {},
      create: {
        id: "7",
        name: "Colher de chá",
        abbreviation: "c. chá",
      },
    }),
    prisma.foodUnit.upsert({
      where: { id: "8" },
      update: {},
      create: {
        id: "8",
        name: "Xícara",
        abbreviation: "xícara",
      },
    }),
  ]);

  console.log("✅ Food units created");

  // Create sample foods
  const sampleFoods = [
    {
      name: "Arroz branco cozido",
      categoryId: "1",
      unitId: "1",
      caloriesPerUnit: 1.3,
      proteinPerUnit: 0.03,
      carbsPerUnit: 0.28,
      fatPerUnit: 0.003,
      fiberPerUnit: 0.001,
      sugarPerUnit: 0.001,
      sodiumPerUnit: 0.0005,
      description: "Arroz branco cozido sem sal",
    },
    {
      name: "Frango grelhado",
      categoryId: "2",
      unitId: "1",
      caloriesPerUnit: 1.65,
      proteinPerUnit: 0.31,
      carbsPerUnit: 0,
      fatPerUnit: 0.036,
      fiberPerUnit: 0,
      sugarPerUnit: 0,
      sodiumPerUnit: 0.0007,
      description: "Peito de frango grelhado sem pele",
    },
    {
      name: "Banana",
      categoryId: "3",
      unitId: "1",
      caloriesPerUnit: 0.89,
      proteinPerUnit: 0.011,
      carbsPerUnit: 0.23,
      fatPerUnit: 0.003,
      fiberPerUnit: 0.026,
      sugarPerUnit: 0.12,
      sodiumPerUnit: 0.0001,
      description: "Banana prata",
    },
    {
      name: "Brócolis",
      categoryId: "4",
      unitId: "1",
      caloriesPerUnit: 0.34,
      proteinPerUnit: 0.028,
      carbsPerUnit: 0.069,
      fatPerUnit: 0.004,
      fiberPerUnit: 0.026,
      sugarPerUnit: 0.017,
      sodiumPerUnit: 0.0033,
      description: "Brócolis cozido",
    },
    {
      name: "Leite desnatado",
      categoryId: "5",
      unitId: "3",
      caloriesPerUnit: 0.34,
      proteinPerUnit: 0.034,
      carbsPerUnit: 0.05,
      fatPerUnit: 0.001,
      fiberPerUnit: 0,
      sugarPerUnit: 0.05,
      sodiumPerUnit: 0.0042,
      description: "Leite desnatado UHT",
    },
  ];

  for (const food of sampleFoods) {
    await prisma.food.create({
      data: food,
    });
  }

  console.log("✅ Sample foods created");

  // Create exercise categories
  const exerciseCategories = await Promise.all([
    prisma.exerciseCategory.upsert({
      where: { id: "1" },
      update: {},
      create: {
        id: "1",
        name: "Força",
        description: "Exercícios de musculação e força",
      },
    }),
    prisma.exerciseCategory.upsert({
      where: { id: "2" },
      update: {},
      create: {
        id: "2",
        name: "Cardio",
        description: "Exercícios cardiovasculares",
      },
    }),
    prisma.exerciseCategory.upsert({
      where: { id: "3" },
      update: {},
      create: {
        id: "3",
        name: "Flexibilidade",
        description: "Alongamentos e flexibilidade",
      },
    }),
    prisma.exerciseCategory.upsert({
      where: { id: "4" },
      update: {},
      create: {
        id: "4",
        name: "Funcional",
        description: "Exercícios funcionais",
      },
    }),
  ]);

  console.log("✅ Exercise categories created");

  // Create muscle groups
  const muscleGroups = await Promise.all([
    prisma.muscleGroup.upsert({
      where: { id: "1" },
      update: {},
      create: {
        id: "1",
        name: "Peito",
        description: "Músculos do peitoral",
      },
    }),
    prisma.muscleGroup.upsert({
      where: { id: "2" },
      update: {},
      create: {
        id: "2",
        name: "Costas",
        description: "Músculos das costas",
      },
    }),
    prisma.muscleGroup.upsert({
      where: { id: "3" },
      update: {},
      create: {
        id: "3",
        name: "Ombros",
        description: "Músculos dos ombros",
      },
    }),
    prisma.muscleGroup.upsert({
      where: { id: "4" },
      update: {},
      create: {
        id: "4",
        name: "Bíceps",
        description: "Músculos do bíceps",
      },
    }),
    prisma.muscleGroup.upsert({
      where: { id: "5" },
      update: {},
      create: {
        id: "5",
        name: "Tríceps",
        description: "Músculos do tríceps",
      },
    }),
    prisma.muscleGroup.upsert({
      where: { id: "6" },
      update: {},
      create: {
        id: "6",
        name: "Abdômen",
        description: "Músculos abdominais",
      },
    }),
    prisma.muscleGroup.upsert({
      where: { id: "7" },
      update: {},
      create: {
        id: "7",
        name: "Pernas",
        description: "Músculos das pernas",
      },
    }),
    prisma.muscleGroup.upsert({
      where: { id: "8" },
      update: {},
      create: {
        id: "8",
        name: "Glúteos",
        description: "Músculos dos glúteos",
      },
    }),
  ]);

  console.log("✅ Muscle groups created");

  // Create sample exercises
  const sampleExercises = [
    {
      name: "Supino reto",
      categoryId: "1",
      description: "Supino reto com barra",
      muscleGroupIds: ["1", "3", "5"],
    },
    {
      name: "Puxada frontal",
      categoryId: "1",
      description: "Puxada frontal no pulley",
      muscleGroupIds: ["2", "4"],
    },
    {
      name: "Agachamento",
      categoryId: "1",
      description: "Agachamento livre",
      muscleGroupIds: ["7", "8"],
    },
    {
      name: "Corrida",
      categoryId: "2",
      description: "Corrida na esteira ou ao ar livre",
      muscleGroupIds: ["7"],
    },
    {
      name: "Prancha",
      categoryId: "1",
      description: "Prancha isométrica",
      muscleGroupIds: ["6"],
    },
  ];

  for (const exercise of sampleExercises) {
    const { muscleGroupIds, ...exerciseData } = exercise;

    await prisma.exercise.create({
      data: {
        ...exerciseData,
        muscleGroups: {
          create: muscleGroupIds.map((muscleGroupId: string) => ({
            muscleGroupId,
          })),
        },
      },
    });
  }

  console.log("✅ Sample exercises created");

  console.log("🎉 Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
