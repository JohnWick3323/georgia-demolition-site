import type { SubService } from './types';

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

export const commonContent: Record<string, ServiceContentSections> = {
  basement: {
    costFactors: [
      { factor: "Basement size and depth", detail: "Full basements cost more to remove than partial or crawlspace basements. Depth affects excavation time and backfill volume." },
      { factor: "Soil conditions", detail: "Georgia's red clay soil adds compaction time. Rocky or water-saturated soil increases equipment needs and project duration." },
      { factor: "Access constraints", detail: "Tight access in urban Atlanta lots or hillside properties requires compact equipment and adds labor time." },
      { factor: "Utility complexity", detail: "Older Georgia homes often have complex utility configurations in basements requiring careful disconnection." },
      { factor: "Disposal requirements", detail: "Concrete recycling vs. landfill disposal affects costs. We prioritize recycling at Georgia-certified facilities." },
      { factor: "Permit requirements", detail: "County building departments have varying permit fees and inspection schedules across Georgia." }
    ],
    typicalCostRange: "$8,000 – $25,000 for standard residential basements in Georgia",
    timelinePhases: [
      { phase: "Pre-demolition assessment & permits", duration: "1–2 weeks", detail: "Structural assessment, asbestos testing if home is pre-1981, utility disconnection coordination with Georgia Power and Atlanta Gas Light, county permit filing." },
      { phase: "Active demolition", duration: "2–5 days", detail: "Systematic removal of basement walls, floor slab, and footings using hydraulic excavators and concrete breakers. Debris sorted for recycling." },
      { phase: "Backfill & compaction", duration: "1–2 days", detail: "Engineered fill placed in compacted lifts per Georgia building code. Compaction testing provided if required by county." },
      { phase: "Final grading & cleanup", duration: "1 day", detail: "Site graded to match surrounding grade, erosion control installed per Georgia EPD requirements, final inspection." }
    ],
    equipment: [
      { category: "Heavy Machinery", items: ["Hydraulic excavator with concrete breaker attachment", "Skid steer loader for tight access", "Dump trucks for debris hauling"] },
      { category: "Specialized Tools", items: ["Concrete saws for clean foundation cuts", "Compaction equipment (vibratory roller or plate compactor)", "Laser level for precise grading"] },
      { category: "Safety Equipment", items: ["Trench boxes if deep excavation required", "Dust suppression water spray system", "Full PPE for all crew members (hard hats, steel-toe boots, hi-vis vests, respirators as needed)"] }
    ],
    safetyProtocols: [
      "Pre-demolition asbestos survey for structures built before 1981",
      "Utility disconnection verification before any demolition begins",
      "Site-specific safety plan with daily crew briefings",
      "Excavation safety protocols including shoring if adjacent structures present",
      "Dust control measures to protect neighboring Georgia properties",
      "Stormwater pollution prevention plan for sites disturbing significant soil"
    ],
    wastePlan: [
      "Concrete crushed on-site or transported to Georgia-certified concrete recycling facilities",
      "Metal rebar and pipe separated for scrap metal recycling",
      "Clean fill material tested and reused where possible",
      "Non-recyclable debris transported to permitted Georgia C&D landfills",
      "Hazardous materials (if found) disposed at licensed facilities per Georgia EPD requirements"
    ],
    prepChecklist: [
      "Remove personal belongings from basement area",
      "Provide access for structural assessment and asbestos testing",
      "Coordinate utility disconnection dates with providers",
      "Notify neighbors of upcoming demolition work",
      "Secure any pets during active demolition days",
      "Mark property lines and any underground features to protect"
    ],
    diyRisks: [
      "Structural collapse risk — basements are load-bearing; improper removal damages foundations",
      "Utility strike danger — gas lines, electrical conduits, water mains may run through basement walls",
      "Asbestos exposure — pre-1981 homes likely contain asbestos in basement materials",
      "Heavy equipment operation requires professional training and licensing",
      "Improper backfill leads to settling, drainage problems, and foundation issues"
    ],
    whyChooseUs: [
      { title: "Georgia basement removal specialists", desc: "Our crews have completed hundreds of basement removals across metro Atlanta, Augusta, Savannah, and all 159 Georgia counties." },
      { title: "Full permit management", desc: "From Fulton County to rural south Georgia — we handle every county's unique permit requirements." },
      { title: "Proper compaction guaranteed", desc: "We compact backfill in lifts to Georgia building standards and provide compaction testing documentation." },
      { title: "Licensed asbestos coordination", desc: "We arrange licensed asbestos surveys and abatement before any demolition begins on older Georgia homes." }
    ]
  },

  chimney: {
    costFactors: [
      { factor: "Chimney height and construction", detail: "Taller chimneys require more scaffolding and safety setup. Brick chimneys cost more to remove than metal flue chimneys." },
      { factor: "Roof access difficulty", detail: "Steep Georgia roofs or multi-story homes require additional safety equipment and increase labor time." },
      { factor: "Interior fireplace retention", detail: "Keeping the interior fireplace while removing only the exterior chimney requires precision work and costs more." },
      { factor: "Asbestos presence", detail: "Pre-1980 Georgia homes may have asbestos in chimney mortar, flue liners, or surrounding materials requiring abatement." },
      { factor: "Roof repair after removal", detail: "Patching and weatherproofing the roof opening after chimney removal varies by roofing material and pitch." }
    ],
    typicalCostRange: "$2,500 – $8,000 for standard chimney removal in Georgia",
    timelinePhases: [
      { phase: "Inspection & permits", duration: "3–5 days", detail: "Chimney condition assessment, asbestos testing for pre-1980 homes, county permit verification." },
      { phase: "Active demolition", duration: "1–2 days", detail: "Scaffolding setup, top-down brick/masonry removal in controlled sections, debris lowered to ground level." },
      { phase: "Roof repair & cleanup", duration: "1 day", detail: "Roof opening patched and weatherproofed, interior fireplace opening sealed if requested, all debris removed." }
    ],
    equipment: [
      { category: "Access Equipment", items: ["Scaffolding system with guardrails", "Safety harnesses and fall protection", "Debris chute for controlled material lowering"] },
      { category: "Demolition Tools", items: ["Electric jackhammers for brick removal", "Hand tools for precision dismantling", "Mini-excavator for foundation-level chimney removal"] },
      { category: "Safety Gear", items: ["Hard hats, safety glasses, steel-toe boots", "Dust masks for masonry dust control", "Fall protection systems for roof work"] }
    ],
    safetyProtocols: [
      "Complete chimney structural assessment before any work begins",
      "Fall protection systems for all elevated work per OSHA requirements",
      "Controlled debris lowering — no throwing materials from height",
      "Ground-level exclusion zone to protect people and property below",
      "Asbestos testing for mortar and flue materials in pre-1980 chimneys",
      "Proper scaffolding setup with tie-offs to structural elements"
    ],
    wastePlan: [
      "Brick and masonry separated for recycling at Georgia concrete facilities",
      "Metal flashing and caps sent to scrap metal recycling",
      "Clean wood from interior surrounds chipped or disposed per Georgia guidelines",
      "Asbestos-containing materials disposed at licensed Georgia facilities",
      "Site fully cleaned of all masonry dust and small debris"
    ],
    prepChecklist: [
      "Clear area around fireplace interior and exterior chimney base",
      "Remove any items from the hearth and mantel area",
      "Provide attic access if chimney runs through attic space",
      "Move vehicles and outdoor furniture away from chimney work zone",
      "Notify neighbors of upcoming work and potential noise"
    ],
    diyRisks: [
      "Falling from roof height — chimney removal requires elevated work on scaffolding or roof",
      "Structural damage to home — improper removal can damage roof framing, walls, or foundation",
      "Masonry collapse — uncontrolled chimney demolition can send bricks crashing onto property",
      "Asbestos exposure — older chimneys commonly contain asbestos in mortar and flue liners",
      "Roof leaks — improper patching after removal causes water damage inside the home"
    ],
    whyChooseUs: [
      { title: "Georgia chimney removal experts", desc: "Experienced with historic brick chimneys in Savannah, Atlanta bungalows, and new construction chimney removals statewide." },
      { title: "Safe elevated work", desc: "Full scaffolding, fall protection, and controlled debris lowering — never uncontrolled demolition from height." },
      { title: "Historic district expertise", desc: "Familiar with Historic Preservation Commission requirements in Savannah, Atlanta, Augusta, and Macon historic districts." },
      { title: "Complete roof repair coordination", desc: "We properly patch and weatherproof the roof opening and coordinate with your roofer for final warranty repairs." }
    ]
  },

  concrete: {
    costFactors: [
      { factor: "Concrete thickness and reinforcement", detail: "Standard 4-inch residential slabs cost less than 6–8 inch reinforced commercial concrete. Rebar and wire mesh add removal complexity." },
      { factor: "Total area to remove", detail: "Larger areas benefit from efficiency but require more equipment and disposal volume." },
      { factor: "Access for equipment", detail: "Backyard concrete with limited access requires compact equipment. Front driveway slabs allow larger, faster machinery." },
      { factor: "Disposal and recycling", detail: "Distance to nearest Georgia concrete recycling facility affects transport costs." },
      { factor: "Adjacent structures to protect", detail: "Concrete attached to foundations, walls, or sidewalks requires precision saw-cutting to avoid damage." }
    ],
    typicalCostRange: "$3 – $8 per square foot for standard concrete removal in Georgia",
    timelinePhases: [
      { phase: "Assessment & preparation", duration: "1–2 days", detail: "Site evaluation, utility marking, equipment selection, and scheduling." },
      { phase: "Active removal", duration: "1–2 days", detail: "Saw-cutting edges, hydraulic breaking of concrete, loading debris for transport. Most residential slabs complete in one day." },
      { phase: "Cleanup & grading", duration: "1 day", detail: "Base material graded, debris transported to recycling facility, site swept clean." }
    ],
    equipment: [
      { category: "Breaking Equipment", items: ["Hydraulic breaker attachments for excavators", "Electric jackhammers for small areas", "Skid steer with breaker for medium slabs"] },
      { category: "Cutting Tools", items: ["Diamond blade concrete saws", "Walk-behind saws for large slabs", "Angle grinders for detail work"] },
      { category: "Loading & Transport", items: ["Skid steer loaders", "Mini-excavators", "Dump trucks for hauling to recycling facilities"] }
    ],
    safetyProtocols: [
      "Utility marking (Georgia 811) before any concrete cutting or breaking",
      "Dust suppression with water during saw-cutting and breaking operations",
      "Hearing protection for jackhammer and breaker operation",
      "Proper lifting techniques and mechanical assistance for heavy debris",
      "Site perimeter marking to protect adjacent structures and landscaping"
    ],
    wastePlan: [
      "All concrete transported to Georgia-certified concrete recycling facilities",
      "Rebar and wire mesh separated and sent to metal recycling",
      "Crushed concrete repurposed as road base aggregate",
      "Site swept clean of small debris and concrete dust",
      "Georgia EPD compliance for all construction waste disposal"
    ],
    prepChecklist: [
      "Mark any concrete sections you want to keep",
      "Remove furniture, planters, and items from the concrete area",
      "Ensure clear equipment access path to the work area",
      "Notify neighbors of upcoming noise from equipment",
      "Check for underground utilities before removal begins"
    ],
    diyRisks: [
      "Equipment cost — renting a jackhammer and dump trailer costs hundreds per day",
      "Physical strain — concrete removal is extremely labor-intensive",
      "Improper disposal — Georgia EPD prohibits concrete in regular landfills",
      "Utility strikes — buried gas, water, or electrical lines may be under concrete",
      "Incomplete removal — leftover concrete edges create trip hazards and drainage issues"
    ],
    whyChooseUs: [
      { title: "Georgia concrete recycling specialists", desc: "All removed concrete goes to certified Georgia recycling facilities — zero landfill concrete." },
      { title: "Right-sized equipment", desc: "We match equipment to every job, from electric jackhammers for small patios to excavator breakers for large driveways." },
      { title: "Clean saw-cutting", desc: "Precision diamond blade cutting creates straight edges when only partial concrete removal is needed." },
      { title: "Fast same-day service", desc: "Most residential concrete removal jobs completed same-day across Georgia." }
    ]
  },

  deck: {
    costFactors: [
      { factor: "Deck size and levels", detail: "Multi-level decks cost more due to additional structural complexity and debris volume." },
      { factor: "Material type", detail: "Pressure-treated lumber requires special disposal. Composite decking is lighter but may have different recycling options." },
      { factor: "Attachment method", detail: "Decks ledger-boarded to the house require careful separation to avoid siding and structural damage." },
      { factor: "Footing removal", detail: "Concrete footings buried 2–4 feet deep add excavation time and equipment needs." },
      { factor: "Access for equipment", detail: "Backyard decks with narrow side-yard access require compact equipment." }
    ],
    typicalCostRange: "$1,500 – $5,000 for standard deck removal in Georgia",
    timelinePhases: [
      { phase: "Assessment & prep", duration: "Same day", detail: "Evaluate deck structure, identify attachment points, plan dismantling sequence." },
      { phase: "Active removal", duration: "1 day", detail: "Remove railings and stairs, dismantle decking boards, remove joists and beams, separate ledger board from house." },
      { phase: "Footing removal & cleanup", duration: "0.5–1 day", detail: "Excavate and remove concrete footings, backfill holes, grade area, remove all debris." }
    ],
    equipment: [
      { category: "Demolition Tools", items: ["Reciprocating saws for precision cuts", "Pry bars and wrecking bars", "Impact drivers for fastener removal"] },
      { category: "Heavy Equipment", items: ["Mini-excavator for footing removal", "Skid steer for debris loading", "Dump trailer or truck for hauling"] },
      { category: "Safety Gear", items: ["Hard hats and safety glasses", "Cut-resistant gloves", "Steel-toe boots", "Dust masks for old wood handling"] }
    ],
    safetyProtocols: [
      "Structural stability assessment before any dismantling begins",
      "Careful ledger board separation to prevent house damage",
      "Proper lifting techniques and team lifting for heavy beams",
      "Nail and screw hazard awareness during dismantling",
      "Safe footing excavation with proper shoring if deep"
    ],
    wastePlan: [
      "Untreated lumber chipped for mulch or biomass where facilities exist",
      "Pressure-treated lumber disposed at permitted Georgia C&D landfills",
      "Metal fasteners, brackets, and hardware sent to scrap metal recycling",
      "Concrete footings transported to Georgia concrete recycling",
      "Composite decking sorted for specialized recycling where available"
    ],
    prepChecklist: [
      "Remove all furniture, grills, planters, and personal items from deck",
      "Clear access path to deck for equipment and debris removal",
      "Disconnect any electrical outlets or lighting on the deck",
      "Check HOA rules — some Georgia subdivisions require pre-approval for deck removal",
      "Notify neighbors of upcoming demolition noise"
    ],
    diyRisks: [
      "Structural collapse — partially dismantled decks can collapse unexpectedly",
      "Ledger board damage — improper removal damages house siding, sheathing, and waterproofing",
      "Nail injuries — hundreds of nails in a typical deck create puncture hazards",
      "Disposal costs — renting a dumpster for deck debris can cost $300–$500",
      "Concrete footing removal requires excavation equipment most homeowners don't have"
    ],
    whyChooseUs: [
      { title: "Complete deck removal — footings included", desc: "Unlike many contractors, we remove everything including buried concrete footings." },
      { title: "Careful house protection", desc: "Our crews are trained in precise ledger board separation to protect your home's exterior." },
      { title: "HOA-experienced", desc: "Familiar with Gwinnett, Forsyth, Cherokee, and other metro Atlanta county HOA requirements." },
      { title: "Eco-friendly disposal", desc: "We sort wood, metal, and concrete for maximum recycling and minimal landfill impact." }
    ]
  },

  garage: {
    costFactors: [
      { factor: "Attached vs. detached", detail: "Attached garages require careful shared-wall separation and exterior repair, adding cost compared to standalone garages." },
      { factor: "Construction material", detail: "Brick garages common in older Georgia neighborhoods cost more to demolish than wood-frame garages." },
      { factor: "Slab removal", detail: "Removing the concrete slab adds significant cost. Some projects leave the slab for the next structure." },
      { factor: "Utility disconnections", detail: "Garages with electrical service, gas lines, or plumbing require professional utility disconnection." },
      { factor: "Hazardous materials", detail: "Pre-1980 garages may contain asbestos in siding, roofing, or insulation." }
    ],
    typicalCostRange: "$2,500 – $8,000 for detached; $4,000 – $12,000 for attached garage demolition in Georgia",
    timelinePhases: [
      { phase: "Permitting & utilities", duration: "1–2 weeks", detail: "County permit filing, utility disconnection coordination, asbestos testing if applicable." },
      { phase: "Active demolition", duration: "1–2 days", detail: "Roof removal, wall dismantling, slab breaking if required. Attached garages take longer for shared-wall separation." },
      { phase: "Cleanup & site prep", duration: "1 day", detail: "Debris hauling, site grading, exterior wall repair for attached garages, erosion control installation." }
    ],
    equipment: [
      { category: "Heavy Machinery", items: ["Excavator for structural demolition", "Skid steer for debris loading", "Dump trucks for hauling"] },
      { category: "Precision Tools", items: ["Reciprocating saws for attached garage separation", "Concrete breaker for slab removal", "Hand tools for utility disconnection"] },
      { category: "Safety Equipment", items: ["Full PPE including hard hats and steel-toe boots", "Dust suppression spray system", "Site perimeter fencing for attached garage projects"] }
    ],
    safetyProtocols: [
      "Structural assessment of shared wall for attached garages",
      "Utility disconnection verification (Georgia Power, Atlanta Gas Light, water)",
      "Asbestos survey for pre-1980 structures",
      "Controlled demolition sequence from roof down to foundation",
      "Weatherproofing of exposed home wall for attached garage removal"
    ],
    wastePlan: [
      "Wood framing sorted for recycling or biomass where facilities available",
      "Metal roofing, tracks, and hardware sent to scrap recycling",
      "Concrete slab crushed and sent to Georgia recycling facilities",
      "Asphalt shingles taken to Georgia asphalt recycling facilities",
      "Non-recyclable materials transported to permitted Georgia C&D landfills"
    ],
    prepChecklist: [
      "Remove all stored items, vehicles, and equipment from garage",
      "Disconnect garage door opener and secure door",
      "Clear driveway and access path for heavy equipment",
      "Check HOA covenants — many Georgia HOAs have garage demolition restrictions",
      "Coordinate with insurance company if garage is attached to insured structure"
    ],
    diyRisks: [
      "Structural collapse — garage demolition is dangerous without proper sequencing",
      "Electrical hazards — overhead doors, openers, and garage wiring must be properly disconnected",
      "Asbestos exposure — older garage siding, roofing, and insulation may contain asbestos",
      "Heavy debris — garage materials weigh tons and require mechanical loading equipment",
      "Permit violations — most Georgia counties require demolition permits with potential fines for non-compliance"
    ],
    whyChooseUs: [
      { title: "Attached garage specialists", desc: "We've safely separated hundreds of attached garages across Georgia without damage to the main structure." },
      { title: "Complete permit management", desc: "We handle all county permits, EPD notifications, and utility disconnections for garage demolition." },
      { title: "Exterior restoration included", desc: "For attached garages, we weatherproof and finish the exposed home wall to match existing exterior." },
      { title: "Same-week demolition", desc: "Most garage demolitions begin within a week of estimate approval across Georgia." }
    ]
  },

  pool: {
    costFactors: [
      { factor: "Full removal vs. fill-in", detail: "Complete excavation and removal costs more than fill-in demolition but allows future construction on the site." },
      { factor: "Pool size and depth", detail: "Larger pools require more equipment time, backfill material, and disposal volume." },
      { factor: "Pool construction material", detail: "Concrete/gunite pools are heavier and cost more than fiberglass or vinyl liner pools to remove." },
      { factor: "Access for equipment", detail: "Backyard pools with narrow side-yard access require compact equipment and add time." },
      { factor: "Backfill material requirements", detail: "Clean engineered fill for full removal costs more than on-site fill for partial demolition." }
    ],
    typicalCostRange: "$5,000 – $15,000 for full pool removal; $3,000 – $8,000 for fill-in demolition in Georgia",
    timelinePhases: [
      { phase: "Draining & prep", duration: "1 day", detail: "Pool drained per Georgia EPD requirements, chemicals properly disposed, equipment disconnected." },
      { phase: "Active demolition", duration: "1–3 days", detail: "Pool shell broken with hydraulic breaker, concrete removed for full excavation or upper walls knocked down for fill-in." },
      { phase: "Backfill & grading", duration: "1–2 days", detail: "Clean fill placed in compacted lifts per Georgia building standards, site graded and seeded." }
    ],
    equipment: [
      { category: "Heavy Machinery", items: ["Excavator with hydraulic breaker for pool shell", "Skid steer for backfill and grading", "Dump trucks for debris and fill material"] },
      { category: "Specialized Tools", items: ["Submersible pump for pool draining", "Compaction equipment for backfill", "Laser level for final grading"] },
      { category: "Safety Equipment", items: ["Full PPE including waterproof gear", "Confined space equipment if applicable", "Dust suppression for concrete breaking"] }
    ],
    safetyProtocols: [
      "Proper chemical disposal per Georgia EPD water quality regulations",
      "Utility disconnection for pool pumps, heaters, and lighting",
      "Excavation safety including shoring for deep end removal",
      "Dust control during concrete demolition",
      "Site perimeter marking for family and pet safety during work"
    ],
    wastePlan: [
      "Pool chemicals properly disposed per Georgia EPD requirements",
      "Concrete shell transported to Georgia concrete recycling facilities",
      "Metal rebar and pool equipment sent to scrap metal recycling",
      "Clean fill material tested and placed in compacted lifts",
      "Final grading with erosion control per Georgia EPD standards"
    ],
    prepChecklist: [
      "Remove pool equipment, furniture, and accessories from pool area",
      "Provide access for pool draining equipment and pump truck",
      "Check with county about pool removal permit requirements",
      "Notify neighbors — pool removal generates significant noise",
      "Plan for post-removal landscaping or construction"
    ],
    diyRisks: [
      "Chemical exposure — pool chemicals must be properly neutralized before draining",
      "Heavy concrete — pool shells weigh tens of thousands of pounds",
      "Improper backfill — DIY fill-in often settles, creating sinkholes and drainage problems",
      "Permit requirements — most Georgia counties require demolition permits for pool removal",
      "Future construction restrictions — improper fill-in prevents building on the site later"
    ],
    whyChooseUs: [
      { title: "Complete pool removal — no future restrictions", desc: "Full excavation removes the entire pool structure so you can build anything on the site later." },
      { title: "Georgia EPD compliant", desc: "Proper chemical disposal, erosion control, and fill compaction per all state requirements." },
      { title: "Compaction documentation provided", desc: "We provide compaction testing certificates accepted by Georgia building departments and lenders." },
      { title: "Landscaping-ready finish", desc: "Site is graded, compacted, and seeded — ready for your next backyard project." }
    ]
  },

  home: {
    costFactors: [
      { factor: "Home size and construction", detail: "Square footage, number of stories, and construction type (wood frame vs. brick) are primary cost drivers in Georgia." },
      { factor: "Hazardous materials", detail: "Asbestos abatement for pre-1981 homes adds $2,000–$10,000+. Lead paint and mold remediation add additional costs." },
      { factor: "Foundation type", detail: "Basement foundations cost more to remove than slab or crawlspace foundations." },
      { factor: "Utility complexity", detail: "Multiple utility disconnections (gas, electric, water, sewer) add coordination time and cost." },
      { factor: "Site access and conditions", detail: "Tight urban lots in Atlanta vs. open rural sites affect equipment choice and efficiency." },
      { factor: "County permit requirements", detail: "Fulton, DeKalb, and Cobb counties have detailed requirements including pre-demolition inspections." }
    ],
    typicalCostRange: "$8,000 – $25,000 for standard single-family home demolition in Georgia",
    timelinePhases: [
      { phase: "Pre-demolition assessment & testing", duration: "1–2 weeks", detail: "Hazardous materials survey (asbestos, lead, mold), utility disconnection coordination, county permit filing, EPD notifications." },
      { phase: "Hazardous material abatement", duration: "2–5 days", detail: "Licensed asbestos and lead abatement contractors complete remediation before demolition begins." },
      { phase: "Active demolition", duration: "1–3 days", detail: "Systematic structure demolition using excavator, material sorting for recycling, foundation removal." },
      { phase: "Debris removal & grading", duration: "1–2 days", detail: "All debris hauled to appropriate facilities, site graded, erosion control installed per Georgia EPD." }
    ],
    equipment: [
      { category: "Primary Equipment", items: ["Full-size hydraulic excavator (20–30 ton)", "Hydraulic breaker and shear attachments", "Bulldozer for debris management"] },
      { category: "Support Equipment", items: ["Skid steer for tight access work", "Dump trucks for debris hauling", "Water truck for dust suppression"] },
      { category: "Safety Systems", items: ["Site perimeter fencing", "Dust suppression spray systems", "Air monitoring equipment when required"] }
    ],
    safetyProtocols: [
      "Pre-demolition hazardous materials survey required for all structures built before 1981",
      "Full utility disconnection verification (Georgia Power, Atlanta Gas Light, water, sewer)",
      "Site-specific safety plan with daily crew briefings",
      "Dedicated safety officer on site during active demolition",
      "Dust control plan per Georgia EPD Air Quality requirements",
      "Stormwater pollution prevention for sites over one acre"
    ],
    wastePlan: [
      "Wood framing sorted for recycling or biomass facilities",
      "Metal (pipes, ductwork, structural steel) sent to scrap recycling",
      "Concrete foundation and slabs crushed and recycled at Georgia facilities",
      "Asphalt shingles taken to Georgia asphalt recyclers",
      "Hazardous materials disposed at licensed Georgia facilities per EPD regulations",
      "Remaining non-recyclable debris transported to permitted C&D landfills"
    ],
    prepChecklist: [
      "Complete hazardous materials survey for pre-1981 homes",
      "Schedule utility disconnections with all service providers",
      "File demolition permit with county building department",
      "Notify Georgia EPD of demolition (asbestos notification if applicable)",
      "Remove all personal property and salvageable items",
      "Coordinate with insurance company regarding policy changes",
      "Notify neighbors of demolition schedule and temporary noise"
    ],
    diyRisks: [
      "Asbestos and lead exposure — pre-1981 Georgia homes commonly contain hazardous materials",
      "Structural collapse — improper demolition sequencing causes dangerous uncontrolled collapses",
      "Utility strikes — gas explosions, electrocution from cutting live lines",
      "Heavy equipment operation without training or licensing",
      "Environmental violations — Georgia EPD fines up to $25,000 per day for improper disposal",
      "Permit violations — Georgia counties issue stop-work orders and fines for unpermitted demolition"
    ],
    whyChooseUs: [
      { title: "Complete project management", desc: "From hazardous materials testing to final grading — we manage every aspect of your Georgia home demolition." },
      { title: "Georgia regulatory experts", desc: "We maintain active relationships with county building departments and Georgia EPD offices statewide." },
      { title: "Environmental responsibility", desc: "Maximum material recycling at Georgia-certified facilities. We divert as much as possible from landfills." },
      { title: "Licensed and fully insured", desc: "General liability, pollution liability, and workers' compensation coverage on every project." }
    ]
  },

  mobileHome: {
    costFactors: [
      { factor: "Home size (single vs. double-wide)", detail: "Double-wide mobile homes are larger with more structural elements to dismantle." },
      { factor: "Age and condition", detail: "Pre-1980 mobile homes almost always require asbestos testing and likely abatement, adding $2,000–$5,000+." },
      { factor: "Septic system capping", detail: "Proper septic tank capping per Georgia Department of Public Health requirements adds cost." },
      { factor: "Location and access", detail: "Remote rural Georgia properties with limited access require careful equipment planning." },
      { factor: "Pier and tie-down complexity", detail: "Number of foundation piers and tie-down straps affects removal time." }
    ],
    typicalCostRange: "$3,000 – $10,000 for standard mobile home removal in Georgia",
    timelinePhases: [
      { phase: "Assessment & testing", duration: "3–5 days", detail: "Asbestos testing for pre-1980 homes, utility disconnection, county permit filing." },
      { phase: "Active demolition", duration: "1–3 days", detail: "Skirting removal, systematic dismantling of structure, pier and foundation removal." },
      { phase: "Cleanup & grading", duration: "1 day", detail: "Debris removal, septic capping documentation, site grading, erosion control." }
    ],
    equipment: [
      { category: "Primary Equipment", items: ["Excavator for structural demolition", "Skid steer for debris management", "Dump trucks for material hauling"] },
      { category: "Specialized Tools", items: ["Reciprocating saws for precision dismantling", "Cutting torch for metal frame components", "Compaction equipment for backfill"] },
      { category: "Safety Equipment", items: ["Full PPE including respirators for potential asbestos", "Site perimeter marking", "Dust suppression system"] }
    ],
    safetyProtocols: [
      "Asbestos survey mandatory for all pre-1980 mobile homes per Georgia EPD",
      "Utility disconnection verification before any demolition",
      "Septic system identification and proper capping procedure",
      "Safe handling of fuel tanks (propane, oil) common in older mobile homes",
      "Controlled dismantling sequence to prevent structural collapse"
    ],
    wastePlan: [
      "Metal chassis and structural components sent to scrap metal recycling",
      "Clean wood sorted for recycling or appropriate disposal",
      "Asbestos-containing materials disposed at licensed Georgia facilities",
      "Concrete piers broken and sent to recycling facilities",
      "Site graded and erosion control installed per Georgia EPD"
    ],
    prepChecklist: [
      "Remove all personal belongings from mobile home",
      "Provide access for asbestos testing team",
      "Coordinate utility disconnection with providers",
      "Check county requirements for mobile home demolition permits",
      "Arrange for septic system capping with licensed contractor if needed",
      "Notify neighbors in rural Georgia communities"
    ],
    diyRisks: [
      "Asbestos exposure — pre-1980 mobile homes frequently contain asbestos in flooring, ceilings, and insulation",
      "Structural instability — mobile homes can shift or collapse during amateur dismantling",
      "Septic system damage — improper handling causes environmental contamination",
      "Heavy metal frame handling requires mechanical equipment",
      "Georgia EPD notification requirements apply even to mobile home demolition"
    ],
    whyChooseUs: [
      { title: "Rural Georgia specialists", desc: "Experienced with mobile home removal in every corner of Georgia, from Rabun County mountains to Camden County coast." },
      { title: "Complete asbestos management", desc: "We coordinate licensed testing and abatement so you never deal with hazardous materials directly." },
      { title: "Septic system coordination", desc: "We work with licensed Georgia septic contractors to properly cap or remove systems during demolition." },
      { title: "Farm and agricultural property experience", desc: "Familiar with rural Georgia access challenges — long driveways, soft ground, limited turnaround space." }
    ]
  },

  general: {
    costFactors: [
      { factor: "Project size and scope", detail: "Square footage, structural complexity, and number of elements to remove are primary cost drivers." },
      { factor: "Hazardous materials", detail: "Asbestos, lead paint, or mold adds testing and abatement costs before demolition can begin." },
      { factor: "Site access", detail: "Tight urban lots, hillside properties, or remote rural locations affect equipment choice and project duration." },
      { factor: "Disposal requirements", detail: "Distance to recycling facilities and landfills, material sorting requirements, and Georgia EPD compliance." },
      { factor: "Permit complexity", detail: "County-specific requirements — metro Atlanta counties have stricter rules than rural Georgia." }
    ],
    typicalCostRange: "Varies by project — free on-site estimate provided for all Georgia demolition projects",
    timelinePhases: [
      { phase: "Assessment & planning", duration: "1–2 weeks", detail: "On-site evaluation, permit research, utility coordination, and detailed project planning." },
      { phase: "Active work", duration: "1–5 days", detail: "Professional execution using appropriate equipment with safety oversight on every project." },
      { phase: "Cleanup & completion", duration: "1–2 days", detail: "Debris removal, recycling, site grading, and final inspection per Georgia standards." }
    ],
    equipment: [
      { category: "Heavy Machinery", items: ["Excavators with various attachments", "Skid steers for tight access", "Dump trucks for debris hauling"] },
      { category: "Precision Tools", items: ["Concrete saws and breakers", "Jackhammers for targeted work", "Hand tools for detail demolition"] },
      { category: "Safety Equipment", items: ["Full PPE for all crew members", "Dust suppression systems", "Site perimeter safety barriers"] }
    ],
    safetyProtocols: [
      "Pre-project safety assessment and site-specific safety plan",
      "Daily crew safety briefings before work begins",
      "Full OSHA compliance on every Georgia job site",
      "Utility verification before any demolition activity",
      "Environmental protection measures per Georgia EPD requirements"
    ],
    wastePlan: [
      "Material sorting for maximum recycling at Georgia-certified facilities",
      "Concrete and masonry sent to recycling facilities for aggregate production",
      "Metals separated for scrap recycling",
      "Hazardous materials handled per Georgia EPD regulations",
      "Site cleaned and graded to project specifications"
    ],
    prepChecklist: [
      "Remove personal items from the work area",
      "Provide clear access for equipment and crew",
      "Coordinate utility disconnection dates",
      "Check HOA requirements if applicable",
      "Notify neighbors of upcoming work schedule"
    ],
    diyRisks: [
      "Safety hazards — demolition is one of the most dangerous construction activities",
      "Regulatory violations — Georgia has strict rules about demolition permits and disposal",
      "Equipment costs — renting proper demolition equipment is expensive without experience",
      "Hidden hazards — asbestos, lead, and structural instability are common in older Georgia structures",
      "Improper disposal can result in Georgia EPD fines"
    ],
    whyChooseUs: [
      { title: "Licensed Georgia demolition contractors", desc: "Fully licensed and insured for all types of demolition across all 159 Georgia counties." },
      { title: "Free on-site estimates", desc: "No-obligation estimates with transparent pricing — no hidden fees or surprises." },
      { title: "Permit management included", desc: "We handle all county permits, EPD notifications, and utility coordination." },
      { title: "Environmental responsibility", desc: "Maximum recycling and proper disposal per Georgia environmental regulations." }
    ]
  }
};

export function getContentForService(serviceSlug: string): ServiceContentSections {
  return commonContent[serviceSlug] || commonContent['general'];
}
