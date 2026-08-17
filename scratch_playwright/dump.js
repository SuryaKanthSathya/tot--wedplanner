const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.webintoapp.com/');
  const html = await page.content();
  require('fs').writeFileSync('webintoapp.html', html);
  await browser.close();
})();
