const fs = require('fs');

let content = fs.readFileSync('src/components/MyWeddingTabScreen.tsx', 'utf-8');

// Add imports if they don't exist
const importsToAdd = [];
if (!content.includes('import { MehendiListingPage }')) {
  importsToAdd.push("import { MehendiListingPage } from './MehendiListingPage';");
}
if (!content.includes('import { CateringListingPage }')) {
  importsToAdd.push("import { CateringListingPage } from './CateringListingPage';");
}
if (!content.includes('import { CarsListingPage }')) {
  importsToAdd.push("import { CarsListingPage } from './CarsListingPage';");
}

if (importsToAdd.length > 0) {
  content = content.replace(
    /import \{ PhotographyListingPage \} from '\.\/PhotographyListingPage';/,
    `import { PhotographyListingPage } from './PhotographyListingPage';\n${importsToAdd.join('\n')}`
  );
}

// Add state variables
if (!content.includes('const [showMehendiListing')) {
  content = content.replace(
    /const \[showPhotographyListing, setShowPhotographyListing\] = useState\(false\);/,
    `const [showPhotographyListing, setShowPhotographyListing] = useState(false);\n  const [showMehendiListing, setShowMehendiListing] = useState(false);\n  const [showCateringListing, setShowCateringListing] = useState(false);\n  const [showCarsListing, setShowCarsListing] = useState(false);`
  );
}

// Add listing renders
if (!content.includes('if (showMehendiListing)')) {
  const mehendiRender = `
  if (showMehendiListing) {
    return (
      <MehendiListingPage
        onBack={() => setShowMehendiListing(false)}
        savedArtistIds={[]} // Add default empty array to avoid undefined errors if props change
      />
    );
  }`;
  
  const cateringRender = `
  if (showCateringListing) {
    return (
      <CateringListingPage
        onBack={() => setShowCateringListing(false)}
      />
    );
  }`;

  const carsRender = `
  if (showCarsListing) {
    return (
      <CarsListingPage
        onBack={() => setShowCarsListing(false)}
      />
    );
  }`;

  content = content.replace(
    /if \(showPhotographyListing\) \{/,
    `${mehendiRender}\n${cateringRender}\n${carsRender}\n\n  if (showPhotographyListing) {`
  );
}

// Add navigation logic
if (!content.includes('setShowMehendiListing(true)')) {
  content = content.replace(
    /if \(sid === 'invitation' \|\| sname\.includes\('invit'\)\) \{\s*setShowInvitationListing\(true\);\s*return;\s*\}/,
    `if (sid === 'invitation' || sname.includes('invit')) {
                    setShowInvitationListing(true);
                    return;
                  }
                  if (sid === 'mehendi' || sname.includes('mehendi')) {
                    setShowMehendiListing(true);
                    return;
                  }
                  if (sid === 'catering' || sname.includes('cater')) {
                    setShowCateringListing(true);
                    return;
                  }
                  if (sid === 'cars' || sname.includes('car')) {
                    setShowCarsListing(true);
                    return;
                  }`
  );
}

fs.writeFileSync('src/components/MyWeddingTabScreen.tsx', content);
console.log('Fixed navigation in MyWeddingTabScreen.tsx!');
