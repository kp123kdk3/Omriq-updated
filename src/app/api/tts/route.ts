import { synthesizeWithElevenLabs } from "@/lib/elevenlabsClient";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function requestBaseUrl(req: Request) {
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  if (!host) throw new Error("Could not infer host from request.");
  return `${proto}://${host}`;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const textRaw = url.searchParams.get("text") ?? "";
  const text = textRaw.replace(/\s+/g, " ").trim();

  if (!text) return new NextResponse("Missing text", { status: 400 });
  // Keep URLs reasonably sized and protect the endpoint.
  if (text.length > 700) return new NextResponse("Text too long", { status: 413 });

  try {
    const mp3 = await synthesizeWithElevenLabs(text);
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


