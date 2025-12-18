import { storeMp3ForTwilio } from "@/lib/audioStorage";
import { synthesizeWithElevenLabs } from "@/lib/elevenlabsClient";
import { respondAsOmriqGrandPalais } from "@/lib/hotel/respond";
import { NextResponse } from "next/server";
import twilio from "twilio";

export const runtime = "nodejs";

function actionUrl(req: Request, params: Record<string, string | number>) {
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  if (!host) throw new Error("Could not infer host from request.");
  const url = new URL(`${proto}://${host}/api/twilio/voice`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  return url.toString();
}

async function playOrSay(twiml: twilio.twiml.VoiceResponse, req: Request, text: string) {
  // If Vercel Blob is configured, we can reliably host MP3 audio for <Play>.
  // If not, fall back to Twilio <Say> to avoid "Application error" caused by audio fetch failures.
  const hasBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
  if (!hasBlob) {
    twiml.say({ voice: "alice", language: "en-US" }, text);
    return;
  }

  const mp3 = await synthesizeWithElevenLabs(text);
  const stored = await storeMp3ForTwilio(mp3, req);
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
    await playOrSay(twiml, req, replyText);

    const gather = twiml.gather({
      input: ["speech"],
      speechTimeout: "auto",
      timeout: 8,
      actionOnEmptyResult: true,
      action: actionUrl(req, { audioUrl: audioUrl || "" }),
      method: "POST",
    });
    gather.say(" ");
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
      const first = "Thank you for calling Omriq Grand Palais. How may I assist you today?";
      await playOrSay(twiml, req, first);
      const gather = twiml.gather({
        input: ["speech"],
        speechTimeout: "auto",
        timeout: 8,
        actionOnEmptyResult: true,
        action: actionUrl(req, { audioUrl: "" }),
        method: "POST",
      });
      gather.say(" ");
    } else {
      twiml.play(audioUrl);
      const gather = twiml.gather({
        input: ["speech"],
        speechTimeout: "auto",
        timeout: 8,
        actionOnEmptyResult: true,
        action: actionUrl(req, { audioUrl }),
        method: "POST",
      });
      gather.say(" ");
    }
  } catch (err) {
    console.error("[twilio/voice] GET error", err);
    twiml.say({ voice: "alice", language: "en-US" }, "Sorry, there was a system error. Goodbye.");
    twiml.hangup();
  }

  return new NextResponse(twiml.toString(), { status: 200, headers: { "Content-Type": "text/xml" } });
}


