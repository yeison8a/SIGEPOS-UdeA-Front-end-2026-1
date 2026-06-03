"use client";

import { useState, useEffect } from "react";
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
  correoDocumentos: string;
  diasHabiles: string;
  puntajeMinimo: string;
  cupoMinimo: string;
  cupoMaximo: string;
  cuposEstudiantes: string;
  plazasDisponibles: string;
};

export default function DescripcionPage() {


  const [form, setForm] = useState<FormData>({
    perfilAspirante: "",
    correoDocumentos: "",
    diasHabiles: "",
    puntajeMinimo: "",
    cupoMinimo: "",
    cupoMaximo: "",
    cuposEstudiantes: "",
    plazasDisponibles: "",
  });

const isFormValid = Object.values(form).every(
  (value) => value.trim() !== ""
);

  const STORAGE_KEY = "solicitud-cohorte-descripcion";
  const [loaded, setLoaded] = useState(false);
  const PROGRESS_KEY = "solicitud-cohorte-step";


  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  useEffect(() => {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    setForm(JSON.parse(savedData));
  }

  setLoaded(true);
}, []);

useEffect(() => {
  localStorage.setItem(
    "solicitud-cohorte-step",
    "2"
  );
}, []);

useEffect(() => {
  if (!loaded) return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(form)
  );
}, [form, loaded]);


  let nextPage = "";

const informacion = localStorage.getItem(
  "solicitud-cohorte-informacion"
);

const tipoSolicitud = informacion
  ? JSON.parse(informacion).tipoSolicitud
  : "";

if (form.plazasDisponibles === "Sí") {
  nextPage = "/solicitud-cohorte/cohorte";
} else {
  nextPage =
    tipoSolicitud === "renovacion"
      ? "/solicitud-cohorte/anexos-2"
      : "/solicitud-cohorte/anexos-1";
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
    label="Correo para recepción de documentos"
    required
    icon={<FileText size={16} />}
    tone="white"
  >
    <input
      type="email"
      value={form.correoDocumentos}
      onChange={(e) =>
        updateField("correoDocumentos", e.target.value)
      }
      className={solicitudInputClass}
    />
  </FieldCard>

  <FieldCard
    label="Días hábiles de recepción"
    required
    icon={<ListChecks size={16} />}
    tone="creamTint"
  >
    <input
      type="number"
      value={form.diasHabiles}
      onChange={(e) =>
        updateField("diasHabiles", e.target.value)
      }
      className={solicitudInputClass}
    />
  </FieldCard>

  <FieldCard
    label="Puntaje mínimo de corte"
    required
    icon={<BadgeCheck size={16} />}
    tone="greenTint"
  >
    <input
      type="number"
      value={form.puntajeMinimo}
      onChange={(e) =>
        updateField("puntajeMinimo", e.target.value)
      }
      className={solicitudInputClass}
    />
  </FieldCard>

  <FieldCard
    label="Cupo mínimo"
    required
    icon={<Users size={16} />}
    tone="white"
  >
    <input
      type="number"
      value={form.cupoMinimo}
      onChange={(e) =>
        updateField("cupoMinimo", e.target.value)
      }
      className={solicitudInputClass}
    />
  </FieldCard>

  <FieldCard
    label="Cupo máximo"
    required
    icon={<Users size={16} />}
    tone="creamTint"
  >
    <input
      type="number"
      value={form.cupoMaximo}
      onChange={(e) =>
        updateField("cupoMaximo", e.target.value)
      }
      className={solicitudInputClass}
    />
  </FieldCard>

  <FieldCard
    label="Cupos para estudientes"
    required
    icon={<Users size={16} />}
    tone="greenTint"
  >
    <input
      type="number"
      value={form.cuposEstudiantes}
      onChange={(e) =>
        updateField("cuposEstudiantes", e.target.value)
      }
      className={solicitudInputClass}
    />
  </FieldCard>

  <FieldCard
    label="¿Existen plazas disponibles?"
    required
    icon={<Building2 size={16} />}
    tone="white"
  >
    <select
      value={form.plazasDisponibles}
      onChange={(e) =>
        updateField("plazasDisponibles", e.target.value)
      }
      className={solicitudInputClass}
    >
      <option value="">Seleccione una opción</option>
      <option value="Sí">Sí</option>
      <option value="No">No</option>
    </select>
  </FieldCard>

</div>
        </div>
      </SectionCard>

      <SolicitudActions
        prevHref="/solicitud-cohorte/informacion"
        nextHref={nextPage}
        disabled={!isFormValid}
      />
    </SolicitudShell>
  );
}