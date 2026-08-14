const fs = require('fs');
let content = fs.readFileSync('src/components/RequestQuoteModal.tsx', 'utf-8');

if (!content.includes('const isCatering = catLower ===')) {
  content = content.replace(
    /const isMakeup = catLower === 'makeup';/,
    "const isMakeup = catLower === 'makeup';\n  const isCatering = catLower === 'catering';"
  );
}

// Add catering to servicesList
content = content.replace(
  /const servicesList = isCars \? CARS_SERVICES : isEntertainment \? ENTERTAINMENT_SERVICES : isDecor \? DECOR_SERVICES : isMakeup \? MAKEUP_SERVICES : PHOTOGRAPHY_SERVICES;/,
  "const servicesList = isCars ? CARS_SERVICES : isEntertainment ? ENTERTAINMENT_SERVICES : isDecor ? DECOR_SERVICES : isMakeup ? MAKEUP_SERVICES : isCatering ? CATERING_SERVICES : PHOTOGRAPHY_SERVICES;"
);

// Add catering to budgetList
content = content.replace(
  /const budgetList = isCars \? CARS_BUDGET_RANGES : isEntertainment \? ENTERTAINMENT_BUDGET_RANGES : isDecor \? DECOR_BUDGET_RANGES : isMakeup \? MAKEUP_BUDGET_RANGES : PHOTOGRAPHY_BUDGET_RANGES;/,
  "const budgetList = isCars ? CARS_BUDGET_RANGES : isEntertainment ? ENTERTAINMENT_BUDGET_RANGES : isDecor ? DECOR_BUDGET_RANGES : isMakeup ? MAKEUP_BUDGET_RANGES : isCatering ? CATERING_BUDGET_RANGES : PHOTOGRAPHY_BUDGET_RANGES;"
);

// Ensure CATERING_SERVICES and CATERING_BUDGET_RANGES are imported/defined if they were removed
if (!content.includes('const CATERING_SERVICES = [')) {
  content = content.replace(
    /const MAKEUP_SERVICES = \[/,
    `const CATERING_SERVICES = [
  'South Indian Traditional Feast',
  'North Indian Cuisine',
  'Live Chat & Snack Counters',
  'Dessert & Ice Cream Stations',
  'High Tea & Savories',
  'Continental & Asian Buffet',
];

const MAKEUP_SERVICES = [`
  );
}

if (!content.includes('const CATERING_BUDGET_RANGES = [')) {
  content = content.replace(
    /const MAKEUP_BUDGET_RANGES = \[/,
    `const CATERING_BUDGET_RANGES = [
  'Under ₹50,000',
  '₹50,000 - ₹1,50,000',
  '₹1,50,000 - ₹3,00,000',
  '₹3,00,000+',
];

const MAKEUP_BUDGET_RANGES = [`
  );
}


fs.writeFileSync('src/components/RequestQuoteModal.tsx', content);
console.log('Fixed RequestQuoteModal');

// Fix Entertainment TS errors
let entContent = fs.readFileSync('src/components/EntertainmentListingPage.tsx', 'utf-8');
entContent = entContent.replace(/\|\| item.tier === 'Essential'/g, ''); // Remove the invalid comparison
entContent = entContent.replace(/item.tier === 'Essential' \? styles.essentialPill : /g, '');
entContent = entContent.replace(/item.tier === 'Essential' \? styles.essentialPillText : /g, '');
fs.writeFileSync('src/components/EntertainmentListingPage.tsx', entContent);
console.log('Fixed EntertainmentListingPage');
