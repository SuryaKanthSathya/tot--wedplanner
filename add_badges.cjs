const fs = require('fs');
let content = fs.readFileSync('src/components/CatererDetailPage.tsx', 'utf-8');

const badgesCode = `
        {/* TRUST BADGES GRID */}
        <View style={styles.trustBadgesGrid}>
          <View style={styles.trustBadgeCard}>
            <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png'}} style={{width: 24, height: 24, marginBottom: 8}} />
            <Text style={styles.trustBadgeLabel}>Google Reviews</Text>
            <Text style={styles.trustBadgeValue}>4.8 <Star size={12} color="#111827" fill="#111827" style={{marginLeft: 2, transform: 'translateY(1px)'}} /></Text>
          </View>
          <View style={styles.trustBadgeCard}>
            <View style={styles.instagramIconWrapper}>
              <Instagram size={18} color="#E1306C" />
            </View>
            <Text style={styles.trustBadgeLabel}>Instagram</Text>
            <Text style={styles.trustBadgeValue}>@{caterer.name.replace(/\\s+/g, '').toLowerCase()}</Text>
          </View>
          <View style={styles.trustBadgeCard}>
            <View style={styles.awardIconWrapper}>
              <Award size={18} color="#D97706" />
            </View>
            <Text style={styles.trustBadgeLabel}>Awards</Text>
            <Text style={styles.trustBadgeValue}>15 Awards</Text>
          </View>
          <View style={styles.trustBadgeCard}>
            <View style={styles.verifiedIconWrapper}>
              <ShieldCheck size={18} color="#10B981" />
            </View>
            <Text style={styles.trustBadgeLabel}>TOT Certified</Text>
            <Text style={styles.trustBadgeValue}>Verified Vendor</Text>
          </View>
        </View>`;

if (!content.includes('TRUST BADGES GRID')) {
  content = content.replace(
    /We prioritize quality, consistency, and guest satisfaction, making us the perfect partner for your special events\.\s*<\/Text>\s*<\/View>/,
    `We prioritize quality, consistency, and guest satisfaction, making us the perfect partner for your special events.
          </Text>
        </View>\n` + badgesCode
  );
}

const stylesCode = `
  trustBadgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  trustBadgeCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7DE',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
  },
  trustBadgeLabel: {
    fontSize: 12,
    color: '#6B5A5C',
    marginBottom: 4,
  },
  trustBadgeValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    flexDirection: 'row',
    alignItems: 'center',
  },
  instagramIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FDF2F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  awardIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  verifiedIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
`;

if (!content.includes('trustBadgesGrid: {')) {
  content = content.replace(
    /sectionContainer: \{/,
    stylesCode + '\n  sectionContainer: {'
  );
}

fs.writeFileSync('src/components/CatererDetailPage.tsx', content);
console.log('Added badges grid');
