"use client";

import { Container } from "@/components/Container";
import { PillarFlow } from "@/components/diagrams/PillarFlows";
import { Reveal } from "@/components/Reveal";
import { CheckIcon, IntegrationsIcon, KnowledgeCoreIcon, MicrophoneIcon } from "@/components/icons";

const pillars = [
  {
    icon: MicrophoneIcon,
    flow: "voice",
    title: "AI Voice Agents",
    body: "Answer all inbound calls, sound human, resolve questions, and route complex cases to staff without losing context.",
    points: ["24/7 call coverage", "Booking and inquiry handling", "Seamless escalation"],
  },
  {
    icon: KnowledgeCoreIcon,
    flow: "intelligence",
    title: "Hotel trained intelligence",
    body: "Each hotel has its own trained agent. Amenities, policies, food, spa, gym, and surroundings are always property specific.",
    points: ["Private, isolated memory", "Brand voice alignment", "Continuous improvement"],
  },
  {
    icon: IntegrationsIcon,
    flow: "integrations",
    title: "System Integration",
    body: "Designed to connect into PMS, PBX, CRS, POS, and future CRM workflows so conversations become completed tasks.",
    points: ["Operational workflows", "Structured logs", "Enterprise ready architecture"],
  },
] as const;

export function Pillars() {
  return (
    <section className="border-t border-border bg-background">
      <Container className="py-20 sm:py-24">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            What Omriq does, clearly.
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            A hotel specific agent that speaks like a professional receptionist and acts like an operational layer.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={0.04 * i}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white">
                    <p.icon size={22} tone="muted" className="transition-colors group-hover:text-[color:var(--omriq-blue)]" />
                  </span>
                  <div className="text-base font-semibold text-foreground">{p.title}</div>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted">{p.body}</p>

                <div className="mt-5">
                  <PillarFlow kind={p.flow} className="opacity-95" />
                </div>

                <ul className="mt-5 space-y-2 text-sm text-muted">
                  {p.points.map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border bg-white">
                        <CheckIcon size={16} tone="muted" className="transition-colors group-hover:text-[color:var(--omriq-blue)]" />
                      </span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}


