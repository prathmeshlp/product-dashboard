import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product.service";

interface UseProductsArgs {
  page: number;
  limit: number;
  search?: string;
  category?: string;
}

export const useProducts = ({
  page,
  limit,
  search,
  category,
}: UseProductsArgs) => {
  return useQuery({
    queryKey: ["products", page, search, category],
    queryFn: () =>
      productService.getProducts({
        page,
        limit,
        search,
        category,
      }),
    // keepPreviousData: true
    staleTime: 60_000,
  });
};
