"use client";

import type { ReactNode } from "react";
import StepProgress from "./StepProgress";
import { SOLICITUD_COHORTE_STEPS } from "../../lib/solicitud-cohorte/steps";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

type SolicitudShellProps = {
  currentStep: number;
  description: string;
  children: ReactNode;
};

export default function SolicitudShell({
  currentStep,
  description,
  children,
}: SolicitudShellProps) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#e9dfdf] px-4 py-8 md:px-8">
      <section className="mx-auto w-full max-w-7xl overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="h-2 w-full bg-[#0f5c3a]" />

        <div className="border-b border-neutral-200 bg-white px-6 py-7 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f5c3a]">
                Portal de Posgrados
              </span>

              <h1 className="mt-4 text-3xl font-extrabold text-neutral-900 md:text-4xl">
                Solicitud de apertura de cohorte
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600 md:text-base">
                {description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.replace("/usuario/dashboard")}
              className="
              group
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#0f5c3a]/30
              bg-gradient-to-r
              from-green-50
              to-white
              px-5
              py-3
              text-2xl
              font-extrabold
              text-[#0f5c3a]
              shadow-sm
              transition-all
              duration-300
              hover:border-[#0f5c3a]
              hover:shadow-md
              hover:-translate-y-0.5
              hover:bg-green-50
              "
            >
              <LogOut
                size={42}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
              Regresar
            </button>
          </div>

          <StepProgress
            steps={SOLICITUD_COHORTE_STEPS}
            currentStep={currentStep}
          />
        </div>

        <div className="bg-[#fcfcfc] px-6 py-8 md:px-10">
          {children}
        </div>

        <div className="border-t border-neutral-200 bg-white px-6 py-5 text-center text-sm text-neutral-600">
          © Universidad de Antioquia · Portal de Posgrados
        </div>
      </section>
    </main>
  );
}