const fs = require('fs');

const file = fs.readFileSync('src/components/DestinationWeddingFlow.tsx', 'utf-8');

const hillStations = ['Ooty', 'Kodaikanal', 'Coonoor', 'Yercaud', 'Kotagiri', 'Valparai'];
const beaches = ['Mahabalipuram', 'Covelong / Kovalam', 'Chennai ECR', 'Muttukadu', 'Kanniyakumari', 'Rameswaram'];
const heritage = ['Chettinad', 'Madurai', 'Thanjavur', 'Kumbakonam', 'Trichy'];
// Cities: Chennai City, Coimbatore, Salem

const beachImages = ['beachResortImg', 'modernCanopyImg'];
const hillImages = ['rusticOutdoorImg', 'pastelReceptionImg', 'modernCanopyImg'];
const heritageImages = ['palaceReceptionImg', 'royalMandapImg', 'hinduCoupleImg'];
const cityImages = ['weddingBanquetImg', 'whiteBanquetImg', 'sangeetStageImg', 'guestStageImg'];

let updated = file.replace(/const VENUES = \[([\s\S]*?)\];/g, (match, p1) => {
  let lines = p1.split('\n');
  let resultLines = lines.map(line => {
    if (line.includes("{ id: '")) {
      let locationMatch = line.match(/location:\s*'([^']+)'/);
      if (locationMatch) {
        let loc = locationMatch[1];
        let imagesToUse = cityImages; // default
        if (hillStations.includes(loc)) imagesToUse = hillImages;
        else if (beaches.includes(loc)) imagesToUse = beachImages;
        else if (heritage.includes(loc)) imagesToUse = heritageImages;
        
        // Randomly pick one or use a hash to be deterministic
        let hash = loc.charCodeAt(0) + line.length;
        let selectedImage = imagesToUse[hash % imagesToUse.length];
        
        // Preserve specific images if they make sense, but it's safer to just overwrite all 
        // to strictly enforce the theme.
        return line.replace(/image:\s*[a-zA-Z0-9_]+/, `image: ${selectedImage}`);
      }
    }
    return line;
  });
  return `const VENUES = [\n${resultLines.join('\n')}\n];`;
});

fs.writeFileSync('src/components/DestinationWeddingFlow.tsx', updated);
console.log('Done');
