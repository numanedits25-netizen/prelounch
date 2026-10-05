/**
 * Waitlist client — talks to Supabase (project "larzo.waitlist") through
 * SECURITY DEFINER RPCs only. The table itself has RLS on with no policies,
 * so the public key below can join the list but can never read emails.
 * Schema: supabase/migrations/20261005_waitlist.sql
 */
export type WaitlistResult = {
  ok: true;
  email: string;
  position: number;
  total: number;
  referrals: number;
  referralCode: string;
  alreadyJoined: boolean;
};

export type WaitlistError = { ok: false; error: string };

// Public (anon) credentials — safe to ship to the browser.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tlhqtewfabslqlnkzmfp.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsaHF0ZXdmYWJzbHFsbmt6bWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNzc5NDIsImV4cCI6MjEwNjc1Mzk0Mn0.byCkVsjzS-5CCIlYAFt_7ZwGu7j3pH4Zfna25-izQDw";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const KEY = "larzo_waitlist_v2";

export function isValidEmail(email: string) {
  return EMAIL_RE.test(email.trim());
}

async function rpc<T>(fn: string, body: Record<string, unknown>): Promise<T> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      signal: ctrl.signal
    });
    if (!res.ok) throw new Error(`rpc ${fn} ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(t);
  }
}

type JoinRow =
  | { ok: true; already: boolean; referral_code: string; referrals: number; position: number; total: number }
  | { ok: false; error: string };

const errors: Record<string, string> = {
  invalid_email: "That email doesn't look right.",
  rate_limited: "Too many signups from this network — try again in a bit."
};

export async function joinWaitlist(input: { email: string; ref?: string | null }): Promise<WaitlistResult | WaitlistError> {
  const email = input.email.trim().toLowerCase();
  if (!isValidEmail(email)) return { ok: false, error: errors.invalid_email };

  let source: string | null = null;
  try {
    const p = new URLSearchParams(window.location.search);
    source = p.get("utm_source") || (document.referrer ? new URL(document.referrer).hostname : null) || "direct";
  } catch {
    /* ignore */
  }

  try {
    const row = await rpc<JoinRow>("join_waitlist", { p_email: email, p_ref: input.ref || null, p_source: source });
    if (!row.ok) return { ok: false, error: errors[row.error] || "Something went wrong — please try again." };
    const result: WaitlistResult = {
      ok: true,
      email,
      position: row.position,
      total: row.total,
      referrals: row.referrals,
      referralCode: row.referral_code,
      alreadyJoined: row.already
    };
    try {
      localStorage.setItem(KEY, JSON.stringify({ email, code: row.referral_code }));
    } catch {
      /* ignore */
    }
    return result;
  } catch {
    return { ok: false, error: "Couldn't reach the server — check your connection and try again." };
  }
}

export async function saveRole(referralCode: string, role: string) {
  try {
    await rpc("set_waitlist_role", { p_code: referralCode, p_role: role });
  } catch {
    /* non-critical */
  }
}

export async function waitlistCount(): Promise<number | null> {
  try {
    return await rpc<number>("waitlist_count", {});
  } catch {
    return null;
  }
}
