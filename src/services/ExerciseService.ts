import type {
  Exercise,
  ExerciseCategory,
  MuscleGroup,
} from "../types/Exercise";

class ExerciseService {
  private exercises: Exercise[] = [];
  private categories: ExerciseCategory[] = [];
  private muscleGroups: MuscleGroup[] = [];

  constructor() {
    this.initializeData();
    this.loadFromLocalStorage();
  }

  private initializeData() {
    // Initialize categories
    this.categories = [
      { id: "1", name: "Peito", description: "Exercícios para o peitoral" },
      { id: "2", name: "Costas", description: "Exercícios para as costas" },
      { id: "3", name: "Pernas", description: "Exercícios para as pernas" },
      { id: "4", name: "Braços", description: "Exercícios para os braços" },
      { id: "5", name: "Ombros", description: "Exercícios para os ombros" },
      { id: "6", name: "Core", description: "Exercícios para o core/abdômen" },
      { id: "7", name: "Cardio", description: "Exercícios cardiovasculares" },
    ];

    // Initialize muscle groups
    this.muscleGroups = [
      {
        id: "1",
        name: "Peitoral Maior",
        description: "Músculo principal do peito",
      },
      {
        id: "2",
        name: "Peitoral Menor",
        description: "Músculo menor do peito",
      },
      {
        id: "3",
        name: "Deltóide Anterior",
        description: "Parte frontal do ombro",
      },
      {
        id: "4",
        name: "Deltóide Médio",
        description: "Parte lateral do ombro",
      },
      {
        id: "5",
        name: "Deltóide Posterior",
        description: "Parte traseira do ombro",
      },
      { id: "6", name: "Bíceps", description: "Músculo frontal do braço" },
      { id: "7", name: "Tríceps", description: "Músculo traseiro do braço" },
      {
        id: "8",
        name: "Latíssimo do Dorso",
        description: "Músculo principal das costas",
      },
      { id: "9", name: "Trapézio", description: "Músculo superior das costas" },
      { id: "10", name: "Quadríceps", description: "Músculo frontal da coxa" },
      {
        id: "11",
        name: "Isquiotibiais",
        description: "Músculo traseiro da coxa",
      },
      { id: "12", name: "Glúteos", description: "Músculos do bumbum" },
      {
        id: "13",
        name: "Panturrilha",
        description: "Músculo da batata da perna",
      },
      { id: "14", name: "Abdômen", description: "Músculos abdominais" },
      {
        id: "15",
        name: "Oblíquos",
        description: "Músculos laterais do abdômen",
      },
    ];

    // Initialize sample exercises
    this.exercises = [
      {
        id: "1",
        name: "Supino Reto",
        category: "1",
        muscleGroups: ["1", "3"],
        description: "Exercício básico para desenvolvimento do peitoral",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Supino Inclinado",
        category: "1",
        muscleGroups: ["1", "3"],
        description:
          "Supino com banco inclinado para trabalhar a parte superior do peito",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "3",
        name: "Supino Declinado",
        category: "1",
        muscleGroups: ["1", "3"],
        description:
          "Supino com banco declinado para trabalhar a parte inferior do peito",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "4",
        name: "Puxada Frontal",
        category: "2",
        muscleGroups: ["8", "9"],
        description: "Exercício para desenvolvimento das costas",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "5",
        name: "Remada Curvada",
        category: "2",
        muscleGroups: ["8", "9"],
        description: "Exercício de remada para fortalecimento das costas",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "6",
        name: "Agachamento",
        category: "3",
        muscleGroups: ["10", "11", "12"],
        description: "Exercício fundamental para as pernas",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "7",
        name: "Leg Press",
        category: "3",
        muscleGroups: ["10", "11", "12"],
        description: "Exercício para pernas na máquina",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "8",
        name: "Rosca Bíceps",
        category: "4",
        muscleGroups: ["6"],
        description: "Exercício para desenvolvimento do bíceps",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "9",
        name: "Tríceps Pulley",
        category: "4",
        muscleGroups: ["7"],
        description: "Exercício para desenvolvimento do tríceps",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "10",
        name: "Desenvolvimento",
        category: "5",
        muscleGroups: ["3", "4", "5"],
        description: "Exercício para desenvolvimento dos ombros",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "11",
        name: "Prancha",
        category: "6",
        muscleGroups: ["14", "15"],
        description: "Exercício isométrico para o core",
        isCustom: false,
        createdAt: new Date(),
      },
      {
        id: "12",
        name: "Corrida",
        category: "7",
        muscleGroups: ["10", "11", "12", "13"],
        description: "Exercício cardiovascular",
        isCustom: false,
        createdAt: new Date(),
      },
    ];
  }

  private loadFromLocalStorage() {
    try {
      const savedExercises = localStorage.getItem("exercises");
      if (savedExercises) {
        const parsed = JSON.parse(savedExercises);
        this.exercises = parsed.map((ex: any) => ({
          ...ex,
          createdAt: new Date(ex.createdAt),
        }));
      }
    } catch (error) {
      console.error("Error loading exercises from localStorage:", error);
    }
  }

  private saveToLocalStorage() {
    try {
      localStorage.setItem("exercises", JSON.stringify(this.exercises));
    } catch (error) {
      console.error("Error saving exercises to localStorage:", error);
    }
  }

  // Exercise CRUD operations
  getAllExercises(): Exercise[] {
    return [...this.exercises];
  }

  getExerciseById(id: string): Exercise | undefined {
    return this.exercises.find((ex) => ex.id === id);
  }

  searchExercises(query: string): Exercise[] {
    const lowerQuery = query.toLowerCase();
    return this.exercises.filter(
      (ex) =>
        ex.name.toLowerCase().includes(lowerQuery) ||
        ex.description?.toLowerCase().includes(lowerQuery) ||
        this.getCategoryName(ex.category).toLowerCase().includes(lowerQuery)
    );
  }

  addExercise(exercise: Omit<Exercise, "id" | "createdAt">): Exercise {
    const newExercise: Exercise = {
      ...exercise,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    this.exercises.push(newExercise);
    this.saveToLocalStorage();
    return newExercise;
  }

  updateExercise(id: string, updates: Partial<Exercise>): Exercise | null {
    const index = this.exercises.findIndex((ex) => ex.id === id);
    if (index === -1) return null;

    this.exercises[index] = { ...this.exercises[index], ...updates };
    this.saveToLocalStorage();
    return this.exercises[index];
  }

  deleteExercise(id: string): boolean {
    const index = this.exercises.findIndex((ex) => ex.id === id);
    if (index === -1) return false;

    this.exercises.splice(index, 1);
    this.saveToLocalStorage();
    return true;
  }

  // Category operations
  getAllCategories(): ExerciseCategory[] {
    return [...this.categories];
  }

  getCategoryById(id: string): ExerciseCategory | undefined {
    return this.categories.find((cat) => cat.id === id);
  }

  getCategoryName(id: string): string {
    const category = this.getCategoryById(id);
    return category?.name || "Categoria não encontrada";
  }

  // Muscle group operations
  getAllMuscleGroups(): MuscleGroup[] {
    return [...this.muscleGroups];
  }

  getMuscleGroupById(id: string): MuscleGroup | undefined {
    return this.muscleGroups.find((mg) => mg.id === id);
  }

  getMuscleGroupNames(ids: string[]): string[] {
    return ids.map((id) => {
      const muscleGroup = this.getMuscleGroupById(id);
      return muscleGroup?.name || "Grupo muscular não encontrado";
    });
  }
}

export const exerciseService = new ExerciseService();
