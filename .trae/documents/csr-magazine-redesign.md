# CSR Section Redesign — 杂志式图文交替方案

## 概述

将当前平淡的 4 列等宽卡片网格，重新设计为**杂志编辑风格的图文交替布局**。4 大主题以纵向交错排列（奇数行左图右文，偶数行右图左文），每行是一个完整的视觉叙事单元，配合大号装饰数字、渐变强调线、滚动渐入动画，打造企业官网的高级编辑感。

## 当前状态

* 当前 CSR section 使用 4 列等宽白色卡片 + 灰色背景

* 每张卡片：图标 + 标题 + 16:9 虚线占位区 + 文字列表

* 视觉上是页面中最平淡的区域，缺乏设计感

* 配图区域为空白占位，无实际内容

## 设计方向

**杂志式图文交替 (Magazine Editorial Layout)**

* 每个主题占一个全宽行，图文左右交替

* 大号装饰数字（01/02/03/04）作为视觉锚点

* 渐变色块替代空白占位（后续可替换为真实图片）

* 滚动触发的错落渐入动画

* 统计数字计数器动画

***

## 详细设计

### 整体结构

```
┌─────────────────────────────────────────────────┐
│  Section Header: "Commitment" label + title      │
│  "Corporate Social Responsibility"               │
├─────────────────────────────────────────────────┤
│                                                   │
│  ┌──────────────┐  ┌──────────────────────────┐  │
│  │  [ 图片区域 ]  │  │  01  Environment         │  │
│  │  渐变色块     │  │  ── 渐变强调线 ──         │  │
│  │  + 图标       │  │  政策细则列表...           │  │
│  └──────────────┘  └──────────────────────────┘  │
│                                                   │
│  ┌──────────────────────────┐  ┌──────────────┐  │
│  │  02  Labor & Human Rights │  │  [ 图片区域 ] │  │
│  │  ── 渐变强调线 ──         │  │  渐变色块     │  │
│  │  政策细则列表...           │  │  + 图标       │  │
│  └──────────────────────────┘  └──────────────┘  │
│                                                   │
│  ┌──────────────┐  ┌──────────────────────────┐  │
│  │  [ 图片区域 ]  │  │  03  Ethics              │  │
│  │  渐变色块     │  │  ── 渐变强调线 ──         │  │
│  │  + 图标       │  │  政策细则列表...           │  │
│  └──────────────┘  └──────────────────────────┘  │
│                                                   │
│  ┌──────────────────────────┐  ┌──────────────┐  │
│  │  04  Sustainable Procure. │  │  [ 图片区域 ] │  │
│  │  ── 渐变强调线 ──         │  │  渐变色块     │  │
│  │  政策细则列表...           │  │  + 图标       │  │
│  └──────────────────────────┘  └──────────────┘  │
│                                                   │
├─────────────────────────────────────────────────┤
│  [统计数字栏] 100% · 50+ · 0 · 100%              │
└─────────────────────────────────────────────────┘
```

### 单行详细结构（以 Environment 为例）

```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│  ┌─ 图片区 (50%) ──────┐  ┌─ 内容区 (50%) ───────────┐ │
│  │                      │  │                            │ │
│  │  渐变背景色块         │  │  大号装饰数字 "01"          │ │
│  │  (teal 渐变)         │  │  (半透明，绝对定位在右上)    │ │
│  │                      │  │                            │ │
│  │  中央：线性图标       │  │  主题标题                   │ │
│  │  (48px, 白色)        │  │  Playfair Display 28px     │ │
│  │                      │  │                            │ │
│  │  底部：主题标签       │  │  渐变强调线 (80px, 3px)     │ │
│  │  "ENVIRONMENT"       │  │                            │ │
│  │  12px uppercase      │  │  政策细则列表 (4-5条)       │ │
│  │                      │  │  带彩色圆点标记             │ │
│  └──────────────────────┘  └────────────────────────────┘ │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 布局规格

| 属性  | 值                             |
| --- | ----------------------------- |
| 行布局 | CSS Grid, `1fr 1fr`, gap 48px |
| 行高  | 自适应内容，min-height 400px        |
| 图片区 | 渐变色块 + 中央图标 + 底部标签            |
| 内容区 | 装饰数字 + 标题 + 强调线 + 列表          |
| 行间距 | 64px                          |
| 响应式 | <768px 堆叠为单列（图在上，文在下）         |

### 配色方案（4 个主题）

| #  | 主题                      | 主色                | 渐变方向   | 图片区域渐变                                      |
| -- | ----------------------- | ----------------- | ------ | ------------------------------------------- |
| 01 | Environment             | `#3d8b8b` (ocean) | 135deg | `linear-gradient(135deg, #3d8b8b, #5aadad)` |
| 02 | Labor & Human Rights    | `#5a8a6e` (sage)  | 135deg | `linear-gradient(135deg, #5a8a6e, #7ab89a)` |
| 03 | Ethics                  | `#6b7fa3` (slate) | 135deg | `linear-gradient(135deg, #6b7fa3, #8ea3c4)` |
| 04 | Sustainable Procurement | `#8b7355` (stone) | 135deg | `linear-gradient(135deg, #8b7355, #b09470)` |

### 动画设计

| 元素    | 动画                                                       | 触发             | 时长        |
| ----- | -------------------------------------------------------- | -------------- | --------- |
| 图片区   | `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)`        | 滚动进入           | 0.8s expo |
| 内容区标题 | `translateY(20px)` + `opacity:0` → 正常                    | 滚动进入，延迟 0.2s   | 0.6s expo |
| 强调线   | `scaleX(0)` → `scaleX(1)`                                | 滚动进入，延迟 0.4s   | 0.5s expo |
| 列表项   | 逐条 `translateY(12px)` + `opacity:0` → 正常                 | 滚动进入，每条延迟 0.1s | 0.4s expo |
| 装饰数字  | `opacity:0` + `scale(0.8)` → `opacity:0.06` + `scale(1)` | 滚动进入           | 1s expo   |
| 图标    | 微妙的 `translateY(-4px)` hover                             | 鼠标悬停           | 0.3s      |
| 统计数字  | 从 0 计数到目标值                                               | 滚动进入           | 1.5s      |

### 统计数字栏（可选增强）

在 4 行内容下方添加一条统计数字栏：

* 4 个数字横向排列

* 每个数字：大号 Playfair Display + 小号说明文字

* 计数器动画（复用页面已有的 counter 逻辑）

数字内容（示例，需确认）：

* `100%` — Compliance Rate

* `50+` — Global Certifications

* `0` — Environmental Incidents

* `100%` — Ethical Sourcing

***

## 实施步骤

### 步骤 1：替换 CSR CSS

**文件：** `OwnProduct_light.html`
**操作：** 删除现有 `.csr-*` CSS 规则（行 201-216），替换为新的杂志式布局 CSS

新增 CSS 类：

* `.csr-section` — 背景色 `--bg-primary`（改为白色，与页面其他内容区一致）

* `.csr-row` — CSS Grid `1fr 1fr`，gap 48px，行间距 64px

* `.csr-row.reverse` — 偶数行反转（grid-direction: rtl + 子元素 direction: ltr）

* `.csr-visual` — 图片区域，相对定位，圆角，overflow hidden

* `.csr-visual-bg` — 渐变背景色块，绝对定位填满

* `.csr-visual-icon` — 中央线性图标，白色，48px

* `.csr-visual-label` — 底部主题标签，白色，uppercase

* `.csr-content` — 内容区域，flex column，justify center

* `.csr-number` — 大号装饰数字，Playfair Display，opacity 0.06

* `.csr-title` — 主题标题，Playfair Display 28px

* `.csr-accent-line` — 渐变强调线，80px 宽，3px 高

* `.csr-list` — 政策细则列表

* `.csr-list li` — 带彩色圆点的列表项

* `.csr-stats` — 统计数字栏，grid 4列

* 响应式断点：768px 以下堆叠

### 步骤 2：替换 CSR HTML 结构

**文件：** `OwnProduct_light.html`
**操作：** 替换现有 `<section id="csr">` 的内容（行 386-395）

新的 HTML 结构：

```html
<section id="csr" class="section csr-section">
  <div class="section-inner">
    <div class="reveal" style="margin-bottom:64px">
      <span class="section-label">Commitment</span>
      <h2 class="section-title">Corporate Social<br/>Responsibility</h2>
      <p class="section-desc" style="margin-top:8px">Our dedication to ethical practices, environmental stewardship, and sustainable growth</p>
    </div>
    <div id="csrContent"></div>
  </div>
</section>
```

### 步骤 3：替换 CSR JS 渲染逻辑

**文件：** `OwnProduct_light.html`
**操作：** 替换 `initCSR()` IIFE（行 749-815）

新的渲染逻辑：

* 定义 4 个主题数据（保留现有数据结构）

* 每个主题渲染为一个 `.csr-row`（奇数行正常，偶数行 `.reverse`）

* 每行包含 `.csr-visual`（渐变背景 + 图标 + 标签）和 `.csr-content`（装饰数字 + 标题 + 强调线 + 列表）

* 添加统计数字栏

* 对所有新元素调用 `observer.observe(el)` 启用滚动渐入

* 通过动态 `<style>` 注入每行的强调线渐变色和列表圆点色

### 步骤 4：补充 CSS clip-path 动画

**文件：** `OwnProduct_light.html`
**操作：** 在 `<style>` 中添加 clip-path reveal 动画

```css
.csr-visual{clip-path:inset(0 100% 0 0);transition:clip-path 0.8s var(--ease-out-expo)}
.csr-row.visible .csr-visual{clip-path:inset(0 0 0 0)}
```

这会在行进入视口时，图片区域从左到右"擦入"显示。

***

## 验证步骤

1. 启动 http-server 预览
2. 打开 OwnProduct\_light.html，滚动到 CSR 区域，确认：

   * 4 行内容以图文交替方式排列（左图右文 / 右图左文）

   * 图片区域使用渐变色块 + 图标 + 标签

   * 内容区有大号装饰数字、标题、渐变强调线、列表

   * 滚动进入时有 clip-path 擦入动画 + 内容渐入

   * 统计数字有计数器动画

   * 缩小窗口至手机尺寸，确认单列堆叠
3. 浏览器控制台无报错
4. 确认不影响页面其他功能

