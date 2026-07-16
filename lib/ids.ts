import { randomBytes } from "node:crypto";

const ALPHABET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomString(length: number): string {
  const bytes = randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) {
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return out;
}

/** Short, URL-safe slug for the redirect link (e.g. /r/aB3xK9). */
export function generateSlug(): string {
  return randomString(7);
}

/** Secret token that authorizes editing / viewing analytics for a code. */
export function generateEditToken(): string {
  return randomString(32);
}
