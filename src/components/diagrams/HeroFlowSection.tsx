"use client";

import { HeroFlowDiagram } from "@/components/diagrams/HeroFlowDiagram";
import { InboundSignalIcon, KnowledgeCoreIcon, OutcomeBranchIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

function CardIcon({ kind }: { kind: "input" | "intelligence" | "outcome" }) {
  const common = "transition-colors";
  if (kind === "input") return <InboundSignalIcon size={20} tone="muted" className={common} />;
  if (kind === "intelligence") return <KnowledgeCoreIcon size={20} tone="muted" className={common} />;
  return <OutcomeBranchIcon size={20} tone="muted" className={common} />;
}

export function HeroFlowSection() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="relative">
        {/* Desktop / tablet */}
        <div className="hidden md:block">
          <HeroFlowDiagram variant="desktop" className="h-auto w-full" />

          {/* HTML overlay labels */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-3 top-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Input
            </div>
            <div className="absolute left-1/2 top-3 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Omriq
            </div>
            <div className="absolute right-3 top-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Outcomes
            </div>

            {/* Outcome labels aligned to nodes */}
            <div className="absolute right-3 top-[33%] -translate-y-1/2 text-sm text-muted">Booking</div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">Resolution</div>
            <div className="absolute right-3 top-[67%] -translate-y-1/2 text-sm text-muted">Routing</div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <HeroFlowDiagram variant="mobile" className="h-auto w-full" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-2 top-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Input
            </div>
            <div className="absolute left-1/2 top-2 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Omriq
            </div>
            <div className="absolute right-2 top-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Outcomes
            </div>
          </div>
        </div>
      </div>

      {/* Cards aligned to conceptual zones */}
      <div className="mt-4 grid gap-3 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <div className="group rounded-2xl border border-border bg-white p-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface">
                <span className="group-hover:hidden">
                  <CardIcon kind="input" />
                </span>
                <span className="hidden group-hover:block">
                  <InboundSignalIcon size={20} tone="accent" />
                </span>
              </span>
              <div className="text-sm font-semibold text-foreground">Input</div>
            </div>
            <div className="mt-2 text-sm leading-6 text-muted">Calls and requests across channels.</div>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-4">
          <div className="group rounded-2xl border border-border bg-white p-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface">
                <span className="group-hover:hidden">
                  <CardIcon kind="intelligence" />
                </span>
                <span className="hidden group-hover:block">
                  <KnowledgeCoreIcon size={20} tone="accent" />
                </span>
              </span>
              <div className="text-sm font-semibold text-foreground">Intelligence</div>
            </div>
            <div className="mt-2 text-sm leading-6 text-muted">Hotel trained context and policies.</div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-4">
          <div className="group rounded-2xl border border-border bg-white p-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface">
                <span className="group-hover:hidden">
                  <CardIcon kind="outcome" />
                </span>
                <span className="hidden group-hover:block">
                  <OutcomeBranchIcon size={20} tone="accent" />
                </span>
              </span>
              <div className="text-sm font-semibold text-foreground">Outcome</div>
            </div>
            <div className="mt-2 text-sm leading-6 text-muted">Bookings, resolutions, and routing.</div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}


