import re

with open('src/components/SavedTabScreen.tsx', 'r') as f:
    content = f.read()

# 1. Imports
content = content.replace(
    "import { InvitationDetailPage } from './InvitationDetailPage';",
    "import { InvitationDetailPage } from './InvitationDetailPage';\nimport { CarItem, CARS_DATA } from '../constants/CarsData';\nimport { CarsDetailPage } from './CarsDetailPage';"
)

# 2. Props interface
content = content.replace(
    "  savedInviteIds?: Record<string, boolean>;",
    "  savedCarIds?: Record<string, boolean>;\n  onToggleSavedCar?: (id: string) => void;\n  onExploreCars?: () => void;\n  savedInviteIds?: Record<string, boolean>;"
)

# 3. Component props
content = content.replace(
    "  savedInviteIds = {},",
    "  savedCarIds = {},\n  onToggleSavedCar,\n  onExploreCars,\n  savedInviteIds = {},"
)

# 4. activeCategory
content = content.replace(
    "| 'Entertainment' | 'Invitations'>('All');",
    "| 'Entertainment' | 'Cars' | 'Invitations'>('All');"
)

# 5. selectedCar state
content = content.replace(
    "  const [selectedInvite, setSelectedInvite] = useState<InvitationItem | null>(null);",
    "  const [selectedInvite, setSelectedInvite] = useState<InvitationItem | null>(null);\n  const [selectedCar, setSelectedCar] = useState<CarItem | null>(null);"
)

# 6. savedCars derived state
content = content.replace(
    "  const savedInvites = INVITATIONS_DATA.filter((i) => Boolean(savedInviteIds[i.id]));",
    "  const savedInvites = INVITATIONS_DATA.filter((i) => Boolean(savedInviteIds[i.id]));\n  const savedCars = CARS_DATA.filter((c) => Boolean(savedCarIds[c.id]));"
)

# 7. Render detail page
detail_code = """
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

"""
content = content.replace(
    "  if (selectedInvite) {",
    detail_code + "  if (selectedInvite) {"
)

# 8. savedCount
content = content.replace(
    "    savedEnts.length +",
    "    savedEnts.length +\n    savedCars.length +"
)

# 9. Filter chips
filter_code = """
          <TouchableOpacity
            style={[styles.filterChip, activeCategory === 'Cars' && styles.filterChipActive]}
            onPress={() => setActiveCategory('Cars')}
          >
            <Text style={[styles.filterChipText, activeCategory === 'Cars' && styles.filterChipTextActive]}>
              Cars ({savedCars.length})
            </Text>
          </TouchableOpacity>
"""
content = content.replace(
    "          <TouchableOpacity\n            style={[styles.filterChip, activeCategory === 'Invitations' && styles.filterChipActive]}",
    filter_code + "\n          <TouchableOpacity\n            style={[styles.filterChip, activeCategory === 'Invitations' && styles.filterChipActive]}"
)

# 10. Empty state button
empty_btn = """
              {onExploreCars && (
                <TouchableOpacity style={styles.exploreBtn} onPress={onExploreCars} activeOpacity={0.8}>
                  <Text style={styles.exploreBtnText}>Cars</Text>
                </TouchableOpacity>
              )}
"""
content = content.replace(
    "              {onExploreInvitations && (",
    empty_btn + "\n              {onExploreInvitations && ("
)

# 11. Cars list section
cars_section = """
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
              </View>
            )}
"""
content = content.replace(
    "            {/* INVITATIONS SECTION */}",
    cars_section + "\n            {/* INVITATIONS SECTION */}"
)

with open('src/components/SavedTabScreen.tsx', 'w') as f:
    f.write(content)
print("SavedTabScreen.tsx patched successfully!")
