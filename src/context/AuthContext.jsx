// context/AuthContext.js
"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { authService } from "../services/auth.service";
import apiClient from "../lib/apiClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("accessToken");

        if (storedUser && token) {
          // Configurar el header de autorización
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;

          try {
            // Verificar si el token sigue siendo válido
            const response = await apiClient.get("/auth/verify");

            // Si el token es válido, restaurar el estado del usuario
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
          } catch (verifyError) {
            console.warn("Token verification failed:", verifyError.message);
            // Token inválido, limpiar localStorage
            authService.logout();
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        // En caso de error, limpiar todo
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const loggedInUser = await authService.login(credentials);

      setUser(loggedInUser);
      setIsAuthenticated(true);

      return { success: true, user: loggedInUser };
    } catch (error) {
      console.error("Login failed:", error);
      setUser(null);
      setIsAuthenticated(false);

      return {
        success: false,
        error: error.response?.data?.message || error.message || "Login failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      const registeredUser = await authService.register(userData);

      // Algunos sistemas autologuean después del registro
      if (registeredUser.accessToken) {
        setUser(registeredUser);
        setIsAuthenticated(true);
      }

      return { success: true, user: registeredUser };
    } catch (error) {
      console.error("Registration failed:", error);

      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Registration failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      authService.logout();
      setUser(null);
      setIsAuthenticated(false);

      // Limpiar headers de apiClient
      delete apiClient.defaults.headers.common["Authorization"];
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const refreshUserData = async () => {
    try {
      const updatedUser = await authService.getCurrentUser();
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      return { success: false, error: error.message };
    }
  };

  // Actualizar usuario manualmente (ej: tras editar perfil)
  const updateUser = (nextUser) => {
    if (!nextUser) return;
    setUser(nextUser);
    try {
      localStorage.setItem("user", JSON.stringify(nextUser));
      // Actualizar cookies simples si cambió nombre o rol
      if (nextUser.role) {
        document.cookie = `appRole=${encodeURIComponent(
          nextUser.role
        )}; path=/; max-age=86400; SameSite=Lax`;
      }
      if (nextUser.name) {
        document.cookie = `appUserName=${encodeURIComponent(
          nextUser.name
        )}; path=/; max-age=86400; SameSite=Lax`;
      }
    } catch (e) {
      console.warn("No se pudo persistir user actualizado:", e);
    }
  };

  // Memoizar el valor del contexto para evitar re-renders innecesarios
  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      login,
      register,
      logout,
      refreshUserData,
      updateUser,
    }),
    [user, isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
