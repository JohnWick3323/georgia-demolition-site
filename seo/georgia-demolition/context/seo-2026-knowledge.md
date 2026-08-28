# SEO 2026 Knowledge Base — Distilled from 55 sources + 2 videos + 5 URLs

> Compiled from: Google Search Central (doorway pages), Search Engine Land, Search Engine Journal,
> Semrush, SEO Engico, RicketyRoo, vrid.ai, Search Atlas, SMA Marketing video, Amit Tiwari (Tiwari.net)
> Hindi course, + GEO/2026 sources. Last updated: Aug 2026.

## 1. Content Pruning — the core discipline
- Pruning ≠ deletion. Every page gets ONE fate from 5 buckets:
  **Keep / Refresh / Merge / Noindex / Remove+Redirect**
- Never delete-without-redirect a page that has backlinks or residual traffic → 301 to closest topical page.
- Pure deletion: **410 (preferred)** or 404. Never 301 a dead page to the homepage (Google reads it as a soft 404).
- **Batches of 20–50 pages**, measure 4–8 weeks between waves. Never site-wide at once.
- Expected: small temporary traffic dip (1–2 weeks) while Google reprocesses. If dip persists >2 weeks, reverse it.
- Run a full prune every 6–12 months; heavy publishers quarterly.
- 20–40% of an ageing site's indexed URLs typically belong in the "should not exist" bucket.

## 2. Doorway Pages — the #1 risk for programmatic location sites
Google's official spam policy (`developers.google.com/search/docs/essentials/spam-policies#doorways`):
> "Sites or pages created to rank highly for specific search queries... multiple similar pages
> where each result takes the user to essentially the same destination."

**The exact find-and-replace pattern (city name + zip swapped, everything else identical) is doorway spam.**
- A page duplicated 213× with only town/zip changed = canonical doorway abuse (r/SEO case).
- Programmatic SEO CAN work, but you MUST change more variables than the location name: unique content,
  real local proof, distinct structure, internal links.
- Location pages are NOT automatically doorway pages — but they cross the line when: boilerplate copy,
  no local footprint (no address/team/reviews/proof), orphaned (no internal links), no unique value.
- Signal for legitimate location page: genuine unique info for that locale + real local context.

## 3. Domain-level quality (why 1 thin page hurts the whole site)
- Google judges the SITE, not just pages. Leaked Content Warehouse API (May 2024, via Rand Fishkin/Mike King):
  `siteFocusScore` (topical tightness) and `siteRadius` (page topic drift from core theme).
- A scattered/thin corpus drags down even your strong pages. Remove off-topic/thin pages → untouched
  pages can rise.
- "Discoverd – currently not indexed" growing in GSC = Google thinks the site is low-quality overall.

## 4. Crawl budget
- Googlebot's crawl budget is finite. Thin/stale/duplicate pages waste it; new/strategic pages get
  crawled less and index slower. Pruning frees budget → faster indexation of what matters.

## 5. noindex vs robots.txt (critical bug to avoid)
- NEVER combine `noindex` + robots.txt disallow on the same page. robots.txt stops crawling →
  Google never sees the noindex tag → page stays indexed.
- Correct order: add `<meta name="robots" content="noindex">`, wait for Google to drop it from index,
  THEN (optionally) robots.txt-block to save budget.

## 6. Content decay — it's a MISMATCH, not an age problem
- Decay = the page/query/SERP/business-job match breaks: query drifts, SERP changes, or an AI
  Overview now answers the simple version of the query.
- Pew (Jul 2025): when an AI summary appears, users click a normal result in only **8%** of visits
  (vs 15% without) — informational pages lose clicks even when ranking holds.
- "Refresh old post" is the wrong reflex; diagnose WHY it decayed first (competitor sections?
  AI Overview? query shift?).

## 7. AI search / GEO (2026)
- AI engines cite topically-COHERENT domains. Ahrefs (Mar 2026): only **38%** of AI Overview
  citations came from Google top-10 pages (down from 76% in Jul 2025) → coherence/coverage beats
  raw ranking position.
- Fan-out queries + passage indexing + multiple citations = AI pulls answers from deep in a page.
  → Consolidate/expand into thorough single pages rather than spreading across many thin ones.
- Pruning helps GEO: a clean, non-contradictory corpus makes it easier for ChatGPT/Perplexity/Gemini
  to identify "the" reliable source on your domain.

## 8. Thin content (Semrush)
- Thin = little/no added value (NOT only low word count): doesn't answer intent, copy-paste,
  keyword-stuffed, low-value AI output, or pages made only to rank.
- Thin content violates spam policies → manual actions possible. Panda-era values still in core ranking.

## 9. Helpful content (2024+)
- Helpful Content classifier folded into core ranking (March 2024). No separate "recovery" path —
  weak pages weigh on the whole site now.
- Google: expected "45% less low-quality, unoriginal content" after the update. Self-assess via the
  helpful-content question list before publishing.

## 10. Local / multi-location SEO (2026)
- Every location page needs genuine localized value: unique copy, real local proof (address, team,
  reviews, GBP), internal links, distinct structure. City-name-swapped boilerplate = spam.
- Service-area businesses (travel to the customer, no local office) CAN target a city radius —
  "service area SEO" — but each page must still earn its place with real unique content.
- Schema: LocalBusiness + Organization + GeoCoordinates, valid JSON-LD. For AI/LLMs, structured
  data helps entities be understood and cited.
- E-E-A-T signals (Experience, Expertise, Authoritativeness, Trustworthiness) matter for local trust.

## 11. The playbook (SEO Engico / vrid / Search Atlas consensus)
1. Inventory all indexed URLs (GSC + crawler + sitemap).
2. Cross-reference: traffic (12–16 mo), position, backlinks, last-updated.
3. Score decay: >60% click drop period-over-period = candidate; <3 clicks/28d but >100 impressions/16mo = candidate.
4. Four-bucket tree (first "yes" wins): **Rewrite** (targets a query we want, topic still relevant) →
   **Redirect** (stronger page covers same intent) → **Noindex** (needed for users, no search value) →
   **Delete** (nothing).
5. Remove deletes from sitemap; wait 4 weeks; check GSC; next batch.

## 12. 2026 core updates & programmatic SEO (web research, Aug 2026)
- Google core updates in 2026: **Feb (Discover), Mar 27, May 21** (SEJ algorithm history). Multiple
  per year = ranking volatility; don't panic-prune on every one.
- Google's "scaled content abuse" policy (Mar 2024) → the programmatic penalty. Differentiator =
  VALUE PER PAGE, not page count: Zapier runs 70k programmatic pages fine; a "category in city"
  template with 150 words of near-identical copy gets nuked.
- Programmatic SEO safety signals (guptadeepak / metaflow / seomatic):
  - Internal-linking density 5–15 links/page (well-integrated into site structure).
  - Each URL differentiated by real attributes (price, photos, data — like Zillow's MLS fields),
    NOT city-name swaps.
  - Bounce >80% + time-on-page <30s + zero returning visitors = failing pages (prune candidates).
  - Match template format to the dominant SERP format (map/address/hours vs article).
- Ahrefs Mar 2026: only 38% of AI Overview citations from Google top-10 (was 76% Jul 2025) →
  coherence + coverage beat raw position.

## 13. Local SEO ranking factors 2026 (BrightLocal + ClickRank — WEIGHTS CONFLICT, verify)
- Google local ranking = **Relevance + Distance + Prominence** (official).
- BrightLocal (Jan 2026, the benchmark): Local Pack = GBP 32%, Reviews 20%, On-page 15%,
  Behavioral 9%, Links 8%, Citations 6%, Personalization 6%, Social 4%.
  Local organic = On-page 33%, Links 24%, Behavioral 10%, Personalization 8%, GBP 7%, Citations 7%.
  Trend vs 2023: on-page DOWN, reviews UP, links DOWN.
- ClickRank (May 2026): GBP 32%, on-page 19%, reviews 16%, links 15%, behavioral 8%, citations 7%.
  **CONFLICT**: on-page 15% vs 19%, reviews 20% vs 16%, links 8% vs 15%. Trust BrightLocal
  (longer-running expert survey); treat GBP ≈30% as the anchor.
- GBP = "free storefront"; GBP actions +41% YoY. Keyword-stuffing in business name = suspension risk.
- 46% of all Google searches carry local intent (2026); AI Overviews on 23% of searches.
- Proximity loses to authority for: service-area businesses, competitive markets, "near me" less so.
- Schema MUST match GBP exactly — mismatch = entity signal conflict hurting rankings.
- Core Web Vitals local thresholds: LCP <2.5s, CLS <0.1, INP <200ms.
- Review velocity > raw count: 10 fresh reviews/month beats 200 stale 3-year-old reviews.
