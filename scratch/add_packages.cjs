const fs = require('fs');

function appendToFile(filename, contentToAppend) {
    let content = fs.readFileSync(filename, 'utf-8');
    const exportRegex = /(export const [A-Z_]+(?:\s*:\s*[A-Za-z]+\[\])? = \[)/;
    if (content.match(exportRegex)) {
        content = content.replace(exportRegex, `$1\n${contentToAppend}`);
        fs.writeFileSync(filename, content);
        console.log(`Updated ${filename}`);
    } else {
        console.log(`Could not find array in ${filename}`);
    }
}

// 1. Photography
appendToFile('src/components/PhotographyListingPage.tsx', `  {
    id: 'pkg_photo_1',
    name: 'Moments Studio',
    category: 'Cinematic & Candid Photography',
    city: 'All Cities',
    location: 'Destination Weddings',
    rating: 4.9,
    reviewsCount: 312,
    startingPrice: '₹1,50,000 onwards',
    priceValue: 150000,
    deliveryTime: '3-4 Weeks',
    image: '/src/assets/images/hindu_couple_arch_1786467605789.jpg',
    description: 'Award-winning team specializing in candid moments and cinematic wedding films.',
    experience: '8+ Years',
    teamSize: '5-8 Professionals',
    equipment: 'Sony A7S III, RED Cinema Cameras',
    services: ['Candid Photography', 'Traditional', 'Cinematic Video', 'Pre-Wedding'],
  },`);

// 2. Makeup
appendToFile('src/components/MakeupListingPage.tsx', `  {
    id: 'pkg_makeup_1',
    name: 'Glow Studio',
    category: 'Premium Bridal Makeup',
    city: 'All Cities',
    location: 'Destination Weddings',
    rating: 4.8,
    reviewsCount: 198,
    startingPrice: '₹30,000 onwards',
    priceValue: 30000,
    services: ['Airbrush Makeup', 'HD Makeup', 'Hairstyling', 'Draping'],
    brands: ['MAC', 'Huda Beauty', 'Bobbi Brown', 'Charlotte Tilbury'],
    image: '/src/assets/images/pastel_reception_stage.jpg',
    description: 'Expert bridal makeup artists for a flawless, long-lasting look.',
    experience: '6+ Years',
    studioLocation: 'Available Worldwide',
    trialAvailable: 'Paid Trial Available',
  },`);

// 3. Decor
appendToFile('src/components/DecorListingPage.tsx', `  {
    id: 'pkg_decor_1',
    name: 'Dream Designs',
    category: 'Thematic Floral & Stage Decor',
    city: 'All Cities',
    location: 'Destination Weddings',
    rating: 4.9,
    reviewsCount: 245,
    startingPrice: '₹2,00,000 onwards',
    priceValue: 200000,
    coreSpecialty: 'Floral & Mandap Decor',
    image: '/src/assets/images/royal_mandap_decor.jpg',
    description: 'Bespoke floral arrangements and thematic styling for your big day.',
    experience: '10+ Years',
    teamSize: '20+ Decorators',
    designProcess: '3D Mockups, Concept Sketches',
    services: ['Mandap Decor', 'Floral Art', 'Lighting', 'Stage Setup'],
  },`);

// 4. Catering
appendToFile('src/components/CateringListingPage.tsx', `  {
    id: 'pkg_catering_1',
    name: 'Flavors Catering',
    category: 'Premium Multi-Cuisine Catering',
    city: 'All Cities',
    location: 'Destination Weddings',
    rating: 4.8,
    reviewsCount: 420,
    startingPrice: '₹800 per plate',
    priceValue: 800,
    cuisineSpecialty: 'South Indian & Multi-Cuisine',
    image: '/src/assets/images/white_banquet_illustration_1786471427275.jpg',
    description: 'A curated multi-cuisine feast prepared by top chefs.',
    experience: '15+ Years',
    capacity: '100-2000 Guests',
    foodTypes: 'Pure Veg & Non-Veg',
    services: ['Live Counters', 'Dessert Bars', 'Waitstaff', 'Crockery'],
  },`);

// 5. DJ & Music (Entertainment)
appendToFile('src/components/constants/EntertainmentData.tsx', `  {
    id: 'pkg_ent_1',
    name: 'Rhythm Entertainment',
    category: 'DJ & Live Bands',
    city: 'All Cities',
    location: 'Destination Weddings',
    rating: 4.8,
    reviewsCount: 156,
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    performanceTime: '3-4 Hours',
    image: '/src/assets/images/sangeet_stage_decor.jpg',
    description: 'Top-tier DJs and live bands to keep your guests dancing all night.',
    experience: '5+ Years',
    teamSize: '3-5 Performers',
    equipment: 'Professional Audio & Lighting',
    services: ['DJ', 'Live Band', 'MC/Host', 'Sound Setup'],
  },`);

// 6. Invitations
appendToFile('src/components/InvitationListingPage.tsx', `  {
    id: 'pkg_inv_1',
    name: 'Paper & Peonies',
    category: 'Custom Digital & Physical Invites',
    city: 'All Cities',
    location: 'Worldwide Delivery',
    rating: 4.9,
    reviewsCount: 289,
    startingPrice: '₹15,000 onwards',
    priceValue: 15000,
    turnaroundTime: '1-2 Weeks',
    image: '/src/assets/images/hindu_couple_arch_1786467605789.jpg',
    description: 'Custom designed, eco-friendly digital and physical invitations.',
    experience: '7+ Years',
    minimumOrder: '50 Invites',
    printingTypes: 'Foil Stamping, Letterpress, Digital',
    services: ['Digital Invites', 'Boxed Invites', 'E-Invites', 'Save the Date'],
  },`);

