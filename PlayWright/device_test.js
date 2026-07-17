const { chromium, devices } = require('playwright');
const path = require('path');

async function deviceTest() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe'
  });

  const devicesToTest = [
    'iPhone 12',
    'iPad Pro 11',
    'iPhone SE',
    'Pixel 5'
  ];

  const htmlPath = path.resolve(__dirname, '..', 'Zoteq_Catalogue_Full_2605_V04.html');
  const videosDir = path.resolve(__dirname, '..', 'videos');

  for (const deviceName of devicesToTest) {
    const device = devices[deviceName];
    if (!device) {
      console.log(`Device ${deviceName} not found, skipping...`);
      continue;
    }

    console.log(`Testing on ${deviceName}...`);

    const context = await browser.newContext({
      ...device,
      recordVideo: {
        dir: videosDir,
        size: { width: device.viewport.width, height: device.viewport.height }
      }
    });

    const page = await context.newPage();
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });

    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(500);

    await context.close();
    console.log(`${deviceName} test completed`);
  }

  await browser.close();
  console.log('All device tests completed!');
}

deviceTest().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
