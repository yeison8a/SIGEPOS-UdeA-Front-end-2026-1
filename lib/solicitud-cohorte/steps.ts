export type SolicitudStep = {
  label: string;
  href: string;
};

export const SOLICITUD_COHORTE_STEPS: SolicitudStep[] = [
  { label: "Información", href: "/solicitud-cohorte/informacion" },
  { label: "Descripción", href: "/solicitud-cohorte/descripcion" },
  { label: "Cohorte", href: "/solicitud-cohorte/cohorte" },
  { label: "Anexos I", href: "/solicitud-cohorte/anexos-1" },
  { label: "Anexos II", href: "/solicitud-cohorte/anexos-2" },
  { label: "Enviar", href: "/solicitud-cohorte/enviar" },
];