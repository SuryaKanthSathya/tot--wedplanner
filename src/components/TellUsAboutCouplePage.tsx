import React, { useState } from 'react';
import exactWeddingCoupleImg from '../assets/images/exact_wedding_couple_1786457746200.jpg';
import christianCoupleImg from '../assets/images/christian_couple_arch_1786467622108.jpg';
import muslimCoupleImg from '../assets/images/muslim_couple_arch_1786467635401.jpg';
import intercasteCoupleImg from '../assets/images/intercaste_couple_arch_new_1786468081966.jpg';
import templeImg from '../assets/images/kanchipuram_temple_1786470394211.jpg';
import churchImg from '../assets/images/christian_couple_arch_1786467622108.jpg';
import masjidImg from '../assets/images/muslim_couple_arch_1786467635401.jpg';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  Check,
  Calendar as CalendarIcon,
  Search,
  MapPin,
  X,
  Users,
  Plus,
  Minus,
  Heart,
  Wallet,
  Sparkles,
  User,
} from 'lucide-react';

interface TellUsAboutCouplePageProps {
  initialBrideName?: string;
  onBack: () => void;
  onContinue: (data: {
    marriageType: string;
    brideName: string;
    groomName: string;
    weddingDate: string;
    location: string;
    guestCount?: string;
    budget?: string;
    weddingStyle?: string;
  }) => void;
}

interface DistrictItem {
  name: string;
  district: string;
  famousPlace: string;
  image: string;
}

const TAMIL_NADU_DISTRICTS_RAW: DistrictItem[] = [
  {
    name: 'Ariyalur, Tamil Nadu',
    district: 'Ariyalur',
    famousPlace: 'Gangaikonda Cholapuram Temple Heritage',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Chengalpattu, Tamil Nadu',
    district: 'Chengalpattu',
    famousPlace: 'Mahabalipuram Shore Temple & Beach',
    image: '/src/assets/images/mahabalipuram_shore_temple_1786470287462.jpg',
  },
  {
    name: 'Chennai, Tamil Nadu',
    district: 'Chennai',
    famousPlace: 'Ripon Building & Marina Beach',
    image: '/src/assets/images/chennai_landmark_pic_1786469508338.jpg',
  },
  {
    name: 'Coimbatore, Tamil Nadu',
    district: 'Coimbatore',
    famousPlace: 'Adiyogi Shiva & Marudhamalai Temple',
    image: '/src/assets/images/coimbatore_adiyogi_shiva_1786470303170.jpg',
  },
  {
    name: 'Cuddalore, Tamil Nadu',
    district: 'Cuddalore',
    famousPlace: 'Pichavaram Mangrove Forest & Silver Beach',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Dharmapuri, Tamil Nadu',
    district: 'Dharmapuri',
    famousPlace: 'Hogenakkal Waterfalls & Kaveri River',
    image: '/src/assets/images/dharmapuri_hogenakkal_falls_1786470329010.jpg',
  },
  {
    name: 'Dindigul, Tamil Nadu',
    district: 'Dindigul',
    famousPlace: 'Kodaikanal Lake & Palani Murugan Temple',
    image: '/src/assets/images/dindigul_kodaikanal_lake_1786470315614.jpg',
  },
  {
    name: 'Erode, Tamil Nadu',
    district: 'Erode',
    famousPlace: 'Bhavani Sangameshwarar Temple & Kaveri',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Kallakurichi, Tamil Nadu',
    district: 'Kallakurichi',
    famousPlace: 'Kalvarayan Hills & Megam Falls',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Kanchipuram, Tamil Nadu',
    district: 'Kanchipuram',
    famousPlace: 'Kanchi Silk Heritage & Ekambareswarar Temple',
    image: '/src/assets/images/kanchipuram_temple_1786470394211.jpg',
  },
  {
    name: 'Kanniyakumari, Tamil Nadu',
    district: 'Kanniyakumari',
    famousPlace: 'Thiruvalluvar Statue & Vivekananda Rock Beach',
    image: '/src/assets/images/kanniyakumari_landmark_pic_1786469622086.jpg',
  },
  {
    name: 'Karur, Tamil Nadu',
    district: 'Karur',
    famousPlace: 'Pasupatheeswarar Temple & Textile Heritage',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Krishnagiri, Tamil Nadu',
    district: 'Krishnagiri',
    famousPlace: 'Krishnagiri Dam & Ancient Hill Fort',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Madurai, Tamil Nadu',
    district: 'Madurai',
    famousPlace: 'Meenakshi Amman Temple & Nayakar Palace',
    image: '/src/assets/images/madurai_landmark_pic_1786469701562.jpg',
  },
  {
    name: 'Mayiladuthurai, Tamil Nadu',
    district: 'Mayiladuthurai',
    famousPlace: 'Mayuranathaswamy Temple & Poompuhar Beach',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Nagapattinam, Tamil Nadu',
    district: 'Nagapattinam',
    famousPlace: 'Velankanni Basilica Shrine & Coastal Heritage',
    image: '/src/assets/images/nagapattinam_velankanni_1786470407162.jpg',
  },
  {
    name: 'Namakkal, Tamil Nadu',
    district: 'Namakkal',
    famousPlace: 'Namakkal Anjaneyar Temple & Rock Fort',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Nilgiris (Ooty), Tamil Nadu',
    district: 'Nilgiris',
    famousPlace: 'Ooty Tea Gardens & Mountain Railway',
    image: '/src/assets/images/ooty_nilgiris_tea_pic_1786469767982.jpg',
  },
  {
    name: 'Perambalur, Tamil Nadu',
    district: 'Perambalur',
    famousPlace: 'Ranjankudi Historic Fort & Monuments',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Pudukkottai, Tamil Nadu',
    district: 'Pudukkottai',
    famousPlace: 'Sittanavasal Rock Cave & Thirumayam Fort',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ramanathapuram, Tamil Nadu',
    district: 'Ramanathapuram',
    famousPlace: 'Pamban Sea Bridge & Rameshwaram Temple',
    image: '/src/assets/images/ramanathapuram_pamban_bridge_1786470340546.jpg',
  },
  {
    name: 'Ranipet, Tamil Nadu',
    district: 'Ranipet',
    famousPlace: 'Arcot Heritage Clock Tower & Palar River',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Salem, Tamil Nadu',
    district: 'Salem',
    famousPlace: 'Yercaud Shevaroy Hills & Mettur Dam',
    image: '/src/assets/images/salem_yercaud_hills_1786470445272.jpg',
  },
  {
    name: 'Sivaganga, Tamil Nadu',
    district: 'Sivaganga',
    famousPlace: 'Chettinad Heritage Palace Architecture',
    image: '/src/assets/images/tn_heritage_palace_pic_1786469719545.jpg',
  },
  {
    name: 'Tenkasi, Tamil Nadu',
    district: 'Tenkasi',
    famousPlace: 'Courtallam Waterfalls & Kasi Viswanathar Temple',
    image: '/src/assets/images/tenkasi_courtallam_falls_1786470431410.jpg',
  },
  {
    name: 'Thanjavur, Tamil Nadu',
    district: 'Thanjavur',
    famousPlace: 'Brihadishvara Temple (Big Temple)',
    image: '/src/assets/images/thanjavur_big_temple_pic_1786469751090.jpg',
  },
  {
    name: 'Theni, Tamil Nadu',
    district: 'Theni',
    famousPlace: 'Meghamalai Tea Estates & Suruli Falls',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Thoothukudi, Tamil Nadu',
    district: 'Thoothukudi',
    famousPlace: 'Our Lady of Snows Basilica & Pearl Harbor',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Tiruchirappalli (Trichy), Tamil Nadu',
    district: 'Tiruchirappalli',
    famousPlace: 'Rockfort Temple & Srirangam Ranganathar',
    image: '/src/assets/images/trichy_rockfort_temple_1786470354684.jpg',
  },
  {
    name: 'Tirunelveli, Tamil Nadu',
    district: 'Tirunelveli',
    famousPlace: 'Nellaiappar Temple & Tamirabarani River',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Tirupathur, Tamil Nadu',
    district: 'Tirupathur',
    famousPlace: 'Yelagiri Hill Station & Boating Lake',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Tiruppur, Tamil Nadu',
    district: 'Tiruppur',
    famousPlace: 'Chennimalai Murugan Temple & Textile Hub',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Tiruvallur, Tamil Nadu',
    district: 'Tiruvallur',
    famousPlace: 'Veeraraghavaswamy Temple & Poondi Dam',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Tiruvannamalai, Tamil Nadu',
    district: 'Tiruvannamalai',
    famousPlace: 'Annamalaiyar Temple & Arunachala Hill',
    image: '/src/assets/images/tiruvannamalai_temple_1786470366794.jpg',
  },
  {
    name: 'Tiruvarur, Tamil Nadu',
    district: 'Tiruvarur',
    famousPlace: 'Thyagaraja Swamy Temple & Royal Chariot',
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Vellore, Tamil Nadu',
    district: 'Vellore',
    famousPlace: 'Vellore Fort & Sripuram Golden Temple',
    image: '/src/assets/images/vellore_golden_temple_1786470382427.jpg',
  },
  {
    name: 'Viluppuram, Tamil Nadu',
    district: 'Viluppuram',
    famousPlace: 'Gingee Historic Fort Citadel',
    image: '/src/assets/images/gingee_fort_viluppuram_1786470418118.jpg',
  },
  {
    name: 'Virudhunagar, Tamil Nadu',
    district: 'Virudhunagar',
    famousPlace: 'Srivilliputhur Andal Temple Tower',
    image: 'https://images.unsplash.com/photo-1620067925093-801122ac1408?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'kayalpatinam, Tamil Nadu',
    district: 'kayalpatinam',
    famousPlace: 'kayalpatinam beach & Kaveri River',
    image: '/src/assets/images/kayalpatinam_beach_1786470329010.jpg',
  },
];

const TAMIL_NADU_DISTRICTS: DistrictItem[] = [...TAMIL_NADU_DISTRICTS_RAW].sort((a, b) =>
  a.name.localeCompare(b.name)
);

export const TellUsAboutCouplePage: React.FC<TellUsAboutCouplePageProps> = ({
  onBack,
  onContinue,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [marriageType, setMarriageType] = useState<string>('');
  const [brideName, setBrideName] = useState<string>('');
  const [groomName, setGroomName] = useState<string>('');
  const [weddingDate, setWeddingDate] = useState<string>('');
  const [weddingDateRaw, setWeddingDateRaw] = useState<string>('');

  // Location Step States (initially unselected as requested)
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [locationSearchQuery, setLocationSearchQuery] = useState<string>('');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState<boolean>(false);

  // Guests Step States (initially unselected as requested)
  const [selectedGuestRange, setSelectedGuestRange] = useState<string>('');
  const [customGuestCount, setCustomGuestCount] = useState<string>('1200');

  // Style Step State (initially unselected as requested)
  const [selectedStyle, setSelectedStyle] = useState<string>('');

  // Budget Step States & Range Definitions
  const BUDGET_STEPS = [
    { amount: 500000, label: '5 Lakhs' },
    { amount: 1000000, label: '10 Lakhs' },
    { amount: 1500000, label: '15 Lakhs' },
    { amount: 2000000, label: '20 Lakhs' },
    { amount: 2500000, label: '25 Lakhs' },
    { amount: 3500000, label: '35 Lakhs' },
    { amount: 5000000, label: '50 Lakhs' },
    { amount: 7500000, label: '75 Lakhs' },
    { amount: 10000000, label: '1 Crore' },
    { amount: 15000000, label: '1.5 Crores' },
    { amount: 20000000, label: '2 Crores' },
    { amount: 25000000, label: '2.5 Crores' },
    { amount: 30000000, label: '3 Crores' },
    { amount: 50000000, label: '5 Crores' },
    { amount: 100000000, label: '10 Crores+' },
  ];

  const [budgetIndex, setBudgetIndex] = useState<number>(2); // Default index 2 = 15 Lakhs
  const [customBudgetAmount, setCustomBudgetAmount] = useState<string>('');
  const [isEditingCustomBudget, setIsEditingCustomBudget] = useState<boolean>(false);

  const currentBudgetNum = customBudgetAmount
    ? parseInt(customBudgetAmount) || 1500000
    : BUDGET_STEPS[budgetIndex].amount;

  const formatIndianCurrency = (num: number) => {
    return '₹ ' + new Intl.NumberFormat('en-IN').format(num);
  };

  const formatBudgetSubtitle = (num: number) => {
    if (num >= 10000000) {
      const crores = num / 10000000;
      const formatted = crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(1);
      return `( ${formatted} ${crores === 1 ? 'Crore' : 'Crores'}${num >= 100000000 ? '+' : ''} )`;
    } else {
      const lakhs = num / 100000;
      const formatted = lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1);
      return `( ${formatted} Lakhs )`;
    }
  };

  const marriageOptions = [
    { id: 'Hindu', label: 'Hindu', description: 'Traditional Hindu wedding ceremonies & rituals' },
    { id: 'Christian', label: 'Christian', description: 'Classic church & Christian wedding traditions' },
    { id: 'Muslim', label: 'Muslim', description: 'Nikah & traditional Muslim wedding celebrations' },
    { id: 'Intercaste', label: 'Intercaste', description: 'Blended multi-cultural & intercaste celebrations' },
  ];

  const handleSelectMarriageType = (typeId: string) => {
    setMarriageType(typeId);
    // Reset inputs when switching marriage type so names don't persist across types
    setBrideName('');
    setGroomName('');
    setWeddingDate('');
    setWeddingDateRaw('');
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value; // YYYY-MM-DD
    setWeddingDateRaw(rawVal);
    if (rawVal) {
      const parts = rawVal.split('-');
      if (parts.length === 3) {
        const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        const formatted = dateObj.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
        setWeddingDate(formatted);
      } else {
        setWeddingDate(rawVal);
      }
    } else {
      setWeddingDate('');
    }
  };

  // Dynamic theme image mapping for Couple step
  const themeImages: Record<string, string> = {
    Hindu: '/src/assets/images/hindu_couple_arch_1786467605789.jpg',
    Christian: '/src/assets/images/christian_couple_arch_1786467622108.jpg',
    Muslim: '/src/assets/images/muslim_couple_arch_1786467635401.jpg',
    Intercaste: '/src/assets/images/intercaste_couple_arch_new_1786468081966.jpg',
  };

  // Find currently selected district details or default
  const selectedDistrictInfo =
    TAMIL_NADU_DISTRICTS.find(
      (d) =>
        d.name.toLowerCase() === selectedLocation.toLowerCase() ||
        d.district.toLowerCase() === selectedLocation.toLowerCase()
    ) || {
      name: selectedLocation || 'Tamil Nadu, India',
      district: 'Tamil Nadu',
      famousPlace: 'Grand Chettinad Heritage Palace & Wedding Venue',
      image: '/src/assets/images/tn_heritage_palace_pic_1786469719545.jpg',
    };

  const filteredDistricts = TAMIL_NADU_DISTRICTS.filter((item) =>
    item.name.toLowerCase().includes(locationSearchQuery.toLowerCase()) ||
    item.district.toLowerCase().includes(locationSearchQuery.toLowerCase())
  );

  const handleSelectDistrict = (item: DistrictItem) => {
    setSelectedLocation(item.name);
    setLocationSearchQuery(item.name);
    setIsLocationDropdownOpen(false);
  };

  const handleUseCurrentLocation = () => {
    const chennaiObj = TAMIL_NADU_DISTRICTS.find((d) => d.district === 'Chennai') || TAMIL_NADU_DISTRICTS[1];
    setSelectedLocation(chennaiObj.name);
    setLocationSearchQuery(chennaiObj.name);
    setIsLocationDropdownOpen(false);
  };

  const buildRecommendationText = () => {
    const parts = [];
    if (selectedStyle) parts.push(selectedStyle.toLowerCase());
    if (marriageType) parts.push(marriageType.toLowerCase());
    if (parts.length === 0) parts.push('traditional South Indian');
    parts.push('wedding');
    if (selectedLocation) parts.push(`in ${selectedLocation}`);

    return `A ${parts.join(' ')} with elegant decor, soulful music and premium photography is recommended for your special day.`;
  };

  const getProfileCouplePhoto = () => {
    if (marriageType === 'Christian Wedding' || marriageType === 'Christian') {
      return christianCoupleImg;
    }
    if (marriageType === 'Muslim Wedding' || marriageType === 'Muslim') {
      return muslimCoupleImg;
    }
    if (marriageType === 'Intercaste / Special Marriage' || marriageType === 'Intercaste') {
      return intercasteCoupleImg;
    }
    return exactWeddingCoupleImg;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setCurrentStep(5);
    } else if (currentStep === 5) {
      setCurrentStep(6);
    } else if (currentStep === 6) {
      setCurrentStep(7);
    } else {
      const finalGuestCount =
        selectedGuestRange === '1000+'
          ? `${customGuestCount || '1000'} Guests`
          : selectedGuestRange;
      const finalBudgetStr = `${formatIndianCurrency(currentBudgetNum)} ${formatBudgetSubtitle(currentBudgetNum)}`;
      onContinue({
        marriageType,
        brideName,
        groomName,
        weddingDate,
        location: selectedLocation,
        guestCount: finalGuestCount,
        budget: finalBudgetStr,
        weddingStyle: selectedStyle,
      });
    }
  };

  const handleHeaderBack = () => {
    if (currentStep === 7) {
      setCurrentStep(6);
    } else if (currentStep === 6) {
      setCurrentStep(5);
    } else if (currentStep === 5) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      onBack();
    }
  };

  // Get Page Title
  const getPageTitle = () => {
    if (currentStep === 1) return 'Marriage Type';
    if (currentStep === 2) return 'Tell us about the couple';
    if (currentStep === 3) return 'Where is your event location?';
    if (currentStep === 4) return 'How many guests are you expecting?';
    if (currentStep === 5) return "What's your estimated wedding budget?";
    return 'What type of wedding are you planning?';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full flex flex-col justify-between px-6 pt-5 pb-6 relative"
      style={{ backgroundColor: '#FAF6EE' }}
    >
      {/* Top Header Row with Back Arrow */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleHeaderBack}
          style={styles.backButton}
        >
          <ChevronLeft className="w-5 h-5 text-stone-800" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Main Section */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={{ flex: 1 }}
      >
        {/* Title & Stepper for Steps 1 - 6 */}
        {currentStep <= 6 && (
          <>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{getPageTitle()}</Text>
            </View>

            <View style={styles.stepperContainer}>
          <View style={styles.stepperTrackRow}>
            {/* Step 1: Type */}
            <View
              style={[
                styles.stepCircle,
                currentStep > 1
                  ? styles.stepCircleCompleted
                  : styles.stepCircleActive,
              ]}
            >
              {currentStep > 1 ? (
                <Check className="w-3 h-3 text-white" />
              ) : (
                <View style={styles.innerDotActive} />
              )}
            </View>

            <View
              style={[
                styles.stepLine,
                currentStep > 1 ? styles.stepLineCompleted : styles.stepLineInactive,
              ]}
            />

            {/* Step 2: Couple */}
            <View
              style={[
                styles.stepCircle,
                currentStep > 2
                  ? styles.stepCircleCompleted
                  : currentStep === 2
                  ? styles.stepCircleActive
                  : styles.stepCircleInactive,
              ]}
            >
              {currentStep > 2 ? (
                <Check className="w-3 h-3 text-white" />
              ) : currentStep === 2 ? (
                <View style={styles.innerDotActive} />
              ) : null}
            </View>

            <View
              style={[
                styles.stepLine,
                currentStep > 2 ? styles.stepLineCompleted : styles.stepLineInactive,
              ]}
            />

            {/* Step 3: Location */}
            <View
              style={[
                styles.stepCircle,
                currentStep > 3
                  ? styles.stepCircleCompleted
                  : currentStep === 3
                  ? styles.stepCircleActive
                  : styles.stepCircleInactive,
              ]}
            >
              {currentStep > 3 ? (
                <Check className="w-3 h-3 text-white" />
              ) : currentStep === 3 ? (
                <View style={styles.innerDotActive} />
              ) : null}
            </View>

            <View
              style={[
                styles.stepLine,
                currentStep > 3 ? styles.stepLineCompleted : styles.stepLineInactive,
              ]}
            />

            {/* Step 4: Guests */}
            <View
              style={[
                styles.stepCircle,
                currentStep > 4
                  ? styles.stepCircleCompleted
                  : currentStep === 4
                  ? styles.stepCircleActive
                  : styles.stepCircleInactive,
              ]}
            >
              {currentStep > 4 ? (
                <Check className="w-3 h-3 text-white" />
              ) : currentStep === 4 ? (
                <View style={styles.innerDotActive} />
              ) : null}
            </View>

            <View
              style={[
                styles.stepLine,
                currentStep > 4 ? styles.stepLineCompleted : styles.stepLineInactive,
              ]}
            />

            {/* Step 5: Budget */}
            <View
              style={[
                styles.stepCircle,
                currentStep > 5
                  ? styles.stepCircleCompleted
                  : currentStep === 5
                  ? styles.stepCircleActive
                  : styles.stepCircleInactive,
              ]}
            >
              {currentStep > 5 ? (
                <Check className="w-3 h-3 text-white" />
              ) : currentStep === 5 ? (
                <View style={styles.innerDotActive} />
              ) : null}
            </View>

            <View
              style={[
                styles.stepLine,
                currentStep > 5 ? styles.stepLineCompleted : styles.stepLineInactive,
              ]}
            />

            {/* Step 6: Style */}
            <View
              style={[
                styles.stepCircle,
                currentStep === 6
                  ? styles.stepCircleActive
                  : styles.stepCircleInactive,
              ]}
            >
              {currentStep === 6 ? <View style={styles.innerDotActive} /> : null}
            </View>
          </View>

          {/* Stepper Labels */}
          <View style={styles.stepperLabelsRow}>
            <Text
              style={[
                styles.stepLabel,
                currentStep > 1
                  ? styles.stepLabelCompleted
                  : styles.stepLabelActive,
              ]}
            >
              Type
            </Text>
            <Text
              style={[
                styles.stepLabel,
                currentStep > 2
                  ? styles.stepLabelCompleted
                  : currentStep === 2
                  ? styles.stepLabelActive
                  : styles.stepLabelInactive,
              ]}
            >
              Couple
            </Text>
            <Text
              style={[
                styles.stepLabel,
                currentStep > 3
                  ? styles.stepLabelCompleted
                  : currentStep === 3
                  ? styles.stepLabelActive
                  : styles.stepLabelInactive,
              ]}
            >
              Location
            </Text>
            <Text
              style={[
                styles.stepLabel,
                currentStep > 4
                  ? styles.stepLabelCompleted
                  : currentStep === 4
                  ? styles.stepLabelActive
                  : styles.stepLabelInactive,
              ]}
            >
              Guests
            </Text>
            <Text
              style={[
                styles.stepLabel,
                currentStep > 5
                  ? styles.stepLabelCompleted
                  : currentStep === 5
                  ? styles.stepLabelActive
                  : styles.stepLabelInactive,
              ]}
            >
              Budget
            </Text>
            <Text
              style={[
                styles.stepLabel,
                currentStep === 6
                  ? styles.stepLabelActive
                  : styles.stepLabelInactive,
              ]}
            >
              Style
            </Text>
          </View>
        </View>
          </>
        )}

        {/* STEP 1: Marriage Type Selection */}
        {currentStep === 1 && (
          <View style={styles.sectionBlock}>
            <View style={styles.optionsVerticalList}>
              {marriageOptions.map((opt) => {
                const isSelected = marriageType === opt.id;
                return (
                  <motion.div
                    key={opt.id}
                    whileHover={{ scale: 1.015, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="w-full cursor-pointer"
                    onClick={() => handleSelectMarriageType(opt.id)}
                  >
                    <View
                      style={[
                        styles.optionCardRow,
                        isSelected ? styles.optionCardSelected : styles.optionCardUnselected,
                      ]}
                    >
                      <View style={{ flex: 1, gap: 2 }}>
                        <Text
                          style={[
                            styles.optionTitleText,
                            isSelected ? styles.optionTitleSelected : styles.optionTitleUnselected,
                          ]}
                        >
                          {opt.label}
                        </Text>
                        <Text style={styles.optionSubtext}>{opt.description}</Text>
                      </View>

                      <View
                        style={[
                          styles.radioCircle,
                          isSelected ? styles.radioCircleSelected : styles.radioCircleUnselected,
                        ]}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </View>
                    </View>
                  </motion.div>
                );
              })}
            </View>
          </View>
        )}

        {/* STEP 2: Tell Us About The Couple */}
        {currentStep === 2 && (
          <View style={styles.formSectionBlock}>
            {/* Field 1: Bride Name */}
            <View style={styles.floatingInputCard}>
              <Text style={styles.cardFloatingLabel}>Bride Name</Text>
              <TextInput
                style={styles.textInput}
                value={brideName}
                onChangeText={setBrideName}
                placeholder="Enter bride's name"
                placeholderTextColor="#A39B9C"
              />
            </View>

            {/* Field 2: Groom Name */}
            <View style={styles.floatingInputCard}>
              <Text style={styles.cardFloatingLabel}>Groom Name</Text>
              <TextInput
                style={styles.textInput}
                value={groomName}
                onChangeText={setGroomName}
                placeholder="Enter groom's name"
                placeholderTextColor="#A39B9C"
              />
            </View>

            {/* Field 3: Wedding Date */}
            <label className="w-full block cursor-pointer">
              <View style={[styles.floatingInputCard, { cursor: 'pointer' }]}>
                <Text style={styles.cardFloatingLabel}>Wedding Date</Text>
                <div className="relative flex items-center justify-between w-full pt-0.5 cursor-pointer">
                  <span
                    className={`text-[13.5px] font-semibold font-['Plus_Jakarta_Sans',sans-serif] ${
                      weddingDate ? 'text-[#231F20]' : 'text-[#8C8283]'
                    }`}
                  >
                    {weddingDate || 'Select wedding date'}
                  </span>
                  <CalendarIcon className="w-5 h-5 text-stone-700 pointer-events-none" />
                  <input
                    type="date"
                    value={weddingDateRaw}
                    onChange={handleDateChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                </div>
              </View>
            </label>

            {/* Dynamic Couple Theme Image */}
            <View style={styles.dynamicImageWrapper}>
              <Image
                source={{ uri: themeImages[marriageType] || themeImages.Hindu }}
                style={styles.themedImage}
                resizeMode="cover"
              />
            </View>
          </View>
        )}

        {/* STEP 3: Where is your event location? (Location) */}
        {currentStep === 3 && (
          <View style={styles.formSectionBlock}>
            {/* Wedding Location Input Box (Empty Initially!) */}
            <View style={styles.floatingInputCard}>
              <Text style={styles.cardFloatingLabel}>Wedding Location</Text>
              <div className="relative flex items-center justify-between w-full pt-0.5">
                <input
                  type="text"
                  value={locationSearchQuery}
                  onFocus={() => setIsLocationDropdownOpen(true)}
                  onClick={() => setIsLocationDropdownOpen(true)}
                  onChange={(e) => {
                    setLocationSearchQuery(e.target.value);
                    setSelectedLocation(e.target.value);
                    setIsLocationDropdownOpen(true);
                  }}
                  placeholder="Select a city"
                  className="w-full bg-transparent text-[#231F20] font-semibold text-[13.5px] outline-none font-['Plus_Jakarta_Sans',sans-serif] pr-8 placeholder:text-[#8C8283]"
                />
                {locationSearchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setLocationSearchQuery('');
                      setSelectedLocation('');
                      setIsLocationDropdownOpen(true);
                    }}
                    className="absolute right-0 p-1 text-stone-500 hover:text-stone-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <Search className="w-5 h-5 text-stone-600 pointer-events-none absolute right-0" />
                )}
              </div>
            </View>

            {/* Tamil Nadu Districts Dropdown Menu */}
            {isLocationDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="w-full bg-white rounded-2xl border border-[#E2DDD5] shadow-lg max-h-52 overflow-y-auto p-1 z-30"
              >
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100 flex items-center justify-between">
                  <span>Tamil Nadu Districts ({filteredDistricts.length})</span>
                  <span className="text-[9px] text-[#581420] lowercase">tap to select</span>
                </div>
                {filteredDistricts.length > 0 ? (
                  filteredDistricts.map((dist) => (
                    <button
                      key={dist.district}
                      type="button"
                      onClick={() => handleSelectDistrict(dist)}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-[#FAF6EE] rounded-xl flex flex-col transition-colors border-b border-stone-50/50 last:border-none"
                    >
                      <span className="text-[13px] font-semibold text-[#231F20]">
                        {dist.name}
                      </span>
                      <span className="text-[10.5px] text-stone-500 font-medium">
                        📍 {dist.famousPlace}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-stone-500">
                    No district found matching "{locationSearchQuery}".
                  </div>
                )}
              </motion.div>
            )}

            {/* "Use my current location" Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleUseCurrentLocation}
              style={styles.currentLocationCard}
            >
              <View style={styles.pinCircle}>
                <MapPin className="w-4 h-4 text-[#581420]" />
              </View>
              <Text style={styles.currentLocationText}>
                Use my current location
              </Text>
            </TouchableOpacity>

            {/* Dynamic District Landmark Image */}
            <View style={styles.landmarkImageWrapper}>
              <Image
                source={{ uri: selectedDistrictInfo.image }}
                style={styles.landmarkImage}
                resizeMode="cover"
              />
              {/* Landmark Title Badge */}
              <View style={styles.landmarkBadge}>
                <Text style={styles.landmarkBadgeText}>
                  📍 {selectedDistrictInfo.famousPlace}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* STEP 4: How many guests are you expecting? */}
        {currentStep === 4 && (
          <View style={styles.formSectionBlock}>
            <View style={styles.guestOptionsVerticalList}>
              {['Under 100', '100 - 250', '250 - 500', '500 - 1000', '1000+'].map((rangeOption) => {
                const isSelected = selectedGuestRange === rangeOption;
                return (
                  <div key={rangeOption} className="w-full flex flex-col gap-2">
                    <motion.div
                      whileHover={{ scale: 1.01, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="w-full cursor-pointer"
                      onClick={() => setSelectedGuestRange(rangeOption)}
                    >
                      <View
                        style={[
                          styles.guestCardRow,
                          isSelected ? styles.guestCardSelected : styles.guestCardUnselected,
                        ]}
                      >
                        <Text
                          style={[
                            styles.guestCardText,
                            isSelected ? styles.guestCardTextSelected : styles.guestCardTextUnselected,
                          ]}
                        >
                          {rangeOption}
                        </Text>

                        <View
                          style={[
                            styles.radioCircle,
                            isSelected ? styles.radioCircleSelected : styles.radioCircleUnselected,
                          ]}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </View>
                      </View>
                    </motion.div>

                    {/* If 1000+ option is selected, show expandable custom count input field */}
                    {rangeOption === '1000+' && isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -6 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="w-full bg-[#FAF6EE] border-1.5 border-[#581420] rounded-2xl p-3.5 flex flex-col gap-2.5 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-bold text-[#581420] font-['Plus_Jakarta_Sans',sans-serif]">
                            Enter exact guest count:
                          </span>
                          <span className="text-[11px] font-semibold text-stone-600 font-['Plus_Jakarta_Sans',sans-serif]">
                            ({customGuestCount ? parseInt(customGuestCount).toLocaleString() : '1,000'} Guests)
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const currentVal = parseInt(customGuestCount) || 1000;
                              if (currentVal > 1000) {
                                setCustomGuestCount(Math.max(1000, currentVal - 100).toString());
                              }
                            }}
                            className="w-9 h-9 rounded-xl bg-white border border-[#E2DDD5] flex items-center justify-center text-[#581420] hover:bg-[#581420] hover:text-white transition-colors shadow-sm cursor-pointer"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <div className="flex-1 relative flex items-center">
                            <input
                              type="number"
                              min={1000}
                              step={50}
                              value={customGuestCount}
                              onChange={(e) => setCustomGuestCount(e.target.value)}
                              placeholder="e.g. 1200"
                              className="w-full bg-white border border-[#E2DDD5] rounded-xl px-3.5 py-2 text-center text-[#231F20] font-bold text-[14px] outline-none focus:border-[#581420] font-['Plus_Jakarta_Sans',sans-serif]"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const currentVal = parseInt(customGuestCount) || 1000;
                              setCustomGuestCount((currentVal + 100).toString());
                            }}
                            className="w-9 h-9 rounded-xl bg-white border border-[#E2DDD5] flex items-center justify-center text-[#581420] hover:bg-[#581420] hover:text-white transition-colors shadow-sm cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </View>

            {/* Grand White Wedding Banquet Hall Venue Illustration Photo */}
            <View style={styles.banquetImageWrapper}>
              <Image
                source={{ uri: '/src/assets/images/white_banquet_illustration_1786471427275.jpg' }}
                style={styles.banquetImage}
                resizeMode="cover"
              />
            </View>
          </View>
        )}

        {/* STEP 5: What's your estimated wedding budget? */}
        {currentStep === 5 && (
          <View style={styles.formSectionBlock}>
            {/* Display Big Amount & Subtitle */}
            <div className="w-full flex flex-col items-center justify-center my-2.5 gap-1">
              {isEditingCustomBudget ? (
                <div className="flex flex-col items-center gap-1.5 w-full max-w-[260px]">
                  <div className="relative w-full flex items-center">
                    <span className="absolute left-3.5 text-[#231F20] font-bold text-lg z-10">₹</span>
                    <input
                      type="number"
                      step={100000}
                      value={customBudgetAmount}
                      onChange={(e) => setCustomBudgetAmount(e.target.value)}
                      placeholder="e.g. 15000000"
                      className="w-full bg-white border-2 border-[#581420] rounded-xl pl-8 pr-3 py-2 text-center text-[#231F20] font-extrabold text-xl outline-none shadow-sm font-['Plus_Jakarta_Sans',sans-serif]"
                      autoFocus
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditingCustomBudget(false)}
                    className="text-[12px] font-bold text-[#581420] hover:underline cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => {
                    setCustomBudgetAmount(currentBudgetNum.toString());
                    setIsEditingCustomBudget(true);
                  }}
                >
                  <Text style={styles.budgetDisplayBig}>
                    {formatIndianCurrency(currentBudgetNum)}
                  </Text>
                  <Text style={styles.budgetSubtitleText}>
                    {formatBudgetSubtitle(currentBudgetNum)}
                  </Text>
                  <span className="text-[10.5px] text-[#581420] font-semibold opacity-0 group-hover:opacity-100 transition-opacity mt-0.5">
                    Tap to edit amount
                  </span>
                </div>
              )}
            </div>

            {/* Slider Control Block */}
            <View style={styles.sliderCardWrapper}>
              <div className="w-full flex justify-between items-center mb-1">
                <span className="text-[12px] font-bold text-[#231F20] font-['Plus_Jakarta_Sans',sans-serif]">
                  ₹5 Lakhs
                </span>
                <span className="text-[12px] font-bold text-[#581420] font-['Plus_Jakarta_Sans',sans-serif]">
                  ₹5 Crores+
                </span>
              </div>

              {/* Range Input Slider with Custom Maroon Track */}
              <div className="relative w-full py-3 flex items-center">
                <input
                  type="range"
                  min={0}
                  max={BUDGET_STEPS.length - 1}
                  step={1}
                  value={budgetIndex}
                  onChange={(e) => {
                    setBudgetIndex(Number(e.target.value));
                    setCustomBudgetAmount('');
                  }}
                  className="w-full appearance-none bg-transparent cursor-pointer z-20 relative accent-[#581420] h-6"
                  style={{
                    WebkitAppearance: 'none',
                  }}
                />
                <div className="absolute inset-x-0 h-2.5 bg-[#E8E2D9] rounded-full overflow-hidden pointer-events-none z-0">
                  <div
                    className="h-full bg-[#581420] transition-all duration-75 rounded-full"
                    style={{
                      width: `${(budgetIndex / (BUDGET_STEPS.length - 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </View>

            {/* Money Bag Graphic Illustration */}
            <View style={styles.moneyBagWrapper}>
              <Image
                source={{ uri: '/src/assets/images/gold_rupee_money_bag_1786503761184.jpg' }}
                style={styles.moneyBagImage}
                resizeMode="contain"
              />
            </View>
          </View>
        )}

        {/* STEP 6: What type of wedding are you planning? */}
        {currentStep === 6 && (
          <View style={styles.formSectionBlock}>
            {/* Grid of Wedding Style Options */}
            <div className="w-full grid grid-cols-2 gap-3.5 my-2">
              {[
                {
                  id: marriageType === 'Christian' ? 'Church' : marriageType === 'Muslim' ? 'Masjid' : 'Temple',
                  label: marriageType === 'Christian' ? 'Church' : marriageType === 'Muslim' ? 'Masjid' : 'Temple',
                  image: marriageType === 'Christian' 
                    ? churchImg
                    : marriageType === 'Muslim'
                    ? masjidImg
                    : templeImg,
                  desc: marriageType === 'Christian' 
                    ? 'Classic Church Altar & Elegant Setup' 
                    : marriageType === 'Muslim'
                    ? 'Beautiful Masjid & Nikah Setup'
                    : 'Sacred Temple Mandap & Divine Rituals',
                },
                {
                  id: 'Traditional',
                  label: 'Traditional',
                  image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80',
                  desc: 'Marigold Mandap & Sacred Rituals',
                },
                {
                  id: 'Luxury',
                  label: 'Luxury',
                  image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
                  desc: 'Grand Palace & Chandelier Ballroom',
                },
                {
                  id: 'Destination',
                  label: 'Destination',
                  image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
                  desc: 'Beachfront Canopy & Tropical Sunset',
                },
                {
                  id: 'Classic',
                  label: 'Classic',
                  image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80',
                  desc: 'Minimal Intimate Garden & Chic Arch',
                },
              ].map((styleOpt) => {
                const isSelected = selectedStyle === styleOpt.id;
                return (
                  <motion.div
                    key={styleOpt.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedStyle(styleOpt.id)}
                    className={`relative flex flex-col items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#FFFBF4] border-2 border-[#581420] shadow-md'
                        : 'bg-[#FAF6EE] border border-[#E8E2D9] hover:border-[#581420]/50'
                    }`}
                  >
                    {/* Checkmark Badge if Selected */}
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 z-10 w-5 h-5 bg-[#581420] rounded-full flex items-center justify-center shadow-md">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}

                    {/* Real High-Quality Photo Image */}
                    <div className="w-full h-24 rounded-xl overflow-hidden mb-2 relative shadow-inner bg-[#EFEAE2]">
                      <img
                        src={styleOpt.image}
                        alt={styleOpt.label}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          // Fallback if network blocks Unsplash CDN
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Style Label */}
                    <span className="text-[14px] font-bold text-[#231F20] font-['Plus_Jakarta_Sans',sans-serif]">
                      {styleOpt.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Watercolor Floral Garland Decor Banner matching Reference Image 2 */}
            <div className="w-full flex justify-center items-center mt-3 mb-1 px-1">
              <svg viewBox="0 0 400 70" className="w-full h-16">
                <g fill="none" stroke="none">
                  {/* Stem & Leaf Foliage Branches */}
                  <path d="M 20 45 Q 60 25 120 40 Q 180 20 240 40 Q 300 25 380 45" stroke="#728464" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M 30 50 Q 80 60 140 42 Q 200 60 260 42 Q 320 60 370 50" stroke="#5A6B4E" strokeWidth="1.4" strokeLinecap="round" />

                  {/* Eucalyptus & Fern Leaves */}
                  <path d="M 40 42 Q 30 32 42 26 Q 52 32 48 40 Z" fill="#788B69" opacity="0.85" />
                  <path d="M 70 34 Q 62 22 72 16 Q 82 22 78 32 Z" fill="#5F7051" opacity="0.9" />
                  <path d="M 110 32 Q 102 20 112 14 Q 122 20 118 30 Z" fill="#889A7A" opacity="0.85" />
                  <path d="M 160 26 Q 152 14 162 8 Q 172 14 168 24 Z" fill="#5F7051" opacity="0.9" />
                  <path d="M 230 26 Q 222 14 232 8 Q 242 14 238 24 Z" fill="#5F7051" opacity="0.9" />
                  <path d="M 280 32 Q 272 20 282 14 Q 292 20 288 30 Z" fill="#889A7A" opacity="0.85" />
                  <path d="M 320 34 Q 312 22 322 16 Q 332 22 328 32 Z" fill="#5F7051" opacity="0.9" />
                  <path d="M 350 42 Q 340 32 352 26 Q 362 32 358 40 Z" fill="#788B69" opacity="0.85" />

                  {/* Watercolor Rose & Peony Blooms */}
                  <circle cx="85" cy="40" r="10" fill="#F0C2C6" opacity="0.9" />
                  <circle cx="85" cy="40" r="6" fill="#D98A92" />
                  <circle cx="85" cy="40" r="2.5" fill="#8B3E48" />

                  <circle cx="140" cy="36" r="12" fill="#E8B4B8" opacity="0.95" />
                  <circle cx="140" cy="36" r="7" fill="#C4848A" />
                  <circle cx="140" cy="36" r="3" fill="#8B3E48" />

                  <circle cx="200" cy="42" r="13.5" fill="#F2B8C0" />
                  <circle cx="200" cy="42" r="8.5" fill="#C85A6A" />
                  <circle cx="200" cy="42" r="3.5" fill="#8B2635" />

                  <circle cx="260" cy="36" r="12" fill="#E8B4B8" opacity="0.95" />
                  <circle cx="260" cy="36" r="7" fill="#C4848A" />
                  <circle cx="260" cy="36" r="3" fill="#8B3E48" />

                  <circle cx="315" cy="40" r="10" fill="#F0C2C6" opacity="0.9" />
                  <circle cx="315" cy="40" r="6" fill="#D98A92" />
                  <circle cx="315" cy="40" r="2.5" fill="#8B3E48" />

                  {/* Golden Berries & Sparkles */}
                  <circle cx="110" cy="46" r="2.2" fill="#D4B982" />
                  <circle cx="116" cy="48" r="1.8" fill="#D4B982" />
                  <circle cx="284" cy="46" r="2.2" fill="#D4B982" />
                  <circle cx="290" cy="48" r="1.8" fill="#D4B982" />
                </g>
              </svg>
            </div>
          </View>
        )}

        {/* STEP 7: Your AI Wedding Profile (Exact screen matching uploaded mockup) */}
        {currentStep === 7 && (
          <View style={styles.formSectionBlock}>
            <div className="relative w-full flex flex-col items-center pt-0 pb-1">
              {/* Dense Top Confetti & Gold/Maroon Glitter Sparkle Cascade SVG */}
              <div className="w-full h-16 -mb-4 pointer-events-none z-10 overflow-hidden">
                <svg viewBox="0 0 400 80" className="w-full h-full">
                  <g opacity="0.9">
                    {/* Top Left Dense Confetti Cluster */}
                    <circle cx="10" cy="8" r="2.2" fill="#D4B982" />
                    <circle cx="24" cy="12" r="1.6" fill="#8B3E48" />
                    <circle cx="16" cy="22" r="2.2" fill="#C5A059" />
                    <circle cx="36" cy="8" r="1.5" fill="#E89D75" />
                    <circle cx="30" cy="26" r="1.8" fill="#D4B982" />
                    <circle cx="48" cy="16" r="1.4" fill="#8B3E48" />
                    <rect x="20" y="28" width="2" height="2" fill="#C5A059" transform="rotate(25 20 28)" />
                    <rect x="42" y="22" width="2" height="2" fill="#8B3E48" transform="rotate(40 42 22)" />
                    <circle cx="12" cy="38" r="1.4" fill="#C5A059" />
                    <circle cx="60" cy="10" r="2.0" fill="#D4B982" />

                    {/* Top Right Dense Confetti Cluster */}
                    <circle cx="390" cy="8" r="2.2" fill="#D4B982" />
                    <circle cx="376" cy="12" r="1.6" fill="#8B3E48" />
                    <circle cx="384" cy="22" r="2.2" fill="#C5A059" />
                    <circle cx="364" cy="8" r="1.5" fill="#E89D75" />
                    <circle cx="370" cy="26" r="1.8" fill="#D4B982" />
                    <circle cx="352" cy="16" r="1.4" fill="#8B3E48" />
                    <rect x="380" y="28" width="2" height="2" fill="#C5A059" transform="rotate(-25 380 28)" />
                    <rect x="358" y="22" width="2" height="2" fill="#8B3E48" transform="rotate(-40 358 22)" />
                    <circle cx="388" cy="38" r="1.4" fill="#C5A059" />
                    <circle cx="340" cy="10" r="2.0" fill="#D4B982" />

                    {/* Scattered Arch across Top Margin */}
                    <circle cx="100" cy="10" r="1.4" fill="#D4B982" />
                    <circle cx="130" cy="6" r="1.2" fill="#8B3E48" />
                    <circle cx="160" cy="12" r="1.6" fill="#C5A059" />
                    <circle cx="200" cy="14" r="1.8" fill="#D4B982" />
                    <circle cx="240" cy="12" r="1.6" fill="#C5A059" />
                    <circle cx="270" cy="6" r="1.2" fill="#8B3E48" />
                    <circle cx="300" cy="10" r="1.4" fill="#D4B982" />
                  </g>
                </svg>
              </div>

              {/* Title Header */}
              <Text style={styles.profileTitleHeader}>Your AI Wedding Profile</Text>

              {/* Circular Couple Photo with Scalloped Outer Lace Border */}
              <div className="relative my-2.5 flex items-center justify-center">
                <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
                  {/* Decorative Frame SVG Overlay */}
                  <svg
                    viewBox="0 0 200 200"
                    className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
                  >
                    <g fill="none" stroke="none">
                      {/* Scalloped Outer Cream & Gold Lace Ring */}
                      <circle cx="100" cy="100" r="88" stroke="#F5EADB" strokeWidth="2.5" strokeDasharray="6 3.5" fill="none" />
                      <circle cx="100" cy="100" r="82" stroke="#E2CFA8" strokeWidth="1.2" fill="none" opacity="0.85" />
                      <circle cx="100" cy="100" r="76" stroke="#C5A059" strokeWidth="0.8" strokeDasharray="2.5 2.5" fill="none" opacity="0.75" />
                    </g>
                  </svg>

                  {/* Circle Wedding Couple Image */}
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#FAF6EE] relative shadow-md z-0 bg-[#FAF6EE]">
                    <img
                      src={getProfileCouplePhoto()}
                      alt="Wedding Couple Profile"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              {/* Couple Names + Heart Outline Icon */}
              <div className="flex items-center justify-center gap-1.5 my-1.5">
                <Text style={styles.coupleNamesHeading}>
                  {brideName || 'Ananya'} & {groomName || 'Rahul'}
                </Text>

                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-[#581420] stroke-[1.8] inline-block ml-0.5">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              {/* Details List Container matching exact screenshot layout */}
              <div className="w-full flex flex-col gap-3 my-2 px-2">
                {/* 1. Date */}
                <div className="flex items-center justify-between text-[13.5px]">
                  <div className="flex items-center gap-3 text-[#5A5253] font-medium font-['Plus_Jakarta_Sans',sans-serif]">
                    <CalendarIcon className="w-4 h-4 text-[#7A7273]" />
                    <span>Date</span>
                  </div>
                  <span className="font-bold text-[#231F20] font-['Plus_Jakarta_Sans',sans-serif]">
                    {weddingDate || '15 Dec 2026'}
                  </span>
                </div>

                {/* 2. Location */}
                <div className="flex items-center justify-between text-[13.5px]">
                  <div className="flex items-center gap-3 text-[#5A5253] font-medium font-['Plus_Jakarta_Sans',sans-serif]">
                    <MapPin className="w-4 h-4 text-[#7A7273]" />
                    <span>Location</span>
                  </div>
                  <span className="font-bold text-[#231F20] font-['Plus_Jakarta_Sans',sans-serif] text-right max-w-[190px] truncate">
                    {selectedLocation || 'Chennai, Tamil Nadu'}
                  </span>
                </div>

                {/* 3. Guests */}
                <div className="flex items-center justify-between text-[13.5px]">
                  <div className="flex items-center gap-3 text-[#5A5253] font-medium font-['Plus_Jakarta_Sans',sans-serif]">
                    <Users className="w-4 h-4 text-[#7A7273]" />
                    <span>Guests</span>
                  </div>
                  <span className="font-bold text-[#231F20] font-['Plus_Jakarta_Sans',sans-serif]">
                    {selectedGuestRange === '1000+'
                      ? (customGuestCount ? `${customGuestCount} Guests` : '1000+ Guests')
                      : (selectedGuestRange || '250 – 500')}
                  </span>
                </div>

                {/* 4. Budget */}
                <div className="flex items-center justify-between text-[13.5px]">
                  <div className="flex items-center gap-3 text-[#5A5253] font-medium font-['Plus_Jakarta_Sans',sans-serif]">
                    <Wallet className="w-4 h-4 text-[#7A7273]" />
                    <span>Budget</span>
                  </div>
                  <span className="font-bold text-[#231F20] font-['Plus_Jakarta_Sans',sans-serif]">
                    {formatIndianCurrency(currentBudgetNum)}
                  </span>
                </div>

                {/* 5. Style */}
                <div className="flex items-center justify-between text-[13.5px]">
                  <div className="flex items-center gap-3 text-[#5A5253] font-medium font-['Plus_Jakarta_Sans',sans-serif]">
                    <Sparkles className="w-4 h-4 text-[#7A7273]" />
                    <span>Style</span>
                  </div>
                  <span className="font-bold text-[#231F20] font-['Plus_Jakarta_Sans',sans-serif]">
                    {selectedStyle ? `${selectedStyle} Wedding` : 'Traditional Wedding'}
                  </span>
                </div>
              </div>

              {/* AI Recommendation Box */}
              <div className="w-full bg-[#F6EFE5] rounded-2xl p-4 my-2.5 shadow-xs flex flex-col gap-1.5 text-left">
                <span className="font-serif-brand font-bold text-[17px] text-[#581420]">
                  AI Recommendation
                </span>
                <p className="text-[12.5px] leading-relaxed text-[#4A4243] font-['Plus_Jakarta_Sans',sans-serif]">
                  {buildRecommendationText()}
                </p>
              </div>
            </div>
          </View>
        )}
      </ScrollView>

      {/* Footer CTA Button */}
      <View style={styles.footerArea}>
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={handleNextStep}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>
            {currentStep === 6
              ? 'Create My Wedding Profile ✨'
              : currentStep === 7
              ? 'View My Wedding Plan'
              : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </motion.div>
  );
};

const styles: any = StyleSheet.create({
  topHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
    marginBottom: 8,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    gap: 16,
    paddingBottom: 12,
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
  },
  titleContainer: {
    alignItems: 'flex-start',
    marginTop: 2,
  },
  titleText: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 27,
    fontWeight: '700',
    color: '#2A2425',
    letterSpacing: -0.2,
    lineHeight: 32,
  },
  profileTitleHeader: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 25,
    fontWeight: '700',
    color: '#581420',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 2,
  },
  coupleNamesHeading: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 22,
    fontWeight: '700',
    color: '#231F20',
    textAlign: 'center',
  },
  stepperContainer: {
    width: '100%',
    gap: 6,
    marginVertical: 4,
  },
  stepperTrackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  stepCircle: {
    width: 20,
    height: 20,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleCompleted: {
    backgroundColor: '#16A34A', // Green for completed step!
  },
  stepCircleActive: {
    backgroundColor: '#581420', // Burgundy for active step!
  },
  stepCircleInactive: {
    backgroundColor: '#FAF6EE',
    borderWidth: 1.5,
    borderColor: '#D8CFC5',
  },
  innerDotActive: {
    width: 6,
    height: 6,
    borderRadius: 9999,
    backgroundColor: '#FFFFFF',
  },
  stepLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 2,
  },
  stepLineCompleted: {
    backgroundColor: '#16A34A',
  },
  stepLineInactive: {
    backgroundColor: '#EAE3D9',
  },
  stepperLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  stepLabel: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 9.5,
    textAlign: 'center',
    width: 42,
  },
  stepLabelCompleted: {
    fontWeight: '700',
    color: '#16A34A',
  },
  stepLabelActive: {
    fontWeight: '700',
    color: '#2A2425',
  },
  stepLabelInactive: {
    fontWeight: '400',
    color: '#8C8283',
  },
  sectionBlock: {
    gap: 8,
    marginTop: 4,
  },
  formSectionBlock: {
    gap: 12,
    marginTop: 4,
  },
  optionsVerticalList: {
    gap: 12,
    width: '100%',
  },
  optionCardRow: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
  },
  optionCardSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#581420',
    shadowColor: '#581420',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  optionCardUnselected: {
    backgroundColor: '#FAF6EE',
    borderColor: '#E8E2D9',
  },
  optionTitleText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 15,
    fontWeight: '700',
  },
  optionTitleSelected: {
    color: '#581420',
  },
  optionTitleUnselected: {
    color: '#2A2425',
  },
  optionSubtext: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11,
    color: '#8C8283',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    backgroundColor: '#581420',
  },
  radioCircleUnselected: {
    borderWidth: 1.5,
    borderColor: '#C7BEB5',
  },
  floatingInputCard: {
    width: '100%',
    backgroundColor: '#FAF6EE',
    borderWidth: 1,
    borderColor: '#E2DDD5',
    borderRadius: 14,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 14,
    position: 'relative',
    gap: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
  },
  cardFloatingLabel: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 10,
    fontWeight: '500',
    color: '#8C8283',
  },
  textInput: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13.5,
    fontWeight: '600',
    color: '#231F20',
    padding: 0,
    margin: 0,
    outlineStyle: 'none' as any,
  },
  dynamicImageWrapper: {
    width: '100%',
    height: 210,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 6,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E2DDD5',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  themedImage: {
    width: '100%',
    height: '100%',
  },
  currentLocationCard: {
    width: '100%',
    backgroundColor: '#FAF6EE',
    borderWidth: 1,
    borderColor: '#E2DDD5',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pinCircle: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    backgroundColor: 'rgba(88, 20, 32, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentLocationText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13.5,
    fontWeight: '600',
    color: '#231F20',
  },
  landmarkImageWrapper: {
    width: '100%',
    height: 210,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 6,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E2DDD5',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  landmarkImage: {
    width: '100%',
    height: '100%',
  },
  landmarkBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    backdropFilter: 'blur(6px)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(226, 221, 213, 0.8)',
  } as any,
  landmarkBadgeText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11,
    fontWeight: '700',
    color: '#2A2425',
  },
  guestOptionsVerticalList: {
    gap: 10,
    width: '100%',
  },
  guestCardRow: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
  },
  guestCardSelected: {
    backgroundColor: '#FAF6EE',
    borderColor: '#581420',
    shadowColor: '#581420',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  guestCardUnselected: {
    backgroundColor: '#FAF6EE',
    borderColor: '#E8E2D9',
  },
  guestCardText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 14.5,
  },
  guestCardTextSelected: {
    fontWeight: '700',
    color: '#2A2425',
  },
  guestCardTextUnselected: {
    fontWeight: '500',
    color: '#2A2425',
  },
  banquetImageWrapper: {
    width: '100%',
    height: 220,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  banquetImage: {
    width: '100%',
    height: '100%',
  },
  budgetDisplayBig: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 30,
    fontWeight: '800',
    color: '#1F191A',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  budgetSubtitleText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 15,
    fontWeight: '600',
    color: '#6E6264',
    textAlign: 'center',
  },
  sliderCardWrapper: {
    width: '100%',
    backgroundColor: '#FAF6EE',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E8E2D9',
  },
  moneyBagWrapper: {
    width: '100%',
    height: 180,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moneyBagImage: {
    width: '100%',
    height: '100%',
  },
  footerArea: {
    width: '100%',
    paddingTop: 8,
    paddingBottom: 4,
  },
  primaryButton: {
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#581420',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#581420',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  primaryButtonText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
