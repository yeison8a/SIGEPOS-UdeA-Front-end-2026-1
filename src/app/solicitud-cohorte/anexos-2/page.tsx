"use client";

import { useState } from "react";
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
};

function UploadCard({ title, required = false }: UploadCardProps) {
  const [fileName, setFileName] = useState("");

  return (
    <div className="rounded-[18px] border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-[2px]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-sm font-medium text-neutral-700">{title}</h3>
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
            setFileName(selected?.name || "");
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

export default function Anexos2Page() {
  return (
    <SolicitudShell
      currentStep={5}
      description="Adjunte los soportes para cohortes adicionales y validaciones complementarias."
    >
      <div className="mx-auto max-w-5xl">
        <SectionCard
          title="Anexos para terceras cohortes en adelante"
          subtitle="Cargue los documentos requeridos para continuar con el proceso."
          icon={<ClipboardList size={18} />}
          tone="softGreen"
        >
          <div className="space-y-6">
            {/* HEADER */}
            <div className="flex flex-col gap-3 border-b border-neutral-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f5c3a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4a2f]"
              >
                AGREGAR DESCRIPCIÓN
                <Plus size={16} />
              </button>

              <div className="text-xs text-neutral-400">
                Adjunte la documentación requerida
              </div>
            </div>

            {/* UPLOADS */}
            <div className="space-y-6">
              <UploadCard
                title="Aval del Consejo de Unidad Académica"
                required
              />

              <UploadCard
                title="Aval del estudio de costos de la Vicerrectoría de Investigación"
                required
              />

              <UploadCard
                title="Autoevaluación del programa"
                required
              />
            </div>
          </div>
        </SectionCard>

        <SolicitudActions
          prevHref="/solicitud-cohorte/anexos-1"
          nextHref="/solicitud-cohorte/enviar"
        />
      </div>
    </SolicitudShell>
  );
}