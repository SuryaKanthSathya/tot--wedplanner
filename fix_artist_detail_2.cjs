const fs = require('fs');

let content = fs.readFileSync('src/components/ArtistDetailPage.tsx', 'utf-8');

// Replace portfolio images
content = content.replace(/'https:\/\/images\.unsplash\.com\/photo-1522337360788-8b13dee7a37e[^']*'/g, "'/images/mehendi/mehendi_arabic_style_1786617685166.jpg'");
content = content.replace(/'https:\/\/images\.unsplash\.com\/photo-1512496015851-a90fb38ba796[^']*'/g, "'/images/mehendi/mehendi_intricate_palms_1786617718285.jpg'");
content = content.replace(/'https:\/\/images\.unsplash\.com\/photo-1516975080664-ed2fc6a32937[^']*'/g, "'/images/mehendi/mehendi_jewelry_bangles_1786617751591.jpg'");
content = content.replace(/'https:\/\/images\.unsplash\.com\/photo-1596704017254-9b121068fb31[^']*'/g, "'/images/mehendi/mehendi_modern_minimalist_1786617671026.jpg'");
content = content.replace(/'https:\/\/images\.unsplash\.com\/photo-1487412720507-e7ab37603c6f[^']*'/g, "'/images/mehendi/mehendi_traditional_feet_1786617653822.jpg'");

// Replace Packages
content = content.replace(
  /South Indian Muhurtham Package/g,
  'Bridal Mehendi Package'
);
content = content.replace(
  /'HD \/ Airbrush Long-lasting Base',/g,
  "'Organic Homemade Henna Paste',"
);
content = content.replace(
  /'Traditional Poola-Jada Hair Braiding with Fresh Flowers',/g,
  "'Intricate Bridal Hand & Foot Designs',"
);
content = content.replace(
  /'Precision Saree Iron-Pleating & Draping',/g,
  "'Custom Figures (Bride & Groom Portraits)',"
);
content = content.replace(
  /'Lash Application & Custom Lip Blend',/g,
  "'Long-lasting Deep Dark Stain Guarantee',"
);
content = content.replace(
  /'Complimentary Touch-up Kit for Mandap',/g,
  "'Pre-wedding Mehndi Care Guide Included',"
);
content = content.replace(
  /Grand Reception Glamour/g,
  'Guest & Family Mehendi Package'
);
content = content.replace(
  /'Sweatproof Airbrush Contour & Body Glow',/g,
  "'Mehendi for up to 10 Bridesmaids/Family',"
);
content = content.replace(
  /'High-fashion Hair Styling & Extensions',/g,
  "'Arabic or Indian Minimalist Designs',"
);
content = content.replace(
  /'Luxury Eye Art & Swarovski Rhinestone Accents',/g,
  "'Fast Application by Assistant Artists',"
);
content = content.replace(
  /100% Authentic Luxury & High-Definition Cosmetics Used/g,
  '100% Organic Henna with Natural Essential Oils for Dark, Long-Lasting Stains'
);
content = content.replace(
  /COSMETIC BRANDS/g,
  'DESIGN STYLES & MOTIFS'
);
content = content.replace(
  /Cosmetic Brands/g,
  'Design Styles'
);
content = content.replace(
  /brands/g,
  'designs'
);
// In case 'designs' was double replaced
content = content.replace(/designsGrid/g, 'brandsGrid');
content = content.replace(/designsContainer/g, 'brandsContainer');

fs.writeFileSync('src/components/ArtistDetailPage.tsx', content);
console.log('Fully replaced all makeup images and packages in Mehendi Details page');
