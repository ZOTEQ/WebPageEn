const fs = require('fs');
const path = require('path');

const cssPath = path.resolve(__dirname, '..', 'css', 'main.css');
let content = fs.readFileSync(cssPath, 'utf8');

// 移除之前可能添加的重复样式
content = content.replace(/\/\* Ensure inactive slides are fully hidden \*\/[\s\S]*?\/\* Ensure active slide content is visible \*\/[\s\S]*?\}/g, '');

// 添加更强的样式规则
const strongerStyles = `

/* Strong rules to hide inactive slides */
#FF-HUB .carousel-slide {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
}

#FF-HUB .carousel-slide.active {
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto !important;
}

#FF-HUB .carousel-slide:not(.active) .slide-content {
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    display: none !important;
}

#FF-HUB .carousel-slide.active .slide-content {
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto !important;
    display: block !important;
}`;

content += strongerStyles;

fs.writeFileSync(cssPath, content, 'utf8');
console.log('Strong CSS rules added to fix slide visibility');
