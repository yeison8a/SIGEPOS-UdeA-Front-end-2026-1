"use client";

import {
  CheckCircle2,
  ClipboardList,
  FileCheck,
  GraduationCap,
  Paperclip,
  Send,
  ShieldCheck,
} from "lucide-react";
import SolicitudShell from "../../../../components/solicitud/SolicitudShell";
import SectionCard from "../../../../components/solicitud/SectionCard";
import SolicitudActions from "../../../../components/solicitud/SolicitudActions";
import { useEffect } from "react";

function ReviewCard({
  title,
  description,
  icon,
  tone = "green",
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  tone?: "green" | "cream" | "white";
}) {
  const toneClass =
    tone === "green"
      ? "border-green-200 bg-green-50"
      : tone === "cream"
      ? "border-[#eadfbe] bg-[#fffaf0]"
      : "border-neutral-200 bg-white";

  return (
    <div
      className={`rounded-[18px] border p-5 shadow-sm transition hover:-translate-y-[2px] ${toneClass}`}
    >
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-white p-3 text-[#0f5c3a] shadow-sm">
          {icon}
        </div>

        <div>
          <p className="text-sm font-semibold text-neutral-900">{title}</p>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

type Documento = {
  id: string;
};

export default function EnviarPage() {
  const PROGRESS_KEY = "solicitud-cohorte-step";
  
  useEffect(() => {
  localStorage.setItem(
    "solicitud-cohorte-step",
    "5"
  );
}, []);

const enviarSolicitud = async () => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("No se encontró el usuario");
      return;
    }

    const informacion = JSON.parse(
      localStorage.getItem("solicitud-cohorte-informacion") || "{}"
    );

    const descripcion = JSON.parse(
      localStorage.getItem("solicitud-cohorte-descripcion") || "{}"
    );

    const documentosIds: string[] = JSON.parse(
  localStorage.getItem("solicitud-cohorte-documentos") || "[]"
);

const documentoId = documentosIds[0];

    console.log(informacion);
    console.log(descripcion);
    console.log(documentosIds);

    const solicitud = {

  numeroActa: informacion.numeroActa,
  fechaActaAprobacion: informacion.fechaAprobacion,

  programa: {
    id: informacion.programa,
  },

  perfilAspirante: descripcion.perfilAspirante,
  correoDocumentacion: descripcion.correoDocumentos,
  diasHabilesRecepcion: Number(descripcion.diasHabiles),
  puntajeMinimoCorte: Number(descripcion.puntajeMinimo),
  cupoMinCohorte: Number(descripcion.cupoMinimo),
  cupoMaxCohorte: Number(descripcion.cupoMaximo),
  cupoEstudiantes: Number(descripcion.cuposEstudiantes),

  plazasDisponibles: descripcion.plazasDisponibles === "Si",

  usuario: {
    id: userId,
  },

  documento: documentoId ? { id: documentoId } : null,

  estado: "PENDIENTE",
  enviada: true,

  rutaDocumento: null,

};

    console.log(
  JSON.stringify(solicitud, null, 2)
);
    const response = await fetch(
      `http://localhost:8080/api/cohort-applications?userId=${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(solicitud),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

  console.log("STATUS:", response.status);
  console.log("ERROR:", errorText);

      throw new Error("Error enviando solicitud");
    }

    const data = await response.json();

    console.log(data);

    localStorage.removeItem("solicitud-cohorte-general");

    localStorage.removeItem("solicitud-cohorte-descripcion");

    localStorage.removeItem("solicitud-cohorte-cohorte");

    localStorage.removeItem("solicitud-cohorte-step");

    alert("Solicitud enviada correctamente");

  } catch (error) {
    console.error(error);
    alert("No fue posible enviar la solicitud");
  }
};


  return (
    <SolicitudShell
      currentStep={6}
      description="Revise la información registrada antes de enviar la solicitud de apertura de cohorte."
    >
      <div className="mx-auto max-w-5xl space-y-8">
        <SectionCard
          title="Revisión final"
          subtitle="Verifique que toda la información y anexos estén completos antes de realizar el envío."
          icon={<ClipboardList size={18} />}
          tone="softGreen"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <ReviewCard
              title="Información general"
              description="Confirme que el tipo de solicitud, fechas, nivel, unidad académica y programa estén correctos."
              icon={<FileCheck size={18} />}
              tone="green"
            />

            <ReviewCard
              title="Descripción del proceso"
              description="Revise perfil del aspirante, criterios de selección, requisitos de ingreso y modalidad del proceso."
              icon={<CheckCircle2 size={18} />}
              tone="cream"
            />

            <ReviewCard
              title="Configuración de cohorte"
              description="Valide la información asociada a estudiante instructor y demás datos definidos para la cohorte."
              icon={<GraduationCap size={18} />}
              tone="white"
            />

            <ReviewCard
              title="Anexos cargados"
              description="Asegúrese de haber adjuntado todos los documentos requeridos para las cohortes correspondientes."
              icon={<Paperclip size={18} />}
              tone="green"
            />
          </div>
        </SectionCard>

        <SectionCard
          title="Confirmación institucional"
          subtitle="Al enviar, la solicitud quedará registrada para revisión formal."
          icon={<ShieldCheck size={18} />}
          tone="softCream"
        >
          <div className="rounded-[18px] border border-[#0f5c3a] bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-green-100 p-3 text-[#0f5c3a]">
                <ShieldCheck size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  Importante
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Una vez enviada, la solicitud pasará al proceso de revisión
                  institucional. Antes de continuar, verifique que toda la
                  información diligenciada y los anexos cargados sean correctos.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SolicitudActions prevHref="/solicitud-cohorte/anexos-2" />

          <button
            type="button"
            onClick={enviarSolicitud}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f5c3a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4a2f]"
          >
            Enviar solicitud
            <Send size={16} />
          </button>
        </div>
      </div>
    </SolicitudShell>
  );
}