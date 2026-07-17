const { chromium } = require('playwright');
const path = require('path');

async function recordVideo() {
  const browser = await chromium.launch({
    headless: false,
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe'
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: 'videos/',
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();

  const htmlPath = path.resolve(__dirname, '..', 'Zoteq_Catalogue_Full_2605_V04.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });

  console.log('Recording started...');

  await page.waitForTimeout(1000);

  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });
  await page.waitForTimeout(500);

  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });
  await page.waitForTimeout(500);

  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => {
      window.scrollBy(0, 300);
    });
    await page.waitForTimeout(300);
  }

  console.log('Recording completed.');

  await browser.close();
  console.log('Video saved to: videos/');
}

recordVideo().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
