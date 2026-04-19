import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("auth_token")?.value;
  const role = request.cookies.get("user_role")?.value;

  const isLoggedIn = Boolean(token);
  const isLoginPage = pathname === "/login";
  const isAdminRoute = pathname.startsWith("/admin");
  const isUserRoute = pathname.startsWith("/usuario");

  if (!isLoggedIn && (isAdminRoute || isUserRoute)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && isLoginPage) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    if (role === "usuario") {
      return NextResponse.redirect(new URL("/usuario/dashboard", request.url));
    }
  }

  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/usuario/dashboard", request.url));
  }

  if (isUserRoute && role !== "usuario") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin/:path*", "/usuario/:path*"],
};