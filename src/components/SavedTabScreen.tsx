import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native-web';
import { Bookmark, Star, MapPin, Heart, Camera, Sparkles, Flower2, Building2, Music, Mail, Palette, Utensils, Scissors, ArrowLeft, Scale, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PhotographyStudio, STUDIOS_DATA } from './PhotographyListingPage';
import { StudioDetailPage } from './StudioDetailPage';
import { MakeupStudio, MAKEUP_STUDIOS_DATA } from './MakeupListingPage';
import { MakeupDetailPage } from './MakeupDetailPage';
import { DecorStudio, DecorDetailPage } from './DecorDetailPage';
import { DECOR_STUDIOS_DATA } from './DecorListingPage';
import { VenueItem, VENUES_DATA } from './VenueListingPage';
import { VenueDetailPage } from './VenueDetailPage';
import { EntertainmentItem, ENTERTAINMENT_DATA } from '../constants/EntertainmentData';
import { EntertainmentDetailPage } from './EntertainmentDetailPage';
import { InvitationItem, INVITATIONS_DATA } from './InvitationListingPage';
import { InvitationDetailPage } from './InvitationDetailPage';
import { CarItem, CARS_DATA } from '../constants/CarsData';
import { CarsDetailPage } from './CarsDetailPage';
import { MehendiArtist, MEHENDI_DATA } from './MehendiListingPage';
import { ArtistDetailPage } from './ArtistDetailPage';
import { CateringVendor, CATERING_DATA } from './CateringListingPage';
import { CatererDetailPage } from './CatererDetailPage';
import { VendorCompareModal, GenericVendor } from './VendorCompareModal';

interface SavedTabScreenProps {
  savedStudioIds?: Record<string, boolean>;
  onToggleSavedStudio?: (id: string) => void;
  onExplorePhotography?: () => void;
  savedMakeupIds?: Record<string, boolean>;
  onToggleSavedMakeup?: (id: string) => void;
  onExploreMakeup?: () => void;
  savedDecorIds?: Record<string, boolean>;
  onToggleSavedDecor?: (id: string) => void;
  onExploreDecor?: () => void;
  savedVenueIds?: Record<string, boolean>;
  onToggleSavedVenue?: (id: string) => void;
  onExploreVenues?: () => void;
  savedEntIds?: Record<string, boolean>;
  onToggleSavedEnt?: (id: string) => void;
  onExploreEntertainment?: () => void;
  savedCarIds?: Record<string, boolean>;
  onToggleSavedCar?: (id: string) => void;
  onExploreCars?: () => void;
  savedInviteIds?: Record<string, boolean>;
  onToggleSavedInvite?: (id: string) => void;
  onExploreInvitations?: () => void;
  savedMehendiIds?: Record<string, boolean>;
  onToggleSavedMehendi?: (id: string) => void;
  onExploreMehendi?: () => void;
  savedCateringIds?: Record<string, boolean>;
  onToggleSavedCatering?: (id: string) => void;
  onExploreCatering?: () => void;
  onHideTabBar?: (hide: boolean) => void;
  onNavigateToHome?: () => void;
}

export const SavedTabScreen: React.FC<SavedTabScreenProps> = ({
  savedStudioIds = {},
  onToggleSavedStudio,
  onExplorePhotography,
  savedMakeupIds = {},
  onToggleSavedMakeup,
  onExploreMakeup,
  savedDecorIds = {},
  onToggleSavedDecor,
  onExploreDecor,
  savedVenueIds = {},
  onToggleSavedVenue,
  onExploreVenues,
  savedEntIds = {},
  onToggleSavedEnt,
  onExploreEntertainment,
  savedCarIds = {},
  onToggleSavedCar,
  onExploreCars,
  savedInviteIds = {},
  onToggleSavedInvite,
  onExploreInvitations,
  savedMehendiIds = {},
  onToggleSavedMehendi,
  onExploreMehendi,
  savedCateringIds = {},
  onToggleSavedCatering,
  onExploreCatering,
  onHideTabBar,
  onNavigateToHome,
}) => {
  const [activeCategory, setActiveCategory] = useState<
    'All' | 'Photography' | 'Makeup' | 'Venues' | 'Decor' | 'Entertainment' | 'Cars' | 'Invitations' | 'Mehendi' | 'Catering'
  >('All');
  const [selectedStudio, setSelectedStudio] = useState<PhotographyStudio | null>(null);
  const [selectedMakeup, setSelectedMakeup] = useState<MakeupStudio | null>(null);
  const [selectedDecor, setSelectedDecor] = useState<DecorStudio | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<VenueItem | null>(null);
  const [selectedEnt, setSelectedEnt] = useState<EntertainmentItem | null>(null);
  const [selectedInvite, setSelectedInvite] = useState<InvitationItem | null>(null);
  const [selectedCar, setSelectedCar] = useState<CarItem | null>(null);
  const [selectedMehendi, setSelectedMehendi] = useState<MehendiArtist | null>(null);
  const [selectedCatering, setSelectedCatering] = useState<CateringVendor | null>(null);

  // Vendor Comparison Modal State
  const [compareModalVisible, setCompareModalVisible] = useState(false);
  const [compareCategoryTitle, setCompareCategoryTitle] = useState('');
  const [compareVendorsList, setCompareVendorsList] = useState<GenericVendor[]>([]);

  const handleOpenCompare = (title: string, list: any[]) => {
    setCompareCategoryTitle(title);
    setCompareVendorsList(list);
    setCompareModalVisible(true);
  };

  const handleSelectVendorFromCompare = (vendor: GenericVendor) => {
    if (compareCategoryTitle === 'Photography') {
      const match = STUDIOS_DATA.find((s) => s.id === vendor.id);
      if (match) setSelectedStudio(match);
    } else if (compareCategoryTitle === 'Makeup') {
      const match = MAKEUP_STUDIOS_DATA.find((m) => m.id === vendor.id);
      if (match) setSelectedMakeup(match);
    } else if (compareCategoryTitle === 'Decor') {
      const match = DECOR_STUDIOS_DATA.find((d) => d.id === vendor.id);
      if (match) setSelectedDecor(match);
    } else if (compareCategoryTitle === 'Venues') {
      const match = VENUES_DATA.find((v) => v.id === vendor.id);
      if (match) setSelectedVenue(match);
    } else if (compareCategoryTitle === 'Entertainment') {
      const match = ENTERTAINMENT_DATA.find((e) => e.id === vendor.id);
      if (match) setSelectedEnt(match);
    } else if (compareCategoryTitle === 'Cars') {
      const match = CARS_DATA.find((c) => c.id === vendor.id);
      if (match) setSelectedCar(match);
    } else if (compareCategoryTitle === 'Invitations') {
      const match = INVITATIONS_DATA.find((i) => i.id === vendor.id);
      if (match) setSelectedInvite(match);
    } else if (compareCategoryTitle === 'Mehendi') {
      const match = MEHENDI_DATA.find((m) => m.id === vendor.id);
      if (match) setSelectedMehendi(match);
    } else if (compareCategoryTitle === 'Catering') {
      const match = CATERING_DATA.find((c) => c.id === vendor.id);
      if (match) setSelectedCatering(match);
    }
  };

  const isAnyDetailOpen = Boolean(
    selectedStudio ||
    selectedMakeup ||
    selectedDecor ||
    selectedVenue ||
    selectedEnt ||
    selectedCar ||
    selectedInvite ||
    selectedMehendi ||
    selectedCatering ||
    compareModalVisible
  );

  useEffect(() => {
    if (onHideTabBar) {
      onHideTabBar(isAnyDetailOpen);
    }
    return () => {
      if (onHideTabBar) {
        onHideTabBar(false);
      }
    };
  }, [isAnyDetailOpen, onHideTabBar]);

  const savedStudios = STUDIOS_DATA.filter((s) => Boolean(savedStudioIds[s.id]));
  const savedMakeups = MAKEUP_STUDIOS_DATA.filter((m) => Boolean(savedMakeupIds[m.id]));
  const savedDecors = DECOR_STUDIOS_DATA.filter((d) => Boolean(savedDecorIds[d.id]));
  const savedVenues = VENUES_DATA.filter((v) => Boolean(savedVenueIds[v.id]));
  const savedEnts = ENTERTAINMENT_DATA.filter((e) => Boolean(savedEntIds[e.id]));
  const savedInvites = INVITATIONS_DATA.filter((i) => Boolean(savedInviteIds[i.id]));
  const savedCars = CARS_DATA.filter((c) => Boolean(savedCarIds[c.id]));
  const savedMehendis = MEHENDI_DATA.filter((m) => Boolean(savedMehendiIds[m.id]));
  const savedCaterings = CATERING_DATA.filter((c) => Boolean(savedCateringIds[c.id]));

  if (selectedStudio) {
    return (
      <StudioDetailPage
        studio={selectedStudio}
        onBack={() => setSelectedStudio(null)}
        isBookmarked={Boolean(savedStudioIds[selectedStudio.id])}
        onToggleBookmark={(id) => onToggleSavedStudio && onToggleSavedStudio(id)}
      />
    );
  }

  if (selectedMakeup) {
    return (
      <MakeupDetailPage
        studio={selectedMakeup}
        onBack={() => setSelectedMakeup(null)}
        isBookmarked={Boolean(savedMakeupIds[selectedMakeup.id])}
        onToggleBookmark={(id) => onToggleSavedMakeup && onToggleSavedMakeup(id)}
      />
    );
  }

  if (selectedDecor) {
    return (
      <DecorDetailPage
        studio={selectedDecor}
        onBack={() => setSelectedDecor(null)}
        isBookmarked={Boolean(savedDecorIds[selectedDecor.id])}
        onToggleBookmark={(id) => onToggleSavedDecor && onToggleSavedDecor(id)}
      />
    );
  }

  if (selectedVenue) {
    return (
      <VenueDetailPage
        venue={selectedVenue}
        onBack={() => setSelectedVenue(null)}
        isBookmarked={Boolean(savedVenueIds[selectedVenue.id])}
        onToggleBookmark={(id) => onToggleSavedVenue && onToggleSavedVenue(id)}
      />
    );
  }

  if (selectedEnt) {
    return (
      <EntertainmentDetailPage
        artist={selectedEnt}
        onBack={() => setSelectedEnt(null)}
        isBookmarked={Boolean(savedEntIds[selectedEnt.id])}
        onToggleBookmark={(id) => onToggleSavedEnt && onToggleSavedEnt(id)}
      />
    );
  }

  if (selectedCar) {
    return (
      <CarsDetailPage
        car={selectedCar}
        onBack={() => setSelectedCar(null)}
        isBookmarked={Boolean(savedCarIds[selectedCar.id])}
        onToggleBookmark={(id) => onToggleSavedCar && onToggleSavedCar(id)}
      />
    );
  }

  if (selectedInvite) {
    return (
      <InvitationDetailPage
        invite={selectedInvite}
        onBack={() => setSelectedInvite(null)}
        isBookmarked={Boolean(savedInviteIds[selectedInvite.id])}
        onToggleBookmark={(id) => onToggleSavedInvite && onToggleSavedInvite(id)}
      />
    );
  }

  if (selectedMehendi) {
    return (
      <ArtistDetailPage
        artist={selectedMehendi}
        onBack={() => setSelectedMehendi(null)}
        isBookmarked={Boolean(savedMehendiIds[selectedMehendi.id])}
        onToggleBookmark={(id) => onToggleSavedMehendi && onToggleSavedMehendi(id)}
      />
    );
  }

  if (selectedCatering) {
    return (
      <CatererDetailPage
        caterer={selectedCatering}
        onBack={() => setSelectedCatering(null)}
        isBookmarked={Boolean(savedCateringIds[selectedCatering.id])}
        onToggleBookmark={(id) => onToggleSavedCatering && onToggleSavedCatering(id)}
      />
    );
  }

  const savedCount =
    savedStudios.length +
    savedMakeups.length +
    savedDecors.length +
    savedVenues.length +
    savedEnts.length +
    savedCars.length +
    savedInvites.length +
    savedMehendis.length +
    savedCaterings.length;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {onNavigateToHome && (
            <TouchableOpacity onPress={onNavigateToHome} style={{ marginRight: 12 }}>
              <ArrowLeft className="w-6 h-6 text-stone-800" />
            </TouchableOpacity>
          )}
          <View>
            <Text style={styles.headerTitle}>Saved Items</Text>
            <Text style={styles.headerSubtitle}>Your bookmarked vendors and inspirations</Text>
          </View>
        </View>
        <View style={styles.countBadge}>
          <Heart className="w-3.5 h-3.5 text-[#581420] fill-[#581420] mr-1" />
          <Text style={styles.countBadgeText}>{savedCount}</Text>
        </View>
      </View>

      {/* CATEGORY FILTER CHIPS */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          <TouchableOpacity
            style={[styles.filterChip, activeCategory === 'All' && styles.filterChipActive]}
            onPress={() => setActiveCategory('All')}
          >
            <Text style={[styles.filterChipText, activeCategory === 'All' && styles.filterChipTextActive]}>
              All ({savedCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeCategory === 'Photography' && styles.filterChipActive]}
            onPress={() => setActiveCategory('Photography')}
          >
            <Text style={[styles.filterChipText, activeCategory === 'Photography' && styles.filterChipTextActive]}>
              Photography ({savedStudios.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeCategory === 'Makeup' && styles.filterChipActive]}
            onPress={() => setActiveCategory('Makeup')}
          >
            <Text style={[styles.filterChipText, activeCategory === 'Makeup' && styles.filterChipTextActive]}>
              Makeup ({savedMakeups.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeCategory === 'Decor' && styles.filterChipActive]}
            onPress={() => setActiveCategory('Decor')}
          >
            <Text style={[styles.filterChipText, activeCategory === 'Decor' && styles.filterChipTextActive]}>
              Decor ({savedDecors.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeCategory === 'Venues' && styles.filterChipActive]}
            onPress={() => setActiveCategory('Venues')}
          >
            <Text style={[styles.filterChipText, activeCategory === 'Venues' && styles.filterChipTextActive]}>
              Venues ({savedVenues.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeCategory === 'Entertainment' && styles.filterChipActive]}
            onPress={() => setActiveCategory('Entertainment')}
          >
            <Text style={[styles.filterChipText, activeCategory === 'Entertainment' && styles.filterChipTextActive]}>
              Entertainment ({savedEnts.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeCategory === 'Cars' && styles.filterChipActive]}
            onPress={() => setActiveCategory('Cars')}
          >
            <Text style={[styles.filterChipText, activeCategory === 'Cars' && styles.filterChipTextActive]}>
              Cars ({savedCars.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeCategory === 'Invitations' && styles.filterChipActive]}
            onPress={() => setActiveCategory('Invitations')}
          >
            <Text style={[styles.filterChipText, activeCategory === 'Invitations' && styles.filterChipTextActive]}>
              Invitations ({savedInvites.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeCategory === 'Mehendi' && styles.filterChipActive]}
            onPress={() => setActiveCategory('Mehendi')}
          >
            <Text style={[styles.filterChipText, activeCategory === 'Mehendi' && styles.filterChipTextActive]}>
              Mehendi ({savedMehendis.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeCategory === 'Catering' && styles.filterChipActive]}
            onPress={() => setActiveCategory('Catering')}
          >
            <Text style={[styles.filterChipText, activeCategory === 'Catering' && styles.filterChipTextActive]}>
              Catering ({savedCaterings.length})
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* MAIN CONTENT AREA */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {savedCount === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Heart className="w-10 h-10 text-[#8B1E2F]" />
            </View>
            <Text style={styles.emptyTitle}>No Saved Items Yet</Text>
            <Text style={styles.emptySub}>
              Tap the bookmark or heart icon on any venue, artist, decorator or studio to save it here.
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14, justifyContent: 'center' }}>
              {onExplorePhotography && (
                <TouchableOpacity style={styles.exploreBtn} onPress={onExplorePhotography} activeOpacity={0.8}>
                  <Camera className="w-4 h-4 text-white mr-1.5" />
                  <Text style={styles.exploreBtnText}>Photography</Text>
                </TouchableOpacity>
              )}

              {onExploreMakeup && (
                <TouchableOpacity style={styles.exploreBtn} onPress={onExploreMakeup} activeOpacity={0.8}>
                  <Sparkles className="w-4 h-4 text-white mr-1.5" />
                  <Text style={styles.exploreBtnText}>Makeup</Text>
                </TouchableOpacity>
              )}

              {onExploreDecor && (
                <TouchableOpacity style={styles.exploreBtn} onPress={onExploreDecor} activeOpacity={0.8}>
                  <Palette className="w-4 h-4 text-white mr-1.5" />
                  <Text style={styles.exploreBtnText}>Decor</Text>
                </TouchableOpacity>
              )}

              {onExploreVenues && (
                <TouchableOpacity style={styles.exploreBtn} onPress={onExploreVenues} activeOpacity={0.8}>
                  <Building2 className="w-4 h-4 text-white mr-1.5" />
                  <Text style={styles.exploreBtnText}>Venues</Text>
                </TouchableOpacity>
              )}

              {onExploreEntertainment && (
                <TouchableOpacity style={styles.exploreBtn} onPress={onExploreEntertainment} activeOpacity={0.8}>
                  <Music className="w-4 h-4 text-white mr-1.5" />
                  <Text style={styles.exploreBtnText}>Entertainment</Text>
                </TouchableOpacity>
              )}

              {onExploreCars && (
                <TouchableOpacity style={styles.exploreBtn} onPress={onExploreCars} activeOpacity={0.8}>
                  <Text style={styles.exploreBtnText}>Cars</Text>
                </TouchableOpacity>
              )}

              {onExploreInvitations && (
                <TouchableOpacity style={styles.exploreBtn} onPress={onExploreInvitations} activeOpacity={0.8}>
                  <Mail className="w-4 h-4 text-white mr-1.5" />
                  <Text style={styles.exploreBtnText}>Invitations</Text>
                </TouchableOpacity>
              )}

              {onExploreMehendi && (
                <TouchableOpacity style={styles.exploreBtn} onPress={onExploreMehendi} activeOpacity={0.8}>
                  <Scissors className="w-4 h-4 text-white mr-1.5" />
                  <Text style={styles.exploreBtnText}>Mehendi</Text>
                </TouchableOpacity>
              )}

              {onExploreCatering && (
                <TouchableOpacity style={styles.exploreBtn} onPress={onExploreCatering} activeOpacity={0.8}>
                  <Utensils className="w-4 h-4 text-white mr-1.5" />
                  <Text style={styles.exploreBtnText}>Catering</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.savedList}>
            {/* PHOTOGRAPHY SECTION */}
            {(activeCategory === 'All' || activeCategory === 'Photography') && savedStudios.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Photography ({savedStudios.length})</Text>
                  {onExplorePhotography && (
                    <TouchableOpacity onPress={onExplorePhotography}>
                      <Text style={styles.browseMoreText}>+ Explore More</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {savedStudios.map((studio) => (
                  <motion.div key={studio.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full mb-3.5">
                    <View style={styles.studioCard}>
                      <Image source={{ uri: studio.image }} style={styles.studioImage} resizeMode="cover" />
                      <View style={styles.cardRightCol}>
                        <View style={styles.cardHeaderRow}>
                          <Text style={styles.studioName} numberOfLines={1}>{studio.name}</Text>
                          <TouchableOpacity onPress={() => onToggleSavedStudio && onToggleSavedStudio(studio.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Bookmark className="w-4 h-4 text-[#8B1E2F] fill-[#8B1E2F]" />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.ratingRow}>
                          <Star className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C] mr-1" />
                          <Text style={styles.ratingText}>{studio.rating} <Text style={styles.reviewsText}>({studio.reviewsCount})</Text></Text>
                        </View>
                        <View style={styles.locationRow}>
                          <MapPin className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                          <Text style={styles.locationText}>{studio.location}</Text>
                        </View>
                        <View style={styles.cardBottomRow}>
                          <Text style={styles.priceText}>{studio.startingPrice}</Text>
                          <TouchableOpacity style={styles.viewDetailsBtn} onPress={() => setSelectedStudio(studio)} activeOpacity={0.8}>
                            <Text style={styles.viewDetailsBtnText}>View Details</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </motion.div>
                ))}

                {/* Compare Button Down (Solid Burgundy Pill) */}
                {savedStudios.length >= 2 && (
                  <View style={styles.compareBtnContainer}>
                    <TouchableOpacity
                      style={styles.sectionBottomCompareBtn}
                      onPress={() => handleOpenCompare('Photography', savedStudios)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.sectionBottomCompareBtnText}>Compare Photography</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {/* MAKEUP SECTION */}
            {(activeCategory === 'All' || activeCategory === 'Makeup') && savedMakeups.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Makeup Artists ({savedMakeups.length})</Text>
                  {onExploreMakeup && (
                    <TouchableOpacity onPress={onExploreMakeup}>
                      <Text style={styles.browseMoreText}>+ Explore More</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {savedMakeups.map((m) => (
                  <motion.div key={m.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full mb-3.5">
                    <View style={styles.studioCard}>
                      <Image source={{ uri: m.image }} style={styles.studioImage} resizeMode="cover" />
                      <View style={styles.cardRightCol}>
                        <View style={styles.cardHeaderRow}>
                          <Text style={styles.studioName} numberOfLines={1}>{m.name}</Text>
                          <TouchableOpacity onPress={() => onToggleSavedMakeup && onToggleSavedMakeup(m.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Bookmark className="w-4 h-4 text-[#8B1E2F] fill-[#8B1E2F]" />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.ratingRow}>
                          <Star className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C] mr-1" />
                          <Text style={styles.ratingText}>{m.rating} <Text style={styles.reviewsText}>({m.reviewsCount})</Text></Text>
                        </View>
                        <View style={styles.locationRow}>
                          <MapPin className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                          <Text style={styles.locationText}>{m.location}</Text>
                        </View>
                        <View style={styles.cardBottomRow}>
                          <Text style={styles.priceText}>{m.startingPrice}</Text>
                          <TouchableOpacity style={styles.viewDetailsBtn} onPress={() => setSelectedMakeup(m)} activeOpacity={0.8}>
                            <Text style={styles.viewDetailsBtnText}>View Details</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </motion.div>
                ))}

                {/* Compare Button Down (Solid Burgundy Pill) */}
                {savedMakeups.length >= 2 && (
                  <View style={styles.compareBtnContainer}>
                    <TouchableOpacity
                      style={styles.sectionBottomCompareBtn}
                      onPress={() => handleOpenCompare('Makeup', savedMakeups)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.sectionBottomCompareBtnText}>Compare Makeup</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {/* DECOR SECTION */}
            {(activeCategory === 'All' || activeCategory === 'Decor') && savedDecors.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Wedding Decorators ({savedDecors.length})</Text>
                  {onExploreDecor && (
                    <TouchableOpacity onPress={onExploreDecor}>
                      <Text style={styles.browseMoreText}>+ Explore More</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {savedDecors.map((d) => (
                  <motion.div key={d.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full mb-3.5">
                    <View style={styles.studioCard}>
                      <Image source={{ uri: d.image }} style={styles.studioImage} resizeMode="cover" />
                      <View style={styles.cardRightCol}>
                        <View style={styles.cardHeaderRow}>
                          <Text style={styles.studioName} numberOfLines={1}>{d.name}</Text>
                          <TouchableOpacity onPress={() => onToggleSavedDecor && onToggleSavedDecor(d.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Bookmark className="w-4 h-4 text-[#8B1E2F] fill-[#8B1E2F]" />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.ratingRow}>
                          <Star className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C] mr-1" />
                          <Text style={styles.ratingText}>{d.rating} <Text style={styles.reviewsText}>({d.reviewsCount})</Text></Text>
                        </View>
                        <View style={styles.locationRow}>
                          <MapPin className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                          <Text style={styles.locationText}>{d.location}</Text>
                        </View>
                        <View style={styles.cardBottomRow}>
                          <Text style={styles.priceText}>{d.startingPrice}</Text>
                          <TouchableOpacity style={styles.viewDetailsBtn} onPress={() => setSelectedDecor(d)} activeOpacity={0.8}>
                            <Text style={styles.viewDetailsBtnText}>View Details</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </motion.div>
                ))}

                {/* Compare Button Down (Solid Burgundy Pill) */}
                {savedDecors.length >= 2 && (
                  <View style={styles.compareBtnContainer}>
                    <TouchableOpacity
                      style={styles.sectionBottomCompareBtn}
                      onPress={() => handleOpenCompare('Decor', savedDecors)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.sectionBottomCompareBtnText}>Compare Decorators</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {/* VENUES SECTION */}
            {(activeCategory === 'All' || activeCategory === 'Venues') && savedVenues.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Venues ({savedVenues.length})</Text>
                  {onExploreVenues && (
                    <TouchableOpacity onPress={onExploreVenues}>
                      <Text style={styles.browseMoreText}>+ Explore More</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {savedVenues.map((v) => (
                  <motion.div key={v.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full mb-3.5">
                    <View style={styles.studioCard}>
                      <Image source={{ uri: v.image }} style={styles.studioImage} resizeMode="cover" />
                      <View style={styles.cardRightCol}>
                        <View style={styles.cardHeaderRow}>
                          <Text style={styles.studioName} numberOfLines={1}>{v.name}</Text>
                          <TouchableOpacity onPress={() => onToggleSavedVenue && onToggleSavedVenue(v.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Bookmark className="w-4 h-4 text-[#8B1E2F] fill-[#8B1E2F]" />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.ratingRow}>
                          <Star className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C] mr-1" />
                          <Text style={styles.ratingText}>{v.rating} <Text style={styles.reviewsText}>({v.reviewsCount})</Text></Text>
                        </View>
                        <View style={styles.locationRow}>
                          <MapPin className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                          <Text style={styles.locationText}>{v.location}</Text>
                        </View>
                        <View style={styles.cardBottomRow}>
                          <Text style={styles.priceText}>{v.startingPrice}</Text>
                          <TouchableOpacity style={styles.viewDetailsBtn} onPress={() => setSelectedVenue(v)} activeOpacity={0.8}>
                            <Text style={styles.viewDetailsBtnText}>View Details</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </motion.div>
                ))}

                {/* Compare Button Down (Solid Burgundy Pill) */}
                {savedVenues.length >= 2 && (
                  <View style={styles.compareBtnContainer}>
                    <TouchableOpacity
                      style={styles.sectionBottomCompareBtn}
                      onPress={() => handleOpenCompare('Venues', savedVenues)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.sectionBottomCompareBtnText}>Compare Venues</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {/* ENTERTAINMENT SECTION */}
            {(activeCategory === 'All' || activeCategory === 'Entertainment') && savedEnts.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Entertainment ({savedEnts.length})</Text>
                  {onExploreEntertainment && (
                    <TouchableOpacity onPress={onExploreEntertainment}>
                      <Text style={styles.browseMoreText}>+ Explore More</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {savedEnts.map((e) => (
                  <motion.div key={e.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full mb-3.5">
                    <View style={styles.studioCard}>
                      <Image source={{ uri: e.image }} style={styles.studioImage} resizeMode="cover" />
                      <View style={styles.cardRightCol}>
                        <View style={styles.cardHeaderRow}>
                          <Text style={styles.studioName} numberOfLines={1}>{e.name}</Text>
                          <TouchableOpacity onPress={() => onToggleSavedEnt && onToggleSavedEnt(e.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Bookmark className="w-4 h-4 text-[#8B1E2F] fill-[#8B1E2F]" />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.ratingRow}>
                          <Star className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C] mr-1" />
                          <Text style={styles.ratingText}>{e.rating} <Text style={styles.reviewsText}>({e.reviewsCount})</Text></Text>
                        </View>
                        <View style={styles.locationRow}>
                          <MapPin className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                          <Text style={styles.locationText}>{e.location}</Text>
                        </View>
                        <View style={styles.cardBottomRow}>
                          <Text style={styles.priceText}>{e.startingPrice}</Text>
                          <TouchableOpacity style={styles.viewDetailsBtn} onPress={() => setSelectedEnt(e)} activeOpacity={0.8}>
                            <Text style={styles.viewDetailsBtnText}>View Details</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </motion.div>
                ))}

                {/* Compare Button Down (Solid Burgundy Pill) */}
                {savedEnts.length >= 2 && (
                  <View style={styles.compareBtnContainer}>
                    <TouchableOpacity
                      style={styles.sectionBottomCompareBtn}
                      onPress={() => handleOpenCompare('Entertainment', savedEnts)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.sectionBottomCompareBtnText}>Compare Entertainment</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {/* CARS SECTION */}
            {(activeCategory === 'All' || activeCategory === 'Cars') && savedCars.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Cars ({savedCars.length})</Text>
                  {onExploreCars && (
                    <TouchableOpacity onPress={onExploreCars}>
                      <Text style={styles.browseMoreText}>+ Explore More</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {savedCars.map((c) => (
                  <motion.div key={c.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full mb-3.5">
                    <View style={styles.studioCard}>
                      <Image source={{ uri: c.image }} style={styles.studioImage} resizeMode="cover" />
                      <View style={styles.cardRightCol}>
                        <View style={styles.cardHeaderRow}>
                          <Text style={styles.studioName} numberOfLines={1}>{c.name}</Text>
                          <TouchableOpacity onPress={() => onToggleSavedCar && onToggleSavedCar(c.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Bookmark className="w-4 h-4 text-[#8B1E2F] fill-[#8B1E2F]" />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.ratingRow}>
                          <Star className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C] mr-1" />
                          <Text style={styles.ratingText}>{c.rating} <Text style={styles.reviewsText}>({c.reviewsCount})</Text></Text>
                        </View>
                        <View style={styles.locationRow}>
                          <MapPin className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                          <Text style={styles.locationText}>{c.location}</Text>
                        </View>
                        <View style={styles.cardBottomRow}>
                          <Text style={styles.priceText}>{c.startingPrice}</Text>
                          <TouchableOpacity style={styles.viewDetailsBtn} onPress={() => setSelectedCar(c)} activeOpacity={0.8}>
                            <Text style={styles.viewDetailsBtnText}>View Details</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </motion.div>
                ))}

                {/* Compare Button Down (Solid Burgundy Pill) */}
                {savedCars.length >= 2 && (
                  <View style={styles.compareBtnContainer}>
                    <TouchableOpacity
                      style={styles.sectionBottomCompareBtn}
                      onPress={() => handleOpenCompare('Cars', savedCars)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.sectionBottomCompareBtnText}>Compare Luxury Cars</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {/* INVITATIONS SECTION */}
            {(activeCategory === 'All' || activeCategory === 'Invitations') && savedInvites.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Invitations ({savedInvites.length})</Text>
                  {onExploreInvitations && (
                    <TouchableOpacity onPress={onExploreInvitations}>
                      <Text style={styles.browseMoreText}>+ Explore More</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {savedInvites.map((inv) => (
                  <motion.div key={inv.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full mb-3.5">
                    <View style={styles.studioCard}>
                      <Image source={{ uri: inv.image }} style={styles.studioImage} resizeMode="cover" />
                      <View style={styles.cardRightCol}>
                        <View style={styles.cardHeaderRow}>
                          <Text style={styles.studioName} numberOfLines={1}>{inv.name}</Text>
                          <TouchableOpacity onPress={() => onToggleSavedInvite && onToggleSavedInvite(inv.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Bookmark className="w-4 h-4 text-[#8B1E2F] fill-[#8B1E2F]" />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.ratingRow}>
                          <Star className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C] mr-1" />
                          <Text style={styles.ratingText}>{inv.rating} <Text style={styles.reviewsText}>({inv.reviewsCount})</Text></Text>
                        </View>
                        <View style={styles.locationRow}>
                          <MapPin className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                          <Text style={styles.locationText}>{inv.location}</Text>
                        </View>
                        <View style={styles.cardBottomRow}>
                          <Text style={styles.priceText}>{inv.startingPrice}</Text>
                          <TouchableOpacity style={styles.viewDetailsBtn} onPress={() => setSelectedInvite(inv)} activeOpacity={0.8}>
                            <Text style={styles.viewDetailsBtnText}>View Details</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </motion.div>
                ))}

                {/* Compare Button Down (Solid Burgundy Pill) */}
                {savedInvites.length >= 2 && (
                  <View style={styles.compareBtnContainer}>
                    <TouchableOpacity
                      style={styles.sectionBottomCompareBtn}
                      onPress={() => handleOpenCompare('Invitations', savedInvites)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.sectionBottomCompareBtnText}>Compare Invitations</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {/* MEHENDI SECTION */}
            {(activeCategory === 'All' || activeCategory === 'Mehendi') && savedMehendis.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Mehendi Artists ({savedMehendis.length})</Text>
                  {onExploreMehendi && (
                    <TouchableOpacity onPress={onExploreMehendi}>
                      <Text style={styles.browseMoreText}>+ Explore More</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {savedMehendis.map((m) => (
                  <motion.div key={m.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full mb-3.5">
                    <View style={styles.studioCard}>
                      <Image source={{ uri: m.image }} style={styles.studioImage} resizeMode="cover" />
                      <View style={styles.cardRightCol}>
                        <View style={styles.cardHeaderRow}>
                          <Text style={styles.studioName} numberOfLines={1}>{m.name}</Text>
                          <TouchableOpacity onPress={() => onToggleSavedMehendi && onToggleSavedMehendi(m.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Bookmark className="w-4 h-4 text-[#8B1E2F] fill-[#8B1E2F]" />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.ratingRow}>
                          <Star className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C] mr-1" />
                          <Text style={styles.ratingText}>{m.rating} <Text style={styles.reviewsText}>({m.reviewsCount})</Text></Text>
                        </View>
                        <View style={styles.locationRow}>
                          <MapPin className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                          <Text style={styles.locationText}>{m.location}</Text>
                        </View>
                        <View style={styles.cardBottomRow}>
                          <Text style={styles.priceText}>{m.startingPrice}</Text>
                          <TouchableOpacity style={styles.viewDetailsBtn} onPress={() => setSelectedMehendi(m)} activeOpacity={0.8}>
                            <Text style={styles.viewDetailsBtnText}>View Details</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </motion.div>
                ))}

                {/* Compare Button Down (Solid Burgundy Pill) */}
                {savedMehendis.length >= 2 && (
                  <View style={styles.compareBtnContainer}>
                    <TouchableOpacity
                      style={styles.sectionBottomCompareBtn}
                      onPress={() => handleOpenCompare('Mehendi', savedMehendis)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.sectionBottomCompareBtnText}>Compare Mehendi Artists</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {/* CATERING SECTION */}
            {(activeCategory === 'All' || activeCategory === 'Catering') && savedCaterings.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Catering Services ({savedCaterings.length})</Text>
                  {onExploreCatering && (
                    <TouchableOpacity onPress={onExploreCatering}>
                      <Text style={styles.browseMoreText}>+ Explore More</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {savedCaterings.map((c) => (
                  <motion.div key={c.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full mb-3.5">
                    <View style={styles.studioCard}>
                      <Image source={{ uri: c.image }} style={styles.studioImage} resizeMode="cover" />
                      <View style={styles.cardRightCol}>
                        <View style={styles.cardHeaderRow}>
                          <Text style={styles.studioName} numberOfLines={1}>{c.name}</Text>
                          <TouchableOpacity onPress={() => onToggleSavedCatering && onToggleSavedCatering(c.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Bookmark className="w-4 h-4 text-[#8B1E2F] fill-[#8B1E2F]" />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.ratingRow}>
                          <Star className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C] mr-1" />
                          <Text style={styles.ratingText}>{c.rating} <Text style={styles.reviewsText}>({c.reviewsCount})</Text></Text>
                        </View>
                        <View style={styles.locationRow}>
                          <MapPin className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                          <Text style={styles.locationText}>{c.location}</Text>
                        </View>
                        <View style={styles.cardBottomRow}>
                          <Text style={styles.priceText}>{c.startingPrice}</Text>
                          <TouchableOpacity style={styles.viewDetailsBtn} onPress={() => setSelectedCatering(c)} activeOpacity={0.8}>
                            <Text style={styles.viewDetailsBtnText}>View Details</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </motion.div>
                ))}

                {/* Compare Button Down (Solid Burgundy Pill) */}
                {savedCaterings.length >= 2 && (
                  <View style={styles.compareBtnContainer}>
                    <TouchableOpacity
                      style={styles.sectionBottomCompareBtn}
                      onPress={() => handleOpenCompare('Catering', savedCaterings)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.sectionBottomCompareBtnText}>Compare Catering</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* VENDOR COMPARE MODAL */}
      <VendorCompareModal
        visible={compareModalVisible}
        categoryTitle={compareCategoryTitle}
        vendors={compareVendorsList}
        onClose={() => setCompareModalVisible(false)}
        onSelectVendor={handleSelectVendorFromCompare}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    backgroundColor: '#FAF7F2',
    position: 'relative' as any,
    overflow: 'hidden',
    display: 'flex' as any,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8DFD5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#3B2F2F',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#8C7A7C',
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3ECE4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#581420',
  },
  filterBar: {
    backgroundColor: '#FAF7F2',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEAE3',
    paddingVertical: 10,
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  filterChipActive: {
    backgroundColor: '#581420',
    borderColor: '#581420',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6E5D5F',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F3ECE4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#3B2F2F',
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 13,
    color: '#8C7A7C',
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 18,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#581420',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  exploreBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  savedList: {
    gap: 8,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#3B2F2F',
  },
  compareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3ECE4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D8CEC2',
  },
  compareBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#581420',
  },
  browseMoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#581420',
  },
  studioCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#EFEAE3',
    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
  },
  studioImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#EAE4DC',
  },
  cardRightCol: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studioName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2425',
    flex: 1,
    marginRight: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2A2425',
  },
  reviewsText: {
    fontSize: 11,
    color: '#8C7A7C',
    fontWeight: '400',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    fontSize: 11,
    color: '#8C7A7C',
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  priceText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#581420',
  },
  viewDetailsBtn: {
    backgroundColor: '#F3ECE4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  viewDetailsBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#581420',
  },
  compareBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  sectionBottomCompareBtn: {
    backgroundColor: '#581420',
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#581420',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionBottomCompareBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
