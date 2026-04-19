import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileClock,
  FolderOpen,
  GraduationCap,
  ListTodo,
  Paperclip,
  Send,
} from "lucide-react";
import DashboardShell from "../../../../components/dashboard/DashboardShell";
import DashboardCard from "../../../../components/dashboard/DashboardCard";
import KpiCard from "../../../../components/dashboard/KpiCard";
import StatusBadge from "../../../../components/dashboard/StatusBadge";

const misSolicitudes = [
  {
    id: "SOL-2026-010",
    programa: "Ingeniería de Sistemas",
    cohorte: "2026-1",
    estado: "Borrador",
    fecha: "2026-04-18",
  },
  {
    id: "SOL-2026-011",
    programa: "Ciencia de Datos",
    cohorte: "2026-2",
    estado: "Pendiente anexos",
    fecha: "2026-04-16",
  },
];

export default function UsuarioDashboardPage() {
  return (
    <DashboardShell
      title="Dashboard usuario"
      subtitle="Administre sus solicitudes, complete anexos y dé seguimiento a cada etapa del proceso."
      roleLabel="Usuario"
      activeRole="usuario"
    >
      <div className="space-y-8">
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Mis solicitudes"
            value="2"
            change="1 actualización reciente"
            icon={<ClipboardList size={18} />}
            tone="green"
          />
          <KpiCard
            title="En borrador"
            value="1"
            change="Pendiente completar"
            icon={<FileClock size={18} />}
            tone="cream"
          />
          <KpiCard
            title="Pendientes anexos"
            value="1"
            change="Requiere documentos"
            icon={<Paperclip size={18} />}
            tone="white"
          />
          <KpiCard
            title="Enviadas"
            value="0"
            change="Aún sin envío final"
            icon={<Send size={18} />}
            tone="green"
          />
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <DashboardCard
            title="Continúa tu proceso"
            subtitle="Acciones más frecuentes para completar tu solicitud."
            icon={<FolderOpen size={18} />}
            tone="green"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <ActionBlock
                title="Crear solicitud"
                text="Iniciar una nueva solicitud de apertura."
                href="/solicitud-cohorte/informacion"
                icon={<ClipboardList size={18} />}
              />
              <ActionBlock
                title="Editar descripción"
                text="Completar perfil del aspirante y criterios."
                href="/solicitud-cohorte/descripcion"
                icon={<ListTodo size={18} />}
              />
              <ActionBlock
                title="Configurar cohorte"
                text="Registrar estímulos y datos asociados."
                href="/solicitud-cohorte/cohorte"
                icon={<GraduationCap size={18} />}
              />
              <ActionBlock
                title="Subir anexos"
                text="Adjuntar documentación pendiente."
                href="/solicitud-cohorte/anexos-1"
                icon={<Paperclip size={18} />}
              />
            </div>
          </DashboardCard>

          <DashboardCard
            title="Mi progreso"
            subtitle="Estado actual de tu solicitud principal."
            icon={<CheckCircle2 size={18} />}
            tone="cream"
          >
            <div className="space-y-5">
              <ProgressRow label="Información general" value={100} />
              <ProgressRow label="Descripción" value={82} />
              <ProgressRow label="Cohorte" value={60} />
              <ProgressRow label="Anexos" value={45} />
              <ProgressRow label="Envío final" value={20} />
            </div>

            <div className="mt-6 rounded-[18px] border border-green-200 bg-white p-4">
              <p className="text-sm font-semibold text-neutral-900">
                Próxima acción sugerida
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Completar los anexos pendientes para poder avanzar al envío final.
              </p>
            </div>
          </DashboardCard>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <DashboardCard
            title="Mis solicitudes recientes"
            subtitle="Resumen de procesos registrados en tu cuenta."
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
                    {misSolicitudes.map((row) => (
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

          <DashboardCard
            title="Agenda y seguimiento"
            subtitle="Recordatorios clave de tu flujo actual."
            icon={<CalendarDays size={18} />}
            tone="green"
          >
            <div className="space-y-4">
              <TimelineItem
                title="Completar anexos"
                text="Pendiente esta semana"
                active
              />
              <TimelineItem
                title="Revisión final"
                text="Disponible cuando termines anexos"
              />
              <TimelineItem
                title="Enviar solicitud"
                text="Último paso del proceso"
              />
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardShell>
  );
}

function ActionBlock({
  title,
  text,
  href,
  icon,
}: {
  title: string;
  text: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="rounded-[18px] border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-[2px]"
    >
      <div className="rounded-2xl bg-green-100 p-3 text-[#0f5c3a] w-fit">
        {icon}
      </div>
      <p className="mt-4 text-base font-bold text-neutral-900">{title}</p>
      <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
    </a>
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

function TimelineItem({
  title,
  text,
  active = false,
}: {
  title: string;
  text: string;
  active?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={`mt-1 h-3.5 w-3.5 rounded-full ${
            active ? "bg-[#0f5c3a]" : "bg-neutral-300"
          }`}
        />
        <div className="mt-1 h-full w-[2px] bg-neutral-200" />
      </div>

      <div className="pb-5">
        <p className="text-sm font-semibold text-neutral-900">{title}</p>
        <p className="mt-1 text-sm text-neutral-600">{text}</p>
      </div>
    </div>
  );
}