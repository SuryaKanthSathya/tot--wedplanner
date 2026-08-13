const fs = require('fs');

let content = fs.readFileSync('src/components/ArtistDetailPage.tsx', 'utf-8');

content = content.replace(
  /trustBadgesGrid: \{\s*flexDirection: 'row',\s*flexWrap: 'wrap',\s*justifyContent: 'space-between',\s*marginHorizontal: 20,\s*marginBottom: 24,\s*gap: 12,\s*\}/,
  `trustBadgesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      marginBottom: 24,
    }`
);

content = content.replace(
  /trustBadgeCard: \{\s*width: '48%',\s*backgroundColor: '#FAFAFA',\s*borderRadius: 12,\s*padding: 12,\s*flexDirection: 'row',\s*alignItems: 'center',\s*borderWidth: 1,\s*borderColor: '#F0F0F0',\s*\}/,
  `trustBadgeCard: {
      width: '48%',
      backgroundColor: '#FAFAFA',
      borderRadius: 12,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#F0F0F0',
      marginBottom: 12,
    }`
);

fs.writeFileSync('src/components/ArtistDetailPage.tsx', content);
console.log('Fixed alignment in stylesheet!');
