export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroups: string[];
  description?: string;
  isCustom: boolean;
  createdAt: Date;
}

export interface ExerciseCategory {
  id: string;
  name: string;
  description?: string;
}

export interface MuscleGroup {
  id: string;
  name: string;
  description?: string;
}
