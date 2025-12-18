import { requireEnv } from "@/lib/env";
import twilio from "twilio";

export function getTwilioClient() {
  return twilio(requireEnv("TWILIO_ACCOUNT_SID"), requireEnv("TWILIO_AUTH_TOKEN"));
}

export function getTwilioFromNumber() {
  return requireEnv("TWILIO_FROM_NUMBER");
}


