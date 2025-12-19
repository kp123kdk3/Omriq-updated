import { ttsUrlForTwilio } from "@/lib/audioStorage";
import { respondAsOmriqGrandPalais } from "@/lib/hotel/respond";
import { NextResponse } from "next/server";
import twilio from "twilio";

export const runtime = "nodejs";

const ALLOWED_VOICE_KEYS = new Set([
  "concierge",
  "front-desk",
  "night-manager",
  "guest-relations",
  "reservations",
  "spa-host",
]);

function resolveVoiceKey(req: Request) {
  const url = new URL(req.url);
  const key = (url.searchParams.get("voice") ?? "").trim().toLowerCase();
  return ALLOWED_VOICE_KEYS.has(key) ? key : "";
}

function resolveElevenLabsVoiceIdFromKey(voiceKey: string) {
  if (!voiceKey) return process.env.ELEVENLABS_VOICE_ID;
  const envVar =
    voiceKey === "front-desk"
      ? "ELEVENLABS_VOICE_ID_FRONT_DESK"
      : voiceKey === "night-manager"
        ? "ELEVENLABS_VOICE_ID_NIGHT_MANAGER"
        : voiceKey === "guest-relations"
          ? "ELEVENLABS_VOICE_ID_GUEST_RELATIONS"
          : voiceKey === "spa-host"
            ? "ELEVENLABS_VOICE_ID_SPA_HOST"
            : voiceKey === "reservations"
              ? "ELEVENLABS_VOICE_ID_RESERVATIONS"
              : "ELEVENLABS_VOICE_ID_CONCIERGE";
  return process.env[envVar] || process.env.ELEVENLABS_VOICE_ID;
}

function actionUrl(req: Request, params: Record<string, string | number>) {
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  if (!host) throw new Error("Could not infer host from request.");
  const url = new URL(`${proto}://${host}/api/twilio/voice`);
  const voiceKey = resolveVoiceKey(req);
  if (voiceKey) url.searchParams.set("voice", voiceKey);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  return url.toString();
}

function absoluteTtsUrl(req: Request, text: string) {
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  if (!host) throw new Error("Could not infer host from request.");
  const url = new URL(`${proto}://${host}/api/tts`);
  url.searchParams.set("text", text);
  const voiceKey = resolveVoiceKey(req);
  if (voiceKey) url.searchParams.set("voice", voiceKey);
  return url.toString();
}

async function playOrSay(twiml: twilio.twiml.VoiceResponse, req: Request, text: string) {
  const hasBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
  if (!hasBlob) {
    // No Blob: still use ElevenLabs by letting Twilio fetch audio from our public /api/tts endpoint.
    twiml.play(absoluteTtsUrl(req, text));
    return;
  }
  const stored = await ttsUrlForTwilio(text, req);
  twiml.play(stored.url);
}

export async function POST(req: Request) {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  try {
    // Twilio hits this webhook (POST by default)
    const form = await req.formData();
    const speech = String(form.get("SpeechResult") ?? "").trim();
    const url = new URL(req.url);
    const audioUrl = url.searchParams.get("audioUrl") ?? "";

    // Requirement: keep the agent on the line indefinitely while the caller keeps speaking.
    // Hang up ONLY when the caller does not speak for > 8 seconds.
    if (!speech) {
      twiml.hangup();
      return new NextResponse(twiml.toString(), {
        status: 200,
        headers: { "Content-Type": "text/xml" },
      });
    }

    const replyText = respondAsOmriqGrandPalais(speech);
    // Barge-in: put the prompt inside the gather so Twilio stops playback if the caller starts talking.
    const gather = twiml.gather({
      input: ["speech"],
      speechTimeout: "auto",
      timeout: 8,
      bargeIn: true,
      actionOnEmptyResult: true,
      action: actionUrl(req, { audioUrl: audioUrl || "" }),
      method: "POST",
    });

    const hasBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
    if (hasBlob) {
      const voiceId = resolveElevenLabsVoiceIdFromKey(resolveVoiceKey(req));
      const stored = await ttsUrlForTwilio(replyText, req, voiceId);
      gather.play(stored.url);
    } else {
      gather.play(absoluteTtsUrl(req, replyText));
    }
  } catch (err) {
    console.error("[twilio/voice] POST error", err);
    twiml.say({ voice: "alice", language: "en-US" }, "Sorry, there was a system error. Please try again.");
    twiml.hangup();
  }

  return new NextResponse(twiml.toString(), { status: 200, headers: { "Content-Type": "text/xml" } });
}

export async function GET(req: Request) {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();
  try {
    // Allow GET for easier testing
    const url = new URL(req.url);
    const audioUrl = url.searchParams.get("audioUrl") ?? "";

    if (!audioUrl) {
      const first = "Hello and welcome to hotel Omriq. How may I help you today?";
      const gather = twiml.gather({
        input: ["speech"],
        speechTimeout: "auto",
        timeout: 8,
        bargeIn: true,
        actionOnEmptyResult: true,
        action: actionUrl(req, { audioUrl: "" }),
        method: "POST",
      });
      const hasBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
      if (hasBlob) {
        const voiceId = resolveElevenLabsVoiceIdFromKey(resolveVoiceKey(req));
        const stored = await ttsUrlForTwilio(first, req, voiceId);
        gather.play(stored.url);
      } else {
        gather.play(absoluteTtsUrl(req, first));
      }
    } else {
      const gather = twiml.gather({
        input: ["speech"],
        speechTimeout: "auto",
        timeout: 8,
        bargeIn: true,
        actionOnEmptyResult: true,
        action: actionUrl(req, { audioUrl }),
        method: "POST",
      });
      gather.play(audioUrl);
    }
  } catch (err) {
    console.error("[twilio/voice] GET error", err);
    twiml.say({ voice: "alice", language: "en-US" }, "Sorry, there was a system error. Goodbye.");
    twiml.hangup();
  }

  return new NextResponse(twiml.toString(), { status: 200, headers: { "Content-Type": "text/xml" } });
}


