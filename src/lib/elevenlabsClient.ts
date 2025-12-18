import { requireEnv } from "@/lib/env";

// MVP: call ElevenLabs REST API directly to get MP3 bytes.
export async function synthesizeWithElevenLabs(text: string) {
  const apiKey = requireEnv("ELEVENLABS_API_KEY");
  const voiceId = requireEnv("ELEVENLABS_VOICE_ID");

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream?output_format=mp3_44100_128`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.35, similarity_boost: 0.8, style: 0.25, use_speaker_boost: true },
    }),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`ElevenLabs TTS failed (${res.status}): ${msg || res.statusText}`);
  }

  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}


