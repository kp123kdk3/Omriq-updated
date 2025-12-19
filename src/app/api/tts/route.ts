import { synthesizeWithElevenLabs } from "@/lib/elevenlabsClient";
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
    const mp3 = await synthesizeWithElevenLabs(text, voiceId);
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


