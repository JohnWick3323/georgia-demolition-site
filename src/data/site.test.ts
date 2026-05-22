import { describe, it, expect } from 'vitest';
import { site } from './site';

describe('Site configuration', () => {
  it('has required fields', () => {
    expect(site.name).toBeTruthy();
    expect(site.url).toMatch(/^https:\/\//);
    expect(site.phone).toMatch(/^\(\d{3}\) \d{3}-\d{4}$/);
    expect(site.phoneRaw).toMatch(/^\d{10}$/);
    expect(site.email).toContain('@');
  });

  it('has valid aggregate rating', () => {
    const rating = Number(site.aggregateRating.ratingValue);
    expect(rating).toBeGreaterThan(0);
    expect(rating).toBeLessThanOrEqual(5);
    const count = Number(site.aggregateRating.reviewCount);
    expect(count).toBeGreaterThan(0);
  });

  it('has valid opening hours', () => {
    expect(site.openingHoursSpecification.length).toBeGreaterThanOrEqual(1);
    for (const spec of site.openingHoursSpecification) {
      expect(spec.opens).toMatch(/^\d{2}:\d{2}$/);
      expect(spec.closes).toMatch(/^\d{2}:\d{2}$/);
    }
  });
});
