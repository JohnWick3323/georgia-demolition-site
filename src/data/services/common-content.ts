/**
 * Shared long-form content for service & sub-service pages.
 *
 * NOTE: This module was reconstructed during analysis because the original
 * file imported by the service page templates (services/[category]/[service].astro
 * and locations/[city]/[service]/[subservice].astro) was missing from the repo.
 * Content here is derived from the canonical service data in ./services so it
 * stays consistent with the rest of the site. Review before production.
 */
import { mainServices, type SubService, type MainService } from '../services';

export interface CostFactor {
  factor: string;
  detail: string;
}

export interface TimelinePhase {
  phase: string;
  duration: string;
  detail: string;
}

export interface EquipmentGroup {
  category: string;
  items: string[];
}

export interface WhyChoose {
  title: string;
  desc: string;
}

export interface ServiceContentSections {
  typicalCostRange: string;
  costFactors: CostFactor[];
  timelinePhases: TimelinePhase[];
  equipment: EquipmentGroup[];
  safetyProtocols: string[];
  wastePlan: string[];
  prepChecklist: string[];
  diyRisks: string[];
  whyChooseUs: WhyChoose[];
}

const DEFAULT_COST_RANGE =
  'Most projects range from $2,500 to $25,000 depending on structure size, materials, site access, and hazardous-material handling. We provide a detailed written estimate after a free on-site assessment.';

function findService(slug: string): { sub: SubService; category: MainService } | null {
  for (const category of mainServices) {
    const sub = category.subServices.find((s) => s.slug === slug);
    if (sub) return { sub, category };
  }
  return null;
}

const STANDARD_SAFETY: string[] = [
  'Utility locates and disconnections confirmed before any work begins',
  'Licensed asbestos survey completed for any structure built before 1981',
  'Perimeter barriers, signage, and dust-suppression systems deployed on site',
  'OSHA-compliant PPE for every crew member on every Georgia project',
  'Trained spotter on site whenever heavy equipment operates near structures',
  'Daily site inspections and end-of-day securing of the work area',
];

const STANDARD_WASTE: string[] = [
  'Concrete and masonry sorted and recycled at Georgia-certified facilities',
  'Metals separated for scrap recycling to reduce landfill volume',
  'Hazardous materials routed to permitted Georgia disposal sites per EPD rules',
  'Dust and erosion control per Georgia EPD stormwater requirements',
  'Final site graded, backfilled, and left clean and inspection-ready',
];

const STANDARD_PREP: string[] = [
  'Disconnect all utilities (electric, gas, water, sewer) with the provider',
  'Remove personal belongings, fixtures, and anything you want to keep',
  'Confirm permits and county inspections are scheduled',
  'Clear vehicle and equipment access to the structure',
  'Notify neighbors of planned work dates as a courtesy',
];

const STANDARD_RISKS: string[] = [
  'Undocumented asbestos or lead paint exposure without professional abatement',
  'Unexpected structural collapse or falling debris causing injury',
  'Striking buried utilities, gas lines, or wiring during tearing',
  'Fines and stop-work orders from unpermitted demolition activity',
  'Improper debris disposal violating Georgia EPD waste regulations',
];

const STANDARD_WHY: WhyChoose[] = [
  {
    title: 'Licensed & Insured',
    desc: 'Fully licensed Georgia demolition contractors with general liability, pollution liability, and workers compensation on every job.',
  },
  {
    title: 'Free On-Site Estimates',
    desc: 'Detailed written estimates across 576 cities across Georgia — no obligation, usually within 24 hours.',
  },
  {
    title: 'Permit Handling',
    desc: 'We manage the entire permit process, utility disconnections, and county inspections so your project stays on schedule.',
  },
  {
    title: 'Eco-Conscious',
    desc: 'Concrete recycling, metal scrap recovery, and EPD-compliant disposal on every project statewide.',
  },
];

const STANDARD_EQUIPMENT: EquipmentGroup[] = [
  {
    category: 'Demolition Equipment',
    items: ['Excavators with hydraulic breakers', 'Skid-steer loaders', 'Track loaders', 'Material handlers'],
  },
  {
    category: 'Material Handling',
    items: ['Roll-off dumpsters', 'Dump trucks', 'Grapple attachments', 'Concrete pulverizers'],
  },
  {
    category: 'Safety & Containment',
    items: ['Dust-suppression water systems', 'Perimeter fencing & signage', 'PPE & respiratory protection', 'Utility locating tools'],
  },
];

export function getContentForService(slug: string): ServiceContentSections {
  const found = findService(slug);
  const sub = found?.sub;
  const name = sub?.name ?? 'demolition';
  const lower = name.toLowerCase();

  // Cost factors — combine standard drivers with anything specific we know.
  const costFactors: CostFactor[] = [
    { factor: 'Structure size & scope', detail: `Larger ${lower} projects require more labor, equipment hours, and disposal capacity.` },
    { factor: 'Materials & construction', detail: 'Concrete, masonry, steel, and mixed materials each change demolition method and haul-away cost.' },
    { factor: 'Site access', detail: 'Tight urban lots or remote Georgia sites affect equipment mobilization and staging.' },
    { factor: 'Hazardous materials', detail: 'Asbestos or lead paint abatement adds licensed-survey and disposal requirements.' },
    { factor: 'Permits & disposal', detail: 'County permit fees and certified-facility disposal vary by jurisdiction across Georgia.' },
  ];

  // Timeline — build from the sub-service process steps when available.
  const process = sub?.process ?? [];
  const timelinePhases: TimelinePhase[] =
    process.length >= 2
      ? process.map((step, i) => ({
          phase: `Phase ${i + 1}: ${step.length > 42 ? step.slice(0, 42).trim() + '…' : step}`,
          duration: i === 0 ? '1–2 days' : i === process.length - 1 ? '1–3 days' : '2–4 days',
          detail: step,
        }))
      : [
          { phase: 'Assessment & Permits', duration: '1–2 days', detail: `We assess your ${lower} project, research county requirements, and secure permits.` },
          { phase: 'Preparation & Utility Cuts', duration: '1 day', detail: 'Utilities disconnected, site secured, and safety controls deployed.' },
          { phase: 'Demolition & Removal', duration: '1–5 days', detail: `Controlled ${lower} execution with continuous dust and debris management.` },
          { phase: 'Cleanup & Grading', duration: '1–3 days', detail: 'Debris hauled to certified facilities; site graded and left clean.' },
        ];

  const diyRisks: string[] =
    sub?.commonIssues && sub.commonIssues.length > 0
      ? sub.commonIssues
      : STANDARD_RISKS;

  return {
    typicalCostRange: DEFAULT_COST_RANGE,
    costFactors,
    timelinePhases,
    equipment: STANDARD_EQUIPMENT,
    safetyProtocols: STANDARD_SAFETY,
    wastePlan: STANDARD_WASTE,
    prepChecklist: STANDARD_PREP,
    diyRisks,
    whyChooseUs: STANDARD_WHY,
  };
}
