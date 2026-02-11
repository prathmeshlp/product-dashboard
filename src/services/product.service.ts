import { apiClient } from "@/lib/api-client";
import { type ApiResponse } from "@/types/api.types";
import { type Product } from "@/types/product.types";
import { type ProductCategory } from "@/types/product.types";

interface ProductQueryParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
}

export const productService = {
  getProducts: async ({
    page,
    limit,
    search,
    category,
  }: ProductQueryParams): Promise<ApiResponse<Product>> => {
    const skip = (page - 1) * limit;

    if (search) {
      const res = await apiClient.get<ApiResponse<Product>>(
        `/products/search?q=${search}&limit=${limit}&skip=${skip}`,
      );
      return res.data;
    }

    if (category) {
      const res = await apiClient.get<ApiResponse<Product>>(
        `/products/category/${category}?limit=${limit}&skip=${skip}`,
      );
      return res.data;
    }

    const res = await apiClient.get<ApiResponse<Product>>(
      `/products?limit=${limit}&skip=${skip}`,
    );
    return res.data;
  },

  getCategories: async (): Promise<ProductCategory[]> => {
    const res = await apiClient.get<ProductCategory[]>("/products/categories");
    return res.data;
  },
};
