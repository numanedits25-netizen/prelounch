-- "You moved up" email: one per referral, claimed on the new (referred) row.
alter table public.waitlist add column if not exists referral_notified_at timestamptz;
alter table public.waitlist add column if not exists referral_notify_error text;
