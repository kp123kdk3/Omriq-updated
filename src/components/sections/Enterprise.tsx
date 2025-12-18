"use client";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { EnterpriseIcon, InvestorsIcon, KnowledgeCoreIcon, ShieldIcon, SlidersIcon, NodesIcon } from "@/components/icons";

const points = [
  {
    title: "Reliability first design",
    body: "Confidence thresholds, clear boundaries, and deterministic workflows. Built for real world hotel operations.",
    icon: ShieldIcon,
  },
  {
    title: "Hotel specific intelligence",
    body: "Each property is trained on its own operational reality. Isolated by design for privacy and accuracy.",
    icon: KnowledgeCoreIcon,
  },
  {
    title: "Brand control",
    body: "Tone, policies, and escalation logic are configurable. The experience matches your standards of service.",
    icon: SlidersIcon,
  },
  {
    title: "Infrastructure positioning",
    body: "A unifying layer across systems and channels. Built to scale from single properties to multi property groups.",
    icon: NodesIcon,
  },
] as const;

export function Enterprise() {
  return (
    <section id="enterprise" className="border-t border-border bg-background">
      <Container className="py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-surface">
                  <EnterpriseIcon size={22} tone="accent" />
                </span>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Enterprise credibility. Hospitality discipline.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-4 text-lg leading-8 text-muted">
                Omriq is built for executives who care about consistency, operational rigor, and brand protection.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {points.map((p, i) => (
                <Reveal key={p.title} delay={0.03 * i}>
                  <div className="group rounded-2xl border border-border bg-surface p-6">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white">
                        <p.icon size={20} tone="muted" className="transition-colors group-hover:text-[color:var(--omriq-blue)]" />
                      </span>
                      <div className="text-sm font-semibold text-foreground">{p.title}</div>
                    </div>
                    <div className="mt-2 text-sm leading-6 text-muted">{p.body}</div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-foreground">Investor signal</div>
                    <div className="mt-1 text-sm text-muted">
                      A stable infrastructure layer that scales across properties and systems.
                    </div>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-white">
                    <InvestorsIcon size={22} tone="muted" />
                  </span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border bg-white p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted">Reliability</div>
                    <div className="mt-2 h-2 rounded-full bg-surface-2">
                      <div className="h-2 w-[82%] rounded-full bg-[rgba(47,91,255,0.30)]" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-white p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted">Coverage</div>
                    <div className="mt-2 h-2 rounded-full bg-surface-2">
                      <div className="h-2 w-[76%] rounded-full bg-[rgba(47,91,255,0.24)]" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-white p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted">Integration depth</div>
                    <div className="mt-2 h-2 rounded-full bg-surface-2">
                      <div className="h-2 w-[70%] rounded-full bg-[rgba(47,91,255,0.20)]" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}


