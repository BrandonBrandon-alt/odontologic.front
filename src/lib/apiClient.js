// lib/apiClient.js
import axios from "axios";
import { authService } from "../services/auth.service"; // Importaremos esto más tarde

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // http://localhost:3001/api
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para AÑADIR el token a cada petición
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para RENOVAR el token si ha expirado
apiClient.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, no hagas nada
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no es un reintento
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marcar como reintento

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) return Promise.reject(error);

        // Llama a la función para refrescar el token (la crearemos en el servicio)
        const { newAccessToken } = await authService.refreshToken(refreshToken);

        localStorage.setItem("accessToken", newAccessToken);
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest); // Reintentar la petición original con el nuevo token
      } catch (refreshError) {
        // Si el refresh token falla, desloguea al usuario
        authService.logout();
        window.location.href = "/login"; // Redirigir a la página de login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
