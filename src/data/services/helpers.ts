import type { SubService } from './types';

export function sub(
  slug: string, name: string, parentSlug: string, parentName: string,
  description: string, metaDescription: string, heroHeading: string,
  features: string[], process: string[],
  faqs: { question: string; answer: string }[],
  intro: string, methodology: string, localAdvice: string
): SubService {
  return { slug, name, parentSlug, parentName, description, metaDescription, heroHeading, features, process, faqs, longContent: { intro, methodology, localAdvice } };
}
