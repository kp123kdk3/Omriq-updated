import { getAudio } from "@/lib/audioStore";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const audio = getAudio(id);
  if (!audio) return new NextResponse("Not found", { status: 404 });

  // NextResponse typing expects web BodyInit types; use Uint8Array for compatibility.
  const body = new Uint8Array(audio.bytes);
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": audio.contentType,
      "Cache-Control": "no-store",
    },
  });
}


