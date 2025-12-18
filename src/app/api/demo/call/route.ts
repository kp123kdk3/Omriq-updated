import { putAudio, cleanupAudioStore } from "@/lib/audioStore";
import { synthesizeWithElevenLabs } from "@/lib/elevenlabsClient";
import { env } from "@/lib/env";
import { generateDemoScript } from "@/lib/openaiClient";
import { getTwilioClient, getTwilioFromNumber } from "@/lib/twilioClient";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function baseUrl() {
  if (!env.APP_BASE_URL) throw new Error("Missing APP_BASE_URL. Twilio needs a public URL to fetch TwiML/audio.");
  return env.APP_BASE_URL.replace(/\/$/, "");
}

function normalizePhone(input: string) {
  // Very light validation for MVP: keep digits and allow leading +.
  const trimmed = input.trim();
  if (trimmed.startsWith("+")) {
    const digits = "+" + trimmed.slice(1).replace(/\D/g, "");
    return digits;
  }
  // Default: treat as digits and assume US if 10 digits.
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length >= 11 && digits.length <= 15) return `+${digits}`;
  return "";
}

export async function POST(req: Request) {
  cleanupAudioStore();

  const body = (await req.json().catch(() => null)) as null | { phone?: string };
  const phoneRaw = body?.phone ?? "";
  const to = normalizePhone(phoneRaw);
  if (!to) return NextResponse.json({ ok: false, error: "Invalid phone number." }, { status: 400 });

  try {
    const text = await generateDemoScript();
    const mp3 = await synthesizeWithElevenLabs(text);
    const audioId = putAudio(mp3, "audio/mpeg");

    const client = getTwilioClient();
    const from = getTwilioFromNumber();

    // Twilio will request this URL to get TwiML instructions.
    const twimlUrl = `${baseUrl()}/api/twilio/voice?audioId=${encodeURIComponent(audioId)}`;

    const call = await client.calls.create({
      to,
      from,
      url: twimlUrl,
      method: "GET",
    });

    return NextResponse.json({ ok: true, callSid: call.sid });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}


