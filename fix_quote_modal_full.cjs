const fs = require('fs');

let content = fs.readFileSync('src/components/RequestQuoteModal.tsx', 'utf-8');

// Add Mehendi definitions if missing
if (!content.includes('MEHENDI_SERVICES')) {
  content = content.replace(
    /const MAKEUP_SERVICES = \[\s*[\s\S]*?\];/m,
    (match) => match + `\n\nconst MEHENDI_SERVICES = [\n  'Bridal Mehendi',\n  'Guest Mehendi (up to 5)',\n  'Guest Mehendi (10+)',\n  'Pre-Wedding Mehendi Party',\n  'Family Mehendi Package',\n  'Minimalist / Khafif',\n];`
  );
}

if (!content.includes('MEHENDI_BUDGET_RANGES')) {
  content = content.replace(
    /const MAKEUP_BUDGET_RANGES = \[\s*[\s\S]*?\];/m,
    (match) => match + `\n\nconst MEHENDI_BUDGET_RANGES = [\n  'Under ₹5,000',\n  '₹5,000 - ₹15,000',\n  '₹15,000 - ₹30,000',\n  '₹30,000+',\n];`
  );
}


// Add Catering definitions if missing
if (!content.includes('CATERING_SERVICES')) {
  content = content.replace(
    /const MAKEUP_SERVICES = \[\s*[\s\S]*?\];/m,
    (match) => match + `\n\nconst CATERING_SERVICES = [\n  'Wedding Feast (Muhurtham)',\n  'Reception Dinner',\n  'Haldi / Sangeet Snacks',\n  'Live Food Counters',\n  'Traditional Banana Leaf',\n  'Multi-Cuisine Buffet',\n];`
  );
}

if (!content.includes('CATERING_BUDGET_RANGES')) {
  content = content.replace(
    /const MAKEUP_BUDGET_RANGES = \[\s*[\s\S]*?\];/m,
    (match) => match + `\n\nconst CATERING_BUDGET_RANGES = [\n  'Under ₹500/plate',\n  '₹500 - ₹1,000/plate',\n  '₹1,000 - ₹2,000/plate',\n  '₹2,000+/plate',\n];`
  );
}

// Add isCatering and isMehendi booleans
if (!content.includes('isMehendi')) {
  content = content.replace(
    /const isMakeup = catLower === 'makeup';/,
    `const isMakeup = catLower === 'makeup';\n  const isMehendi = catLower === 'mehendi';\n  const isCatering = catLower === 'catering';`
  );
} else if (!content.includes('isCatering')) {
  content = content.replace(
    /const isMehendi = catLower === 'mehendi';/,
    `const isMehendi = catLower === 'mehendi';\n  const isCatering = catLower === 'catering';`
  );
}

// Update ternaries
content = content.replace(
  /const servicesList = .*/,
  `const servicesList = isCars ? CARS_SERVICES : isEntertainment ? ENTERTAINMENT_SERVICES : isDecor ? DECOR_SERVICES : isMakeup ? MAKEUP_SERVICES : isMehendi ? MEHENDI_SERVICES : isCatering ? CATERING_SERVICES : PHOTOGRAPHY_SERVICES;`
);
content = content.replace(
  /const budgetList = .*/,
  `const budgetList = isCars ? CARS_BUDGET_RANGES : isEntertainment ? ENTERTAINMENT_BUDGET_RANGES : isDecor ? DECOR_BUDGET_RANGES : isMakeup ? MAKEUP_BUDGET_RANGES : isMehendi ? MEHENDI_BUDGET_RANGES : isCatering ? CATERING_BUDGET_RANGES : PHOTOGRAPHY_BUDGET_RANGES;`
);

content = content.replace(
  /isMakeup, isEntertainment, isCars, isMehendi\]\);/g,
  `isMakeup, isEntertainment, isCars, isMehendi, isCatering]);`
);
content = content.replace(
  /isMakeup, isEntertainment, isCars\]\);/g,
  `isMakeup, isEntertainment, isCars, isMehendi, isCatering]);`
);

// Quote Request Sent
content = content.replace(
  /isCars \? 'Car Quote Request Sent!' : isEntertainment \? 'Entertainment Quote Request Sent!' : isDecor \? 'Decor Quote Request Sent!' : isMakeup \? 'Makeup Quote Request Sent!' : 'Quote Request Sent!'/g,
  `isCars ? 'Car Quote Request Sent!' : isEntertainment ? 'Entertainment Quote Request Sent!' : isDecor ? 'Decor Quote Request Sent!' : isMakeup ? 'Makeup Quote Request Sent!' : isMehendi ? 'Mehendi Quote Request Sent!' : isCatering ? 'Catering Quote Request Sent!' : 'Quote Request Sent!'`
);

// Your X requirements have been sent
content = content.replace(
  /isCars \? 'transport\/car' : isEntertainment \? 'entertainment' : isDecor \? 'wedding decor' : isMakeup \? 'bridal makeup' : 'photography'/g,
  `isCars ? 'transport/car' : isEntertainment ? 'entertainment' : isDecor ? 'wedding decor' : isMakeup ? 'bridal makeup' : isMehendi ? 'bridal mehendi' : isCatering ? 'catering' : 'photography'`
);

// Title ternary
content = content.replace(
  /isCars \? 'Car Rental Quote Request' : isEntertainment \? 'Entertainment Quote Request' : isDecor \? 'Wedding Decor Quote Request' : isMakeup \? 'Bridal Makeup Quote Request' : 'Photography Quote Request'/g,
  `isCars ? 'Car Rental Quote Request' : isEntertainment ? 'Entertainment Quote Request' : isDecor ? 'Wedding Decor Quote Request' : isMakeup ? 'Bridal Makeup Quote Request' : isMehendi ? 'Bridal Mehendi Quote Request' : isCatering ? 'Catering Quote Request' : 'Photography Quote Request'`
);

// Share your X details
content = content.replace(
  /isCars \? 'transportation' : isEntertainment \? 'entertainment' : isDecor \? 'wedding decor' : isMakeup \? 'bridal makeup' : 'photography'/g,
  `isCars ? 'transportation' : isEntertainment ? 'entertainment' : isDecor ? 'wedding decor' : isMakeup ? 'bridal makeup' : isMehendi ? 'mehendi' : isCatering ? 'catering' : 'photography'`
);

// X Services Needed
content = content.replace(
  /isCars \? 'Vehicle\/Services Needed' : isEntertainment \? 'Entertainment Services Needed' : isDecor \? 'Decor Services Needed' : isMakeup \? 'Makeup Services Needed' : 'Photography Services Needed'/g,
  `isCars ? 'Vehicle/Services Needed' : isEntertainment ? 'Entertainment Services Needed' : isDecor ? 'Decor Services Needed' : isMakeup ? 'Makeup Services Needed' : isMehendi ? 'Mehendi Services Needed' : isCatering ? 'Catering Services Needed' : 'Photography Services Needed'`
);

// Estimated X Budget
content = content.replace(
  /isCars \? 'Estimated Rental Budget' : isEntertainment \? 'Estimated Entertainment Budget' : isDecor \? 'Estimated Decor Budget' : isMakeup \? 'Estimated Makeup Budget' : 'Estimated Photography Budget'/g,
  `isCars ? 'Estimated Rental Budget' : isEntertainment ? 'Estimated Entertainment Budget' : isDecor ? 'Estimated Decor Budget' : isMakeup ? 'Estimated Makeup Budget' : isMehendi ? 'Estimated Mehendi Budget' : isCatering ? 'Estimated Catering Budget' : 'Estimated Photography Budget'`
);

// Send X Quote Request (Button)
content = content.replace(
  /isCars \? 'Request Car Rental Quote' : isEntertainment \? 'Send Entertainment Quote Request' : isDecor \? 'Send Decor Quote Request' : isMakeup \? 'Send Makeup Quote Request' : 'Send Photography Quote Request'/g,
  `isCars ? 'Request Car Rental Quote' : isEntertainment ? 'Send Entertainment Quote Request' : isDecor ? 'Send Decor Quote Request' : isMakeup ? 'Send Makeup Quote Request' : isMehendi ? 'Send Mehendi Quote Request' : isCatering ? 'Send Catering Quote Request' : 'Send Photography Quote Request'`
);

// Icon ternary (Fix catering and mehendi)
content = content.replace(
  /\) : isMakeup \? \(\n\s*<Brush className="w-10 h-10 text-\[#581420\]" \/>\n\s*\) : \(\n\s*<Camera className="w-10 h-10 text-\[#581420\]" \/>/,
  `) : isMakeup ? (\n                        <Brush className="w-10 h-10 text-[#581420]" />\n                      ) : isMehendi ? (\n                        <Palette className="w-10 h-10 text-[#581420]" />\n                      ) : isCatering ? (\n                        <Utensils className="w-10 h-10 text-[#581420]" />\n                      ) : (\n                        <Camera className="w-10 h-10 text-[#581420]" />`
);

// Add Utensils import
if (!content.includes('Utensils')) {
  content = content.replace(
    /import \{([^}]+)\} from 'lucide-react';/,
    (match, p1) => `import { ${p1.trim()}, Palette, Utensils } from 'lucide-react';`
  );
}


fs.writeFileSync('src/components/RequestQuoteModal.tsx', content);
console.log('Fixed Catering and Mehendi ternaries!');
