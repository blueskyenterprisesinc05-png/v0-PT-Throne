-- ph-Bolt (v0-PT-Throne / Zenith Solar)
create table if not exists public.audit_leads (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  address text not null,
  monthly_bill integer not null check (monthly_bill between 50 and 500),
  roof_age text not null,
  gdpr_consent boolean not null default true,
  source text,
  referer text,
  created_at timestamptz not null default now()
);

create index if not exists audit_leads_created_at_idx on public.audit_leads (created_at desc);
create index if not exists audit_leads_email_idx on public.audit_leads (email);

alter table public.audit_leads enable row level security;

revoke all on public.audit_leads from anon, authenticated;
grant all on public.audit_leads to service_role;
