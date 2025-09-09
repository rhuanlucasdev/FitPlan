import { useState, useEffect } from "react";
import { foodService } from "../services/FoodService";
import { EnhancedFoodService } from "../services/EnhancedFoodService";
import { TranslationService } from "../services/TranslationService";
import type { Food } from "../types/Food";

export default function DatabaseGrowthDemo() {
  const [localFoods, setLocalFoods] = useState<
    (Food & { isFromApi?: boolean; image?: string })[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    (Food & { isFromApi?: boolean; image?: string })[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [lastAddedFoods, setLastAddedFoods] = useState<string[]>([]);

  // Load local foods on component mount
  useEffect(() => {
    setLocalFoods(foodService.getAllFoods());
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      console.log(`Starting search for: "${searchQuery}"`);
      const results = await EnhancedFoodService.searchFoods(searchQuery, true);
      console.log(`Search results:`, results);
      setSearchResults(results);

      // Add to search history
      setSearchHistory((prev) => [searchQuery, ...prev.slice(0, 4)]);

      // Refresh local foods to show newly added items
      const updatedFoods = foodService.getAllFoods();
      console.log(`Updated local foods count:`, updatedFoods.length);
      setLocalFoods(updatedFoods);

      // Note: API results are NOT automatically added to database anymore
      // They will only be added when user clicks on a specific food in the selector
      console.log("API results found, but not automatically saved to database");
      console.log(
        "User must click on a specific food in the selector to save it"
      );
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

  const clearDatabase = () => {
    // Clear localStorage and reload
    localStorage.removeItem("foods");
    setLocalFoods([]);
    setSearchResults([]);
    setSearchHistory([]);
    setLastAddedFoods([]);
  };

  const getDatabaseStats = () => {
    const total = localFoods.length;
    const fromApi = localFoods.filter((f) => f.isFromApi).length;
    const custom = localFoods.filter((f) => f.isCustom).length;
    const original = total - fromApi - custom;

    return { total, fromApi, custom, original };
  };

  const stats = getDatabaseStats();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Crescimento da Base de Dados</h2>

      {/* Database Statistics */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">
          Estatísticas da Base de Dados
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.original}
            </div>
            <div className="text-sm text-gray-600">Originais</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.fromApi}
            </div>
            <div className="text-sm text-gray-600">Da API</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {stats.custom}
            </div>
            <div className="text-sm text-gray-600">Personalizados</div>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={clearDatabase}
            className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
          >
            Limpar Base de Dados
          </button>
          <button
            onClick={() => {
              setSearchQuery("arroz branco");
              handleSearch();
            }}
            className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
          >
            Testar: Arroz Branco
          </button>
          <button
            onClick={() => {
              const foods = foodService.getAllFoods();
              setLocalFoods(foods);
              console.log("Current database count:", foods.length);
              alert(`Base de dados atual: ${foods.length} alimentos`);
            }}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
          >
            Verificar DB
          </button>
        </div>
      </div>

      {/* Search Interface */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">
          Teste de Busca e Adição Automática
        </h3>
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

        {searchQuery && (
          <div className="mt-2 text-sm text-gray-600">
            <strong>Tradução:</strong> "{searchQuery}" → "
            {TranslationService.translateFoodName(searchQuery)}"
          </div>
        )}
      </div>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Histórico de Buscas</h3>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((query, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(query)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <div className="mt-2">Buscando alimentos na API...</div>
          <div className="mt-1 text-sm text-gray-500">
            Traduzindo "{searchQuery}" → "
            {TranslationService.translateFoodName(searchQuery)}"
          </div>
        </div>
      )}

      {/* Show what was just added to database */}
      {lastAddedFoods.length > 0 && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-lg mb-2 text-green-800">
            ✅ Alimentos Adicionados à Base de Dados:
          </h3>
          <div className="flex flex-wrap gap-2">
            {lastAddedFoods.map((foodName, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {foodName}
              </span>
            ))}
          </div>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Resultados da Busca</h3>
          <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>ℹ️ Nota:</strong> Os resultados da API são mostrados aqui,
              mas só serão adicionados à base de dados quando você clicar em um
              alimento específico no seletor de alimentos.
            </p>
          </div>
          <div className="space-y-2">
            {searchResults.map((food, index) => (
              <div
                key={`search-${food.id}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div className="flex-1">
                  <div className="font-medium">
                    {food.name}
                    {food.isFromApi && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Adicionado da API
                      </span>
                    )}
                    {food.isCustom && (
                      <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                        Personalizado
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {food.caloriesPerUnit} kcal • {food.proteinPerUnit}g prot •{" "}
                    {food.carbsPerUnit}g carb • {food.fatPerUnit}g gord
                  </div>
                </div>
                {food.image && (
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-12 h-12 object-cover rounded ml-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Additions */}
      {lastAddedFoods.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">
            Últimos Alimentos Adicionados
          </h3>
          <div className="grid gap-2">
            {lastAddedFoods.map((foodName, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded"
              >
                <div className="font-medium text-green-800">{foodName}</div>
                <div className="text-xs text-green-600">Adicionado agora</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Local Database */}
      <div>
        <h3 className="font-semibold text-lg mb-3">Base de Dados Local</h3>
        <div className="grid gap-2 max-h-96 overflow-y-auto">
          {localFoods.map((food, index) => (
            <div
              key={`${food.id}-${index}`}
              className="flex items-center justify-between p-2 border border-gray-200 rounded"
            >
              <div className="flex-1">
                <div className="font-medium text-sm">
                  {food.name}
                  {food.isFromApi && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-1 rounded">
                      API
                    </span>
                  )}
                  {food.isCustom && (
                    <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-1 rounded">
                      Custom
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {food.caloriesPerUnit} kcal • {food.unit}
                </div>
              </div>
              <div className="text-xs text-gray-400">
                {new Date(food.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Como Funciona:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
          <li>
            <strong>Busca Local:</strong> Primeiro verifica se o alimento já
            existe na base local
          </li>
          <li>
            <strong>Tradução:</strong> Se não encontrar, traduz o termo
            português para inglês
          </li>
          <li>
            <strong>Busca na API:</strong> Consulta a API Open Food Facts com o
            termo em inglês
          </li>
          <li>
            <strong>Seleção Manual:</strong> O usuário deve clicar em um
            alimento específico para adicioná-lo à base local
          </li>
          <li>
            <strong>Persistência:</strong> Os dados ficam salvos no localStorage
            para uso futuro
          </li>
        </ol>
      </div>
    </div>
  );
}
