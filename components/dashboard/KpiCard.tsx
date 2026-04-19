import type { ReactNode } from "react";

type KpiCardProps = {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
  tone?: "green" | "cream" | "white";
};

export default function KpiCard({
  title,
  value,
  change,
  icon,
  tone = "white",
}: KpiCardProps) {
  const toneClass =
    tone === "green"
      ? "bg-green-50 border-green-200"
      : tone === "cream"
      ? "bg-[#fffaf0] border-[#eadfbe]"
      : "bg-white border-neutral-200";

  return (
    <div
      className={`rounded-[22px] border p-5 shadow-sm transition hover:-translate-y-[2px] ${toneClass}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-neutral-500">{title}</p>
          <p className="mt-2 text-3xl font-extrabold text-neutral-900">{value}</p>
          <p className="mt-2 text-sm font-medium text-[#0f5c3a]">{change}</p>
        </div>

        <div className="rounded-2xl bg-white p-3 text-[#0f5c3a] shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
}