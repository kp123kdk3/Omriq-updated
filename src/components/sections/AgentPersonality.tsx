"use client";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowUpRightIcon, CheckIcon, WaveIcon } from "@/components/icons";
import { animate, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

function Waveform({ playing }: { playing: boolean }) {
  const reduced = useReducedMotion();
  const bars = useMemo(() => Array.from({ length: 18 }, (_, i) => i), []);

  return (
    <div className="flex h-10 items-end gap-1">
      {bars.map((i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-[rgba(255,255,255,0.65)]"
          initial={false}
          animate={
            reduced || !playing
              ? { height: 6, opacity: 0.6 }
              : { height: [6, 22, 10, 18, 8, 16, 6], opacity: [0.55, 0.9, 0.7, 0.85, 0.65, 0.8, 0.55] }
          }
          transition={
            reduced || !playing
              ? { duration: 0.2 }
              : { duration: 1.8, ease: "easeInOut", repeat: 0, delay: i * 0.02 }
          }
        />
      ))}
    </div>
  );
}

export function AgentPersonality() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (!playing) return;
    const controls = animate(0, 1, { duration: 2.0 });
    const t = setTimeout(() => setPlaying(false), 2100);
    return () => {
      controls.stop();
      clearTimeout(t);
    };
  }, [playing, reduced]);

  return (
    <section id="ai-agents" className="border-t border-border bg-background">
      <Container className="py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                An agent that sounds like your front desk.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-4 text-lg leading-8 text-muted">
                Calm. Polite. Guest first. Designed for luxury hospitality demeanor. Never rushed. Never robotic.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4">
              {[
                {
                  title: "Professional warmth",
                  body: "A confident tone that respects the guest, reflects the brand, and stays composed under pressure.",
                  icon: WaveIcon,
                },
                {
                  title: "Clarifies before acting",
                  body: "Asks the right questions, confirms details, and avoids guessing. Especially for sensitive requests.",
                  icon: CheckIcon,
                },
                {
                  title: "Clean handoffs",
                  body: "Escalates with context when human attention is needed, without forcing guests to repeat themselves.",
                  icon: ArrowUpRightIcon,
                },
              ].map((x, i) => (
                <Reveal key={x.title} delay={0.03 * i}>
                  <div className="rounded-2xl border border-border bg-surface p-5">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white">
                        <x.icon className="text-muted" size={20} />
                      </span>
                      <div className="text-sm font-semibold text-foreground">{x.title}</div>
                    </div>
                    <div className="mt-2 text-sm leading-6 text-muted">{x.body}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-foreground">Example dialogue</div>
                    <div className="mt-1 text-sm text-muted">
                      A controlled, hospitality-grade interaction. (No audio auto-play.)
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setPlaying(true)}
                    disabled={playing}
                  >
                    {playing ? "Playing…" : "Play sample"}
                  </Button>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-surface-2 p-4 text-sm leading-6 text-foreground">
                    <span className="font-semibold">Guest:</span> Hi, do you have a late checkout option tomorrow?
                  </div>
                  <div className="rounded-2xl border border-border bg-white p-4 text-sm leading-6 text-foreground">
                    <span className="font-semibold">Omriq:</span> Absolutely. May I have your last name and room
                    number? I can confirm availability and your hotel’s late checkout policy.
                  </div>
                  <div className="rounded-2xl bg-surface-2 p-4 text-sm leading-6 text-foreground">
                    <span className="font-semibold">Guest:</span> It’s Patel, room 1208.
                  </div>
                  <div className="rounded-2xl border border-border bg-white p-4 text-sm leading-6 text-foreground">
                    <span className="font-semibold">Omriq:</span> Thank you, Mr. Patel. I can offer a 1 PM late
                    checkout tomorrow. Would you like me to confirm that for you?
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-surface-inverse p-5 text-white">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold">Voice behavior</div>
                      <div className="mt-1 text-sm text-white/70">
                        Natural pacing, interruption handling, and respectful confirmations.
                      </div>
                    </div>
                    <Waveform playing={playing} />
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


