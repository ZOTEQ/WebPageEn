const { chromium } = require('playwright');
const path = require('path');

async function testResponsiveLayouts() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe'
  });

  const viewports = [
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Laptop', width: 1366, height: 768 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 667 }
  ];

  const htmlPath = path.resolve(__dirname, '..', 'index.html');

  console.log('=== Responsive Layout Test ===\n');

  for (const viewport of viewports) {
    console.log(`Testing ${viewport.name} (${viewport.width}x${viewport.height}):`);
    
    const page = await browser.newPage();
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 60000 });

    const heroBox = await page.evaluate(() => {
      const hero = document.querySelector('.hero');
      if (hero) {
        return hero.getBoundingClientRect();
      }
      return null;
    });

    const ffHubBox = await page.evaluate(() => {
      const ffHub = document.querySelector('#FF-HUB');
      if (ffHub) {
        return ffHub.getBoundingClientRect();
      }
      return null;
    });

    let overlap = false;
    if (heroBox && ffHubBox) {
      overlap = !(ffHubBox.top > heroBox.bottom || ffHubBox.bottom < heroBox.top);
    }

    console.log(`  HERO: x=${heroBox?.x?.toFixed(0)}, y=${heroBox?.y?.toFixed(0)}, w=${heroBox?.width?.toFixed(0)}, h=${heroBox?.height?.toFixed(0)}`);
    console.log(`  FF-HUB: x=${ffHubBox?.x?.toFixed(0)}, y=${ffHubBox?.y?.toFixed(0)}, w=${ffHubBox?.width?.toFixed(0)}, h=${ffHubBox?.height?.toFixed(0)}`);
    console.log(`  Overlap: ${overlap ? '❌ YES' : '✅ NO'}`);
    console.log('');

    await page.close();
  }

  await browser.close();
}

testResponsiveLayouts().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
