#!/usr/bin/env node

/**
 * Script para migrar do SQLite para Supabase PostgreSQL
 * Execute: node scripts/migrate-to-supabase.js
 */

const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

// Configuração do SQLite (atual)
const sqlitePrisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./dev.db",
    },
  },
});

// Configuração do Supabase (novo)
const supabasePrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function migrateData() {
  console.log("🚀 Iniciando migração para Supabase...");

  try {
    // 1. Migrar Food Categories
    console.log("📂 Migrando categorias de alimentos...");
    const foodCategories = await sqlitePrisma.foodCategory.findMany();
    for (const category of foodCategories) {
      await supabasePrisma.foodCategory.upsert({
        where: { id: category.id },
        update: {},
        create: category,
      });
    }

    // 2. Migrar Food Units
    console.log("📏 Migrando unidades de alimentos...");
    const foodUnits = await sqlitePrisma.foodUnit.findMany();
    for (const unit of foodUnits) {
      await supabasePrisma.foodUnit.upsert({
        where: { id: unit.id },
        update: {},
        create: unit,
      });
    }

    // 3. Migrar Foods
    console.log("🍎 Migrando alimentos...");
    const foods = await sqlitePrisma.food.findMany();
    for (const food of foods) {
      await supabasePrisma.food.upsert({
        where: { id: food.id },
        update: {},
        create: food,
      });
    }

    // 4. Migrar Exercise Categories
    console.log("💪 Migrando categorias de exercícios...");
    const exerciseCategories = await sqlitePrisma.exerciseCategory.findMany();
    for (const category of exerciseCategories) {
      await supabasePrisma.exerciseCategory.upsert({
        where: { id: category.id },
        update: {},
        create: category,
      });
    }

    // 5. Migrar Muscle Groups
    console.log("🏋️ Migrando grupos musculares...");
    const muscleGroups = await sqlitePrisma.muscleGroup.findMany();
    for (const group of muscleGroups) {
      await supabasePrisma.muscleGroup.upsert({
        where: { id: group.id },
        update: {},
        create: group,
      });
    }

    // 6. Migrar Exercises
    console.log("🏃 Migrando exercícios...");
    const exercises = await sqlitePrisma.exercise.findMany({
      include: {
        muscleGroups: {
          include: {
            muscleGroup: true,
          },
        },
      },
    });

    for (const exercise of exercises) {
      const { muscleGroups, ...exerciseData } = exercise;

      await supabasePrisma.exercise.upsert({
        where: { id: exercise.id },
        update: {},
        create: {
          ...exerciseData,
          muscleGroups: {
            create: muscleGroups.map((mg) => ({
              muscleGroupId: mg.muscleGroupId,
            })),
          },
        },
      });
    }

    console.log("✅ Migração concluída com sucesso!");
    console.log(`📊 Dados migrados:`);
    console.log(`   - ${foodCategories.length} categorias de alimentos`);
    console.log(`   - ${foodUnits.length} unidades de alimentos`);
    console.log(`   - ${foods.length} alimentos`);
    console.log(`   - ${exerciseCategories.length} categorias de exercícios`);
    console.log(`   - ${muscleGroups.length} grupos musculares`);
    console.log(`   - ${exercises.length} exercícios`);
  } catch (error) {
    console.error("❌ Erro durante a migração:", error);
  } finally {
    await sqlitePrisma.$disconnect();
    await supabasePrisma.$disconnect();
  }
}

// Verificar se DATABASE_URL está configurada
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL não configurada!");
  console.log(
    "Configure a variável de ambiente DATABASE_URL com a URL do Supabase"
  );
  process.exit(1);
}

migrateData();
