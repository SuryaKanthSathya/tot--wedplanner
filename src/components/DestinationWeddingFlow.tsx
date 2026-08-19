import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  Check,
  Calendar,
  Users,
  Sparkles,
  Heart,
  ChevronRight,
  MapPin,
  Waves,
  Mountain,
  Trees,
  Building2,
  Palmtree,
  Sun,
  Crown,
  Castle,
  Flower2,
  CheckCircle2,
  ArrowRight,
  Compass,
  Landmark,
  Anchor,
  Clock,
  ListPlus,
  Camera,
  Palette,
  Utensils,
  Music,
  Mail
} from 'lucide-react';

// Import local destination images
import mahabalipuramImg from '../assets/images/mahabalipuram_shore_temple_1786470287462.jpg';
import ootyImg from '../assets/images/ooty_nilgiris_tea_pic_1786469767982.jpg';
import kodaikanalImg from '../assets/images/dindigul_kodaikanal_lake_1786470315614.jpg';
import yercaudImg from '../assets/images/salem_yercaud_hills_1786470445272.jpg';
import chennaiImg from '../assets/images/chennai_landmark_pic_1786469508338.jpg';
import pollachiImg from '../assets/images/coimbatore_adiyogi_shiva_1786470303170.jpg';
import maduraiImg from '../assets/images/madurai_landmark_pic_1786469701562.jpg';
import thanjavurImg from '../assets/images/thanjavur_big_temple_pic_1786469751090.jpg';
import chettinadImg from '../assets/images/tn_heritage_palace_pic_1786469719545.jpg';
import kanyakumariImg from '../assets/images/kanniyakumari_landmark_pic_1786469622086.jpg';
import rameswaramImg from '../assets/images/ramanathapuram_pamban_bridge_1786470340546.jpg';
import courtallamImg from '../assets/images/tenkasi_courtallam_falls_1786470431410.jpg';
import trichyImg from '../assets/images/trichy_rockfort_temple_1786470354684.jpg';
import muttukaduImg from '../assets/images/muttukadu_boathouse.png';

// Import local venue images
import guestStageImg from '../assets/images/guest_banquet_hall_stage_1786471284070.jpg';
import hinduCoupleImg from '../assets/images/hindu_couple_arch_1786467605789.jpg';
import beachResortImg from '../assets/images/beach_resort_decor.jpg';
import palaceReceptionImg from '../assets/images/palace_reception_decor.jpg';
import rusticOutdoorImg from '../assets/images/rustic_outdoor_mandap.jpg';
import modernCanopyImg from '../assets/images/modern_canopy_decor.jpg';
import weddingBanquetImg from '../assets/images/wedding_banquet_hall_pic_1786470818992.jpg';
import whiteBanquetImg from '../assets/images/white_banquet_illustration_1786471427275.jpg';
import pastelReceptionImg from '../assets/images/pastel_reception_stage.jpg';
import royalMandapImg from '../assets/images/royal_mandap_decor.jpg';
import sangeetStageImg from '../assets/images/sangeet_stage_decor.jpg';
import jasmineCeilingImg from '../assets/images/jasmine_ceiling_decor.jpg';

export interface DestinationWeddingData {
  destination: string;
  experience: string;
  venue: string;
  weddingDate: string;
  guestCount: string;
  duration: string;
  events: string;
  budget: string;
  weddingStyle: string;
}

interface DestinationWeddingFlowProps {
  onBack: () => void;
  onComplete?: (data: DestinationWeddingData) => void;
  onExploreVenues?: () => void;
}

interface DestinationCard {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  icon: React.ReactNode;
}

const DESTINATIONS: DestinationCard[] = [
  // Hill Station & Valley Escapes
  {
    id: 'Ooty',
    name: 'Ooty',
    subtitle: 'Queen of Hill Stations',
    image: ootyImg,
    icon: <Mountain className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Kodaikanal',
    name: 'Kodaikanal',
    subtitle: 'Princess of Hill Stations',
    image: kodaikanalImg,
    icon: <Trees className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Coonoor',
    name: 'Coonoor',
    subtitle: 'Tea Garden Backdrops',
    image: ootyImg,
    icon: <Trees className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Yercaud',
    name: 'Yercaud',
    subtitle: 'Eastern Ghats Gem',
    image: yercaudImg,
    icon: <Sun className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Kotagiri',
    name: 'Kotagiri',
    subtitle: 'Tranquil Highlands',
    image: yercaudImg,
    icon: <Mountain className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Valparai',
    name: 'Valparai',
    subtitle: 'Forest & Wildlife',
    image: kodaikanalImg,
    icon: <Trees className="w-3.5 h-3.5 text-[#581420]" />,
  },

  // Coastal & Beach Destination Spots
  {
    id: 'Mahabalipuram',
    name: 'Mahabalipuram',
    subtitle: 'Beachfront Heritage',
    image: mahabalipuramImg,
    icon: <Waves className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Covelong',
    name: 'Covelong / Kovalam',
    subtitle: 'Premium Surf & Sand',
    image: beachResortImg,
    icon: <Waves className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'ChennaiECR',
    name: 'Chennai ECR',
    subtitle: 'Private Villa Culture',
    image: modernCanopyImg,
    icon: <Sun className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Muttukadu',
    name: 'Muttukadu',
    subtitle: 'Backwater Vistas',
    image: muttukaduImg,
    icon: <Anchor className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Kanniyakumari',
    name: 'Kanniyakumari',
    subtitle: 'Three-Ocean Confluence',
    image: kanyakumariImg,
    icon: <Compass className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Rameswaram',
    name: 'Rameswaram',
    subtitle: 'Sacred Coastal Weddings',
    image: rameswaramImg,
    icon: <Landmark className="w-3.5 h-3.5 text-[#581420]" />,
  },

  // Heritage, Culture & Royal Palaces
  {
    id: 'Chettinad',
    name: 'Chettinad',
    subtitle: 'Grand Mansion Hub',
    image: chettinadImg,
    icon: <Sparkles className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Madurai',
    name: 'Madurai',
    subtitle: 'Temple Town Grandeur',
    image: maduraiImg,
    icon: <Landmark className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Thanjavur',
    name: 'Thanjavur',
    subtitle: 'Chola Dynasty Vibe',
    image: thanjavurImg,
    icon: <Castle className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Kumbakonam',
    name: 'Kumbakonam',
    subtitle: 'Heritage Resort Hub',
    image: thanjavurImg,
    icon: <Castle className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Trichy',
    name: 'Trichy',
    subtitle: 'Central Heritage Hub',
    image: trichyImg,
    icon: <Landmark className="w-3.5 h-3.5 text-[#581420]" />,
  },

  // Urban Luxury & Modern Cities
  {
    id: 'ChennaiCity',
    name: 'Chennai City',
    subtitle: 'Palatial Luxury',
    image: chennaiImg,
    icon: <Crown className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Coimbatore',
    name: 'Coimbatore',
    subtitle: 'Textile Capital Comfort',
    image: pollachiImg,
    icon: <Building2 className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Salem',
    name: 'Salem',
    subtitle: 'Ghat Foothill Locations',
    image: yercaudImg,
    icon: <Mountain className="w-3.5 h-3.5 text-[#581420]" />,
  },
];

const getExperiencesForDestination = (destName: string) => {
  const hillStations = ['Ooty', 'Kodaikanal', 'Coonoor', 'Yercaud', 'Kotagiri', 'Valparai', 'Salem'];
  const beaches = ['Mahabalipuram', 'Covelong / Kovalam', 'Chennai ECR', 'Muttukadu', 'Kanniyakumari', 'Rameswaram'];
  const heritage = ['Chettinad', 'Madurai', 'Thanjavur', 'Kumbakonam', 'Trichy'];
  
  if (hillStations.includes(destName)) {
    return ['Mountain View Resort', 'Tea Garden Wedding', 'Valley View Ceremony', 'Intimate Forest Wedding'];
  } else if (beaches.includes(destName)) {
    return ['Beachfront Ceremony', 'Ocean View Resort', 'Private Coastal Villa', 'Sunset Beach Wedding'];
  } else if (heritage.includes(destName)) {
    return ['Royal Palace Wedding', 'Heritage Courtyard', 'Traditional Temple Town', 'Grand Vintage Mansion'];
  } else {
    // City / Urban Luxury
    return ['Luxury Hotel Banquet', 'Premium City Resort', 'Rooftop Starry Wedding', 'Elegant Modern Hall'];
  }
};

const getDestinationSubtitle = (destName: string) => {
  const hillStations = ['Ooty', 'Kodaikanal', 'Coonoor', 'Yercaud', 'Kotagiri', 'Valparai', 'Salem'];
  const beaches = ['Mahabalipuram', 'Covelong / Kovalam', 'Chennai ECR', 'Muttukadu', 'Kanniyakumari', 'Rameswaram'];
  const heritage = ['Chettinad', 'Madurai', 'Thanjavur', 'Kumbakonam', 'Trichy'];
  
  if (hillStations.includes(destName)) return 'A perfect destination wedding surrounded by misty mountains.';
  if (beaches.includes(destName)) return 'A perfect destination wedding by the soothing waves and sandy shores.';
  if (heritage.includes(destName)) return 'A grand destination wedding steeped in royal culture and history.';
  return 'A premium destination wedding with ultimate urban luxury.';
};

const VENUES = [

  // Mahabalipuram
  { id: 'v1', name: 'Radisson Blu Resort Temple Bay', location: 'Mahabalipuram', price: '₹₹₹₹', guests: '200-1000 Guests', image: beachResortImg },
  { id: 'v3', name: 'Chariot Beach Resort', location: 'Mahabalipuram', price: '₹₹₹', guests: '100-500 Guests', image: beachResortImg },
  { id: 'v6', name: 'Hotel Tamil Nadu Beach Resort', location: 'Mahabalipuram', price: '₹₹', guests: '50-300 Guests', image: modernCanopyImg },
  { id: 'v8', name: 'Ideal Beach Resort', location: 'Mahabalipuram', price: '₹₹₹', guests: '100-400 Guests', image: beachResortImg },
  { id: 'v101', name: 'InterContinental Chennai', location: 'Mahabalipuram', price: '₹₹₹₹₹', guests: '300-800 Guests', image: modernCanopyImg },
  
  // Covelong / Kovalam
  { id: 'v2', name: 'Taj Fisherman’s Cove Resort', location: 'Covelong / Kovalam', price: '₹₹₹₹₹', guests: '150-800 Guests', image: modernCanopyImg },
  { id: 'v102', name: 'Surf Turf Covelong Point', location: 'Covelong / Kovalam', price: '₹₹', guests: '50-150 Guests', image: modernCanopyImg },
  { id: 'v103', name: 'Vivanta by Taj - Surya', location: 'Covelong / Kovalam', price: '₹₹₹₹', guests: '200-500 Guests', image: modernCanopyImg },

  // Chennai ECR
  { id: 'v4', name: 'MGM Beach Resorts', location: 'Chennai ECR', price: '₹₹₹', guests: '200-600 Guests', image: modernCanopyImg },
  { id: 'v5', name: 'Sheraton Grand Chennai', location: 'Chennai ECR', price: '₹₹₹₹', guests: '300-800 Guests', image: beachResortImg },
  { id: 'v7', name: 'Samaaya Beachside Events', location: 'Chennai ECR', price: '₹₹₹', guests: '50-200 Guests', image: beachResortImg },
  { id: 'v104', name: 'VGP Golden Beach Resort', location: 'Chennai ECR', price: '₹₹₹', guests: '300-1000 Guests', image: beachResortImg },

  // Muttukadu
  { id: 'v105', name: 'Muttukadu Boat House & Lawns', location: 'Muttukadu', price: '₹₹', guests: '100-300 Guests', image: modernCanopyImg },
  { id: 'v106', name: 'MGM Dizzee World Resorts', location: 'Muttukadu', price: '₹₹₹', guests: '200-600 Guests', image: beachResortImg },
  { id: 'v107', name: 'Backwater Retreat', location: 'Muttukadu', price: '₹₹', guests: '50-150 Guests', image: modernCanopyImg },

  // Kanniyakumari
  { id: 'v108', name: 'Sparsa Resort Kanniyakumari', location: 'Kanniyakumari', price: '₹₹₹', guests: '100-400 Guests', image: beachResortImg },
  { id: 'v109', name: 'Annai Resorts & Spa', location: 'Kanniyakumari', price: '₹₹₹', guests: '200-500 Guests', image: modernCanopyImg },
  { id: 'v110', name: 'The Gopinivas Grand', location: 'Kanniyakumari', price: '₹₹', guests: '50-200 Guests', image: beachResortImg },

  // Rameswaram
  { id: 'v111', name: 'Daiwik Hotels', location: 'Rameswaram', price: '₹₹₹', guests: '100-300 Guests', image: modernCanopyImg },
  { id: 'v112', name: 'Hyatt Place Rameswaram', location: 'Rameswaram', price: '₹₹₹₹', guests: '150-400 Guests', image: beachResortImg },
  { id: 'v113', name: 'Hotel Rameshwaram Grand', location: 'Rameswaram', price: '₹₹', guests: '50-200 Guests', image: modernCanopyImg },

  // Ooty
  { id: 'v10', name: 'Sinclairs Retreat', location: 'Ooty', price: '₹₹₹', guests: '100-300 Guests', image: rusticOutdoorImg },
  { id: 'v11', name: 'The Savoy - IHCL', location: 'Ooty', price: '₹₹₹₹', guests: '50-200 Guests', image: modernCanopyImg },
  { id: 'v12', name: 'Sterling Ooty Elk Hill', location: 'Ooty', price: '₹₹₹', guests: '100-400 Guests', image: modernCanopyImg },
  { id: 'v114', name: 'Gem Park Ooty', location: 'Ooty', price: '₹₹₹', guests: '200-500 Guests', image: modernCanopyImg },
  { id: 'v115', name: 'Club Mahindra Derby Green', location: 'Ooty', price: '₹₹₹₹', guests: '100-300 Guests', image: modernCanopyImg },

  // Kodaikanal
  { id: 'v9', name: 'The Tamara Kodai', location: 'Kodaikanal', price: '₹₹₹₹₹', guests: '50-250 Guests', image: modernCanopyImg },
  { id: 'v13', name: 'The Fern Creek', location: 'Kodaikanal', price: '₹₹₹', guests: '50-150 Guests', image: modernCanopyImg },
  { id: 'v116', name: 'Great Trails Kodaikanal', location: 'Kodaikanal', price: '₹₹₹₹', guests: '100-350 Guests', image: pastelReceptionImg },
  { id: 'v117', name: 'Sterling Kodai Lake', location: 'Kodaikanal', price: '₹₹₹', guests: '150-400 Guests', image: pastelReceptionImg },

  // Coonoor
  { id: 'v118', name: 'Gateway Coonoor - IHCL', location: 'Coonoor', price: '₹₹₹₹', guests: '100-250 Guests', image: pastelReceptionImg },
  { id: 'v119', name: 'Teanest Coonoor', location: 'Coonoor', price: '₹₹', guests: '50-100 Guests', image: pastelReceptionImg },
  { id: 'v120', name: 'Sunvalley Homestay', location: 'Coonoor', price: '₹₹', guests: '30-80 Guests', image: modernCanopyImg },

  // Yercaud
  { id: 'v121', name: 'Great Trails Yercaud', location: 'Yercaud', price: '₹₹₹', guests: '100-300 Guests', image: rusticOutdoorImg },
  { id: 'v122', name: 'Sterling Yercaud', location: 'Yercaud', price: '₹₹₹', guests: '150-400 Guests', image: rusticOutdoorImg },
  { id: 'v123', name: 'Grand Palace Hotel & Spa', location: 'Yercaud', price: '₹₹₹₹', guests: '200-500 Guests', image: pastelReceptionImg },

  // Kotagiri
  { id: 'v124', name: 'Green Nest Resort', location: 'Kotagiri', price: '₹₹₹', guests: '50-200 Guests', image: pastelReceptionImg },
  { id: 'v125', name: 'Nahar Retreat & Spa', location: 'Kotagiri', price: '₹₹₹', guests: '100-300 Guests', image: rusticOutdoorImg },
  { id: 'v126', name: 'Teanest Nightingale', location: 'Kotagiri', price: '₹₹', guests: '30-100 Guests', image: pastelReceptionImg },

  // Valparai
  { id: 'v127', name: 'Stanmore Garden Bungalow', location: 'Valparai', price: '₹₹₹', guests: '50-150 Guests', image: rusticOutdoorImg },
  { id: 'v128', name: 'Monica Garden Bungalow', location: 'Valparai', price: '₹₹₹', guests: '50-100 Guests', image: modernCanopyImg },
  { id: 'v129', name: 'Briar Tea Bungalows', location: 'Valparai', price: '₹₹₹₹', guests: '40-120 Guests', image: modernCanopyImg },

  // Chettinad
  { id: 'v130', name: 'Chidambara Vilas', location: 'Chettinad', price: '₹₹₹₹', guests: '100-300 Guests', image: palaceReceptionImg },
  { id: 'v131', name: 'Visalam - CGH Earth', location: 'Chettinad', price: '₹₹₹₹₹', guests: '50-200 Guests', image: hinduCoupleImg },
  { id: 'v132', name: 'The Bangala', location: 'Chettinad', price: '₹₹₹', guests: '80-250 Guests', image: royalMandapImg },

  // Madurai
  { id: 'v16', name: 'Heritage Madurai', location: 'Madurai', price: '₹₹₹₹', guests: '200-800 Guests', image: palaceReceptionImg },
  { id: 'v17', name: 'Gateway Madurai', location: 'Madurai', price: '₹₹₹₹', guests: '150-500 Guests', image: hinduCoupleImg },
  { id: 'v133', name: 'Courtyard by Marriott', location: 'Madurai', price: '₹₹₹₹', guests: '300-1000 Guests', image: hinduCoupleImg },
  { id: 'v134', name: 'JC Residency', location: 'Madurai', price: '₹₹₹', guests: '100-400 Guests', image: palaceReceptionImg },

  // Thanjavur
  { id: 'v135', name: 'Svatma Thanjavur', location: 'Thanjavur', price: '₹₹₹₹₹', guests: '100-300 Guests', image: palaceReceptionImg },
  { id: 'v136', name: 'Sangam Hotel', location: 'Thanjavur', price: '₹₹₹', guests: '200-600 Guests', image: hinduCoupleImg },
  { id: 'v137', name: 'Ideal River View Resort', location: 'Thanjavur', price: '₹₹₹', guests: '150-450 Guests', image: palaceReceptionImg },

  // Kumbakonam
  { id: 'v138', name: 'Mantra Koodam - CGH Earth', location: 'Kumbakonam', price: '₹₹₹₹', guests: '50-200 Guests', image: palaceReceptionImg },
  { id: 'v139', name: 'Indeco Hotels Swamimalai', location: 'Kumbakonam', price: '₹₹₹', guests: '100-400 Guests', image: palaceReceptionImg },
  { id: 'v140', name: 'Quality Inn Viha', location: 'Kumbakonam', price: '₹₹', guests: '150-500 Guests', image: palaceReceptionImg },

  // Trichy
  { id: 'v141', name: 'SRM Hotel', location: 'Trichy', price: '₹₹₹', guests: '200-800 Guests', image: hinduCoupleImg },
  { id: 'v142', name: 'Courtyard by Marriott Trichy', location: 'Trichy', price: '₹₹₹₹', guests: '250-1000 Guests', image: palaceReceptionImg },
  { id: 'v143', name: 'Grand Gardenia', location: 'Trichy', price: '₹₹', guests: '100-400 Guests', image: royalMandapImg },

  // Chennai City
  { id: 'v14', name: 'The Leela Palace', location: 'Chennai City', price: '₹₹₹₹₹', guests: '500-1500 Guests', image: whiteBanquetImg },
  { id: 'v15', name: 'ITC Grand Chola', location: 'Chennai City', price: '₹₹₹₹₹', guests: '500-2000 Guests', image: weddingBanquetImg },
  { id: 'v18', name: 'Taj Coromandel', location: 'Chennai City', price: '₹₹₹₹', guests: '300-1000 Guests', image: guestStageImg },
  { id: 'v20', name: 'Taj Club House', location: 'Chennai City', price: '₹₹₹₹', guests: '150-600 Guests', image: sangeetStageImg },
  { id: 'v144', name: 'Feathers - A Radha Hotel', location: 'Chennai City', price: '₹₹₹₹', guests: '400-1200 Guests', image: weddingBanquetImg },

  // Coimbatore
  { id: 'v19', name: 'The Residency Towers', location: 'Coimbatore', price: '₹₹₹₹', guests: '200-800 Guests', image: weddingBanquetImg },
  { id: 'v145', name: 'Taj Vivanta Coimbatore', location: 'Coimbatore', price: '₹₹₹₹', guests: '250-1000 Guests', image: whiteBanquetImg },
  { id: 'v146', name: 'Radisson Blu Coimbatore', location: 'Coimbatore', price: '₹₹₹₹', guests: '200-900 Guests', image: sangeetStageImg },
  { id: 'v147', name: 'Le Meridien', location: 'Coimbatore', price: '₹₹₹₹₹', guests: '500-2000 Guests', image: guestStageImg },

  // Salem
  { id: 'v148', name: 'Radisson Salem', location: 'Salem', price: '₹₹₹₹', guests: '300-1000 Guests', image: guestStageImg },
  { id: 'v149', name: 'Grand Estancia', location: 'Salem', price: '₹₹₹', guests: '200-800 Guests', image: guestStageImg },
  { id: 'v150', name: 'CJ Pallazzio Hotel', location: 'Salem', price: '₹₹₹', guests: '150-500 Guests', image: guestStageImg },

  // ADDITIONAL Mahabalipuram
  { id: 'v151', name: 'Four Points by Sheraton', location: 'Mahabalipuram', price: '₹₹₹₹', guests: '200-800 Guests', image: modernCanopyImg },
  { id: 'v152', name: 'Grande Bay Resort', location: 'Mahabalipuram', price: '₹₹₹', guests: '100-300 Guests', image: beachResortImg },
  { id: 'v153', name: 'Confluence Banquets and Resort', location: 'Mahabalipuram', price: '₹₹₹₹', guests: '500-1500 Guests', image: beachResortImg },
  { id: 'v154', name: 'Kaldan Samudhra Palace', location: 'Mahabalipuram', price: '₹₹₹₹₹', guests: '300-1000 Guests', image: modernCanopyImg },

  // ADDITIONAL Chennai ECR & Covelong
  { id: 'v155', name: 'Novotel Chennai Sipcot', location: 'Chennai ECR', price: '₹₹₹', guests: '150-500 Guests', image: modernCanopyImg },
  { id: 'v156', name: 'Gokulam Grand', location: 'Chennai ECR', price: '₹₹₹₹', guests: '200-600 Guests', image: modernCanopyImg },
  { id: 'v157', name: 'Blue Bay Resort', location: 'Covelong / Kovalam', price: '₹₹', guests: '50-200 Guests', image: beachResortImg },

  // ADDITIONAL Ooty & Nilgiris
  { id: 'v158', name: 'Taj Savoy Hotel (Lawns)', location: 'Ooty', price: '₹₹₹₹₹', guests: '200-600 Guests', image: pastelReceptionImg },
  { id: 'v159', name: 'Glyngarth Resort', location: 'Ooty', price: '₹₹₹', guests: '100-250 Guests', image: rusticOutdoorImg },
  { id: 'v160', name: 'Accord Metropolitan Ooty', location: 'Ooty', price: '₹₹₹₹', guests: '150-400 Guests', image: modernCanopyImg },
  { id: 'v161', name: 'Destiny The Farm Resort', location: 'Ooty', price: '₹₹₹', guests: '50-150 Guests', image: rusticOutdoorImg },

  // ADDITIONAL Kodaikanal
  { id: 'v162', name: 'Kodai Resort Hotel', location: 'Kodaikanal', price: '₹₹₹', guests: '100-300 Guests', image: rusticOutdoorImg },
  { id: 'v163', name: 'Le Poshe by Sparsa', location: 'Kodaikanal', price: '₹₹₹', guests: '150-400 Guests', image: pastelReceptionImg },
  { id: 'v164', name: 'Villa Retreat', location: 'Kodaikanal', price: '₹₹', guests: '30-100 Guests', image: pastelReceptionImg },

  // ADDITIONAL Yercaud & Coonoor
  { id: 'v165', name: 'Clifton Inn', location: 'Yercaud', price: '₹₹', guests: '50-150 Guests', image: rusticOutdoorImg },
  { id: 'v166', name: 'Bison Woods', location: 'Yercaud', price: '₹₹₹', guests: '100-250 Guests', image: rusticOutdoorImg },
  { id: 'v167', name: 'Wallwood Garden', location: 'Coonoor', price: '₹₹₹', guests: '50-120 Guests', image: rusticOutdoorImg },

  // ADDITIONAL Heritage (Madurai, Chettinad, etc)
  { id: 'v168', name: 'Amika Hotel', location: 'Madurai', price: '₹₹₹', guests: '200-600 Guests', image: hinduCoupleImg },
  { id: 'v169', name: 'Regency Madurai by GRT', location: 'Madurai', price: '₹₹₹', guests: '150-400 Guests', image: royalMandapImg },
  { id: 'v170', name: 'Chettinadu Mansion', location: 'Chettinad', price: '₹₹₹₹', guests: '100-300 Guests', image: hinduCoupleImg },
  { id: 'v171', name: 'Saramangala Palace', location: 'Chettinad', price: '₹₹₹₹', guests: '150-400 Guests', image: royalMandapImg },

  // ADDITIONAL Cities (Chennai, Coimbatore)
  { id: 'v172', name: 'Hyatt Regency Chennai', location: 'Chennai City', price: '₹₹₹₹', guests: '300-1000 Guests', image: guestStageImg },
  { id: 'v173', name: 'Crowne Plaza', location: 'Chennai City', price: '₹₹₹₹', guests: '250-800 Guests', image: guestStageImg },
  { id: 'v174', name: 'The Westin', location: 'Chennai City', price: '₹₹₹₹', guests: '400-1200 Guests', image: weddingBanquetImg },
  { id: 'v175', name: 'Gokulam Grand', location: 'Coimbatore', price: '₹₹₹', guests: '200-700 Guests', image: whiteBanquetImg },
  { id: 'v176', name: 'Welcomhotel by ITC', location: 'Coimbatore', price: '₹₹₹₹', guests: '300-900 Guests', image: weddingBanquetImg },

  // Generic Fallback Venues
  { id: 'v21', name: 'Royal Heritage Resort', location: 'Any', price: '₹₹₹₹', guests: '200-500 Guests', image: weddingBanquetImg },
  { id: 'v22', name: 'Grand Horizon Venue', location: 'Any', price: '₹₹₹', guests: '100-300 Guests', image: sangeetStageImg },

];

const BUDGET_OPTIONS = [
  '₹5L - ₹10L',
  '₹10L - ₹20L',
  '₹20L - ₹30L',
  '₹30L - ₹50L',
  '₹50L +',
];

const WEDDING_STYLES = [
  { id: 'Traditional', name: 'Traditional', icon: <Flower2 className="w-6 h-6 text-[#581420]" /> },
  { id: 'Luxury', name: 'Luxury', icon: <Crown className="w-6 h-6 text-[#581420]" /> },
  { id: 'Nature', name: 'Nature', icon: <Trees className="w-6 h-6 text-[#581420]" /> },
  { id: 'Royal', name: 'Royal', icon: <Castle className="w-6 h-6 text-[#581420]" /> },
  { id: 'Elegant', name: 'Elegant', icon: <Sparkles className="w-6 h-6 text-[#581420]" /> },
  { id: 'Minimal', name: 'Minimal', icon: <CheckCircle2 className="w-6 h-6 text-[#581420]" /> },
];

const RECOMMENDED_PLAN = [
  { 
    type: 'Venue', 
    name: 'Mountain Resort', 
    icon: <Building2 className="w-5 h-5 text-[#581420]" />, 
    description: 'Your carefully selected premium venue featuring world-class amenities and breathtaking views.',
    budget: '₹5 Lakhs - ₹15 Lakhs',
    packages: ['1-Day Standard', '2-Day All-Inclusive', 'Resort Buyout'],
    moreInfo: 'Features 50+ rooms, open lawn for 500 guests, and a dedicated events coordinator.'
  },
  { 
    type: 'Photography', 
    name: 'Moments Studio', 
    icon: <Camera className="w-5 h-5 text-[#581420]" />, 
    description: 'Award-winning team specializing in candid moments and cinematic wedding films.',
    budget: '₹1 Lakh - ₹3 Lakhs',
    packages: ['Candid + Traditional', 'Cinematic Video', 'Pre-Wedding Shoot'],
    moreInfo: 'Includes drone coverage, 2 cinematic trailers, and an exclusive photo album.'
  },
  { 
    type: 'Makeup', 
    name: 'Glow Studio', 
    icon: <Sparkles className="w-5 h-5 text-[#581420]" />, 
    description: 'Expert bridal makeup artists for a flawless, long-lasting look.',
    budget: '₹30k - ₹80k',
    packages: ['Bridal HD Makeup', 'Airbrush Makeup', 'Bridesmaid Packages'],
    moreInfo: 'Uses premium international products and includes draping & hairstyling.'
  },
  { 
    type: 'Decor', 
    name: 'Dream Designs', 
    icon: <Palette className="w-5 h-5 text-[#581420]" />, 
    description: 'Bespoke floral arrangements and thematic styling for your big day.',
    budget: '₹2 Lakhs - ₹6 Lakhs',
    packages: ['Mandap Styling', 'Haldi/Mehendi Decor', 'Reception Theme'],
    moreInfo: 'Custom 3D designs provided before execution to ensure your vision is met.'
  },
  { 
    type: 'Catering', 
    name: 'Flavors Catering', 
    icon: <Utensils className="w-5 h-5 text-[#581420]" />, 
    description: 'A curated multi-cuisine feast prepared by top chefs.',
    budget: '₹1.5 Lakhs - ₹4 Lakhs',
    packages: ['Traditional Thali', 'Continental Buffet', 'Live Counters'],
    moreInfo: 'Offers food tasting sessions before the wedding and custom dietary menus.'
  },
  { 
    type: 'DJ & Music', 
    name: 'Rhythm Entertainment', 
    icon: <Music className="w-5 h-5 text-[#581420]" />, 
    description: 'Top-tier DJs and live bands to keep your guests dancing all night.',
    budget: '₹50k - ₹1.5 Lakhs',
    packages: ['Sangeet DJ', 'Live Sufi Band', 'Folk Dancers'],
    moreInfo: 'Includes high-end sound and lighting setup tailored to the venue.'
  },
  { 
    type: 'Invitations', 
    name: 'Paper & Peonies', 
    icon: <Mail className="w-5 h-5 text-[#581420]" />, 
    description: 'Custom designed, eco-friendly digital and physical invitations.',
    budget: '₹15k - ₹50k',
    packages: ['E-Invites', 'Boxed Invites', 'Save The Dates'],
    moreInfo: 'Includes interactive website invites with RSVP tracking and customized monogram design.'
  },
];

export const DestinationWeddingFlow: React.FC<DestinationWeddingFlowProps> = ({
  onBack,
  onComplete,
  onExploreVenues,
}) => {
  const getDraft = () => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('tot_destination_wedding_draft') : null;
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  };

  const draft = getDraft();

  const [step, setStep] = useState<number>(draft?.step ?? 6);

  // Form selections state
  const [selectedDestination, setSelectedDestination] = useState<string>(draft?.selectedDestination || 'Ooty');
  const [selectedExperience, setSelectedExperience] = useState<string>(draft?.selectedExperience || '');
  const [selectedVenue, setSelectedVenue] = useState<string>(draft?.selectedVenue || '');
  
  // Wedding details
  const [weddingDate, setWeddingDate] = useState<string>(draft?.weddingDate || '');
  const [guestCount, setGuestCount] = useState<string>(draft?.guestCount || '');
  const [duration, setDuration] = useState<string>(draft?.duration || '');
  const [events, setEvents] = useState<string>(draft?.events || '');
  
  const [selectedBudget, setSelectedBudget] = useState<string>(draft?.selectedBudget || '');
  const [selectedStyle, setSelectedStyle] = useState<string>(draft?.selectedStyle || '');
  const [expandedDetail, setExpandedDetail] = useState<string | null>(null);
  const [selectedPackages, setSelectedPackages] = useState<string[]>(draft?.selectedPackages || []);

  useEffect(() => {
    try {
      localStorage.setItem(
        'tot_destination_wedding_draft',
        JSON.stringify({
          step,
          selectedDestination,
          selectedExperience,
          selectedVenue,
          weddingDate,
          guestCount,
          duration,
          events,
          selectedBudget,
          selectedStyle,
          selectedPackages,
        })
      );
    } catch (e) {}
  }, [
    step,
    selectedDestination,
    selectedExperience,
    selectedVenue,
    weddingDate,
    guestCount,
    duration,
    events,
    selectedBudget,
    selectedStyle,
    selectedPackages,
  ]);

  const togglePackage = (type: string) => {
    setSelectedPackages(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Handle Back arrow
  const handleBack = () => {
    try {
      localStorage.removeItem('tot_destination_wedding_draft');
    } catch (e) {}
    onBack();
  };

  // Handle final completion in Screen 7
  const handleFinishFlow = () => {
    try {
      localStorage.removeItem('tot_destination_wedding_draft');
    } catch (e) {}
    const data: DestinationWeddingData = {
      destination: selectedDestination,
      experience: selectedExperience,
      venue: selectedVenue || RECOMMENDED_PLAN[0].name,
      weddingDate,
      guestCount,
      duration,
      events,
      budget: selectedBudget,
      weddingStyle: selectedStyle,
    };
    try {
      localStorage.setItem('destination_wedding_plan', JSON.stringify(data));
      
      // Save the selected venue to the 'saved' area
      if (selectedPackages.includes('Venue') && selectedVenue) {
        const v = VENUES.find(v => v.name === selectedVenue);
        if (v) {
          const savedStr = localStorage.getItem('saved_venues');
          const saved = savedStr ? JSON.parse(savedStr) : {};
          saved[v.id] = true;
          localStorage.setItem('saved_venues', JSON.stringify(saved));
        }
      }
      
      // Save other package items
      if (selectedPackages.includes('Photography')) {
        const savedStr = localStorage.getItem('saved_photography_studios');
        const saved = savedStr ? JSON.parse(savedStr) : {};
        saved['pkg_photo_1'] = true;
        localStorage.setItem('saved_photography_studios', JSON.stringify(saved));
      }
      if (selectedPackages.includes('Makeup')) {
        const savedStr = localStorage.getItem('saved_makeup_studios');
        const saved = savedStr ? JSON.parse(savedStr) : {};
        saved['pkg_makeup_1'] = true;
        localStorage.setItem('saved_makeup_studios', JSON.stringify(saved));
      }
      if (selectedPackages.includes('Decor')) {
        const savedStr = localStorage.getItem('saved_decor_studios');
        const saved = savedStr ? JSON.parse(savedStr) : {};
        saved['pkg_decor_1'] = true;
        localStorage.setItem('saved_decor_studios', JSON.stringify(saved));
      }
      if (selectedPackages.includes('Catering')) {
        const savedStr = localStorage.getItem('saved_catering');
        const saved = savedStr ? JSON.parse(savedStr) : {};
        saved['pkg_catering_1'] = true;
        localStorage.setItem('saved_catering', JSON.stringify(saved));
      }
      if (selectedPackages.includes('DJ & Music')) {
        const savedStr = localStorage.getItem('saved_entertainment');
        const saved = savedStr ? JSON.parse(savedStr) : {};
        saved['pkg_ent_1'] = true;
        localStorage.setItem('saved_entertainment', JSON.stringify(saved));
      }
      if (selectedPackages.includes('Invitations')) {
        const savedStr = localStorage.getItem('saved_invitations');
        const saved = savedStr ? JSON.parse(savedStr) : {};
        saved['pkg_inv_1'] = true;
        localStorage.setItem('saved_invitations', JSON.stringify(saved));
      }
    } catch {
      // ignore storage errors
    }
    
    // Dispatch a custom event to navigate to 'home' tab in Dashboard
    const event = new CustomEvent('tot_switch_tab', { detail: { tab: 'home' } });
    window.dispatchEvent(event);
    
    if (onComplete) {
      onComplete(data);
    } else {
      onBack(); // fallback if onComplete is not provided
    }
  };

  // Progress Bar Width
  const progressPercentage = (step / 7) * 100;

  return (
    <div className="w-full h-full bg-[#FAF8F5] flex flex-col text-[#1F1E1C] select-none font-sans-brand overflow-hidden">
      {/* ================= TOP HEADER ================= */}
      <div className="px-4 pt-4 pb-2 bg-[#FAF8F5] border-b border-stone-200/60 z-20">
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={handleBack}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5 text-[#2B1D1D]" />
          </button>

          <h2 className="font-serif-brand font-semibold text-lg text-[#581420] tracking-wide">
            {step === 1 && "Tamil Nadu Destinations"}
            {step === 2 && "Destination Details"}
            {step === 3 && "Budget"}
            {step === 4 && "Choose Venue"}
            {step === 5 && "Wedding Details"}
            {step === 6 && "Recommended Packages"}
          </h2>

          <div className="w-8" />
        </div>

        {/* Progress Bar (Continuous instead of dots for 6 steps) */}
        <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden mb-1">
          <div 
            className="h-full bg-[#581420] transition-all duration-300 ease-out" 
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* ---------------- SCREEN 6: RECOMMENDED PLAN ---------------- */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col"
            >
              <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#FAF0E6] flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <CheckCircle2 className="w-8 h-8 text-[#581420]" />
                  </div>
                  <h1 className="font-serif-brand font-bold text-2xl text-[#2B1D1D] mb-1">
                    Your {selectedDestination} Wedding Packages
                  </h1>
                  <p className="text-xs text-stone-500 font-medium max-w-[250px] mx-auto">
                    We've curated the perfect team for your celebration.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden mb-2">
                  {RECOMMENDED_PLAN.map((item, index) => (
                    <div key={item.type} className={`flex flex-col ${index !== RECOMMENDED_PLAN.length - 1 ? 'border-b border-stone-100' : ''}`}>
                      <div className="p-4 flex items-center gap-3">
                        <div 
                          className="cursor-pointer p-1 -ml-1"
                          onClick={() => togglePackage(item.type)}
                        >
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-colors ${selectedPackages.includes(item.type) ? 'bg-[#16a34a] border-[#16a34a]' : 'border-stone-300 bg-white'}`}>
                            {selectedPackages.includes(item.type) && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#FAF0E6] flex items-center justify-center flex-shrink-0">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] uppercase tracking-wider text-stone-500 font-bold mb-0.5">
                            {item.type}
                          </p>
                          <h4 className="font-bold text-sm text-[#2B1D1D] truncate">
                            {item.type === 'Venue' ? selectedVenue || item.name : item.name}
                          </h4>
                        </div>
                        <button 
                          onClick={() => setExpandedDetail(expandedDetail === item.type ? null : item.type)}
                          className="text-[#581420] bg-[#FAF0E6] px-3 py-1.5 rounded-full text-[10px] font-bold cursor-pointer hover:bg-[#F2E5D5] transition-colors"
                        >
                          {expandedDetail === item.type ? 'Hide' : 'Details'}
                        </button>
                      </div>
                      
                      <AnimatePresence>
                        {expandedDetail === item.type && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden px-4 pb-4 pt-0"
                          >
                            <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-100 shadow-sm flex flex-col gap-2">
                              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                                {item.description}
                              </p>
                              {(item.budget || item.packages || item.moreInfo) && (
                                <div className="mt-1 pt-2 border-t border-stone-200/60 flex flex-col gap-2">
                                  {item.budget && (
                                    <div className="flex justify-between items-start">
                                      <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider w-1/3 mt-0.5">Budget</span>
                                      <span className="text-xs text-stone-700 font-bold text-right">{item.budget}</span>
                                    </div>
                                  )}
                                  {item.packages && (
                                    <div className="flex justify-between items-start">
                                      <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider w-1/3 mt-0.5">Packages</span>
                                      <span className="text-xs text-stone-600 font-medium text-right w-2/3 leading-snug">{item.packages.join(' • ')}</span>
                                    </div>
                                  )}
                                  {item.moreInfo && (
                                    <div className="flex justify-between items-start">
                                      <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider w-1/3 mt-0.5">More Info</span>
                                      <span className="text-xs text-stone-600 font-medium text-right w-2/3 leading-snug">{item.moreInfo}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-4 py-3 bg-[#FAF8F5] border-t border-stone-200/60 shadow-[0_-4px_15px_rgba(0,0,0,0.03)] z-10 flex flex-row gap-3">
                <button
                  type="button"
                  onClick={() => onBack()}
                  className="flex-1 py-3.5 px-4 bg-white border border-stone-200 text-stone-600 font-bold text-sm rounded-2xl flex items-center justify-center shadow-sm hover:bg-stone-50 transition-all cursor-pointer"
                >
                  <span>Deny</span>
                </button>
                <button
                  type="button"
                  onClick={handleFinishFlow}
                  className="flex-1 py-3.5 px-4 bg-[#581420] text-white font-bold text-sm rounded-2xl flex items-center justify-center shadow-md hover:bg-[#420E18] transition-all cursor-pointer"
                >
                  <span>Save</span>
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};
