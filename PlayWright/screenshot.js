const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function takeScreenshot() {
  const args = process.argv.slice(2);
  const htmlFile = args[0] || 'index.html';
  
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  const htmlPath = path.resolve(__dirname, '..', htmlFile);
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 60000 });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotsDir = path.resolve(__dirname, '..', 'screenshots');
  const screenshotPath = path.resolve(screenshotsDir, `screenshot-${timestamp}.png`);

  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  await page.screenshot({
    path: screenshotPath,
    fullPage: true
  });

  await browser.close();
  console.log(`Screenshot saved: ${screenshotPath}`);
}

takeScreenshot().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
