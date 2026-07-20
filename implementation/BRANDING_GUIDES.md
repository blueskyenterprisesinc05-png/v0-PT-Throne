# Zenith Solar — Branding Guide (HTML Email)

Style reference for on-brand HTML emails (e.g. audit roadmap messages sent via n8n). Values extracted from `app/page.tsx`, `app/globals.css`, and `app/layout.tsx`.

---

## Brand identity

| Element | Value |
|--------|--------|
| **Brand name** | **Zenith** + **Solar** (Solar always in accent orange) |
| **Positioning** | Engineering-first solar — certified engineers, data over sales |
| **Primary headline tone** | “Stop Renting Your Power. **Own Your Energy.**” |
| **Footer tagline** | “Engineering a brighter, independent grid.” |
| **Voice** | Confident, technical, transparent — no hype, no pressure |

---

## Color palette

Use hex values in email — inline CSS only. Do not use Tailwind classes, CSS variables, or `oklch()` in HTML emails.

### Primary accent (CTAs, highlights, “Solar” in logo)

| Token | Hex | Use |
|-------|-----|-----|
| Orange 500 | `#F97316` | Primary buttons, links, accent text |
| Orange 600 | `#EA580C` | Button hover / pressed state |
| Orange 400 | `#FB923C` | Badges, eyebrow labels on dark bg |
| Orange 10% bg | `#F97316` at 10% opacity → `#2A1A0F` on dark | Pill badges, icon backgrounds |
| Orange 20% border | `#F97316` at 20% opacity → `#4D2E14` | Badge borders |

### Dark backgrounds (site is dark-themed)

| Token | Hex | Use |
|-------|-----|-----|
| Slate 950 | `#020617` | Deepest footer / outer wrapper |
| Slate 900 | `#0F172A` | Main email background |
| Slate 800 | `#1E293B` | Card / content blocks |
| Slate 700 | `#334155` | Borders, dividers |

### Text

| Token | Hex | Use |
|-------|-----|-----|
| White | `#FFFFFF` | Headlines, primary body on dark |
| Slate 300 | `#CBD5E1` | Secondary nav-style links |
| Slate 400 | `#94A3B8` | Body copy, descriptions |
| Slate 500 | `#64748B` | Captions, stat labels, fine print |

### Light-mode content block (recommended)

Many email clients force light backgrounds. A safe pattern:

- **Header/footer:** dark (`#0F172A`)
- **Main content area:** white `#FFFFFF` with dark text `#0F172A` and muted `#64748B`

This keeps readability in Gmail/Outlook while staying on-brand in the chrome.

---

## Typography

**Web font (site):** Geist (sans) + Geist Mono (numbers/steps)

**Email stack** — Geist is unreliable in email clients; use fallbacks:

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

**Monospace** (step numbers like “01”, stats):

```css
font-family: 'Courier New', Courier, monospace;
```

| Role | Size | Weight | Color | Notes |
|------|------|--------|-------|-------|
| Logo | 20px | 600 | `#FFFFFF` / Solar `#F97316` | Tight letter-spacing |
| Eyebrow label | 12–13px | 500 | `#F97316` | ALL CAPS, e.g. “THE THORNE METHOD” |
| H1 (hero) | 28–32px | 700 | `#FFFFFF` | Line-height ~1.2 |
| H1 accent span | same | 700 | `#F97316` | e.g. “Own Your Energy.” |
| H2 (section) | 24–28px | 700 | `#FFFFFF` | |
| Body | 16–18px | 400 | `#94A3B8` | Line-height 1.6–1.75 |
| Small / footer | 12–14px | 400 | `#64748B` | |

---

## UI patterns

### Primary CTA button

```html
<a href="..." style="
  display: inline-block;
  background-color: #F97316;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  padding: 14px 32px;
  border-radius: 6px;
">
  Get My Full Audit Roadmap
</a>
```

Site uses: orange fill, white text, generous padding. Optional shadow: `box-shadow: 0 4px 14px rgba(249, 115, 22, 0.25)` (many clients ignore this).

### Secondary / outline button

- Background: transparent or `#1E293B`
- Border: `1px solid #475569`
- Text: `#FFFFFF`

### Eyebrow pill (hero badge)

- Background: `#F97316` at ~10% on `#0F172A`
- Border: `1px solid` orange at ~20%
- Text: `#FB923C`, 13px, medium weight
- Border-radius: `9999px` (pill)

### Content card

- Background: `#1E293B` or `#0F172A`
- Border: `1px solid #334155`
- Border-radius: `10px` (site `--radius: 0.625rem`)
- Padding: 24px

### Checklist / feature list

- Check icon color: `#F97316`
- Item text: `#CBD5E1` or `#94A3B8`

### Stat block (e.g. “2,847 / Systems Deployed”)

- Value: 28–32px, bold, `#FFFFFF`
- Label: 12px, `#64748B`

---

## Layout & spacing

| Property | Value |
|----------|--------|
| Max content width | **600px** (email standard) |
| Horizontal padding | 16–24px |
| Section vertical spacing | 32–48px |
| Button border-radius | **6px** |
| Card border-radius | **10px** |
| Pill border-radius | **9999px** |

---

## Audit roadmap email — copy & structure

### n8n merge fields (from webhook payload)

- `firstName`, `lastName`, `email`
- `address`, `monthlyBill`, `roofAge`
- `phone` (optional)
- `submittedAt`, `source`

### Suggested email structure

1. **Header** — Zenith**Solar** logo
2. **Hero** — “Your Engineering Audit Roadmap” + personalized greeting
3. **Summary card** — their 3 quiz answers (address, bill, roof age)
4. **3 steps** — Audit → Custom Design → Installation (mirrors site “Thorne Method”)
5. **Primary CTA** — “Schedule Your Consultation” or “View Full Roadmap”
6. **Footer** — tagline + privacy/unsubscribe + company line

### Eyebrow label examples (from site)

- “ENGINEERING-FIRST SOLAR SOLUTIONS”
- “THE THORNE METHOD”
- “SYSTEM FEATURES”
- “OBJECTION REMOVAL”

---

## Email-specific best practices

1. **Inline all CSS** — do not rely on `<style>` blocks alone; use tables for layout.
2. **Dark mode:** Apple Mail and some clients respect `prefers-color-scheme`; Gmail may invert colors — test header-on-dark + body-on-light.
3. **No modern CSS** — avoid flexbox/grid for critical layout; use `<table>` rows/cells.
4. **Images:** host logo/icons on a CDN; always set `width`, `height`, and `alt`.
5. **Geist:** optional web font link for Apple Mail only; always include the system font stack fallback.

---

## Starter HTML snippet (header + hero)

```html
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0F172A;">
  <tr>
    <td align="center" style="padding:32px 24px;">
      <table width="600" cellpadding="0" cellspacing="0">
        <tr>
          <td style="font-family:Arial,sans-serif;font-size:20px;font-weight:600;color:#FFFFFF;">
            Zenith<span style="color:#F97316;">Solar</span>
          </td>
        </tr>
        <tr>
          <td style="padding-top:24px;font-family:Arial,sans-serif;font-size:13px;font-weight:500;color:#F97316;text-transform:uppercase;letter-spacing:0.05em;">
            Your Audit Roadmap
          </td>
        </tr>
        <tr>
          <td style="padding-top:8px;font-family:Arial,sans-serif;font-size:28px;font-weight:700;color:#FFFFFF;line-height:1.2;">
            Hi {{firstName}}, your engineering audit is ready.
          </td>
        </tr>
        <tr>
          <td style="padding-top:16px;font-family:Arial,sans-serif;font-size:16px;color:#94A3B8;line-height:1.6;">
            Based on your property at {{address}}, here is your personalized roadmap.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
---

## Full Email Template

Below is the complete HTML template used in n8n for the audit roadmap email, featuring the dynamic unsubscribe link:

```html
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0F172A; width:100%; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <tr>
    <td align="center" style="padding:32px 24px;">
      <table width="600" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px;">
        <!-- Header -->
        <tr>
          <td style="font-size:20px; font-weight:600; color:#FFFFFF; padding-bottom:32px;">
            Zenith<span style="color:#F97316;">Solar</span>
          </td>
        </tr>
        <!-- Hero Section -->
        <tr>
          <td style="font-size:13px; font-weight:500; color:#F97316; text-transform:uppercase; letter-spacing:0.05em; padding-bottom:8px;">
            ENGINEERING-FIRST SOLAR SOLUTIONS
          </td>
        </tr>
        <tr>
          <td style="font-size:28px; font-weight:700; color:#FFFFFF; line-height:1.2; padding-bottom:16px;">
            Hi {{ $json.body.firstName }}, your engineering audit is ready.
          </td>
        </tr>
        <tr>
          <td style="font-size:16px; color:#94A3B8; line-height:1.7; padding-bottom:32px;">
            Based on your property at <strong>{{ $json.body.address }}</strong>, our engineering team has begun reviewing your data. We focus on performance and data-driven reliability over standard sales pitches.<br><br>
            <span style="font-size: 12px; color: #64748B;">You received this because you requested an audit via our website.</span>
          </td>
        </tr>
        <!-- Summary Card -->
        <tr>
          <td style="background-color:#1E293B; border:1px solid #334155; border-radius:10px; padding:24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:14px; color:#64748B; padding-bottom:16px; border-bottom:1px solid #334155;">ROADMAP SUMMARY</td>
              </tr>
              <tr>
                <td style="padding-top:16px;">
                  <div style="font-size:14px; color:#CBD5E1; margin-bottom:8px;">Address: <strong>{{ $json.body.address }}</strong></div>
                  <div style="font-size:14px; color:#CBD5E1; margin-bottom:8px;">Monthly Bill: <strong>${{ $json.body.monthlyBill }}</strong></div>
                  <div style="font-size:14px; color:#CBD5E1;">Roof Age: <strong>{{ $json.body.roofAge }} Years</strong></div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Call to Action -->
        <tr>
          <td style="padding:40px 0 32px 0; text-align:center;">
            <a href="https://calendly.com/blueskyenterprisesinc05/new-meeting" style="display:inline-block; background-color:#F97316; color:#FFFFFF; font-size:16px; font-weight:600; text-decoration:none; padding:14px 32px; border-radius:6px;">
              Schedule Your Consultation
            </a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="border-top:1px solid #334155; padding-top:24px; text-align:center;">
            <p style="font-size:14px; color:#64748B; margin:0; padding-bottom: 8px;">Engineering a brighter, independent grid.</p>
            <p style="font-size:12px; color:#64748B; margin:0;">
              <a href="http://n8n-p8ak1rbqv5qo1quovmnzhztu.34.27.218.5.sslip.io/webhook/6746b665-88fd-4209-8e16-5f9f8fc8b8c2?email={{ $json.body.email }}" style="color:#64748B; text-decoration:underline;">Unsubscribe</a>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

---

## Related files

- Landing page UI: `app/page.tsx`
- Unsubscribe confirmation page: `app/unsubscribed/page.tsx`
- Theme tokens: `app/globals.css`
- Lead capture payload schema: `lib/audit-roadmap-schema.ts`
- n8n integration plan: `implementation/N8N_WEBHOOK_PLAN.md`
