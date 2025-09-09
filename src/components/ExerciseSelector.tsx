import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { exerciseService } from "../services/ExerciseService";
import type { Exercise } from "../types/Exercise";

interface ExerciseSelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function ExerciseSelector({
  value,
  onChange,
  placeholder = "Ex: Supino",
  className = "",
}: ExerciseSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customExerciseName, setCustomExerciseName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>(
    []
  );
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load exercises on component mount
  useEffect(() => {
    setExercises(exerciseService.getAllExercises());
  }, []);

  // Filter exercises based on search query
  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exerciseService
        .getCategoryName(exercise.category)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // Calculate dropdown position
  const updateDropdownPosition = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
    onChange(inputValue);

    if (inputValue.length > 0) {
      updateDropdownPosition();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // Handle exercise selection
  const handleExerciseSelect = (exercise: Exercise) => {
    onChange(exercise.name);
    setSearchQuery(exercise.name);
    setIsOpen(false);
  };

  // Handle custom exercise creation
  const handleAddCustomExercise = () => {
    if (customExerciseName.trim() && selectedCategory) {
      const newExercise = exerciseService.addExercise({
        name: customExerciseName.trim(),
        category: selectedCategory,
        muscleGroups: selectedMuscleGroups,
        description: `Exercício personalizado: ${customExerciseName.trim()}`,
        isCustom: true,
      });

      setExercises(exerciseService.getAllExercises());
      onChange(newExercise.name);
      setSearchQuery(newExercise.name);
      setShowAddCustom(false);
      setCustomExerciseName("");
      setSelectedCategory("");
      setSelectedMuscleGroups([]);
      setIsOpen(false);
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowAddCustom(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle muscle group selection
  const handleMuscleGroupToggle = (muscleGroupId: string) => {
    setSelectedMuscleGroups((prev) =>
      prev.includes(muscleGroupId)
        ? prev.filter((id) => id !== muscleGroupId)
        : [...prev, muscleGroupId]
    );
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <input
        ref={inputRef}
        type="text"
        value={searchQuery || value}
        onChange={handleInputChange}
        onFocus={() => {
          if (searchQuery.length > 0 || exercises.length > 0) {
            updateDropdownPosition();
            setIsOpen(true);
          }
        }}
        placeholder={placeholder}
        className="w-full p-1 focus:outline-none text-[#111111]"
      />

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-[9999] bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
            }}
          >
            {!showAddCustom ? (
              <>
                {/* Exercise list */}
                {filteredExercises.length > 0 ? (
                  filteredExercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      onClick={() => handleExerciseSelect(exercise)}
                      className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900">
                        {exercise.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {exerciseService.getCategoryName(exercise.category)}
                        {exercise.muscleGroups.length > 0 && (
                          <span className="ml-2">
                            •{" "}
                            {exerciseService
                              .getMuscleGroupNames(exercise.muscleGroups)
                              .join(", ")}
                          </span>
                        )}
                      </div>
                      {exercise.description && (
                        <div className="text-xs text-gray-400 mt-1">
                          {exercise.description}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    Nenhum exercício encontrado
                  </div>
                )}

                {/* Add custom exercise button */}
                <div className="border-t border-gray-200">
                  <button
                    onClick={() => setShowAddCustom(true)}
                    className="w-full p-2 text-left hover:bg-gray-100 text-blue-600 flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Adicionar exercício personalizado
                  </button>
                </div>
              </>
            ) : (
              /* Custom exercise form */
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">
                    Adicionar Exercício
                  </h3>
                  <button
                    onClick={() => setShowAddCustom(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do exercício
                  </label>
                  <input
                    type="text"
                    value={customExerciseName}
                    onChange={(e) => setCustomExerciseName(e.target.value)}
                    placeholder="Digite o nome do exercício"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione uma categoria</option>
                    {exerciseService.getAllCategories().map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grupos musculares (opcional)
                  </label>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {exerciseService.getAllMuscleGroups().map((muscleGroup) => (
                      <label
                        key={muscleGroup.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedMuscleGroups.includes(
                            muscleGroup.id
                          )}
                          onChange={() =>
                            handleMuscleGroupToggle(muscleGroup.id)
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {muscleGroup.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleAddCustomExercise}
                    disabled={!customExerciseName.trim() || !selectedCategory}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Adicionar
                  </button>
                  <button
                    onClick={() => setShowAddCustom(false)}
                    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}
