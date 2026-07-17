const { chromium } = require('playwright');

async function testCORSFix() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  // 捕获控制台错误
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // 使用HTTP服务器地址
  await page.goto('http://localhost:8888/index.html', { waitUntil: 'networkidle', timeout: 60000 });

  console.log('=== CORS Test Results ===');
  console.log('');

  if (consoleErrors.length === 0) {
    console.log('✅ No CORS errors detected!');
    console.log('✅ SVG icons loaded successfully via HTTP');
  } else {
    console.log('❌ Console Errors:');
    consoleErrors.forEach(err => console.log(`   - ${err}`));
  }

  // 检查SVG图标是否加载成功
  const svgLoaded = await page.evaluate(() => {
    const iconBadges = document.querySelectorAll('.icon-badge');
    let loaded = true;
    iconBadges.forEach(badge => {
      const iconImage = badge.querySelector('.icon-image');
      if (iconImage) {
        const maskImage = window.getComputedStyle(iconImage).maskImage;
        if (!maskImage || maskImage === 'none') {
          loaded = false;
        }
      }
    });
    return loaded;
  });

  console.log('');
  if (svgLoaded) {
    console.log('✅ SVG icons are properly displayed');
  } else {
    console.log('⚠️ Some SVG icons may not be loading properly');
  }

  await browser.close();
}

testCORSFix().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
