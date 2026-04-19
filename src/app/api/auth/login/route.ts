import { NextResponse } from "next/server";
import { DEMO_USERS, getDashboardPathByRole } from "../../../../../lib/auth/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    const user = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { ok: false, message: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      ok: true,
      role: user.role,
      name: user.name,
      redirectTo: getDashboardPathByRole(user.role),
    });

    response.cookies.set("auth_token", "demo-session-token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    response.cookies.set("user_role", user.role, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    response.cookies.set("user_name", user.name, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Error procesando el login" },
      { status: 500 }
    );
  }
}