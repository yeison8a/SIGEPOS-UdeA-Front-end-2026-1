"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  ClipboardList,
  GraduationCap,
  Info,
  ListOrdered,
  Plus,
} from "lucide-react";
import SolicitudShell from "../../../../components/solicitud/SolicitudShell";
import SectionCard from "../../../../components/solicitud/SectionCard";
import SolicitudActions from "../../../../components/solicitud/SolicitudActions";
import { solicitudInputClass } from "../../../../lib/solicitud-cohorte/ui";

type CohorteForm = {
  estimuloDescripcion: string;
  numeroPlazas: string;
};

type AccordionItemProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

function AccordionItem({
  title,
  icon,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-[18px] border border-neutral-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-neutral-50"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-green-50 p-2.5 text-[#0f5c3a]">
            {icon}
          </div>
          <span className="text-sm font-medium text-neutral-700">{title}</span>
        </div>

        <ChevronDown
          size={18}
          className={`text-neutral-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && <div className="border-t border-neutral-200 px-5 py-5">{children}</div>}
    </div>
  );
}

export default function CohortePage() {
  const [form, setForm] = useState<CohorteForm>({
    estimuloDescripcion: "",
    numeroPlazas: "",
  });
const PROGRESS_KEY = "solicitud-cohorte-step";
  function updateField<K extends keyof CohorteForm>(
    key: K,
    value: CohorteForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }


const informacion = localStorage.getItem(
  "solicitud-cohorte-informacion"
);

useEffect(() => {
  localStorage.setItem(
    "solicitud-cohorte-step",
    "3"
  );
}, []);

const tipoSolicitud = informacion
  ? JSON.parse(informacion).tipoSolicitud
  : "";

const nextPage =
  tipoSolicitud === "renovacion"
    ? "/solicitud-cohorte/anexos-2"
    : "/solicitud-cohorte/anexos-1";

  return (
    <SolicitudShell
      currentStep={3}
      description="Configure la información asociada a la cohorte y a los estímulos definidos para esta inscripción."
    >
      <div className="mx-auto max-w-5xl">
        <SectionCard
          title="Estudiante instructor"
          subtitle="Defina la información relacionada con este componente de la cohorte."
          icon={<GraduationCap size={18} />}
          tone="softGreen"
        >
          <div className="space-y-5">
            <div className="flex flex-col gap-3 border-b border-neutral-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f5c3a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4a2f]"
              >
                AGREGAR DESCRIPCIÓN
                <Plus size={16} />
              </button>

              <div className="text-xs text-neutral-400">
                Complete la información requerida para esta sección
              </div>
            </div>

            <div className="space-y-4">
              <AccordionItem
                title="Información sobre el Estímulo Estudiante Instructor"
                icon={<Info size={16} />}
                defaultOpen
              >
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-neutral-700">
                    Descripción del estímulo
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Escriba aquí la descripción del estímulo para estudiante instructor..."
                    value={form.estimuloDescripcion}
                    onChange={(e) =>
                      updateField("estimuloDescripcion", e.target.value)
                    }
                    className={`${solicitudInputClass} resize-none`}
                  />
                </div>
              </AccordionItem>

              <AccordionItem
                title="Número de plazas de estudiante instructor que el programa va a ofrecer en esta cohorte"
                icon={<ListOrdered size={16} />}
              >
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-neutral-700">
                    Número de plazas
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Ingrese el número de plazas"
                    value={form.numeroPlazas}
                    onChange={(e) => updateField("numeroPlazas", e.target.value)}
                    className={solicitudInputClass}
                  />
                </div>
              </AccordionItem>
            </div>
          </div>
        </SectionCard>

        <SolicitudActions
          prevHref="/solicitud-cohorte/descripcion"
          nextHref={nextPage}
        />
      </div>
    </SolicitudShell>
  );
}