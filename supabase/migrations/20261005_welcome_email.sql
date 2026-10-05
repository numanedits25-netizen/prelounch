-- Welcome email: on every new waitlist row, call the waitlist-welcome edge function (async via pg_net).
create extension if not exists pg_net with schema extensions;

alter table public.waitlist add column if not exists welcome_sent_at timestamptz;
alter table public.waitlist add column if not exists welcome_error text;

create or replace function public.waitlist_send_welcome()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  perform net.http_post(
    url := 'https://tlhqtewfabslqlnkzmfp.supabase.co/functions/v1/waitlist-welcome',
    body := jsonb_build_object('id', new.id),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsaHF0ZXdmYWJzbHFsbmt6bWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNzc5NDIsImV4cCI6MjEwNjc1Mzk0Mn0.byCkVsjzS-5CCIlYAFt_7ZwGu7j3pH4Zfna25-izQDw'
    ),
    timeout_milliseconds := 8000
  );
  return new;
exception when others then
  return new; -- never block a signup because of email
end;
$$;
revoke all on function public.waitlist_send_welcome() from public, anon, authenticated;

drop trigger if exists waitlist_welcome_email on public.waitlist;
create trigger waitlist_welcome_email after insert on public.waitlist
  for each row execute function public.waitlist_send_welcome();
