import apiClient from "./apiClient";

import { API_URL } from "../config/api";

export const getReviews = async () => {
  const response = await apiClient.get(`${API_URL}/reviews`);
  return response.data;
};

export const deleteReview = async (id) => {
  const response = await apiClient.delete(`${API_URL}/reviews/${id}`);
  return response.data;
};

export const getStats = async () => {
  const response = await apiClient.get(`${API_URL}/reviews/stats`);
  return response.data;
};