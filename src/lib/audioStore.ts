type Entry = { bytes: Buffer; contentType: string; expiresAt: number };

// In-memory store (MVP). For production: move to S3/R2 with signed URLs.
const store = new Map<string, Entry>();

const TTL_MS = 10 * 60 * 1000; // 10 minutes

export function putAudio(bytes: Buffer, contentType = "audio/mpeg") {
  const id = crypto.randomUUID();
  store.set(id, { bytes, contentType, expiresAt: Date.now() + TTL_MS });
  return id;
}

export function getAudio(id: string) {
  const e = store.get(id);
  if (!e) return null;
  if (Date.now() > e.expiresAt) {
    store.delete(id);
    return null;
  }
  return e;
}

export function cleanupAudioStore() {
  const now = Date.now();
  for (const [k, v] of store.entries()) {
    if (now > v.expiresAt) store.delete(k);
  }
}


