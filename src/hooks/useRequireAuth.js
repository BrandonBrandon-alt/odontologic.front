"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * Hook para exigir autenticación opcionalmente filtrando por rol.
 * Redirige a /login?redirect= si no cumple.
 */
export function useRequireAuth({ role, redirectToLogin = true } = {}) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (isLoading) return; // esperar carga inicial

    if (!isAuthenticated) {
      if (redirectToLogin) {
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      }
      return;
    }

    if (role && user?.role !== role) {
      // Redirigir a su dashboard correcto
      const dash = getDashboardForRole(user?.role);
      router.replace(dash);
      return;
    }
    setAllowed(true);
  }, [isAuthenticated, isLoading, user?.role, role, router, pathname]);

  return { allowed, isLoading };
}

export function getDashboardForRole(role) {
  return (
    {
      admin: "/admin-dashboard",
      dentist: "/dentist-dashboard",
      user: "/patient-dashboard",
    }[role] || "/patient-dashboard"
  );
}
