import {
  ClipboardList,
  FileClock,
  Filter,
  FolderKanban,
  SearchCheck,
  Send,
} from "lucide-react";
import DashboardShell from "../../../../components/dashboard/DashboardShell";
import DashboardCard from "../../../../components/dashboard/DashboardCard";
import KpiCard from "../../../../components/dashboard/KpiCard";
import StatusBadge from "../../../../components/dashboard/StatusBadge";

const solicitudes = [
  {
    codigo: "SOL-2026-001",
    programa: "Ingeniería de Sistemas",
    cohorte: "2026-1",
    responsable: "María Gómez",
    estado: "En revisión",
    fecha: "2026-04-18",
  },
  {
    codigo: "SOL-2026-002",
    programa: "Ciencia de Datos",
    cohorte: "2026-1",
    responsable: "Carlos Ruiz",
    estado: "Pendiente anexos",
    fecha: "2026-04-17",
  },
  {
    codigo: "SOL-2026-003",
    programa: "Arquitectura de Software",
    cohorte: "2026-2",
    responsable: "Laura Pérez",
    estado: "Borrador",
    fecha: "2026-04-16",
  },
  {
    codigo: "SOL-2026-004",
    programa: "Maestría en Educación",
    cohorte: "2026-1",
    responsable: "Andrés López",
    estado: "Enviada",
    fecha: "2026-04-15",
  },
];

export default function AdminSolicitudesPage() {
  return (
    <DashboardShell
      title="Gestión de solicitudes"
      subtitle="Administre, filtre y supervise el estado de todas las solicitudes registradas en el sistema."
      roleLabel="Administrador"
      activeRole="admin"
    >
      <div className="space-y-8">
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Total solicitudes"
            value="18"
            change="Periodo actual"
            icon={<ClipboardList size={18} />}
            tone="green"
          />
          <KpiCard
            title="En revisión"
            value="7"
            change="Pendientes de validar"
            icon={<SearchCheck size={18} />}
            tone="cream"
          />
          <KpiCard
            title="Enviadas"
            value="12"
            change="Con radicación completa"
            icon={<Send size={18} />}
            tone="white"
          />
          <KpiCard
            title="Borradores"
            value="6"
            change="Sin envío final"
            icon={<FileClock size={18} />}
            tone="green"
          />
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <DashboardCard
            title="Bandeja de solicitudes"
            subtitle="Listado consolidado con estado, responsable y fecha."
            icon={<FolderKanban size={18} />}
            tone="white"
          >
            <div className="mb-5 grid gap-4 md:grid-cols-4">
              <div className="flex items-center rounded-xl border border-neutral-200 bg-white px-4 py-3 md:col-span-2">
                <Filter size={16} className="mr-2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Buscar por código, programa o responsable"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
                />
              </div>

              <select className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 outline-none">
                <option>Todas las facultades</option>
                <option>Ingeniería</option>
                <option>Ciencias</option>
                <option>Educación</option>
              </select>

              <select className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 outline-none">
                <option>Todos los estados</option>
                <option>Borrador</option>
                <option>En revisión</option>
                <option>Pendiente anexos</option>
                <option>Enviada</option>
              </select>
            </div>

            <div className="overflow-hidden rounded-[18px] border border-neutral-200 bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-[#f8faf8]">
                    <tr className="text-left text-neutral-600">
                      <th className="px-4 py-3 font-semibold">Código</th>
                      <th className="px-4 py-3 font-semibold">Programa</th>
                      <th className="px-4 py-3 font-semibold">Cohorte</th>
                      <th className="px-4 py-3 font-semibold">Responsable</th>
                      <th className="px-4 py-3 font-semibold">Estado</th>
                      <th className="px-4 py-3 font-semibold">Fecha</th>
                      <th className="px-4 py-3 font-semibold">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {solicitudes.map((row) => (
                      <tr key={row.codigo} className="border-t border-neutral-200">
                        <td className="px-4 py-3 font-semibold text-[#0f5c3a]">
                          {row.codigo}
                        </td>
                        <td className="px-4 py-3 text-neutral-700">{row.programa}</td>
                        <td className="px-4 py-3 text-neutral-700">{row.cohorte}</td>
                        <td className="px-4 py-3 text-neutral-700">{row.responsable}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={row.estado} />
                        </td>
                        <td className="px-4 py-3 text-neutral-700">{row.fecha}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="rounded-lg border border-[#0f5c3a] px-3 py-1.5 text-xs font-semibold text-[#0f5c3a] transition hover:bg-green-50">
                              Ver
                            </button>
                            <button className="rounded-lg bg-[#0f5c3a] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#0b4a2f]">
                              Gestionar
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
            title="Resumen operativo"
            subtitle="Distribución y seguimiento del módulo."
            icon={<ClipboardList size={18} />}
            tone="green"
          >
            <div className="space-y-5">
              <ProgressRow label="Solicitudes completas" value={67} />
              <ProgressRow label="Con anexos pendientes" value={22} />
              <ProgressRow label="En revisión activa" value={48} />
              <ProgressRow label="Radicadas" value={39} />
            </div>

            <div className="mt-6 grid gap-4">
              <MiniInfo title="Pendientes críticas" value="3" />
              <MiniInfo title="Programas con más actividad" value="Ingeniería" />
              <MiniInfo title="Última actualización masiva" value="Hoy 08:40" />
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardShell>
  );
}

function ProgressRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-neutral-700">{label}</span>
        <span className="font-semibold text-[#0f5c3a]">{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-[#0f5c3a]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function MiniInfo({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-[18px] border border-neutral-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-neutral-500">{title}</p>
      <p className="mt-2 text-lg font-bold text-neutral-900">{value}</p>
    </div>
  );
}