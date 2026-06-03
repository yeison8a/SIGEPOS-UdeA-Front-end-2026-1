"use client";

import {
  FileSearch,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import DashboardShell from "../../../../components/dashboard/DashboardShell";
import DashboardCard from "../../../../components/dashboard/DashboardCard";
import KpiCard from "../../../../components/dashboard/KpiCard";
import StatusBadge from "../../../../components/dashboard/StatusBadge";
import { useEffect, useState } from "react";

type Revision = {
  id: string;
  priority: string;
  status: string;
  observations: string;
  reviewDate: string;

  cohortApplication: {
    id: string;
    numeroActa: string;

    programa: {
      codigo: number;
      nombre: string;
    };

    usuario: {
      id: string;
      username: string;
      correo: string;
    };
  };
};

export default function UsuarioProcesoPage() {
  const [revisiones, setRevisiones] = useState<Revision[]>([]);
  const [loading, setLoading] = useState(true);

  const [openViewModal, setOpenViewModal] =
    useState(false);

  const [revisionSeleccionada, setRevisionSeleccionada] =
    useState<Revision | null>(null);

  useEffect(() => {
    cargarRevisiones();
  }, []);

  const cargarRevisiones = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/revisions"
      );

      if (!response.ok) {
        throw new Error(
          "Error al obtener revisiones"
        );
      }

      const data = await response.json();

      const userId =
        localStorage.getItem("userId");

      const misRevisiones = data.filter(
        (revision: Revision) =>
          revision.cohortApplication?.usuario?.id ===
          userId
      );

      setRevisiones(misRevisiones);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const revisadas = revisiones.filter(
    (r) => r.status === "REVISADA"
  ).length;

  const devueltas = revisiones.filter(
    (r) => r.status === "DEVUELTA"
  ).length;

  const total = revisiones.length;

  if (loading) {
    return (
      <DashboardShell
        title="Mi proceso"
        subtitle="Seguimiento de solicitudes y revisiones."
        roleLabel="Usuario"
        activeRole="usuario"
      >
        <p>Cargando...</p>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      title="Mi proceso"
      subtitle="Consulte el estado y las observaciones realizadas por los administradores."
      roleLabel="Usuario"
      activeRole="usuario"
    >
      <div className="space-y-8">
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <KpiCard
            title="Total revisiones"
            value={total.toString()}
            change=""
            icon={<FileSearch size={18} />}
            tone="green"
          />

          <KpiCard
            title="Aprobadas"
            value={revisadas.toString()}
            change=""
            icon={<CheckCircle2 size={18} />}
            tone="green"
          />

          <KpiCard
            title="Devueltas"
            value={devueltas.toString()}
            change=""
            icon={<MessageSquare size={18} />}
            tone="white"
          />
        </section>

        <DashboardCard
          title="Historial de revisiones"
          subtitle="Respuestas emitidas por los administradores."
          icon={<FileSearch size={18} />}
          tone="white"
        >
          <div className="overflow-hidden rounded-[18px] border border-neutral-200 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-[#f8faf8]">
                  <tr className="text-left text-neutral-600">
                    <th className="px-4 py-3 font-semibold">
                      Programa
                    </th>

                    <th className="px-4 py-3 font-semibold">
                      Prioridad
                    </th>

                    <th className="px-4 py-3 font-semibold">
                      Estado
                    </th>

                    <th className="px-4 py-3 font-semibold">
                      Fecha
                    </th>

                    <th className="px-4 py-3 font-semibold">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {revisiones.map((revision) => (
                    <tr
                      key={revision.id}
                      className="border-t border-neutral-200"
                    >
                      <td className="px-4 py-3">
                        {
                          revision.cohortApplication
                            ?.programa?.nombre
                        }
                      </td>

                      <td className="px-4 py-3">
                        {revision.priority}
                      </td>

                      <td className="px-4 py-3">
                        <StatusBadge
                          status={revision.status}
                        />
                      </td>

                      <td className="px-4 py-3">
                        {new Date(
                          revision.reviewDate
                        ).toLocaleDateString(
                          "es-CO"
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <button
                          onClick={() => {
                            setRevisionSeleccionada(
                              revision
                            );
                            setOpenViewModal(true);
                          }}
                          className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50"
                        >
                          Ver respuesta
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {revisiones.length === 0 && (
                <div className="p-8 text-center text-neutral-500">
                  No existen revisiones para
                  mostrar.
                </div>
              )}
            </div>
          </div>
        </DashboardCard>
      </div>

      {openViewModal &&
        revisionSeleccionada && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
              <h2 className="mb-6 text-xl font-bold">
                Respuesta del administrador
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-neutral-500">
                    Programa
                  </p>

                  <p>
                    {
                      revisionSeleccionada
                        .cohortApplication
                        ?.programa?.nombre
                    }
                  </p>
                </div>

                <div>
                  <p className="text-xs text-neutral-500">
                    Estado
                  </p>

                  <StatusBadge
                    status={
                      revisionSeleccionada.status
                    }
                  />
                </div>

                <div>
                  <p className="text-xs text-neutral-500">
                    Prioridad
                  </p>

                  <p>
                    {
                      revisionSeleccionada.priority
                    }
                  </p>
                </div>

                <div>
                  <p className="text-xs text-neutral-500">
                    Fecha revisión
                  </p>

                  <p>
                    {new Date(
                      revisionSeleccionada.reviewDate
                    ).toLocaleDateString(
                      "es-CO"
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-neutral-500">
                    Observaciones
                  </p>

                  <div className="mt-2 rounded-lg border bg-neutral-50 p-4">
                    {
                      revisionSeleccionada.observations
                    }
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() =>
                    setOpenViewModal(false)
                  }
                  className="rounded-lg bg-[#0f5c3a] px-4 py-2 text-white"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
    </DashboardShell>
  );
}