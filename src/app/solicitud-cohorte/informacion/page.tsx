"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BellRing,
  Building2,
  CalendarDays,
  ClipboardList,
  FileBadge2,
  FileText,
  FolderOpen,
  GraduationCap,
  Hash,
  ShieldCheck,
} from "lucide-react";
import SolicitudShell from "../../../../components/solicitud/SolicitudShell";
import SectionCard from "../../../../components/solicitud/SectionCard";
import FieldCard from "../../../../components/solicitud/FieldCard";
import SolicitudActions from "../../../../components/solicitud/SolicitudActions";
import { solicitudInputClass } from "../../../../lib/solicitud-cohorte/ui";

type FormData = {
  tipoSolicitud: string;
  fechaSolicitud: string;
  numeroActa: string;
  fechaAprobacion: string;
  nivel: string;
  unidadAcademica: string;
  programa: string;
  codigoPrograma: string;
};

export default function InformacionPage() {
  const [form, setForm] = useState<FormData>({
    tipoSolicitud: "",
    fechaSolicitud: "",
    numeroActa: "",
    fechaAprobacion: "",
    nivel: "",
    unidadAcademica: "",
    programa: "",
    codigoPrograma: "",
  });

  const completedFields = useMemo(() => {
    return Object.values(form).filter((value) => value.trim() !== "").length;
  }, [form]);

  const completion = Math.round(
    (completedFields / Object.keys(form).length) * 100
  );

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <SolicitudShell
      currentStep={1}
      description="Complete la información requerida para registrar la solicitud siguiendo el flujo establecido por el portal institucional."
    >
      <div className="grid gap-8 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-8">
          <SectionCard
            title="Información general"
            subtitle="Datos administrativos y de radicación."
            icon={<ClipboardList size={18} />}
            tone="softGreen"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <FieldCard
                label="Tipo de solicitud"
                required
                icon={<FileText size={16} />}
                tone="white"
              >
                <select
                  value={form.tipoSolicitud}
                  onChange={(e) => updateField("tipoSolicitud", e.target.value)}
                  className={solicitudInputClass}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="apertura">Apertura</option>
                  <option value="renovacion">Renovación</option>
                  <option value="modificacion">Modificación</option>
                </select>
              </FieldCard>

              <FieldCard
                label="Fecha de la solicitud"
                required
                icon={<CalendarDays size={16} />}
                tone="greenTint"
              >
                <input
                  type="date"
                  value={form.fechaSolicitud}
                  onChange={(e) => updateField("fechaSolicitud", e.target.value)}
                  className={solicitudInputClass}
                />
              </FieldCard>

              <FieldCard
                label="Número de acta"
                required
                icon={<Hash size={16} />}
                tone="white"
              >
                <input
                  type="text"
                  placeholder="Ej. ACT-2026-014"
                  value={form.numeroActa}
                  onChange={(e) => updateField("numeroActa", e.target.value)}
                  className={solicitudInputClass}
                />
              </FieldCard>

              <FieldCard
                label="Fecha aprobación del consejo"
                required
                icon={<CalendarDays size={16} />}
                tone="greenTint"
              >
                <input
                  type="date"
                  value={form.fechaAprobacion}
                  onChange={(e) =>
                    updateField("fechaAprobacion", e.target.value)
                  }
                  className={solicitudInputClass}
                />
              </FieldCard>
            </div>
          </SectionCard>

          <SectionCard
            title="Información académica"
            subtitle="Datos del programa y unidad académica."
            icon={<GraduationCap size={18} />}
            tone="softCream"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <FieldCard
                label="Nivel"
                required
                icon={<GraduationCap size={16} />}
                tone="white"
              >
                <select
                  value={form.nivel}
                  onChange={(e) => updateField("nivel", e.target.value)}
                  className={solicitudInputClass}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="especializacion">Especialización</option>
                  <option value="maestria">Maestría</option>
                  <option value="doctorado">Doctorado</option>
                </select>
              </FieldCard>

              <FieldCard
                label="Unidad académica"
                required
                icon={<Building2 size={16} />}
                tone="creamTint"
              >
                <select
                  value={form.unidadAcademica}
                  onChange={(e) =>
                    updateField("unidadAcademica", e.target.value)
                  }
                  className={solicitudInputClass}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="ingenieria">Facultad de Ingeniería</option>
                  <option value="ciencias">Facultad de Ciencias Exactas</option>
                  <option value="sociales">Facultad de Ciencias Sociales</option>
                </select>
              </FieldCard>

              <FieldCard
                label="Programa"
                required
                icon={<FolderOpen size={16} />}
                tone="white"
              >
                <select
                  value={form.programa}
                  onChange={(e) => updateField("programa", e.target.value)}
                  className={solicitudInputClass}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="sistemas">Ingeniería de Sistemas</option>
                  <option value="datos">Ciencia de Datos</option>
                  <option value="software">Arquitectura de Software</option>
                </select>
              </FieldCard>

              <FieldCard
                label="Código del programa"
                required
                icon={<Hash size={16} />}
                tone="creamTint"
              >
                <input
                  type="text"
                  placeholder="Ej. 50701"
                  value={form.codigoPrograma}
                  onChange={(e) => updateField("codigoPrograma", e.target.value)}
                  className={solicitudInputClass}
                />
              </FieldCard>
            </div>
          </SectionCard>

          <SolicitudActions nextHref="/solicitud-cohorte/descripcion" />
        </div>

        <aside className="space-y-6">
          <div className="overflow-hidden rounded-[24px] bg-[#0f5c3a] text-white shadow-lg">
            <div className="border-b border-white/10 px-6 py-5">
              <p className="text-sm font-semibold text-green-100">
                Resumen del formulario
              </p>
              <h3 className="mt-1 text-xl font-bold">
                Avance de diligenciamiento
              </h3>
            </div>

            <div className="p-6">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-white/75">Completado</span>
                <span className="font-bold text-white">{completion}%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-white transition-all duration-300"
                  style={{ width: `${completion}%` }}
                />
              </div>

              <div className="mt-6 space-y-3">
                <SummaryItem
                  label="Tipo de solicitud"
                  value={form.tipoSolicitud || "Pendiente"}
                />
                <SummaryItem
                  label="Fecha solicitud"
                  value={form.fechaSolicitud || "Pendiente"}
                />
                <SummaryItem
                  label="Nivel"
                  value={form.nivel || "Pendiente"}
                />
                <SummaryItem
                  label="Programa"
                  value={form.programa || "Pendiente"}
                />
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-green-200 bg-green-50 p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-white p-3 text-[#0f5c3a] shadow-sm">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  Recomendaciones
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Verifique que las fechas correspondan a los actos
                  administrativos y utilice el código oficial del programa.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#0f5c3a] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-green-100 p-3 text-[#0f5c3a]">
                <BellRing size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  Aviso importante
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Los campos obligatorios deben completarse antes de avanzar a la
                  siguiente etapa.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </SolicitudShell>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm">
      <span className="text-white/75">{label}</span>
      <span className="max-w-[55%] truncate font-semibold text-white">
        {value}
      </span>
    </div>
  );
}