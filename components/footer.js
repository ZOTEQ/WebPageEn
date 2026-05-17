/**
 * ZOTEQ Footer Component Loader
 * 自动加载公共页脚，支持深色/浅色主题
 * 
 * 使用方法：
 * 1. 在页面 <body> 中添加 <div id="footer-placeholder"></div>
 * 2. 在页面底部引入 <script src="components/footer.js"></script>
 * 3. 浅色主题页面：添加 class="light-theme" 到 body
 * 4. 深色主题页面：添加 class="dark-theme" 到 body（可选，默认深色）
 */

class FooterLoader {
    constructor() {
        this.footerPlaceholder = document.getElementById('footer-placeholder');
        this.isLoaded = false;
        this.isDarkTheme = true;
    }

    async load() {
        if (this.isLoaded || !this.footerPlaceholder) {
            console.warn('Footer already loaded or placeholder not found');
            return;
        }

        try {
            // 检测页面主题
            this.detectTheme();

            // 加载页脚 HTML
            const response = await fetch('components/footer.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const footerHTML = await response.text();

            // 插入页脚
            this.footerPlaceholder.innerHTML = footerHTML;
            this.isLoaded = true;

            // 应用主题样式
            this.applyTheme();

        } catch (error) {
            console.error('Failed to load footer:', error);
            this.footerPlaceholder.innerHTML = '<footer class="fallback-footer"><p>&copy; 2024 ZOTEQ</p></footer>';
        }
    }

    detectTheme() {
        const body = document.body;
        // 强制深色主题检测
        if (body.classList.contains('force-dark-footer') || 
            body.classList.contains('dark-theme')) {
            this.isDarkTheme = true;
        } else if (body.classList.contains('light-theme')) {
            this.isDarkTheme = false;
        } else {
            // 默认检测背景色
            const bgColor = getComputedStyle(body).backgroundColor;
            this.isDarkTheme = this.isColorDark(bgColor);
        }
    }

    isColorDark(color) {
        const rgb = color.match(/\d+/g);
        if (!rgb) return true;
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        return brightness < 128;
    }

    applyTheme() {
        const footer = this.footerPlaceholder.querySelector('.main-footer');
        if (!footer) return;

        if (this.isDarkTheme) {
            footer.classList.add('dark-theme');
            footer.classList.remove('light-theme');
        } else {
            footer.classList.add('light-theme');
            footer.classList.remove('dark-theme');
        }
    }
}

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
    const loader = new FooterLoader();
    loader.load();
});

// 导出以供手动调用
window.FooterLoader = FooterLoader;
