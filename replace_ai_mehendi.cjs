const fs = require('fs');

const images = [
  '/images/mehendi/mehendi_arabic_style_1786617685166.jpg',
  '/images/mehendi/mehendi_artist_applying_1786617553765.jpg',
  '/images/mehendi/mehendi_bridal_hands_1786616994272.jpg',
  '/images/mehendi/mehendi_bridal_portrait_1786617928334.jpg',
  '/images/mehendi/mehendi_cone_application_1786617733536.jpg',
  '/images/mehendi/mehendi_floral_design_1786617638464.jpg',
  '/images/mehendi/mehendi_intricate_palms_1786617718285.jpg',
  '/images/mehendi/mehendi_jewelry_bangles_1786617751591.jpg',
  '/images/mehendi/mehendi_mandala_design_1786617958168.jpg',
  '/images/mehendi/mehendi_modern_minimalist_1786617671026.jpg',
  '/images/mehendi/mehendi_peacock_motif_1786617762239.jpg',
  '/images/mehendi/mehendi_traditional_feet_1786617653822.jpg',
  '/images/mehendi/mehendi_wedding_celebration_1786617700517.jpg'
];

let content = fs.readFileSync('src/components/MehendiListingPage.tsx', 'utf-8');

let index = 0;
// Replace loremflickr links
content = content.replace(/image:\s*'https:\/\/loremflickr\.com\/[^']+'/g, () => {
  const replacement = `image: '${images[index % images.length]}'`;
  index++;
  return replacement;
});

fs.writeFileSync('src/components/MehendiListingPage.tsx', content);
console.log('Replaced images with stunning 4k AI generated local images');
