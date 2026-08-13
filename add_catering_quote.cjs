const fs = require('fs');
let content = fs.readFileSync('src/components/RequestQuoteModal.tsx', 'utf-8');

// Add CATERING_SERVICES
if (!content.includes('CATERING_SERVICES')) {
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

// Add CATERING_BUDGET_RANGES
if (!content.includes('CATERING_BUDGET_RANGES')) {
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

// Ensure 'catering' is handled in getServicesList
if (content.includes('const getServicesList = () => {')) {
  content = content.replace(
    /const getServicesList = \(\) => \{[\s\S]*?return PHOTOGRAPHY_SERVICES;[\s\S]*?\};/,
    `const getServicesList = () => {
    if (category === 'makeup') return MAKEUP_SERVICES;
    if (category === 'decor') return DECOR_SERVICES;
    if (category === 'entertainment') return ENTERTAINMENT_SERVICES;
    if (category === 'catering') return CATERING_SERVICES;
    return PHOTOGRAPHY_SERVICES;
  };`
  );
}

// Ensure 'catering' is handled in getBudgetRanges
if (content.includes('const getBudgetRanges = () => {')) {
  content = content.replace(
    /const getBudgetRanges = \(\) => \{[\s\S]*?return PHOTOGRAPHY_BUDGET_RANGES;[\s\S]*?\};/,
    `const getBudgetRanges = () => {
    if (category === 'makeup') return MAKEUP_BUDGET_RANGES;
    if (category === 'decor') return DECOR_BUDGET_RANGES;
    if (category === 'entertainment') return ENTERTAINMENT_BUDGET_RANGES;
    if (category === 'catering') return CATERING_BUDGET_RANGES;
    return PHOTOGRAPHY_BUDGET_RANGES;
  };`
  );
}

fs.writeFileSync('src/components/RequestQuoteModal.tsx', content);
console.log('Successfully added catering services to RequestQuoteModal');
