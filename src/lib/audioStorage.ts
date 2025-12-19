import { head, put } from "@vercel/blob";
import { env } from "@/lib/env";
import { putAudio } from "@/lib/audioStore";
import crypto from "node:crypto";
import { synthesizeWithElevenLabs } from "@/lib/elevenlabsClient";

type PutResult =
  | { kind: "blob"; url: string }
  | { kind: "memory"; audioId: string; url: string };

function requestBaseUrl(req: Request) {
  if (env.APP_BASE_URL) return env.APP_BASE_URL;
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  if (!host) throw new Error("Could not infer host from request.");
  return `${proto}://${host}`;
}

export async function storeMp3ForTwilio(bytes: Buffer, req: Request): Promise<PutResult> {
  // Prefer Vercel Blob in production so Twilio can fetch audio reliably.
  // Fallback to in-memory store for local development.
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (token) {
    const pathname = `omriq/demo/${crypto.randomUUID()}.mp3`;
    const res = await put(pathname, bytes, {
      access: "public",
      contentType: "audio/mpeg",
      token,
    });
    return { kind: "blob", url: res.url };
  }

  const audioId = putAudio(bytes, "audio/mpeg");
  const url = `${requestBaseUrl(req)}/api/media/${encodeURIComponent(audioId)}`;
  return { kind: "memory", audioId, url };
}

export async function ttsUrlForTwilio(text: string, req: Request, voiceIdOverride?: string): Promise<PutResult> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (token) {
    const key = `${voiceIdOverride ?? ""}|${text}`;
    const hash = crypto.createHash("sha256").update(key).digest("hex").slice(0, 24);
    const pathname = `omriq/tts-cache/${hash}.mp3`;

    // Try cache first.
    try {
      const existing = await head(pathname, { token });
      if (existing?.url) return { kind: "blob", url: existing.url };
    } catch {
      // Not found or no access, continue to generate.
    }

    const bytes = await synthesizeWithElevenLabs(text, voiceIdOverride);
    const res = await put(pathname, bytes, {
      access: "public",
      contentType: "audio/mpeg",
      token,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return { kind: "blob", url: res.url };
  }

  // Local fallback.
  const bytes = await synthesizeWithElevenLabs(text, voiceIdOverride);
  return storeMp3ForTwilio(bytes, req);
}


