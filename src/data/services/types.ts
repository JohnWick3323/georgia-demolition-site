export interface SubService {
  slug: string;
  name: string;
  parentSlug: string;
  parentName: string;
  description: string;
  metaDescription: string;
  heroHeading: string;
  features: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
  longContent: {
    intro: string;
    methodology: string;
    localAdvice: string;
  };
  commonIssues?: string[];
}

export interface MainService {
  slug: string;
  name: string;
  description: string;
  metaDescription: string;
  heroHeading: string;
  image?: string;
  subServices: SubService[];
}
