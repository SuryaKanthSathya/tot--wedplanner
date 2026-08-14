import React, { useState } from 'react';
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
  { type: 'Venue', name: 'Mountain Resort', icon: <Building2 className="w-5 h-5 text-[#581420]" />, description: 'Your carefully selected premium venue featuring world-class amenities and breathtaking views.' },
  { type: 'Photography', name: 'Moments Studio', icon: <Camera className="w-5 h-5 text-[#581420]" />, description: 'Award-winning team specializing in candid moments and cinematic wedding films.' },
  { type: 'Makeup', name: 'Glow Studio', icon: <Sparkles className="w-5 h-5 text-[#581420]" />, description: 'Expert bridal makeup artists for a flawless, long-lasting look.' },
  { type: 'Decor', name: 'Dream Designs', icon: <Palette className="w-5 h-5 text-[#581420]" />, description: 'Bespoke floral arrangements and thematic styling for your big day.' },
  { type: 'Catering', name: 'Flavors Catering', icon: <Utensils className="w-5 h-5 text-[#581420]" />, description: 'A curated multi-cuisine feast prepared by top chefs.' },
  { type: 'DJ & Music', name: 'Rhythm Entertainment', icon: <Music className="w-5 h-5 text-[#581420]" />, description: 'Top-tier DJs and live bands to keep your guests dancing all night.' },
  { type: 'Invitations', name: 'Paper & Peonies', icon: <Mail className="w-5 h-5 text-[#581420]" />, description: 'Custom designed, eco-friendly digital and physical invitations.' },
];

export const DestinationWeddingFlow: React.FC<DestinationWeddingFlowProps> = ({
  onBack,
  onComplete,
  onExploreVenues,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form selections state
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [selectedExperience, setSelectedExperience] = useState<string>('');
  const [selectedVenue, setSelectedVenue] = useState<string>('');
  
  // Wedding details
  const [weddingDate, setWeddingDate] = useState<string>('');
  const [guestCount, setGuestCount] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [events, setEvents] = useState<string>('');
  
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [expandedDetail, setExpandedDetail] = useState<string | null>(null);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  const togglePackage = (type: string) => {
    setSelectedPackages(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Handle Back arrow
  const handleBack = () => {
    if (step === 1) {
      onBack();
    } else {
      setStep((prev) => prev - 1);
    }
  };

  // Handle final completion in Screen 7
  const handleFinishFlow = () => {
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
          
          {/* ---------------- SCREEN 1: TAMIL NADU DESTINATIONS ---------------- */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 flex flex-col"
            >
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
                <h1 className="font-serif-brand font-bold text-[22px] text-[#2B1D1D] leading-snug">
                  Where would you love to celebrate in Tamil Nadu? ✨
                </h1>
                <p className="text-xs text-[#6B5E5E] font-medium mt-0.5 mb-3.5">
                  Beautiful wedding destinations in Tamil Nadu
                </p>

                <div className="grid grid-cols-2 gap-3 pb-2">
                  {DESTINATIONS.map((dest) => {
                    const isSelected = selectedDestination === dest.name;
                    return (
                      <motion.div
                        key={dest.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedDestination(dest.name)}
                        className={`relative rounded-2xl bg-white transition-all overflow-hidden cursor-pointer flex flex-col ${
                          isSelected
                            ? 'border-2 border-[#581420] shadow-md bg-[#FAF0E6]/30 ring-2 ring-[#581420]/20'
                            : 'border border-stone-200 hover:border-stone-300 shadow-2xs'
                        }`}
                      >
                        <div className="relative w-full h-[105px] bg-stone-100 overflow-hidden">
                          <img
                            src={dest.image}
                            alt={dest.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute top-2 right-2">
                            {isSelected ? (
                              <div className="w-5.5 h-5.5 rounded-full bg-[#581420] border-2 border-white shadow-xs flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                              </div>
                            ) : (
                              <div className="w-5.5 h-5.5 rounded-full bg-white/85 backdrop-blur-xs border border-stone-300 shadow-xs" />
                            )}
                          </div>
                        </div>
                        <div className="p-2.5 flex items-center gap-2 bg-white flex-1">
                          <div className="w-6.5 h-6.5 rounded-full bg-[#FAF0E6] flex items-center justify-center flex-shrink-0">
                            {dest.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-[12.5px] text-[#2B1D1D] leading-tight break-words">
                              {dest.name}
                            </h3>
                            <p className="text-[10.5px] text-[#7E6E6E] truncate leading-tight mt-0.5 font-medium">
                              {dest.subtitle}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="px-4 py-3 bg-[#FAF8F5] border-t border-stone-200/60 shadow-[0_-4px_15px_rgba(0,0,0,0.03)] z-10">
                <button
                  type="button"
                  disabled={!selectedDestination}
                  onClick={() => setStep(2)}
                  className={`w-full py-3.5 px-4 bg-[#581420] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    !selectedDestination ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#420E18] active:scale-[0.99]'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ---------------- SCREEN 2: DESTINATION DETAILS ---------------- */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 flex flex-col"
            >
              <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
                <h1 className="font-serif-brand font-bold text-[22px] text-[#2B1D1D] leading-snug">
                  {selectedDestination} Destination Wedding
                </h1>
                <p className="text-xs text-[#6B5E5E] font-medium mt-0.5 mb-5">
                  {getDestinationSubtitle(selectedDestination)}
                </p>

                <h3 className="font-bold text-[15px] text-[#2B1D1D] mb-3">Popular Experiences</h3>
                
                <div className="space-y-3 pb-2">
                  {getExperiencesForDestination(selectedDestination).map((exp) => {
                    const isSelected = selectedExperience === exp;
                    return (
                      <div 
                        key={exp}
                        onClick={() => setSelectedExperience(exp)}
                        className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                          isSelected ? 'border-[#581420] bg-[#FAF0E6]/50 shadow-sm' : 'border-stone-200 bg-white hover:border-[#581420]/30'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-[#581420]' : 'border-stone-300'
                        }`}>
                          {isSelected && <div className="w-2.5 h-2.5 bg-[#581420] rounded-full" />}
                        </div>
                        <span className={`font-semibold text-sm ${isSelected ? 'text-[#581420]' : 'text-stone-700'}`}>
                          {exp}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="px-4 py-3 bg-[#FAF8F5] border-t border-stone-200/60 shadow-[0_-4px_15px_rgba(0,0,0,0.03)] z-10">
                <button
                  type="button"
                  disabled={!selectedExperience}
                  onClick={() => setStep(3)}
                  className={`w-full py-3.5 px-4 bg-[#581420] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    !selectedExperience ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#420E18] active:scale-[0.99]'
                  }`}
                >
                  <span>View Venues</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ---------------- SCREEN 4: CHOOSE VENUE ---------------- */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 flex flex-col"
            >
              <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
                <h1 className="font-serif-brand font-bold text-[22px] text-[#2B1D1D] leading-snug">
                  Top Venues in {selectedDestination}
                </h1>
                <p className="text-xs text-[#6B5E5E] font-medium mt-0.5 mb-5">
                  Select a venue that fits your dream wedding
                </p>

                <div className="space-y-4 pb-2">
                  {(() => {
                    let filteredVenues = VENUES.filter(v => v.location === selectedDestination || v.location.includes(selectedDestination.split(' ')[0]));
                    if (filteredVenues.length === 0) {
                      filteredVenues = VENUES.filter(v => v.location === 'Any').slice(0, 3);
                    }
                    return filteredVenues.map((venue) => {
                      const isSelected = selectedVenue === venue.name;
                      return (
                        <motion.div
                          key={venue.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedVenue(venue.name)}
                          className={`rounded-2xl overflow-hidden border transition-all cursor-pointer ${
                            isSelected ? 'border-2 border-[#581420] shadow-md' : 'border-stone-200 shadow-sm hover:shadow-md'
                          }`}
                        >
                          <div className="h-32 w-full bg-stone-100 relative">
                             <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
                             {isSelected && (
                               <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#581420] flex items-center justify-center shadow-md">
                                 <Check className="w-4 h-4 text-white stroke-[3]" />
                               </div>
                             )}
                          </div>
                          <div className="p-3 bg-white flex flex-col gap-1">
                            <h3 className="font-bold text-[15px] text-[#2B1D1D]">{venue.name}</h3>
                            <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
                              <span className="text-[#581420] font-semibold">{venue.price}</span>
                              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {venue.guests}</span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    });
                  })()}
                </div>
              </div>

              <div className="px-4 py-3 bg-[#FAF8F5] border-t border-stone-200/60 shadow-[0_-4px_15px_rgba(0,0,0,0.03)] z-10">
                <button
                  type="button"
                  disabled={!selectedVenue}
                  onClick={() => setStep(5)}
                  className={`w-full py-3.5 px-4 bg-[#581420] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    !selectedVenue ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#420E18] active:scale-[0.99]'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ---------------- SCREEN 5: WEDDING DETAILS ---------------- */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 flex flex-col"
            >
              <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
                <h1 className="font-serif-brand font-bold text-[22px] text-[#2B1D1D] leading-snug">
                  Tell us about your wedding
                </h1>
                <p className="text-xs text-[#6B5E5E] font-medium mt-0.5 mb-5">
                  Provide some details to help us plan better
                </p>

                <div className="space-y-4 pb-2">
                  {/* Wedding Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-stone-600">Wedding Date</label>
                    <div className="relative bg-white border border-stone-200 rounded-xl p-3.5 flex items-center justify-between cursor-pointer hover:border-[#581420]/40">
                      <span className={`text-sm font-semibold ${weddingDate ? 'text-[#2B1D1D]' : 'text-stone-400'}`}>
                        {weddingDate ? new Date(weddingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select date'}
                      </span>
                      <Calendar className="w-4 h-4 text-stone-400" />
                      <input
                        type="date"
                        value={weddingDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setWeddingDate(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-stone-600">Guests</label>
                    <div className="relative bg-white border border-stone-200 rounded-xl p-3.5 flex items-center justify-between cursor-pointer hover:border-[#581420]/40">
                      <span className={`text-sm font-semibold ${guestCount ? 'text-[#2B1D1D]' : 'text-stone-400'}`}>
                        {guestCount || 'Select guests'}
                      </span>
                      <Users className="w-4 h-4 text-stone-400" />
                      <select 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                      >
                        <option value="" disabled>Select guests</option>
                        <option value="Up to 100">Up to 100</option>
                        <option value="100 - 250">100 - 250</option>
                        <option value="250 - 500">250 - 500</option>
                        <option value="500+">500+</option>
                      </select>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-stone-600">Duration</label>
                    <div className="relative bg-white border border-stone-200 rounded-xl p-3.5 flex items-center justify-between cursor-pointer hover:border-[#581420]/40">
                      <span className={`text-sm font-semibold ${duration ? 'text-[#2B1D1D]' : 'text-stone-400'}`}>
                        {duration || 'Select duration'}
                      </span>
                      <Clock className="w-4 h-4 text-stone-400" />
                      <select 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      >
                        <option value="" disabled>Select duration</option>
                        <option value="1 Day">1 Day</option>
                        <option value="2 Days">2 Days</option>
                        <option value="3 Days">3 Days</option>
                        <option value="4+ Days">4+ Days</option>
                      </select>
                    </div>
                  </div>

                  {/* Number of Events */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-stone-600">Number of Events</label>
                    <div className="relative bg-white border border-stone-200 rounded-xl p-3.5 flex items-center justify-between cursor-pointer hover:border-[#581420]/40">
                      <span className={`text-sm font-semibold ${events ? 'text-[#2B1D1D]' : 'text-stone-400'}`}>
                        {events || 'Select events'}
                      </span>
                      <ListPlus className="w-4 h-4 text-stone-400" />
                      <select 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        value={events}
                        onChange={(e) => setEvents(e.target.value)}
                      >
                        <option value="" disabled>Select events</option>
                        <option value="1-2 Events">1-2 Events</option>
                        <option value="3-4 Events">3-4 Events</option>
                        <option value="5+ Events">5+ Events</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-[#FAF8F5] border-t border-stone-200/60 shadow-[0_-4px_15px_rgba(0,0,0,0.03)] z-10">
                <button
                  type="button"
                  disabled={!weddingDate || !guestCount || !duration || !events}
                  onClick={() => setStep(6)}
                  className={`w-full py-3.5 px-4 bg-[#581420] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    (!weddingDate || !guestCount || !duration || !events) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#420E18] active:scale-[0.99]'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ---------------- SCREEN 3: BUDGET ---------------- */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 flex flex-col"
            >
              <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
                <h1 className="font-serif-brand font-bold text-[22px] text-[#2B1D1D] leading-snug">
                  What's your budget?
                </h1>
                <p className="text-xs text-[#6B5E5E] font-medium mt-0.5 mb-5">
                  This helps us curate the best vendors within your range
                </p>

                <div className="space-y-3 pb-2">
                  {BUDGET_OPTIONS.map((budget) => {
                    const isSelected = selectedBudget === budget;
                    return (
                      <div 
                        key={budget}
                        onClick={() => setSelectedBudget(budget)}
                        className={`p-4 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${
                          isSelected ? 'border-[#581420] bg-[#FAF0E6]/50 shadow-sm' : 'border-stone-200 bg-white hover:border-[#581420]/30'
                        }`}
                      >
                        <span className={`font-bold text-sm ${isSelected ? 'text-[#581420]' : 'text-stone-700'}`}>
                          {budget}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="px-4 py-3 bg-[#FAF8F5] border-t border-stone-200/60 shadow-[0_-4px_15px_rgba(0,0,0,0.03)] z-10">
                <button
                  type="button"
                  disabled={!selectedBudget}
                  onClick={() => setStep(4)}
                  className={`w-full py-3.5 px-4 bg-[#581420] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    !selectedBudget ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#420E18] active:scale-[0.99]'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ---------------- SCREEN 6 REMOVED ---------------- */}

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
                            <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-100 shadow-sm">
                              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                                {item.description}
                              </p>
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
                  onClick={() => setStep(1)}
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
