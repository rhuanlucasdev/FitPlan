import { exerciseService } from "./ExerciseService";
import { ApiService } from "./ApiService";
import type { Exercise } from "../types/Exercise";

export class EnhancedExerciseService {
  // Search exercises using both local database and ExerciseDB API
  static async searchExercises(query: string, useApi: boolean = true) {
    const localResults = exerciseService.searchExercises(query);

    if (!useApi) {
      return localResults;
    }

    try {
      // Search ExerciseDB API
      const apiResults = await ApiService.searchExercises(
        query,
        undefined,
        undefined,
        10
      );

      // Convert API results to our Exercise format
      const apiExercises: Exercise[] = apiResults
        .filter((exercise: any) => exercise.name && exercise.target)
        .map((exercise: any) => {
          return {
            id: `api_${exercise.id}`,
            name: exercise.name,
            category: this.mapBodyPartToCategory(exercise.bodyPart),
            muscleGroups: this.mapTargetToMuscleGroups(exercise.target),
            description: exercise.instructions?.join(" ") || exercise.name,
            isCustom: false,
            createdAt: new Date(),
            isFromApi: true,
            bodyPart: exercise.bodyPart,
            equipment: exercise.equipment,
            gifUrl: exercise.gifUrl,
            secondaryMuscles: exercise.secondaryMuscles || [],
          } as Exercise & {
            isFromApi: boolean;
            bodyPart: string;
            equipment: string;
            gifUrl: string;
            secondaryMuscles: string[];
          };
        });

      // Combine local and API results, removing duplicates
      const combinedResults = [...localResults];
      apiExercises.forEach((apiExercise) => {
        if (
          !localResults.some(
            (local) =>
              local.name.toLowerCase() === apiExercise.name.toLowerCase()
          )
        ) {
          combinedResults.push(apiExercise);
        }
      });

      return combinedResults;
    } catch (error) {
      console.error("Error searching exercises with API:", error);
      return localResults;
    }
  }

  // Get exercises by body part using API
  static async getExercisesByBodyPart(
    bodyPart: string,
    useApi: boolean = true
  ) {
    if (!useApi) {
      return exerciseService
        .getAllExercises()
        .filter((ex) =>
          exerciseService
            .getCategoryName(ex.category)
            .toLowerCase()
            .includes(bodyPart.toLowerCase())
        );
    }

    try {
      const apiResults = await ApiService.getExerciseByBodyPart(bodyPart, 20);

      return apiResults.map(
        (exercise: any) =>
          ({
            id: `api_${exercise.id}`,
            name: exercise.name,
            category: this.mapBodyPartToCategory(exercise.bodyPart),
            muscleGroups: this.mapTargetToMuscleGroups(exercise.target),
            description: exercise.instructions?.join(" ") || exercise.name,
            isCustom: false,
            createdAt: new Date(),
            isFromApi: true,
            bodyPart: exercise.bodyPart,
            equipment: exercise.equipment,
            gifUrl: exercise.gifUrl,
            secondaryMuscles: exercise.secondaryMuscles || [],
          } as Exercise & {
            isFromApi: boolean;
            bodyPart: string;
            equipment: string;
            gifUrl: string;
            secondaryMuscles: string[];
          })
      );
    } catch (error) {
      console.error("Error fetching exercises by body part:", error);
      return [];
    }
  }

  // Get exercises by target muscle using API
  static async getExercisesByTarget(target: string, useApi: boolean = true) {
    if (!useApi) {
      return exerciseService
        .getAllExercises()
        .filter((ex) =>
          exerciseService
            .getMuscleGroupNames(ex.muscleGroups)
            .some((mg) => mg.toLowerCase().includes(target.toLowerCase()))
        );
    }

    try {
      const apiResults = await ApiService.getExerciseByTarget(target, 20);

      return apiResults.map(
        (exercise: any) =>
          ({
            id: `api_${exercise.id}`,
            name: exercise.name,
            category: this.mapBodyPartToCategory(exercise.bodyPart),
            muscleGroups: this.mapTargetToMuscleGroups(exercise.target),
            description: exercise.instructions?.join(" ") || exercise.name,
            isCustom: false,
            createdAt: new Date(),
            isFromApi: true,
            bodyPart: exercise.bodyPart,
            equipment: exercise.equipment,
            gifUrl: exercise.gifUrl,
            secondaryMuscles: exercise.secondaryMuscles || [],
          } as Exercise & {
            isFromApi: boolean;
            bodyPart: string;
            equipment: string;
            gifUrl: string;
            secondaryMuscles: string[];
          })
      );
    } catch (error) {
      console.error("Error fetching exercises by target:", error);
      return [];
    }
  }

  // Get available body parts from API
  static async getBodyParts() {
    try {
      return await ApiService.getBodyParts();
    } catch (error) {
      console.error("Error fetching body parts:", error);
      return [];
    }
  }

  // Get available target muscles from API
  static async getTargetMuscles() {
    try {
      return await ApiService.getTargetMuscles();
    } catch (error) {
      console.error("Error fetching target muscles:", error);
      return [];
    }
  }

  // Get available equipment from API
  static async getEquipment() {
    try {
      return await ApiService.getEquipment();
    } catch (error) {
      console.error("Error fetching equipment:", error);
      return [];
    }
  }

  // Map API body part to our category
  private static mapBodyPartToCategory(bodyPart: string): string {
    const categoryMap: { [key: string]: string } = {
      chest: "1", // Peito
      back: "2", // Costas
      "upper legs": "3", // Pernas
      "lower legs": "3", // Pernas
      "upper arms": "4", // Braços
      "lower arms": "4", // Braços
      shoulders: "5", // Ombros
      waist: "6", // Core
      neck: "5", // Ombros
    };

    const lowerBodyPart = bodyPart.toLowerCase();
    for (const [key, value] of Object.entries(categoryMap)) {
      if (lowerBodyPart.includes(key)) {
        return value;
      }
    }

    return "4"; // Default to Braços
  }

  // Map API target muscle to our muscle groups
  private static mapTargetToMuscleGroups(target: string): string[] {
    const muscleMap: { [key: string]: string[] } = {
      pectorals: ["1"], // Peitoral Maior
      "anterior deltoid": ["3"], // Deltóide Anterior
      biceps: ["6"], // Bíceps
      triceps: ["7"], // Tríceps
      lats: ["8"], // Latíssimo do Dorso
      traps: ["9"], // Trapézio
      quadriceps: ["10"], // Quadríceps
      hamstrings: ["11"], // Isquiotibiais
      glutes: ["12"], // Glúteos
      calves: ["13"], // Panturrilha
      abs: ["14"], // Abdômen
      obliques: ["15"], // Oblíquos
      delts: ["3", "4", "5"], // Deltóides
    };

    const lowerTarget = target.toLowerCase();
    for (const [key, value] of Object.entries(muscleMap)) {
      if (lowerTarget.includes(key)) {
        return value;
      }
    }

    return ["6"]; // Default to Bíceps
  }

  // Get all exercises (local only)
  static getAllExercises() {
    return exerciseService.getAllExercises();
  }

  // Add exercise to local database
  static addExercise(exercise: Omit<Exercise, "id" | "createdAt">) {
    return exerciseService.addExercise(exercise);
  }

  // Get categories
  static getAllCategories() {
    return exerciseService.getAllCategories();
  }

  // Get muscle groups
  static getAllMuscleGroups() {
    return exerciseService.getAllMuscleGroups();
  }
}
