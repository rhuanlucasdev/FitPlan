import { API_CONFIG } from "../config/api";

// API Service for external data integration
export class ApiService {
  private static readonly OPEN_FOOD_FACTS_BASE_URL =
    API_CONFIG.OPEN_FOOD_FACTS_BASE_URL;
  private static readonly EXERCISE_DB_BASE_URL =
    API_CONFIG.EXERCISE_DB_BASE_URL;
  private static readonly RAPIDAPI_KEY = API_CONFIG.RAPIDAPI_KEY;

  // Food API methods
  static async searchFood(query: string, limit: number = 20) {
    try {
      // Use the correct Open Food Facts API format
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        query
      )}&search_simple=1&action=process&json=1&page_size=${limit}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Check if the response has the expected structure
      if (
        data.products &&
        Array.isArray(data.products) &&
        data.products.length > 0
      ) {
        return data.products;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error searching food:", error);
      return [];
    }
  }

  // Exercise API methods
  static async searchExercises(
    query?: string,
    muscle?: string,
    equipment?: string,
    limit: number = 20
  ) {
    try {
      let url = `${this.EXERCISE_DB_BASE_URL}/exercises?limit=${limit}`;

      if (query) url += `&name=${encodeURIComponent(query)}`;
      if (muscle) url += `&muscle=${encodeURIComponent(muscle)}`;
      if (equipment) url += `&equipment=${encodeURIComponent(equipment)}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": this.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error searching exercises:", error);
      return [];
    }
  }

  static async getExerciseById(id: string) {
    try {
      const response = await fetch(
        `${this.EXERCISE_DB_BASE_URL}/exercises/exercise/${id}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": this.RAPIDAPI_KEY,
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data || null;
    } catch (error) {
      console.error("Error fetching exercise by ID:", error);
      return null;
    }
  }

  static async getExerciseByBodyPart(bodyPart: string, limit: number = 20) {
    try {
      const response = await fetch(
        `${this.EXERCISE_DB_BASE_URL}/exercises/bodyPart/${bodyPart}?limit=${limit}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": this.RAPIDAPI_KEY,
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error fetching exercises by body part:", error);
      return [];
    }
  }

  static async getExerciseByTarget(target: string, limit: number = 20) {
    try {
      const response = await fetch(
        `${this.EXERCISE_DB_BASE_URL}/exercises/target/${target}?limit=${limit}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": this.RAPIDAPI_KEY,
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error fetching exercises by target:", error);
      return [];
    }
  }

  static async getBodyParts() {
    try {
      const response = await fetch(
        `${this.EXERCISE_DB_BASE_URL}/exercises/bodyPartList`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": this.RAPIDAPI_KEY,
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error fetching body parts:", error);
      return [];
    }
  }

  static async getTargetMuscles() {
    try {
      const response = await fetch(
        `${this.EXERCISE_DB_BASE_URL}/exercises/targetList`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": this.RAPIDAPI_KEY,
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error fetching target muscles:", error);
      return [];
    }
  }

  static async getEquipment() {
    try {
      const response = await fetch(
        `${this.EXERCISE_DB_BASE_URL}/exercises/equipmentList`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": this.RAPIDAPI_KEY,
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error fetching equipment:", error);
      return [];
    }
  }
}
