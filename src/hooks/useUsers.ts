import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";

interface Args {
  page: number;
  limit: number;
  search?: string;
}

export const useUsers = ({ page, limit, search }: Args) => {
  return useQuery({
    queryKey: ["users", page, search],
    queryFn: () => userService.getUsers(page, limit, search),
    // keepPreviousData: true,
    staleTime: 60_000,
  });
};
