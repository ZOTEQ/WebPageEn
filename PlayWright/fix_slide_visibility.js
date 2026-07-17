const fs = require('fs');
const path = require('path');

const cssPath = path.resolve(__dirname, '..', 'css', 'main.css');
let content = fs.readFileSync(cssPath, 'utf8');

// 添加样式确保非active的slide内容隐藏
const additionalStyles = `

/* Ensure inactive slides are fully hidden */
.carousel-slide:not(.active) .slide-content {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}

/* Ensure active slide content is visible */
.carousel-slide.active .slide-content {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
}`;

content += additionalStyles;

fs.writeFileSync(cssPath, content, 'utf8');
console.log('CSS updated to fix slide visibility');
