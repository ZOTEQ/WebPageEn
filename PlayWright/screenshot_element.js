const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function screenshotElement() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  const htmlPath = path.resolve(__dirname, '..', 'Zoteq_Catalogue_Full_2605_V04.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });

  const screenshotsDir = path.resolve(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const selectors = [
    { selector: '.cover-logo', name: 'logo' },
    { selector: '.page-header', name: 'header' },
    { selector: '.data-table', name: 'table' },
    { selector: '.page-footer', name: 'footer' }
  ];

  for (const { selector, name } of selectors) {
    try {
      const element = await page.$(selector);
      if (element) {
        const screenshotPath = path.resolve(screenshotsDir, `element-${name}.png`);
        await element.screenshot({ path: screenshotPath });
        console.log(`Element '${selector}' screenshot saved`);
      }
    } catch (err) {
      console.error(`Error capturing ${selector}:`, err);
    }
  }

  await browser.close();
}

screenshotElement().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
