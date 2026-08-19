const fs = require('fs');

const files = [
  'src/components/InvitationListingPage.tsx',
  'src/components/InvitationDetailPage.tsx'
];

const replacements = [
  { search: /https:\/\/images\.unsplash\.com\/photo-1516962215378-7fa2e137ae93\?auto=format&fit=crop&w=\d+&q=\d+/g, replace: '/src/assets/invite4.png' },
  { search: /https:\/\/images\.unsplash\.com\/photo-1513151233558-d860c5398176\?auto=format&fit=crop&w=\d+&q=\d+/g, replace: '/src/assets/invite3.png' },
  { search: /https:\/\/images\.unsplash\.com\/photo-1583939003579-730e3918a45a\?auto=format&fit=crop&w=\d+&q=\d+/g, replace: '/src/assets/invite2.png' },
  { search: /https:\/\/images\.unsplash\.com\/photo-1512941937669-90a1b58e7e9c\?auto=format&fit=crop&w=\d+&q=\d+/g, replace: '/src/assets/invite1.png' },
  { search: /https:\/\/images\.unsplash\.com\/photo-1531685250784-7569952593d2\?auto=format&fit=crop&w=\d+&q=\d+/g, replace: '/src/assets/invite4.png' },
  { search: /https:\/\/images\.unsplash\.com\/photo-1549465220-1a8b9238cd48\?auto=format&fit=crop&w=\d+&q=\d+/g, replace: '/src/assets/invite3.png' },
  { search: /https:\/\/images\.unsplash\.com\/photo-1508746829417-e6f548d8d6ed\?auto=format&fit=crop&w=\d+&q=\d+/g, replace: '/src/assets/invite2.png' },
  { search: /https:\/\/images\.unsplash\.com\/photo-1513519245088-0e12902e5a38\?auto=format&fit=crop&w=\d+&q=\d+/g, replace: '/src/assets/invite1.png' },
  { search: /https:\/\/images\.unsplash\.com\/photo-1526047932273-341f2a7631f9\?auto=format&fit=crop&w=\d+&q=\d+/g, replace: '/src/assets/invite4.png' },
  { search: /https:\/\/images\.unsplash\.com\/photo-1579783900882-c0d3dad7b119\?auto=format&fit=crop&w=\d+&q=\d+/g, replace: '/src/assets/invite3.png' },
  { search: /https:\/\/images\.unsplash\.com\/photo-1618005182384-a83a8bd57fbe\?auto=format&fit=crop&w=\d+&q=\d+/g, replace: '/src/assets/invite2.png' }
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    replacements.forEach(r => {
      content = content.replace(r.search, r.replace);
    });
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed', file);
  }
});
