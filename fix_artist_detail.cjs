const fs = require('fs');

let content = fs.readFileSync('src/components/ArtistDetailPage.tsx', 'utf-8');

// Replace highlights
content = content.replace(/Trial Session Available/g, 'Organic Homemade Henna');
content = content.replace(/100% Sanitized Tools/g, 'Deep Dark Stain Guarantee');
content = content.replace(/On-Venue Travel \(Pan-TN\)/g, 'Custom Bridal Motifs (Figures, Peacocks)');
content = content.replace(/Hair Extensions & Saree Draping/g, 'Guest Mehendi Included in Packages');
content = content.replace(/<Scissors[^>]*\/>/g, '<Palette className="w-3.5 h-3.5 text-[#581420] mr-1.5" />');

// Replace description
content = content.replace(
  /Renowned for flawless HD airbrush finishes, sweatproof long-wearing cosmetics, and artistic traditional South Indian bridal transformations\./g,
  'Specializes in intricate, highly detailed bridal mehendi with flawless symmetry, traditional motifs, and modern aesthetic designs using 100% organic, chemical-free henna.'
);

// Replace tabs
content = content.replace(/Bridal Look Portfolio/g, 'Mehendi Portfolio');
content = content.replace(/activeTab === 'brands'/g, "activeTab === 'designs'");
content = content.replace(/setActiveTab\('brands'\)/g, "setActiveTab('designs')");
content = content.replace(/Premium Cosmetics & Tools/g, 'Design Styles & Motifs');

// Replace Brands tab content -> Designs tab content
content = content.replace(
  /activeTab === 'brands' && \(/g,
  `activeTab === 'designs' && (`
);

content = content.replace(
  /<Text style=\{styles\.tabSectionTitle\}>Premium Brands Used<\/Text>/g,
  `<Text style={styles.tabSectionTitle}>Design Styles Offered</Text>`
);
content = content.replace(
  /MAC, Huda Beauty, Bobbi Brown, NARS, Charlotte Tilbury/g,
  'Traditional Indian, Arabic, Indo-Arabic, Mandala, Floral, Minimalist'
);
content = content.replace(
  /High-end, authentic products ensuring a long-lasting and flawless finish\./g,
  'We create custom patterns based on your wedding theme, using 100% organic henna for a deep red, long-lasting stain.'
);

// Replace portfolio images to Mehendi (already imported as images?)
// Let's use the local Mehendi images for portfolio grid!
content = content.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?auto=format&fit=crop&q=80/g, (match, offset) => {
  // We'll use our new mehendi images
  return `'/images/mehendi/mehendi_floral_design_1786617638464.jpg'`;
});

// Since the previous regex might be too generic, we can just let it be, but I want to ensure the images in the portfolio are actually mehendi images!
const mehendiImages = [
  '/images/mehendi/mehendi_arabic_style_1786617685166.jpg',
  '/images/mehendi/mehendi_bridal_hands_1786616994272.jpg',
  '/images/mehendi/mehendi_intricate_palms_1786617718285.jpg',
  '/images/mehendi/mehendi_jewelry_bangles_1786617751591.jpg'
];
let imgIndex = 0;
content = content.replace(/uri:\s*'https:\/\/images\.unsplash\.com[^']+'/g, (match) => {
  const replacement = `uri: '${mehendiImages[imgIndex % mehendiImages.length]}'`;
  imgIndex++;
  return replacement;
});

// Fix Palette import
if (!content.includes('Palette')) {
  content = content.replace(/CheckCircle2,/, 'CheckCircle2, Palette,');
}

fs.writeFileSync('src/components/ArtistDetailPage.tsx', content);
console.log('Fixed Artist Detail page content to be Mehendi specific');
