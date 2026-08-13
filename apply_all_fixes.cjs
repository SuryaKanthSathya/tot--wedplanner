const fs = require('fs');

let content = fs.readFileSync('src/components/ArtistDetailPage.tsx', 'utf-8');

// 1. Fix Brands
content = content.replace(/'MAC, Huda Beauty, Bobbi Brown, NARS, Charlotte Tilbury'/g, "'Arabic, Indian Bridal, Indo-Arabic, Mandala, Floral, Khafif'");
content = content.replace(/'MAC Cosmetics'/g, "'Traditional Indian'");
content = content.replace(/'Charlotte Tilbury'/g, "'Intricate Arabic'");
content = content.replace(/'NARS'/g, "'Floral Motifs'");
content = content.replace(/'Huda Beauty'/g, "'Mandala Art'");
content = content.replace(/'Dior Beauty'/g, "'Bridal Figures'");
content = content.replace(/'Bobbi Brown'/g, "'Peacock Motifs'");
content = content.replace(/'TEMPTU Airbrush'/g, "'Indo-Arabic'");
content = content.replace(/'Estée Lauder'/g, "'Minimalist / Khafif'");
content = content.replace(/'Kryolan'/g, "'White / Glitter Henna'");
content = content.replace(/Hygienic & Skin-Safe Assurance/g, "100% Organic & Chemical-Free Henna");
content = content.replace(/All makeup tools and brushes are thoroughly sanitized/g, "Our henna cones are freshly prepared at home using premium organic Rajasthani henna powder and natural essential oils.");

// 2. Add Trust Badges after About
const trustBadgesJSX = `
        {/* TRUST BADGES SECTION */}
        <View style={styles.trustBadgesGrid}>
          <View style={styles.trustBadgeCard}>
            <View style={styles.badgeIconBg}>
              <Star className="w-4 h-4 text-[#C28E38] fill-[#C28E38]" />
            </View>
            <View style={styles.badgeTextCol}>
              <Text style={styles.badgeTitle} numberOfLines={1} ellipsizeMode="tail">Google Reviews</Text>
              <Text style={styles.badgeValue} numberOfLines={1} ellipsizeMode="tail">4.9/5 Average</Text>
            </View>
          </View>
          
          <View style={styles.trustBadgeCard}>
            <View style={styles.badgeIconBg}>
              <Heart className="w-4 h-4 text-[#8B1E2F] fill-[#8B1E2F]" />
            </View>
            <View style={styles.badgeTextCol}>
              <Text style={styles.badgeTitle} numberOfLines={1} ellipsizeMode="tail">Instagram</Text>
              <Text style={styles.badgeValue} numberOfLines={1} ellipsizeMode="tail">10k+ Followers</Text>
            </View>
          </View>

          <View style={styles.trustBadgeCard}>
            <View style={styles.badgeIconBg}>
              <Award className="w-4 h-4 text-[#4A6B53] fill-[#4A6B53]" />
            </View>
            <View style={styles.badgeTextCol}>
              <Text style={styles.badgeTitle} numberOfLines={1} ellipsizeMode="tail">Awards</Text>
              <Text style={styles.badgeValue} numberOfLines={1} ellipsizeMode="tail">Best Bridal Mehendi</Text>
            </View>
          </View>

          <View style={styles.trustBadgeCard}>
            <View style={styles.badgeIconBg}>
              <CheckCircle2 className="w-4 h-4 text-[#137333] fill-[#137333]" />
            </View>
            <View style={styles.badgeTextCol}>
              <Text style={styles.badgeTitle} numberOfLines={1} ellipsizeMode="tail">TOT Certified</Text>
              <Text style={styles.badgeValue} numberOfLines={1} ellipsizeMode="tail">Verified Artist</Text>
            </View>
          </View>
        </View>`;

if (!content.includes('trustBadgesGrid')) {
  // Find where Description View ends
  const parts = content.split('</View>\n\n        {/* INTERACTIVE TABS */}');
  if (parts.length === 2) {
    content = parts[0] + '</View>\n\n' + trustBadgesJSX + '\n\n        {/* INTERACTIVE TABS */}' + parts[1];
  }
}

// 3. Add Reviews tab
if (!content.includes('activeTab === \'reviews\'')) {
  content = content.replace(
    /<\/TouchableOpacity>\n\n        <\/View>/,
    `</TouchableOpacity>\n\n          <TouchableOpacity\n            style={[styles.tabItem, activeTab === 'reviews' && styles.tabItemActive]}\n            onPress={() => setActiveTab('reviews')}\n          >\n            <Text style={[styles.tabItemText, activeTab === 'reviews' && styles.tabItemTextActive]}>\n              Reviews\n            </Text>\n          </TouchableOpacity>\n\n        </View>`
  );
}

// 4. Add Reviews Content
if (!content.includes('TAB 4: REVIEWS')) {
  content = content.replace(
    /\{\/\* TAB 3: DESIGN STYLES & MOTIFS \*\/\}[\s\S]*?<\/View>\n        \)\}/,
    (match) => match + `\n\n        {/* TAB 4: REVIEWS */}\n        {activeTab === 'reviews' && (\n          <View style={styles.tabContent}>\n            <Text style={styles.tabSubtitle}>Verified Client Reviews</Text>\n            <View style={{ marginTop: 10, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8, borderWidth: 1, borderColor: '#f0f0f0' }}>\n              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>\n                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#333' }}>Priya S.</Text>\n                <Text style={{ color: '#E5A93C' }}>★★★★★</Text>\n              </View>\n              <Text style={{ color: '#666', fontSize: 14, marginTop: 8 }}>Absolutely loved the mehendi design! The stain was incredibly dark and lasted for weeks. Highly professional and punctual.</Text>\n            </View>\n            <View style={{ marginTop: 15, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8, borderWidth: 1, borderColor: '#f0f0f0' }}>\n              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>\n                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#333' }}>Ananya R.</Text>\n                <Text style={{ color: '#E5A93C' }}>★★★★★</Text>\n              </View>\n              <Text style={{ color: '#666', fontSize: 14, marginTop: 8 }}>The custom bride and groom portrait in my mehendi was flawless. Everyone at the wedding was asking about it!</Text>\n            </View>\n          </View>\n        )}`
  );
}

// Add Trust Badges styles
if (!content.includes('trustBadgesGrid: {')) {
  content = content.replace(
    /tabBar: \{/,
    `trustBadgesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      marginBottom: 24,
      gap: 12,
    },
    trustBadgeCard: {
      width: '48%',
      backgroundColor: '#FAFAFA',
      borderRadius: 12,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#F0F0F0',
    },
    badgeIconBg: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    badgeTextCol: {
      flex: 1,
      flexShrink: 1,
    },
    badgeTitle: {
      fontFamily: 'Inter-Medium',
      fontSize: 11,
      color: '#8C7A7C',
      marginBottom: 2,
      flexShrink: 1,
    },
    badgeValue: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 12,
      color: '#2A2425',
      flexShrink: 1,
    },
    tabBar: {`
  );
}

// ensure Heart import
if (!content.includes('Heart,')) {
  content = content.replace(/import \{([^}]+)\} from 'lucide-react';/, (match, p1) => {
    if (!p1.includes('Heart')) return `import { ${p1}, Heart } from 'lucide-react';`;
    return match;
  });
}

// ensure Award import
if (!content.includes('Award,')) {
  content = content.replace(/import \{([^}]+)\} from 'lucide-react';/, (match, p1) => {
    if (!p1.includes('Award')) return `import { ${p1}, Award } from 'lucide-react';`;
    return match;
  });
}

fs.writeFileSync('src/components/ArtistDetailPage.tsx', content);
console.log('Fixed everything successfully');
