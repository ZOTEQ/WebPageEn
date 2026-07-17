const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '..', 'index.html');
let content = fs.readFileSync(htmlPath, 'utf8');

// 为所有没有loading属性的img标签添加loading="lazy"
const imgRegex = /<img([^>]*?)(?<!loading=["']lazy["'])([^>]*)>/gi;
const updatedContent = content.replace(imgRegex, (match, p1, p2) => {
    // 检查是否已经有loading属性
    if (/loading\s*=\s*["']lazy["']/i.test(match)) {
        return match;
    }
    // 找到src属性的位置，在其后添加loading="lazy"
    const srcIndex = match.indexOf('src=');
    if (srcIndex !== -1) {
        const afterSrc = match.indexOf('"', srcIndex + 5);
        if (afterSrc !== -1) {
            return match.slice(0, afterSrc + 1) + ' loading="lazy"' + match.slice(afterSrc + 1);
        }
    }
    // 如果找不到src位置，就在img标签末尾添加
    return match.replace('>', ' loading="lazy">');
});

fs.writeFileSync(htmlPath, updatedContent, 'utf8');

// 统计添加的懒加载数量
const originalCount = (content.match(/<img[^>]*>/gi) || []).length;
const lazyCount = (updatedContent.match(/loading=["']lazy["']/gi) || []).length;

console.log(`已为 ${lazyCount} 张图片添加懒加载属性，总计 ${originalCount} 张图片`);
