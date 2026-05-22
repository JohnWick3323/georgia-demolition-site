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

export interface ServiceContentSections {
  costFactors: { factor: string; detail: string }[];
  typicalCostRange: string;
  timelinePhases: { phase: string; duration: string; detail: string }[];
  equipment: { category: string; items: string[] }[];
  safetyProtocols: string[];
  wastePlan: string[];
  prepChecklist: string[];
  diyRisks: string[];
  whyChooseUs: { title: string; desc: string }[];
}
