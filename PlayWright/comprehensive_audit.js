const { chromium } = require('playwright');
const path = require('path');

async function comprehensiveAudit() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe'
  });

  const viewports = [
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 667 }
  ];

  const htmlPath = path.resolve(__dirname, '..', 'index.html');
  let allIssues = [];

  console.log('='.repeat(70));
  console.log('          WEB DESIGN ENGINEER - COMPREHENSIVE AUDIT REPORT');
  console.log('='.repeat(70));
  console.log('');

  for (const viewport of viewports) {
    console.log(`[VIEWPORT] ${viewport.name} (${viewport.width}x${viewport.height})`);
    console.log('-'.repeat(50));

    const page = await browser.newPage();
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    // 捕获控制台错误
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 60000 });

    // 检查控制台错误
    if (consoleErrors.length > 0) {
      console.log(`❌ Console Errors: ${consoleErrors.length}`);
      consoleErrors.forEach(err => console.log(`   - ${err}`));
      allIssues.push({ viewport: viewport.name, type: 'console', issue: consoleErrors.join('; ') });
    } else {
      console.log('✅ No console errors');
    }

    // 检查页面标题
    const title = await page.title();
    if (!title || title.length < 5) {
      console.log(`❌ Page title missing or too short: "${title}"`);
      allIssues.push({ viewport: viewport.name, type: 'title', issue: `Title too short: ${title}` });
    } else {
      console.log(`✅ Page title: "${title}"`);
    }

    // 检查视口设置
    const viewportMeta = await page.$('meta[name="viewport"]');
    const viewportContent = viewportMeta ? await viewportMeta.getAttribute('content') : '';
    if (!viewportContent.includes('width=device-width') || !viewportContent.includes('initial-scale=1')) {
      console.log(`❌ Viewport meta tag incorrect: ${viewportContent}`);
      allIssues.push({ viewport: viewport.name, type: 'viewport', issue: `Viewport missing: ${viewportContent}` });
    } else {
      console.log('✅ Viewport meta tag correctly configured');
    }

    // 检查交互组件状态
    const interactiveElements = await page.evaluate(() => {
      const elements = [];
      document.querySelectorAll('button, a, input, [role="button"]').forEach(el => {
        const tag = el.tagName.toLowerCase();
        const hasHover = window.getComputedStyle(el).transition || window.getComputedStyle(el).animation;
        elements.push({ tag, hasHover });
      });
      return elements;
    });

    const elementsWithoutHover = interactiveElements.filter(el => !el.hasHover);
    if (elementsWithoutHover.length > 0) {
      console.log(`⚠️ Elements without hover/focus states: ${elementsWithoutHover.length}`);
    } else {
      console.log('✅ All interactive elements have hover/focus states');
    }

    // 检查图片优化
    const images = await page.evaluate(() => {
      const imgs = [];
      document.querySelectorAll('img').forEach(img => {
        imgs.push({
          src: img.src,
          hasLoading: img.hasAttribute('loading'),
          hasAlt: img.hasAttribute('alt'),
          altText: img.getAttribute('alt') || '',
          width: img.width,
          height: img.height
        });
      });
      return imgs;
    });

    const imagesWithoutLoading = images.filter(img => !img.hasLoading);
    if (imagesWithoutLoading.length > 0) {
      console.log(`⚠️ Images without lazy loading: ${imagesWithoutLoading.length}`);
    } else {
      console.log('✅ All images have lazy loading');
    }

    const imagesWithoutAlt = images.filter(img => !img.hasAlt || (!img.altText || img.altText.trim() === ''));
    if (imagesWithoutAlt.length > 0) {
      console.log(`❌ Images without alt text: ${imagesWithoutAlt.length}`);
      allIssues.push({ viewport: viewport.name, type: 'accessibility', issue: `${imagesWithoutAlt.length} images missing alt text` });
    } else {
      console.log('✅ All images have alt text');
    }

    // 检查ARIA属性
    const ariaElements = await page.evaluate(() => {
      return document.querySelectorAll('[aria-label], [aria-hidden], [role]').length;
    });
    console.log(`✅ ARIA attributes present: ${ariaElements}`);

    // 检查F&F HUB特定问题
    const ffHubIssues = await page.evaluate(() => {
      const issues = [];
      const ffHub = document.querySelector('#FF-HUB');
      if (!ffHub) {
        issues.push('FF-HUB section not found');
        return issues;
      }

      const slides = ffHub.querySelectorAll('.carousel-slide');
      const activeSlides = ffHub.querySelectorAll('.carousel-slide.active');
      if (activeSlides.length !== 1) {
        issues.push(`Expected 1 active slide, found ${activeSlides.length}`);
      }

      const visibleSlides = [];
      slides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && !slide.classList.contains('active')) {
          visibleSlides.push(index);
        }
      });

      if (visibleSlides.length > 0) {
        issues.push(`Inactive slides visible: ${visibleSlides.join(', ')}`);
      }

      const header = ffHub.querySelector('.ff-hub-header');
      if (!header) {
        issues.push('ff-hub-header not found');
      }

      const sectionHeader = ffHub.querySelector('.section-header');
      if (!sectionHeader) {
        issues.push('section-header not found');
      }

      return issues;
    });

    if (ffHubIssues.length > 0) {
      console.log(`❌ F&F HUB Issues:`);
      ffHubIssues.forEach(issue => console.log(`   - ${issue}`));
      allIssues.push({ viewport: viewport.name, type: 'ffhub', issue: ffHubIssues.join('; ') });
    } else {
      console.log('✅ F&F HUB section is properly configured');
    }

    // 检查文本溢出
    const textOverflows = await page.evaluate(() => {
      const overflows = [];
      document.querySelectorAll('*').forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.overflow === 'hidden' && style.textOverflow === 'ellipsis') {
          const rect = el.getBoundingClientRect();
          const textWidth = el.scrollWidth;
          if (textWidth > rect.width) {
            overflows.push(el.tagName);
          }
        }
      });
      return overflows;
    });

    if (textOverflows.length > 0) {
      console.log(`⚠️ Text overflow detected in: ${textOverflows.length} elements`);
    } else {
      console.log('✅ No text overflow detected');
    }

    console.log('');
    await page.close();
  }

  // 生成总结报告
  console.log('='.repeat(70));
  console.log('                    AUDIT SUMMARY');
  console.log('='.repeat(70));
  console.log('');

  if (allIssues.length === 0) {
    console.log('🎉 All checks passed! Website is ready for delivery.');
  } else {
    console.log(`⚠️ Total issues found: ${allIssues.length}`);
    console.log('');
    console.log('Issue Details:');
    allIssues.forEach((issue, index) => {
      console.log(`${index + 1}. [${issue.viewport}] [${issue.type.toUpperCase()}] ${issue.issue}`);
    });
  }

  await browser.close();
}

comprehensiveAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
