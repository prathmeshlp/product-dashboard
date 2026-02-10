import { apiClient } from "@/lib/api-client";
import { AUTH_ENDPOINTS } from "@/config/constants";
import type { LoginPayload, AuthResponse } from "@/types/auth.types";

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      AUTH_ENDPOINTS.LOGIN,
      payload,
    );
    return response.data;
  },
};
