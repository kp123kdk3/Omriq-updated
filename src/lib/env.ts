export function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

export function normalizedBaseUrl(raw: string) {
  return raw.trim().replace(/\/+$/, "");
}

export const env = {
  APP_BASE_URL: normalizedBaseUrl(process.env.APP_BASE_URL ?? ""),

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID ?? "",
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN ?? "",
  TWILIO_FROM_NUMBER: process.env.TWILIO_FROM_NUMBER ?? "",

  OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",

  ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY ?? "",
  ELEVENLABS_VOICE_ID: process.env.ELEVENLABS_VOICE_ID ?? "",
};


