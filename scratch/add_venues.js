const fs = require('fs');

const dFlowContent = fs.readFileSync('src/components/DestinationWeddingFlow.tsx', 'utf-8');
const venueMatches = dFlowContent.match(/const VENUES = \[([\s\S]*?)\n\];/);
if (venueMatches) {
    const venueArrayStr = venueMatches[1];
    console.log("Found venues!");
}
