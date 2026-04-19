import type { ReactNode } from "react";

type FieldCardProps = {
  label: string;
  required?: boolean;
  icon?: ReactNode;
  tone?: "white" | "greenTint" | "creamTint";
  children: ReactNode;
  className?: string;
};

export default function FieldCard({
  label,
  required = false,
  icon,
  tone = "white",
  children,
  className = "",
}: FieldCardProps) {
  const toneClass =
    tone === "greenTint"
      ? "bg-green-50 border-green-200"
      : tone === "creamTint"
      ? "bg-[#fffaf0] border-[#eadfbe]"
      : "bg-white border-neutral-200";

  return (
    <div
      className={`rounded-[18px] border p-4 shadow-sm transition hover:-translate-y-[2px] ${toneClass} ${className}`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {icon && <span className="text-[#0f5c3a]">{icon}</span>}
          <label className="text-sm font-semibold text-neutral-700">
            {label}
          </label>
        </div>

        {required && (
          <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-rose-500">
            Requerido
          </span>
        )}
      </div>

      {children}
    </div>
  );
}