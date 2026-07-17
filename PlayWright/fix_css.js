const fs = require('fs');
const path = require('path');

const cssPath = path.resolve(__dirname, '..', 'css', 'main.css');
let content = fs.readFileSync(cssPath, 'utf8');

// 找到需要替换的部分
const oldPattern = /\.ff-hub-header \{\s*position: absolute;\s*top: 10%;\s*left: 0;\s*width: 100%;\s*z-index: 15;\s*padding-top: 0;\s*padding-bottom: 0;\s*pointer-events: none;\s*\}`n`n\.ff-hub \.section-header \{`n    text-align: center;`n    max-width: 800px;`n    margin: 0 auto;`n\}`n`n\.ff-hub \.section-header \.section-label \{`n    color: var\(--ocean-light\);`n\}`n`n\.ff-hub \.section-header h2 \{`n    color: var\(--white\);`n    font-size: clamp\(2rem, 4vw, 3rem\);`n    margin-bottom: calc\(var\(--space-unit\) \* 3\);`n\}`n`n\.ff-hub \.section-header p \{`n    color: rgba\(255, 255, 255, 0\.75\);`n    font-size: 1\.125rem;`n    line-height: 1\.7;`n    max-width: 700px;`n    margin: 0 auto;`n\}/;

const newContent = `.ff-hub-header {
    position: absolute;
    top: 10%;
    left: 0;
    width: 100%;
    z-index: 15;
    padding-top: 0;
    padding-bottom: 0;
    pointer-events: none;
}

.ff-hub .section-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
}

.ff-hub .section-header .section-label {
    color: var(--ocean-light);
}

.ff-hub .section-header h2 {
    color: var(--white);
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: calc(var(--space-unit) * 3);
}

.ff-hub .section-header p {
    color: rgba(255, 255, 255, 0.75);
    font-size: 1.125rem;
    line-height: 1.7;
    max-width: 700px;
    margin: 0 auto;
}`;

content = content.replace(oldPattern, newContent);

// 如果第一次替换失败，尝试替换包含错误转义字符的版本
if (content.includes('`n`n')) {
    content = content.replace(/`n`n/g, '\n\n');
}

fs.writeFileSync(cssPath, content, 'utf8');
console.log('CSS file fixed successfully');
