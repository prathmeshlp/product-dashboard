import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

export const useDashboard = () => {
  const productsQuery = useQuery({
    queryKey: ["dashboard-products"],
    queryFn: dashboardService.getProducts,
  });

  const usersQuery = useQuery({
    queryKey: ["dashboard-users"],
    queryFn: dashboardService.getUsers,
  });

  const categoriesQuery = useQuery({
    queryKey: ["dashboard-categories"],
    queryFn: dashboardService.getCategories,
  });

  return {
    productsQuery,
    usersQuery,
    categoriesQuery,
    isLoading:
      productsQuery.isLoading ||
      usersQuery.isLoading ||
      categoriesQuery.isLoading,
  };
};
