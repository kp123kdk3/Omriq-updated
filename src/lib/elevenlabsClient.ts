import { requireEnv } from "@/lib/env";

// MVP: call ElevenLabs REST API directly to get MP3 bytes.
export async function synthesizeWithElevenLabs(text: string) {
  const apiKey = requireEnv("ELEVENLABS_API_KEY");
  const voiceId = requireEnv("ELEVENLABS_VOICE_ID");

  // Higher bitrate helps reduce "robotic" artifacts on phone playback.
  // `optimize_streaming_latency` keeps responses snappy without overly degrading quality.
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream?output_format=mp3_44100_192&optimize_streaming_latency=2`,
    {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      // Tuned for a calmer, more human concierge delivery.
      voice_settings: { stability: 0.25, similarity_boost: 0.9, style: 0.45, use_speaker_boost: true },
    }),
    },
  );

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`ElevenLabs TTS failed (${res.status}): ${msg || res.statusText}`);
  }

  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}


