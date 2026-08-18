const fs = require('fs');
const path = require('path');

const listingFiles = [
  'VenueListingPage.tsx',
  'MakeupListingPage.tsx',
  'PhotographyListingPage.tsx',
  'DecorListingPage.tsx',
  'CateringListingPage.tsx',
  'InvitationListingPage.tsx',
  'CarsListingPage.tsx'
];

listingFiles.forEach(file => {
  const filePath = path.join(__dirname, 'src/components', file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // We are looking for something like:
  // ) : (
  //   displayedVenues.map((venue) => {
  // or similar.
  // Actually, we can use a regex to wrap the map expression.
  
  // A simpler approach: find the exact line before the map and replace it.
  
  // Let's replace the common pattern:
  const mapRegex = /\)\s*:\s*\(\s*(filtered[A-Za-z]+|displayed[A-Za-z]+)\.map\(/g;
  
  if (mapRegex.test(content)) {
    content = content.replace(mapRegex, `) : (\n          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">\n            {$1.map(`);
    
    const closeRegex = /}\)\s*\n\s*\)}/g;
    content = content.replace(closeRegex, `})}\n          </div>\n        )}`);
    
    fs.writeFileSync(filePath, content);
    console.log(`Added grid wrapper to ${file}`);
  } else {
    // If it doesn't use displayedSomething.map, maybe it just maps directly
    console.log(`Could not find map array in ${file}`);
  }
});
