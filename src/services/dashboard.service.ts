import { apiClient } from "@/lib/api-client";

export const dashboardService = {
  getProducts: async () => {
    const res = await apiClient.get("/products?limit=100");
    return res.data;
  },

  getUsers: async () => {
    const res = await apiClient.get("/users?limit=100");
    return res.data;
  },

  getCategories: async () => {
    const res = await apiClient.get<string[]>("/products/categories");
    return res.data;
  },
};
