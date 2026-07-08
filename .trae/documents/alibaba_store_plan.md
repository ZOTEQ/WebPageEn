# Alibaba Store 模块修改计划

## 一、需求理解

用户要求修改 `FacilityInfo.html` 中的 "Our Alibaba Store" 模块，采用**方案二（沉浸式大图风格）**，并包含完整的8个特点功能列表。

### 修改目标
- 将原有的两栏布局改为全屏沉浸式大图布局
- 保留并展示8个特点功能列表
- 添加统计数据展示（星级、好评率、交易量）
- 设计现代化的视觉效果

---

## 二、代码库分析

### 当前状态
- 文件：`FacilityInfo.html`（约1366行）
- 目标模块：`alibaba-section`（第1336行开始）
- 当前布局：两栏布局（左侧图片 + 右侧文字）

### 修改范围
1. **HTML结构**：第1336-1366行，替换原有的 alibaba-content 为 alibaba-hero 布局
2. **CSS样式**：第806-940行，添加沉浸式大图相关样式

---

## 三、修改计划

### 步骤1：备份文件
- 将当前 `FacilityInfo.html` 备份到 `backups/FacilityInfo.html.bak`

### 步骤2：修改HTML结构
```html
<!-- 替换为沉浸式布局 -->
<section class="alibaba-section">
    <div class="alibaba-hero">
        <img src="images/Home_OfficeBuilding_1920x1280.jpg" class="hero-image">
        <div class="hero-overlay">
            <div class="hero-content">
                <!-- 徽章、标题、描述 -->
                <!-- 统计数据（星级、好评率、交易量） -->
                <!-- 8个特点列表 -->
                <!-- CTA按钮 -->
            </div>
        </div>
    </div>
</section>
```

### 步骤3：添加CSS样式
- `.alibaba-hero`：全屏定位、最小高度70vh
- `.hero-image`：绝对定位、铺满容器、object-fit: cover
- `.hero-overlay`：渐变遮罩（从上到下 30%→70% 透明度）
- `.hero-content`：居中布局、白色文字
- `.hero-features`：4×2网格、毛玻璃效果
- `.btn-white`：白色背景按钮

---

## 四、特点功能列表

| 序号 | 特点名称 | 图标 |
|------|----------|------|
| 1 | Premium Quality | ✅ 勾选图标 |
| 2 | Reliable Service | 🛡️ 盾牌图标 |
| 3 | Professional Team | ✅ 勾选图标 |
| 4 | Certified Products | 📄 文件图标 |
| 5 | Diverse Range | 🎯 目标图标 |
| 6 | Ample Stock | 📦 箱子图标 |
| 7 | Fast Delivery | ⚡ 闪电图标 |
| 8 | Customizable | ✨ 加号图标 |

---

## 五、风险与依赖

### 依赖
- 本地图片文件：`images/Home_OfficeBuilding_1920x1280.jpg`

### 风险
- CSS样式冲突：需确保新样式不影响其他模块
- 响应式适配：需测试移动端显示效果

### 解决方案
- 使用独立的 CSS 类名（如 `.hero-image` 而非 `.alibaba-image`）
- 添加媒体查询确保移动端适配

---

## 六、文件清单

| 文件 | 类型 | 修改 |
|------|------|------|
| `FacilityInfo.html` | HTML/CSS | 修改 |
| `backups/FacilityInfo.html.bak` | 备份 | 创建 |

---

## 七、执行步骤

1. ✅ 已完成：分析需求和代码库
2. 待执行：备份文件
3. 待执行：修改HTML结构
4. 待执行：添加CSS样式
5. 待执行：通知用户完成

---

*计划完成后需要用户确认才能执行修改。*