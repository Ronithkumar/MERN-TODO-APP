import axios from "axios";
import config from "../config";

const API = axios.create({
  baseURL: config.API_BASE_URL,
});

// Attach token automatically using an interceptor
export const attachTokenInterceptor = () => {
  API.interceptors.request.use((axiosConfig) => {
    const token = localStorage.getItem(config.TOKEN_KEY);
    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }
    return axiosConfig;
  });
};

// Call once (or from app entry point like App.jsx)
attachTokenInterceptor();

export default API;

// === USER AUTHENTICATION ===

export const loginUser = async (credentials) => {
  const response = await API.post(`/Users/login`, credentials);
  return response.data;
};

export const createUser = (userData) => API.post(`/Users`, userData);

export const fetchUserProfile = async () => {
  const response = await API.get("/Users/profile");
  return response.data;
};

export const updateUser = async (updatedData) => {
  const response = await API.put("/Users/profile", updatedData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await API.delete(`/Users/${id}`);
  return response.data;
};

export async function changePassword(data) {
  try {
    const response = await API.post("/Users/profile/change-password", data);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to change password";
    throw new Error(message);
  }
}

export const requestPasswordReset = async (email) => {
  try {
    const response = await API.post("/Users/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("Failed to request password reset");
  }
};

export const resetPassword = async ({ token, newPassword }) => {
  try {
    const response = await API.post("/Users/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("Failed to reset password");
  }
};

// === TASKS ===

export const fetchTasks = async () => {
  const response = await API.get("/tasks");
  return response.data;
};

export const fetchTaskById = async (id) => {
  const response = await API.get(`/tasks/${id}`);
  return response.data;
};

export const addTask = async (taskData) => {
  const response = await API.post(`/tasks`, taskData);
  return response.data;
};

export const updateTask = async (id, updatedData) => {
  const response = await API.put(`/tasks/${id}`, updatedData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await API.delete(`/tasks/${id}`);
  return response.data;
};

// === Utility ===
export const getAuthToken = () => localStorage.getItem(config.TOKEN_KEY);
