const fs = require('fs');

let content = fs.readFileSync('src/components/ArtistDetailPage.tsx', 'utf-8');

// Change the View wrapper for INTERACTIVE TABS to ScrollView
content = content.replace(
  /\{\/\* INTERACTIVE TABS \*\/\}\s*<View style=\{styles\.tabBar\}>/,
  `{/* INTERACTIVE TABS */}\n        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }} style={[styles.tabBar, { paddingHorizontal: 0, marginHorizontal: -16 }]}>`
);

content = content.replace(
  /<Text style=\{\[styles\.tabItemText, activeTab === 'reviews' && styles\.tabItemTextActive\]\}>\s*Reviews \(\{artist\.reviewsCount\}\)\s*<\/Text>\s*<\/TouchableOpacity>\s*<\/View>/,
  `<Text style={[styles.tabItemText, activeTab === 'reviews' && styles.tabItemTextActive]}>\n              Reviews ({artist.reviewsCount})\n            </Text>\n          </TouchableOpacity>\n        </ScrollView>`
);

fs.writeFileSync('src/components/ArtistDetailPage.tsx', content);
console.log('Fixed ScrollView in tabs!');
