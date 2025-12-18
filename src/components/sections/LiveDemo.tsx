"use client";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { MicrophoneIcon } from "@/components/icons";
import { VoiceBars } from "@/components/ui/VoiceBars";
import { useMemo, useState } from "react";

export function LiveDemo() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [callSid, setCallSid] = useState<string | null>(null);

  const digits = useMemo(() => phone.replace(/\D/g, ""), [phone]);
  const canSubmit = useMemo(() => digits.length >= 10 && status !== "sending", [digits.length, status]);
  const barsActive = status === "sending" || focused;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setCallSid(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/demo/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = (await res.json().catch(() => null)) as null | { ok?: boolean; error?: string; callSid?: string };
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Unable to start demo call.");
      }
      setCallSid(data.callSid ?? null);
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Unable to start demo call.");
    }
  }

  return (
    <section id="live-demo" className="border-t border-border bg-background">
      <Container className="py-20 sm:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-5 py-12 sm:px-6 sm:py-14">
          {/* subtle dot texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,1)_1px,transparent_0)] bg-[size:18px_18px] opacity-[0.035]"
          />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-muted">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface">
                    <MicrophoneIcon size={14} className="text-muted" />
                  </span>
                  Live demo
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Live call demo
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-4 text-lg leading-8 text-muted">
                  Enter a phone number and we’ll place a short demo call from a sample agent. This is a prototype flow
                  in the MVP.
                </p>
              </Reveal>

              <p className="mt-6 max-w-md text-sm leading-6 text-muted">
                Demo disclaimer: no reservations are created and no operational systems are contacted.
              </p>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                  <div className="flex items-end justify-between gap-4">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Phone number
                    </label>
                    <VoiceBars active={barsActive} size="sm" variant="accent" />
                  </div>

                  <form onSubmit={onSubmit} className="mt-3 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                    <div>
                      <input
                        id="phone"
                        name="phone"
                        inputMode="tel"
                        placeholder="+1 (555) 123-4567"
                        value={phone}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onChange={(e) => {
                          setStatus("idle");
                          setPhone(e.target.value);
                        }}
                        className="h-11 w-full rounded-xl border border-border bg-white px-4 text-[15px] text-foreground placeholder:text-muted-2 focus:outline-none focus:ring-2 focus:ring-[rgba(47,91,255,0.35)]"
                        aria-describedby="demo-help"
                      />
                      <p id="demo-help" className="mt-2 text-xs text-muted">
                        We’ll only use this number to place a single demo call.
                      </p>
                    </div>

                    <div className="sm:pl-2">
                      <Button
                        type="submit"
                        disabled={!canSubmit}
                        className="w-full justify-center active:scale-[0.99] sm:w-auto"
                      >
                        {status === "sending" ? "Calling…" : "Call me"}
                      </Button>
                    </div>
                  </form>

                  {error ? (
                    <div className="mt-4 rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-foreground">
                      <span className="font-semibold">Could not start call.</span> {error}
                    </div>
                  ) : null}

                  {status === "sent" ? (
                    <div className="mt-4 rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-foreground">
                      We’ll call you shortly. This is a prototype flow in the MVP.
                      {callSid ? (
                        <div className="mt-2 text-xs text-muted">
                          Call SID: <span className="font-mono">{callSid}</span>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


