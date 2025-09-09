import { useState } from "react";
import { ApiService } from "../services/ApiService";
import { TranslationService } from "../services/TranslationService";

export default function SimpleApiTest() {
  const [testQuery, setTestQuery] = useState("arroz branco");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const testApi = async () => {
    setIsLoading(true);
    try {
      const translatedQuery = TranslationService.translateFoodName(testQuery);
      console.log(`Testing API with: "${testQuery}" -> "${translatedQuery}"`);

      const apiResults = await ApiService.searchFood(translatedQuery, 5);
      console.log("API Results:", apiResults);
      setResults(apiResults);
    } catch (error) {
      console.error("API Test Error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const testDirectApi = async () => {
    setIsLoading(true);
    try {
      // Test direct API call without translation
      console.log("Testing direct API call...");
      const apiResults = await ApiService.searchFood("white rice", 3);
      console.log("Direct API Results:", apiResults);
      setResults(apiResults);
    } catch (error) {
      console.error("Direct API Test Error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const testRawApi = async () => {
    setIsLoading(true);
    try {
      // Test raw API call to see the actual response
      console.log("Testing raw API call...");
      const response = await fetch(
        "https://world.openfoodfacts.org/cgi/search.pl?search_terms=white%20rice&search_simple=1&action=process&json=1&page_size=3"
      );
      const data = await response.json();
      console.log("Raw API Response:", data);
      setResults(data.products || []);
    } catch (error) {
      console.error("Raw API Test Error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Teste Simples da API</h2>

      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            placeholder="Digite um alimento em português"
            className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={testApi}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? "Testando..." : "Testar API"}
          </button>
          <button
            onClick={testDirectApi}
            disabled={isLoading}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            {isLoading ? "Testando..." : "Testar API Direta"}
          </button>
          <button
            onClick={testRawApi}
            disabled={isLoading}
            className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400"
          >
            {isLoading ? "Testando..." : "Testar API Raw"}
          </button>
        </div>

        <div className="mt-2 text-sm text-gray-600">
          <strong>Tradução:</strong> "{testQuery}" → "
          {TranslationService.translateFoodName(testQuery)}"
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <div className="mt-2">Testando API...</div>
        </div>
      )}

      {results.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Resultados da API:</h3>
          <div className="space-y-2">
            {results.map((product, index) => (
              <div key={index} className="border border-gray-200 rounded p-3">
                <div className="font-medium">{product.product_name}</div>
                <div className="text-sm text-gray-500">
                  {product.brands && `Marca: ${product.brands} • `}
                  Código: {product.code}
                </div>
                {product.nutriments && (
                  <div className="text-xs text-gray-400 mt-1">
                    Calorias: {product.nutriments["energy-kcal_100g"]} kcal/100g
                    • Proteína: {product.nutriments["proteins_100g"]}g •
                    Carboidratos: {product.nutriments["carbohydrates_100g"]}g •
                    Gordura: {product.nutriments["fat_100g"]}g
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && results.length === 0 && testQuery && (
        <div className="text-center py-8 text-gray-500">
          Nenhum resultado encontrado para "{testQuery}"
        </div>
      )}
    </div>
  );
}
