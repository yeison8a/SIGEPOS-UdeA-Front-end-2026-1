import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  tone?: "softGreen" | "softCream";
  children: ReactNode;
};

export default function SectionCard({
  title,
  subtitle,
  icon,
  tone = "softGreen",
  children,
}: SectionCardProps) {
  const toneClass =
    tone === "softGreen"
      ? "bg-[#f6fbf7] border-green-100"
      : "bg-[#fbfaf5] border-[#ece6d9]";

  return (
    <section
      className={`rounded-[24px] border p-6 shadow-sm transition hover:-translate-y-[2px] md:p-7 ${toneClass}`}
    >
      <div className="mb-6 flex items-start gap-4">
        <div className="rounded-2xl bg-white p-3 text-[#0f5c3a] shadow-sm">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-neutral-500">{subtitle}</p>
        </div>
      </div>

      {children}
    </section>
  );
}