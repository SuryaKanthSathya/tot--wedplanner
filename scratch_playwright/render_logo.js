const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();

  const generateIcon = async (size, filename) => {
    const html = `
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              background: #FAF6EE;
              display: flex;
              align-items: center;
              justify-content: center;
              width: ${size}px;
              height: ${size}px;
            }
            .logo-container {
              width: ${size * 0.75}px;
              height: ${size * 0.75}px;
              background: rgba(250, 246, 238, 0.9);
              border-radius: ${size * 0.1875}px;
              border: ${size * 0.01}px solid rgba(255, 255, 255, 0.9);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 ${size * 0.08}px ${size * 0.23}px -${size * 0.05}px rgba(0, 0, 0, 0.15);
            }
            svg {
              width: 80%;
              height: 80%;
              color: #5B1B29;
            }
          </style>
        </head>
        <body>
          <div class="logo-container">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M50,88 C18,68 6,48 6,30 C6,16 18,6 32,6 C41,6 46,10 50,16 C54,10 59,6 68,6 C82,6 94,16 94,30 C94,48 82,68 50,88 Z" />
              <circle cx="42" cy="35" r="5" />
              <circle cx="58" cy="33" r="5.5" />
              <path d="M53,28 C58,23 64,27 64,32" />
              <path d="M24,52 Q38,38 48,46 Q58,38 74,52" />
              <path d="M34,62 Q50,78 66,62" />
            </svg>
          </div>
        </body>
      </html>
    `;

    fs.writeFileSync('logo.html', html);
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    await page.goto('file://' + path.resolve('logo.html'));
    await page.screenshot({ path: '../public/' + filename, clip: { x: 0, y: 0, width: size, height: size } });
    await page.close();
  };

  await generateIcon(512, 'icon-512.png');
  await generateIcon(192, 'icon-192.png');
  await generateIcon(180, 'apple-touch-icon.png');
  await generateIcon(144, 'icon-144.png');
  
  await browser.close();
})();
