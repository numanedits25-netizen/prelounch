// Larzo — "you're on the list" welcome email.
// Called by the waitlist insert trigger (pg_net) with { id }. It claims the row
// atomically (welcome_sent_at IS NULL → now()), so each signup gets exactly one
// email and the endpoint can't be used to mail arbitrary addresses.
// If the new signup came in through someone's referral link, it then sends that
// referrer a "you moved up" email (claimed via referral_notified_at on the NEW row,
// so each referral triggers at most one email; the friend's email is never shown).
// Secret required: RESEND_API_KEY (Supabase → Edge Functions → Secrets).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SB_URL = Deno.env.get("SUPABASE_URL")!;
const SRK = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND = Deno.env.get("RESEND_API_KEY");
const SITE = Deno.env.get("SITE_URL") ?? "https://www.larzo.io";
const FROM = Deno.env.get("WELCOME_FROM") ?? "Larzo <hello@larzo.io>";
const REPLY_TO = Deno.env.get("WELCOME_REPLY_TO") ?? "larzoai@gmail.com";

const sb = (path: string, init: RequestInit = {}) =>
  fetch(`${SB_URL}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: SRK, Authorization: `Bearer ${SRK}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
  });

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

function emailHtml(position: number | null, link: string) {
  const pos = position ? `#${position}` : "in";
  return `<!doctype html><html><body style="margin:0;padding:0;background:#050507;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#050507;padding:32px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0c0c12;border:1px solid #1f1f2b;border-radius:20px;overflow:hidden;">
<tr><td style="height:4px;background:linear-gradient(90deg,#7c3aed,#4f46e5,#06b6d4);background-color:#4f46e5;"></td></tr>
<tr><td style="padding:32px 32px 8px;">
  <img src="${SITE}/brand/logo-128.png" width="44" height="44" alt="Larzo" style="display:block;border-radius:10px;">
  <p style="margin:20px 0 6px;color:#22d3ee;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">You're on the list</p>
  <h1 style="margin:0;color:#f8fafc;font-size:26px;line-height:1.25;font-weight:700;">Welcome to Larzo 🎉</h1>
  <p style="margin:14px 0 0;color:#a1a1aa;font-size:15px;line-height:1.6;">Thanks for joining early. Larzo finds the local businesses that need what you sell: it audits each one, scores the gaps and hands you a ranked list ready for outreach.</p>
</td></tr>
<tr><td style="padding:24px 32px 8px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#111119;border:1px solid #23233a;border-radius:14px;">
  <tr><td align="center" style="padding:22px;">
    <p style="margin:0;color:#a1a1aa;font-size:13px;">Your spot in line</p>
    <p style="margin:6px 0 0;color:#ffffff;font-size:40px;font-weight:800;letter-spacing:-1px;">${pos}</p>
  </td></tr></table>
</td></tr>
<tr><td style="padding:20px 32px 4px;">
  <p style="margin:0;color:#f8fafc;font-size:16px;font-weight:600;">Want to get in sooner?</p>
  <p style="margin:8px 0 14px;color:#a1a1aa;font-size:14px;line-height:1.6;">Share your personal link. Every friend who joins with it moves you up <b style="color:#f8fafc;">5 spots</b>.</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#050507;border:1px dashed #33334d;border-radius:10px;"><tr><td style="padding:12px 14px;color:#22d3ee;font-size:14px;word-break:break-all;"><a href="${link}" style="color:#22d3ee;text-decoration:none;">${link}</a></td></tr></table>
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:18px;"><tr><td style="border-radius:999px;background:#4f46e5;background-image:linear-gradient(135deg,#7c3aed,#4f46e5,#06b6d4);">
    <a href="${link}" style="display:inline-block;padding:12px 24px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;">Open my referral link →</a>
  </td></tr></table>
</td></tr>
<tr><td style="padding:24px 32px 30px;">
  <p style="margin:0;color:#71717a;font-size:13px;line-height:1.6;">We'll email you when your access is ready. Questions? Just reply to this email, a real person reads every one.</p>
</td></tr>
</table>
<p style="margin:18px 0 0;color:#52525b;font-size:11px;line-height:1.6;">You're getting this because you joined the Larzo waitlist at ${SITE.replace("https://", "")}.<br>Don't want these? Reply "unsubscribe" and we'll remove you.</p>
</td></tr></table></body></html>`;
}

function emailText(position: number | null, link: string) {
  return `Welcome to Larzo!\n\nYou're on the list${position ? ` at #${position}` : ""}.\n\nEvery friend who joins with your link moves you up 5 spots:\n${link}\n\nWe'll email you when your access is ready. Questions? Just reply.\n\nDon't want these? Reply "unsubscribe".`;
}

function movedUpHtml(position: number | null, prev: number | null, referrals: number, link: string) {
  const pos = position ? `#${position}` : "higher";
  const jump = position && prev && prev > position ? `<p style="margin:8px 0 0;color:#22d3ee;font-size:14px;font-weight:600;">▲ up from #${prev}</p>` : "";
  const top = position === 1
    ? "You're at the very front of the line. First invites go out to you."
    : "Keep sharing — every friend who joins with your link moves you up another <b style=\"color:#f8fafc;\">5 spots</b>.";
  return `<!doctype html><html><body style="margin:0;padding:0;background:#050507;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#050507;padding:32px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0c0c12;border:1px solid #1f1f2b;border-radius:20px;overflow:hidden;">
<tr><td style="height:4px;background:linear-gradient(90deg,#7c3aed,#4f46e5,#06b6d4);background-color:#4f46e5;"></td></tr>
<tr><td style="padding:32px 32px 8px;">
  <img src="${SITE}/brand/logo-128.png" width="44" height="44" alt="Larzo" style="display:block;border-radius:10px;">
  <p style="margin:20px 0 6px;color:#22d3ee;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Your link worked</p>
  <h1 style="margin:0;color:#f8fafc;font-size:26px;line-height:1.25;font-weight:700;">You just moved up 🚀</h1>
  <p style="margin:14px 0 0;color:#a1a1aa;font-size:15px;line-height:1.6;">Someone joined the Larzo waitlist with your referral link. Thanks for spreading the word.</p>
</td></tr>
<tr><td style="padding:24px 32px 8px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#111119;border:1px solid #23233a;border-radius:14px;">
  <tr><td align="center" style="padding:22px;">
    <p style="margin:0;color:#a1a1aa;font-size:13px;">Your new spot in line</p>
    <p style="margin:6px 0 0;color:#ffffff;font-size:40px;font-weight:800;letter-spacing:-1px;">${pos}</p>${jump}
    <p style="margin:10px 0 0;color:#71717a;font-size:13px;">Friends joined with your link: <b style="color:#f8fafc;">${referrals}</b></p>
  </td></tr></table>
</td></tr>
<tr><td style="padding:20px 32px 4px;">
  <p style="margin:0 0 14px;color:#a1a1aa;font-size:14px;line-height:1.6;">${top}</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#050507;border:1px dashed #33334d;border-radius:10px;"><tr><td style="padding:12px 14px;color:#22d3ee;font-size:14px;word-break:break-all;"><a href="${link}" style="color:#22d3ee;text-decoration:none;">${link}</a></td></tr></table>
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:18px;"><tr><td style="border-radius:999px;background:#4f46e5;background-image:linear-gradient(135deg,#7c3aed,#4f46e5,#06b6d4);">
    <a href="${link}" style="display:inline-block;padding:12px 24px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;">Share my link →</a>
  </td></tr></table>
</td></tr>
<tr><td style="padding:24px 32px 30px;">
  <p style="margin:0;color:#71717a;font-size:13px;line-height:1.6;">We'll email you when your access is ready. Questions? Just reply to this email.</p>
</td></tr>
</table>
<p style="margin:18px 0 0;color:#52525b;font-size:11px;line-height:1.6;">You're getting this because you joined the Larzo waitlist at ${SITE.replace("https://", "")} and someone used your link.<br>Don't want these? Reply "unsubscribe" and we'll remove you.</p>
</td></tr></table></body></html>`;
}

function movedUpText(position: number | null, prev: number | null, referrals: number, link: string) {
  return `You just moved up on the Larzo waitlist!\n\nSomeone joined with your referral link.\nYour new spot: ${position ? `#${position}` : "higher"}${position && prev && prev > position ? ` (up from #${prev})` : ""}\nFriends joined with your link: ${referrals}\n\nKeep sharing, every friend moves you up 5 spots:\n${link}\n\nDon't want these? Reply "unsubscribe".`;
}

async function getPosition(id: number, referrals: number): Promise<number | null> {
  const p = await sb("rpc/waitlist_position", { method: "POST", body: JSON.stringify({ p_id: id, p_referrals: referrals }) });
  return p.ok ? Number(await p.json()) || null : null;
}

// Tell the referrer they moved up. Never throws; returns a short status string.
async function notifyReferrer(newId: number, refCode: string): Promise<string> {
  try {
    const claim = await sb(`waitlist?id=eq.${newId}&referral_notified_at=is.null&select=id`, {
      method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify({ referral_notified_at: new Date().toISOString() }),
    });
    if (!claim.ok || !(await claim.json()).length) return "skipped";
    const rr = await sb(`waitlist?referral_code=eq.${encodeURIComponent(refCode)}&select=id,email,referral_code,referrals`);
    const refs = rr.ok ? await rr.json() : [];
    if (!refs.length) return "no-referrer";
    const ref = refs[0];
    const now = await getPosition(ref.id, ref.referrals);
    const prev = await getPosition(ref.id, Math.max(0, ref.referrals - 1));
    const link = `${SITE}/?ref=${ref.referral_code}`;
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM, to: [ref.email], reply_to: REPLY_TO,
        subject: now ? `You moved up to #${now} on the Larzo waitlist 🚀` : "You moved up on the Larzo waitlist 🚀",
        html: movedUpHtml(now, prev, ref.referrals, link), text: movedUpText(now, prev, ref.referrals, link),
        headers: { "List-Unsubscribe": `<mailto:${REPLY_TO}?subject=unsubscribe>` },
      }),
    });
    if (!r.ok) {
      const out = await r.text();
      await sb(`waitlist?id=eq.${newId}`, { method: "PATCH", body: JSON.stringify({ referral_notify_error: out.slice(0, 500) }) });
      return "error";
    }
    return "sent";
  } catch (e) {
    await sb(`waitlist?id=eq.${newId}`, { method: "PATCH", body: JSON.stringify({ referral_notify_error: String(e).slice(0, 500) }) }).catch(() => {});
    return "error";
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method" }, 405);
  if (!RESEND) return json({ error: "RESEND_API_KEY missing" }, 500);
  let id: number;
  try { id = Number((await req.json()).id); } catch { return json({ error: "bad body" }, 400); }
  if (!Number.isInteger(id) || id <= 0) return json({ error: "bad id" }, 400);

  // Claim: only unsent, recent rows.
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const claim = await sb(`waitlist?id=eq.${id}&welcome_sent_at=is.null&created_at=gt.${since}&select=id,email,referral_code,referrals,referred_by`, {
    method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify({ welcome_sent_at: new Date().toISOString() }),
  });
  const rows = claim.ok ? await claim.json() : [];
  if (!rows.length) return json({ skipped: true });
  const row = rows[0];

  const pos = await getPosition(row.id, row.referrals);

  const link = `${SITE}/?ref=${row.referral_code}`;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM, to: [row.email], reply_to: REPLY_TO,
      subject: pos ? `You're #${pos} on the Larzo waitlist 🎉` : "You're on the Larzo waitlist 🎉",
      html: emailHtml(pos, link), text: emailText(pos, link),
      headers: { "List-Unsubscribe": `<mailto:${REPLY_TO}?subject=unsubscribe>` },
    }),
  });
  const out = await r.text();
  if (!r.ok) {
    await sb(`waitlist?id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ welcome_sent_at: null, welcome_error: out.slice(0, 500) }) });
    return json({ error: "resend", status: r.status, detail: out.slice(0, 300) }, 502);
  }
  await sb(`waitlist?id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ welcome_error: null }) });
  const referral = row.referred_by ? await notifyReferrer(row.id, row.referred_by) : "none";
  return json({ sent: true, referral });
});
