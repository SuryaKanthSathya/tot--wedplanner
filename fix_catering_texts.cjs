const fs = require('fs');
let content = fs.readFileSync('src/components/RequestQuoteModal.tsx', 'utf-8');

if (!content.includes('const isCatering')) {
  content = content.replace(
    /const isMakeup = category === 'makeup';/,
    "const isMakeup = category === 'makeup';\n  const isCatering = category === 'catering';"
  );
}

// Update placeholders
if (!content.includes('e.g. Need South Indian buffet for 500 guests')) {
  content = content.replace(
    /: isCars/,
    `: isCatering
                            ? 'e.g. Need South Indian buffet for 500 guests with live dosa counters'
                            : isCars`
  );
}

// Update submit button text
if (!content.includes('Send Catering Quote Request')) {
  content = content.replace(
    /: isMakeup\s*\?\s*'Send Makeup Quote Request'/,
    `: isMakeup
                        ? 'Send Makeup Quote Request'
                        : isCatering
                        ? 'Send Catering Quote Request'`
  );
}

fs.writeFileSync('src/components/RequestQuoteModal.tsx', content);
console.log('Updated RequestQuoteModal for catering specific texts');
