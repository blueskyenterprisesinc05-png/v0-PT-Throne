# n8n Webhook Integration — Issue Tracker

Synced with GitHub: [blueskyenterprisesinc05-png/v0-PT-Throne](https://github.com/blueskyenterprisesinc05-png/v0-PT-Throne/issues)

---

## Issue #2 — Environment & schema setup

**GitHub:** https://github.com/blueskyenterprisesinc05-png/v0-PT-Throne/issues/2  
**Status:** ✅ Closed  
**Labels:** `enhancement`

### Summary

Add server-only env documentation and shared Zod validation for audit roadmap submissions.

### Acceptance criteria

- [x] `.env.example` documents `N8N_WEBHOOK_URL` and optional `N8N_WEBHOOK_SECRET`
- [x] `lib/audit-roadmap-schema.ts` validates client + server payloads

### Files

- `.env.example`
- `lib/audit-roadmap-schema.ts`

---

## Issue #3 — Vercel API route proxy to n8n

**GitHub:** https://github.com/blueskyenterprisesinc05-png/v0-PT-Throne/issues/3  
**Status:** ✅ Closed  
**Labels:** `enhancement`

### Summary

Create `POST /api/audit-roadmap` to validate submissions and forward to n8n webhook (avoids CORS, keeps URL secret).

### Acceptance criteria

- [x] Validates body with Zod; returns 400 on invalid input
- [x] Returns 500 if `N8N_WEBHOOK_URL` missing
- [x] Forwards payload to n8n with optional Bearer secret
- [x] Honeypot field silently succeeds without calling n8n
- [x] Returns 502 when n8n fails

### Files

- `app/api/audit-roadmap/route.ts`

---

## Issue #4 — Lead capture modal: GDPR, names, webhook submit

**GitHub:** https://github.com/blueskyenterprisesinc05-png/v0-PT-Throne/issues/4  
**Status:** ✅ Closed  
**Labels:** `enhancement`

### Summary

Update the 3-step modal to collect first/last name, email, optional phone, GDPR consent, and submit via API instead of mock timeout.

### Acceptance criteria

- [x] Split full name into first + last name
- [x] GDPR checkbox required (unchecked by default)
- [x] Phone optional
- [x] Button label: "Get My Full Audit Roadmap"
- [x] Submit calls `/api/audit-roadmap`
- [x] Success/error toasts via Sonner
- [x] Modal extracted to `components/lead-capture-modal.tsx`

### Files

- `components/lead-capture-modal.tsx`
- `app/page.tsx`

---

## Issue #5 — Sonner toaster in root layout

**GitHub:** https://github.com/blueskyenterprisesinc05-png/v0-PT-Throne/issues/5  
**Status:** ✅ Closed  
**Labels:** `enhancement`

### Summary

Mount Sonner `<Toaster />` in root layout so toast notifications render app-wide.

### Acceptance criteria

- [x] Toaster present in `app/layout.tsx`

### Files

- `app/layout.tsx`

---

## Issue #6 — Configure Vercel & n8n (ops)

**GitHub:** https://github.com/blueskyenterprisesinc05-png/v0-PT-Throne/issues/6  
**Status:** 🔲 Open — manual  
**Labels:** `enhancement`

### Summary

Set production environment variables and activate the n8n workflow.

### Acceptance criteria

- [ ] `N8N_WEBHOOK_URL` set in Vercel (Production + Preview)
- [ ] Optional `N8N_WEBHOOK_SECRET` set if n8n uses header auth
- [ ] n8n workflow active; test curl succeeds
- [ ] E2E submit from Preview deployment reaches n8n

### Notes

See `implementation/N8N_WEBHOOK_PLAN.md` §7 and §11.

---

## Issue #7 — Privacy policy page (follow-up)

**GitHub:** https://github.com/blueskyenterprisesinc05-png/v0-PT-Throne/issues/7  
**Status:** 🔲 Open — follow-up  
**Labels:** `enhancement`

### Summary

GDPR checkbox links to `#privacy` placeholder. Add a real privacy policy page or external URL before go-live.

### Acceptance criteria

- [ ] Privacy policy accessible at linked URL
- [ ] Update checkbox link in `components/lead-capture-modal.tsx`
