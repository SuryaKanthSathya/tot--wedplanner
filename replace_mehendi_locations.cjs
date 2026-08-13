const fs = require('fs');

const districts = [
  'Coimbatore',
  'Madurai',
  'Trichy',
  'Salem',
  'Tirunelveli',
  'Erode',
  'Vellore',
  'Thanjavur',
  'Kanyakumari',
  'Tiruppur',
  'Dindigul',
  'Karur',
  'Namakkal',
  'Tuticorin',
  'Ooty',
  'Kanchipuram',
  'Kumbakonam',
  'Chengalpattu',
  'Nagapattinam',
  'Sivakasi'
];

let content = fs.readFileSync('src/components/MehendiListingPage.tsx', 'utf-8');

let index = 0;
// Note: In MehendiListingPage, the property might be `location: 'Chennai'` or something similar.
content = content.replace(/location:\s*'[^']+'/g, (match) => {
  // If the location is 'Chennai' or whatever it is, replace it
  const district = districts[index % districts.length];
  index++;
  return `location: '${district}'`;
});

fs.writeFileSync('src/components/MehendiListingPage.tsx', content);
console.log('Replaced locations with TN districts for Mehendi');
