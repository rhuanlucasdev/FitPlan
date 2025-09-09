import { useState, useEffect } from "react";
import { exerciseService } from "../services/ExerciseService";
import type { Exercise } from "../types/Exercise";

export default function ExerciseDatabaseDemo() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setExercises(exerciseService.getAllExercises());
  }, []);

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Base de Dados de Exercícios</h2>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar exercícios
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Digite o nome do exercício..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por categoria
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas as categorias</option>
            {exerciseService.getAllCategories().map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Exercise List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-gray-900">
                {exercise.name}
              </h3>
              {exercise.isCustom && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  Personalizado
                </span>
              )}
            </div>

            <div className="text-sm text-gray-600 mb-2">
              <strong>Categoria:</strong>{" "}
              {exerciseService.getCategoryName(exercise.category)}
            </div>

            {exercise.muscleGroups.length > 0 && (
              <div className="text-sm text-gray-600 mb-2">
                <strong>Grupos musculares:</strong>{" "}
                {exerciseService
                  .getMuscleGroupNames(exercise.muscleGroups)
                  .join(", ")}
              </div>
            )}

            {exercise.description && (
              <div className="text-sm text-gray-500">
                {exercise.description}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhum exercício encontrado com os filtros aplicados.
        </div>
      )}

      {/* Statistics */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">
          Estatísticas da Base de Dados
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium">Total de exercícios:</span>{" "}
            {exercises.length}
          </div>
          <div>
            <span className="font-medium">Exercícios personalizados:</span>{" "}
            {exercises.filter((e) => e.isCustom).length}
          </div>
          <div>
            <span className="font-medium">Categorias:</span>{" "}
            {exerciseService.getAllCategories().length}
          </div>
          <div>
            <span className="font-medium">Grupos musculares:</span>{" "}
            {exerciseService.getAllMuscleGroups().length}
          </div>
        </div>
      </div>
    </div>
  );
}
