# Requirements Document

## Introduction

This feature provides a competitor content scraper that downloads and saves the text content from a predefined list of competitor pages on carolinademoandremoval.com. The scraped content is stored in a dedicated folder within the georgia-demolition-experts project workspace so that it can be referenced when writing or improving content for the Georgia demolition site. The scraper runs as a Node.js script (outside the Astro build pipeline) and captures all 48 target URLs without omission.

## Glossary

- **Scraper**: The Node.js script that fetches and saves competitor page content.
- **Target_URL**: One of the 48 predefined competitor page URLs to be scraped.
- **Output_Directory**: The folder `competitor-content/carolinademoandremoval` inside the project root where scraped files are saved.
- **Page_File**: A Markdown file saved to the Output_Directory that contains the extracted text content of one scraped page.
- **Slug**: The URL path segment(s) used to derive a unique, filesystem-safe filename for each Page_File (e.g., `north-carolina--pool-removal.md`).
- **Extracted_Content**: The visible text content of a page, stripped of HTML tags, navigation chrome, scripts, and style blocks, but preserving headings, paragraphs, and list structure in Markdown format.
- **Run_Report**: A summary file (`_run-report.md`) written to the Output_Directory after each scraper execution listing each URL, its HTTP status, and whether the file was saved successfully.

---

## Requirements

### Requirement 1: Define the Target URL List

**User Story:** As a content strategist, I want a single authoritative list of all 48 competitor URLs defined in the scraper, so that no pages are accidentally omitted or duplicated.

#### Acceptance Criteria

1. THE Scraper SHALL contain a hardcoded array of exactly 48 Target_URLs, all belonging to the domain `carolinademoandremoval.com`.
2. THE Scraper SHALL deduplicate the Target_URL array at startup and log one warning per duplicate URL found, identifying the duplicate value.
3. WHEN the Scraper starts, THE Scraper SHALL log the total count of unique Target_URLs before fetching begins.
4. IF deduplication reduces the count below 48, THEN THE Scraper SHALL log a warning identifying the shortfall count before proceeding.

---

### Requirement 2: Fetch Each Target Page

**User Story:** As a content strategist, I want the scraper to download the HTML of every Target_URL, so that I have the raw material needed to extract competitor content.

#### Acceptance Criteria

1. WHEN a Target_URL is requested, THE Scraper SHALL send an HTTP GET request with a `User-Agent` header in the format `{tool-name}/{version}` not exceeding 200 characters.
2. WHEN an HTTP 200 response is received, THE Scraper SHALL pass the response body to the content extractor.
3. IF an HTTP response with a status code other than 200 is received, THEN THE Scraper SHALL record the status code in the Run_Report and skip saving a Page_File for that URL without retrying.
4. IF a connection failure occurs or a response is not received within 10 seconds for a Target_URL, THEN THE Scraper SHALL retry the request up to 2 additional times with a 2-second delay between attempts before marking the URL as failed.
5. IF all retries for a Target_URL are exhausted without success, THEN THE Scraper SHALL record the failure reason in the Run_Report and continue processing the remaining Target_URLs.
6. THE Scraper SHALL process Target_URLs sequentially with a minimum 500 ms delay between requests.
7. Non-200 HTTP responses SHALL NOT trigger retries; only connection failures and timeouts SHALL trigger the retry logic defined in criterion 4.

---

### Requirement 3: Extract Readable Text Content

**User Story:** As a content strategist, I want the scraped output to contain clean, readable text rather than raw HTML, so that I can quickly review and reference competitor content.

#### Acceptance Criteria

1. WHEN HTML is received for a Target_URL, THE Scraper SHALL remove all `<script>`, `<style>`, `<nav>`, `<header>`, `<footer>`, and `<noscript>` elements before extracting text.
2. THE Scraper SHALL convert `<h1>`–`<h6>` elements to the corresponding Markdown heading syntax (`#`–`######`).
3. THE Scraper SHALL convert `<p>` elements to plain text paragraphs separated by a blank line.
4. THE Scraper SHALL convert `<ul>` and `<ol>` list items to Markdown list syntax (`-` for unordered, `1.` for ordered).
5. THE Scraper SHALL convert `<a>` elements to Markdown link syntax preserving the link text and href; THE Scraper SHALL convert `<img>` elements to their alt text if present, or omit them entirely if no alt text exists; THEN THE Scraper SHALL strip all remaining HTML tags from the Extracted_Content, leaving only plain text and Markdown formatting.
6. THE Scraper SHALL trim leading and trailing whitespace from the entire Extracted_Content document and collapse sequences of more than two consecutive blank lines into a single blank line.
7. IF the Extracted_Content for a page contains no non-whitespace characters after processing, THEN THE Scraper SHALL record this in the Run_Report and skip saving a Page_File for that URL.

---

### Requirement 4: Save Content to the Output Directory

**User Story:** As a content strategist, I want each page's content saved as a separate Markdown file in a predictable location, so that I can easily find and open any competitor page's content.

#### Acceptance Criteria

1. WHEN the Scraper starts, THE Scraper SHALL create the Output_Directory (`competitor-content/carolinademoandremoval`) if it does not already exist.
2. THE Scraper SHALL derive the Slug for each Target_URL by taking the URL path, removing leading and trailing slashes, replacing all remaining `/` characters with `--`, replacing any characters that are not alphanumeric or hyphens with a hyphen, and then collapsing sequences of two or more consecutive hyphens into a single hyphen.
3. THE Scraper SHALL name each Page_File using the pattern `{Slug}.md`; for the homepage URL the filename SHALL be `home.md`.
4. WHEN a Page_File already exists for a given Slug, THE Scraper SHALL overwrite it with the newly fetched content.
5. THE Scraper SHALL prepend a YAML front-matter block delimited by `---` fences to each Page_File containing the fields `url`, `scraped_at` (ISO 8601 timestamp), and `http_status`; WHERE no HTTP response was received, `http_status` SHALL be written as `"error"`.
6. THE Scraper SHALL write each Page_File using UTF-8 encoding.
7. IF a file write operation fails (e.g., disk full or permissions error), THEN THE Scraper SHALL record the failure in the Run_Report and continue processing the remaining Target_URLs.

---

### Requirement 5: Generate a Run Report

**User Story:** As a content strategist, I want a summary report after each scraper run, so that I can verify all pages were captured and quickly identify any failures.

#### Acceptance Criteria

1. WHEN all Target_URLs have been processed, THE Scraper SHALL write a Run_Report file named `_run-report.md` to the Output_Directory.
2. THE Run_Report SHALL contain a table with columns "URL", "Status", and "Filename", with one row per Target_URL listing: the URL, the HTTP status code or failure reason text, and the saved filename or "skipped" (where "skipped" covers both non-200 HTTP responses and empty-content cases).
3. THE Run_Report SHALL include a summary as the first line of the report stating the total number of pages attempted, the number successfully saved, the number failed (network/timeout after all retries), and the number skipped (non-200 response or empty content) as separate counts.
4. THE Run_Report SHALL include the date and time the scraper run completed in ISO 8601 format.
5. WHEN a previous `_run-report.md` exists, THE Scraper SHALL overwrite it with the new report.
6. IF writing the Run_Report itself fails, THEN THE Scraper SHALL log the error to stderr and exit with code `2`.

---

### Requirement 6: Scraper Invocation

**User Story:** As a developer, I want to run the scraper with a single command from the project root, so that I can easily trigger a fresh content capture without complex setup.

#### Acceptance Criteria

1. THE Scraper SHALL be implemented as a single Node.js script located at `scripts/scrape-competitor.mjs` within the project root.
2. THE Scraper SHALL use only Node.js built-in modules and dependencies already present in the project's `package.json`; no additional npm packages SHALL be required.
3. THE Scraper SHALL be executable via `node scripts/scrape-competitor.mjs` from the project root without any required command-line arguments.
4. WHERE a `--dry-run` flag is passed, THE Scraper SHALL log each Target_URL and its derived Slug to stdout without making any HTTP requests or writing any files, then exit with code `0`.
5. WHEN the scraper completes with all pages either saved or skipped due to empty content (per Requirement 3, criterion 7), THE Scraper SHALL exit with code `0`.
6. IF one or more pages fail due to non-200 HTTP responses or exhausted retries, THEN THE Scraper SHALL exit with code `1` to signal partial failure.
7. IF an unhandled fatal error occurs (e.g., Output_Directory creation failure), THEN THE Scraper SHALL log the error to stderr and exit with code `2`.

---

### Requirement 7: Exclude Scraped Content from Version Control

**User Story:** As a developer, I want the scraped competitor content excluded from git commits, so that the repository does not accumulate large, frequently-changing third-party content.

#### Acceptance Criteria

1. THE Scraper README or inline documentation SHALL include a setup section containing a code block showing the exact line `competitor-content/` to be added to the project's `.gitignore` file.
2. WHEN the Scraper creates the Output_Directory, THE Scraper SHALL write a `.gitignore` file inside the Output_Directory containing `*` before writing any Page_File or Run_Report, so that scraped files are never seen as untracked by git even on the first run.
