import OpenAI from "openai";
import { requireEnv } from "@/lib/env";

export function getOpenAIClient() {
  return new OpenAI({ apiKey: requireEnv("OPENAI_API_KEY") });
}

export async function generateDemoScript() {
  const client = getOpenAIClient();
  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    max_tokens: 180,
    messages: [
      {
        role: "system",
        content:
          "You are Omriq, a calm, professional hotel voice agent. Produce a short demo greeting that sounds like an upscale hotel receptionist. No hype. No dashes.",
      },
      {
        role: "user",
        content:
          "Generate a 2-3 sentence demo message for an investor. Mention that this is a demo call and no reservations will be created. End with a polite goodbye.",
      },
    ],
  });

  const text = resp.choices[0]?.message?.content?.trim() ?? "";
  return text || "Hello. This is a short Omriq demo call. No reservations are created in this demo. Thank you, and have a great day.";
}


