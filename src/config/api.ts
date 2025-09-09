// API Configuration
export const API_CONFIG = {
  // RapidAPI key for ExerciseDB API
  // Get your key from: https://rapidapi.com/hub
  RAPIDAPI_KEY: import.meta.env.VITE_RAPIDAPI_KEY || "",

  // Feature flags - Enable food API by default, exercise API only if key is provided
  ENABLE_FOOD_API: true, // Open Food Facts is free and doesn't require a key
  ENABLE_EXERCISE_API: !!import.meta.env.VITE_RAPIDAPI_KEY,

  // API endpoints
  OPEN_FOOD_FACTS_BASE_URL: "https://world.openfoodfacts.org",
  EXERCISE_DB_BASE_URL: "https://exercisedb.p.rapidapi.com",

  // Rate limiting
  MAX_REQUESTS_PER_MINUTE: 60,
  REQUEST_TIMEOUT: 10000, // 10 seconds
};

// Helper function to check if API is available
export const isApiAvailable = (apiType: "food" | "exercise"): boolean => {
  if (apiType === "food") {
    return API_CONFIG.ENABLE_FOOD_API;
  }

  if (apiType === "exercise") {
    return API_CONFIG.ENABLE_EXERCISE_API && !!API_CONFIG.RAPIDAPI_KEY;
  }

  return false;
};
