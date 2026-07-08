const { chromium } = require('playwright');
const path = require('path');

async function inspectLayout() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  const htmlPath = path.resolve(__dirname, '..', 'index.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 60000 });

  console.log('=== Detailed Layout Inspection ===\n');

  // 检查ff-hub-header
  const headerBox = await page.evaluate(() => {
    const el = document.querySelector('.ff-hub-header');
    if (el) {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return { rect, position: style.position, zIndex: style.zIndex };
    }
    return null;
  });
  console.log('ff-hub-header:', headerBox);

  // 检查section-header
  const sectionHeaderBox = await page.evaluate(() => {
    const el = document.querySelector('.ff-hub .section-header');
    if (el) {
      const rect = el.getBoundingClientRect();
      return rect;
    }
    return null;
  });
  console.log('section-header:', sectionHeaderBox);

  // 检查slide-content
  const slideContentBox = await page.evaluate(() => {
    const el = document.querySelector('.carousel-slide.active .slide-content');
    if (el) {
      const rect = el.getBoundingClientRect();
      return rect;
    }
    return null;
  });
  console.log('slide-content (active):', slideContentBox);

  // 检查所有h2元素的位置
  const h2Positions = await page.evaluate(() => {
    const h2s = document.querySelectorAll('#FF-HUB h2');
    return Array.from(h2s).map((h2, index) => {
      const rect = h2.getBoundingClientRect();
      return { index, text: h2.textContent, rect };
    });
  });
  
  console.log('\nAll h2 positions:');
  h2Positions.forEach(h2 => {
    console.log(`  ${h2.index + 1}. "${h2.text.substring(0, 20)}..." => x: ${h2.rect.x.toFixed(0)}, y: ${h2.rect.y.toFixed(0)}, w: ${h2.rect.width.toFixed(0)}, h: ${h2.rect.height.toFixed(0)}`);
  });

  // 检查是否有元素重叠
  console.log('\nChecking for overlapping elements...');
  const hasOverlap = await page.evaluate(() => {
    const header = document.querySelector('.ff-hub-header');
    const slideContent = document.querySelector('.carousel-slide.active .slide-content');
    
    if (header && slideContent) {
      const hRect = header.getBoundingClientRect();
      const sRect = slideContent.getBoundingClientRect();
      
      const overlap = !(hRect.bottom < sRect.top || hRect.top > sRect.bottom);
      return { overlap, headerBottom: hRect.bottom, slideTop: sRect.top };
    }
    return { overlap: false };
  });
  console.log('Header/Slide overlap:', hasOverlap);

  await browser.close();
}

inspectLayout().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
