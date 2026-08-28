export const site = {
  name: 'Georgia Demolition & Removal',
  tagline: "Safe, Fast & Reliable Demolition Across Georgia",
  legalName: 'Georgia Demolition & Removal LLC',
  url: 'https://georgiademolitionandremoval.com',
  address: {
    street: '100 Peachtree St NW',
    city: 'Atlanta',
    state: 'GA',
    zip: '30303',
    geo: { lat: 33.7595, lng: -84.3871 }
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
  description: 'Licensed and insured demolition contractors serving 576 Georgia cities, towns, and communities. Residential, commercial, industrial, and specialized demolition services.',

  // -- Verification & Analytics (fill in your IDs to activate) --
  gtmId: 'GTM-M27HJLC5',
  ga4Id: 'G-EV30N2T3BG',
  googleVerification: '',
  bingVerification: '',

  googleMapsEmbedKey: import.meta.env.PUBLIC_GOOGLE_MAPS_EMBED_KEY ?? '',
  resendApiKey: import.meta.env.RESEND_API_KEY ?? '',
  aggregateRating: {
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1'
  }
};
