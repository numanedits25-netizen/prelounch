/**
 * Waitlist client.
 *
 * UI-first build: this is the single seam where the real backend plugs in.
 * Today it validates, simulates latency and persists locally so the full UX
 * (loading → success → position → referral link) can be reviewed end to end.
 *
 * To go live: replace the body of `joinWaitlist` with a POST to
 * `/api/waitlist` (Supabase insert + Resend confirmation) and return the
 * server's position / referral code.
 */
export type WaitlistResult = {
  ok: true;
  email: string;
  position: number;
  referralCode: string;
  alreadyJoined: boolean;
};

export type WaitlistError = { ok: false; error: string };

const KEY = "lz_waitlist_v1";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email: string) {
  return EMAIL_RE.test(email.trim());
}

function code(email: string) {
  let h = 0;
  for (const ch of email) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h.toString(36).slice(0, 6).toUpperCase().padStart(6, "L");
}

export async function joinWaitlist(input: { email: string; role?: string; ref?: string | null }): Promise<WaitlistResult | WaitlistError> {
  const email = input.email.trim().toLowerCase();
  if (!isValidEmail(email)) return { ok: false, error: "That email doesn't look right." };

  await new Promise((r) => setTimeout(r, 1100));

  try {
    const existing = JSON.parse(localStorage.getItem(KEY) || "null") as WaitlistResult | null;
    if (existing && existing.email === email) return { ...existing, alreadyJoined: true };
  } catch {
    /* ignore */
  }

  // Placeholder position until the backend returns the real one.
  const result: WaitlistResult = { ok: true, email, position: 0, referralCode: code(email), alreadyJoined: false };
  try {
    localStorage.setItem(KEY, JSON.stringify(result));
  } catch {
    /* ignore */
  }
  return result;
}
