"use client";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { MicrophoneIcon } from "@/components/icons";
import { VoiceBars } from "@/components/ui/VoiceBars";
import { useMemo, useRef, useState } from "react";

type VoiceOption = {
  id: string;
  name: string;
  tags: string[];
};

const VOICES: VoiceOption[] = [
  { id: "concierge", name: "Concierge", tags: ["Warm", "Calm"] },
  { id: "front-desk", name: "Front Desk", tags: ["Professional", "Clear"] },
  { id: "night-manager", name: "Night Manager", tags: ["Quiet", "Reassuring"] },
  { id: "guest-relations", name: "Guest Relations", tags: ["Polished", "Empathetic"] },
  { id: "reservations", name: "Reservations", tags: ["Efficient", "Helpful"] },
  { id: "spa-host", name: "Spa Host", tags: ["Soft", "Upscale"] },
];

function normalizePhoneForClient(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("+")) return "+" + trimmed.slice(1).replace(/\D/g, "");
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length >= 11 && digits.length <= 15) return `+${digits}`;
  return "";
}

export function LiveDemo() {
  const [phone, setPhone] = useState("");
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>(VOICES[0]?.id ?? "concierge");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewing, setPreviewing] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const normalizedPhone = useMemo(() => normalizePhoneForClient(phone), [phone]);
  const canSubmit = useMemo(() => !!normalizedPhone && status !== "sending", [normalizedPhone, status]);
  const barsActive = status === "sending" || focused;

  async function onPreview(voiceId: string) {
    try {
      setError(null);
      setPreviewing(voiceId);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const sampleText = "Hello and welcome to hotel Omriq. How may I help you today?";
      const url = `/api/tts?text=${encodeURIComponent(sampleText)}&voice=${encodeURIComponent(voiceId)}`;
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setPreviewing(null);
      await audio.play();
    } catch (e) {
      setPreviewing(null);
      setError(e instanceof Error ? e.message : "Unable to preview voice.");
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/demo/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, voiceId: selectedVoiceId }),
      });
      const data = (await res.json().catch(() => null)) as null | { ok?: boolean; error?: string; callSid?: string };
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Unable to start demo call.");
      }
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
                  Live call
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Get a live call from Omriq
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-4 text-lg leading-8 text-muted">Choose a voice, enter your number, and we’ll call in seconds.</p>
              </Reveal>

              <p className="mt-6 max-w-md text-sm leading-6 text-muted">One demo call. No spam.</p>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                  <div className="flex items-end justify-between gap-4">
                    <div className="text-sm font-medium text-foreground">Choose a voice</div>
                    <VoiceBars active={barsActive} size="sm" variant="accent" />
                  </div>

                  <div
                    className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap"
                    aria-label="Choose a voice"
                    role="group"
                  >
                    {VOICES.map((v) => {
                      const selected = v.id === selectedVoiceId;
                      const previewBusy = previewing === v.id;
                      return (
                        <div
                          key={v.id}
                          className={[
                            "min-w-[220px] rounded-2xl border bg-white px-3 py-3",
                            selected ? "border-[rgba(31,94,255,0.35)]" : "border-border",
                          ].join(" ")}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setStatus("idle");
                              setSelectedVoiceId(v.id);
                            }}
                            className="flex w-full items-start justify-between gap-3 text-left"
                            aria-pressed={selected}
                          >
                            <div>
                              <div className="text-sm font-semibold text-foreground">{v.name}</div>
                              <div className="mt-1 flex flex-wrap gap-1.5">
                                {v.tags.slice(0, 2).map((t) => (
                                  <span
                                    key={t}
                                    className="rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] font-medium text-muted"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                void onPreview(v.id);
                              }}
                              className={[
                                "mt-0.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
                                selected ? "border-[rgba(31,94,255,0.25)] text-foreground" : "border-border text-muted",
                              ].join(" ")}
                              aria-label={`Preview ${v.name} voice`}
                              disabled={previewBusy}
                            >
                              {previewBusy ? "Previewing…" : "Preview"}
                            </button>
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <form onSubmit={onSubmit} className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium text-foreground">
                        Phone number
                      </label>
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
                        className="mt-2 h-11 w-full rounded-xl border border-border bg-white px-4 text-[15px] text-foreground placeholder:text-muted-2 focus:outline-none focus:ring-2 focus:ring-[rgba(47,91,255,0.35)]"
                        aria-describedby="demo-help demo-error"
                        aria-invalid={!!error && !normalizedPhone}
                      />
                      <p id="demo-help" className="mt-2 text-xs text-muted">
                        We’ll only use this number for this call.
                      </p>
                      {!normalizedPhone && phone.trim().length > 0 ? (
                        <p id="demo-error" className="mt-2 text-xs text-foreground">
                          Enter a valid phone number.
                        </p>
                      ) : (
                        <span id="demo-error" className="sr-only">
                          {error ?? ""}
                        </span>
                      )}
                    </div>

                    <div className="sm:pl-2">
                      <Button
                        type="submit"
                        disabled={!canSubmit}
                        className="w-full justify-center active:scale-[0.99] sm:w-auto"
                      >
                        {status === "sending" ? "Calling…" : "Call me now"}
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
                      Calling you now. Didn’t get it? Try again.
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


