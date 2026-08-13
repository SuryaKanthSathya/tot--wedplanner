const fs = require('fs');

let content = fs.readFileSync('src/components/ArtistDetailPage.tsx', 'utf-8');

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
        </View>
`;

if (!content.includes('TRUST BADGES SECTION')) {
  content = content.replace(
    /\{\/\* INTERACTIVE TABS \*\/\}/,
    trustBadgesJSX + '\n\n        {/* INTERACTIVE TABS */}'
  );
  
  fs.writeFileSync('src/components/ArtistDetailPage.tsx', content);
  console.log('Successfully injected trustBadges JSX!');
} else {
  console.log('JSX already exists.');
}
