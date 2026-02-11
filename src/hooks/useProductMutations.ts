import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import {type  Product } from "@/types/product.types";
import { type ApiResponse } from "@/types/api.types";

export const useProductMutations = () => {
  const queryClient = useQueryClient();

  const createProduct = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProduct = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Product>;
    }) => productService.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

const deleteProduct = useMutation({
  mutationFn: productService.deleteProduct,

  onMutate: async (id: number) => {
    await queryClient.cancelQueries({ queryKey: ["products"] });

    const previousData =
      queryClient.getQueryData<ApiResponse<Product>>(["products"]);

    queryClient.setQueryData<ApiResponse<Product>>(
      ["products"],
      (old) => {
        if (!old) return old;

        return {
          ...old,
          products: old.products.filter((p) => p.id !== id),
        };
      }
    );

    return { previousData };
  },

  onError: (_err, _id, context) => {
    if (context?.previousData) {
      queryClient.setQueryData(["products"], context.previousData);
    }
  },

  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  },
});


  return {
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
