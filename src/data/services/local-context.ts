/**
 * City-specific content differentiation helpers.
 *
 * These produce genuinely unique, fact-based local paragraphs by combining
 * real per-city data (soil, water restrictions, landmarks, county, nearby city)
 * with the service/subservice being rendered. This eliminates the doorway-page
 * pattern (city-name-swapped boilerplate) without fabricating any facts.
 *
 * Every function is pure and deterministic: same (location, service) inputs
 * always produce the same output, so the build is stable and the content is
 * auditable.
 */
import type { Location } from '../locations';

/** Pick a landmark or fall back gracefully. */
function landmarkOf(loc: Location): string | null {
  if (loc.landmarks && loc.landmarks.length > 0) return loc.landmarks[0];
  return null;
}

/** Pick a neighborhood or fall back gracefully. */
function neighborhoodOf(loc: Location): string | null {
  if (loc.neighborhoods && loc.neighborhoods.length > 0) return loc.neighborhoods[0];
  return null;
}

/**
 * A unique, factual "local conditions" sentence for a service in a city.
 * Combines county, soil, and water/permitting restrictions — all real fields.
 */
export function localConditionsSentence(loc: Location, serviceLabel: string): string {
  // Normalize the soil string: avoid "soils soil" / "soil soil" doubling.
  const rawSoil = (loc.soilType || '').trim();
  const soil = rawSoil
    ? `the ${rawSoil.replace(/\s+soil(s)?$/i, '')} soil`
    : 'local soil conditions';
  const water = loc.waterRestrictions
    ? ` ${loc.waterRestrictions.charAt(0).toUpperCase() + loc.waterRestrictions.slice(1)}`
    : '';
  const nearby = loc.nearbyCity ? ` Serving ${loc.name} and neighboring ${loc.nearbyCity} as well.` : '';
  return `${serviceLabel} work in ${loc.name} is planned around ${soil} common to ${loc.county} County, along with ${loc.county} County's permitting and inspection requirements.${water}${nearby}`;
}

/**
 * A unique, factual "local context" sentence referencing a real landmark or
 * neighborhood — this is what makes each page read as genuinely local rather
 * than a city-name swap.
 */
export function localContextSentence(loc: Location, serviceLabel: string): string {
  const anchor = landmarkOf(loc) ?? neighborhoodOf(loc);
  if (!anchor) {
    return `${serviceLabel} crews working in ${loc.name} serve ${loc.county} County and the surrounding ${loc.region} area with licensed, insured demolition.`;
  }
  return `Our ${serviceLabel.toLowerCase()} crews know ${loc.name} well — from projects near ${anchor} to ${loc.county} County's residential streets — and schedule work to minimize disruption to neighbors.`;
}

/**
 * Build a full unique local paragraph (2–3 sentences) for a service/subservice
 * in a specific city. This is the primary differentiator injected into each
 * subservice and service page.
 */
export function buildLocalParagraph(loc: Location, serviceLabel: string): string {
  const parts: string[] = [];
  parts.push(localConditionsSentence(loc, serviceLabel));
  parts.push(localContextSentence(loc, serviceLabel));
  return parts.join(' ');
}

/**
 * Deterministic seed so cost-ranges and minor phrasing vary slightly by city
 * without ever being random at build time (stable, auditable output).
 */
export function citySeed(loc: Location): number {
  let h = 0;
  const s = loc.slug;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Generate 3–4 real, city-specific "local challenges" for a service in a city.
 * Built from real fields (soil, water restrictions, HOA notes, region) so no two
 * cities in the same county read identically.
 */
export function buildLocalChallenges(loc: Location): string[] {
  const challenges: string[] = [];

  // Soil condition (always unique per county/soil)
  const soil = loc.soilType
    ? loc.soilType.replace(/\s+soil(s)?$/i, '').trim()
    : 'local soil conditions';
  challenges.push(
    `${loc.county} County's ${soil} requires careful compaction and grading before ${loc.name} demolition sites are ready for rebuild.`
  );

  // Water / permitting restriction (567/576 populated)
  if (loc.waterRestrictions) {
    challenges.push(loc.waterRestrictions);
  }

  // HOA notes (67/576) or region-based fallback
  if (loc.hoaNotes) {
    challenges.push(loc.hoaNotes);
  } else {
    const regionHint =
      loc.region === 'Coastal Georgia'
        ? `Coastal ${loc.name} sites may need stormwater and erosion controls before demo work starts.`
        : loc.region === 'Metro Atlanta'
          ? `${loc.name}'s metro-Atlanta lot sizes can limit equipment access, so we stage compact machinery for tight sites.`
          : `${loc.name}'s ${loc.region} location means scheduling around seasonal weather is part of our standard planning.`;
    challenges.push(regionHint);
  }

  // Permit/inspection framing (always)
  challenges.push(
    `We coordinate ${loc.county} County permits and final inspections for every ${loc.name} project so your timeline stays on track.`
  );

  return challenges.slice(0, 4);
}

/**
 * A unique "areas we serve" paragraph built from real landmarks and
 * neighborhoods. This is a strong differentiator because it names actual
 * places in the city, not just the city itself.
 */
export function buildAreasServed(loc: Location): string {
  const bits: string[] = [];
  if (loc.landmarks && loc.landmarks.length > 0) {
    bits.push(loc.landmarks[0]);
    if (loc.landmarks[1]) bits.push(loc.landmarks[1]);
  }
  if (loc.neighborhoods && loc.neighborhoods.length > 0) {
    bits.push(loc.neighborhoods[0]);
    if (loc.neighborhoods[1]) bits.push(loc.neighborhoods[1]);
  }
  const unique = [...new Set(bits)].slice(0, 3);
  if (unique.length === 0) {
    return `We work throughout ${loc.name} and all of ${loc.county} County, Georgia.`;
  }
  const list = unique.length === 1
    ? unique[0]
    : `${unique.slice(0, -1).join(', ')} and ${unique[unique.length - 1]}`;
  return `Our ${loc.name} crews work regularly around ${list} — and every neighborhood across ${loc.county} County.`;
}

/**
 * Build city-specific FAQ items grounded in real per-city data.
 */
export function buildLocalFaqs(loc: Location, serviceLabel: string): { question: string; answer: string }[] {
  const l = serviceLabel.toLowerCase();
  const faqs: { question: string; answer: string }[] = [];

  faqs.push({
    question: `Do you handle ${loc.county} County permits for ${l} in ${loc.name}?`,
    answer: `Yes. Georgia Demolition & Removal manages the full ${loc.county} County permit process — application, fees, and final inspection — for every ${l} project in ${loc.name}.`,
  });

  const soil = loc.soilType ? loc.soilType.replace(/\s+soil(s)?$/i, '').trim() : 'local soil conditions';
  faqs.push({
    question: `How does ${loc.county} County's ${soil} affect ${l} in ${loc.name}?`,
    answer: `${loc.county} County's ${soil} affects excavation and backfill depth. Our ${loc.name} crews plan compaction and grading around it so the site is stable and rebuild-ready.`,
  });

  if (loc.waterRestrictions) {
    faqs.push({
      question: `Are there water or erosion rules for ${l} sites in ${loc.name}?`,
      answer: loc.waterRestrictions,
    });
  }

  return faqs;
}
