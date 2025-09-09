const API_BASE_URL = "http://localhost:3001/api";

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Food methods
  async getFoods(params?: {
    search?: string;
    category?: string;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.append("search", params.search);
    if (params?.category) searchParams.append("category", params.category);
    if (params?.limit) searchParams.append("limit", params.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/foods?${queryString}` : "/foods";

    return this.request(endpoint);
  }

  async getFood(id: string) {
    return this.request(`/foods/${id}`);
  }

  async createFood(food: any) {
    return this.request("/foods", {
      method: "POST",
      body: JSON.stringify(food),
    });
  }

  async updateFood(id: string, food: any) {
    return this.request(`/foods/${id}`, {
      method: "PUT",
      body: JSON.stringify(food),
    });
  }

  async deleteFood(id: string) {
    return this.request(`/foods/${id}`, {
      method: "DELETE",
    });
  }

  async getFoodCategories() {
    return this.request("/food-categories");
  }

  async getFoodUnits() {
    return this.request("/food-units");
  }

  // Exercise methods
  async getExercises(params?: {
    search?: string;
    category?: string;
    muscleGroup?: string;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.append("search", params.search);
    if (params?.category) searchParams.append("category", params.category);
    if (params?.muscleGroup)
      searchParams.append("muscleGroup", params.muscleGroup);
    if (params?.limit) searchParams.append("limit", params.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/exercises?${queryString}` : "/exercises";

    return this.request(endpoint);
  }

  async createExercise(exercise: any) {
    return this.request("/exercises", {
      method: "POST",
      body: JSON.stringify(exercise),
    });
  }

  async getExerciseCategories() {
    return this.request("/exercise-categories");
  }

  async getMuscleGroups() {
    return this.request("/muscle-groups");
  }

  // Health check
  async healthCheck() {
    return this.request("/health");
  }
}

export const apiClient = new ApiClient();
