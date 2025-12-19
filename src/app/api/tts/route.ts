import { synthesizeWithElevenLabs, type ElevenLabsVoiceSettings } from "@/lib/elevenlabsClient";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ALLOWED_VOICE_KEYS = new Set([
  "concierge",
  "front-desk",
  "night-manager",
  "guest-relations",
  "reservations",
  "spa-host",
]);

function resolveElevenLabsVoiceIdFromKey(voiceKey: string | null) {
  const key = (voiceKey ?? "").trim().toLowerCase();
  if (!key || !ALLOWED_VOICE_KEYS.has(key)) return undefined;

  const envVar =
    key === "front-desk"
      ? "ELEVENLABS_VOICE_ID_FRONT_DESK"
      : key === "night-manager"
        ? "ELEVENLABS_VOICE_ID_NIGHT_MANAGER"
        : key === "guest-relations"
          ? "ELEVENLABS_VOICE_ID_GUEST_RELATIONS"
          : key === "spa-host"
            ? "ELEVENLABS_VOICE_ID_SPA_HOST"
            : key === "reservations"
              ? "ELEVENLABS_VOICE_ID_RESERVATIONS"
              : "ELEVENLABS_VOICE_ID_CONCIERGE";

  const id = process.env[envVar] || process.env.ELEVENLABS_VOICE_ID;
  return id || undefined;
}

function resolveVoiceSettingsFromKey(voiceKey: string | null): ElevenLabsVoiceSettings | undefined {
  const key = (voiceKey ?? "").trim().toLowerCase();
  if (!key || !ALLOWED_VOICE_KEYS.has(key)) return undefined;

  // Even if all voices map to the same ElevenLabs Voice ID, these settings make them audibly distinct.
  // Keep changes tasteful: calm, hospitality-appropriate, no cartoon energy.
  const map: Record<string, ElevenLabsVoiceSettings> = {
    concierge: { stability: 0.28, similarity_boost: 0.9, style: 0.42, use_speaker_boost: true },
    "front-desk": { stability: 0.42, similarity_boost: 0.86, style: 0.18, use_speaker_boost: true },
    "night-manager": { stability: 0.58, similarity_boost: 0.84, style: 0.06, use_speaker_boost: true },
    "guest-relations": { stability: 0.36, similarity_boost: 0.9, style: 0.28, use_speaker_boost: true },
    reservations: { stability: 0.46, similarity_boost: 0.82, style: 0.14, use_speaker_boost: true },
    "spa-host": { stability: 0.22, similarity_boost: 0.9, style: 0.55, use_speaker_boost: true },
  };
  return map[key];
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const textRaw = url.searchParams.get("text") ?? "";
  const text = textRaw.replace(/\s+/g, " ").trim();
  const voiceKey = url.searchParams.get("voice");

  if (!text) return new NextResponse("Missing text", { status: 400 });
  // Keep URLs reasonably sized and protect the endpoint.
  if (text.length > 700) return new NextResponse("Text too long", { status: 413 });

  try {
    const voiceId = resolveElevenLabsVoiceIdFromKey(voiceKey);
    const settings = resolveVoiceSettingsFromKey(voiceKey);
    const mp3 = await synthesizeWithElevenLabs(text, voiceId, settings);
    // Return Uint8Array for NextResponse compatibility.
    return new NextResponse(new Uint8Array(mp3), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        // Allow Twilio to fetch; keep caching short because content is dynamic per query.
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "TTS failed";
    // Twilio will treat non-200 as "application error", so keep error messages simple.
    return new NextResponse(msg, { status: 500 });
  }
}


