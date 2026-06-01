"use client";
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

import { useEffect, useState } from "react";

type Solicitud = {
  id: string;
  numeroActa: string;
  fechaActaAprobacion: string;
  programa: {
    id: string;
    codigo: number;
    nombre: string;
    unidadAcademica: {
      id: string;
      nombre: string;
    };
  };
  perfilAspirante: string;
  correoDocumentacion: string;
  diasHabilesRecepcion: number;
  puntajeMinimoCorte: number;
  cupoMinCohorte: number;
  cupoMaxCohorte: number;
  cupoEstudiantes: number;
  plazasDisponibles: boolean;
  estado: "BORRADOR" | "PENDIENTE_ANEXOS" | "ENVIADA" | string;
  enviada: boolean;
  rutaDocumento: string;

  usuario: {
    id: string;
    correo: string;
    rol: string;
  };
};


export default function AdminDashboardPage() {

  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchSolicitudes = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:8080/api/cohort-applications");
      if (!res.ok) throw new Error("Error al obtener solicitudes");

      const data: Solicitud[] = await res.json();
      setSolicitudes(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchSolicitudes();
}, []);

  const solicitudesActivas = solicitudes.filter(
    (s) => s.enviada === true
  );

  const anexosPendientes = solicitudes.filter(
  (s) => !s.rutaDocumento || s.rutaDocumento.trim() === ""
);

const usuariosActivos = new Set(
  solicitudes
    .filter((s) => s.usuario)
    .map((s) => s.usuario.id)
);

const totalUsuariosActivos = usuariosActivos.size;

if (loading) {
  return <p className="p-4">Cargando solicitudes...</p>;
}

if (error) {
  return <p className="p-4 text-red-500">{error}</p>;
}

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
            value={loading ? "..." : String(solicitudesActivas.length)}
            change=""
            icon={<ClipboardList size={18} />}
            tone="green"
          />

          <KpiCard
            title="Anexos pendientes"
            value={loading ? "..." : String(anexosPendientes.length)}
            change=""
            icon={<Paperclip size={18} />}
            tone="white"
          />
          <KpiCard
            title="Usuarios activos"
            value={loading ? "..." : String(totalUsuariosActivos)}
            change=""
            icon={<Users size={18} />}
            tone="green"
          />
        </section>

        
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