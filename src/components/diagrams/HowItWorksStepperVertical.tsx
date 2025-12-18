"use client";

import { FlowIcon, IntegrationsIcon, KnowledgeCoreIcon, NodesIcon } from "@/components/icons";
import type { IconProps } from "@/components/icons/IconBase";
import { motion, useReducedMotion } from "framer-motion";

export type ActiveStep = 1 | 2 | 3 | 4;

type IconComponent = (props: IconProps) => React.JSX.Element;

const steps = [
  { step: 1, label: "Connect", sub: "Systems and workflows", icon: IntegrationsIcon },
  { step: 2, label: "Train", sub: "Hotel data and policies", icon: KnowledgeCoreIcon },
  { step: 3, label: "Deploy", sub: "Voice agent goes live", icon: NodesIcon },
  { step: 4, label: "Improve", sub: "Monitor and refine", icon: FlowIcon },
] as const satisfies ReadonlyArray<{
  step: ActiveStep;
  label: string;
  sub: string;
  icon: IconComponent;
}>;

const ease = [0.22, 1, 0.36, 1] as const;

export function HowItWorksStepperVertical({
  activeStep,
  className = "",
}: {
  activeStep: ActiveStep;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div className={`rounded-2xl border border-border bg-white p-6 ${className}`}>
      <div className="space-y-5">
        {steps.map((s, idx) => {
          const isActive = s.step === activeStep;
          const isDone = s.step < activeStep;
          const showLine = idx < steps.length - 1;

          return (
            <div key={s.step} className="grid grid-cols-[44px_1fr] gap-4">
              <div className="flex flex-col items-center">
                <motion.div
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-full border bg-white",
                    isActive ? "border-accent" : "border-border",
                  ].join(" ")}
                  initial={false}
                  animate={reduced ? {} : { borderColor: isActive ? "rgba(47,91,255,0.7)" : "rgba(15,23,42,0.10)" }}
                  transition={{ duration: 0.25, ease }}
                >
                  <motion.span
                    className={[
                      "text-xs font-semibold tabular-nums",
                      isActive ? "text-foreground" : "text-muted",
                    ].join(" ")}
                    initial={false}
                    animate={reduced ? {} : { opacity: isActive ? 1 : 0.85 }}
                    transition={{ duration: 0.2, ease }}
                  >
                    {String(s.step).padStart(2, "0")}
                  </motion.span>
                </motion.div>

                {showLine ? (
                  <div className="relative mt-2 h-10 w-px overflow-hidden rounded-full bg-[rgba(15,23,42,0.10)]">
                    <motion.div
                      className="absolute inset-0 bg-[rgba(47,91,255,0.28)]"
                      initial={false}
                      animate={reduced ? {} : { scaleY: isDone ? 1 : 0 }}
                      style={{ transformOrigin: "top" }}
                      transition={{ duration: 0.35, ease }}
                    />
                  </div>
                ) : null}
              </div>

              <div className="pt-1">
                <motion.div
                  className={[
                    "flex items-center gap-2 text-base font-semibold tracking-tight",
                    isActive ? "text-foreground" : "text-foreground/85",
                  ].join(" ")}
                  initial={false}
                  animate={reduced ? {} : { opacity: isActive ? 1 : 0.78 }}
                  transition={{ duration: 0.25, ease }}
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl border border-border bg-white">
                    <s.icon
                      size={18}
                      tone={isActive ? "accent" : "muted"}
                      className="transition-colors"
                    />
                  </span>
                  {s.label}
                </motion.div>
                <motion.div
                  className="mt-1 text-sm text-muted"
                  initial={false}
                  animate={reduced ? {} : { opacity: isActive ? 1 : 0.75 }}
                  transition={{ duration: 0.25, ease }}
                >
                  {s.sub}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-sm text-muted">One step at a time. Clear progress. No pressure.</div>
    </div>
  );
}


