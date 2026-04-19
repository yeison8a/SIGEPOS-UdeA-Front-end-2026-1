export default function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Borrador"
      ? "bg-[#fffaf0] text-[#8a6d1f]"
      : status === "En revisión"
      ? "bg-green-100 text-[#0f5c3a]"
      : status === "Pendiente anexos"
      ? "bg-rose-50 text-rose-600"
      : status === "Enviada"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-neutral-100 text-neutral-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      {status}
    </span>
  );
}