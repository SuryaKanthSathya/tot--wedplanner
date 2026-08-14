const fs = require('fs');

const dFlowContent = fs.readFileSync('src/components/DestinationWeddingFlow.tsx', 'utf-8');
const venueMatches = dFlowContent.match(/const VENUES = \[([\s\S]*?)\];/);

if (venueMatches) {
    let venueArrayStr = venueMatches[1];
    
    // We need to parse it to convert to VenueItem.
    // It's not valid JSON. Let's do a regex replacement.
    
    // { id: 'v122', name: 'Sterling Yercaud', location: 'Yercaud', price: '₹₹₹', guests: '150-400 Guests', image: rusticOutdoorImg },
    const matches = venueArrayStr.matchAll(/\{ id: '([^']+)', name: '([^']+)', location: '([^']+)', price: '([^']+)', guests: '([^']+)', image: ([^ \}]+) \}/g);
    
    let additionalVenues = "";
    for (const match of matches) {
        const id = match[1];
        const name = match[2];
        const location = match[3];
        const price = match[4];
        const guests = match[5];
        const imageVar = match[6];
        
        let priceValue = 100000;
        if (price.length === 2) priceValue = 50000;
        if (price.length === 3) priceValue = 100000;
        if (price.length === 4) priceValue = 300000;
        if (price.length === 5) priceValue = 500000;
        
        additionalVenues += `
  {
    id: '${id}',
    name: '${name}',
    category: 'Destination Resort & Spa',
    city: '${location}',
    location: '${location}',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '${price.length === 2 ? "₹50,000" : price.length === 3 ? "₹1,00,000" : price.length === 4 ? "₹3,00,000" : "₹5,00,000"} onwards',
    priceValue: ${priceValue},
    tier: '${price.length > 3 ? "Signature" : "Premium"}',
    capacity: '${guests}',
    capacityValue: parseInt('${guests}'.split('-')[1]) || 500,
    image: ${imageVar === 'rusticOutdoorImg' ? "'/src/assets/images/rustic_outdoor_mandap.jpg'" : imageVar === 'pastelReceptionImg' ? "'/src/assets/images/pastel_reception_stage.jpg'" : imageVar === 'modernCanopyImg' ? "'/src/assets/images/modern_canopy_decor.jpg'" : imageVar === 'beachResortImg' ? "'/src/assets/images/beach_resort_decor.jpg'" : imageVar === 'palaceReceptionImg' ? "'/src/assets/images/palace_reception_decor.jpg'" : imageVar === 'hinduCoupleImg' ? "'/src/assets/images/hindu_couple_arch_1786467605789.jpg'" : imageVar === 'royalMandapImg' ? "'/src/assets/images/royal_mandap_decor.jpg'" : imageVar === 'whiteBanquetImg' ? "'/src/assets/images/white_banquet_illustration_1786471427275.jpg'" : imageVar === 'weddingBanquetImg' ? "'/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg'" : imageVar === 'guestStageImg' ? "'/src/assets/images/guest_banquet_hall_stage_1786471284070.jpg'" : imageVar === 'sangeetStageImg' ? "'/src/assets/images/sangeet_stage_decor.jpg'" : "'/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg'"},
    description: 'A beautiful destination venue at ${location} perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },`;
    }
    
    console.log(additionalVenues);
}
