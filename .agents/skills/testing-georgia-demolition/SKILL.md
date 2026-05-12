---
name: testing-georgia-demolition
description: Test the Georgia Demolition Astro site end-to-end. Use when verifying SEO, schema, UI, or content changes.
---

# Testing Georgia Demolition Site

## Prerequisites

- Node.js 22+ installed
- Run `npm install` in the repo root

## Start Dev Server

```bash
cd /home/ubuntu/georgia-demolition-site
npx astro dev --host 0.0.0.0 --port 4321
```

Server starts in ~2 seconds. Site available at `http://localhost:4321/`.

## Key Pages to Test

| Page | URL | What to check |
|------|-----|---------------|
| Homepage | `/` | Hero section, services grid, FAQs, CTA sections |
| City page | `/locations/atlanta/` | FAQs section, news section, services grid, testimonial, map |
| Blog | `/blog/` | Blog cards, BlogPosting schema |
| Services | `/services/` | Service category cards |
| Contact | `/contact/` | Form renders, phone number correct |
| 404 | `/nonexistent/` | Custom 404 page with dark theme |

## Schema Verification (curl)

The site uses JSON-LD structured data. Verify via curl:

```bash
# BlogPosting on blog (expect 6)
curl -s localhost:4321/blog/ | grep -o '"@type":"BlogPosting"' | wc -l

# LocalBusiness with worstRating on homepage
curl -s localhost:4321/ | grep -o '"worstRating":"1"'

# OpeningHoursSpecification (expect 2: weekday + Saturday)
curl -s localhost:4321/ | grep -o '"@type":"OpeningHoursSpecification"' | wc -l

# FAQPage on city pages
curl -s localhost:4321/locations/atlanta/ | grep -o '"@type":"FAQPage"'

# BreadcrumbList on static pages
curl -s localhost:4321/about/ | grep -o '"@type":"BreadcrumbList"'
```

## Visual Testing Checklist

1. **Footer**: Should have logo, description, phone, email, address columns. No social media icons (removed by design — no social pages exist).
2. **City pages**: Scroll past services grid to find:
   - "Demolition FAQs for [City], GA" — 4 expandable `<details>` items
   - "Demolition industry news for [City]" — 4 article cards with category badges
3. **Hero sections**: All pages with background images should have `role="img"` + `aria-label` (verify in page source)
4. **Verification meta tags**: Should NOT render when `googleVerification`/`bingVerification` are empty in `site.ts`

## Credential Fields

User populates these in `src/data/site.ts`:
- `gtmId` — Google Tag Manager
- `ga4Id` — Google Analytics 4  
- `googleVerification` — Google Search Console
- `bingVerification` — Bing Webmaster Tools

All are empty by default. Analytics/verification code only renders when non-empty.

## Build Verification

```bash
npx astro build
```

Expect 511+ pages generated, zero errors. The build is the ultimate check — if it passes, all templates compile correctly.

## Common Issues

- **City pages are dynamic** (`[city].astro`) — test at least 2 different cities to verify template works
- **FAQ accordion** uses native `<details>`/`<summary>` — no JS required, works without hydration
- **News section** data comes from `src/data/demolitionNews.ts` — same 4 articles on every city page (top 4 of 6)
- **Astro dev toolbar** appears at bottom of page in dev mode — ignore it during visual testing
