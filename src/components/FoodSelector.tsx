import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { foodService } from "../services/FoodService";
import type { Food } from "../types/Food";

interface FoodSelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function FoodSelector({
  value,
  onChange,
  placeholder = "Ex: Arroz",
  className = "",
}: FoodSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [foods, setFoods] = useState<Food[]>([]);
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customFoodName, setCustomFoodName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [customCalories, setCustomCalories] = useState("");
  const [customProtein, setCustomProtein] = useState("");
  const [customCarbs, setCustomCarbs] = useState("");
  const [customFat, setCustomFat] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load foods on component mount
  useEffect(() => {
    setFoods(foodService.getAllFoods());
  }, []);

  // Filter foods based on search query
  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      foodService
        .getCategoryName(food.category)
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

  // Handle food selection
  const handleFoodSelect = (food: Food) => {
    onChange(food.name);
    setSearchQuery(food.name);
    setIsOpen(false);
  };

  // Handle custom food creation
  const handleAddCustomFood = () => {
    if (
      customFoodName.trim() &&
      selectedCategory &&
      selectedUnit &&
      customCalories
    ) {
      const newFood = foodService.addFood({
        name: customFoodName.trim(),
        category: selectedCategory,
        unit: foodService.getUnitAbbreviation(selectedUnit),
        caloriesPerUnit: parseFloat(customCalories),
        proteinPerUnit: parseFloat(customProtein) || 0,
        carbsPerUnit: parseFloat(customCarbs) || 0,
        fatPerUnit: parseFloat(customFat) || 0,
        description: `Alimento personalizado: ${customFoodName.trim()}`,
        isCustom: true,
      });

      setFoods(foodService.getAllFoods());
      onChange(newFood.name);
      setSearchQuery(newFood.name);
      setShowAddCustom(false);
      setCustomFoodName("");
      setSelectedCategory("");
      setSelectedUnit("");
      setCustomCalories("");
      setCustomProtein("");
      setCustomCarbs("");
      setCustomFat("");
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

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <input
        ref={inputRef}
        type="text"
        value={searchQuery || value}
        onChange={handleInputChange}
        onFocus={() => {
          if (searchQuery.length > 0 || foods.length > 0) {
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
                {/* Food list */}
                {filteredFoods.length > 0 ? (
                  filteredFoods.map((food) => (
                    <div
                      key={food.id}
                      onClick={() => handleFoodSelect(food)}
                      className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900">
                        {food.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {foodService.getCategoryName(food.category)} •{" "}
                        {food.unit}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {food.caloriesPerUnit} kcal • {food.proteinPerUnit}g
                        prot • {food.carbsPerUnit}g carb • {food.fatPerUnit}g
                        gord
                      </div>
                      {food.description && (
                        <div className="text-xs text-gray-400 mt-1">
                          {food.description}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    Nenhum alimento encontrado
                  </div>
                )}

                {/* Add custom food button */}
                <div className="border-t border-gray-200">
                  <button
                    onClick={() => setShowAddCustom(true)}
                    className="w-full p-2 text-left hover:bg-gray-100 text-blue-600 flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Adicionar alimento personalizado
                  </button>
                </div>
              </>
            ) : (
              /* Custom food form */
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">
                    Adicionar Alimento
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
                    Nome do alimento
                  </label>
                  <input
                    type="text"
                    value={customFoodName}
                    onChange={(e) => setCustomFoodName(e.target.value)}
                    placeholder="Digite o nome do alimento"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoria
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione</option>
                      {foodService.getAllCategories().map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unidade
                    </label>
                    <select
                      value={selectedUnit}
                      onChange={(e) => setSelectedUnit(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione</option>
                      {foodService.getAllUnits().map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name} ({unit.abbreviation})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Calorias por unidade
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={customCalories}
                      onChange={(e) => setCustomCalories(e.target.value)}
                      placeholder="Ex: 1.3"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Proteína (g)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={customProtein}
                      onChange={(e) => setCustomProtein(e.target.value)}
                      placeholder="Ex: 0.03"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Carboidrato (g)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={customCarbs}
                      onChange={(e) => setCustomCarbs(e.target.value)}
                      placeholder="Ex: 0.28"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gordura (g)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={customFat}
                      onChange={(e) => setCustomFat(e.target.value)}
                      placeholder="Ex: 0.003"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleAddCustomFood}
                    disabled={
                      !customFoodName.trim() ||
                      !selectedCategory ||
                      !selectedUnit ||
                      !customCalories
                    }
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
