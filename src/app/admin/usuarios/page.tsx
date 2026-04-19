import {
  ShieldCheck,
  UserCheck,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";
import DashboardShell from "../../../../components/dashboard/DashboardShell";
import DashboardCard from "../../../../components/dashboard/DashboardCard";
import KpiCard from "../../../../components/dashboard/KpiCard";
import StatusBadge from "../../../../components/dashboard/StatusBadge";

const usuarios = [
  {
    nombre: "María Gómez",
    correo: "maria.gomez@udea.edu.co",
    rol: "Administrador",
    estado: "Activo",
    ultimoAcceso: "Hoy 09:12",
  },
  {
    nombre: "Carlos Ruiz",
    correo: "carlos.ruiz@udea.edu.co",
    rol: "Usuario",
    estado: "Activo",
    ultimoAcceso: "Hoy 08:01",
  },
  {
    nombre: "Laura Pérez",
    correo: "laura.perez@udea.edu.co",
    rol: "Revisor",
    estado: "Activo",
    ultimoAcceso: "Ayer 16:22",
  },
  {
    nombre: "Andrés López",
    correo: "andres.lopez@udea.edu.co",
    rol: "Usuario",
    estado: "Inactivo",
    ultimoAcceso: "Hace 5 días",
  },
];

export default function AdminUsuariosPage() {
  return (
    <DashboardShell
      title="Gestión de usuarios"
      subtitle="Administre cuentas, roles, accesos y estados de los usuarios del sistema."
      roleLabel="Administrador"
      activeRole="admin"
    >
      <div className="space-y-8">
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Usuarios totales"
            value="24"
            change="+2 esta semana"
            icon={<Users size={18} />}
            tone="green"
          />
          <KpiCard
            title="Administradores"
            value="4"
            change="Con acceso completo"
            icon={<ShieldCheck size={18} />}
            tone="cream"
          />
          <KpiCard
            title="Revisores"
            value="6"
            change="Bandeja activa"
            icon={<UserCheck size={18} />}
            tone="white"
          />
          <KpiCard
            title="Usuarios estándar"
            value="14"
            change="Procesos en curso"
            icon={<UserCog size={18} />}
            tone="green"
          />
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <DashboardCard
            title="Administración de cuentas"
            subtitle="Consulte usuarios, roles y actividad reciente."
            icon={<Users size={18} />}
            tone="white"
          >
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center rounded-xl border border-neutral-200 bg-white px-4 py-3 w-full md:max-w-[420px]">
                <input
                  type="text"
                  placeholder="Buscar por nombre o correo"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
                />
              </div>

              <div className="flex gap-3">
                <select className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 outline-none">
                  <option>Todos los roles</option>
                  <option>Administrador</option>
                  <option>Revisor</option>
                  <option>Usuario</option>
                </select>

                <button className="inline-flex items-center gap-2 rounded-xl bg-[#0f5c3a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4a2f]">
                  <UserPlus size={16} />
                  Nuevo usuario
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[18px] border border-neutral-200 bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-[#f8faf8]">
                    <tr className="text-left text-neutral-600">
                      <th className="px-4 py-3 font-semibold">Nombre</th>
                      <th className="px-4 py-3 font-semibold">Correo</th>
                      <th className="px-4 py-3 font-semibold">Rol</th>
                      <th className="px-4 py-3 font-semibold">Estado</th>
                      <th className="px-4 py-3 font-semibold">Último acceso</th>
                      <th className="px-4 py-3 font-semibold">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {usuarios.map((user) => (
                      <tr key={user.correo} className="border-t border-neutral-200">
                        <td className="px-4 py-3 font-semibold text-neutral-900">
                          {user.nombre}
                        </td>
                        <td className="px-4 py-3 text-neutral-700">{user.correo}</td>
                        <td className="px-4 py-3 text-neutral-700">{user.rol}</td>
                        <td className="px-4 py-3">
                          <StatusBadge
                            status={user.estado === "Activo" ? "En revisión" : "Borrador"}
                          />
                        </td>
                        <td className="px-4 py-3 text-neutral-700">
                          {user.ultimoAcceso}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50">
                              Editar
                            </button>
                            <button className="rounded-lg border border-[#0f5c3a] px-3 py-1.5 text-xs font-semibold text-[#0f5c3a] transition hover:bg-green-50">
                              Permisos
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Roles y control de acceso"
            subtitle="Distribución y estado del sistema de permisos."
            icon={<ShieldCheck size={18} />}
            tone="green"
          >
            <div className="space-y-4">
              <RoleCard
                title="Administrador"
                description="Gestión total del sistema, usuarios y revisiones."
                users="4 usuarios"
              />
              <RoleCard
                title="Revisor"
                description="Validación de solicitudes y anexos pendientes."
                users="6 usuarios"
              />
              <RoleCard
                title="Usuario"
                description="Creación y seguimiento de solicitudes propias."
                users="14 usuarios"
              />
            </div>

            <div className="mt-6 rounded-[18px] border border-neutral-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-neutral-900">
                Política actual
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Los administradores pueden asignar roles, bloquear cuentas y
                habilitar revisores por facultad.
              </p>
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardShell>
  );
}

function RoleCard({
  title,
  description,
  users,
}: {
  title: string;
  description: string;
  users: string;
}) {
  return (
    <div className="rounded-[18px] border border-neutral-200 bg-white p-5 shadow-sm">
      <p className="text-base font-bold text-neutral-900">{title}</p>
      <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
      <p className="mt-3 text-sm font-semibold text-[#0f5c3a]">{users}</p>
    </div>
  );
}