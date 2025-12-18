"use client";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import {
  IntegrationsIcon,
  PMSIcon,
  POSIcon,
  ReservationsIcon,
  TelephonyIcon,
} from "@/components/icons";

const groups = [
  {
    title: "PMS",
    items: ["Opera (placeholder)", "Mews (placeholder)", "Cloudbeds (placeholder)", "Stayntouch (placeholder)"],
    icon: PMSIcon,
  },
  {
    title: "PBX / Telephony",
    items: ["Twilio", "SIP Trunking (placeholder)", "On prem PBX (placeholder)"],
    icon: TelephonyIcon,
  },
  {
    title: "CRS / Reservations",
    items: ["SynXis (placeholder)", "TravelClick (placeholder)", "Direct booking engine (placeholder)"],
    icon: ReservationsIcon,
  },
  {
    title: "POS",
    items: ["Micros (placeholder)", "Lightspeed (placeholder)", "Toast (placeholder)"],
    icon: POSIcon,
  },
] as const;

function LogoPill({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-sm text-muted transition hover:border-[rgba(15,23,42,0.16)] hover:bg-surface-2 hover:text-foreground">
      {children}
    </div>
  );
}

export function Integrations() {
  return (
    <section id="integrations" className="border-t border-border bg-background">
      <Container className="py-20 sm:py-24">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-surface">
              <IntegrationsIcon size={22} tone="accent" />
            </span>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Integrations</h2>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            Built to sit on top of hotel operations. Connecting systems so conversations become completed tasks.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={0.03 * i}>
              <div className="group rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white">
                    <g.icon size={20} tone="muted" className="transition-colors group-hover:text-[color:var(--omriq-blue)]" />
                  </span>
                  <div className="text-sm font-semibold text-foreground">{g.title}</div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((x) => (
                    <LogoPill key={x}>{x}</LogoPill>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}


