const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log("Starting browser...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log("Navigating to webintoapp...");
  await page.goto('https://www.webintoapp.com/free-android-app-maker');
  
  console.log("Filling out form...");
  await page.fill('input[name="url"]', 'https://wedplanner-tot.surge.sh');
  await page.fill('input[name="app_name"]', 'WedPlanner');
  await page.fill('input[name="company"]', 'AI Solutions');
  
  console.log("Clicking Next/Make App...");
  // Wait, let's just click the button that has text "Next" or "Make App"
  const nextButton = await page.$('button:has-text("Next"), button:has-text("Make App")');
  if (nextButton) {
    await nextButton.click();
  } else {
    console.log("Could not find next button");
    await page.screenshot({ path: 'debug1.png' });
    await browser.close();
    process.exit(1);
  }
  
  console.log("Waiting for processing...");
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'debug2.png' });
  
  console.log("Process complete, check screenshots.");
  await browser.close();
})();
