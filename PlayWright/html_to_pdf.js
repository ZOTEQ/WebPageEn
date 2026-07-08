const { chromium } = require('playwright');
const path = require('path');

async function generatePDF() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe'
  });
  const page = await browser.newPage();
  const htmlPath = path.resolve(__dirname, '..', 'Zoteq_Catalogue_Full_2605_V04.html');
  const pdfPath = path.resolve(__dirname, '..', 'Zoteq_Catalogue_Full_2605_V04.pdf');

  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();
  console.log(`PDF generated: ${pdfPath}`);
}

generatePDF().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
