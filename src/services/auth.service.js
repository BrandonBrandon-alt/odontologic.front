// services/auth.service.js
import apiClient from "../lib/apiClient";

class AuthService {
  // Login del usuario
  async login(credentials) {
    try {
      const response = await apiClient.post("/auth/login", credentials);
      const { user, accessToken, refreshToken } = response.data;

      // Guardar tokens en localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      // Configurar el header de autorización para futuras peticiones
      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // Registro de usuario
  async register(userData) {
    try {
      const response = await apiClient.post("/auth/register", userData);
      const { user, accessToken, refreshToken } = response.data;

      // Si el backend devuelve tokens después del registro, guardarlos
      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
      }

      return user;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  // Refresh del token de acceso
  async refreshToken(refreshToken) {
    try {
      const response = await apiClient.post("/auth/token/refresh", {
        refreshToken: refreshToken,
      });

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;

      // Actualizar tokens en localStorage
      localStorage.setItem("accessToken", newAccessToken);
      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
      }

      return { newAccessToken, newRefreshToken };
    } catch (error) {
      console.error("Token refresh error:", error);
      throw error;
    }
  }

  // Verificar si el token actual es válido
  async verifyToken() {
    try {
      const response = await apiClient.get("/auth/verify");
      return response.data;
    } catch (error) {
      console.error("Token verification error:", error);
      throw error;
    }
  }

  // Logout del usuario
  async logout() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      // 1. Llama al endpoint de logout en el backend para invalidar el token
      if (refreshToken) {
        // Hacemos la llamada pero no necesitamos esperar la respuesta si no queremos.
        // El 'catch' evita que un fallo en el backend impida el logout en el frontend.
        apiClient.post("/auth/logout").catch((err) => {
          console.error(
            "Backend logout failed, proceeding with client-side logout:",
            err
          );
        });
      }
    } finally {
      // 2. Limpia el almacenamiento local y los headers, sin importar el resultado del backend
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      delete apiClient.defaults.headers.common["Authorization"];
    }
  }

  // Solicitar reset de contraseña
  async requestPasswordReset(email) {
    try {
      const response = await apiClient.post("/auth/password/forgot-password", {
        email,
      });
      return response.data;
    } catch (error) {
      console.error("Password reset request error:", error);
      throw error;
    }
  }

  // Confirmar reset de contraseña
  async resetPassword(resetData) {
    try {
      const response = await apiClient.post(
        "/auth/password/reset-password",
        resetData
      );
      return response.data;
    } catch (error) {
      console.error("Password reset error:", error);
      throw error;
    }
  }

  // Verificar código de restablecimiento (opcional antes de enviar nueva contraseña)
  async verifyResetCode({ email, code }) {
    try {
      const response = await apiClient.post("/auth/password/verify-code", {
        email: email?.toLowerCase(),
        code,
      });
      return response.data; // { message } si backend responde así
    } catch (error) {
      console.error("Verify reset code error:", error);
      throw error;
    }
  }

  // Activar cuenta con código enviado al email
  async activateAccount({ email, code }) {
    try {
      const response = await apiClient.post("/auth/activate", { email, code });
      return response.data; // { message }
    } catch (error) {
      console.error("Account activation error:", error);
      throw error;
    }
  }

  // Reenviar código de activación
  async resendActivationCode(email) {
    try {
      const response = await apiClient.post("/auth/resend-activation", {
        email,
      });
      return response.data; // { message }
    } catch (error) {
      console.error("Resend activation code error:", error);
      throw error;
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated() {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");
    return !!(token && user);
  }

  // Obtener el token actual
  getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  // Obtener el refresh token
  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  // Obtener usuario del localStorage
  getCurrentUserFromStorage() {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing user from storage:", error);
      return null;
    }
  }
}

// Exportar una instancia del servicio
export const authService = new AuthService();
