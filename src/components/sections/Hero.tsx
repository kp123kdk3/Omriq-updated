"use client";

import { Container } from "@/components/Container";
import { HeroFlowSection } from "@/components/diagrams/HeroFlowSection";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { motion, useReducedMotion } from "framer-motion";

function BackgroundGrid() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={[
          "absolute inset-0",
          "bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)]",
          "bg-[size:64px_64px]",
          "[mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]",
        ].join(" ")}
      />
      <div className="absolute -top-24 left-1/2 h-72 w-[900px] -translate-x-1/2 rounded-full bg-[rgba(47,91,255,0.06)] blur-3xl" />
    </div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <BackgroundGrid />
      <Container className="relative pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Voice first AI agents for hospitality operations
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                The AI operating layer for hotels.
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted">
                Omriq answers every call using hotel-trained intelligence, reducing missed bookings and front desk strain.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="#book-demo" variant="primary">
                  Book a Demo
                </ButtonLink>
                <ButtonLink href="#how-it-works" variant="secondary">
                  See How It Works
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <motion.div
            className="lg:col-span-6"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          >
            <HeroFlowSection />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}


