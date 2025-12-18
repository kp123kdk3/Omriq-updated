import { cleanupAudioStore } from "@/lib/audioStore";
import { storeMp3ForTwilio } from "@/lib/audioStorage";
import { synthesizeWithElevenLabs } from "@/lib/elevenlabsClient";
import { generateDemoScript } from "@/lib/openaiClient";
import { getTwilioClient, getTwilioFromNumber } from "@/lib/twilioClient";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function requestBaseUrl(req: Request) {
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  if (!host) throw new Error("Could not infer host from request.");
  return `${proto}://${host}`;
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
    // First message should include a clear question so we can continue the conversation.
    const text =
      (await generateDemoScript()) +
      " How may I assist you today?";
    const mp3 = await synthesizeWithElevenLabs(text);
    const stored = await storeMp3ForTwilio(mp3, req);

    const client = getTwilioClient();
    const from = getTwilioFromNumber();

    // Twilio will request this URL to get TwiML instructions.
    const twimlUrl = `${requestBaseUrl(req)}/api/twilio/voice?audioUrl=${encodeURIComponent(stored.url)}`;

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


