import { storeMp3ForTwilio } from "@/lib/audioStorage";
import { synthesizeWithElevenLabs } from "@/lib/elevenlabsClient";
import { generateDemoScript } from "@/lib/openaiClient";
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
  const callSid = String(form.get("CallSid") ?? "");
  const url = new URL(req.url);
  const audioUrl = url.searchParams.get("audioUrl") ?? "";
  const turn = Number(url.searchParams.get("turn") ?? "0");

  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  const nextTurn = Math.min(turn + 1, 3);

  // If we somehow got here without an initial audio URL, fall back to a generated greeting.
  if (!audioUrl && turn === 0) {
    const first = (await generateDemoScript()) + " How may I assist you today?";
    const mp3 = await synthesizeWithElevenLabs(first);
    const stored = await storeMp3ForTwilio(mp3, req);
    twiml.play(stored.url);
  } else if (audioUrl && turn === 0) {
    twiml.play(audioUrl);
  }

  // After the greeting, gather speech and respond. Keep it short for MVP.
  if (turn >= 0 && turn < 3) {
    if (turn > 0 && speech) {
      const replyText =
        `Thank you. I heard: ${speech}. ` +
        "This is a demo call, and no reservations are created. Would you like to hear about call coverage, hotel training, or integrations?";
      const replyMp3 = await synthesizeWithElevenLabs(replyText);
      const storedReply = await storeMp3ForTwilio(replyMp3, req);
      twiml.play(storedReply.url);
    } else if (turn > 0 && !speech) {
      const reprompt = "I did not catch that. Could you repeat your question?";
      const repromptMp3 = await synthesizeWithElevenLabs(reprompt);
      const storedReprompt = await storeMp3ForTwilio(repromptMp3, req);
      twiml.play(storedReprompt.url);
    }

    const gather = twiml.gather({
      input: ["speech", "dtmf"],
      speechTimeout: "auto",
      timeout: 6,
      action: actionUrl(req, { audioUrl: audioUrl || "", turn: nextTurn }),
      method: "POST",
    });
    gather.say(" ");
  } else {
    const goodbye = "Thank you for your time. Goodbye.";
    const byeMp3 = await synthesizeWithElevenLabs(goodbye);
    const storedBye = await storeMp3ForTwilio(byeMp3, req);
    twiml.play(storedBye.url);
    twiml.hangup();
  }

  return new NextResponse(twiml.toString(), {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

export async function GET(req: Request) {
  // Allow GET for easier testing
  const url = new URL(req.url);
  const audioUrl = url.searchParams.get("audioUrl") ?? "";
  const turn = Number(url.searchParams.get("turn") ?? "0");

  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();
  if (!audioUrl) {
    twiml.say("Demo audio is not available.");
    twiml.hangup();
  } else {
    twiml.play(audioUrl);
    const gather = twiml.gather({
      input: ["speech", "dtmf"],
      speechTimeout: "auto",
      timeout: 6,
      action: actionUrl(req, { audioUrl, turn: Math.min(turn + 1, 3) }),
      method: "POST",
    });
    gather.say(" ");
  }

  return new NextResponse(twiml.toString(), {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}


