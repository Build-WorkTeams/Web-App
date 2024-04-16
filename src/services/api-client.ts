
import router from "@/Routes/routes";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://backend-api-2zsu.onrender.com/",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 ||
        error.response?.status === 403 ||
        error.response?.status === 500
      ) {
        localStorage.clear();
        router.navigate("/login", { replace: true });
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
