const fs = require('fs');

let content = fs.readFileSync('src/components/ArtistDetailPage.tsx', 'utf-8');

// Add Reviews tab
content = content.replace(
  /<TouchableOpacity\s+style=\{\[styles\.tabItem,\s+activeTab === 'designs'[^>]+>\s+<Text[^>]+>\s+Design Styles\s+<\/Text>\s+<\/TouchableOpacity>/,
  (match) => {
    return match + `
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'reviews' && styles.tabItemActive]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabItemText, activeTab === 'reviews' && styles.tabItemTextActive]}>
              Reviews
            </Text>
          </TouchableOpacity>`;
  }
);

// Add Reviews content
if (!content.includes(`activeTab === 'reviews' && (`)) {
  content = content.replace(
    /\{\/\* TAB 3: DESIGN STYLES & MOTIFS \*\/\}[\s\S]*?<\/View>\s+\)\}/,
    (match) => {
      return match + `
        {/* TAB 4: REVIEWS */}
        {activeTab === 'reviews' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabSubtitle}>Verified Client Reviews</Text>
            <View style={{ marginTop: 10, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#333' }}>Priya S.</Text>
              <Text style={{ color: '#E5A93C', marginVertical: 4 }}>★★★★★</Text>
              <Text style={{ color: '#666', fontSize: 14 }}>Absolutely loved the mehendi design! The stain was incredibly dark and lasted for weeks. Highly professional and punctual.</Text>
            </View>
            <View style={{ marginTop: 10, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#333' }}>Ananya R.</Text>
              <Text style={{ color: '#E5A93C', marginVertical: 4 }}>★★★★★</Text>
              <Text style={{ color: '#666', fontSize: 14 }}>The custom bride and groom portrait in my mehendi was flawless. Everyone at the wedding was asking about it!</Text>
            </View>
          </View>
        )}`;
    }
  );
}

// Add Trust Badges after About
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
  content = content.replace(
    /<Text style=\{styles\.descriptionText\}>[\s\S]*?<\/Text>\n        <\/View>/,
    (match) => match + '\n' + trustBadgesJSX
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
if (!content.includes('Heart')) {
  content = content.replace(/import \{([^}]+)\} from 'lucide-react';/, (match, p1) => {
    if (!p1.includes('Heart')) return `import { ${p1}, Heart } from 'lucide-react';`;
    return match;
  });
}

// ensure Award import
if (!content.includes('Award')) {
  content = content.replace(/import \{([^}]+)\} from 'lucide-react';/, (match, p1) => {
    if (!p1.includes('Award')) return `import { ${p1}, Award } from 'lucide-react';`;
    return match;
  });
}

fs.writeFileSync('src/components/ArtistDetailPage.tsx', content);
console.log('Successfully added reviews and trust badges!');
