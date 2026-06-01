"use client";

import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileClock,
  FolderOpen,
  GraduationCap,
  ListTodo,
  Paperclip,
  Send,
} from "lucide-react";

import { useEffect, useState } from "react";

import DashboardShell from "../../../../components/dashboard/DashboardShell";
import DashboardCard from "../../../../components/dashboard/DashboardCard";
import KpiCard from "../../../../components/dashboard/KpiCard";
import StatusBadge from "../../../../components/dashboard/StatusBadge";

interface Solicitud {
  id:string;

  estado:
    | "BORRADOR"
    | "PENDIENTE_ANEXOS"
    | "ENVIADA";

  programa:{
    nombre:string;
  };

  usuario:{
    id:string;
  };

  fechaActaAprobacion:string;
}

export default function UsuarioDashboardPage() {
const [pasoActual, setPasoActual] =
  useState(1);

  useEffect(() => {

  const paso = Number(
    localStorage.getItem(
      "solicitud-cohorte-step"
    )
  );

  if (paso) {
    setPasoActual(paso);
  }

}, []);

  const [misSolicitudes,setMisSolicitudes]=useState<Solicitud[]>([]);
  const [loading,setLoading]=useState(true);
  const [progreso, setProgreso] = useState({
  informacion: 0,
  descripcion: 0,
  cohorte: 0,
  anexos: 0,
  envio: 0,
});

  useEffect(()=>{

    async function cargarSolicitudes(){

      try{

        const userId=localStorage.getItem("userId");

        if(!userId){
          console.error("No hay userId");
          return;
        }

        const response=await fetch(
          "http://localhost:8080/api/cohort-applications"
        );

        const data:Solicitud[]=await response.json();

        const solicitudesUsuario=data.filter(
          (solicitud)=>
            solicitud.usuario.id===userId
        );

        setMisSolicitudes(solicitudesUsuario);

      }catch(error){

        console.error("Error cargando solicitudes",error);

      }finally{

        setLoading(false);

      }
    }

    cargarSolicitudes();
    setProgreso(calcularProgreso());

  },[]);

const borrador =
  misSolicitudes.filter(
    s=>s.estado==="BORRADOR"
  ).length;

const pendientes =
  misSolicitudes.filter(
    s=>s.estado==="PENDIENTE_ANEXOS"
  ).length;

const enviadas =
  misSolicitudes.filter(
    s=>s.estado==="ENVIADA"
  ).length;


  const calcularProgreso = () => {
  const informacion = JSON.parse(
    localStorage.getItem("solicitud-cohorte-informacion") || "{}"
  );

  const descripcion = JSON.parse(
    localStorage.getItem("solicitud-cohorte-descripcion") || "{}"
  );

  const cohortes = JSON.parse(
    localStorage.getItem("solicitud-cohorte-cohorte") || "{}"
  );

  const anexos1 = JSON.parse(
    localStorage.getItem("solicitud-cohorte-anexos1") || "{}"
  );

  const progreso = {
    informacion: 0,
    descripcion: 0,
    cohorte: 0,
    anexos: 0,
    envio: 0,
  };

  if (Object.keys(informacion).length > 0) {
    progreso.informacion = 100;
  }

  if (Object.keys(descripcion).length > 0) {
    progreso.descripcion = 100;
  }

  if (Object.keys(cohortes).length > 0) {
    progreso.cohorte = 100;
  }

  if (Object.keys(anexos1).length > 0) {
    progreso.anexos = 100;
  }

  return progreso;
};

  return (

    <DashboardShell
      title="Dashboard usuario"
      subtitle="Administre sus solicitudes, complete anexos y dé seguimiento."
      roleLabel="Usuario"
      activeRole="usuario"
    >

      <div className="space-y-8">

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          <KpiCard
            title="Mis solicitudes"
            value={loading ? "..." : misSolicitudes.length.toString()}
            change="Solicitudes registradas"
            icon={<ClipboardList size={18} />}
            tone="green"
          />

          <KpiCard
            title="En borrador"
            value={
              loading ? "..." : borrador.toString()
            }
            change="Pendiente completar"
            icon={<FileClock size={18} />}
            tone="cream"
          />

          <KpiCard
            title="Pendientes anexos"
            value={
              loading ? "..." : pendientes.toString()
            }
            change="Pendiente anexos"
            icon={<Paperclip size={18} />}
            tone="white"
          />

          <KpiCard
            title="Enviadas"
            value={
              loading ? "..." : enviadas.toString()
            }
            change="procesos enviados"
            icon={<Send size={18} />}
            tone="green"
          />

        </section>

        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">

          <DashboardCard
            title="Continúa tu proceso"
            subtitle="Acciones frecuentes."
            icon={<FolderOpen size={18} />}
            tone="green"
          >

            <div className="grid gap-4 sm:grid-cols-2">

              <ActionBlock
                title="Crear solicitud"
                text="Nueva solicitud."
                href="/solicitud-cohorte/informacion"
                icon={<ClipboardList size={18} />}
              />

              <ActionBlock
                title="Editar descripción"
                text="Perfil y criterios."
                href="/solicitud-cohorte/descripcion"
                icon={<ListTodo size={18} />}
              />

              <ActionBlock
                title="Configurar cohorte"
                text="Registrar datos."
                href="/solicitud-cohorte/cohorte"
                icon={<GraduationCap size={18} />}
              />

              <ActionBlock
                title="Subir anexos"
                text="Adjuntar documentos."
                href="/solicitud-cohorte/anexos-1"
                icon={<Paperclip size={18} />}
              />

            </div>

          </DashboardCard>

          <DashboardCard
            title="Mi progreso"
            subtitle="Resumen actual."
            icon={<CheckCircle2 size={18} />}
            tone="cream"
          >

            <div className="space-y-5">

              <ProgressRow
  label="Información general"
  value={progreso.informacion}
/>

<ProgressRow
  label="Descripción"
  value={progreso.descripcion}
/>

<ProgressRow
  label="Cohorte"
  value={progreso.cohorte}
/>

<ProgressRow
  label="Anexos"
  value={progreso.anexos}
/>

<ProgressRow
  label="Envío final"
  value={progreso.envio}
/>

            </div>

          </DashboardCard>

        </div>

        <DashboardCard
          title="Mis solicitudes recientes"
          subtitle="Solicitudes asociadas a tu cuenta."
          icon={<FileClock size={18} />}
          tone="white"
        >

          <div className="overflow-x-auto">

            <table className="min-w-full text-sm">

              <thead className="bg-[#f8faf8]">

                <tr>

                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Programa</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Fecha</th>

                </tr>

              </thead>

              <tbody>

                {misSolicitudes.map((row)=>(

                  <tr
                    key={row.id}
                    className="border-t border-neutral-200"
                  >

                    <td className="px-4 py-3">
                      {row.id.slice(0,8)}
                    </td>

                    <td className="px-4 py-3">
                      {row.programa.nombre}
                    </td>

                    <td className="px-4 py-3">

                      <StatusBadge
                        status={row.estado}
                      />

                    </td>

                    <td className="px-4 py-3">

                      {new Date(
                        row.fechaActaAprobacion
                      ).toLocaleDateString()}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </DashboardCard>

      </div>

    </DashboardShell>
  );
}

function ActionBlock({
  title,
  text,
  href,
  icon,
}:{
  title:string;
  text:string;
  href:string;
  icon:React.ReactNode;
}){

  return(

    <a
      href={href}
      className="rounded-[18px] border p-5 bg-white"
    >

      <div className="w-fit rounded-2xl bg-green-100 p-3 text-[#0f5c3a]">
        {icon}
      </div>

      <p className="mt-4 font-bold">
        {title}
      </p>

      <p className="mt-2 text-sm text-neutral-600">
        {text}
      </p>

    </a>
  );
}

function ProgressRow({
  label,
  value,
}:{
  label:string;
  value:number;
}){

  return(

    <div>

      <div className="mb-2 flex justify-between">

        <span>{label}</span>

        <span>{value}%</span>

      </div>

      <div className="h-3 rounded-full bg-neutral-200">

        <div
          className="h-full rounded-full bg-[#0f5c3a]"
          style={{
            width:`${value}%`
          }}
        />

      </div>

    </div>
  );
}

function TimelineItem({
  title,
  text,
  active=false,
}:{
  title:string;
  text:string;
  active?:boolean;
}){

  return(

    <div className="flex gap-3">

      <div>

        <div
          className={`h-4 w-4 rounded-full ${
            active
              ? "bg-[#0f5c3a]"
              : "bg-neutral-300"
          }`}
        />

      </div>

      <div>

        <p className="font-semibold">
          {title}
        </p>

        <p className="text-sm text-neutral-600">
          {text}
        </p>

      </div>

    </div>
  );
}