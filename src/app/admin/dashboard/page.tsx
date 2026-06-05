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

type Revision = {
  id: string;
  status: string;
  reviewDate: string;


  cohortApplication: {
    id: string;
    programa: {
      nombre: string;
    };
  };
}


export default function AdminDashboardPage() {

const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [revisiones, setRevisiones] = useState<Revision[]>([]);

const pendientes = solicitudes.filter(
  (solicitud) =>
    !revisiones.some(
      (revision) =>
        revision.cohortApplication?.id === solicitud.id
    )
).length;

const devueltas = revisiones.filter(
  (r) => r.status === "DEVUELTA"
).length;

const cerradas = revisiones.filter(
  (r) => r.status === "REVISADA"
).length;

const revisadas = devueltas + cerradas;

const total = solicitudes.length;

const porcentajePendientes =
  total > 0 ? Math.round((pendientes / total) * 100) : 0;

const porcentajeRevisadas =
  total > 0 ? Math.round((revisadas / total) * 100) : 0;

const porcentajeCerradas =
  total > 0 ? Math.round((cerradas / total) * 100) : 0;

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

const revisionesRecientes = [...revisiones]
  .sort(
    (a, b) =>
      new Date(b.reviewDate).getTime() -
      new Date(a.reviewDate).getTime()
  )
  .slice(0, 10);

const fetchRevisiones = async () => {
  const res = await fetch("http://localhost:8080/api/revisions");

  if (!res.ok) {
    throw new Error("Error al obtener revisiones");
  }

  const data = await res.json();
  setRevisiones(data);
};

useEffect(() => {
  const cargarDatos = async () => {
    try {
      setLoading(true);

      const [solicitudesRes, revisionesRes] = await Promise.all([
        fetch("http://localhost:8080/api/cohort-applications"),
        fetch("http://localhost:8080/api/revisions"),
      ]);

      const solicitudesData = await solicitudesRes.json();
      const revisionesData = await revisionesRes.json();

      setSolicitudes(solicitudesData);
      setRevisiones(revisionesData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  cargarDatos();
}, []);

const solicitudesActivas = solicitudes.filter(
  (solicitud) =>
    !revisiones.some(
      (revision) =>
        revision.cohortApplication?.id === solicitud.id
    )
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
                      <th className="px-4 py-3 font-semibold">Estado</th>
                      <th className="px-4 py-3 font-semibold">Fecha</th>
                    </tr>
                  </thead>

                  <tbody>
    {revisionesRecientes.map((revision) => (
      <tr
        key={revision.id}
        className="border-t border-neutral-200"
      >
        <td className="px-4 py-3 font-medium">
          {revision.cohortApplication?.id}
        </td>

        <td className="px-4 py-3">
          {revision.cohortApplication?.programa?.nombre}
        </td>

        <td className="px-4 py-3">
          <StatusBadge status={revision.status} />
        </td>

        <td className="px-4 py-3">
          {new Date(
            revision.reviewDate
          ).toLocaleDateString("es-CO")}
        </td>
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
  <ProgressRow
    label={`Solicitudes revisadas (${revisadas})`}
    value={porcentajeRevisadas}
  />

  <ProgressRow
    label={`Aprobaciones finales (${cerradas})`}
    value={porcentajeCerradas}
  />

  <ProgressRow
    label={`Pendientes (${pendientes})`}
    value={porcentajePendientes}
  />
</div>
            </DashboardCard>

            
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