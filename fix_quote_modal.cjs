const fs = require('fs');

let content = fs.readFileSync('src/components/RequestQuoteModal.tsx', 'utf-8');

// Add Mehendi definitions
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

// Add isMehendi boolean
content = content.replace(
  /const isMakeup = catLower === 'makeup';/,
  `const isMakeup = catLower === 'makeup';\n  const isMehendi = catLower === 'mehendi';`
);

// Update ternaries
content = content.replace(
  /isMakeup \? MAKEUP_SERVICES : isCatering \? CATERING_SERVICES : PHOTOGRAPHY_SERVICES/g,
  `isMakeup ? MAKEUP_SERVICES : isMehendi ? MEHENDI_SERVICES : isCatering ? CATERING_SERVICES : PHOTOGRAPHY_SERVICES`
);

content = content.replace(
  /isMakeup \? MAKEUP_BUDGET_RANGES : isCatering \? CATERING_BUDGET_RANGES : PHOTOGRAPHY_BUDGET_RANGES/g,
  `isMakeup ? MAKEUP_BUDGET_RANGES : isMehendi ? MEHENDI_BUDGET_RANGES : isCatering ? CATERING_BUDGET_RANGES : PHOTOGRAPHY_BUDGET_RANGES`
);

content = content.replace(
  /isMakeup, isEntertainment, isCars\]\);/g,
  `isMakeup, isEntertainment, isCars, isMehendi]);`
);

// Quote Request Sent
content = content.replace(
  /isMakeup \? 'Makeup Quote Request Sent!' : isCatering \? 'Catering Quote Request Sent!' : 'Quote Request Sent!'\}/g,
  `isMakeup ? 'Makeup Quote Request Sent!' : isMehendi ? 'Mehendi Quote Request Sent!' : isCatering ? 'Catering Quote Request Sent!' : 'Quote Request Sent!'}`
);

// Your X requirements have been sent
content = content.replace(
  /isMakeup \? 'bridal makeup' : 'photography'\}/g,
  `isMakeup ? 'bridal makeup' : isMehendi ? 'bridal mehendi' : 'photography'}`
);

// Icon ternary
content = content.replace(
  /\) : isMakeup \? \(\n\s*<Brush className="w-10 h-10 text-\[#581420\]" \/>\n\s*\)/,
  `) : isMakeup ? (\n                        <Brush className="w-10 h-10 text-[#581420]" />\n                      ) : isMehendi ? (\n                        <Palette className="w-10 h-10 text-[#581420]" />\n                      )`
);

// Title ternary
content = content.replace(
  /isMakeup \? 'Bridal Makeup Quote Request' : isCatering \? 'Catering Quote Request' : 'Photography Quote Request'/g,
  `isMakeup ? 'Bridal Makeup Quote Request' : isMehendi ? 'Bridal Mehendi Quote Request' : isCatering ? 'Catering Quote Request' : 'Photography Quote Request'`
);

// Share your X details
content = content.replace(
  /isMakeup \? 'bridal makeup' : isCatering \? 'catering' : 'photography'/g,
  `isMakeup ? 'bridal makeup' : isMehendi ? 'mehendi' : isCatering ? 'catering' : 'photography'`
);

// X Services Needed
content = content.replace(
  /isMakeup \? 'Makeup Services Needed' : isCatering \? 'Catering Services Needed' : 'Photography Services Needed'/g,
  `isMakeup ? 'Makeup Services Needed' : isMehendi ? 'Mehendi Services Needed' : isCatering ? 'Catering Services Needed' : 'Photography Services Needed'`
);

// Estimated X Budget
content = content.replace(
  /isMakeup \? 'Estimated Makeup Budget' : isCatering \? 'Estimated Catering Budget' : 'Estimated Photography Budget'/g,
  `isMakeup ? 'Estimated Makeup Budget' : isMehendi ? 'Estimated Mehendi Budget' : isCatering ? 'Estimated Catering Budget' : 'Estimated Photography Budget'`
);

// Send X Quote Request (Button)
content = content.replace(
  /isMakeup \? 'Send Makeup Quote Request' : isCatering \? 'Send Catering Quote Request' : 'Send Photography Quote Request'/g,
  `isMakeup ? 'Send Makeup Quote Request' : isMehendi ? 'Send Mehendi Quote Request' : isCatering ? 'Send Catering Quote Request' : 'Send Photography Quote Request'`
);

// Fix import Palette correctly
if (!content.includes('Palette')) {
  content = content.replace(
    /import \{([^}]+)\} from 'lucide-react';/,
    (match, p1) => `import { ${p1.trim()}, Palette } from 'lucide-react';`
  );
}

fs.writeFileSync('src/components/RequestQuoteModal.tsx', content);
console.log('Successfully applied RequestQuoteModal fix for Mehendi!');
