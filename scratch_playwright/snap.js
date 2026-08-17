const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.webintoapp.com/');
  await page.screenshot({ path: 'homepage.png', fullPage: true });
  await browser.close();
})();
