# Implementation Plan: SEO, AEO, and GEO Optimization

This document outlines the design and technical steps to optimize the **Zenith Solar** website for Search Engine Optimization (SEO), Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO).

---

## 🎯 Goal Description

Optimize the Zenith Solar website to rank higher in search engines (Google, Bing), capture voice/direct answers (Google Featured Snippets, "People Also Ask"), and secure citations/visibility within LLM-based generative engines (Gemini, ChatGPT Search, Perplexity, Copilot).

---

## 👥 User Review Required

> [!IMPORTANT]
> **1. Articles/Technical Guides Placement:**
> To optimize for GEO, we need to introduce detailed articles/guides with high information density. We propose adding an interactive **"Technical Resources & Guides"** section directly on the main landing page to preserve the high-converting single-page funnel. Alternatively, we can build separate dynamic routes (e.g., `/guides/[slug]`).
> 
> *Our Recommendation:* Single-page section for initial rollout, keeping code footprint low and user focus on the main lead capture form.
>
> **2. Production Domain URL:**
> We will configure the canonical URL and sitemap based on the standard domain (e.g., `https://zenithsolar.com`). Please confirm if a different production domain is planned.

---

## 🙋 Open Questions

> [!NOTE]
> None. All decisions will be documented directly in this plan.

---

## 🛠️ Proposed Changes

### Component: On-Page Optimization (AEO & GEO)

#### [MODIFY] [page.tsx](file:///c:/Users/Hp/CODING/v0-PT-Throne/app/page.tsx)
*   **FAQ Expansion (AEO):** Rewrite the questions in `ObjectionRemovalSection` to reflect conversational search queries. Begin each answer with a direct "Yes/No/Value" statement, followed by scientific/engineering specifications.
    *   *Question 1:* "Will solar installation damage my roof structure?" 
        *   *Revised:* "Do solar panels damage your roof structure during installation?"
        *   *Revised Answer:* "No. When designed by certified structural engineers to ASCE 7 load calculations with proper torque limits and flashed penetrations, solar mounting systems do not compromise roof integrity."
    *   *Question 2:* "What happens to production on cloudy days?"
        *   *Revised:* "How much solar electricity do panels produce on cloudy days?"
        *   *Revised Answer:* "Between 10% and 25% of peak capacity. Modern N-Type TOPCon panels capture solar photons through dense cloud cover, and our design yields are modeled using 30-year local TMY3 weather profiles."
    *   *Question 3:* "What's the realistic ROI timeline?"
        *   *Revised:* "What is the typical return on investment (ROI) payback period for solar?"
        *   *Revised Answer:* "Between 5 and 7 years for cash purchases, and immediate cash-flow positive for solar loans. The exact payback depends on local utility rates and sun exposure."
    *   *Add Question 4:* "What is the degradation rate of TOPCon solar panels?"
        *   *Answer:* "Less than 0.4% annually over a 30-year performance warranty. N-Type TOPCon cells resist Light Induced Degradation (LID) far better than legacy P-type PERC cells."
    *   *Add Question 5:* "How does time-of-use optimization work with battery backup?"
        *   *Answer:* "By storing solar energy during off-peak hours and discharging it during high-tariff periods. Zenith's smart energy systems automate this switching to minimize utility expenses."
*   **Articles & Freshness (GEO):** Add a sleek "Technical Guides & Resources" card grid or accordion. Topics include:
    *   *2026 Solar Tax Credits & Incentives Guide*
    *   *TOPCon vs. PERC Solar Technology Comparison*
    *   Include a dynamic badge: `"Engineering Data Verified: June 2026"` to show freshness.

---

### Component: In-Code Metadata & Structured Data

#### [MODIFY] [layout.tsx](file:///c:/Users/Hp/CODING/v0-PT-Throne/app/layout.tsx)
*   Remove `generator: 'v0.app'`.
*   Inject full OpenGraph and Twitter card metadata for visual snippets:
    ```typescript
    openGraph: {
      title: 'Zenith Solar | Engineering-First Solar Solutions',
      description: 'Stop renting your power. Own your energy with precision-engineered solar systems designed by certified engineers.',
      url: 'https://zenithsolar.com',
      siteName: 'Zenith Solar',
      images: [
        {
          url: '/og-image.jpg', // Standard 1200x630 share image
          width: 1200,
          height: 630,
          alt: 'Zenith Solar | Engineering-First Solar Solutions',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Zenith Solar | Engineering-First Solar Solutions',
      description: 'Stop renting your power. Own your energy with precision-engineered solar systems designed by certified engineers.',
      images: ['/og-image.jpg'],
    }
    ```

#### [MODIFY] [page.tsx](file:///c:/Users/Hp/CODING/v0-PT-Throne/app/page.tsx)
*   Inject JSON-LD structured data via a `<script>` tag inside the Server Shell or within the landing page markup:
    *   `FAQPage` Schema: To map the expanded questions and answers.
    *   `ProfessionalService` Schema: Define "Zenith Solar" with details (geo-coordinates, serving states: Colorado, Texas, Arizona, logo URL).
    *   `Service` Schema: Detail the "Engineering Audit".

---

### Component: Mapping & Gatekeeping

#### [NEW] [sitemap.ts](file:///c:/Users/Hp/CODING/v0-PT-Throne/app/sitemap.ts)
*   Create a dynamic sitemap using Next.js App Router API:
    ```typescript
    import { MetadataRoute } from 'next'
    
    export default function sitemap(): MetadataRoute.Sitemap {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenithsolar.com'
      return [
        {
          url: baseUrl,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 1,
        },
      ]
    }
    ```

#### [NEW] [robots.ts](file:///c:/Users/Hp/CODING/v0-PT-Throne/app/robots.ts)
*   Create a dynamic robots.txt builder:
    ```typescript
    import { MetadataRoute } from 'next'
    
    export default function robots(): MetadataRoute.Robots {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenithsolar.com'
      return {
        rules: {
          userAgent: '*',
          allow: '/',
          disallow: ['/api/', '/unsubscribed'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
      }
    }
    ```

---

## 🧪 Verification Plan

### Automated Tests
*   Run `npm run build` locally to verify:
    *   Next.js compiles the sitemap (`/sitemap.xml`) and robots.txt (`/robots.txt`) successfully.
    *   No TypeScript errors in the metadata configuration or sitemap generation.
    *   Check build logs to confirm static generation of page routes.

### Manual Verification
*   **JSON-LD Verification:** Run build server, check the page HTML source to verify that the injected JSON-LD script blocks are syntactically valid and well-formed.
*   **Robots & Sitemap Verification:** Run local dev server (`npm run dev`) and visit `localhost:3000/robots.txt` and `localhost:3000/sitemap.xml` to verify exact routing and formatting.
