"use client";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import {
  AvailabilityIcon,
  DisconnectedNodesIcon,
  FrontDeskLoadIcon,
  MissedCallIcon,
} from "@/components/icons";

const items = [
  {
    title: "Missed calls become lost bookings",
    body: "When the front desk is busy, calls queue or go unanswered. This is most common during peaks and after hours.",
    icon: MissedCallIcon,
  },
  {
    title: "Front desks can’t scale",
    body: "High-volume inquiries, interruptions, and routine questions consume the attention meant for high-touch service.",
    icon: FrontDeskLoadIcon,
  },
  {
    title: "Guest experience depends on availability",
    body: "The fastest response usually wins. Waiting, transfers, and uncertainty erode trust.",
    icon: AvailabilityIcon,
  },
  {
    title: "Systems don’t speak the same language",
    body: "PMS, PBX, CRS, POS, and guest tools often sit in silos. Staff end up bridging gaps manually.",
    icon: DisconnectedNodesIcon,
  },
] as const;

export function Problem() {
  return (
    <section id="platform" className="border-t border-border bg-background">
      <Container className="py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Hospitality is human. Operations are fragmented.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-4 text-lg leading-8 text-muted">
                Hotels run at the intersection of many systems and constant interruptions. Guests expect immediate,
                accurate responses, with warmth and nuance, at any hour.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((it, i) => (
                <Reveal key={it.title} delay={0.03 * i}>
                  <div className="group rounded-2xl border border-border bg-surface p-5">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white">
                        <it.icon size={20} tone="muted" className="transition-colors group-hover:text-[color:var(--omriq-blue)]" />
                      </span>
                      <div className="text-sm font-semibold text-foreground">{it.title}</div>
                    </div>
                    <div className="mt-2 text-sm leading-6 text-muted">{it.body}</div>
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


