export interface NewsItem {
  title: string;
  summary: string;
  date: string;
  category: string;
  slug: string;
}

export const demolitionNews: NewsItem[] = [
  {
    title: "Georgia Updates Demolition Permitting Process for 2026",
    summary: "The Georgia Department of Community Affairs streamlined demolition permit applications statewide, reducing processing times by up to 40% for residential teardowns across all 159 counties.",
    date: "2026-04-15",
    category: "Regulations",
    slug: "georgia-demolition-permit-updates-2026"
  },
  {
    title: "EPA Strengthens Asbestos Rules for Pre-1980 Demolitions",
    summary: "New federal guidelines require enhanced asbestos surveys for all structures built before 1980 scheduled for demolition, affecting thousands of older homes and commercial buildings across Georgia.",
    date: "2026-03-22",
    category: "Safety",
    slug: "epa-asbestos-rules-pre-1980-demolitions"
  },
  {
    title: "Demolition Industry Sees Record Growth in Southeast US",
    summary: "The demolition sector across Georgia and the Southeast grew 18% year-over-year, driven by redevelopment projects, aging infrastructure replacement, and commercial renovation demand.",
    date: "2026-03-10",
    category: "Industry",
    slug: "demolition-industry-growth-southeast-2026"
  },
  {
    title: "Concrete Recycling Mandates Expand in Georgia Counties",
    summary: "Over 45 Georgia counties now mandate concrete and masonry recycling from demolition projects, diverting thousands of tons of debris from landfills and reducing disposal costs for property owners.",
    date: "2026-02-28",
    category: "Sustainability",
    slug: "concrete-recycling-mandates-georgia"
  },
  {
    title: "Georgia EPD Updates Erosion Control Standards for Demolition Sites",
    summary: "New erosion and sediment control requirements from the Georgia Environmental Protection Division apply to all demolition sites exceeding half an acre, effective statewide.",
    date: "2026-02-14",
    category: "Regulations",
    slug: "georgia-epd-erosion-control-updates"
  },
  {
    title: "Rising Demand for Pool Removal Across Georgia Suburbs",
    summary: "Pool removal and fill-in projects surged 35% in Georgia's suburban counties as homeowners reclaim yard space, eliminate maintenance costs, and prepare properties for resale.",
    date: "2026-01-30",
    category: "Trends",
    slug: "pool-removal-demand-georgia-suburbs"
  }
];
