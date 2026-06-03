import Link from "next/link";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";

type SolicitudActionsProps = {
  prevHref?: string;
  nextHref?: string;
  nextLabel?: string;
  disabled?: boolean;
  onSave?: () => void;
};

export default function SolicitudActions({
  prevHref,
  nextHref,
  nextLabel = "Siguiente",
  disabled = false,
  onSave
}: SolicitudActionsProps) {
  const justifyClass = prevHref
    ? "sm:items-center sm:justify-between"
    : "sm:justify-end";

  return (
    <div className={`mt-8 flex flex-col gap-3 sm:flex-row ${justifyClass}`}>
      {prevHref ? (
        <Link
          href={prevHref}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0f5c3a] bg-white px-5 py-3 text-sm font-semibold text-[#0f5c3a] transition hover:bg-green-50"
        >
          <ArrowLeft size={16} />
          Anterior
        </Link>
      ) : (
        <div />
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => {
    onSave?.();
  }}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0f5c3a] bg-white px-5 py-3 text-sm font-semibold text-[#0f5c3a] transition hover:bg-green-50"
        >
          <Save size={16} />
          Guardar
        </button>

{nextHref &&
  (disabled ? (
    <button
      type="button"
      disabled
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-400 px-5 py-3 text-sm font-semibold text-white cursor-not-allowed"
    >
      {nextLabel}
      <ArrowRight size={16} />
    </button>
  ) : (
    <Link
      href={nextHref}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f5c3a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4a2f]"
    >
      {nextLabel}
      <ArrowRight size={16} />
    </Link>
  ))}
      </div>
    </div>
  );
}