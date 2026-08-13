const fs = require('fs');

const mehendiImages = [
  'https://images.unsplash.com/photo-1598371342674-325dbb2611e8?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1601314167099-232775bbfa81?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1582298910086-6df7bf31fb93?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1579737190011-30db76cfab4a?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1599587399879-114d59a22cc3?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1581454556488-8744b82d3380?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1621217030800-410a5bfcc0e6?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600888206144-8848db92762d?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1558296316-291129b68a41?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1603512398402-995f51950e30?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1587397940177-3e11f185dfdc?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1595166418703-a1f734ef4c09?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1515598686-2f08573fc0be?auto=format&fit=crop&q=80'
];

let content = fs.readFileSync('src/components/MehendiListingPage.tsx', 'utf-8');

let index = 0;
content = content.replace(/image:\s*'https:\/\/images\.unsplash\.com\/[^']+'/g, () => {
  const replacement = `image: '${mehendiImages[index % mehendiImages.length]}'`;
  index++;
  return replacement;
});

fs.writeFileSync('src/components/MehendiListingPage.tsx', content);
console.log('Replaced images with Mehendi images');
