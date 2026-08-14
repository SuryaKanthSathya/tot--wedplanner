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

let content = fs.readFileSync('src/components/CateringListingPage.tsx', 'utf-8');

let index = 0;
content = content.replace(/location:\s*'Chennai'/g, () => {
  const district = districts[index % districts.length];
  index++;
  return `location: '${district}'`;
});

fs.writeFileSync('src/components/CateringListingPage.tsx', content);
console.log('Replaced locations with TN districts');
