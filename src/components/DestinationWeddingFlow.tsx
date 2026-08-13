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

// Import local wedding style images
import guestStageImg from '../assets/images/guest_banquet_hall_stage_1786471284070.jpg';
import hinduCoupleImg from '../assets/images/hindu_couple_arch_1786467605789.jpg';

export interface DestinationWeddingData {
  destination: string;
  weddingStyles: string[];
  weddingDate: string;
  guestCount: string;
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
  {
    id: 'Mahabalipuram',
    name: 'Mahabalipuram',
    subtitle: 'Beach Wedding',
    image: mahabalipuramImg,
    icon: <Waves className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Ooty',
    name: 'Ooty',
    subtitle: 'Hill Station',
    image: ootyImg,
    icon: <Mountain className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Kodaikanal',
    name: 'Kodaikanal',
    subtitle: 'Nature Wedding',
    image: kodaikanalImg,
    icon: <Trees className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Yercaud',
    name: 'Yercaud',
    subtitle: 'Hills & Peaceful',
    image: yercaudImg,
    icon: <Sun className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Chennai',
    name: 'Chennai',
    subtitle: 'Luxury / Grand',
    image: chennaiImg,
    icon: <Crown className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Pollachi',
    name: 'Pollachi',
    subtitle: 'Natural / Resort',
    image: pollachiImg,
    icon: <Palmtree className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Madurai',
    name: 'Madurai',
    subtitle: 'Cultural & Heritage',
    image: maduraiImg,
    icon: <Landmark className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Thanjavur',
    name: 'Thanjavur',
    subtitle: 'Royal Chola Heritage',
    image: thanjavurImg,
    icon: <Castle className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Chettinad',
    name: 'Chettinad',
    subtitle: 'Heritage Mansion',
    image: chettinadImg,
    icon: <Sparkles className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Kanyakumari',
    name: 'Kanyakumari',
    subtitle: 'Ocean & Sunset View',
    image: kanyakumariImg,
    icon: <Compass className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Rameswaram',
    name: 'Rameswaram',
    subtitle: 'Island & Coastal',
    image: rameswaramImg,
    icon: <Anchor className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Courtallam',
    name: 'Courtallam',
    subtitle: 'Waterfalls & Nature',
    image: courtallamImg,
    icon: <Trees className="w-3.5 h-3.5 text-[#581420]" />,
  },
];

interface StyleCard {
  id: string;
  name: string;
  image: string;
  icon: React.ReactNode;
}

const WEDDING_STYLES: StyleCard[] = [
  {
    id: 'Beach Wedding',
    name: 'Beach Wedding',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=600&q=80',
    icon: <Waves className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Hill Wedding',
    name: 'Hill Wedding',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80',
    icon: <Mountain className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Resort Wedding',
    name: 'Resort Wedding',
    image: guestStageImg,
    icon: <Castle className="w-3.5 h-3.5 text-[#581420]" />,
  },
  {
    id: 'Traditional Wedding',
    name: 'Traditional Wedding',
    image: hinduCoupleImg,
    icon: <Flower2 className="w-3.5 h-3.5 text-[#581420]" />,
  },
];

const GUEST_OPTIONS = [
  { id: 'g100', label: 'Up to 100', sublabel: 'Guests', value: 'Up to 100 Guests' },
  { id: 'g250', label: '100 – 250', sublabel: 'Guests', value: '100 – 250 Guests' },
  { id: 'g500', label: '250 – 500', sublabel: 'Guests', value: '250 – 500 Guests' },
  { id: 'g500plus', label: '500+', sublabel: 'Guests', value: '500+ Guests' },
];

export const DestinationWeddingFlow: React.FC<DestinationWeddingFlowProps> = ({
  onBack,
  onComplete,
  onExploreVenues,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form selections state
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [weddingDate, setWeddingDate] = useState<string>('');
  const [guestCount, setGuestCount] = useState<string>('');

  // Handle Back arrow
  const handleBack = () => {
    if (step === 1) {
      onBack();
    } else {
      setStep((prev) => prev - 1);
    }
  };

  // Toggle style selection in Screen 2
  const toggleStyle = (styleName: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleName)
        ? prev.filter((s) => s !== styleName)
        : [...prev, styleName]
    );
  };

  // Handle final completion in Screen 3
  const handleFinishScreen3 = () => {
    const data: DestinationWeddingData = {
      destination: selectedDestination,
      weddingStyles: selectedStyles,
      weddingDate,
      guestCount,
    };
    try {
      localStorage.setItem('destination_wedding_plan', JSON.stringify(data));
    } catch {
      // ignore storage errors
    }
    if (onComplete) {
      onComplete(data);
    }
    setStep(4);
  };

  // Format date helper for display
  const getFormattedDateDisplay = () => {
    if (!weddingDate) return 'Select Wedding Date';
    try {
      const d = new Date(weddingDate);
      if (isNaN(d.getTime())) return weddingDate;
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return weddingDate;
    }
  };

  return (
    <div className="w-full h-full max-w-md mx-auto bg-[#FAF8F5] flex flex-col min-h-screen text-[#1F1E1C] select-none font-sans-brand">
      {/* ================= TOP HEADER ================= */}
      <div className="px-4 pt-4 pb-2 bg-[#FAF8F5] border-b border-stone-200/60 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={handleBack}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 border border-stone-200 hover:bg-white text-stone-700 transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5 text-[#2B1D1D]" />
          </button>

          <h2 className="font-serif-brand font-semibold text-lg text-[#581420] tracking-wide">
            Destination Wedding
          </h2>

          <div className="w-8" />
        </div>

        {/* Progress Indicator Dots */}
        <div className="flex items-center justify-center gap-2 px-12 py-1">
          {/* Node 1 */}
          <div
            className={`transition-all duration-300 flex items-center justify-center ${
              step >= 1
                ? 'w-3.5 h-3.5 rounded-full bg-[#581420] ring-2 ring-[#581420] ring-offset-1 ring-offset-[#FAF8F5]'
                : 'w-2.5 h-2.5 rounded-full bg-stone-300'
            }`}
          />

          {/* Line 1-2 */}
          <div
            className={`flex-1 h-[2px] transition-colors duration-300 ${
              step >= 2 ? 'bg-[#581420]' : 'bg-stone-300'
            }`}
          />

          {/* Node 2 */}
          <div
            className={`transition-all duration-300 flex items-center justify-center ${
              step >= 2
                ? 'w-3.5 h-3.5 rounded-full bg-[#581420] ring-2 ring-[#581420] ring-offset-1 ring-offset-[#FAF8F5]'
                : 'w-2.5 h-2.5 rounded-full bg-stone-300'
            }`}
          />

          {/* Line 2-3 */}
          <div
            className={`flex-1 h-[2px] transition-colors duration-300 ${
              step >= 3 ? 'bg-[#581420]' : 'bg-stone-300'
            }`}
          />

          {/* Node 3 */}
          <div
            className={`transition-all duration-300 flex items-center justify-center ${
              step >= 3
                ? 'w-3.5 h-3.5 rounded-full bg-[#581420] ring-2 ring-[#581420] ring-offset-1 ring-offset-[#FAF8F5]'
                : 'w-2.5 h-2.5 rounded-full bg-stone-300'
            }`}
          />
        </div>
      </div>

      {/* ================= STEP CONTENT BODY ================= */}
      <div className="flex-1 px-4 pt-3 pb-28 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* ---------------- SCREEN 1: CHOOSE DESTINATION ---------------- */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col h-full justify-between gap-4"
            >
              <div>
                {/* Heading */}
                <h1 className="font-serif-brand font-bold text-[22px] text-[#2B1D1D] leading-snug">
                  Where would you love to celebrate in Tamil Nadu? ✨
                </h1>
                <p className="text-xs text-[#6B5E5E] font-medium mt-0.5 mb-3.5">
                  Pick your favorite destination from 12 iconic spots
                </p>

                {/* Destinations 2x6 Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
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
                        {/* Image banner */}
                        <div className="relative w-full h-[105px] bg-stone-100 overflow-hidden">
                          <img
                            src={dest.image}
                            alt={dest.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                          {/* Top-Right Selection Indicator */}
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

                        {/* Title & Subtitle */}
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

              {/* Bottom Sticky Action Area */}
              <div className="sticky bottom-0 bg-[#FAF8F5]/95 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 border-t border-stone-200/60 z-30 shadow-lg">
                {/* Primary Button */}
                <button
                  type="button"
                  disabled={!selectedDestination}
                  onClick={() => setStep(2)}
                  className={`w-full py-3.5 px-4 bg-[#581420] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    !selectedDestination
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-[#420E18] active:scale-[0.99]'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ---------------- SCREEN 2: WHAT'S YOUR VIBE? ---------------- */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col h-full justify-between gap-4"
            >
              <div>
                {/* Heading */}
                <h1 className="font-serif-brand font-bold text-[22px] text-[#2B1D1D] leading-snug">
                  What kind of wedding are you dreaming of? 💕
                </h1>
                <p className="text-xs text-[#6B5E5E] font-medium mt-0.5 mb-3.5">
                  Choose one or more styles you love
                </p>

                {/* Style 2x2 Grid */}
                <div className="grid grid-cols-2 gap-3.5 mb-4">
                  {WEDDING_STYLES.map((style) => {
                    const isSelected = selectedStyles.includes(style.name);
                    return (
                      <motion.div
                        key={style.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => toggleStyle(style.name)}
                        className={`relative rounded-2xl bg-white transition-all overflow-hidden cursor-pointer flex flex-col ${
                          isSelected
                            ? 'border-2 border-[#581420] shadow-sm bg-[#FAF0E6]/20'
                            : 'border border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {/* Image banner */}
                        <div className="relative w-full h-[125px] bg-stone-100 overflow-hidden">
                          <img
                            src={style.image}
                            alt={style.name}
                            className="w-full h-full object-cover"
                          />
                          {/* Selection indicator */}
                          <div className="absolute top-2.5 right-2.5">
                            {isSelected ? (
                              <div className="w-5.5 h-5.5 rounded-full bg-[#581420] border-2 border-white shadow-xs flex items-center justify-center text-white">
                                <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                              </div>
                            ) : (
                              <div className="w-5.5 h-5.5 rounded-full bg-white/80 backdrop-blur-xs border border-stone-300" />
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <div className="p-3 flex items-center gap-2 bg-white flex-1">
                          <div className="w-6.5 h-6.5 rounded-full bg-[#FAF0E6] flex items-center justify-center flex-shrink-0">
                            {style.icon}
                          </div>
                          <h3 className="font-bold text-[13px] text-[#2B1D1D] leading-tight flex-1">
                            {style.name}
                          </h3>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Sticky Action Area */}
              <div className="sticky bottom-0 bg-[#FAF8F5]/95 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 border-t border-stone-200/60 z-30 space-y-2.5 shadow-lg">
                {/* Soft Info Panel */}
                <div className="bg-[#FDF2F2] border border-[#F5D5D5] rounded-xl p-2.5 flex items-center justify-center gap-2 text-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#581420] flex-shrink-0" />
                  <span className="text-[12px] font-medium text-[#581420]">
                    {selectedStyles.length > 0
                      ? `${selectedStyles.length} style${selectedStyles.length > 1 ? 's' : ''} selected`
                      : "You can select more than one. We'll show all matching options!"}
                  </span>
                </div>

                {/* Primary Button */}
                <button
                  type="button"
                  disabled={selectedStyles.length === 0}
                  onClick={() => setStep(3)}
                  className={`w-full py-3.5 px-4 bg-[#581420] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    selectedStyles.length === 0
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-[#420E18] active:scale-[0.99]'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ---------------- SCREEN 3: TELL US MORE ---------------- */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col h-full justify-between gap-4"
            >
              <div>
                {/* Heading */}
                <h1 className="font-serif-brand font-bold text-[22px] text-[#2B1D1D] leading-snug">
                  A few quick details ✨
                </h1>
                <p className="text-xs text-[#6B5E5E] font-medium mt-0.5 mb-5">
                  This helps us find perfect matches for you
                </p>

                {/* QUESTION 1: Wedding Date */}
                <div className="mb-5">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#FDE8E8] flex items-center justify-center text-[#581420] flex-shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[15px] text-[#2B1D1D]">
                      When is your wedding?
                    </h3>
                  </div>

                  {/* Interactive Date Picker Container */}
                  <div className="relative bg-white border border-stone-200 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:border-[#581420]/40 transition-colors shadow-2xs">
                    <span
                      className={`text-sm font-semibold ${
                        weddingDate ? 'text-[#2B1D1D]' : 'text-stone-400'
                      }`}
                    >
                      {getFormattedDateDisplay()}
                    </span>

                    <div className="flex items-center gap-1.5 text-stone-400">
                      <Calendar className="w-4 h-4 text-[#581420]" />
                      <ChevronRight className="w-4 h-4 text-stone-400" />
                    </div>

                    {/* Invisible HTML5 date input overlay for standard date picking */}
                    <input
                      type="date"
                      value={weddingDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setWeddingDate(e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Dashed Divider */}
                <div className="w-full border-t border-dashed border-stone-300/70 my-5" />

                {/* QUESTION 2: Guests Count */}
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="w-8 h-8 rounded-xl bg-[#FDE8E8] flex items-center justify-center text-[#581420] flex-shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[15px] text-[#2B1D1D] leading-tight">
                        How many guests are you expecting?
                      </h3>
                      <p className="text-[11.5px] text-stone-500 font-medium">
                        Select approximate number
                      </p>
                    </div>
                  </div>

                  {/* 4 Guest Count Options Grid */}
                  <div className="grid grid-cols-4 gap-2 mt-3.5">
                    {GUEST_OPTIONS.map((opt) => {
                      const isSelected = guestCount === opt.value;
                      return (
                        <motion.div
                          key={opt.id}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setGuestCount(opt.value)}
                          className={`rounded-2xl border p-2.5 flex flex-col items-center justify-center gap-1 text-center cursor-pointer min-h-[85px] transition-all ${
                            isSelected
                              ? 'border-2 border-[#581420] bg-[#FAF0E6]/50 text-[#581420] shadow-2xs'
                              : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                          }`}
                        >
                          <Users
                            className={`w-4 h-4 ${
                              isSelected ? 'text-[#581420]' : 'text-stone-500'
                            }`}
                          />
                          <span className="text-[11.5px] font-bold leading-tight">
                            {opt.label}
                          </span>
                          <span className="text-[10px] text-stone-500 font-medium leading-tight">
                            {opt.sublabel}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Sticky Action Area */}
              <div className="sticky bottom-0 bg-[#FAF8F5]/95 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 border-t border-stone-200/60 z-30 space-y-2.5 shadow-lg">
                {/* Soft Info Panel */}
                <div className="bg-[#FDF2F2] border border-[#F5D5D5] rounded-xl p-2.5 flex items-center justify-center gap-2 text-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#581420] flex-shrink-0" />
                  <span className="text-[12px] font-medium text-[#581420]">
                    We'll show the best venues and services based on your preferences! ✨
                  </span>
                </div>

                {/* Primary Button */}
                <button
                  type="button"
                  disabled={!weddingDate || !guestCount}
                  onClick={handleFinishScreen3}
                  className={`w-full py-3.5 px-4 bg-[#581420] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    !weddingDate || !guestCount
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-[#420E18] active:scale-[0.99]'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ---------------- SCREEN 4: CONFIRMATION & VENUE DISCOVERY ---------------- */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center justify-between h-full py-2 gap-4"
            >
              <div className="w-full flex flex-col items-center my-auto">
                <div className="w-16 h-16 rounded-full bg-[#FAF0E6] text-[#581420] flex items-center justify-center mb-3 shadow-inner">
                  <CheckCircle2 className="w-9 h-9 text-[#581420]" />
                </div>

                <h1 className="font-serif-brand font-bold text-2xl text-[#2B1D1D] mb-1">
                  Destination Wedding Set! ✨
                </h1>
                <p className="text-xs text-stone-600 max-w-xs mb-6 font-medium">
                  We've curated top venues and luxury packages tailored for your Tamil Nadu wedding.
                </p>

                {/* Summary Card */}
                <div className="w-full bg-white border border-stone-200 rounded-2xl p-4 text-left shadow-2xs space-y-3 mb-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="text-xs text-stone-500 font-medium">Destination</span>
                    <span className="text-xs font-bold text-[#581420] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedDestination}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="text-xs text-stone-500 font-medium">Wedding Vibe</span>
                    <span className="text-xs font-bold text-[#2B1D1D]">
                      {selectedStyles.join(', ') || 'Custom'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="text-xs text-stone-500 font-medium">Target Date</span>
                    <span className="text-xs font-bold text-[#2B1D1D]">
                      {getFormattedDateDisplay()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-500 font-medium">Expected Guests</span>
                    <span className="text-xs font-bold text-[#2B1D1D]">{guestCount}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-2.5 pb-4 mt-auto">
                <button
                  type="button"
                  onClick={() => {
                    if (onExploreVenues) {
                      onExploreVenues();
                    } else {
                      onBack();
                    }
                  }}
                  className="w-full py-3.5 px-4 bg-[#581420] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-sm hover:bg-[#420E18] transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Matching Venues</span>
                </button>

                <button
                  type="button"
                  onClick={onBack}
                  className="w-full py-2.5 text-stone-600 font-semibold text-xs hover:text-[#581420] transition-colors cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
