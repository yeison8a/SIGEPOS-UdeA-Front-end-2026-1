"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ChevronRight,
  ClipboardList,
  FileSearch,
  Home,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  ShieldCheck,
  UserCircle2,
  Users,
} from "lucide-react";

type DashboardShellProps = {
  title: string;
  subtitle: string;
  roleLabel: string;
  activeRole: "admin" | "usuario";
  children: ReactNode;
};

export default function DashboardShell({
  title,
  subtitle,
  roleLabel,
  activeRole,
  children,
}: DashboardShellProps) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const mainNav =
    activeRole === "admin"
      ? [
          {
            label: "Dashboard",
            href: "/admin/dashboard",
            icon: <LayoutDashboard size={18} />,
          },
          {
            label: "Solicitudes",
            href: "/admin/solicitudes",
            icon: <ClipboardList size={18} />,
          },
          {
            label: "Gestión usuarios",
            href: "/admin/usuarios",
            icon: <Users size={18} />,
          },
          {
            label: "Revisiones",
            href: "/admin/revisiones",
            icon: <FileSearch size={18} />,
          },
          {
            label: "Configuración",
            href: "#",
            icon: <Settings size={18} />,
          },
        ]
      : [
          {
            label: "Dashboard",
            href: "/usuario/dashboard",
            icon: <LayoutDashboard size={18} />,
          },
          {
            label: "Nueva solicitud",
            href: "/solicitud-cohorte/informacion",
            icon: <ClipboardList size={18} />,
          },
          {
            label: "Mis procesos",
            href: "#",
            icon: <FileSearch size={18} />,
          },
          {
            label: "Perfil",
            href: "#",
            icon: <UserCircle2 size={18} />,
          },
        ];

  return (
    <main className="min-h-screen bg-[#e9dfdf] px-4 py-8 md:px-8">
      <section className="mx-auto w-full max-w-[1500px] overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="h-2 w-full bg-[#0f5c3a]" />

        <div className="grid min-h-[84vh] lg:grid-cols-[290px_1fr]">
          <aside className="border-b border-neutral-200 bg-[#f7faf7] px-6 py-7 lg:border-b-0 lg:border-r">
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-[#0f5c3a]">
                  U
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    Universidad
                  </p>
                  <p className="text-xs text-neutral-500">
                    Portal de Posgrados
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#0f5c3a] px-4 py-4 text-white">
                <p className="text-xs uppercase tracking-[0.18em] text-green-100">
                  Sesión activa
                </p>
                <p className="mt-2 text-lg font-bold">{roleLabel}</p>
                <p className="mt-1 text-sm text-white/75">
                  Acceso al panel institucional
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
                  Navegación
                </p>

                <nav className="space-y-2">
                  {mainNav.map((item) => {
                    const active =
                      item.href !== "#" &&
                      (pathname === item.href ||
                        pathname.startsWith(`${item.href}/`));

                    return (
                      <SidebarLink
                        key={item.label}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        active={active}
                      />
                    );
                  })}
                </nav>
              </div>

              <div>
                <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
                  Accesos rápidos
                </p>

                <div className="space-y-3">
                  {activeRole === "admin" ? (
                    <>
                      <QuickMiniCard
                        title="Revisión pendiente"
                        description="Abrir bandeja de revisiones"
                        href="/admin/revisiones"
                      />
                      <QuickMiniCard
                        title="Administrar usuarios"
                        description="Gestionar roles y estados"
                        href="/admin/usuarios"
                      />
                    </>
                  ) : (
                    <>
                      <QuickMiniCard
                        title="Nueva cohorte"
                        description="Crear y diligenciar una solicitud"
                        href="/solicitud-cohorte/informacion"
                      />
                      <QuickMiniCard
                        title="Último borrador"
                        description="Continuar el flujo pendiente"
                        href="/solicitud-cohorte/descripcion"
                      />
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#0f5c3a] bg-white px-4 py-3 text-sm font-semibold text-[#0f5c3a] transition hover:bg-green-50"
              >
                <LogOut size={18} />
                Cerrar sesión
              </button>
            </div>
          </aside>

          <div className="bg-[#fcfcfc]">
            <div className="border-b border-neutral-200 bg-white px-6 py-5 md:px-10">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm text-neutral-400">
                    <Home size={15} />
                    <ChevronRight size={14} />
                    <span>{roleLabel}</span>
                    <ChevronRight size={14} />
                    <span className="text-[#0f5c3a]">{title}</span>
                  </div>

                  <h1 className="text-3xl font-extrabold text-neutral-900 md:text-4xl">
                    {title}
                  </h1>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-neutral-600 md:text-base">
                    {subtitle}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-center rounded-xl border border-neutral-200 bg-[#fafafa] px-4 py-3">
                    <Search size={16} className="mr-2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Buscar solicitudes, programas, usuarios..."
                      className="w-full min-w-[240px] bg-transparent text-sm outline-none placeholder:text-neutral-400"
                    />
                  </div>

                  <button
                    type="button"
                    className="relative rounded-xl border border-neutral-200 bg-white p-3 text-neutral-600 transition hover:bg-neutral-50"
                  >
                    <Bell size={18} />
                    <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500" />
                  </button>

                  <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-[#0f5c3a]">
                      {activeRole === "admin" ? "A" : "U"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">
                        {activeRole === "admin"
                          ? "Administrador"
                          : "Usuario institucional"}
                      </p>
                      <p className="text-xs text-neutral-500">{roleLabel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-8 md:px-10">{children}</div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SidebarLink({
  href,
  label,
  icon,
  active = false,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
        active
          ? "bg-[#0f5c3a] text-white shadow-sm"
          : "bg-white text-neutral-700 hover:bg-green-50 hover:text-[#0f5c3a]"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function QuickMiniCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-[2px]"
    >
      <p className="text-sm font-semibold text-neutral-900">{title}</p>
      <p className="mt-1 text-xs leading-5 text-neutral-500">{description}</p>
    </Link>
  );
}