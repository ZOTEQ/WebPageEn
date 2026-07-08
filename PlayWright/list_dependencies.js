const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '..', 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

// 提取所有资源引用
const cssFiles = content.match(/<link[^>]+href="([^"]+\.css)"/gi) || [];
const jsFiles = content.match(/<script[^>]+src="([^"]+\.js)"/gi) || [];
const fontLinks = content.match(/<link[^>]+href="([^"]+fonts[^"]+)"/gi) || [];

console.log('='.repeat(70));
console.log('          网站运行必须依赖的文件清单');
console.log('='.repeat(70));
console.log('');

console.log('📁 CSS样式文件:');
console.log('-'.repeat(30));
cssFiles.forEach((link, index) => {
    const match = link.match(/href="([^"]+)"/);
    if (match) {
        console.log(`${index + 1}. ${match[1]}`);
    }
});
console.log('');

console.log('📁 JavaScript脚本文件:');
console.log('-'.repeat(30));
jsFiles.forEach((script, index) => {
    const match = script.match(/src="([^"]+)"/);
    if (match) {
        console.log(`${index + 1}. ${match[1]}`);
    }
});
console.log('');

console.log('🌐 外部字体资源:');
console.log('-'.repeat(30));
fontLinks.forEach((link, index) => {
    const match = link.match(/href="([^"]+)"/);
    if (match) {
        console.log(`${index + 1}. ${match[1]}`);
    }
});
console.log('');

console.log('📁 目录结构（必须存在）:');
console.log('-'.repeat(30));
console.log('1. css/          - 样式文件目录');
console.log('2. js/           - JavaScript文件目录');
console.log('3. images/       - 图片资源目录');
console.log('');

console.log('📝 必需文件清单:');
console.log('-'.repeat(30));
const requiredFiles = [
    'index.html',
    'css/variables.css',
    'css/base.css',
    'css/components.css',
    'css/navigation.css',
    'css/hero.css',
    'css/main.css',
    'js/main.js'
];

requiredFiles.forEach((file, index) => {
    const filePath = path.resolve(__dirname, '..', file);
    const exists = fs.existsSync(filePath);
    console.log(`${index + 1}. [${exists ? '✅' : '❌'}] ${file}`);
});

console.log('');
console.log('='.repeat(70));
console.log('注: 部署时需确保以上所有文件和目录都存在');
console.log('='.repeat(70));
