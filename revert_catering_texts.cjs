const fs = require('fs');
let content = fs.readFileSync('src/components/RequestQuoteModal.tsx', 'utf-8');

// Undo the placeholders fix
content = content.replace(
  /: isCatering\r?\n\s*\? 'e\.g\. Need South Indian buffet for 500 guests with live dosa counters'\r?\n\s*: isCars/,
  ': isCars'
);

// Undo the submit button text
content = content.replace(
  /: isMakeup\r?\n\s*\? 'Send Makeup Quote Request'\r?\n\s*: isCatering\r?\n\s*\? 'Send Catering Quote Request'/,
  ': isMakeup\n                        ? \'Send Makeup Quote Request\''
);

// Remove isCatering boolean
content = content.replace(
  /const isMakeup = category === 'makeup';\r?\n\s*const isCatering = category === 'catering';/,
  "const isMakeup = category === 'makeup';"
);

fs.writeFileSync('src/components/RequestQuoteModal.tsx', content);
