# Omriq MVP — Environment Variables

This repo includes an MVP **live call demo** flow that connects:

- **Twilio** (outbound call + TwiML)
- **OpenAI** (demo script generation)
- **ElevenLabs** (text-to-speech MP3)

## Required variables

Set these in your environment (or in a local `.env.local`, not committed):

- **APP_BASE_URL**: Public base URL of your app. Twilio must be able to reach this.
  - Example (deployed): `https://your-app.vercel.app`
  - Example (local dev): use ngrok and set `https://xxxx.ngrok.app`

### Twilio

- **TWILIO_ACCOUNT_SID**
- **TWILIO_AUTH_TOKEN**
- **TWILIO_FROM_NUMBER** (E.164 format, e.g. `+15551234567`)

### OpenAI

- **OPENAI_API_KEY**

### ElevenLabs

- **ELEVENLABS_API_KEY**
- **ELEVENLABS_VOICE_ID**

## Notes

- For local development, Twilio webhooks will **not** work on `localhost`. Use ngrok (or deploy the app) so Twilio can fetch:
  - `GET/POST /api/twilio/voice`
  - `GET /api/media/:id`


