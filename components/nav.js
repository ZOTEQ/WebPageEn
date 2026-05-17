/**
 * ZOTEQ Navigation Component Loader
 * 自动加载公共导航栏，支持深色/浅色主题
 * 
 * 使用方法：
 * 1. 在页面 <body> 中添加 <div id="nav-placeholder"></div>
 * 2. 在页面底部引入 <script src="components/nav.js"></script>
 * 3. 浅色主题页面：添加 class="light-theme" 到 body
 * 4. 深色主题页面：添加 class="dark-theme" 到 body（可选，默认深色）
 */

class NavigationLoader {
    constructor() {
        this.navPlaceholder = document.getElementById('nav-placeholder');
        this.isLoaded = false;
        this.isDarkTheme = true;
    }

    async load() {
        if (this.isLoaded || !this.navPlaceholder) {
            console.warn('Navigation already loaded or placeholder not found');
            return;
        }

        try {
            // 检测页面主题
            this.detectTheme();

            // 加载导航栏 HTML
            const response = await fetch('components/nav.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const navHTML = await response.text();

            // 插入导航栏
            this.navPlaceholder.innerHTML = navHTML;
            this.isLoaded = true;

            // 应用主题样式
            this.applyTheme();

            // 初始化导航功能
            this.initScrollEffect();
            this.initMobileMenu();

        } catch (error) {
            console.error('Failed to load navigation:', error);
            this.navPlaceholder.innerHTML = '<nav class="fallback-nav"><a href="index.html" class="logo">ZOTEQ</a></nav>';
        }
    }

    detectTheme() {
        const body = document.body;
        // 强制深色主题检测
        if (body.classList.contains('force-dark-nav') || 
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
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        if (this.isDarkTheme) {
            navbar.classList.add('dark-theme');
            navbar.classList.remove('light-theme');
        } else {
            navbar.classList.add('light-theme');
            navbar.classList.remove('dark-theme');
        }
    }

    initScrollEffect() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // 初始检测
    }

    initMobileMenu() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        const mobileMenuBtn = navbar.querySelector('.mobile-menu-btn');
        if (!mobileMenuBtn) return;

        mobileMenuBtn.addEventListener('click', () => {
            navbar.classList.toggle('mobile-open');
            mobileMenuBtn.classList.toggle('active');
        });
    }
}

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
    const loader = new NavigationLoader();
    loader.load();
});

// 导出以供手动调用
window.NavigationLoader = NavigationLoader;