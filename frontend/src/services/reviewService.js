import axios from "axios";

import { API_URL } from "../config/api";

export const getReviews = async () => {
  const token =
localStorage.getItem("token");

const response =
await axios.get(
  `${API_URL}/reviews`,
  {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  }
);

  return response.data;
};

export const deleteReview = async (id) => {

  const token =
    localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/reviews/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getStats = async () => {

  const token =
    localStorage.getItem("token");

  const response =
    await axios.get(
      `${API_URL}/reviews/stats`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};