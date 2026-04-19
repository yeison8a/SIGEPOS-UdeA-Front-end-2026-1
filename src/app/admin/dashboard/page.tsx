import {
  Activity,
  BellRing,
  CheckCircle2,
  ClipboardList,
  FileClock,
  FolderKanban,
  Paperclip,
  ShieldCheck,
  Users,
} from "lucide-react";
import DashboardShell from "../../../../components/dashboard/DashboardShell";
import DashboardCard from "../../../../components/dashboard/DashboardCard";
import KpiCard from "../../../../components/dashboard/KpiCard";
import StatusBadge from "../../../../components/dashboard/StatusBadge";

const recentSolicitudes = [
  {
    id: "SOL-2026-001",
    programa: "Ingeniería de Sistemas",
    cohorte: "2026-1",
    estado: "En revisión",
    fecha: "2026-04-18",
  },
  {
    id: "SOL-2026-002",
    programa: "Ciencia de Datos",
    cohorte: "2026-1",
    estado: "Pendiente anexos",
    fecha: "2026-04-17",
  },
  {
    id: "SOL-2026-003",
    programa: "Arquitectura de Software",
    cohorte: "2026-2",
    estado: "Borrador",
    fecha: "2026-04-16",
  },
  {
    id: "SOL-2026-004",
    programa: "Maestría en Educación",
    cohorte: "2026-1",
    estado: "Enviada",
    fecha: "2026-04-15",
  },
];

export default function AdminDashboardPage() {
  return (
    <DashboardShell
      title="Dashboard administrador"
      subtitle="Supervise solicitudes, valide anexos, controle estados y gestione el flujo institucional del portal."
      roleLabel="Administrador"
      activeRole="admin"
    >
      <div className="space-y-8">
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Solicitudes activas"
            value="18"
            change="+3 esta semana"
            icon={<ClipboardList size={18} />}
            tone="green"
          />
          <KpiCard
            title="En revisión"
            value="7"
            change="2 priorizadas hoy"
            icon={<ShieldCheck size={18} />}
            tone="cream"
          />
          <KpiCard
            title="Anexos pendientes"
            value="4"
            change="1 nueva alerta"
            icon={<Paperclip size={18} />}
            tone="white"
          />
          <KpiCard
            title="Usuarios activos"
            value="24"
            change="+5 ingresos recientes"
            icon={<Users size={18} />}
            tone="green"
          />
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <DashboardCard
            title="Flujo administrativo"
            subtitle="Vista general del estado operativo del portal."
            icon={<FolderKanban size={18} />}
            tone="green"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <InfoPanel
                title="Solicitudes listas para validación"
                value="5"
                text="Documentación completa y listas para revisión formal."
              />
              <InfoPanel
                title="Procesos con bloqueo"
                value="2"
                text="Requieren atención por inconsistencias detectadas."
              />
              <InfoPanel
                title="Cohortes activas"
                value="5"
                text="Con seguimiento administrativo en este periodo."
              />
              <InfoPanel
                title="Tiempo promedio de revisión"
                value="2.4 días"
                text="Promedio institucional actualizado."
              />
            </div>
          </DashboardCard>

          <DashboardCard
            title="Alertas prioritarias"
            subtitle="Elementos que requieren atención inmediata."
            icon={<BellRing size={18} />}
            tone="cream"
          >
            <div className="space-y-4">
              <AlertItem
                title="Solicitudes con anexos incompletos"
                description="Hay 4 procesos con soportes faltantes."
                priority="alta"
              />
              <AlertItem
                title="Revisión final pendiente"
                description="2 solicitudes están listas para aprobación."
                priority="media"
              />
              <AlertItem
                title="Cierre cercano de convocatoria"
                description="Una cohorte cierra inscripciones en menos de 48 horas."
                priority="baja"
              />
            </div>
          </DashboardCard>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <DashboardCard
            title="Solicitudes recientes"
            subtitle="Últimos movimientos registrados en el sistema."
            icon={<FileClock size={18} />}
            tone="white"
          >
            <div className="overflow-hidden rounded-[18px] border border-neutral-200 bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-[#f8faf8]">
                    <tr className="text-left text-neutral-600">
                      <th className="px-4 py-3 font-semibold">Código</th>
                      <th className="px-4 py-3 font-semibold">Programa</th>
                      <th className="px-4 py-3 font-semibold">Cohorte</th>
                      <th className="px-4 py-3 font-semibold">Estado</th>
                      <th className="px-4 py-3 font-semibold">Fecha</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentSolicitudes.map((row) => (
                      <tr key={row.id} className="border-t border-neutral-200">
                        <td className="px-4 py-3 font-semibold text-[#0f5c3a]">
                          {row.id}
                        </td>
                        <td className="px-4 py-3 text-neutral-700">{row.programa}</td>
                        <td className="px-4 py-3 text-neutral-700">{row.cohorte}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={row.estado} />
                        </td>
                        <td className="px-4 py-3 text-neutral-700">{row.fecha}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </DashboardCard>

          <div className="space-y-8">
            <DashboardCard
              title="Rendimiento del proceso"
              subtitle="Indicadores clave del ciclo de revisión."
              icon={<Activity size={18} />}
              tone="green"
            >
              <div className="space-y-5">
                <ProgressRow label="Solicitudes revisadas" value={84} />
                <ProgressRow label="Anexos verificados" value={68} />
                <ProgressRow label="Procesos enviados" value={52} />
                <ProgressRow label="Aprobaciones finales" value={41} />
              </div>
            </DashboardCard>

            <div className="overflow-hidden rounded-[24px] bg-[#0f5c3a] text-white shadow-lg">
              <div className="border-b border-white/10 px-6 py-5">
                <p className="text-sm font-semibold text-green-100">
                  Panel ejecutivo
                </p>
                <h3 className="mt-1 text-xl font-bold">Resumen institucional</h3>
              </div>

              <div className="grid gap-4 p-6">
                <MetricBlock label="Solicitudes en borrador" value="6" />
                <MetricBlock label="Solicitudes enviadas" value="12" />
                <MetricBlock label="Procesos aprobados" value="9" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function InfoPanel({
  title,
  value,
  text,
}: {
  title: string;
  value: string;
  text: string;
}) {
  return (
    <div className="rounded-[18px] border border-neutral-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-neutral-500">{title}</p>
      <p className="mt-2 text-2xl font-extrabold text-neutral-900">{value}</p>
      <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
    </div>
  );
}

function AlertItem({
  title,
  description,
  priority,
}: {
  title: string;
  description: string;
  priority: "alta" | "media" | "baja";
}) {
  const badgeClass =
    priority === "alta"
      ? "bg-rose-50 text-rose-600"
      : priority === "media"
      ? "bg-[#fffaf0] text-[#8a6d1f]"
      : "bg-green-100 text-[#0f5c3a]";

  return (
    <div className="rounded-[18px] border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-bold text-neutral-900">{title}</h3>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>
          {priority}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-neutral-600">{description}</p>
    </div>
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

function MetricBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white/10 px-4 py-4">
      <p className="text-sm text-white/75">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}