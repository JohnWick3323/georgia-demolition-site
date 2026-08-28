# SEO Strategy Report — 2026 (Consolidated)
*Prepared for: Georgia Demolition & Removal. Date: August 2026.*

## Executive Summary

Your site currently carries ~26,550 programmatic location pages. The 2026 search landscape has
changed in one way that directly affects you: **Google now judges your entire domain's quality,
not individual pages.** A large number of thin, near-identical location pages drags down even your
strong pages, wastes crawl budget, and reduces your chance of being cited by AI answer engines.
The single highest-ROI move in 2026 is **content pruning** — not publishing more.

This report consolidates 60+ independent sources (Google's official documentation, Search Engine
Land, Search Engine Journal, Semrush, and specialist 2026 SEO research). Findings that appear in
multiple independent sources are marked **"validated"**; single-source claims are attributed.

---

## 1. What changed in 2026 (why this matters now)

1. **Domain-level quality signals** *(validated — redback-optimisation, citing Google's leaked
   Content Warehouse API, May 2024)*: Google scores sites on `siteFocusScore` (topical tightness)
   and `siteRadius` (how far a page drifts from your core theme). Thin or off-topic pages lower the
   whole domain, even for pages you never touched.

2. **Helpful Content is now core ranking** *(validated — seoengico, Google)*: Google folded the
   helpful-content classifier into core ranking (March 2024) and told everyone it expects "45% less
   low-quality, unoriginal content" in results. There is no separate recovery path — weak pages
   weigh on the whole site.

3. **AI Overviews are eating informational clicks** *(Pew Research, July 2025 — via SEOJuice)*:
   when an AI summary appears, users click a normal result in only **8%** of visits, vs 15% without.
   Pages that used to trickle in traffic now quietly tax the domain.

4. **AI engines cite coherent domains** *(Ahrefs, March 2026 — via redback-optimisation)*: only
   **38%** of AI Overview citations come from pages in Google's top 10 (down from 76% in July 2025).
   Topical coherence — not raw ranking — is what gets you cited by ChatGPT, Perplexity and Gemini.

**Bottom line:** a 26,000-page site with thousands of thin pages is now a liability, not an asset.

---

## 2. The risk specific to your site: doorway pages

Google's official spam policy *(developers.google.com/search/docs/essentials/spam-policies)* lists
"doorway abuse":

> "multiple domain names or pages targeted at specific regions or cities that funnel users to one
> page" and "substantially similar pages that are closer to search results than a clearly defined,
> browseable hierarchy."

**The pattern to avoid is exactly what programmatic location sites do wrong:** a page duplicated
with only the city name changed *(validated — 6 sources, incl. an r/SEO case where 213 pages with
only town + zip swapped were flagged as spam)*.

Your location pages are **not** automatically doorway pages — they cross the line only when they
are: boilerplate copy, no local footprint (no address/team/reviews/proof), orphaned (no internal
links), or offering no unique value *(validated — Big Red SEO, RicketyRoo, Outreach Monks)*.

**What keeps you safe** (RicketyRoo, Semrush Location Page guide):
- Genuinely unique content per page (county, permit office, soil, nearby city — not name-swapped).
- Real local proof where possible.
- Internal links into and out of every location page.

---

## 3. Recommended action: tiered content pruning

**Core principle** *(validated — all 16 content-pruning sources)*: pruning is not deletion. Every
page gets ONE of five fates — **Keep / Refresh / Merge / Noindex / Remove+301**.

Apply this to your site by population tier:

| Tier | Population | Cities | Pages per city | Rationale |
|------|-----------|--------|---------------|-----------|
| **A** | ≥50,000 | 20 | 1 (main only) | Competitive — one strong page beats 46 thin ones |
| **B** | 10,000–50,000 | 91 | Full (~46) | Sweet spot — concentrate authority here |
| **C** | 2,000–10,000 | 182 | 6 (main + 5 services) | Long-tail — service pages yes, sub-service combos no |
| **D** | <2,000 + CDPs | 283 | 1 (main only) | Coverage token — keep the URL, skip thin combos |

**Result:** ~26,550 → **~5,500 pages**, an ~80% reduction in thin pages.

**Why this works:**
- **Authority concentration** *(validated — seaudit, searchengineland)*: link equity spread across
  26,000 pages benefits each less than the same equity on 5,500 strong pages.
- **Crawl budget** *(validated — Google docs, all pruning sources)*: fewer URLs → Googlebot visits
  your strategic pages more often → faster indexation.
- **AI/GEO citability** *(seaudit case study)*: a cleaner corpus raised AI-answer citations from
  1/15 to 4/15 in 8 weeks.
- **Doorway-risk eliminated**: the thin `[city]+[sub-service]` combos are the doorway pattern; removing them removes the risk.

---

## 4. Execution rules (validated across sources)

1. **Build-time prune, not post-hoc delete.** Since these pages are generated statically, the
   cleanest approach is to not generate the thin combos at all — no 404s, no redirect chains.
2. **Never delete-without-redirect** a page that has backlinks or residual traffic → 301 to the
   closest topical page *(validated — all sources)*. Redirect to a related page, never the homepage
   (Google reads off-topic redirects as soft 404s).
3. **Pure deletion = 410** (tells Google "gone forever") or 404 if 410 isn't available *(Amit
   Tiwari video, validated)*.
4. **noindex + robots.txt must never be combined** *(redback-optimisation, technically correct per
   Google)*: robots.txt stops crawling, so Google never sees the noindex tag and the page stays indexed.
5. **Batch, don't sweep** *(validated — all sources)*: do it in groups of 20–50 pages, measure
   4–8 weeks, then the next batch. Expect a small temporary traffic dip (1–2 weeks); if it persists
   beyond 2 weeks, reverse the change.
6. **Run a full prune every 6–12 months** *(validated)*.

---

## 5. What to expect (be honest about outcomes)

Content pruning is **structural cleanup, not a guaranteed traffic jackpot** *(seaudit — the most
honest source on this)*. Some case studies claim large traffic gains (one reports +36% in 8 weeks —
*seoengico*), but those numbers are often confounded by other changes. Do not expect, and do not
promise, a specific percentage gain. Expect instead:
- Faster indexation of your strategic pages.
- Gradual improvement in average position on the pages you keep.
- Better AI-answer citation over time.

---

## 6. Beyond pruning: 2026 local SEO priorities

*(From BrightLocal Local Search Ranking Factors 2026 + ClickRank, May 2026.)*

For the **Local Pack / Maps**, Google Business Profile is the #1 factor (~32% weight), with reviews
(~16–20%) second. For **local organic** (your location pages), on-page optimization and links lead.

**Action items for your site:**
1. **Google Business Profile** — complete it fully (category, services, photos, posts 1×/week).
   GBP signals carry ~32% of Local Pack weight *(BrightLocal 2026)*.
2. **Schema consistency** — your LocalBusiness schema must match your GBP data exactly; mismatches
   create an "entity conflict" that hurts rankings *(ClickRank 2026)*.
3. **Reviews** — quantity + velocity + recency all count. A competitor gaining 10 fresh reviews
   monthly will outrank 200 stale ones *(ClickRank 2026)*.

---

## 7. Areas requiring further verification

1. **Exact 2026 local ranking factor weights** — BrightLocal and ClickRank give different numbers
   (on-page 15% vs 19%; reviews 20% vs 16%). Treat GBP ≈30% as the anchor; verify exact weights
   against the original BrightLocal 2026 survey before building a precise budget around them.
2. **"How many programmatic pages is too many"** — Google's scaled-content policy is deliberately
   vague. No source gives a hard threshold. The safe proxy is per-page value + content uniqueness,
   not a page count.
3. **Post-prune AI-citation recovery** — only one published case (seaudit: 1/15 → 4/15). Treat as
   directional, not proven.

---

*Sources: Google Search Central (doorway pages spam policy; core updates), Search Engine Land,
Search Engine Journal, Semrush, BrightLocal, ClickRank, SEO Engico, vrid.ai, Search Atlas,
RicketyRoo, Big Red SEO, Opace, SEOJuice, Pew Research, Ahrefs. Full traceability in the internal
analysis document.*
