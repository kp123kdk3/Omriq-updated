import { env } from "@/lib/env";
import { NextResponse } from "next/server";
import twilio from "twilio";

export const runtime = "nodejs";

function requestBaseUrl(req: Request) {
  // Prefer explicit env, but fall back to request headers (works well on Vercel).
  if (env.APP_BASE_URL) return env.APP_BASE_URL;
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  if (!host) throw new Error("Missing APP_BASE_URL and could not infer host from request.");
  return `${proto}://${host}`;
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
    twiml.play(`${requestBaseUrl(req)}/api/media/${encodeURIComponent(audioId)}`);
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
    twiml.play(`${requestBaseUrl(req)}/api/media/${encodeURIComponent(audioId)}`);
  }
  twiml.hangup();

  return new NextResponse(twiml.toString(), {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}


