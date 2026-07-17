const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function visualAudit() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe'
  });

  const pages = await browser.newPage();
  await pages.setViewportSize({ width: 1920, height: 1080 });

  const projectDir = path.resolve(__dirname, '..');
  const htmlFiles = fs.readdirSync(projectDir)
    .filter(file => file.endsWith('.html') && !file.startsWith('.') && !file.includes('_backup'))
    .sort();

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotsDir = path.resolve(projectDir, 'screenshots', `audit-${timestamp}`);
  
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log(`\n=== Visual Audit Starting ===`);
  console.log(`Found ${htmlFiles.length} HTML files to audit\n`);

  for (let i = 0; i < htmlFiles.length; i++) {
    const fileName = htmlFiles[i];
    const filePath = path.resolve(projectDir, fileName);
    
    try {
      console.log(`Processing ${i + 1}/${htmlFiles.length}: ${fileName}`);
      
      await pages.goto(`file://${filePath}`, { 
        waitUntil: 'networkidle',
        timeout: 30000
      });

      await pages.waitForTimeout(2000);

      const screenshotPath = path.resolve(screenshotsDir, `${fileName.replace('.html', '')}.png`);
      
      await pages.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      console.log(`  ✓ Screenshot saved: ${screenshotPath}`);
    } catch (error) {
      console.log(`  ✗ Error processing ${fileName}: ${error.message}`);
    }
    
    console.log('');
  }

  await browser.close();
  console.log(`=== Visual Audit Completed ===`);
  console.log(`All screenshots saved to: ${screenshotsDir}`);
}

visualAudit().catch(err => {
  console.error('Visual audit failed:', err);
  process.exit(1);
});
