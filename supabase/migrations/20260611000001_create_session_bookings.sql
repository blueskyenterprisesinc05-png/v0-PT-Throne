-- barcelona-session-book
create table if not exists public.session_bookings (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_email text not null,
  client_phone text,
  session_date timestamptz not null,
  session_type text,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists session_bookings_session_date_idx on public.session_bookings (session_date);
create index if not exists session_bookings_email_idx on public.session_bookings (client_email);

alter table public.session_bookings enable row level security;

revoke all on public.session_bookings from anon, authenticated;
grant all on public.session_bookings to service_role;
