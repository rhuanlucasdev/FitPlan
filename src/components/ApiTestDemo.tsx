import { useState } from "react";
import { TranslationService } from "../services/TranslationService";
import { EnhancedFoodService } from "../services/EnhancedFoodService";

export default function ApiTestDemo() {
  const [testQueries] = useState([
    "arroz branco",
    "frango grelhado",
    "banana",
    "batata doce",
    "queijo minas",
    "leite integral",
    "salmão",
    "aveia",
    "abacate",
    "brócolis",
  ]);

  const [results, setResults] = useState<{ [key: string]: any[] }>({});
  const [isLoading, setIsLoading] = useState(false);

  const testAllQueries = async () => {
    setIsLoading(true);
    const newResults: { [key: string]: any[] } = {};

    for (const query of testQueries) {
      try {
        console.log(`Testing: "${query}"`);
        const foods = await EnhancedFoodService.searchFoods(query, true);
        newResults[query] = foods.slice(0, 3); // Take only first 3 results
        console.log(`Results for "${query}":`, foods.length);
      } catch (error) {
        console.error(`Error testing "${query}":`, error);
        newResults[query] = [];
      }
    }

    setResults(newResults);
    setIsLoading(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Teste de API com Tradução</h2>

      <div className="mb-6">
        <button
          onClick={testAllQueries}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? "Testando..." : "Testar Todas as Consultas"}
        </button>

        <div className="mt-4 text-sm text-gray-600">
          Este teste irá buscar os seguintes alimentos em português e traduzir
          para inglês:
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {testQueries.map((query) => (
            <span key={query} className="px-2 py-1 bg-gray-100 rounded text-sm">
              {query} → {TranslationService.translateFoodName(query)}
            </span>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <div className="mt-2">Testando consultas...</div>
        </div>
      )}

      {Object.keys(results).length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Resultados dos Testes:</h3>

          {Object.entries(results).map(([query, foods]) => (
            <div key={query} className="border border-gray-200 rounded-lg p-4">
              <div className="mb-3">
                <h4 className="font-medium text-gray-900">
                  "{query}" → "{TranslationService.translateFoodName(query)}"
                </h4>
                <div className="text-sm text-gray-500">
                  {foods.length} resultado(s) encontrado(s)
                </div>
              </div>

              {foods.length > 0 ? (
                <div className="grid gap-2">
                  {foods.map((food, index) => (
                    <div
                      key={food.id || index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {food.name}
                          {food.isFromApi && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1 rounded">
                              API
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {food.caloriesPerUnit} kcal • {food.proteinPerUnit}g
                          prot • {food.carbsPerUnit}g carb • {food.fatPerUnit}g
                          gord
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
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 italic">
                  Nenhum resultado encontrado
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Como Funciona:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
          <li>
            O usuário digita um alimento em português (ex: "arroz branco")
          </li>
          <li>O sistema traduz para inglês ("white rice")</li>
          <li>Busca na API Open Food Facts usando o termo em inglês</li>
          <li>Retorna os resultados com informações nutricionais</li>
          <li>Mostra tanto o termo original quanto a tradução usada</li>
        </ol>
      </div>
    </div>
  );
}
