const fs = require('fs');

let content = fs.readFileSync('src/components/MehendiListingPage.tsx', 'utf-8');

let index = 1;
content = content.replace(/image:\s*'[^']+'/g, (match) => {
  const replacement = `image: 'https://loremflickr.com/400/400/henna,mehendi,wedding?lock=${index}'`;
  index++;
  return replacement;
});

fs.writeFileSync('src/components/MehendiListingPage.tsx', content);
console.log('Replaced images with LoremFlickr images');
