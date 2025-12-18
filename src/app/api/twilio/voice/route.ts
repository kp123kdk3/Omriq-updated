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

export async function POST(req: Request) {
  // Twilio hits this webhook (POST by default)
  const form = await req.formData();
  const speech = String(form.get("SpeechResult") ?? "").trim();
  const url = new URL(req.url);
  const audioUrl = url.searchParams.get("audioUrl") ?? "";

  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  // Requirement: keep the agent on the line indefinitely while the caller keeps speaking.
  // Hang up ONLY when the caller does not speak for > 8 seconds.
  if (!speech) {
    twiml.hangup();
    return new NextResponse(twiml.toString(), {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  }

  // Hotel-trained response (Omriq Grand Palais demo property).
  const replyText = respondAsOmriqGrandPalais(speech);
  const replyMp3 = await synthesizeWithElevenLabs(replyText);
  const storedReply = await storeMp3ForTwilio(replyMp3, req);
  twiml.play(storedReply.url);

  const gather = twiml.gather({
    input: ["speech"],
    speechTimeout: "auto",
    timeout: 8,
    actionOnEmptyResult: true,
    action: actionUrl(req, { audioUrl: audioUrl || "" }),
    method: "POST",
  });
  gather.say(" ");

  return new NextResponse(twiml.toString(), {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

export async function GET(req: Request) {
  // Allow GET for easier testing
  const url = new URL(req.url);
  const audioUrl = url.searchParams.get("audioUrl") ?? "";

  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();
  if (!audioUrl) {
    const first =
      `Thank you for calling ${"Omriq Grand Palais"}. ` +
      "How may I assist you today?";
    const mp3 = await synthesizeWithElevenLabs(first);
    const stored = await storeMp3ForTwilio(mp3, req);
    twiml.play(stored.url);
    const gather = twiml.gather({
      input: ["speech"],
      speechTimeout: "auto",
      timeout: 8,
      actionOnEmptyResult: true,
      action: actionUrl(req, { audioUrl: stored.url }),
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

  return new NextResponse(twiml.toString(), {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}


