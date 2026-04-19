export type UserRole = "admin" | "usuario";

export const DEMO_USERS = [
  {
    email: "admin@udea.edu.co",
    password: "123456",
    role: "admin" as UserRole,
    name: "Administrador UdeA",
  },
  {
    email: "usuario@udea.edu.co",
    password: "123456",
    role: "usuario" as UserRole,
    name: "Usuario UdeA",
  },
];

export function getDashboardPathByRole(role: UserRole) {
  return role === "admin" ? "/admin/dashboard" : "/usuario/dashboard";
}