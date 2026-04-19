import type { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  tone?: "white" | "green" | "cream";
  children: ReactNode;
};

export default function DashboardCard({
  title,
  subtitle,
  icon,
  tone = "white",
  children,
}: DashboardCardProps) {
  const toneClass =
    tone === "green"
      ? "bg-[#f6fbf7] border-green-100"
      : tone === "cream"
      ? "bg-[#fbfaf5] border-[#ece6d9]"
      : "bg-white border-neutral-200";

  return (
    <section
      className={`rounded-[24px] border p-6 shadow-sm transition hover:-translate-y-[2px] md:p-7 ${toneClass}`}
    >
      <div className="mb-6 flex items-start gap-4">
        {icon && (
          <div className="rounded-2xl bg-white p-3 text-[#0f5c3a] shadow-sm">
            {icon}
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm leading-6 text-neutral-500">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {children}
    </section>
  );
}