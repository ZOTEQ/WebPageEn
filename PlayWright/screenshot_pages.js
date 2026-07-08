const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function screenshotAllPages() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  const htmlPath = path.resolve(__dirname, '..', 'Zoteq_Catalogue_Full_2605_V04.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });

  const totalPages = await page.evaluate(() => {
    const lastPage = document.querySelector('.page:last-child');
    const footer = lastPage ? lastPage.querySelector('.page-num') : null;
    return footer ? parseInt(footer.textContent) : 1;
  });

  const screenshotsDir = path.resolve(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  for (let i = 1; i <= totalPages; i++) {
    await page.evaluate((pageNum) => {
      const pages = document.querySelectorAll('.page');
      pages.forEach((p, index) => {
        p.style.display = (index + 1 === pageNum) ? 'block' : 'none';
      });
    }, i);

    const screenshotPath = path.resolve(screenshotsDir, `page${i}.png`);
    await page.screenshot({
      path: screenshotPath,
      fullPage: true
    });

    console.log(`Page ${i}/${totalPages} screenshot saved`);
  }

  await browser.close();
  console.log('All pages screenshot completed!');
}

screenshotAllPages().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
