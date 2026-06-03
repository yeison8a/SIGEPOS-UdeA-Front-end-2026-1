"use client";
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
import { useEffect, useState } from "react";

type CohortApplication = {
  id: string;
  numeroActa: string;
  fechaActaAprobacion: string;
  perfilAspirante: string;
  correoDocumentacion: string;
  diasHabilesRecepcion: number;
  puntajeMinimoCorte: number;
  cupoMinCohorte: number;
  cupoMaxCohorte: number;
  cupoEstudiantes: number;
  plazasDisponibles: boolean;
  estado: string;
  enviada: boolean;
  rutaDocumento: string;

  documento: {
    id: string;
    nombre: string;
    url: string;
    fechaSubida: string;
  };

  programa: {
    codigo: number;
    nombre: string;
    unidadAcademica: {
      nombre: string;
    };
  };

  usuario: {
    id: string;
    username: string;
    correo: string;
  };
};

type Revision = {
  id: string;
  priority: string;
  status: string;
  observations: string;
  reviewDate: string;

  cohortApplication: {
    id: string
  };
};

export default function AdminRevisionesPage() {
const [revisiones, setRevisiones] = useState<Revision[]>([]);
  const [solicitudes, setSolicitudes] = useState<CohortApplication[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const cargarSolicitudes = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/cohort-applications"
      );

      if (!response.ok) {
        throw new Error("Error al obtener solicitudes");
      }

      const data = await response.json();

      setSolicitudes(data);
      console.log(solicitudes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  cargarSolicitudes();
  cargarRevisiones();
}, []);

const [openViewModal, setOpenViewModal] = useState(false);

const [solicitudSeleccionada, setSolicitudSeleccionada] =
  useState<CohortApplication | null>(null);


  const [openResolverModal, setOpenResolverModal] = useState(false);

const [revisionForm, setRevisionForm] = useState({
  priority: "",
  status: "",
  observations: "",
});

const crearRevision = async () => {
  try {
    const reviewerId = localStorage.getItem("userId");

    const response = await fetch(
      "http://localhost:8080/api/revisions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cohortApplicationId: solicitudSeleccionada?.id,
          reviewerId: solicitudSeleccionada?.usuario.id,
          priority: revisionForm.priority,
          status: revisionForm.status,
          observations: revisionForm.observations,
        }),
      }
    );
    
    if (!response.ok) {
      throw new Error("Error creando revisión");
    }

    await cargarRevisiones();
    
    setRevisionForm({
      priority: "",
      status: "",
      observations: "",
    });
    setOpenResolverModal(false);

    alert("Revisión creada correctamente");

  } catch (error) {
    console.error(error);
    alert("No fue posible crear la revisión");
  }
};


const pendientesRevision = solicitudes.filter(
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


const cargarRevisiones = async () => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/revisions"
    );

    if (!response.ok) {
      throw new Error("Error al obtener revisiones");
    }

    const data = await response.json();

    setRevisiones(data);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const obtenerEstadoRevision = (solicitudId: string) => {
  const revision = revisiones.find(
    (r) => r.cohortApplication?.id === solicitudId
  );

  return revision?.status || "SIN REVISIÓN";
};

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
            value={pendientesRevision.toString()}
            change="Bandeja actual"
            icon={<FileSearch size={18} />}
            tone="green"
          />

                    <KpiCard
            title="Devueltas"
            value={devueltas.toString()}
            change=""
            icon={<CheckCircle2 size={18} />}
            tone="green"
          />

          <KpiCard
            title="Cerradas"
            value={cerradas.toString()}
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

            <div className="overflow-hidden rounded-[18px] border border-neutral-200 bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-[#f8faf8]">
                    <tr className="text-left text-neutral-600">
                      <th className="px-4 py-3 font-semibold">ID</th>
                      <th className="px-4 py-3 font-semibold">Programa</th>
                      <th className="px-4 py-3 font-semibold">Solicitante</th>
                      <th className="px-4 py-3 font-semibold">Estado</th>
                      <th className="px-4 py-3 font-semibold">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {solicitudes.map((row) => (
                      <tr key={row.id} className="border-t border-neutral-200">
                        <td className="px-4 py-3 font-semibold text-[#0f5c3a]">
                          {row.id}
                        </td>
                        <td className="px-4 py-3 text-neutral-700">{row.programa.nombre}</td>
                        <td className="px-4 py-3 text-neutral-700">{row.usuario.username}</td>
                        <td className="px-4 py-3">
                          <StatusBadge
                            status={obtenerEstadoRevision(row.id)}
                          />
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button 
                            onClick={() => {
                              setSolicitudSeleccionada(row);
                              setOpenViewModal(true);
                            }}
                            className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50">
                              Ver
                            </button>
                            <button 
                            onClick={() => {
                              setSolicitudSeleccionada(row);
                              setOpenResolverModal(true);
                            }}
                            className="rounded-lg bg-[#0f5c3a] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#0b4a2f]">
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

        </div>
      </div>

      {openViewModal && solicitudSeleccionada && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
      <h2 className="mb-6 text-xl font-bold">
        Detalle de la solicitud
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        <div>
          <p className="text-xs text-neutral-500">ID</p>
          <p>{solicitudSeleccionada.id}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">Estado</p>
          <p>{solicitudSeleccionada.estado}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">Número Acta</p>
          <p>{solicitudSeleccionada.numeroActa}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">Fecha Acta</p>
          <p>{solicitudSeleccionada.fechaActaAprobacion}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">Programa</p>
          <p>{solicitudSeleccionada.programa?.nombre}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">Código Programa</p>
          <p>{solicitudSeleccionada.programa?.codigo}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">Unidad Académica</p>
          <p>
            {solicitudSeleccionada.programa?.unidadAcademica?.nombre}
          </p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">Perfil Aspirante</p>
          <p>{solicitudSeleccionada.perfilAspirante}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">
            Correo Documentación
          </p>
          <p>{solicitudSeleccionada.correoDocumentacion}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">
            Días Hábiles Recepción
          </p>
          <p>{solicitudSeleccionada.diasHabilesRecepcion}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">
            Puntaje Mínimo Corte
          </p>
          <p>{solicitudSeleccionada.puntajeMinimoCorte}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">
            Cupo Mínimo
          </p>
          <p>{solicitudSeleccionada.cupoMinCohorte}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">
            Cupo Máximo
          </p>
          <p>{solicitudSeleccionada.cupoMaxCohorte}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">
            Cupo Estudiantes
          </p>
          <p>{solicitudSeleccionada.cupoEstudiantes}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">
            Plazas Disponibles
          </p>
          <p>
            {solicitudSeleccionada.plazasDisponibles
              ? "Sí"
              : "No"}
          </p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">
            Usuario
          </p>
          <p>{solicitudSeleccionada.usuario?.username}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">
            Correo Usuario
          </p>
          <p>{solicitudSeleccionada.usuario?.correo}</p>
        </div>

        <div>
  <p className="text-xs text-neutral-500">
    Documento
  </p>

  <a
    href={solicitudSeleccionada.documento?.url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline"
  >
    
    Ver documento
  </a>
  
</div>

      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setOpenViewModal(false)}
          className="rounded-lg bg-[#0f5c3a] px-4 py-2 text-white"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
)}



{openResolverModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-full max-w-lg rounded-2xl bg-white p-6">
      <h2 className="mb-4 text-lg font-bold">
        Crear revisión
      </h2>

      <div className="space-y-4">
        <select
          value={revisionForm.priority}
          onChange={(e) =>
            setRevisionForm({
              ...revisionForm,
              priority: e.target.value,
            })
          }
          className="w-full rounded-lg border p-3"
        >
          <option value="">Seleccione prioridad</option>
          <option value="ALTA">Alta</option>
          <option value="MEDIA">Media</option>
          <option value="BAJA">Baja</option>
        </select>

        <select
          value={revisionForm.status}
          onChange={(e) =>
            setRevisionForm({
              ...revisionForm,
              status: e.target.value,
            })
          }
          className="w-full rounded-lg border p-3"
        >
          <option value="">Seleccione estado</option>
          <option value="PENDIENTE">Pendiente</option>
          <option value="REVISADA">Revisada</option>
          <option value="DEVUELTA">Devuelta</option>         
        </select>

        <textarea
          rows={4}
          placeholder="Observaciones"
          value={revisionForm.observations}
          onChange={(e) =>
            setRevisionForm({
              ...revisionForm,
              observations: e.target.value,
            })
          }
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => setOpenResolverModal(false)}
          className="rounded-lg border px-4 py-2"
        >
          Cancelar
        </button>

        <button
          onClick={crearRevision}
          className="rounded-lg bg-[#0f5c3a] px-4 py-2 text-white"
        >
          Guardar revisión
        </button>
      </div>
    </div>
  </div>
)}
    </DashboardShell>
  );
}


