const fs = require('fs');
const path = require('path');

const cssPath = path.resolve(__dirname, '..', 'css', 'main.css');
let content = fs.readFileSync(cssPath, 'utf8');

// 移除之前可能添加的重复样式
content = content.replace(/\/\* Strong rules to hide inactive slides \*\/[\s\S]*?display: block !important;\s*\}/g, '');
content = content.replace(/\/\* Ensure inactive slides are fully hidden \*\/[\s\S]*?\/\* Ensure active slide content is visible \*\/[\s\S]*?\}/g, '');

// 添加正确的slide隐藏样式
const slideStyles = `

/* Carousel slide visibility controls */
.carousel-track {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.carousel-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    z-index: 1;
    transition: opacity 0.8s ease, transform 0.8s ease;
    transform: translateX(50px);
}

.carousel-slide.active {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    z-index: 10;
    transform: translateX(0);
}

.carousel-slide:not(.active) {
    display: none !important;
}

.carousel-slide:not(.active) * {
    display: none !important;
}`;

content += slideStyles;

fs.writeFileSync(cssPath, content, 'utf8');
console.log('F&F HUB slide visibility fixed');
