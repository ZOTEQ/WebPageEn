const { chromium } = require('playwright');
const path = require('path');

async function recordPerformance() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe'
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: 'videos/', size: { width: 1920, height: 1080 } }
  });

  const page = await context.newPage();

  await page.evaluateOnNewDocument(() => {
    window.performanceData = [];
  });

  const htmlPath = path.resolve(__dirname, '..', 'Zoteq_Catalogue_Full_2605_V04.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });

  await page.evaluate(() => {
    window.performanceData.push({
      event: 'pageLoad',
      time: performance.now(),
      memory: performance.memory ? performance.memory.usedJSHeapSize : 0
    });
  });

  for (let i = 0; i < 10; i++) {
    await page.evaluate(() => window.scrollBy(0, 200));
    await page.waitForTimeout(200);

    await page.evaluate(() => {
      window.performanceData.push({
        event: 'scroll',
        scrollY: window.scrollY,
        time: performance.now()
      });
    });
  }

  const perfData = await page.evaluate(() => window.performanceData);
  console.log('Performance data:', perfData);

  await browser.close();
  console.log('Performance recording completed!');
}

recordPerformance().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
