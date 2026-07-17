const { chromium } = require('playwright');
const path = require('path');

async function inspectElement() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  const htmlPath = path.resolve(__dirname, '..', 'index.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 60000 });

  console.log('=== Inspecting FF-HUB Section ===\n');

  const ffHub = await page.$('#FF-HUB');
  if (ffHub) {
    const box = await ffHub.boundingBox();
    const styles = await page.evaluate(() => {
      const el = document.querySelector('#FF-HUB');
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        visibility: computed.visibility,
        opacity: computed.opacity,
        width: computed.width,
        height: computed.height,
        minHeight: computed.minHeight,
        position: computed.position,
        overflow: computed.overflow,
        zIndex: computed.zIndex
      };
    });
    
    console.log('Bounding Box:', box);
    console.log('Computed Styles:', styles);
    
    const carouselBox = await page.evaluate(() => {
      const carousel = document.querySelector('.ff-hub-carousel');
      if (carousel) {
        const computed = window.getComputedStyle(carousel);
        const box = carousel.getBoundingClientRect();
        return {
          computedStyles: {
            display: computed.display,
            width: computed.width,
            height: computed.height,
            position: computed.position,
            overflow: computed.overflow
          },
          boundingRect: box
        };
      }
      return null;
    });
    
    console.log('\nFF-HUB Carousel:', carouselBox);
    
    const slideCount = await page.evaluate(() => {
      const slides = document.querySelectorAll('.carousel-slide');
      return slides.length;
    });
    console.log('\nNumber of slides:', slideCount);
    
    const activeSlide = await page.evaluate(() => {
      const active = document.querySelector('.carousel-slide.active');
      if (active) {
        const computed = window.getComputedStyle(active);
        return {
          exists: true,
          opacity: computed.opacity,
          visibility: computed.visibility,
          display: computed.display
        };
      }
      return { exists: false };
    });
    console.log('Active Slide:', activeSlide);
  } else {
    console.log('FF-HUB section not found!');
  }

  await browser.close();
}

inspectElement().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
