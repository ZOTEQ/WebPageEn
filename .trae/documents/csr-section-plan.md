# CSR/Sustainability Section — 实施方案

## 概述

在 OwnProduct\_light.html 的 "Find Your Essential Oils" 搜索模块之前，插入一个新的 CSR/可持续发展板块。该板块包含 4 张横向等分卡片，分别展示 Environment、Labor & Human Rights、Ethics、Sustainable Procurement 四大主题。

## 当前状态

* **插入位置：** 工厂照片墙（`#factory` section，行 358-367）与搜索 CTA（`#search-cta` section，行 369-390）之间

* **页面现有卡片模式：** `.origin-card`（白底、20px圆角、24px内边距、hover上移+阴影）

* **图标系统：** JS ICONS 对象 + 行内 SVG，统一 24×24 viewBox、stroke-width=2

* **配色体系：** --ocean(#3d8b8b) 系列为品牌自然/绿色调，--accent(#e07a5f) 为强调色

* **动画系统：** `.reveal` + IntersectionObserver，延迟序列 `.reveal-d1`\~`.reveal-d6`

## 设计决策

### 配色方案（低饱和度商务风）

| 主题                      | 主色                     | 浅底色                      | 用途           |
| ----------------------- | ---------------------- | ------------------------ | ------------ |
| Environment             | `#3d8b8b` (ocean)      | `rgba(61,139,139,0.06)`  | 图标/标题 + 卡片底色 |
| Labor & Human Rights    | `#5a8a6e` (sage)       | `rgba(90,138,110,0.06)`  | 图标/标题 + 卡片底色 |
| Ethics                  | `#6b7fa3` (slate)      | `rgba(107,127,163,0.06)` | 图标/标题 + 卡片底色 |
| Sustainable Procurement | `#8b7355` (warm stone) | `rgba(139,115,85,0.06)`  | 图标/标题 + 卡片底色 |

> 这四个色都从现有调色板衍生，低饱和度、商务感、彼此协调。

### 布局

* **桌面端（≥1024px）：** 4列等宽 grid

* **平板（640px-1023px）：** 2列 grid

* **手机（<640px）：** 单列堆叠

* **卡片结构：** 顶部（图标 + 英文标题）→ 中部（极简配图占位区）→ 底部（政策细则列表）

### 图标（4个线性图标）

按照 ICON规范.md（24×24、stroke-width=2、currentColor）：

1. **Environment:** 地球+叶子（Leaf/Earth icon）
2. **Labor & Human Rights:** 人形+盾牌（People/Shield icon）
3. **Ethics:** 天平/盾牌+勾（Scale/ShieldCheck icon）
4. **Sustainable Procurement:** 供应链环形（GitBranch/Link icon）

### 配图处理

由于 images/ 目录无现成可持续主题图片，采用以下方案：

* 每张卡片设置 `aspect-ratio: 16/9` 的配图区域

* 使用纯 CSS 渐变色块作为占位背景（与对应主题色匹配）

* 图片区域添加虚线边框 + "Image Placeholder" 文字提示

* 后续替换真实图片时只需修改 `background` / `<img>` 标签

***

## 实施步骤

### 步骤 1：在 `<style>` 中添加 CSR 板块 CSS

**文件：** `OwnProduct_light.html`\
**位置：** 在 `.mb-32` 样式规则之后（约行 198）、`.origins-section` 之前

新增以下 CSS 规则：

```css
/* ========== CSR / Sustainability Section ========== */
.csr-section{background:var(--bg-secondary);position:relative}
.csr-grid{display:grid;grid-template-columns:1fr;gap:24px}
@media(min-width:640px){.csr-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.csr-grid{grid-template-columns:repeat(4,1fr)}}
.csr-card{background:var(--white);border-radius:var(--radius-card-lg);padding:32px 24px 28px;display:flex;flex-direction:column;gap:20px;transition:all 0.5s var(--ease-out-expo);border:1px solid rgba(61,139,139,0.06);box-shadow:var(--shadow-sm)}
.csr-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg)}
.csr-card-header{display:flex;align-items:center;gap:14px}
.csr-card-icon{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform 0.5s var(--ease-out-expo)}
.csr-card:hover .csr-card-icon{transform:scale(1.08) rotate(3deg)}
.csr-card-icon svg{width:24px;height:24px}
.csr-card-title{font-family:var(--font-heading);font-size:16px;font-weight:500;color:var(--text-primary);letter-spacing:-0.02em;line-height:1.3}
.csr-card-image{width:100%;aspect-ratio:16/9;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:11px;font-family:var(--font-body);color:var(--text-tertiary);letter-spacing:0.02em;overflow:hidden}
.csr-card-list{list-style:none;display:flex;flex-direction:column;gap:10px}
.csr-card-list li{font-size:13px;font-family:var(--font-body);font-weight:400;color:var(--text-secondary);line-height:1.6;padding-left:16px;position:relative}
.csr-card-list li::before{content:'';position:absolute;left:0;top:8px;width:6px;height:6px;border-radius:50%}
```

### 步骤 2：在 HTML 中插入 CSR section

**文件：** `OwnProduct_light.html`\
**位置：** 在 `</section>`（工厂区域闭合标签，行 367）之后、`<section id="search-cta"...>`（行 369）之前

```html
<section id="csr" class="section csr-section">
  <div class="section-inner">
    <div class="reveal" style="margin-bottom:48px">
      <span class="section-label">Commitment</span>
      <h2 class="section-title">Corporate Social<br/>Responsibility</h2>
      <p class="section-desc" style="margin-top:8px">Our dedication to ethical practices, environmental stewardship, and sustainable growth across every layer of our operations</p>
    </div>
    <div class="csr-grid" id="csrGrid"></div>
  </div>
</section>
```

### 步骤 3：在 JS ICONS 对象中添加 4 个新图标

**文件：** `OwnProduct_light.html`\
**位置：** 在 ICONS 对象中（`alertTriangle` 之后，行 \~416）

```javascript
envLeaf: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
laborPeople: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
ethicsShield: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
procureLink: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
```

### 步骤 4：添加 CSR 板块的 JS 渲染逻辑

**文件：** `OwnProduct_light.html`\
**位置：** 在 `initFactory()` IIFE 之后（约行 716）、`initOrigins()` 之前

```javascript
(function initCSR() {
  const grid = document.getElementById('csrGrid');
  const items = [
    {
      icon: ICONS.envLeaf,
      title: 'Environment',
      color: '#3d8b8b',
      bgColor: 'rgba(61,139,139,0.06)',
      list: [
        'Legal waste disposal & hazardous waste records',
        'Energy conservation for utilities',
        'Chemical & VOC control with leak prevention',
        'Waste & packaging recycling',
        'Carbon tracking & environmental certifications'
      ]
    },
    {
      icon: ICONS.laborPeople,
      title: 'Labor & Human Rights',
      color: '#5a8a6e',
      bgColor: 'rgba(90,138,110,0.06)',
      list: [
        'Standard contracts & regulated working hours',
        'Legal payroll, no child/forced labor',
        'PPE & occupational health care',
        'Anti-discrimination & staff complaint channel'
      ]
    },
    {
      icon: ICONS.ethicsShield,
      title: 'Ethics',
      color: '#6b7fa3',
      bgColor: 'rgba(107,127,163,0.06)',
      list: [
        'Anti-bribery & conflict of interest rules',
        'Controlled business hospitality',
        'Third-party due diligence & compliance training',
        'Confidential whistleblowing & compliance files'
      ]
    },
    {
      icon: ICONS.procureLink,
      title: 'Sustainable Procurement',
      color: '#8b7355',
      bgColor: 'rgba(139,115,85,0.06)',
      list: [
        'Supplier EHS qualification audit',
        'Periodic sustainable supplier reviews',
        'Eco-material & recyclable packaging priority',
        'Supply chain labor risk inspection'
      ]
    }
  ];

  items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = `csr-card reveal reveal-d${(i % 4) + 1}`;
    card.innerHTML = `
      <div class="csr-card-header">
        <div class="csr-card-icon" style="background:${item.bgColor};color:${item.color}">${item.icon}</div>
        <h3 class="csr-card-title">${item.title}</h3>
      </div>
      <div class="csr-card-image" style="background:${item.bgColor};border:1px dashed ${item.color}30">
        <span style="opacity:0.5">Image Placeholder</span>
      </div>
      <ul class="csr-card-list">
        ${item.list.map(text => `<li style="--dot-color:${item.color}">${text}</li>`).join('')}
      </ul>
    `;
    // Apply list dot color via inline style
    card.querySelectorAll('.csr-card-list li').forEach(li => {
      li.style.setProperty('--dot-color', item.color);
    });
    grid.appendChild(card);
    observer.observe(card);
  });

  // Set dot colors via a style tag
  const style = document.createElement('style');
  style.textContent = items.map(item =>
    `.csr-card-list li::before{background:${item.color}}`
  ).join('\n');
  document.head.appendChild(style);
})();
```

> 注意：由于 4 张卡片的列表圆点颜色不同，需要用 JS 动态注入一个 style 标签为每种颜色生成对应的 `::before` 规则。或者更简洁的方式：直接在每个 `<li>` 上用 inline style 的 CSS 变量控制 `::before` 的背景色。

***

## 配图占位区说明

当前 images/ 目录无可持续主题图片。CSS 中的 `.csr-card-image` 使用主题色浅底 + 虚线边框作为占位。后续添加真实图片时：

* 将 `.csr-card-image` 内的 `<span>` 替换为 `<img src="images/xxx.jpg" .../>`

* 或将 `background` 改为 `background-image: url(...)`

***

## 不在本次范围内

* 真实配图的提供/生成（仅做占位）

* 其他页面的修改

* 无障碍特性（暂不加入）

***

## 验证步骤

1. 启动 http-server 预览
2. 打开 OwnProduct\_light.html，确认：

   * 新 CSR section 出现在工厂照片墙之后、搜索 CTA 之前

   * 4 张卡片在桌面端横向等分排列

   * 每张卡片包含：图标（线性SVG）+ 标题 + 配图占位区 + 政策细则列表

   * 卡片 hover 时上移 + 阴影增强

   * 缩小窗口至平板/手机尺寸，确认响应式布局（2列 → 1列）

   * 滚动到 CSR 区域时，卡片依次淡入显示（reveal 动画）
3. 浏览器控制台无报错
4. 确认不影响页面其他功能（Hero 轮播、产品筛选、工厂照片墙等正常）

