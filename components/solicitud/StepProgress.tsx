"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import type { SolicitudStep } from "../../lib/solicitud-cohorte/steps";

type StepProgressProps = {
  steps: SolicitudStep[];
  currentStep: number;
};

export default function StepProgress({
  steps,
  currentStep,
}: StepProgressProps) {
  return (
    <div className="mt-8 overflow-x-auto">
      <div className="flex min-w-[860px] items-center gap-3 pb-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={step.label} className="flex flex-1 items-center gap-3">
              <Link
                href={step.href}
                className="flex flex-col items-center"
                aria-current={isActive ? "step" : undefined}
              >
                <div
                  className={[
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-200",
                    isCompleted
                      ? "border-[#0f5c3a] bg-[#0f5c3a] text-white"
                      : isActive
                      ? "border-[#0f5c3a] bg-white text-[#0f5c3a] shadow-[0_0_0_5px_rgba(15,92,58,0.12)]"
                      : "border-neutral-300 bg-neutral-100 text-neutral-500 hover:border-[#0f5c3a]/40",
                  ].join(" ")}
                >
                  {isCompleted ? <Check size={18} /> : stepNumber}
                </div>

                <span
                  className={[
                    "mt-3 rounded-full px-3 py-1.5 text-xs font-semibold transition",
                    isCompleted
                      ? "bg-green-100 text-[#0f5c3a]"
                      : isActive
                      ? "bg-[#0f5c3a] text-white"
                      : "bg-neutral-100 text-neutral-500",
                  ].join(" ")}
                >
                  {step.label}
                </span>
              </Link>

              {index !== steps.length - 1 && (
                <div className="h-[4px] flex-1 rounded-full bg-neutral-200">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isCompleted ? "w-full bg-[#0f5c3a]" : "w-0"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}