import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import { EnhancedFoodService } from "../services/EnhancedFoodService";
import { isApiAvailable } from "../config/api";
import type { Food } from "../types/Food";

interface EnhancedFoodSelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function EnhancedFoodSelector({
  value,
  onChange,
  placeholder = "Ex: Arroz",
  className = "",
}: EnhancedFoodSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [foods, setFoods] = useState<
    (Food & {
      isFromApi?: boolean;
      brand?: string;
      image?: string;
      originalQuery?: string;
      translatedQuery?: string;
      apiProductName?: string;
    })[]
  >([]);
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [useApi, setUseApi] = useState(true);
  const [customFoodName, setCustomFoodName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [customCalories, setCustomCalories] = useState("");
  const [customProtein, setCustomProtein] = useState("");
  const [customCarbs, setCustomCarbs] = useState("");
  const [customFat, setCustomFat] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load foods, categories and units on component mount
  useEffect(() => {
    const loadData = async () => {
      const [foods, categoriesData, unitsData] = await Promise.all([
        EnhancedFoodService.getAllFoods(),
        EnhancedFoodService.getAllCategories(),
        EnhancedFoodService.getAllUnits(),
      ]);
      setFoods(foods);
      setCategories(categoriesData);
      setUnits(unitsData);
    };
    loadData();
  }, []);

  // Search foods with debouncing
  useEffect(() => {
    if (searchQuery.length < 2) {
      const loadFoods = async () => {
        const foods = await EnhancedFoodService.getAllFoods();
        setFoods(foods);
      };
      loadFoods();
      return;
    }

    const searchFoods = async () => {
      setIsLoading(true);
      try {
        const results = await EnhancedFoodService.searchFoods(
          searchQuery,
          useApi && isApiAvailable("food")
        );
        setFoods(results);
      } catch (error) {
        console.error("Error searching foods:", error);
        const foods = await EnhancedFoodService.getAllFoods();
        setFoods(foods);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchFoods, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, useApi]);

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
  const handleFoodSelect = async (
    food: Food & {
      isFromApi?: boolean;
      brand?: string;
      image?: string;
      originalQuery?: string;
      translatedQuery?: string;
      apiProductName?: string;
    }
  ) => {
    // If it's from API and not already in local database, save it
    if (food.isFromApi) {
      const savedFood = await EnhancedFoodService.saveSelectedFood(food);
      if (savedFood) {
        onChange(savedFood.name);
        setSearchQuery(savedFood.name);
      } else {
        onChange(food.name);
        setSearchQuery(food.name);
      }
    } else {
      onChange(food.name);
      setSearchQuery(food.name);
    }
    setIsOpen(false);
  };

  // Handle custom food creation
  const handleAddCustomFood = async () => {
    if (
      customFoodName.trim() &&
      selectedCategory &&
      selectedUnit &&
      customCalories
    ) {
      const newFood = await EnhancedFoodService.addFood({
        name: customFoodName.trim(),
        category: selectedCategory,
        unit: units.find((u) => u.id === selectedUnit)?.abbreviation || "g",
        caloriesPerUnit: parseFloat(customCalories),
        proteinPerUnit: parseFloat(customProtein) || 0,
        carbsPerUnit: parseFloat(customCarbs) || 0,
        fatPerUnit: parseFloat(customFat) || 0,
        description: `Alimento personalizado: ${customFoodName.trim()}`,
        isCustom: true,
      });

      if (newFood) {
        const foods = await EnhancedFoodService.getAllFoods();
        setFoods(foods);
        onChange(newFood.name);
        setSearchQuery(newFood.name);
      }
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
      <div className="relative">
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
          className="w-full p-1 focus:outline-none text-[#111111] pr-20"
        />
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
          <button
            onClick={() => setUseApi(!useApi)}
            className={`p-1 ${
              useApi ? "text-blue-600" : "text-gray-400"
            } hover:text-blue-600`}
            title={useApi ? "API ativada" : "API desativada"}
          >
            <FontAwesomeIcon icon={faSearch} size="sm" />
          </button>
        </div>
      </div>

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
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                    <div className="mt-2">Buscando alimentos...</div>
                  </div>
                ) : foods.length > 0 ? (
                  foods.map((food) => (
                    <div
                      key={food.id}
                      onClick={() => handleFoodSelect(food)}
                      className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {food.name}
                            {food.isFromApi && (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-1 rounded">
                                Adicionado da API
                              </span>
                            )}
                            {food.originalQuery &&
                              food.translatedQuery &&
                              food.originalQuery !== food.translatedQuery && (
                                <div className="text-xs text-blue-600 mt-1">
                                  <strong>Tradução:</strong> "
                                  {food.originalQuery}" → "
                                  {food.translatedQuery}"
                                </div>
                              )}
                            {food.apiProductName &&
                              food.apiProductName !== food.name && (
                                <div className="text-xs text-gray-500 mt-1">
                                  <strong>Nome original:</strong>{" "}
                                  {food.apiProductName}
                                </div>
                              )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {food.category} • {food.unit}
                            {food.brand && ` • ${food.brand}`}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {food.caloriesPerUnit.toFixed(2)} kcal •{" "}
                            {food.proteinPerUnit.toFixed(2)}g prot •{" "}
                            {food.carbsPerUnit.toFixed(2)}g carb •{" "}
                            {food.fatPerUnit.toFixed(2)}g gord
                          </div>
                        </div>
                        {food.image && (
                          <img
                            src={food.image}
                            alt={food.name}
                            className="w-12 h-12 object-cover rounded ml-2"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        )}
                      </div>
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
                      {categories.map((category) => (
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
                      {units.map((unit) => (
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
