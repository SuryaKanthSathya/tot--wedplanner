import React, { useState, useEffect } from 'react';
import { MyWeddingTabScreen } from './MyWeddingTabScreen';
import { PhotographyListingPage } from './PhotographyListingPage';
import { MakeupListingPage } from './MakeupListingPage';
import { DecorListingPage } from './DecorListingPage';
import { VenueListingPage } from './VenueListingPage';
import { EntertainmentListingPage } from './EntertainmentListingPage';
import { CarsListingPage } from './CarsListingPage';
import { InvitationListingPage } from './InvitationListingPage';
import { DestinationWeddingFlow } from './DestinationWeddingFlow';
import { SavedTabScreen } from './SavedTabScreen';
import { CateringListingPage } from './CateringListingPage';
import { MehendiListingPage } from './MehendiListingPage';
import { MyQuotesTabScreen } from './MyQuotesTabScreen';
import { RitualsFlow } from './RitualsFlow';
import { FindVendorsPage } from './FindVendorsPage';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  Camera,
  Sparkles,
  Building2,
  Store,
  Palette,
  Music,
  Mail,
  Plane,
  Utensils,
  Car,
  Flower2,
  Flame,
  Grid,
  Home,
  Heart,
  FileText,
  User,
  X,
  Phone,
  ShieldCheck,
  ChevronRight,
  LogOut,
  MapPin,
  Calendar,
} from 'lucide-react';

interface MainDashboardPageProps {
  userName: string;
  userMobile: string;
  userEmail: string;
  userId?: string;
  weddingProfile?: {
    marriageType?: string;
    brideName?: string;
    groomName?: string;
    weddingDate?: string;
    location?: string;
    guestCount?: string;
    budget?: string;
    weddingStyle?: string;
  } | null;
  initialTab?: 'home' | 'my-wedding' | 'saved' | 'quotes' | 'profile';
  onLogout?: () => void;
  onNavigateToCoupleOnboarding?: () => void;
}

export const MainDashboardPage: React.FC<MainDashboardPageProps> = ({
  userName,
  userMobile,
  userEmail,
  userId = '',
  weddingProfile,
  initialTab = 'home',
  onLogout,
  onNavigateToCoupleOnboarding,
}) => {
  const isPlannerCreated = Boolean(
    weddingProfile && (weddingProfile.brideName || weddingProfile.marriageType)
  );

  const [activeTab, setActiveTab] = useState<'home' | 'my-wedding' | 'saved' | 'quotes' | 'profile'>(
    initialTab === 'my-wedding' && !isPlannerCreated ? 'home' : initialTab
  );
  const [hideTabBar, setHideTabBar] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showExploreModal, setShowExploreModal] = useState<boolean>(false);
  const [showPhotographyListing, setShowPhotographyListing] = useState<boolean>(false);
  const [showMakeupListing, setShowMakeupListing] = useState<boolean>(false);
  const [showDecorListing, setShowDecorListing] = useState<boolean>(false);
  const [showVenueListing, setShowVenueListing] = useState<boolean>(false);
  const [showEntertainmentListing, setShowEntertainmentListing] = useState(false);
  const [showCarsListing, setShowCarsListing] = useState(false);
  const [showInvitationListing, setShowInvitationListing] = useState<boolean>(false);
  const [showDestinationWeddingFlow, setShowDestinationWeddingFlow] = useState<boolean>(false);
  const [showCateringListing, setShowCateringListing] = useState<boolean>(false);
  const [showMehendiListing, setShowMehendiListing] = useState<boolean>(false);
  const [showRitualsFlow, setShowRitualsFlow] = useState<boolean>(false);
  const [showFindVendorsPage, setShowFindVendorsPage] = useState<boolean>(false);
  const [selectedFeatureName, setSelectedFeatureName] = useState<string>('');

  // Persisted Saved Studios State
  const [savedStudioIds, setSavedStudioIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('saved_photography_studios');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed['studio-1']) {
          delete parsed['studio-1'];
          localStorage.setItem('saved_photography_studios', JSON.stringify(parsed));
        }
        return parsed;
      }
      return {};
    } catch {
      return {};
    }
  });

  const toggleSavedStudio = (id: string) => {
    setSavedStudioIds((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('saved_photography_studios', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Persisted Saved Makeup State
  const [savedMakeupIds, setSavedMakeupIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('saved_makeup_studios');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleSavedMakeup = (id: string) => {
    setSavedMakeupIds((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('saved_makeup_studios', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Persisted Saved Decor State
  const [savedDecorIds, setSavedDecorIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('saved_decor_studios');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleSavedDecor = (id: string) => {
    setSavedDecorIds((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('saved_decor_studios', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Persisted Saved Venue State
  const [savedVenueIds, setSavedVenueIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('saved_venues');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleSavedVenue = (id: string) => {
    setSavedVenueIds((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('saved_venues', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Persisted Saved Entertainment State
  const [savedEntIds, setSavedEntIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('saved_entertainment');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [savedCarIds, setSavedCarIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('saved_cars');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleSavedEnt = (id: string) => {
    setSavedEntIds((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('saved_entertainment', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const toggleSavedCar = (id: string) => {
    setSavedCarIds((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('saved_cars', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Persisted Saved Invitations State
  const [savedInviteIds, setSavedInviteIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('saved_invitations');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleSavedInvite = (id: string) => {
    setSavedInviteIds((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('saved_invitations', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Persisted Saved Mehendi State
  const [savedMehendiIds, setSavedMehendiIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('saved_mehendi');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleSavedMehendi = (id: string) => {
    setSavedMehendiIds((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('saved_mehendi', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Persisted Saved Catering State
  const [savedCateringIds, setSavedCateringIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('saved_catering');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleSavedCatering = (id: string) => {
    setSavedCateringIds((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('saved_catering', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Persisted Saved Rituals State
  const [savedRitualsIds, setSavedRitualsIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('saved_rituals');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleSavedRitual = (id: string) => {
    setSavedRitualsIds((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('saved_rituals', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  useEffect(() => {
    if (initialTab === 'my-wedding' && !isPlannerCreated) {
      setActiveTab('home');
    } else if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isPlannerCreated]);

  useEffect(() => {
    const handleSwitchTab = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.tab) {
        setActiveTab(customEvent.detail.tab);
        setShowPhotographyListing(false);
        setShowMakeupListing(false);
        setShowDecorListing(false);
        setShowVenueListing(false);
        setShowEntertainmentListing(false);
        setShowCarsListing(false);
        setShowInvitationListing(false);
        setShowMehendiListing(false);
        setShowCateringListing(false);
        setShowRitualsFlow(false);
        setShowFindVendorsPage(false);
      }
    };
    const handleSavedReset = () => {
      setSavedStudioIds({});
      setSavedMakeupIds({});
      setSavedDecorIds({});
      setSavedVenueIds({});
      setSavedEntIds({});
      setSavedCarIds({});
      setSavedInviteIds({});
      setSavedMehendiIds({});
      setSavedCateringIds({});
    };
    window.addEventListener('tot_switch_tab', handleSwitchTab);
    window.addEventListener('tot_saved_updated', handleSavedReset);
    return () => {
      window.removeEventListener('tot_switch_tab', handleSwitchTab);
      window.removeEventListener('tot_saved_updated', handleSavedReset);
    };
  }, []);

  const handleOptionPress = (featureName: string) => {
    if (featureName === 'Photography') {
      setShowPhotographyListing(true);
      return;
    }
    if (featureName === 'Makeup' || featureName === 'Bridal & Groom Makeup') {
      setShowMakeupListing(true);
      return;
    }
    if (featureName === 'Decor' || featureName === 'Stage & Mandap Decor') {
      setShowDecorListing(true);
      return;
    }
    if (featureName === 'Venue' || featureName === 'Mandapams & Venues') {
      setShowVenueListing(true);
      return;
    }
    if (featureName === 'Entertainment' || featureName === 'DJs & Music') {
      setShowEntertainmentListing(true);
      return;
    }
    if (featureName === 'Invitations' || featureName === 'Wedding Cards & Invites') {
      setShowInvitationListing(true);
      return;
    }
    if (featureName === 'Cars') {
      setShowCarsListing(true);
      return;
    }
    if (featureName === 'Destination Wedding') {
      setShowDestinationWeddingFlow(true);
      return;
    }
    if (featureName === 'Mehendi') {
      setShowMehendiListing(true);
      return;
    }
    if (featureName === 'Catering') {
      setShowCateringListing(true);
      return;
    }
    if (featureName === 'Rituals') {
      setShowRitualsFlow(true);
      return;
    }
    if (featureName === 'Find Individual Vendors') {
      setShowFindVendorsPage(true);
      return;
    }
    if (featureName === 'Plan My Entire Wedding') {
      if (onNavigateToCoupleOnboarding) {
        onNavigateToCoupleOnboarding();
      } else {
        setSelectedFeatureName(featureName);
        setShowExploreModal(true);
      }
    } else {
      setSelectedFeatureName(featureName);
      setShowExploreModal(true);
    }
  };

  // Extract first name for greeting
  const rawName = userName.trim();
  const firstName = rawName ? rawName.split(' ')[0] : 'Guest';
  const displayMobile = userMobile.trim();
  const displayEmail = userEmail.trim();

  const handleProfilePress = () => {
    setShowProfileModal(true);
  };



  if (showPhotographyListing) {
    return (
      <PhotographyListingPage
        onBack={() => {
          setShowPhotographyListing(false);
          setActiveTab('home');
        }}
        savedStudioIds={savedStudioIds}
        onToggleSavedStudio={toggleSavedStudio}
        onOpenSavedTab={() => {
          setShowPhotographyListing(false);
          setActiveTab('saved');
        }}
        onNavigateToQuotesTab={() => {
          setShowPhotographyListing(false);
          setActiveTab('quotes');
        }}
      />
    );
  }

  if (showMakeupListing) {
    return (
      <MakeupListingPage
        onBack={() => {
          setShowMakeupListing(false);
          setActiveTab('home');
        }}
        savedMakeupIds={savedMakeupIds}
        onToggleSavedMakeup={toggleSavedMakeup}
        onOpenSavedTab={() => {
          setShowMakeupListing(false);
          setActiveTab('saved');
        }}
        onNavigateToQuotesTab={() => {
          setShowMakeupListing(false);
          setActiveTab('quotes');
        }}
      />
    );
  }

  if (showDecorListing) {
    return (
      <DecorListingPage
        onBack={() => {
          setShowDecorListing(false);
          setActiveTab('home');
        }}
        savedDecorIds={savedDecorIds}
        onToggleSavedDecor={toggleSavedDecor}
        onOpenSavedTab={() => {
          setShowDecorListing(false);
          setActiveTab('saved');
        }}
        onNavigateToQuotesTab={() => {
          setShowDecorListing(false);
          setActiveTab('quotes');
        }}
      />
    );
  }

  if (showVenueListing) {
    return (
      <VenueListingPage
        onBack={() => {
          setShowVenueListing(false);
          setActiveTab('home');
        }}
        savedVenueIds={savedVenueIds}
        onToggleSavedVenue={toggleSavedVenue}
        onOpenSavedTab={() => {
          setShowVenueListing(false);
          setActiveTab('saved');
        }}
        onNavigateToQuotesTab={() => {
          setShowVenueListing(false);
          setActiveTab('quotes');
        }}
      />
    );
  }

  if (showEntertainmentListing) {
    return (
      <EntertainmentListingPage
        onBack={() => {
          setShowEntertainmentListing(false);
          setActiveTab('home');
        }}
        savedEntIds={savedEntIds}
        onToggleSavedEnt={toggleSavedEnt}
        onOpenSavedTab={() => {
          setShowEntertainmentListing(false);
          setActiveTab('saved');
        }}
        onNavigateToQuotesTab={() => {
          setShowEntertainmentListing(false);
          setActiveTab('quotes');
        }}
      />
    );
  }

  if (showCarsListing) {
    return (
      <CarsListingPage
        onBack={() => {
          setShowCarsListing(false);
          setActiveTab('home');
        }}
        savedCarIds={savedCarIds}
        onToggleSavedCar={toggleSavedCar}
        onOpenSavedTab={() => {
          setShowCarsListing(false);
          setActiveTab('saved');
        }}
        onNavigateToQuotesTab={() => {
          setShowCarsListing(false);
          setActiveTab('quotes');
        }}
      />
    );
  }

  if (showInvitationListing) {
    return (
      <InvitationListingPage
        onBack={() => {
          setShowInvitationListing(false);
          setActiveTab('home');
        }}
        savedInviteIds={savedInviteIds}
        onToggleSavedInvite={toggleSavedInvite}
        onOpenSavedTab={() => {
          setShowInvitationListing(false);
          setActiveTab('saved');
        }}
        onNavigateToQuotesTab={() => {
          setShowInvitationListing(false);
          setActiveTab('quotes');
        }}
      />
    );
  }

  if (showDestinationWeddingFlow) {
    return (
      <DestinationWeddingFlow
        onBack={() => {
          setShowDestinationWeddingFlow(false);
          setActiveTab('home');
        }}
        onExploreVenues={() => {
          setShowDestinationWeddingFlow(false);
          setShowVenueListing(true);
        }}
      />
    );
  }

  if (showMehendiListing) {
    return (
      <MehendiListingPage
        onBack={() => {
          setShowMehendiListing(false);
          setActiveTab('home');
        }}
        savedMehendiIds={savedMehendiIds}
        onToggleSavedMehendi={toggleSavedMehendi}
        onOpenSavedTab={() => {
          setShowMehendiListing(false);
          setActiveTab('saved');
        }}
        onNavigateToQuotesTab={() => {
          setShowMehendiListing(false);
          setActiveTab('quotes');
        }}
      />
    );
  }

  if (showCateringListing) {
    return (
      <CateringListingPage
        onBack={() => {
          setShowCateringListing(false);
          setActiveTab('home');
        }}
        savedCateringIds={savedCateringIds}
        onToggleSavedCatering={toggleSavedCatering}
        onOpenSavedTab={() => {
          setShowCateringListing(false);
          setActiveTab('saved');
        }}
        onNavigateToQuotesTab={() => {
          setShowCateringListing(false);
          setActiveTab('quotes');
        }}
      />
    );
  }

  if (showRitualsFlow) {
    return (
      <RitualsFlow
        onBack={() => setShowRitualsFlow(false)}
        onNavigateToQuotesTab={() => {
          setShowRitualsFlow(false);
          setActiveTab('quotes');
        }}
        savedRitualsIds={savedRitualsIds}
        onToggleSavedRitual={toggleSavedRitual}
      />
    );
  }

  if (showFindVendorsPage) {
    return (
      <FindVendorsPage
        onBack={() => setShowFindVendorsPage(false)}
        onSelectCategory={(category) => {
          handleOptionPress(category);
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      {activeTab === 'my-wedding' ? (
        <MyWeddingTabScreen
          userName={userName}
          weddingProfile={weddingProfile}
          savedStudioIds={savedStudioIds}
          onToggleSavedStudio={toggleSavedStudio}
          savedMakeupIds={savedMakeupIds}
          onToggleSavedMakeup={toggleSavedMakeup}
          savedDecorIds={savedDecorIds}
          onToggleSavedDecor={toggleSavedDecor}
          savedVenueIds={savedVenueIds}
          onToggleSavedVenue={toggleSavedVenue}
          savedEntIds={savedEntIds}
          onToggleSavedEnt={toggleSavedEnt}
          savedCarIds={savedCarIds}
          onToggleSavedCar={toggleSavedCar}
          savedInviteIds={savedInviteIds}
          onToggleSavedInvite={toggleSavedInvite}
          onOpenSavedTab={() => setActiveTab('saved')}
          onNavigateToHome={() => setActiveTab('home')}
        />
      ) : activeTab === 'saved' ? (
        <SavedTabScreen
          savedStudioIds={savedStudioIds}
          onToggleSavedStudio={toggleSavedStudio}
          onExplorePhotography={() => setShowPhotographyListing(true)}
          savedMakeupIds={savedMakeupIds}
          onToggleSavedMakeup={toggleSavedMakeup}
          onExploreMakeup={() => setShowMakeupListing(true)}
          savedDecorIds={savedDecorIds}
          onToggleSavedDecor={toggleSavedDecor}
          onExploreDecor={() => setShowDecorListing(true)}
          savedVenueIds={savedVenueIds}
          onToggleSavedVenue={toggleSavedVenue}
          onExploreVenues={() => { setActiveTab('dashboard'); setShowVenueListing(true); }}
          savedEntIds={savedEntIds}
          onToggleSavedEnt={toggleSavedEnt}
          onExploreEntertainment={() => { setActiveTab('dashboard'); setShowEntertainmentListing(true); }}
          savedCarIds={savedCarIds}
          onToggleSavedCar={toggleSavedCar}
          onExploreCars={() => { setActiveTab('dashboard'); setShowCarsListing(true); }}
          savedInviteIds={savedInviteIds}
          onToggleSavedInvite={toggleSavedInvite}
          onExploreInvitations={() => setShowInvitationListing(true)}
          onNavigateToHome={() => setActiveTab('home')}
        />
      ) : activeTab === 'quotes' ? (
        <MyQuotesTabScreen
          onHideTabBar={setHideTabBar}
          onExploreVendors={() => setActiveTab('home')}
        />
      ) : (
        /* Scrollable Main Content */
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ================= HEADER SECTION ================= */}
          <View style={styles.headerRow}>
            {/* Left Greeting */}
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingTitle}>
                Hi, {firstName} <Text style={{ fontSize: 18 }}>👋</Text>
              </Text>
              <Text style={styles.greetingSubtitle}>
                Let's plan your perfect wedding
              </Text>
            </View>

            {/* Right Header Icons */}
            <View style={styles.headerRightActions}>
              {/* Notification Bell */}
              <TouchableOpacity activeOpacity={0.7} style={styles.bellButton}>
                <Bell className="w-5 h-5 text-stone-700" />
                <View style={styles.bellBadge} />
              </TouchableOpacity>

              {/* Neutral Gender-Free Profile Avatar Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleProfilePress}
                style={styles.profileAvatarButton}
              >
                {/* Simple neutral minimal icon avatar */}
                <View style={styles.avatarInnerCircle}>
                  <User className="w-5 h-5 text-stone-600" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* ================= SECTION 1: "How can Tale of Two help you?" ================= */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              How can Tale of Two{'\n'}help you?
            </Text>

            {/* 2 Side-by-side Cards */}
            <View style={styles.helpCardsRow}>
              {/* Card 1: Plan My Entire Wedding */}
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="flex-1 cursor-pointer"
                onClick={() => handleOptionPress('Plan My Entire Wedding')}
              >
                <View style={[styles.helpCard, { width: '100%' }]}>
                  <View style={styles.iconCircle}>
                    <Building2 className="w-5 h-5 text-white" />
                  </View>
                  <Text style={styles.helpCardTitle}>
                    Plan My Entire{'\n'}Wedding
                  </Text>
                  <Text style={styles.helpCardSubtext}>
                    AI-powered complete wedding planning
                  </Text>
                </View>
              </motion.div>

              {/* Card 2: Find Individual Vendors */}
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="flex-1 cursor-pointer"
                onClick={() => handleOptionPress('Find Individual Vendors')}
              >
                <View style={[styles.helpCard, { width: '100%' }]}>
                  <View style={styles.iconCircle}>
                    <Store className="w-5 h-5 text-white" />
                  </View>
                  <Text style={styles.helpCardTitle}>
                    Find Individual{'\n'}Vendors
                  </Text>
                  <Text style={styles.helpCardSubtext}>
                    Explore and book best vendors
                  </Text>
                </View>
              </motion.div>
            </View>
          </View>

          {/* ================= SECTION 2: Destination Wedding Banner ================= */}
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="w-full cursor-pointer"
            onClick={() => handleOptionPress('Destination Wedding')}
          >
            <View style={styles.destinationBanner}>
              <View style={styles.bannerTextCol}>
                <Text style={styles.bannerTitle}>Destination Wedding</Text>
                <Text style={styles.bannerSubtext}>
                  Plan your dream wedding at exotic locations
                </Text>
              </View>

              {/* Tropical Palm Image Right */}
              <View style={styles.bannerImageWrapper}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
                  }}
                  style={styles.bannerImage}
                  resizeMode="cover"
                />
              </View>
            </View>
          </motion.div>

          {/* ================= SECTION 3: Popular Services ================= */}
          <View style={styles.servicesSection}>
            <View style={styles.servicesHeaderRow}>
              <Text style={styles.servicesTitle}>Popular Services</Text>
            </View>

            {/* Grid Icons (4 columns grid with perfect vertical alignment) */}
            <div className="grid grid-cols-4 gap-x-2 gap-y-4 w-full justify-items-center">
              {/* 1. Photography */}
              <motion.div
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                className="w-full cursor-pointer flex flex-col items-center gap-1"
                onClick={() => handleOptionPress('Photography')}
              >
                <View style={styles.serviceIconBox}>
                  <Camera className="w-5 h-5 text-[#581420]" />
                </View>
                <Text style={styles.serviceLabel}>Photography</Text>
              </motion.div>

              {/* 2. Makeup */}
              <motion.div
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                className="w-full cursor-pointer flex flex-col items-center gap-1"
                onClick={() => handleOptionPress('Makeup')}
              >
                <View style={styles.serviceIconBox}>
                  <Sparkles className="w-5 h-5 text-[#581420]" />
                </View>
                <Text style={styles.serviceLabel}>Makeup</Text>
              </motion.div>

              {/* 3. Decor */}
              <motion.div
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                className="w-full cursor-pointer flex flex-col items-center gap-1"
                onClick={() => handleOptionPress('Decor')}
              >
                <View style={styles.serviceIconBox}>
                  <Palette className="w-5 h-5 text-[#581420]" />
                </View>
                <Text style={styles.serviceLabel}>Decor</Text>
              </motion.div>

              {/* 4. Venue */}
              <motion.div
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                className="w-full cursor-pointer flex flex-col items-center gap-1"
                onClick={() => handleOptionPress('Venue')}
              >
                <View style={styles.serviceIconBox}>
                  <Building2 className="w-5 h-5 text-[#581420]" />
                </View>
                <Text style={styles.serviceLabel}>Venue</Text>
              </motion.div>

              {/* 5. Entertainment */}
              <motion.div
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                className="w-full cursor-pointer flex flex-col items-center gap-1"
                onClick={() => handleOptionPress('Entertainment')}
              >
                <View style={styles.serviceIconBox}>
                  <Music className="w-5 h-5 text-[#581420]" />
                </View>
                <Text style={styles.serviceLabel}>Entertainment</Text>
              </motion.div>

              {/* 6. Invitations */}
              <motion.div
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                className="w-full cursor-pointer flex flex-col items-center gap-1"
                onClick={() => handleOptionPress('Invitations')}
              >
                <View style={styles.serviceIconBox}>
                  <Mail className="w-5 h-5 text-[#581420]" />
                </View>
                <Text style={styles.serviceLabel}>Invitations</Text>
              </motion.div>

              {/* 7. Catering */}
              <motion.div
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                className="w-full cursor-pointer flex flex-col items-center gap-1"
                onClick={() => handleOptionPress('Catering')}
              >
                <View style={styles.serviceIconBox}>
                  <Utensils className="w-5 h-5 text-[#581420]" />
                </View>
                <Text style={styles.serviceLabel}>Catering</Text>
              </motion.div>

              {/* 8. Cars */}
              <motion.div
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                className="w-full cursor-pointer flex flex-col items-center gap-1"
                onClick={() => handleOptionPress('Cars')}
              >
                <View style={styles.serviceIconBox}>
                  <Car className="w-5 h-5 text-[#581420]" />
                </View>
                <Text style={styles.serviceLabel}>Cars</Text>
              </motion.div>

              {/* 9. Mehendi */}
              <motion.div
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                className="w-full cursor-pointer flex flex-col items-center gap-1"
                onClick={() => handleOptionPress('Mehendi')}
              >
                <View style={styles.serviceIconBox}>
                  <Flower2 className="w-5 h-5 text-[#581420]" />
                </View>
                <Text style={styles.serviceLabel}>Mehendi</Text>
              </motion.div>

              {/* 10. Rituals */}
              <motion.div
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                className="w-full cursor-pointer flex flex-col items-center gap-1"
                onClick={() => handleOptionPress('Rituals')}
              >
                <View style={styles.serviceIconBox}>
                  <Flame className="w-5 h-5 text-[#581420]" />
                </View>
                <Text style={styles.serviceLabel}>Rituals</Text>
              </motion.div>
            </div>
          </View>
        </ScrollView>
      )}

      {/* ================= BOTTOM TAB BAR ================= */}
      {!hideTabBar && (
        <View style={styles.bottomTabBar}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setActiveTab('home')}
          >
            <Home
              className={`w-5 h-5 ${activeTab === 'home' ? 'text-[#581420]' : 'text-stone-400'
                }`}
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === 'home' && styles.activeTabLabel,
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              if (!isPlannerCreated) {
                setSelectedFeatureName('My Wedding');
                setShowExploreModal(true);
              } else {
                setActiveTab('my-wedding');
              }
            }}
          >
            <Sparkles
              className={`w-5 h-5 ${activeTab === 'my-wedding' ? 'text-[#581420]' : 'text-stone-400'
                }`}
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === 'my-wedding' && styles.activeTabLabel,
              ]}
            >
              My Wedding
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setActiveTab('saved')}
          >
            <Heart
              className={`w-5 h-5 ${activeTab === 'saved' ? 'text-[#581420]' : 'text-stone-400'
                }`}
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === 'saved' && styles.activeTabLabel,
              ]}
            >
              Saved
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setActiveTab('quotes')}
          >
            <FileText
              className={`w-5 h-5 ${activeTab === 'quotes' ? 'text-[#581420]' : 'text-stone-400'
                }`}
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === 'quotes' && styles.activeTabLabel,
              ]}
            >
              My Quotes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              setActiveTab('profile');
              setShowProfileModal(true);
            }}
          >
            <User
              className={`w-5 h-5 ${activeTab === 'profile' ? 'text-[#581420]' : 'text-stone-400'
                }`}
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === 'profile' && styles.activeTabLabel,
              ]}
            >
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ================= PROFILE DETAILS MODAL ================= */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-sm bg-[#FAF6EE] rounded-t-3xl sm:rounded-2xl p-5 border border-stone-200 shadow-2xl flex flex-col gap-4"
            >
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>User Profile Details</Text>
                <TouchableOpacity
                  onPress={() => setShowProfileModal(false)}
                  style={styles.closeButton}
                >
                  <X className="w-5 h-5 text-stone-600" />
                </TouchableOpacity>
              </View>

              {/* Neutral Avatar & Greeting */}
              <View style={styles.modalAvatarContainer}>
                <View style={styles.modalAvatarCircle}>
                  <User className="w-8 h-8 text-[#581420]" />
                </View>
                <Text style={styles.modalUserName}>{rawName || 'Guest'}</Text>
                {userId ? (
                  <Text style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 11, fontWeight: '600', color: '#8C8283', marginTop: -2 }}>
                    ID: {userId}
                  </Text>
                ) : null}
                <View style={styles.verifiedBadge}>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <Text style={styles.verifiedBadgeText}>Verified Account</Text>
                </View>
              </View>

              {/* User Details Cards */}
              <View style={styles.modalDetailsList}>


                {/* 1. Full Name */}
                <View style={styles.modalDetailRow}>
                  <View style={styles.modalIconBox}>
                    <User className="w-4 h-4 text-stone-600" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalDetailLabel}>Full Name</Text>
                    <Text style={styles.modalDetailValue}>{rawName}</Text>
                  </View>
                </View>

                {/* 2. Mobile Number */}
                <View style={styles.modalDetailRow}>
                  <View style={styles.modalIconBox}>
                    <Phone className="w-4 h-4 text-stone-600" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalDetailLabel}>Mobile Number</Text>
                    <Text style={styles.modalDetailValue}>{displayMobile}</Text>
                  </View>
                </View>

                {/* 3. Email Address */}
                <View style={styles.modalDetailRow}>
                  <View style={styles.modalIconBox}>
                    <Mail className="w-4 h-4 text-stone-600" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalDetailLabel}>Email Address</Text>
                    <Text style={styles.modalDetailValue}>{displayEmail}</Text>
                  </View>
                </View>
              </View>

              {/* Actions Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setShowProfileModal(false);
                  if (onLogout) onLogout();
                }}
                style={styles.modalLogoutButton}
              >
                <LogOut className="w-4 h-4 text-rose-700" />
                <Text style={styles.modalLogoutText}>Sign Out / Change Account</Text>
              </TouchableOpacity>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ================= REGISTER TO EXPLORE MORE POPUP MODAL ================= */}
      <AnimatePresence>
        {showExploreModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="w-full max-w-xs bg-[#FAF6EE] rounded-2xl p-6 border border-[#E2DDD5] shadow-2xl flex flex-col items-center gap-4 text-center"
            >
              {/* Icon Circle matching theme */}
              <View style={styles.explorePopupIconCircle}>
                <Sparkles className="w-6 h-6 text-[#581420]" />
              </View>

              {/* Message */}
              <View style={{ gap: 4, alignItems: 'center' }}>
                <Text style={styles.explorePopupTitle}>
                  {selectedFeatureName === 'My Wedding'
                    ? 'Unlock My Wedding'
                    : selectedFeatureName || 'Feature'}
                </Text>
                <Text style={styles.explorePopupMessage}>
                  {selectedFeatureName === 'My Wedding'
                    ? 'Create your AI Wedding Planner first to unlock full access to My Wedding.'
                    : 'Register to explore more'}
                </Text>
              </View>

              {/* Okay Button */}
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => {
                  setShowExploreModal(false);
                  if (onNavigateToCoupleOnboarding) {
                    onNavigateToCoupleOnboarding();
                  }
                }}
                style={styles.explorePopupOkButton}
              >
                <Text style={styles.explorePopupOkButtonText}>
                  {selectedFeatureName === 'My Wedding' ? 'Plan My Wedding Now' : 'Okay'}
                </Text>
              </TouchableOpacity>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FAF6EE',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  greetingContainer: {
    gap: 2,
  },
  greetingTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 26,
    fontWeight: '700',
    color: '#2A2425',
  },
  greetingSubtitle: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11.5,
    color: '#635B5C',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bellButton: {
    width: 36,
    height: 36,
    borderRadius: 9999,
    backgroundColor: '#F3EBE1',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellBadge: {
    position: 'absolute',
    top: 7,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 9999,
    backgroundColor: '#581420',
  },
  profileAvatarButton: {
    width: 38,
    height: 38,
    borderRadius: 9999,
    borderWidth: 1.5,
    borderColor: '#581420',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5ECE3',
  },
  avatarInnerCircle: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    backgroundColor: '#EBE2D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 22,
    fontWeight: '700',
    color: '#2A2425',
    lineHeight: 25,
  },
  helpCardsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  helpCard: {
    flex: 1,
    backgroundColor: '#F7EFF1',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EFE5E7',
    gap: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    backgroundColor: '#581420',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  helpCardTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 15,
    fontWeight: '700',
    color: '#581420',
    lineHeight: 17,
  },
  helpCardSubtext: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 10,
    color: '#635B5C',
    lineHeight: 13,
  },
  destinationBanner: {
    width: '100%',
    backgroundColor: '#F8F1E5',
    borderRadius: 18,
    padding: 12,
    paddingLeft: 14,
    borderWidth: 1,
    borderColor: '#EBE2D4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  bannerTextCol: {
    flex: 1,
    gap: 4,
    paddingRight: 8,
  },
  bannerTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 17,
    fontWeight: '700',
    color: '#8A5D28',
  },
  bannerSubtext: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 10.5,
    color: '#635B5C',
    lineHeight: 14,
  },
  bannerImageWrapper: {
    width: 80,
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  servicesSection: {
    gap: 12,
    marginTop: 2,
  },
  servicesHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicesTitle: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 15,
    fontWeight: '700',
    color: '#2A2425',
  },
  viewAllText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 12,
    fontWeight: '600',
    color: '#581420',
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  serviceItem: {
    width: '22%',
    alignItems: 'center',
    gap: 4,
  },
  serviceIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F5ECE3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceLabel: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 9.5,
    fontWeight: '500',
    color: '#524C4D',
    textAlign: 'center',
  },
  bottomTabBar: {
    width: '100%',
    height: 56,
    backgroundColor: '#FAF6EE',
    borderTopWidth: 1,
    borderTopColor: '#EBE2D7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabLabel: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 9.5,
    fontWeight: '500',
    color: '#A39B9C',
  },
  activeTabLabel: {
    color: '#581420',
    fontWeight: '700',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 20,
    fontWeight: '700',
    color: '#581420',
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#EBE2D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalAvatarContainer: {
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  modalAvatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 9999,
    backgroundColor: '#F5ECE3',
    borderWidth: 2,
    borderColor: '#581420',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalUserName: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 16,
    fontWeight: '700',
    color: '#2A2425',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  verifiedBadgeText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 10.5,
    fontWeight: '600',
    color: '#065F46',
  },
  modalDetailsList: {
    gap: 8,
  },
  modalDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E2D9',
  },
  modalIconBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#F3EBE1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDetailLabel: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 9.5,
    color: '#8C8283',
  },
  modalDetailValue: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 12.5,
    fontWeight: '600',
    color: '#231F20',
  },
  modalLogoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 12,
    marginTop: 4,
  },
  modalLogoutText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 12,
    fontWeight: '600',
    color: '#B91C1C',
  },
  explorePopupIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: '#F5ECE3',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8DEC3',
  },
  explorePopupTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 20,
    fontWeight: '700',
    color: '#581420',
    textAlign: 'center',
  },
  explorePopupMessage: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13.5,
    fontWeight: '500',
    color: '#524C4D',
    textAlign: 'center',
  },
  explorePopupOkButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#581420',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    shadowColor: '#581420',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  explorePopupOkButtonText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
