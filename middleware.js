import { NextResponse } from "next/server";

// Rutas protegidas por rol
const roleRoutes = {
  admin: ["/admin-dashboard"],
  dentist: ["/dentist-dashboard"],
  user: ["/patient-dashboard"],
};

// Rutas que requieren cualquier autenticación
const authOnly = [
  "/admin-dashboard",
  "/dentist-dashboard",
  "/patient-dashboard",
];

// Rutas públicas que deben redirigir si ya autenticado
const redirectIfAuth = ["/login", "/register"];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Ignorar archivos estáticos y API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  const role = req.cookies.get("appRole")?.value; // 'admin' | 'dentist' | 'user'

  // Si la ruta requiere auth y no hay rol -> redirigir a login
  if (authOnly.some((r) => pathname.startsWith(r)) && !role) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirigir fuera de login/register si ya autenticado
  if (role && redirectIfAuth.includes(pathname)) {
    return NextResponse.redirect(new URL(getDashboardForRole(role), req.url));
  }

  // Validar coincidencia rol-ruta
  if (role) {
    for (const [r, routes] of Object.entries(roleRoutes)) {
      if (routes.some((rt) => pathname.startsWith(rt))) {
        if (r !== role) {
          // Redirigir al dashboard correcto del rol actual
          return NextResponse.redirect(
            new URL(getDashboardForRole(role), req.url)
          );
        }
      }
    }
  }

  return NextResponse.next();
}

function getDashboardForRole(role) {
  return (
    {
      admin: "/admin-dashboard",
      dentist: "/dentist-dashboard",
      user: "/patient-dashboard",
    }[role] || "/patient-dashboard"
  );
}

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/dentist-dashboard/:path*",
    "/patient-dashboard/:path*",
    "/login",
    "/register",
  ],
};
