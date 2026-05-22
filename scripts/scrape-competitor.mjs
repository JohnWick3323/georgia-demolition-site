import fs from 'node:fs/promises';
import path from 'node:path';
import { URL } from 'node:url';
import process from 'node:process';

// ── Constants ──────────────────────────────────────────────────────────────

const TARGET_URLS = [
  'https://carolinademoandremoval.com/',
  'https://carolinademoandremoval.com/north-carolina/residential-demolition-and-removal/',
  'https://carolinademoandremoval.com/north-carolina/post-demolition/',
  'https://carolinademoandremoval.com/north-carolina/core-demolition/',
  'https://carolinademoandremoval.com/north-carolina/specialized-demolition/',
  'https://carolinademoandremoval.com/north-carolina/ancillary-demolition/',
  'https://carolinademoandremoval.com/services/',
  'https://carolinademoandremoval.com/north-carolina/',
  'https://carolinademoandremoval.com/north-carolina/basement-removal/',
  'https://carolinademoandremoval.com/north-carolina/chimney-removal/',
  'https://carolinademoandremoval.com/north-carolina/concrete-removal/',
  'https://carolinademoandremoval.com/north-carolina/concrete-slabs-removal/',
  'https://carolinademoandremoval.com/north-carolina/concrete-steps-removal/',
  'https://carolinademoandremoval.com/north-carolina/deck-removal/',
  'https://carolinademoandremoval.com/north-carolina/driveway-removal/',
  'https://carolinademoandremoval.com/north-carolina/foundation-removal/',
  'https://carolinademoandremoval.com/north-carolina/garage-demolition-and-removal/',
  'https://carolinademoandremoval.com/north-carolina/home-demolition/',
  'https://carolinademoandremoval.com/north-carolina/mobile-home-removal/',
  'https://carolinademoandremoval.com/north-carolina/patio-removal/',
  'https://carolinademoandremoval.com/north-carolina/pool-removal/',
  'https://carolinademoandremoval.com/north-carolina/retaining-wall-removal/',
  'https://carolinademoandremoval.com/north-carolina/shed-removal/',
  'https://carolinademoandremoval.com/north-carolina/trailer-removal/',
  'https://carolinademoandremoval.com/north-carolina/debris-clean-up/',
  'https://carolinademoandremoval.com/north-carolina/junk-removal/',
  'https://carolinademoandremoval.com/north-carolina/recycling/',
  'https://carolinademoandremoval.com/north-carolina/waste-hauling-and-disposal/',
  'https://carolinademoandremoval.com/north-carolina/building-demolition/',
  'https://carolinademoandremoval.com/north-carolina/civil-demolition/',
  'https://carolinademoandremoval.com/north-carolina/commercial-demolition/',
  'https://carolinademoandremoval.com/north-carolina/explosive-demolition/',
  'https://carolinademoandremoval.com/north-carolina/industrial-demolition/',
  'https://carolinademoandremoval.com/north-carolina/infrastructure-demolition/',
  'https://carolinademoandremoval.com/north-carolina/residential-demolition/',
  'https://carolinademoandremoval.com/north-carolina/selective-demolition/',
  'https://carolinademoandremoval.com/north-carolina/asbestos-abatement/',
  'https://carolinademoandremoval.com/north-carolina/concrete-crushing-and-recycling/',
  'https://carolinademoandremoval.com/north-carolina/historical-and-architectural-demolition/',
  'https://carolinademoandremoval.com/north-carolina/hydro-demolition/',
  'https://carolinademoandremoval.com/north-carolina/silo-demolition/',
  'https://carolinademoandremoval.com/north-carolina/site-clearing-and-land-preparation/',
  'https://carolinademoandremoval.com/north-carolina/underwater-demolition/',
  'https://carolinademoandremoval.com/north-carolina/environmental-remediation/',
  'https://carolinademoandremoval.com/north-carolina/excavation/',
  'https://carolinademoandremoval.com/north-carolina/fire-and-water-restoration/',
  'https://carolinademoandremoval.com/north-carolina/furniture-removal/',
  'https://carolinademoandremoval.com/north-carolina/land-grading/',
];

const OUTPUT_DIR = 'competitor-content/carolinademoandremoval';

const USER_AGENT = 'competitor-content-scraper/1.0.0';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ── Pure helpers ───────────────────────────────────────────────────────────

/**
 * Converts a fully-qualified URL string into a filesystem-safe slug.
 *
 * Algorithm:
 *  1. Parse the URL with `new URL(url)`
 *  2. Return 'home' when pathname is '/' or empty
 *  3. Strip leading/trailing slashes
 *  4. Replace inner '/' characters with '--'
 *  5. Replace non-alphanumeric/hyphen characters with '-'
 *  6. Collapse runs of 2+ consecutive hyphens into a single hyphen
 *  7. Lowercase the result
 *
 * @param {string} url - A valid absolute URL string
 * @returns {string} A lowercase, filesystem-safe slug
 */
export function deriveSlug(url) {
  const parsed = new URL(url);
  let path = parsed.pathname;

  if (path === '/' || path === '') {
    return 'home';
  }

  // Strip leading and trailing slashes
  path = path.replace(/^\/|\/$/g, '');

  // Split on inner slashes to preserve segment boundaries as '--'
  const segments = path.split('/').map((segment) => {
    // Within each segment: replace non-alphanumeric/hyphen chars with '-',
    // then collapse consecutive hyphens, then lowercase
    return segment
      .replace(/[^a-z0-9-]/gi, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^-+|-+$/g, '')  // trim leading/trailing hyphens within segment
      .toLowerCase();
  });

  // Join segments with '--' (the path-separator marker)
  path = segments.join('--');

  return path;
}

// ── Pure helpers ───────────────────────────────────────────────────────────

/**
 * Strips all HTML tags from a fragment string.
 * Used internally by htmlToMarkdown to clean inner content.
 * @param {string} fragment
 * @returns {string}
 */
function stripTags(fragment) {
  return fragment.replace(/<[^>]+>/g, '').trim();
}

/**
 * Converts raw HTML to clean Markdown using regex/string manipulation only.
 * No external HTML parser libraries are used.
 *
 * Steps:
 *  1. Remove entire <script>, <style>, <nav>, <header>, <footer>,
 *     <noscript>, <iframe>, <svg> blocks (including their content)
 *  2. Convert <h1>–<h6> to # – ###### Markdown headings
 *  3. Convert <a href="...">text</a> to [text](href) Markdown links
 *  4. Convert <img alt="..."> to alt text; remove <img> with no alt
 *  5. Convert <li> items to "- " prefix
 *  6. Convert <p> to blank-line-separated paragraphs
 *  7. Convert <br> to newline
 *  8. Strip all remaining HTML tags
 *  9. Decode HTML entities
 * 10. Normalise whitespace
 *
 * @param {string} html - Raw HTML string
 * @returns {string} Clean Markdown string (may be empty)
 */
export function htmlToMarkdown(html) {
  if (!html) return '';

  // Step 1: Remove entire block elements that contain non-content
  const blockTags = ['script', 'style', 'nav', 'header', 'footer', 'noscript', 'iframe', 'svg'];
  for (const tag of blockTags) {
    html = html.replace(new RegExp(`<${tag}[\\s\\S]*?<\\/${tag}>`, 'gi'), '');
  }

  // Step 2: Convert headings h1–h6
  for (let level = 1; level <= 6; level++) {
    const prefix = '#'.repeat(level) + ' ';
    html = html.replace(
      new RegExp(`<h${level}[^>]*>([\\s\\S]*?)<\\/h${level}>`, 'gi'),
      (_, inner) => '\n\n' + prefix + stripTags(inner).trim() + '\n\n'
    );
  }

  // Step 3: Convert links — <a href="...">text</a> → [text](href)
  html = html.replace(
    /<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,
    (_, href, inner) => '[' + stripTags(inner).trim() + '](' + href + ')'
  );

  // Step 4: Convert images — keep alt text; remove images with no alt
  html = html.replace(/<img\s[^>]*alt="([^"]+)"[^>]*\/?>/gi, (_, alt) => alt);
  html = html.replace(/<img\s[^>]*\/?>/gi, '');

  // Step 5: Convert list items
  html = html.replace(
    /<li[^>]*>([\s\S]*?)<\/li>/gi,
    (_, inner) => '- ' + stripTags(inner).trim()
  );

  // Step 6: Convert paragraphs
  html = html.replace(
    /<p[^>]*>([\s\S]*?)<\/p>/gi,
    (_, inner) => '\n\n' + stripTags(inner).trim() + '\n\n'
  );

  // Step 7: Convert <br> to newline
  html = html.replace(/<br\s*\/?>/gi, '\n');

  // Step 8: Strip all remaining HTML tags
  html = html.replace(/<[^>]+>/g, '');

  // Step 9: Decode common HTML entities
  html = html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

  // Step 10: Normalise whitespace
  html = html.replace(/\r\n/g, '\n');           // normalise line endings
  html = html.replace(/[ \t]+/g, ' ');          // collapse inline spaces/tabs
  html = html.replace(/\n{3,}/g, '\n\n');       // max two consecutive newlines
  html = html.trim();

  return html;
}

// ── I/O helpers ────────────────────────────────────────────────────────────

/**
 * Fetches a URL with a 10-second timeout and up to 2 retries on
 * connection/timeout errors. Non-200 HTTP responses are returned immediately
 * without retry.
 *
 * @param {string} url - A valid absolute URL string
 * @returns {Promise<
 *   | { ok: true;  status: 200;    html: string }
 *   | { ok: false; status: number; error: string }
 *   | { ok: false; status: null;   error: string }
 * >}
 */
export async function fetchWithRetry(url) {
  const maxAttempts = 3;
  const retryDelay = 2000;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'User-Agent': USER_AGENT },
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (response.status !== 200) {
        // Non-200: return immediately — no retry
        return { ok: false, status: response.status, error: 'HTTP ' + response.status };
      }

      const html = await response.text();
      return { ok: true, status: 200, html };

    } catch (error) {
      clearTimeout(timer);

      if (attempt < maxAttempts) {
        await sleep(retryDelay);
        // continue to next attempt
      } else {
        return { ok: false, status: null, error: error.message };
      }
    }
  }
}

// ── I/O helpers ────────────────────────────────────────────────────────────

/**
 * Writes a single Markdown file with YAML front-matter to the output directory.
 *
 * File format:
 * ```
 * ---
 * url: https://carolinademoandremoval.com/pool-removal/
 * scraped_at: 2025-01-15T14:32:00.000Z
 * http_status: 200
 * ---
 *
 * [content here]
 * ```
 *
 * Write errors are intentionally not caught here — the caller handles them.
 *
 * @param {string} slug - Filesystem-safe slug (e.g. "pool-removal")
 * @param {string} content - Extracted Markdown content (non-empty)
 * @param {{ url: string, scrapedAt: string, httpStatus: number | 'error' }} meta
 * @returns {Promise<void>}
 */
export async function savePageFile(slug, content, meta) {
  const frontMatter =
    '---\n' +
    'url: ' + meta.url + '\n' +
    'scraped_at: ' + meta.scrapedAt + '\n' +
    'http_status: ' + meta.httpStatus + '\n' +
    '---\n\n';

  const fileContent = frontMatter + content;
  const filePath = path.join(OUTPUT_DIR, slug + '.md');

  await fs.writeFile(filePath, fileContent, 'utf8');
}

// ── I/O helpers ────────────────────────────────────────────────────────────

/**
 * Writes a Markdown run report to `{OUTPUT_DIR}/_run-report.md`.
 *
 * Report format:
 *   Run completed: <ISO timestamp>
 *   Attempted: N | Saved: N | Failed: N | Skipped: N
 *
 *   | URL | Status | Filename |
 *   |-----|--------|----------|
 *   | <url> | <httpStatus ?? reason> | <filename> |
 *
 * On write failure logs to stderr and exits with code 2.
 *
 * @param {Array<{url: string, slug: string, status: 'saved'|'skipped'|'failed', httpStatus: number|null, reason: string, filename: string}>} results
 * @returns {Promise<void>}
 */
async function generateRunReport(results) {
  const saved   = results.filter(r => r.status === 'saved').length;
  const failed  = results.filter(r => r.status === 'failed').length;
  const skipped = results.filter(r => r.status === 'skipped').length;

  const header =
    'Run completed: ' + new Date().toISOString() + '\n' +
    'Attempted: ' + results.length +
    ' | Saved: ' + saved +
    ' | Failed: ' + failed +
    ' | Skipped: ' + skipped + '\n\n';

  const tableHeader =
    '| URL | Status | Filename |\n' +
    '|-----|--------|----------|\n';

  const rows = results
    .map(r => '| ' + r.url + ' | ' + (r.httpStatus ?? r.reason) + ' | ' + r.filename + ' |')
    .join('\n');

  const reportContent = header + tableHeader + rows + '\n';
  const reportPath = path.join(OUTPUT_DIR, '_run-report.md');

  try {
    await fs.writeFile(reportPath, reportContent, 'utf8');
  } catch (error) {
    console.error('Fatal: could not write run report:', error.message);
    process.exit(2);
  }
}

// ── Orchestration ──────────────────────────────────────────────────────────

/**
 * Top-level orchestration function.
 *
 * Handles --dry-run mode, output directory setup, sequential fetch loop,
 * deduplication, run report generation, and process exit codes.
 *
 * Exit codes:
 *   0 — all URLs saved or skipped (non-200 / empty content)
 *   1 — one or more URLs failed (network error / timeout after all retries)
 *   2 — fatal error (output directory creation failed, run report write failed)
 */
async function main() {
  const dryRun = process.argv.includes('--dry-run');

  // ── Dry-run mode ──────────────────────────────────────────────────────────
  if (dryRun) {
    for (const url of TARGET_URLS) {
      const slug = deriveSlug(url);
      console.log(url + '  →  ' + slug + '.md');
    }
    process.exit(0);
  }

  // ── Create output directory ───────────────────────────────────────────────
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  } catch (error) {
    console.error('Fatal: cannot create output directory:', error.message);
    process.exit(2);
  }

  // ── Write .gitignore ──────────────────────────────────────────────────────
  try {
    await fs.writeFile(path.join(OUTPUT_DIR, '.gitignore'), '*\n', 'utf8');
  } catch (error) {
    console.error('Fatal: cannot create output directory:', error.message);
    process.exit(2);
  }

  // ── Deduplication ─────────────────────────────────────────────────────────
  const seen = new Set();
  const unique = [];
  for (const url of TARGET_URLS) {
    if (seen.has(url)) {
      console.warn('Warning: duplicate URL skipped:', url);
    } else {
      seen.add(url);
      unique.push(url);
    }
  }

  if (unique.length < 48) {
    console.warn('Warning: only ' + unique.length + ' unique URLs (expected 48)');
  }

  console.log('Starting scrape of ' + unique.length + ' URLs...');

  // ── Sequential fetch loop ─────────────────────────────────────────────────
  const results = [];

  for (let i = 0; i < unique.length; i++) {
    const url = unique[i];
    const slug = deriveSlug(url);

    if (i > 0) {
      await sleep(500);
    }

    const result = await fetchWithRetry(url);

    if (result.ok === true) {
      const markdown = htmlToMarkdown(result.html);

      if (markdown.trim().length === 0) {
        console.log('[SKIP] ' + url + ' — empty content after extraction');
        results.push({ url, slug, status: 'skipped', httpStatus: 200, reason: 'empty content', filename: 'skipped' });
      } else {
        try {
          await savePageFile(slug, markdown, {
            url,
            scrapedAt: new Date().toISOString(),
            httpStatus: 200,
          });
          console.log('[SAVED] ' + url + ' → ' + slug + '.md');
          results.push({ url, slug, status: 'saved', httpStatus: 200, reason: 'saved', filename: slug + '.md' });
        } catch (error) {
          console.error('[ERROR] write failed for ' + url + ': ' + error.message);
          results.push({ url, slug, status: 'failed', httpStatus: 200, reason: error.message, filename: 'skipped' });
        }
      }
    } else if (result.ok === false && result.status !== null) {
      // Non-200 HTTP response — skip, no retry
      console.log('[SKIP] ' + url + ' — HTTP ' + result.status);
      results.push({ url, slug, status: 'skipped', httpStatus: result.status, reason: 'HTTP ' + result.status, filename: 'skipped' });
    } else {
      // Network/timeout failure after all retries
      console.error('[FAIL] ' + url + ' — ' + result.error);
      results.push({ url, slug, status: 'failed', httpStatus: null, reason: result.error, filename: 'skipped' });
    }
  }

  // ── Generate run report ───────────────────────────────────────────────────
  await generateRunReport(results);

  // ── Exit code ─────────────────────────────────────────────────────────────
  const anyFailed = results.some(r => r.status === 'failed');
  process.exit(anyFailed ? 1 : 0);
}

// ── Entry point ────────────────────────────────────────────────────────────
main();
