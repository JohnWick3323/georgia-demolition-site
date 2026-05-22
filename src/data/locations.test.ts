import { describe, it, expect } from 'vitest';
import { locations } from './locations';

describe('Locations data', () => {
  it('has at least 70 Georgia cities', () => {
    expect(locations.length).toBeGreaterThanOrEqual(70);
  });

  it('every location has required fields', () => {
    for (const loc of locations) {
      expect(loc.slug).toBeTruthy();
      expect(loc.name).toBeTruthy();
      expect(loc.state).toBe('GA');
      expect(loc.county).toBeTruthy();
      expect(loc.region).toBeTruthy();
      expect(loc.metaDescription).toBeTruthy();
      expect(loc.metaDescription.length).toBeLessThanOrEqual(160);
    }
  });

  it('all slugs are unique', () => {
    const slugs = locations.map(l => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('all enriched locations have valid geo coordinates', () => {
    const enriched = locations.filter(l => l.geo);
    for (const loc of enriched) {
      expect(loc.geo!.lat).toBeGreaterThan(30);
      expect(loc.geo!.lat).toBeLessThan(35);
      expect(loc.geo!.lng).toBeLessThan(-80);
      expect(loc.geo!.lng).toBeGreaterThan(-86);
    }
  });
});
