# Source Judging Report — 55 SEO Sources + 2 Videos + 7 Web Sources

> Method: source-judging skill (5-step: common ground → unique → contradictions → quality → synthesis).
> Date: Aug 2026. Sources grouped into 6 topical clusters.

---

## PART A — ANALYSIS SUMMARY (internal)

### A1. Common Ground (validated by 3+ independent sources — most reliable)

**Content Pruning (16 sources agree):**
1. Pruning ≠ deletion. Every page gets ONE fate from 5 buckets: Keep / Refresh / Merge / Noindex / Remove+301. (Sources: 10, 11, 15, 44, 48, 49, 5, 50, 52, 53, 54, 6, 7, 8, 9 + seoengico + seaudit + redback)
2. Never delete-without-redirect a page with backlinks or residual traffic → 301 to closest topical page, never to homepage (soft-404). (All content-pruning sources)
3. Pure deletion uses **410 (preferred) or 404**. (11, 48, 52, Amit Tiwari video)
4. **Batches of 20–50 pages**, measure 4–8 weeks between waves. Never site-wide at once. (10, 15, 49, 5, 52, 53, seaudit, searchengineland)
5. Expected temporary traffic dip (1–2 weeks) post-prune; reverse if dip persists >2 weeks. (Amit Tiwari video, 49, 52)
6. 20–40% of an ageing site's indexed URLs typically belong in the "should not exist" bucket. (49, 52, seaudit, seoengico)
7. Run full prune every 6–12 months; heavy publishers quarterly. (52, redback, 49)

**Doorway pages (6 sources + Google official):**
8. Google's official spam policy (2): "multiple domain names or pages targeted at specific regions or cities that funnel users to one page" + "substantially similar pages closer to search results than a browseable hierarchy" = doorway abuse.
9. City-name-swapped boilerplate (find-and-replace: only town/zip changed) = canonical doorway spam. (12, 13, 14, 27, 2, 3)
10. Location pages are NOT automatically doorway pages — but cross the line when: boilerplate copy, no local footprint (no address/team/reviews), orphaned (no internal links), no unique value. (13, 14, 27, 3)

**Local / multi-location (14 sources):**
11. Every location page needs genuine localized value + real local proof. (16, 22, 25, 26, 28, 41, 45, 31)
12. LocalBusiness + Organization + GeoCoordinates schema = baseline. (18, 21, 29, 37, 38)
13. Service-area businesses (no office) can target city radius via "service area SEO" — but each page must earn its place. (31, 25, 41)

**Thin content / decay:**
14. Thin = little/no added value, NOT only low word count. (46, 52, 53)
15. Content decay = a mismatch problem (query/SERP/business-job drift), not an age problem. (47, 52)

### A2. Unique Contributions (credible, only in that source)

- **Source 49 (SEO Engico):** The exact GSC "decay query" — 16-month range, compare 28d vs prior 28d, filter `/blog/`, flag >60% click drop + <3 clicks/28d but >100 impressions/16mo. **Actionable, keep.**
- **Source 15 (Enterprise Search Architecture):** C_E crawl-efficiency formula U_V/U_T × θ_C, and the Jaccard-similarity control for detecting near-duplicate directory pages. **Keep as a technical control.**
- **Source 53 (vrid.ai):** page-by-page decision matrix + Google's own guidance on what to delete. **Keep.**
- **Source 47 (SEOJuice):** Pew (Jul 2025) stat — AI summary present → users click a normal result in only **8%** of visits (vs 15% without). **Keep, cited.**
- **Source redback-optimisation:** 2024 Content Warehouse API leak → `siteFocusScore` + `siteRadius` (domain-level topical focus/drift). **Keep, cited.**
- **Source redback-optimisation:** Ahrefs Mar 2026 — only **38%** of AI Overview citations from Google top-10 (down from 76% Jul 2025). **Keep, cited.**
- **Source searchengineland (AI search guide):** fan-out queries, passage indexing, multiple citations → AI pulls answers deep from a page. **Keep.**
- **Source 31 (TechDad):** explicit "Service Area SEO" framing for no-physical-office businesses. **Keep.**
- **Amit Tiwari video:** 410-vs-404 distinction, and "never delete category/pillar/tag pages (they orphan linked pages)." **Keep.**
- **SMA Marketing video:** ROT assessment (Redundant / Outdated / Trivial) + "check backlinks before deleting." **Keep.**

### A3. Contradictions & Discrepancies (flagged, judged)

1. **Traffic-dip magnitude after pruning.**
   - Sources 49/53 say "traffic can climb +36% in 8 weeks" (case study).
   - seaudit explicitly warns: "some case studies claim traffic doubled, others measure no isolated impact — never promise a % gain."
   - **Judgment:** seaudit's caution is more credible (honest about confounding variables). The +36% case is ONE client, not generalizable. **Recommendation: treat as "structural cleanup, indirect effect" — do not promise %.**

2. **How often to prune.**
   - Most say 6–12 months; 52 says "quarterly for heavy publishers"; redback says "quarterly cadence."
   - **Judgment:** reconcile as "6–12 months baseline, quarterly only for sites publishing >4×/month." Not a real conflict — different site sizes.

3. **Delete vs 404 vs 410.**
   - Amit Tiwari: 410 preferred for deleted pages.
   - Others (44, 48): "410 or 404" without preference; some just say "delete."
   - **Judgment:** 410 is technically cleaner (tells Google "gone forever"), but 404 is acceptable fallback when 410 can't be served. Agree with Amit Tiwari.

4. **noindex + robots.txt interaction.**
   - redback-optimisation explicitly warns: NEVER combine (robots.txt hides the noindex tag).
   - Other sources don't mention it.
   - **Judgment:** redback is technically correct per Google docs. Adopt as a rule. (Gap: most sources omit this critical detail.)

5. **Local ranking factor weights (new web research).**
   - BrightLocal (Jan 2026): Local Pack = GBP 32%, Reviews 20%, On-page 15%, Links 8%...
   - ClickRank (May 2026): GBP 32%, on-page 19%, reviews 16%, links 15%, behavioral 8%, citations 7%.
   - **Discrepancy:** on-page 15% vs 19%; reviews 20% vs 16%; links 8% vs 15%.
   - **Judgment:** BrightLocal is the long-running industry benchmark (larger expert survey), more credible for Local Pack. ClickRank's numbers appear to conflate Local Pack + local organic. **Flag: "verify exact weights — treat GBP as #1 (≈30%) and reviews as high-priority regardless of exact %."**

### A4. Quality Assessment (depth / evidence / clarity)

| Cluster | Strongest source | Weakest | Note |
|---|---|---|---|
| Content Pruning | 49 (SEO Engico), 53 (vrid), 52 (Search Atlas) | 44 (Digital Shift, 2.4KB), 48 (6.8KB) | Thin/sales pages add little |
| Doorway Pages | 2 (Google official), 27 (RicketyRoo) | 12 (Reddit rant) | Reddit = anecdote, but the 213-page case is a useful warning |
| Local/Multi-location | 41 (SEJ), 25 (Ranking By SEO), 45 (ALM Corp) | 24 (12KB), 33/40 (agency ads) | Several are pure agency marketing (33, 35, 39, 40, 43 = lead-gen, not research) |
| Schema | 38 (Opace, 56KB, comprehensive) | 18/21 (platform-specific how-tos) | 38 covers AI/LLM angle best |
| Thin/Decay | 46 (Semrush), 47 (SEOJuice) | — | Both strong |

**Overall:** The corpus is dominated by agency-marketing pages (11 of 55 = lead-gen with zero research value: 33, 35, 39, 40, 43, 17, 4, 20, 32, 34, 55). The genuine research value comes from ~15 sources. Best overall: **49, 53, 52, 15, 47, 2, 27, 41, 38.**

### A5. Major Research Gaps (no source answers these)

1. **Exact 2026 local ranking factor weights** — BrightLocal vs ClickRank disagree; needs the original BrightLocal Local Search Ranking Factors 2026 survey data.
2. **Post-pruning traffic recovery timeline** — no source gives a reliable benchmark beyond "weeks to months."
3. **Sitewide "scaled content abuse" threshold** — Google's March 2024 policy is vague; no source quantifies "how many programmatic pages is too many" (best proxy: value-per-page + Jaccard uniqueness, not a page count).
4. **AI Overview citation recovery post-prune** — seaudit gives 1 case (1/15 → 4/15 citations), but no replication.

---

## PART B — CONSOLIDATED CLIENT REPORT
*(see next file: seo-2026-client-report.md)*
