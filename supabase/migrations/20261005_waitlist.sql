-- Larzo pre-launch waitlist
-- Table is locked down (RLS on, no policies). The browser only talks to the
-- SECURITY DEFINER functions below, so emails are never readable via the anon key.

create extension if not exists citext with schema extensions;
create extension if not exists pgcrypto with schema extensions;

create table public.waitlist (
  id            bigint generated always as identity primary key,
  email         extensions.citext not null unique,
  referral_code text not null unique,
  referred_by   text references public.waitlist(referral_code) on delete set null,
  referrals     integer not null default 0,
  role          text,
  source        text,
  ip_hash       text,
  user_agent    text,
  created_at    timestamptz not null default now(),
  constraint email_format check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' and length(email) <= 254)
);
create index waitlist_ip_hash_created_idx on public.waitlist (ip_hash, created_at);
create index waitlist_referred_by_idx on public.waitlist (referred_by);
alter table public.waitlist enable row level security;

-- Queue position: signup order, moved up 5 spots per successful referral.
create or replace function public.waitlist_position(p_id bigint, p_referrals integer)
returns integer language sql stable security definer set search_path = '' as $$
  select greatest(1, (select count(*)::int from public.waitlist w where w.id <= p_id) - p_referrals * 5);
$$;

create or replace function public.join_waitlist(p_email text, p_ref text default null, p_source text default null)
returns json language plpgsql volatile security definer set search_path = '' as $$
declare
  v_email text := lower(trim(p_email));
  v_ref   text := upper(nullif(trim(p_ref), ''));
  v_row   public.waitlist;
  v_code  text;
  v_ip    text;
  v_ua    text;
  v_hdrs  json;
begin
  if v_email is null or v_email !~* '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' or length(v_email) > 254 then
    return json_build_object('ok', false, 'error', 'invalid_email');
  end if;

  select * into v_row from public.waitlist where email = v_email::extensions.citext;
  if found then
    return json_build_object('ok', true, 'already', true, 'referral_code', v_row.referral_code,
      'referrals', v_row.referrals, 'position', public.waitlist_position(v_row.id, v_row.referrals),
      'total', (select count(*) from public.waitlist));
  end if;

  begin
    v_hdrs := current_setting('request.headers', true)::json;
  exception when others then v_hdrs := null;
  end;
  v_ip := split_part(coalesce(v_hdrs->>'x-forwarded-for', v_hdrs->>'cf-connecting-ip', ''), ',', 1);
  v_ua := left(v_hdrs->>'user-agent', 300);
  v_ip := case when v_ip = '' then null else encode(extensions.digest(v_ip || 'larzo', 'sha256'), 'hex') end;

  -- basic abuse guard: max 8 new signups per IP per hour
  if v_ip is not null and (select count(*) from public.waitlist where ip_hash = v_ip and created_at > now() - interval '1 hour') >= 8 then
    return json_build_object('ok', false, 'error', 'rate_limited');
  end if;

  if v_ref is not null and not exists (select 1 from public.waitlist where referral_code = v_ref) then
    v_ref := null;
  end if;

  loop
    v_code := upper(substr(replace(replace(encode(extensions.gen_random_bytes(6), 'base64'), '/', ''), '+', ''), 1, 7));
    exit when length(v_code) = 7 and not exists (select 1 from public.waitlist where referral_code = v_code);
  end loop;

  insert into public.waitlist (email, referral_code, referred_by, source, ip_hash, user_agent)
  values (v_email, v_code, v_ref, left(p_source, 120), v_ip, v_ua)
  returning * into v_row;

  if v_ref is not null then
    update public.waitlist set referrals = referrals + 1 where referral_code = v_ref;
  end if;

  return json_build_object('ok', true, 'already', false, 'referral_code', v_row.referral_code,
    'referrals', 0, 'position', public.waitlist_position(v_row.id, 0),
    'total', (select count(*) from public.waitlist));
end;
$$;

create or replace function public.set_waitlist_role(p_code text, p_role text)
returns boolean language sql volatile security definer set search_path = '' as $$
  update public.waitlist set role = left(p_role, 40)
  where referral_code = upper(p_code)
    and p_role in ('Web design','SEO','Social media','Paid ads','Freelancer','Other')
  returning true;
$$;

create or replace function public.waitlist_count()
returns integer language sql stable security definer set search_path = '' as $$
  select count(*)::int from public.waitlist;
$$;

revoke all on function public.waitlist_position(bigint, integer) from public, anon, authenticated;
revoke all on function public.join_waitlist(text, text, text) from public;
revoke all on function public.set_waitlist_role(text, text) from public;
revoke all on function public.waitlist_count() from public;
grant execute on function public.join_waitlist(text, text, text) to anon, authenticated;
grant execute on function public.set_waitlist_role(text, text) to anon, authenticated;
grant execute on function public.waitlist_count() to anon, authenticated;

-- Admin view for the Supabase dashboard (not exposed to anon)
create or replace view public.waitlist_admin with (security_invoker = true) as
  select id, email, role, referral_code, referred_by, referrals,
         public.waitlist_position(id, referrals) as queue_position, source, created_at
  from public.waitlist order by created_at desc;
revoke all on public.waitlist_admin from anon, authenticated;
