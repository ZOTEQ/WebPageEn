# OwnProduct\_light.html 初始化方案

## 概述

修复 OwnProduct\_light.html 页面的关键问题：产品图片路径错误、CSS 变量与 DESIGN.MD 不一致、导航栏冲突残留代码，确保页面结构完整、视觉正常、与站点组件系统兼容。

## 当前状态分析

### 关键问题

1. **产品图片全部不可用** — 24款产品的 `image` 字段使用了 `/public/images/` 前缀，而项目实际图片目录为 `images/`；且引用的12个唯一文件名（如 `herbal-rosemary.jpg`）在磁盘上均不存在
2. **导航栏 CSS 冲突** — 已在上一轮初始化中部分清理，但需确认无残留
3. **CSS 变量不完整** — 缺少 `--radius-card`、`--radius-card-lg`、`--radius-pill` 等已在 DESIGN.MD 中定义的变量（但内联 CSS 中已手动定义了这些值）

### 已确认正常的部分

* Hero 轮播（4张图片均存在）

* 工厂设施照片墙（6张图片均存在）

* 公共组件加载（nav.js / footer.js 正常）

* `body class="force-dark-nav"` 主题设置正确

* 产品目录筛选/搜索/分页/弹窗逻辑正常

***

## 实施步骤

### 步骤 1：修正产品图片路径前缀

**文件：** `OwnProduct_light.html`

**操作：** 将 PRODUCTS 数组中所有 `image` 字段的 `/public/images/` 前缀替换为 `images/`

**变更范围：** 24个产品的 `image` 字段（第420-445行区域）

```
image:'/public/images/herbal-rosemary.jpg'  →  image:'images/herbal-rosemary.jpg'
```

**原因：** 项目图片目录在根目录 `images/` 下，非 `/public/images/`。修正后至少让已存在的图片能正确加载。

***

### 步骤 2：产品图片优雅降级

**文件：** `OwnProduct_light.html`

**操作：** 为产品卡片和产品弹窗的 `<img>` 添加 `onerror` 降级处理

#### 2a. 产品卡片（prod-grid 区域）

在 `prodGrid.innerHTML` 渲染时，给 `<img>` 添加 `onerror` 属性：

```html
<img src="${p.image}" alt="${p.name}" class="prod-img" loading="lazy" 
     onerror="this.style.display='none';this.parentElement.classList.add('img-fallback')" />
```

#### 2b. 新增降级样式

在 `<style>` 中添加：

```css
.prod-card.img-fallback{background:linear-gradient(135deg,rgba(61,139,139,0.08),rgba(224,122,95,0.08));display:flex;align-items:center;justify-content:center}
.prod-card.img-fallback::after{content:attr(data-name);position:relative;z-index:2;font-family:var(--font-heading);font-size:18px;font-weight:500;color:var(--text-secondary);text-align:center;padding:24px}
.prod-card.img-fallback .prod-overlay,.prod-card.img-fallback .prod-badge{display:none}
```

#### 2c. 产品弹窗（modal）

弹窗中 `modal-img` 也添加 onerror 降级，显示产品名代替图片。

***

### 步骤 3：确认导航栏冲突已完全清理

**文件：** `OwnProduct_light.html`

**操作：** 审查 `<style>` 中是否还残留任何 `.navbar`、`.navbar-inner`、`.navbar-logo`、`.navbar-links`、`.navbar-toggle`、`.mobile-menu` 相关规则。如有残留，替换为注释 `/* Navbar styles handled by components/nav.css */`

***

### 步骤 4：CSS 变量对齐 DESIGN.MD

**文件：** `OwnProduct_light.html`

**操作：** 对照 DESIGN.MD，确认 `:root` 中的变量定义完整且值正确。

**需要确认/补充的变量：**

| 变量                  | DESIGN.MD 值                | 当前状态 |
| ------------------- | -------------------------- | ---- |
| `--accent`          | #e07a5f                    | ✅ 已有 |
| `--accent-light`    | #f2a285                    | ✅ 已有 |
| `--accent-dark`     | #c4604a                    | ✅ 已有 |
| `--ocean`           | #3d8b8b                    | ✅ 已有 |
| `--ocean-light`     | #5aadad                    | ✅ 已有 |
| `--sand`            | #d4a574                    | ✅ 已有 |
| `--text-primary`    | #2d2d2d                    | ✅ 已有 |
| `--text-secondary`  | #5a5a5a                    | ✅ 已有 |
| `--text-tertiary`   | #8a8a8a                    | ✅ 已有 |
| `--white`           | #ffffff                    | ✅ 已有 |
| `--bg-primary`      | #fafafa                    | ✅ 已有 |
| `--bg-secondary`    | #f5f5f5                    | ✅ 已有 |
| `--bg-dark`         | #1a1a1a                    | ✅ 已有 |
| `--radius-card`     | 16px                       | ✅ 已有 |
| `--radius-card-lg`  | 20px                       | ✅ 已有 |
| `--radius-pill`     | 100px                      | ✅ 已有 |
| `--ease-out-expo`   | cubic-bezier(0.16,1,0.3,1) | ✅ 已有 |
| `--ease-out-cubic`  | cubic-bezier(0.4,0,0.2,1)  | ✅ 已有 |
| `--shadow-sm/md/lg` | 三级阴影                       | ✅ 已有 |
| `--font-heading`    | Playfair Display           | ✅ 已有 |
| `--font-body`       | Inter                      | ✅ 已有 |
| `--font-mono`       | JetBrains Mono             | ✅ 已有 |
| `--space-unit`      | 8px                        | ✅ 已有 |

**结论：** CSS 变量已基本完整，无需额外补充。仅需确认没有遗漏。

***

## 不在本次范围内

* 无障碍特性（skip link、ARIA、键盘导航）— 用户决定暂不加入

* 其他子页面（FacilityInfo、Contact）的 CSS 变量统一 — 用户决定只处理 OwnProduct\_light

* 真实产品图片的提供/替换 — 路径修正后等待用户提供

***

## 验证步骤

1. 启动 `http-server` 预览
2. 打开 `OwnProduct_light.html`，确认：

   * Hero 轮播正常（4张图片）

   * 产品目录网格中，图片不存在的产品显示优雅降级样式（分类色渐变背景 + 产品名）

   * 分类筛选、搜索、分页功能正常

   * 点击产品卡片弹窗正常显示

   * 工厂设施照片墙正常（6张图片）

   * 底部搜索 CTA 正常跳转

   * 导航栏（深色主题）滚动后变为白色背景

   * 页脚正常显示
3. 浏览器控制台无报错
4. 检查响应式：缩小窗口确认移动端布局正常

