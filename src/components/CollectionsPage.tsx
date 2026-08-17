import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Linking } from 'react-native-web';
import { ArrowLeft, Share2, Bookmark, Star, Users, Building2, MessageCircle, Phone } from 'lucide-react';
import { VenueDetailPage, VenueItem } from './VenueDetailPage';

// --- DATA ---
const COLLECTIONS_DATA = [
  {
    "id": "c1",
    "name": "The Leela Palace Chennai - Seaside Modern",
    "location": "Raja Annamalaipuram, Chennai",
    "rating": 4.9,
    "reviewsCount": 8,
    "priceLabel": "Veg",
    "priceText": "₹ 4,200",
    "priceSuffix": "per plate",
    "capacity": "30 - 1200 pax",
    "category": "4 Star & Above Hotels, Banquet Halls",
    "isPremium": true,
    "images": [
      "/src/assets/images/beach_resort_decor.jpg",
      "/src/assets/images/modern_canopy_decor.jpg"
    ],
    "contactPhone": "+919876543210"
  },
  {
    "id": "c2",
    "name": "Welcomhotel by ITC Hotels, GST Road, Chennai",
    "location": "Guduvanchery",
    "rating": 5.0,
    "reviewsCount": 5,
    "priceLabel": "Rental cost",
    "priceText": "₹ 75,000",
    "priceSuffix": "",
    "capacity": "100 - 600 pax",
    "category": "4 Star & Above Hotels, Banquet Halls",
    "isPremium": false,
    "images": [
      "/src/assets/images/palace_reception_decor.jpg",
      "/src/assets/images/pastel_reception_stage.jpg"
    ],
    "contactPhone": "+919876543211"
  },
  {
    "id": "c3",
    "name": "Sheraton Grand Chennai Resort & Spa",
    "location": "Mahabalipuram, Chennai",
    "rating": 4.8,
    "reviewsCount": 12,
    "priceLabel": "Veg",
    "priceText": "₹ 4,500",
    "priceSuffix": "per plate",
    "capacity": "50 - 2000 pax",
    "category": "5 Star Hotels, Luxury Venues",
    "isPremium": true,
    "images": [
      "/src/assets/images/sangeet_stage_decor.jpg",
      "/src/assets/images/royal_mandap_decor.jpg"
    ],
    "contactPhone": "+919876543212"
  },
  {
    "id": "c4",
    "name": "Kaldan Samudhra Palace",
    "location": "Mahabalipuram, Chennai",
    "rating": 4.9,
    "reviewsCount": 17,
    "priceLabel": "Veg",
    "priceText": "₹ 6,000",
    "priceSuffix": "per plate",
    "capacity": "100 - 1500 pax",
    "category": "4 Star & Above Hotels, Banquet Halls",
    "isPremium": true,
    "images": [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80"
    ],
    "contactPhone": "+919876543213"
  },
  {
    "id": "c5",
    "name": "Taj Coromandel, Chennai",
    "location": "Nungambakkam, Chennai",
    "rating": 4.8,
    "reviewsCount": 32,
    "priceLabel": "Veg",
    "priceText": "₹ 3,600",
    "priceSuffix": "per plate",
    "capacity": "50 - 2500 pax",
    "category": "4 Star & Above Hotels, Banquet Halls",
    "isPremium": true,
    "images": [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
    ],
    "contactPhone": "+919876543214"
  },
  {
    "id": "c6",
    "name": "Hyatt Regency Chennai",
    "location": "Teynampet, Chennai",
    "rating": 4.8,
    "reviewsCount": 44,
    "priceLabel": "Veg",
    "priceText": "₹ 1,555",
    "priceSuffix": "per plate",
    "capacity": "75 - 2000 pax",
    "category": "4 Star & Above Hotels, Banquet Halls",
    "isPremium": false,
    "images": [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"
    ],
    "contactPhone": "+919876543215"
  },
  {
    "id": "c7",
    "name": "Taj Connemara, Chennai",
    "location": "Anna Salai, Chennai",
    "rating": 4.8,
    "reviewsCount": 14,
    "priceLabel": "Veg",
    "priceText": "₹ 2,200",
    "priceSuffix": "per plate",
    "capacity": "500 - 1500 pax",
    "category": "4 Star & Above Hotels, Banquet Halls",
    "isPremium": true,
    "images": [
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80"
    ],
    "contactPhone": "+919876543216"
  },
  {
    "id": "c8",
    "name": "Crowne Plaza Adyar Park",
    "location": "Alwarpet, Chennai",
    "rating": 4.6,
    "reviewsCount": 20,
    "priceLabel": "Veg",
    "priceText": "₹ 2,500",
    "priceSuffix": "per plate",
    "capacity": "200 - 1000 pax",
    "category": "Banquet Halls",
    "isPremium": false,
    "images": [
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80"
    ],
    "contactPhone": "+919876543217"
  },
  {
    "id": "c9",
    "name": "The Westin Chennai Velachery",
    "location": "Velachery, Chennai",
    "rating": 4.8,
    "reviewsCount": 11,
    "priceLabel": "Veg",
    "priceText": "₹ 2,000",
    "priceSuffix": "per plate",
    "capacity": "300 - 1000 pax",
    "category": "4 Star & Above Hotels, Banquet Halls",
    "isPremium": false,
    "images": [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
    ],
    "contactPhone": "+919876543218"
  },
  {
    "id": "c10",
    "name": "Hilton Chennai",
    "location": "Guindy, Chennai",
    "rating": 4.9,
    "reviewsCount": 15,
    "priceLabel": "Veg",
    "priceText": "₹ 2,500",
    "priceSuffix": "per plate",
    "capacity": "150 - 1000 pax",
    "category": "4 Star & Above Hotels, Banquet Halls",
    "isPremium": false,
    "images": [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80"
    ],
    "contactPhone": "+919876543219"
  },
  {
    "id": "c11",
    "name": "Park Hyatt Chennai",
    "location": "Guindy, Chennai",
    "rating": 4.8,
    "reviewsCount": 21,
    "priceLabel": "Veg",
    "priceText": "₹ 1,500",
    "priceSuffix": "per plate",
    "capacity": "150 - 750 pax",
    "category": "4 Star & Above Hotels, Banquet Halls",
    "isPremium": true,
    "images": [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80"
    ],
    "contactPhone": "+919876543220"
  },
  {
    "id": "c12",
    "name": "Taj Fisherman's Cove Resort & Spa Chennai",
    "location": "Kovalam, Chennai",
    "rating": 5.0,
    "reviewsCount": 22,
    "priceLabel": "Veg",
    "priceText": "₹ 800",
    "priceSuffix": "per plate",
    "capacity": "2000 - 3500 pax",
    "category": "4 Star & Above Hotels, Banquet Halls",
    "isPremium": true,
    "images": [
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
    ],
    "contactPhone": "+919876543221"
  },
  {
    "id": "c13",
    "name": "ITC Grand Chola Hotel",
    "location": "Guindy, Chennai",
    "rating": 4.8,
    "reviewsCount": 14,
    "priceLabel": "Price on Request",
    "priceText": "per plate",
    "priceSuffix": "",
    "capacity": "1000 - 1500 pax",
    "category": "Banquet Halls",
    "isPremium": true,
    "images": [
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80"
    ],
    "contactPhone": "+919876543222"
  },
  {
    "id": "c14",
    "name": "Confluence Banquets and Resort",
    "location": "Mahabalipuram, Chennai",
    "rating": 4.7,
    "reviewsCount": 19,
    "priceLabel": "Rental cost",
    "priceText": "₹ 1,50,000",
    "priceSuffix": "",
    "capacity": "500 - 3000 pax",
    "category": "Destination Wedding Venues",
    "isPremium": false,
    "images": [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
    ],
    "contactPhone": "+919876543223"
  }
];

// --- COMPONENTS ---

const VenueImageCarousel = ({ images, isPremium, isSaved, onToggleSave }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handleNextImage} style={styles.imageContainer}>
      <Image source={{ uri: images[currentIndex] }} style={styles.venueImage} resizeMode="cover" />
      
      {/* Premium Badge */}
      {isPremium && (
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumBadgeIcon}>♕</Text>
        </View>
      )}

      {/* Bookmark */}
      <TouchableOpacity style={styles.bookmarkBtn} onPress={(e) => { e.stopPropagation(); onToggleSave(); }}>
        <Bookmark className={`w-4 h-4 ${isSaved ? 'text-[#581420] fill-[#581420]' : 'text-stone-700'}`} />
      </TouchableOpacity>

      {/* Pagination Dots */}
      <View style={styles.paginationDots}>
        {images.map((_, idx) => (
          <View key={idx} style={[styles.dot, currentIndex === idx && styles.activeDot]} />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const VenueInfo = ({ venue }) => {
  return (
    <View style={styles.infoContainer}>
      {/* Location & Rating */}
      <View style={styles.locationRatingRow}>
        <Text style={styles.locationText}>{venue.location}</Text>
        <View style={styles.ratingContainer}>
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 mr-1" />
          <Text style={styles.ratingNumber}>{venue.rating.toFixed(1)}</Text>
          <Text style={styles.ratingCount}>({venue.reviewsCount})</Text>
        </View>
      </View>

      {/* Venue Name */}
      <Text style={styles.venueName} numberOfLines={2}>
        {venue.name}
      </Text>

      {/* Price Section */}
      <Text style={styles.priceLabel}>{venue.priceLabel}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.priceText}>{venue.priceText}</Text>
        {venue.priceSuffix ? <Text style={styles.priceSuffix}> {venue.priceSuffix}</Text> : null}
      </View>

      {/* Capacity & Category */}
      <View style={styles.metadataRow}>
        <View style={styles.metadataItem}>
          <Users className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
          <Text style={styles.metadataText}>{venue.capacity}</Text>
        </View>
        <View style={styles.metadataItem}>
          <Building2 className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
          <Text style={styles.metadataText} numberOfLines={1}>{venue.category}</Text>
        </View>
      </View>
    </View>
  );
};

const VenueActions = ({ venue }) => {
  const handleMessage = () => alert('Messaging interface opened for ' + venue.name);
  const handleWhatsApp = () => Linking.openURL(`https://wa.me/${venue.contactPhone.replace('+', '')}`);
  const handleCall = () => Linking.openURL(`tel:${venue.contactPhone}`);

  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.messageBtn} onPress={handleMessage}>
        <MessageCircle className="w-4 h-4 text-[#FFFFFF] mr-2" />
        <Text style={styles.messageBtnText}>Message</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.iconBtn} onPress={handleWhatsApp}>
        <Text style={{ color: '#25D366', fontSize: 16, fontWeight: '800' }}>WA</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.iconBtn} onPress={handleCall}>
        <Phone className="w-4 h-4 text-[#581420]" />
      </TouchableOpacity>
    </View>
  );
};

const VenueCard = ({ venue, isSaved, onToggleSave, onPressCard }) => {
  return (
    <View style={styles.cardContainer}>
      <VenueImageCarousel 
        images={venue.images} 
        isPremium={venue.isPremium} 
        isSaved={isSaved} 
        onToggleSave={() => onToggleSave(venue.id)} 
      />
      <TouchableOpacity activeOpacity={0.9} onPress={() => onPressCard(venue)}>
        <VenueInfo venue={venue} />
      </TouchableOpacity>
      <VenueActions venue={venue} />
    </View>
  );
};

export const CollectionsPage = ({ onBack, collectionData }) => {
  const [savedVenues, setSavedVenues] = useState({});

  const handleToggleSave = (id) => {
    setSavedVenues(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: collectionData ? collectionData.title : 'Wedding Venues Collection',
        url: window.location.href
      });
    } else {
      alert('Share link copied to clipboard!');
    }
  };

  const getDisplayData = () => {
    if (!collectionData) return COLLECTIONS_DATA;
    
    const title = collectionData.title.toLowerCase();
    
    return COLLECTIONS_DATA.map((venue, index) => {
      let newVenue = { ...venue };
      
      if (title.includes('beach')) {
        newVenue.name = `Oceanfront Beach Resort ${index + 1}`;
        newVenue.location = `ECR, Chennai`;
        newVenue.images = [
          "/src/assets/images/beach_resort_decor.jpg",
          "/src/assets/images/modern_canopy_decor.jpg"
        ];
        newVenue.category = "Beach Resorts, Lawns";
      } else if (title.includes('open ground') || title.includes('palace')) {
        newVenue.name = `Grand Imperial Lawn ${index + 1}`;
        newVenue.location = `Outer Ring Road, Chennai`;
        newVenue.images = [
          "/src/assets/images/rustic_outdoor_mandap.jpg",
          "/src/assets/images/modern_canopy_decor.jpg"
        ];
        newVenue.category = "Open Grounds, Large Lawns";
      } else if (title.includes('mountain')) {
        newVenue.name = `Hilltop Resort & Spa ${index + 1}`;
        newVenue.location = `Ooty, Nilgiris`;
        newVenue.images = [
          "/src/assets/images/rustic_outdoor_mandap.jpg",
          "/src/assets/images/modern_canopy_decor.jpg"
        ];
        newVenue.category = "Mountain Resorts, Lawns";
      } else if (title.includes('resort')) {
        newVenue.name = `Luxury Wedding Resort ${index + 1}`;
        newVenue.location = `ECR, Chennai`;
        newVenue.images = [
          "/src/assets/images/beach_resort_decor.jpg",
          "/src/assets/images/modern_canopy_decor.jpg"
        ];
        newVenue.category = "4 Star & Above Resorts, Lawns";
      } else if (title.includes('kerala')) {
        newVenue.name = `Backwater Lake Resort ${index + 1}`;
        newVenue.location = `Kumarakom, Kerala`;
        newVenue.images = [
          "/src/assets/images/beach_resort_decor.jpg",
          "/src/assets/images/jasmine_ceiling_decor.jpg"
        ];
        newVenue.category = "Backwater Resorts, Lawns";
      } else if (title.includes('budget')) {
        newVenue.priceText = "₹ 800";
        newVenue.isPremium = false;
      }
      
      return newVenue;
    });
  };

  const displayData = getDisplayData();
  const [selectedVenue, setSelectedVenue] = useState<any | null>(null);

  if (selectedVenue) {
    const mappedVenue: VenueItem = {
      id: selectedVenue.id,
      name: selectedVenue.name,
      category: selectedVenue.category || '',
      city: selectedVenue.location.split(',')[0],
      location: selectedVenue.location,
      rating: selectedVenue.rating,
      reviewsCount: selectedVenue.reviewsCount,
      startingPrice: selectedVenue.priceText ? `${selectedVenue.priceText} onwards` : '₹ 0',
      priceValue: parseInt((selectedVenue.priceText || '0').replace(/[^0-9]/g, '')) || 0,
      tier: selectedVenue.isPremium ? 'Premium' : 'Popular',
      capacity: selectedVenue.capacity || '100-500 Guests',
      capacityValue: 500,
      image: selectedVenue.images?.[0] || '',
      description: 'A beautiful venue for your dream wedding. Experience luxury and comfort perfectly tailored for your special day.',
      experience: '10+ Years',
      roomsAvailable: '20+ AC Rooms',
      parkingSpace: 'Ample Parking Available',
      cateringPolicy: 'In-house & External Allowed',
      amenities: ['Scenic Views', 'Lawn Area', 'Catering Area']
    };

    return (
      <View style={styles.container}>
        <VenueDetailPage
          venue={mappedVenue}
          onBack={() => setSelectedVenue(null)}
          isBookmarked={savedVenues[selectedVenue.id] || false}
          onToggleBookmark={handleToggleSave}
          bookingSource="individual"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={[styles.header, collectionData && { borderBottomWidth: 0 }]}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <ArrowLeft className="w-5 h-5 text-stone-800" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Collections</Text>
        
        <TouchableOpacity style={styles.headerBtn} onPress={handleShare}>
          <Share2 className="w-5 h-5 text-stone-800" />
        </TouchableOpacity>
      </View>

      {/* VENUE LIST */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
        {/* HERO SECTION */}
        {collectionData && (
          <View style={{ width: '100%', height: 280, position: 'relative', marginTop: -16, marginBottom: 16 }}>
            <Image source={{ uri: collectionData.image }} style={{ width: '100%', height: '100%', position: 'absolute' }} resizeMode="cover" />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 10%, rgba(0,0,0,0.85) 100%)' }} />
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: '800', color: '#FFFFFF', marginBottom: 8, lineHeight: 28 }}>
                {collectionData.title}
              </Text>
              <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.95)', lineHeight: 20, fontWeight: '500' }}>
                {collectionData.description}
              </Text>
            </View>
          </View>
        )}
        
        {/* CARDS */}
        {displayData.map(venue => (
          <View style={{ paddingHorizontal: 14 }} key={venue.id}>
            <VenueCard 
              venue={venue} 
              isSaved={savedVenues[venue.id]} 
              onToggleSave={handleToggleSave}
              onPressCard={() => setSelectedVenue(venue)}
            />
          </View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
    width: '100%',
    maxWidth: 768,
    marginHorizontal: 'auto',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8DFD5',
    backgroundColor: '#FFFFFF',
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3ECE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#581420',
  },
  listContainer: {
    paddingTop: 16,
    paddingBottom: 40,
    gap: 16,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8DFD5',
    paddingBottom: 16,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 12,
    backgroundColor: '#27272A',
  },
  venueImage: {
    width: '100%',
    height: '100%',
  },
  premiumBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#581420',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  premiumBadgeIcon: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bookmarkBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paginationDots: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
  },
  infoContainer: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  locationRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    fontSize: 12,
    color: '#7D6E70',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  ratingNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
    marginRight: 4,
  },
  ratingCount: {
    fontSize: 11,
    color: '#7D6E70',
  },
  venueName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 8,
    lineHeight: 22,
  },
  priceLabel: {
    fontSize: 11,
    color: '#7D6E70',
    marginBottom: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#581420',
  },
  priceSuffix: {
    fontSize: 12,
    color: '#7D6E70',
  },
  metadataRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 4,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataText: {
    fontSize: 12,
    color: '#3B2F2F',
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  messageBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    borderRadius: 21,
    backgroundColor: '#581420',
  },
  messageBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#E8DFD5',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
