import { put } from "@vercel/blob";
import { env } from "@/lib/env";
import { putAudio } from "@/lib/audioStore";

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


