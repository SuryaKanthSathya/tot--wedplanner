const fs = require('fs');
let content = fs.readFileSync('src/components/PhotographyListingPage.tsx', 'utf-8');

// Replacements
content = content.replace(/PhotographyListingPage/g, 'CateringListingPage');
content = content.replace(/PhotographyStudio/g, 'CateringVendor');
content = content.replace(/STUDIOS_DATA/g, 'CATERING_DATA');
content = content.replace(/savedStudioIds/g, 'savedCateringIds');
content = content.replace(/onToggleSavedStudio/g, 'onToggleSavedCatering');
content = content.replace(/Photography/g, 'Catering');
content = content.replace(/photography/g, 'catering');
content = content.replace(/studio/g, 'caterer');
content = content.replace(/Studio/g, 'Caterer');
content = content.replace(/Camera/g, 'Utensils');

// Generate 20 catering companies
const caterers = [
  { name: 'Sri Amirtham Catering', category: 'Pure Veg & Multi Cuisine', price: 110000, tier: 'Signature', rating: 4.8, reviews: 156 },
  { name: 'A2B Catering', category: 'South Indian Specialist', price: 90000, tier: 'Premium', rating: 4.7, reviews: 210 },
  { name: 'Foodies Delight', category: 'Veg & Non Veg', price: 70000, tier: 'Essential', rating: 4.6, reviews: 182 },
  { name: 'Grand Feast Caterers', category: 'Multi Cuisine Catering', price: 75000, tier: 'Essential', rating: 4.6, reviews: 145 },
  { name: 'Namma Veetu Sapadu', category: 'Traditional South Indian', price: 85000, tier: 'Premium', rating: 4.5, reviews: 98 },
  { name: 'The Banquet Co.', category: 'Luxury Catering Service', price: 125000, tier: 'Signature', rating: 4.5, reviews: 112 },
  { name: 'Royal Bites', category: 'North Indian & Mughlai', price: 100000, tier: 'Signature', rating: 4.8, reviews: 120 },
  { name: 'Classic Caterers', category: 'Authentic South Indian', price: 80000, tier: 'Premium', rating: 4.4, reviews: 85 },
  { name: 'Spice Route', category: 'Chettinad Special', price: 65000, tier: 'Essential', rating: 4.3, reviews: 150 },
  { name: 'Taste Makers', category: 'Continental & Asian', price: 115000, tier: 'Signature', rating: 4.9, reviews: 230 },
  { name: 'Chennai Kitchen', category: 'Local Favorites', price: 60000, tier: 'Essential', rating: 4.2, reviews: 75 },
  { name: 'Mahaabali Foods', category: 'Grand Buffet Sets', price: 95000, tier: 'Premium', rating: 4.6, reviews: 190 },
  { name: 'Veg Paradise', category: 'Pure Vegetarian Only', price: 75000, tier: 'Essential', rating: 4.5, reviews: 140 },
  { name: 'Desi Flavors', category: 'Pan Indian Cuisine', price: 85000, tier: 'Premium', rating: 4.7, reviews: 165 },
  { name: 'Gourmet Gatherings', category: 'Bespoke Menus', price: 130000, tier: 'Signature', rating: 4.9, reviews: 210 },
  { name: 'Aroma Kitchen', category: 'Biryani Specialists', price: 70000, tier: 'Essential', rating: 4.4, reviews: 110 },
  { name: 'Elite Catering', category: 'High-end Dining', price: 120000, tier: 'Signature', rating: 4.8, reviews: 185 },
  { name: 'Family Feast', category: 'Homestyle Cooking', price: 65000, tier: 'Essential', rating: 4.3, reviews: 90 },
  { name: 'Saffron Spice', category: 'Rich Indian Flavors', price: 90000, tier: 'Premium', rating: 4.6, reviews: 135 },
  { name: 'Global Palate', category: 'International Cuisine', price: 105000, tier: 'Signature', rating: 4.7, reviews: 175 }
];

let dataStr = 'export const CATERING_DATA: CateringVendor[] = [\n';
caterers.forEach((c, i) => {
  let p = c.price.toString();
  if (p.length > 5) p = p.substring(0, 1) + ',' + p.substring(1, 3) + ',' + p.substring(3);
  else p = p.substring(0, 2) + ',' + p.substring(2);
  const priceStr = '₹' + p + ' onwards';
  dataStr += `  {
    id: 'caterer-${i + 1}',
    name: '${c.name}',
    rating: ${c.rating},
    reviewsCount: ${c.reviews},
    location: 'Chennai',
    category: '${c.category}',
    startingPrice: '${priceStr}',
    priceValue: ${c.price},
    tier: '${c.tier}',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best ${c.category} experience.',
    experience: '5+ Years Experience',
    phone: '+91 98765 43210'
  },\n`;
});
dataStr += '];\n';

const parts = content.split(/export const CATERING_DATA: CateringVendor\[\] = \[/);
if (parts.length === 2) {
  const parts2 = parts[1].split(/export interface CateringListingPageProps/);
  content = parts[0] + dataStr + '\nexport interface CateringListingPageProps' + parts2[1];
}

// Ensure icon is imported
if (!content.includes('Utensils')) {
  content = content.replace('Heart,', 'Heart, Utensils,');
}

fs.writeFileSync('src/components/CateringListingPage.tsx', content);
console.log('Created CateringListingPage.tsx');
