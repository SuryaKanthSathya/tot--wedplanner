const fs = require('fs');
let content = fs.readFileSync('src/components/PhotographyListingPage.tsx', 'utf-8');

// Replace standard terms
content = content.replace(/PhotographyListingPage/g, 'MehendiListingPage');
content = content.replace(/PhotographyStudio/g, 'MehendiArtist');
content = content.replace(/STUDIOS_DATA/g, 'MEHENDI_DATA');
content = content.replace(/savedStudioIds/g, 'savedMehendiIds');
content = content.replace(/onToggleSavedStudio/g, 'onToggleSavedMehendi');
content = content.replace(/Photography/g, 'Mehendi');
content = content.replace(/photography/g, 'mehendi');
content = content.replace(/studio/g, 'artist');
content = content.replace(/Studio/g, 'Artist');
content = content.replace(/Camera/g, 'Flower2'); // Mehendi icon

const images = [
  'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80'
];

const mehendiArtists = [
  { name: 'Henna by Arohi', category: 'Bridal Mehandi Specialist', price: 25000, tier: 'Signature', rating: 4.9, reviews: 320 },
  { name: 'Mehandi Magic', category: 'Bridal Mehandi Artist', price: 18000, tier: 'Premium', rating: 4.8, reviews: 210 },
  { name: 'Shagun Mehandi Art', category: 'Traditional Mehandi Artist', price: 12000, tier: 'Essential', rating: 4.7, reviews: 186 },
  { name: 'Riwaaz Mehandi', category: 'Bridal & Party Mehandi', price: 11000, tier: 'Essential', rating: 4.6, reviews: 142 },
  { name: 'Mehandi by Noor', category: 'Bridal Mehandi Specialist', price: 20000, tier: 'Premium', rating: 4.5, reviews: 109 },
  { name: 'Mehandi Artist Komal', category: 'Luxury Bridal Mehandi', price: 28000, tier: 'Signature', rating: 4.5, reviews: 98 },
  { name: 'Bridal Henna Co.', category: 'Organic Henna Specialist', price: 22000, tier: 'Premium', rating: 4.8, reviews: 120 },
  { name: 'Divine Henna', category: 'Arabic & Indian Designs', price: 15000, tier: 'Essential', rating: 4.4, reviews: 85 },
  { name: 'The Henna Story', category: 'Custom Story Henna', price: 30000, tier: 'Signature', rating: 4.9, reviews: 150 },
  { name: 'Elegant Strokes', category: 'Minimalist & Modern', price: 17000, tier: 'Premium', rating: 4.7, reviews: 230 },
  { name: 'Classic Mehandi', category: 'Traditional Rajasthani', price: 13000, tier: 'Essential', rating: 4.2, reviews: 75 },
  { name: 'Henna Artistry', category: 'Intricate Bridal Designs', price: 24000, tier: 'Premium', rating: 4.6, reviews: 190 },
  { name: 'Beautiful Hands', category: 'Quick & Neat Designs', price: 10000, tier: 'Essential', rating: 4.5, reviews: 140 },
  { name: 'Royal Henna Studio', category: 'Luxury Organic Henna', price: 35000, tier: 'Signature', rating: 4.9, reviews: 165 },
  { name: 'Mehandi by Pooja', category: 'Bridal Portrait Henna', price: 27000, tier: 'Signature', rating: 4.8, reviews: 210 }
];

let dataStr = 'export const MEHENDI_DATA: MehendiArtist[] = [\n';
mehendiArtists.forEach((a, i) => {
  let p = a.price.toString();
  if (p.length > 5) p = p.substring(0, 1) + ',' + p.substring(1, 3) + ',' + p.substring(3);
  else p = p.substring(0, 2) + ',' + p.substring(2);
  const priceStr = '₹' + p + ' onwards';
  dataStr += `  {
    id: 'artist-${i + 1}',
    name: '${a.name}',
    rating: ${a.rating},
    reviewsCount: ${a.reviews},
    location: 'Mumbai',
    category: '${a.category}',
    startingPrice: '${priceStr}',
    priceValue: ${a.price},
    tier: '${a.tier}',
    image: '${images[i]}',
    description: 'Expert mehendi artist delivering the best ${a.category} experience.',
    experience: '5+ Years Experience',
    phone: '+91 98765 43210'
  },\n`;
});
dataStr += '];\n';

const parts = content.split(/export const MEHENDI_DATA: MehendiArtist\[\] = \[/);
if (parts.length === 2) {
  const parts2 = parts[1].split(/export interface MehendiListingPageProps/);
  content = parts[0] + dataStr + '\nexport interface MehendiListingPageProps' + parts2[1];
}

// Make sure we have the Flower2 icon imported
if (!content.includes('Flower2,')) {
  content = content.replace('Heart,', 'Heart, Flower2,');
}

fs.writeFileSync('src/components/MehendiListingPage.tsx', content);
