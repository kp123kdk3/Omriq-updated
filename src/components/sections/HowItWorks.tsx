"use client";

import { Container } from "@/components/Container";
import { HowItWorksStepperVertical, type ActiveStep } from "@/components/diagrams/HowItWorksStepperVertical";
import { Reveal } from "@/components/Reveal";
import { useEffect, useMemo, useRef, useState } from "react";

const steps = [
  {
    n: "01",
    title: "Connect hotel systems",
    body: "Integrate PBX and operational tools, or configure structured workflows where direct APIs aren’t available.",
  },
  {
    n: "02",
    title: "Train on hotel data",
    body: "Room types, amenities, policies, menus, staff playbooks, and local guidance. Organized into hotel specific intelligence.",
  },
  {
    n: "03",
    title: "Deploy the AI agent",
    body: "Voice-first receptionist behavior: interruptions, clarifying questions, confident handoffs to staff when needed.",
  },
  {
    n: "04",
    title: "Monitor & improve",
    body: "Conversation logs, confidence thresholds, and workflow outcomes. Continuously tuned to match standards of service.",
  },
] as const;

export function HowItWorks() {
  const [hoverStep, setHoverStep] = useState<ActiveStep | null>(null);
  const [inViewStep, setInViewStep] = useState<ActiveStep>(1);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const activeStep: ActiveStep = useMemo(() => hoverStep ?? inViewStep ?? 1, [hoverStep, inViewStep]);

  useEffect(() => {
    const els = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (els.length === 0) return;

    const ratios = new Map<Element, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target, e.intersectionRatio);
        const best = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0];
        if (!best) return;
        const stepAttr = (best[0] as HTMLElement).dataset.step;
        const next = Number(stepAttr) as ActiveStep;
        if (next >= 1 && next <= 4) setInViewStep(next);
      },
      { threshold: [0.15, 0.25, 0.35, 0.5, 0.65] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="border-t border-border bg-background">
      <Container className="py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">How it works</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-4" />
            </Reveal>

            <div className="mt-8">
              <HowItWorksStepperVertical activeStep={activeStep} />
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-4">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={0.03 * i}>
                  <div
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    data-step={(i + 1).toString()}
                    onMouseEnter={() => setHoverStep((i + 1) as ActiveStep)}
                    onMouseLeave={() => setHoverStep(null)}
                    className="rounded-2xl border border-border bg-surface p-6 transition hover:border-[rgba(47,91,255,0.22)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-base font-semibold text-foreground">{s.title}</div>
                        <div className="mt-2 text-sm leading-6 text-muted">{s.body}</div>
                      </div>
                      <div className="shrink-0 rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-muted">
                        {s.n}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


