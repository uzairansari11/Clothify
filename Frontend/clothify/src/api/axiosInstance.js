import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_URL,
  timeout: 15000,
});

API.interceptors.request.use((config) => {
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong. Please try again.";

    if (error?.response?.status === 401) {
      console.warn("Session expired - please login again");
    }

    error.friendlyMessage = message;
    return Promise.reject(error);
  }
);

export default API;
