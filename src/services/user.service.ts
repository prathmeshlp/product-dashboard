import { apiClient } from "@/lib/api-client";
import { type UserResponse } from "@/types/user.types";

export const userService = {
  getUsers: async (
    page: number,
    limit: number,
    search?: string
  ): Promise<UserResponse> => {
    const skip = (page - 1) * limit;

    if (search) {
      const res = await apiClient.get<UserResponse>(
        `/users/search?q=${search}&limit=${limit}&skip=${skip}`
      );
      return res.data;
    }

    const res = await apiClient.get<UserResponse>(
      `/users?limit=${limit}&skip=${skip}`
    );
    return res.data;
  },
};
