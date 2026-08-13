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

if (!content.includes('trustBadgesGrid')) {
  content = content.replace(
    /\{\/\* INTERACTIVE TABS \*\/\}/g,
    trustBadgesJSX + '\n\n        {/* INTERACTIVE TABS */}'
  );
  
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
  
  fs.writeFileSync('src/components/ArtistDetailPage.tsx', content);
  console.log('Successfully injected trustBadgesGrid!');
} else {
  console.log('trustBadgesGrid already exists.');
}

let mehendiContent = fs.readFileSync('src/components/MehendiListingPage.tsx', 'utf-8');
mehendiContent = mehendiContent.replace(/Expert mehendi artist delivering the best Bridal Mehandi Specialist experience./g, "A globally recognized, highly sought-after bridal mehendi specialist who has adorned over 1000+ brides. We create custom intricate figures, flawless symmetry, and personalized motifs (such as couple portraits, wedding vows, and traditional peacocks). Our henna is 100% organic, hand-mixed at home with natural essential oils to guarantee a rich, deep, and long-lasting stain. Each bridal package includes a complimentary consultation and personalized design draft, ensuring your wedding day hands tell your unique love story.");
mehendiContent = mehendiContent.replace(/Expert mehendi artist delivering the best Bridal Mehandi Artist experience./g, "Specializing in breathtaking bridal henna, our studio is dedicated to delivering a deeply personal and artistic mehendi experience. We blend traditional motifs with modern elegance, using only the finest, chemical-free Rajasthani henna for a rich burgundy stain that lasts for weeks.");
mehendiContent = mehendiContent.replace(/Expert mehendi artist delivering the best Traditional Mehandi Artist experience./g, "With over a decade of expertise, our traditional mehendi artistry captures the pure essence of Indian heritage. We meticulously craft classic Indian, Arabic, and Khafif designs, prioritizing organic henna and ensuring an unforgettable, stress-free experience on your big day.");
fs.writeFileSync('src/components/MehendiListingPage.tsx', mehendiContent);
console.log('Successfully updated Mehendi descriptions!');

