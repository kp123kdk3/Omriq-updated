import { env } from "@/lib/env";
import { NextResponse } from "next/server";
import twilio from "twilio";

export const runtime = "nodejs";

function baseUrl() {
  if (!env.APP_BASE_URL) throw new Error("Missing APP_BASE_URL. Twilio needs a public URL to fetch TwiML/audio.");
  return env.APP_BASE_URL.replace(/\/$/, "");
}

export async function POST(req: Request) {
  // Twilio hits this webhook (POST by default)
  const form = await req.formData();
  const audioId = String(form.get("audioId") ?? "");

  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  if (!audioId) {
    twiml.say("Demo audio is not available.");
  } else {
    twiml.play(`${baseUrl()}/api/media/${encodeURIComponent(audioId)}`);
  }
  twiml.hangup();

  return new NextResponse(twiml.toString(), {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

export async function GET(req: Request) {
  // Allow GET for easier testing
  const url = new URL(req.url);
  const audioId = url.searchParams.get("audioId") ?? "";

  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();
  if (!audioId) {
    twiml.say("Demo audio is not available.");
  } else {
    twiml.play(`${baseUrl()}/api/media/${encodeURIComponent(audioId)}`);
  }
  twiml.hangup();

  return new NextResponse(twiml.toString(), {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}


