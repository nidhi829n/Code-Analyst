import axios from "axios";
import { API_URL } from "../config/api";

export const signupUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/api/v1/auth/signup`,
    userData
  );

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/api/v1/auth/login`,
    userData
  );

  return response.data;
};