---
name: testing-georgia-demolition
description: Test the Georgia Demolition & Removal Astro site end-to-end. Use when verifying SEO, schema markup, visual components, or page rendering changes.
---

# Testing Georgia Demolition Site

## Prerequisites

- Node.js installed
- Run `npm install` in the repo root (may be needed if dependencies aren't cached)

## Dev Server Setup

```bash
cd /home/ubuntu/georgia-demolition-site
npx astro dev --host 0.0.0.0 --port 4321
```

The dev server runs on `http://localhost:4321/`. It supports hot reload — no restart needed for most changes.

## Key Pages to Test

| Page | URL | What to check |
|------|-----|---------------|
| Homepage | `/` | Hero, FAQ section, schemas in source |
| About | `/about/` | Breadcrumbs, hero image overlay |
| Contact | `/contact/` | Breadcrumbs, hero image, contact info |
| Services | `/services/` | Breadcrumbs, hero image, service categories |
| Locations | `/locations/` | Breadcrumbs, hero image, city grid |
| FAQs | `/faqs/` | Breadcrumbs, FAQ accordions, FAQPage schema |
| Blog | `/blog/` | Breadcrumbs, blog cards |
| Privacy | `/privacy-policy/` | Breadcrumbs |
| Terms | `/terms-and-conditions/` | Breadcrumbs |
| 404 | `/any-nonexistent-url/` | Dark theme, "Demolished" heading, phone CTA |
| Service subpage | `/services/residential-demolition/home-demolition/` | Dynamic phone numbers, sidebar |

## Schema Markup Verification

Use curl to verify JSON-LD schemas without relying on view-source (which can be unreliable in automated testing):

```bash
# Check homepage schemas
curl -s http://localhost:4321/ | grep -o '"@type":"FAQPage"'
curl -s http://localhost:4321/ | grep -o '"@type":"BreadcrumbList"'
curl -s http://localhost:4321/ | grep -oP '"@type":"Question"' | wc -l

# Check FAQs page schema
curl -s http://localhost:4321/faqs/ | grep -oP '"@type":"Question"' | wc -l  # expect 15

# Check manifest
curl -s http://localhost:4321/site.webmanifest | python3 -m json.tool

# Check meta tags
curl -s http://localhost:4321/ | grep -oP '(<link rel="manifest"[^>]*>|<meta name="theme-color"[^>]*>)'
```

## Visual Component Checks

1. **Breadcrumbs**: Should appear in hero section above h1 on all static pages as "Home / [Page Name]". "Home" should be a link.
2. **Social icons**: Facebook + Instagram icons in footer. Verify links go to `facebook.com/georgiademolitionandremoval` and `instagram.com/georgiademolitionandremoval`.
3. **404 page**: Navigate to any non-existent URL. Should show dark theme, large "404" text, "Demolished" in red, phone CTA, nav buttons.
4. **Hero images**: Services, locations, FAQs, blog, and contact pages should have background image overlays (not solid colors).
5. **Phone numbers**: Verify service sub-pages use dynamic phone from `site.ts` via `tel:8432410787` format.

## Build Verification

```bash
npx astro build
```

Expect 500+ pages generated with zero errors. The site is statically generated.

## Configuration

Site configuration lives in `src/data/site.ts`. Key fields:
- `phone` / `phoneRaw`: Display and tel: format phone numbers
- `gtmId` / `ga4Id`: Google Tag Manager / Analytics IDs (empty = tracking disabled)
- `social.facebook` / `social.instagram`: Social media profile URLs

## Tips

- `view-source:` URLs in Chrome may not update reliably during automated testing. Prefer `curl` for source inspection.
- The Astro dev server may take a few seconds to compile pages on first visit.
- No CI is configured on this repo — verify builds locally.
- Schema markup is injected via `<script type="application/ld+json">` tags in individual page files, not centrally.
