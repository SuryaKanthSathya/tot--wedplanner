const fs = require('fs');
let content = fs.readFileSync('src/components/CatererDetailPage.tsx', 'utf-8');

// Replace the text
content = content.replace(/high-definition bridal details/gi, 'catering setup and menu details');
content = content.replace(/bridal/gi, 'catering');
content = content.replace(/Bridal/g, 'Catering');

// Replace the fallback images
content = content.replace(
  /'https:\/\/images\.unsplash\.com\/photo-1522337360788-8b13dee7a37e\?auto=format&fit=crop&w=600&q=80'/g,
  "'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80'"
);
content = content.replace(
  /'https:\/\/images\.unsplash\.com\/photo-1512496015851-a90fb38ba796\?auto=format&fit=crop&w=600&q=80'/g,
  "'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=600&q=80'"
);
content = content.replace(
  /'https:\/\/images\.unsplash\.com\/photo-1516975080664-ed2fc6a32937\?auto=format&fit=crop&w=600&q=80'/g,
  "'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80'"
);
content = content.replace(
  /'https:\/\/images\.unsplash\.com\/photo-1596704017254-9b121068fb31\?auto=format&fit=crop&w=600&q=80'/g,
  "'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80'"
);
content = content.replace(
  /'https:\/\/images\.unsplash\.com\/photo-1487412720507-e7ab37603c6f\?auto=format&fit=crop&w=600&q=80'/g,
  "'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80'"
);

fs.writeFileSync('src/components/CatererDetailPage.tsx', content);
