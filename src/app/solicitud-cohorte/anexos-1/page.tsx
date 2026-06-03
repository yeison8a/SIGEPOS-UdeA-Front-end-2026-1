"use client";

import { useEffect, useState } from "react";
import {
  CircleAlert,
  ClipboardList,
  Plus,
  Upload,
} from "lucide-react";
import SolicitudShell from "../../../../components/solicitud/SolicitudShell";
import SectionCard from "../../../../components/solicitud/SectionCard";
import SolicitudActions from "../../../../components/solicitud/SolicitudActions";

type UploadCardProps = {
  title: string;
  required?: boolean;
  onFileSelect?: (file: File) => void;
};

function UploadCard({ title, required = false, onFileSelect }: UploadCardProps) {
  const [fileName, setFileName] = useState("");
  


  return (
    <div className="rounded-[18px] border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-[2px]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-neutral-700">{title}</h3>
        </div>

        <CircleAlert size={16} className="mt-0.5 text-neutral-400" />
      </div>

      <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-neutral-300 bg-[#fafafa] px-4 py-3 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50">
        <Upload size={16} />
        Upload Files
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if(!selected) return;

            setFileName(selected.name);
            onFileSelect?.(selected);

          }}
        />
      </label>

      {fileName && (
        <p className="mt-3 text-sm text-[#0f5c3a]">{fileName}</p>
      )}

      {required && (
        <p className="mt-3 text-xs font-medium text-rose-400">Required</p>
      )}
    </div>
  );
}

export default function Anexos1Page() {
const [archivos, setArchivos] = useState<File[]>([]);
const PROGRESS_KEY = "solicitud-cohorte-step";
  const [prevPage, setPrevPage] = useState(
    "/solicitud-cohorte/cohorte"
  );

  useEffect(() => {
    const descripcion = localStorage.getItem(
      "solicitud-cohorte-descripcion"
    );

    if (!descripcion) return;

    const data = JSON.parse(descripcion);

    if (data.plazasDisponibles === "No") {
      setPrevPage("/solicitud-cohorte/descripcion");
    }
  }, []);

  useEffect(() => {
  localStorage.setItem(
    "solicitud-cohorte-step",
    "3"
  );
}, []);

const guardarDocumentos = async () => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("No se encontró el usuario");
      return;
    }

    if (archivos.length === 0) {
      alert("Debe seleccionar al menos un archivo");
      return;
    }

    const formData = new FormData();

    archivos.forEach((archivo) => {
      formData.append("archivos", archivo);
    });

    const response = await fetch(
      `http://localhost:8080/api/user/${userId}/documents`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Error al subir documentos");
    }

    const data = await response.json();

    console.log(data);

    alert("Documentos cargados correctamente");

    setArchivos([]);
  } catch (error) {
    console.error(error);
    alert("No fue posible subir los documentos");
  }
};

  return (
    <SolicitudShell
      currentStep={4}
      description="Adjunte los soportes requeridos para la primera y segunda cohorte."
    >
      <div className="mx-auto max-w-5xl">
        <SectionCard
          title="Anexos para primera y segunda cohorte"
          subtitle="Cargue los documentos obligatorios para continuar con el proceso."
          icon={<ClipboardList size={18} />}
          tone="softGreen"
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-3 border-b border-neutral-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f5c3a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4a2f]"
              >
                AGREGAR DESCRIPCIÓN
                <Plus size={16} />
              </button>

              <div className="text-xs text-neutral-400">
                Adjunte la documentación solicitada
              </div>
            </div>

            <div className="space-y-6">
              <UploadCard
                title="Aval del Consejo de Unidad Académica"
                required
                onFileSelect={(file) =>
                  setArchivos((prev) => [...prev, file])
                }
              />

              <UploadCard
                title="Aval del estudio de costos de la Vicerrectoría de Investigación"
                required
                onFileSelect={(file) =>
                  setArchivos((prev) => [...prev, file])
                }
              />
            </div>
          </div>
        </SectionCard>

        <SolicitudActions
          prevHref={prevPage}
          nextHref="/solicitud-cohorte/anexos-2"
          onSave={guardarDocumentos}
        />
      </div>
    </SolicitudShell>
  );
}