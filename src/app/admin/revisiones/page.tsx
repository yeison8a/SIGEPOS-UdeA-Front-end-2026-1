import {
  CheckCircle2,
  Clock3,
  FileSearch,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import DashboardShell from "../../../../components/dashboard/DashboardShell";
import DashboardCard from "../../../../components/dashboard/DashboardCard";
import KpiCard from "../../../../components/dashboard/KpiCard";
import StatusBadge from "../../../../components/dashboard/StatusBadge";

const revisiones = [
  {
    codigo: "REV-001",
    solicitud: "SOL-2026-001",
    programa: "Ingeniería de Sistemas",
    revisor: "Laura Pérez",
    prioridad: "Alta",
    estado: "En revisión",
  },
  {
    codigo: "REV-002",
    solicitud: "SOL-2026-002",
    programa: "Ciencia de Datos",
    revisor: "Daniel Rojas",
    prioridad: "Media",
    estado: "Pendiente anexos",
  },
  {
    codigo: "REV-003",
    solicitud: "SOL-2026-004",
    programa: "Maestría en Educación",
    revisor: "Laura Pérez",
    prioridad: "Baja",
    estado: "Enviada",
  },
];

export default function AdminRevisionesPage() {
  return (
    <DashboardShell
      title="Revisiones"
      subtitle="Controle la bandeja de revisión, prioridades y decisiones del proceso administrativo."
      roleLabel="Administrador"
      activeRole="admin"
    >
      <div className="space-y-8">
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Pendientes revisión"
            value="7"
            change="Bandeja actual"
            icon={<FileSearch size={18} />}
            tone="green"
          />
          <KpiCard
            title="Alta prioridad"
            value="2"
            change="Requieren atención hoy"
            icon={<TriangleAlert size={18} />}
            tone="cream"
          />
          <KpiCard
            title="En curso"
            value="4"
            change="Asignadas a revisores"
            icon={<Clock3 size={18} />}
            tone="white"
          />
          <KpiCard
            title="Cerradas"
            value="11"
            change="Proceso finalizado"
            icon={<CheckCircle2 size={18} />}
            tone="green"
          />
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <DashboardCard
            title="Bandeja de revisión"
            subtitle="Solicitudes asignadas con prioridad y estado."
            icon={<ShieldCheck size={18} />}
            tone="white"
          >
            <div className="mb-5 grid gap-4 md:grid-cols-3">
              <select className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 outline-none">
                <option>Todos los revisores</option>
                <option>Laura Pérez</option>
                <option>Daniel Rojas</option>
              </select>

              <select className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 outline-none">
                <option>Todas las prioridades</option>
                <option>Alta</option>
                <option>Media</option>
                <option>Baja</option>
              </select>

              <select className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 outline-none">
                <option>Todos los estados</option>
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
                      <th className="px-4 py-3 font-semibold">Solicitud</th>
                      <th className="px-4 py-3 font-semibold">Programa</th>
                      <th className="px-4 py-3 font-semibold">Revisor</th>
                      <th className="px-4 py-3 font-semibold">Prioridad</th>
                      <th className="px-4 py-3 font-semibold">Estado</th>
                      <th className="px-4 py-3 font-semibold">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {revisiones.map((row) => (
                      <tr key={row.codigo} className="border-t border-neutral-200">
                        <td className="px-4 py-3 font-semibold text-[#0f5c3a]">
                          {row.codigo}
                        </td>
                        <td className="px-4 py-3 text-neutral-700">{row.solicitud}</td>
                        <td className="px-4 py-3 text-neutral-700">{row.programa}</td>
                        <td className="px-4 py-3 text-neutral-700">{row.revisor}</td>
                        <td className="px-4 py-3">
                          <PriorityBadge value={row.prioridad} />
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={row.estado} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50">
                              Ver
                            </button>
                            <button className="rounded-lg bg-[#0f5c3a] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#0b4a2f]">
                              Resolver
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
            title="Control del equipo revisor"
            subtitle="Carga actual y estado del proceso."
            icon={<FileSearch size={18} />}
            tone="green"
          >
            <div className="space-y-4">
              <ReviewerCard
                name="Laura Pérez"
                assigned="3 revisiones"
                status="Alta carga"
              />
              <ReviewerCard
                name="Daniel Rojas"
                assigned="2 revisiones"
                status="Carga media"
              />
              <ReviewerCard
                name="Equipo académico"
                assigned="2 validaciones"
                status="Disponible"
              />
            </div>

            <div className="mt-6 rounded-[18px] border border-neutral-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-neutral-900">
                Observación general
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Las revisiones de alta prioridad deben resolverse antes del cierre
                semanal para evitar retrasos en radicación.
              </p>
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardShell>
  );
}

function PriorityBadge({ value }: { value: string }) {
  const styles =
    value === "Alta"
      ? "bg-rose-50 text-rose-600"
      : value === "Media"
      ? "bg-[#fffaf0] text-[#8a6d1f]"
      : "bg-green-100 text-[#0f5c3a]";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      {value}
    </span>
  );
}

function ReviewerCard({
  name,
  assigned,
  status,
}: {
  name: string;
  assigned: string;
  status: string;
}) {
  return (
    <div className="rounded-[18px] border border-neutral-200 bg-white p-5 shadow-sm">
      <p className="text-base font-bold text-neutral-900">{name}</p>
      <p className="mt-2 text-sm text-neutral-600">{assigned}</p>
      <p className="mt-3 text-sm font-semibold text-[#0f5c3a]">{status}</p>
    </div>
  );
}