import { describe, it, expect } from 'vitest';
import { mainServices } from './services';

describe('Services data', () => {
  it('has at least 5 main service categories', () => {
    expect(mainServices.length).toBeGreaterThanOrEqual(5);
  });

  it('every main service has required fields', () => {
    for (const svc of mainServices) {
      expect(svc.slug).toBeTruthy();
      expect(svc.name).toBeTruthy();
      expect(svc.metaDescription).toBeTruthy();
      expect(svc.subServices.length).toBeGreaterThan(0);
    }
  });

  it('every sub-service has required fields', () => {
    for (const svc of mainServices) {
      for (const sub of svc.subServices) {
        expect(sub.slug).toBeTruthy();
        expect(sub.name).toBeTruthy();
        expect(sub.metaDescription).toBeTruthy();
      }
    }
  });

  it('all category slugs are unique', () => {
    const slugs = mainServices.map(s => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
