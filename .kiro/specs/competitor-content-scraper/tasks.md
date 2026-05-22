# Implementation Plan: Competitor Content Scraper

## Overview

Implement `scripts/scrape-competitor.mjs` as a single Node.js 22 ESM script with no external dependencies. The script fetches 48 hardcoded competitor pages, converts HTML to Markdown, saves each page as a `.md` file with YAML front-matter, and writes a run report. Tasks are ordered so each step builds on the previous and the script is fully wired together at the end.

## Tasks

- [x] 1. Create script file with constants
  - [x] 1.1 Create `scripts/scrape-competitor.mjs` with all module-level constants
    - Create the `scripts/` directory and the file
    - Add ESM imports: `node:fs/promises`, `node:path`, `node:url`, `node:process`
    - Define `TARGET_URLS` as a `const` array of exactly the 48 URLs below (use these exact URLs, not the placeholder URLs in the design):
      ```
      https://carolinademoandremoval.com/
      https://carolinademoandremoval.com/north-carolina/residential-demolition-and-removal/
      https://carolinademoandremoval.com/north-carolina/post-demolition/
      https://carolinademoandremoval.com/north-carolina/core-demolition/
      https://carolinademoandremoval.com/north-carolina/specialized-demolition/
      https://carolinademoandremoval.com/north-carolina/ancillary-demolition/
      https://carolinademoandremoval.com/services/
      https://carolinademoandremoval.com/north-carolina/
      https://carolinademoandremoval.com/north-carolina/basement-removal/
      https://carolinademoandremoval.com/north-carolina/chimney-removal/
      https://carolinademoandremoval.com/north-carolina/concrete-removal/
      https://carolinademoandremoval.com/north-carolina/concrete-slabs-removal/
      https://carolinademoandremoval.com/north-carolina/concrete-steps-removal/
      https://carolinademoandremoval.com/north-carolina/deck-removal/
      https://carolinademoandremoval.com/north-carolina/driveway-removal/
      https://carolinademoandremoval.com/north-carolina/foundation-removal/
      https://carolinademoandremoval.com/north-carolina/garage-demolition-and-removal/
      https://carolinademoandremoval.com/north-carolina/home-demolition/
      https://carolinademoandremoval.com/north-carolina/mobile-home-removal/
      https://carolinademoandremoval.com/north-carolina/patio-removal/
      https://carolinademoandremoval.com/north-carolina/pool-removal/
      https://carolinademoandremoval.com/north-carolina/retaining-wall-removal/
      https://carolinademoandremoval.com/north-carolina/shed-removal/
      https://carolinademoandremoval.com/north-carolina/trailer-removal/
      https://carolinademoandremoval.com/north-carolina/debris-clean-up/
      https://carolinademoandremoval.com/north-carolina/junk-removal/
      https://carolinademoandremoval.com/north-carolina/recycling/
      https://carolinademoandremoval.com/north-carolina/waste-hauling-and-disposal/
      https://carolinademoandremoval.com/north-carolina/building-demolition/
      https://carolinademoandremoval.com/north-carolina/civil-demolition/
      https://carolinademoandremoval.com/north-carolina/commercial-demolition/
      https://carolinademoandremoval.com/north-carolina/explosive-demolition/
      https://carolinademoandremoval.com/north-carolina/industrial-demolition/
      https://carolinademoandremoval.com/north-carolina/infrastructure-demolition/
      https://carolinademoandremoval.com/north-carolina/residential-demolition/
      https://carolinademoandremoval.com/north-carolina/selective-demolition/
      https://carolinademoandremoval.com/north-carolina/asbestos-abatement/
      https://carolinademoandremoval.com/north-carolina/concrete-crushing-and-recycling/
      https://carolinademoandremoval.com/north-carolina/historical-and-architectural-demolition/
      https://carolinademoandremoval.com/north-carolina/hydro-demolition/
      https://carolinademoandremoval.com/north-carolina/silo-demolition/
      https://carolinademoandremoval.com/north-carolina/site-clearing-and-land-preparation/
      https://carolinademoandremoval.com/north-carolina/underwater-demolition/
      https://carolinademoandremoval.com/north-carolina/environmental-remediation/
      https://carolinademoandremoval.com/north-carolina/excavation/
      https://carolinademoandremoval.com/north-carolina/fire-and-water-restoration/
      https://carolinademoandremoval.com/north-carolina/furniture-removal/
      https://carolinademoandremoval.com/north-carolina/land-grading/
      ```
    - Define `OUTPUT_DIR = 'competitor-content/carolinademoandremoval'`
    - Define `USER_AGENT = 'competitor-content-scraper/1.0.0'`
    - Add a `sleep(ms)` helper: `const sleep = (ms) => new Promise(r => setTimeout(r, ms))`
    - _Requirements: 1.1, 2.1, 6.1, 6.2_

- [x] 2. Implement pure helper functions
  - [x] 2.1 Implement `deriveSlug(url)`
    - Parse the URL with `new URL(url)`
    - Return `'home'` when pathname is `/` or empty
    - Strip leading/trailing slashes, replace inner `/` with `--`, replace non-alphanumeric/hyphen chars with `-`, collapse consecutive hyphens, lowercase
    - _Requirements: 4.2, 4.3_

  - [ ]* 2.2 Write property test for `deriveSlug` — Property 2: Slug safety
    - **Property 2: Slug safety** — for any URL, `deriveSlug(url)` matches `/^[a-z0-9][a-z0-9-]*$|^home$/`
    - Use Vitest with `fast-check` (add `fast-check` as a devDependency); generate arbitrary path strings
    - **Validates: Requirements 4.2, 4.3**

  - [ ]* 2.3 Write property test for `deriveSlug` — Property 3: Slug uniqueness
    - **Property 3: Slug uniqueness** — all 48 `TARGET_URLS` produce distinct slugs (no two map to the same filename)
    - Enumerate `TARGET_URLS.map(deriveSlug)` and assert the Set size equals the array length
    - **Validates: Requirements 4.2, 4.3**

  - [x] 2.4 Implement `htmlToMarkdown(html)`
    - Remove `<script>`, `<style>`, `<nav>`, `<header>`, `<footer>`, `<noscript>`, `<iframe>`, `<svg>` blocks entirely
    - Convert `<h1>`–`<h6>` to `#`–`######` Markdown headings
    - Convert `<a href="...">text</a>` to `[text](href)` Markdown links
    - Convert `<img alt="...">` to alt text; remove `<img>` with no alt
    - Convert `<li>` items to `- ` prefix
    - Convert `<p>` to blank-line-separated paragraphs
    - Convert `<br>` to newline
    - Strip all remaining HTML tags
    - Decode HTML entities (`&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, `&nbsp;`)
    - Normalise whitespace: collapse inline spaces/tabs, collapse 3+ blank lines to 2, trim
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [ ]* 2.5 Write property test for `htmlToMarkdown` — Property 4: No HTML tag leakage
    - **Property 4: No HTML tag leakage** — `htmlToMarkdown(h)` never contains a substring matching `/<[a-zA-Z]/`
    - Generate arbitrary HTML strings with `fast-check`
    - **Validates: Requirements 3.1, 3.5**

  - [ ]* 2.6 Write property test for `htmlToMarkdown` — Property 5: Idempotent extraction
    - **Property 5: Idempotent extraction** — `htmlToMarkdown(htmlToMarkdown(h)) === htmlToMarkdown(h)` for all strings `h`
    - Generate arbitrary strings with `fast-check`
    - **Validates: Requirements 3.5, 3.6**

- [x] 3. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement I/O helper functions
  - [x] 4.1 Implement `fetchWithRetry(url)`
    - Create an `AbortController` and set a 10-second timeout via `setTimeout`
    - Send `fetch(url, { method: 'GET', headers: { 'User-Agent': USER_AGENT }, signal })`
    - Clear the timer on success or non-200 response
    - Return `{ ok: false, status, error }` immediately on non-200 (no retry)
    - On connection error or abort: retry up to 2 additional times with a 2-second `sleep` between attempts
    - After all retries exhausted, return `{ ok: false, status: null, error: error.message }`
    - On HTTP 200: return `{ ok: true, status: 200, html: await response.text() }`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [ ]* 4.2 Write property test for `fetchWithRetry` — Property 9: Non-200 responses are never retried
    - **Property 9: Non-200 responses are never retried** — mock `fetch` to return a non-200 status and assert `fetch` is called exactly once
    - Use Vitest's `vi.fn()` to mock the global `fetch`
    - **Validates: Requirements 2.3, 2.7**

  - [ ]* 4.3 Write property test for `fetchWithRetry` — Property 10: Retry bound
    - **Property 10: Retry bound** — mock `fetch` to always throw a network error and assert it is called at most 3 times total
    - Use Vitest's `vi.fn()` to mock the global `fetch`
    - **Validates: Requirements 2.4, 2.5**

  - [x] 4.4 Implement `savePageFile(slug, content, meta)`
    - Build YAML front-matter string with `url`, `scraped_at`, and `http_status` fields, delimited by `---` fences
    - Concatenate front-matter and content
    - Write to `path.join(OUTPUT_DIR, slug + '.md')` with UTF-8 encoding using `fs.writeFile`
    - _Requirements: 4.4, 4.5, 4.6_

  - [ ]* 4.5 Write property test for `savePageFile` — Property 6: Front-matter validity
    - **Property 6: Front-matter validity** — every file written by `savePageFile` begins with `---\n` and contains `url:`, `scraped_at:`, and `http_status:` before the closing `---`
    - Generate arbitrary slug/content/meta combinations with `fast-check`; read back the written file and assert structure
    - **Validates: Requirements 4.5, 4.6**

  - [x] 4.6 Implement `generateRunReport(results)`
    - Compute saved/failed/skipped counts from the `results` array
    - Build the summary header line and Markdown table (columns: URL, Status, Filename)
    - Write to `path.join(OUTPUT_DIR, '_run-report.md')` with UTF-8 encoding
    - On write failure: log to stderr and call `process.exit(2)`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ]* 4.7 Write property test for `generateRunReport` — Property 7: Report completeness
    - **Property 7: Report completeness** — the row count in the written report equals `results.length`, and Saved + Failed + Skipped equals the total attempted count
    - Generate arbitrary `PageResult[]` arrays with `fast-check`
    - **Validates: Requirements 5.2, 5.3**

- [x] 5. Implement `main()` and wire everything together
  - [x] 5.1 Implement `main()` orchestration function
    - Check `process.argv.includes('--dry-run')`; if true, log each URL → slug pair and `process.exit(0)`
    - Call `fs.mkdir(OUTPUT_DIR, { recursive: true })`; on failure log to stderr and `process.exit(2)`
    - Write `.gitignore` containing `*\n` inside `OUTPUT_DIR` immediately after directory creation
    - Deduplicate `TARGET_URLS` with a `Set`; warn on duplicates; warn if unique count < 48
    - Log the unique URL count before the loop begins
    - Sequential loop: for each URL, call `fetchWithRetry`, branch on result, call `htmlToMarkdown` and `savePageFile` on success, record a `PageResult` for every outcome
    - Apply 500ms `sleep` between requests (skip before the first request)
    - After the loop, call `generateRunReport(results)`
    - Exit with code `1` if any result has `status === 'failed'`, otherwise exit `0`
    - Add `main()` call at the bottom of the file
    - _Requirements: 1.2, 1.3, 1.4, 2.6, 3.7, 4.1, 4.7, 6.3, 6.4, 6.5, 6.6, 6.7, 7.2_

  - [ ]* 5.2 Write property test for `main()` — Property 1: URL completeness
    - **Property 1: URL completeness** — for every URL in `TARGET_URLS` (after deduplication), exactly one entry exists in `results`
    - Mock `fetchWithRetry` and `savePageFile`; run `main()` and capture the `results` array passed to `generateRunReport`
    - **Validates: Requirements 1.1, 1.3**

  - [ ]* 5.3 Write property test for exit codes — Property 8: Exit code contract
    - **Property 8: Exit code contract** — exit code is `0` iff no result has `status === 'failed'`; exit code is `1` if any result has `status === 'failed'`
    - Mock `process.exit` with `vi.fn()`; run `main()` with controlled fetch mock results
    - **Validates: Requirements 6.5, 6.6, 6.7**

- [x] 6. Checkpoint — Verify dry-run and full run
  - Run `node scripts/scrape-competitor.mjs --dry-run` and confirm all 48 URL → slug pairs are logged with no HTTP requests made
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Run the scraper to download all 48 pages
  - [x] 7.1 Execute `node scripts/scrape-competitor.mjs` from the project root
    - Run the script and observe console output for `[SAVED]`, `[SKIP]`, and `[FAIL]` lines
    - Confirm `competitor-content/carolinademoandremoval/` is created with `.gitignore` and individual `.md` files
    - Confirm `_run-report.md` is written with correct summary counts
    - Review exit code: `0` means all saved/skipped, `1` means at least one network failure
    - _Requirements: 1.1, 2.2, 4.1, 5.1, 6.3, 6.5, 6.6_

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- `fast-check` must be added as a devDependency (`npm install --save-dev fast-check`) before running property tests
- The 48 URLs in task 1.1 are the exact user-supplied URLs — they differ from the placeholder URLs in the design document; use the task list URLs
- The `.gitignore` inside `OUTPUT_DIR` is written on every run (task 5.1), so scraped files are never tracked by git even on the first run
- Add `competitor-content/` to the project-level `.gitignore` to prevent the directory itself from being tracked
- Checkpoints in tasks 3 and 6 validate incremental progress before proceeding to the next phase

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1", "2.4"] },
    { "id": 2, "tasks": ["2.2", "2.3", "2.5", "2.6", "4.1", "4.4", "4.6"] },
    { "id": 3, "tasks": ["4.2", "4.3", "4.5", "4.7"] },
    { "id": 4, "tasks": ["5.1"] },
    { "id": 5, "tasks": ["5.2", "5.3"] },
    { "id": 6, "tasks": ["7.1"] }
  ]
}
```
