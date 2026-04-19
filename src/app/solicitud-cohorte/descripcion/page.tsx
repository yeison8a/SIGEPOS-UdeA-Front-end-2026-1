"use client";

import { useState } from "react";
import {
  BadgeCheck,
  BookOpenCheck,
  Building2,
  ClipboardList,
  FileSearch,
  FileText,
  ListChecks,
  MapPin,
  UserRound,
  Users,
} from "lucide-react";
import SolicitudShell from "../../../../components/solicitud/SolicitudShell";
import SectionCard from "../../../../components/solicitud/SectionCard";
import FieldCard from "../../../../components/solicitud/FieldCard";
import SolicitudActions from "../../../../components/solicitud/SolicitudActions";
import { solicitudInputClass } from "../../../../lib/solicitud-cohorte/ui";

type FormData = {
  perfilAspirante: string;
  mecanismoIngreso: string;
  numeroAdmitidos: string;
  criteriosSeleccion: string;
  requisitosIngreso: string;
  ciudadOferta: string;
  criteriosClasificacion: string;
  modalidadProceso: string;
  tipoPrueba: string;
};

export default function DescripcionPage() {
  const [form, setForm] = useState<FormData>({
    perfilAspirante: "",
    mecanismoIngreso: "",
    numeroAdmitidos: "",
    criteriosSeleccion: "",
    requisitosIngreso: "",
    ciudadOferta: "",
    criteriosClasificacion: "",
    modalidadProceso: "",
    tipoPrueba: "",
  });

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <SolicitudShell
      currentStep={2}
      description="Diligencie la descripción del proceso de admisión y los criterios asociados al ingreso de aspirantes."
    >
      <SectionCard
        title="Descripción"
        subtitle="Configure los elementos que definen el perfil del aspirante y el proceso de ingreso."
        icon={<ClipboardList size={18} />}
        tone="softGreen"
      >
        <div className="space-y-5">
          <FieldCard
            label="Perfil del aspirante"
            required
            icon={<UserRound size={16} />}
            tone="greenTint"
          >
            <textarea
              rows={5}
              placeholder="Describa el perfil esperado del aspirante..."
              value={form.perfilAspirante}
              onChange={(e) => updateField("perfilAspirante", e.target.value)}
              className={`${solicitudInputClass} resize-none`}
            />
          </FieldCard>

          <div className="grid gap-5 md:grid-cols-2">
            <FieldCard
              label="Mecanismo de ingreso"
              required
              icon={<ListChecks size={16} />}
              tone="white"
            >
              <select
                value={form.mecanismoIngreso}
                onChange={(e) => updateField("mecanismoIngreso", e.target.value)}
                className={solicitudInputClass}
              >
                <option value="">Seleccione una opción</option>
                <option value="entrevista">Entrevista</option>
                <option value="prueba">Prueba</option>
                <option value="mixto">Mixto</option>
              </select>
            </FieldCard>

            <FieldCard
              label="Número de admitidos por cohorte"
              required
              icon={<Users size={16} />}
              tone="creamTint"
            >
              <select
                value={form.numeroAdmitidos}
                onChange={(e) => updateField("numeroAdmitidos", e.target.value)}
                className={solicitudInputClass}
              >
                <option value="">Seleccione una opción</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
              </select>
            </FieldCard>

            <FieldCard
              label="Criterios de selección"
              required
              icon={<FileSearch size={16} />}
              tone="greenTint"
            >
              <textarea
                rows={4}
                placeholder="Describa los criterios de selección..."
                value={form.criteriosSeleccion}
                onChange={(e) => updateField("criteriosSeleccion", e.target.value)}
                className={`${solicitudInputClass} resize-none`}
              />
            </FieldCard>

            <FieldCard
              label="Requisitos de ingreso"
              required
              icon={<BookOpenCheck size={16} />}
              tone="white"
            >
              <textarea
                rows={4}
                placeholder="Detalle los requisitos de ingreso..."
                value={form.requisitosIngreso}
                onChange={(e) => updateField("requisitosIngreso", e.target.value)}
                className={`${solicitudInputClass} resize-none`}
              />
            </FieldCard>

            <FieldCard
              label="Ciudad o lugar de oferta"
              required
              icon={<MapPin size={16} />}
              tone="white"
            >
              <input
                type="text"
                placeholder="Ingrese la ciudad"
                value={form.ciudadOferta}
                onChange={(e) => updateField("ciudadOferta", e.target.value)}
                className={solicitudInputClass}
              />
            </FieldCard>

            <FieldCard
              label="Criterios de clasificación"
              required
              icon={<BadgeCheck size={16} />}
              tone="creamTint"
            >
              <input
                type="text"
                placeholder="Ingrese el criterio"
                value={form.criteriosClasificacion}
                onChange={(e) =>
                  updateField("criteriosClasificacion", e.target.value)
                }
                className={solicitudInputClass}
              />
            </FieldCard>

            <FieldCard
              label="Modalidad del proceso"
              required
              icon={<Building2 size={16} />}
              tone="greenTint"
            >
              <select
                value={form.modalidadProceso}
                onChange={(e) => updateField("modalidadProceso", e.target.value)}
                className={solicitudInputClass}
              >
                <option value="">Seleccione una opción</option>
                <option value="presencial">Presencial</option>
                <option value="virtual">Virtual</option>
                <option value="hibrida">Híbrida</option>
              </select>
            </FieldCard>

            <FieldCard
              label="Tipo de prueba o evaluación"
              required
              icon={<FileText size={16} />}
              tone="white"
            >
              <select
                value={form.tipoPrueba}
                onChange={(e) => updateField("tipoPrueba", e.target.value)}
                className={solicitudInputClass}
              >
                <option value="">Seleccione una opción</option>
                <option value="escrita">Escrita</option>
                <option value="oral">Oral</option>
                <option value="entrevista">Entrevista</option>
                <option value="mixta">Mixta</option>
              </select>
            </FieldCard>
          </div>
        </div>
      </SectionCard>

      <SolicitudActions
        prevHref="/solicitud-cohorte/informacion"
        nextHref="/solicitud-cohorte/cohorte"
      />
    </SolicitudShell>
  );
}