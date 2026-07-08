const { chromium } = require('playwright');
const path = require('path');

async function inspectDuplicateElements() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  const htmlPath = path.resolve(__dirname, '..', 'index.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 60000 });

  console.log('=== Inspecting FF-HUB Duplicate Elements ===\n');

  // 检查section-header数量
  const sectionHeaderCount = await page.evaluate(() => {
    return document.querySelectorAll('.ff-hub .section-header').length;
  });
  console.log(`Number of .section-header elements in FF-HUB: ${sectionHeaderCount}`);

  // 检查slide-content数量
  const slideContentCount = await page.evaluate(() => {
    return document.querySelectorAll('.carousel-slide .slide-content').length;
  });
  console.log(`Number of .slide-content elements: ${slideContentCount}`);

  // 检查是否有重复的h2
  const h2Texts = await page.evaluate(() => {
    const h2s = document.querySelectorAll('#FF-HUB h2');
    return Array.from(h2s).map(h2 => h2.textContent);
  });
  console.log('\nAll h2 texts in FF-HUB:');
  h2Texts.forEach((text, index) => {
    console.log(`  ${index + 1}. "${text}"`);
  });

  // 检查CSS是否有伪元素生成内容
  const hasPseudoContent = await page.evaluate(() => {
    const styleSheets = Array.from(document.styleSheets);
    let foundPseudo = false;
    styleSheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach(rule => {
          if (rule.cssText && (rule.cssText.includes('::before') || rule.cssText.includes('::after'))) {
            if (rule.cssText.includes('content:')) {
              if (rule.cssText.includes('section-header') || rule.cssText.includes('slide-content')) {
                console.log(`Found pseudo element: ${rule.cssText.substring(0, 100)}...`);
                foundPseudo = true;
              }
            }
          }
        });
      } catch (e) {
        // 跨域样式表可能无法访问
      }
    });
    return foundPseudo;
  });

  if (!hasPseudoContent) {
    console.log('\nNo pseudo elements found generating content');
  }

  // 检查是否有transform或filter导致镜像
  const hasMirrorEffect = await page.evaluate(() => {
    const ffHub = document.querySelector('#FF-HUB');
    if (ffHub) {
      const style = window.getComputedStyle(ffHub);
      const transforms = ['scaleX(-1)', 'scale(-1)', 'matrix(-1', 'skewX'];
      return transforms.some(t => style.transform.includes(t) || style.filter.includes(t));
    }
    return false;
  });
  console.log(`\nHas mirror/flip effect: ${hasMirrorEffect}`);

  await browser.close();
}

inspectDuplicateElements().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
