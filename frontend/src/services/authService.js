import apiClient from "./apiClient";
import { API_URL } from "../config/api";

export const signupUser = async (userData) => {
  const response = await apiClient.post(
    `${API_URL}/api/v1/auth/signup`,
    userData
  );

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await apiClient.post(
    `${API_URL}/api/v1/auth/login`,
    userData
  );

  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post(
    `${API_URL}/api/v1/auth/logout`
  );

  return response.data;
};