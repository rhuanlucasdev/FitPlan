import { useState } from "react";
import { TranslationService } from "../services/TranslationService";
import { EnhancedFoodService } from "../services/EnhancedFoodService";

export default function TranslationDemo() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const foods = await EnhancedFoodService.searchFoods(searchQuery, true);
      setResults(foods);
    } catch (error) {
      console.error("Error searching foods:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Demo de Tradução de Alimentos</h2>

      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite um alimento em português (ex: arroz branco, frango, banana)"
            className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? "Buscando..." : "Buscar"}
          </button>
        </div>

        <div className="mt-2 text-sm text-gray-600">
          <strong>Tradução:</strong> "{searchQuery}" → "
          {TranslationService.translateFoodName(searchQuery)}"
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <div className="mt-2">Buscando alimentos...</div>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Resultados encontrados:</h3>
          {results.map((food, index) => (
            <div
              key={food.id || index}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {food.name}
                    {food.isFromApi && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        API
                      </span>
                    )}
                    {food.isCustom && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Personalizado
                      </span>
                    )}
                  </div>

                  {food.originalQuery &&
                    food.translatedQuery &&
                    food.originalQuery !== food.translatedQuery && (
                      <div className="text-sm text-blue-600 mt-1">
                        <strong>Tradução:</strong> "{food.originalQuery}" → "
                        {food.translatedQuery}"
                      </div>
                    )}

                  <div className="text-sm text-gray-500 mt-1">
                    {food.brand && `${food.brand} • `}
                    {food.unit} • {food.caloriesPerUnit} kcal
                  </div>

                  <div className="text-xs text-gray-400 mt-1">
                    {food.proteinPerUnit}g prot • {food.carbsPerUnit}g carb •{" "}
                    {food.fatPerUnit}g gord
                  </div>
                </div>

                {food.image && (
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-16 h-16 object-cover rounded ml-4"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && results.length === 0 && searchQuery && (
        <div className="text-center py-8 text-gray-500">
          Nenhum alimento encontrado para "{searchQuery}"
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Exemplos de traduções:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          <div>arroz branco → white rice</div>
          <div>frango → chicken</div>
          <div>banana → banana</div>
          <div>batata doce → sweet potato</div>
          <div>queijo minas → minas cheese</div>
          <div>leite integral → whole milk</div>
        </div>
      </div>
    </div>
  );
}
