export const site = {
  name: 'Georgia Demolition & Removal',
  tagline: "Safe, Fast & Reliable Demolition Across Georgia",
  legalName: 'Georgia Demolition & Removal LLC',
  url: 'https://georgiademolitionandremoval.com',
  address: {
    city: 'Atlanta',
    state: 'GA',
  },
  serviceArea: 'Serving all 159 Georgia counties statewide',
  phone: '(843) 241-0787',
  phoneRaw: '8432410787',
  email: 'contact@georgiademolitionandremoval.com',
  openingHoursSpecification: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '18:00' },
    { dayOfWeek: ['Saturday'], opens: '08:00', closes: '16:00' }
  ],
  priceRange: '$$',
  description: 'Licensed and insured demolition contractors serving all 159 Georgia counties. Residential, commercial, industrial, and specialized demolition services.',

  // -- Verification & Analytics (fill in your IDs to activate) --
  gtmId: '',
  ga4Id: '',
  googleVerification: '',
  bingVerification: '',

  googleMapsEmbedKey: import.meta.env.PUBLIC_GOOGLE_MAPS_EMBED_KEY || '',
  aggregateRating: {
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1'
  }
};
