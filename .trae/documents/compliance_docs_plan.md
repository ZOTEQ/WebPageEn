# Compliance & Documentation 模块改造方案

## 一、用户诉求
当前 `recommendations-section`（四张产品推荐卡片）整个删除，替换为与下方附图一致的**三个表格**，作为产品合规/文档信息板块。需遵守 [DESIGN.md](file:///D:/我的坚果云/My%20Documents/资料制作/英文官网2026/设计规范/DESIGN.md) 的设计体系。

## 二、现有上下文分析
- 修改位置：`ProductInfo.html` L2288–L2369（`<section class="recommendations-section">`）
- 现有标题已改为：`Compliance & Documentation` / `Regulatory Fairs`
- 当前实现是 4 张产品卡片（`.rec-grid` → 4 个 `.rec-card`）
- 附近章节 `.specs-section` 使用类似的 `specs-label / specs-title` 双标题范式，可作为一致性参考

## 三、数据结构（依据用户附图）

### 表 1 · **Legislatory Info**（5 行，双列）
| Item | Value |
|---|---|
| Kosher | Available |
| Halal Cert. | Available |
| REACH Registration | Yes |
| Food Grade | Yes |
| Feed Grade | Yes |

### 表 2 · **Transportation Info**（4 行，双列）
| Item | Value |
|---|---|
| Non Haz | Non |
| DG Class | 3 |
| Packing Group | Ⅲ |
| UN No. | 1985 |

### 表 3 · **Support Documents**（5 行，双列 + Action 按钮）
| File Name | Action |
|---|---|
| Halal Certificate | Download |
| Kosher Certificate | Download |
| Food Grade Statement | Download |
| Feed Grade Statement | Download |
| Non-GMO Statement | Download |

## 四、版式与排版建议（impeccable / awwwards / frontend-design 综合）

### 4.1 总体布局 — 2 列等宽 CSS Grid
- **Desktop（≥1024px）**：
  - 左列放 **Legislatory Info** + **Transportation Info**（纵向堆叠，共享同一视觉容器但内部独立标题）
  - 右列放 **Support Documents**
  - 两列等高对齐，顶部标题栏平齐
- **Tablet（768–1023px）**：保持 2 列，两列各自自适应，不再嵌套
- **Mobile（<768px）**：改单列，Legislatory → Transportation → Support Documents 依次堆叠

### 4.2 视觉风格（与 DESIGN.md 一致）
| Token | 用法 |
|---|---|
| `--bg-primary` / `--white` | 单元格背景（奇/偶轻微区分，不做强色纹） |
| `--bg-secondary` | 表头 / 分组 header 背景 |
| `--ocean` | 表名标题色、"Available/Yes/Non" 等状态色、Download 图标 |
| `--text-primary` | 单元格主文本 |
| `--text-secondary` | 右侧值/备注文字 |
| `--border-subtle` | 单元分隔线（1px，柔） |
| `Playfair Display` | 小节主标题（Legislatory Info / Transportation Info / Support Documents） |
| `Inter` | 表格正文 |
| `JetBrains Mono` | UN No./DG Class 等技术代码值 |
| `--space-unit` 体系 | `*2` 单元格 padding / `*4` 小组间距 / `*6` 大间距 |

### 4.3 表格设计（Awwwards 级别 "表格即设计语言"）
1. **不用原生 `<table>` 视觉** — 使用 `div` + Grid 实现 table-like 布局，便于自定义圆角、阴影、hover 动效
2. **头部行**：背景 `--bg-secondary`，文字 `--text-primary` 加粗；左边缘加 3px `--ocean` 竖向强调条（与 specs-section 的视觉语言呼应）
3. **数据行**：
   - 每行 1px `--border-subtle` 底线分隔（不用竖线，更现代）
   - `:hover` 背景变 `var(--white)` + 轻微 `box-shadow`（深度 4px）
   - 奇数行用极浅灰 `rgba(61,139,139,0.03)` 做微妙分节
4. **状态胶囊（Legislatory / Transportation 的 Value 列）**：
   - "Available / Yes" → 青底白字 pill（`--ocean`）
   - "Non" → 橙底白字 pill（`--accent`）
   - 数字/代码（DG Class `3`、Packing Group `Ⅲ`、UN No. `1985`）→ 使用 `JetBrains Mono`，右侧对齐
5. **Support Documents 的 Action 列**：
   - 每条显示一个圆角按钮样式（白底 + `--ocean` 文字 + 下载 SVG 图标）
   - hover 时按钮变为 `--ocean` 底白字，并有 0.3s ease-out 过渡
   - 右对齐，保持与左列 File Name 的视觉平衡

### 4.4 标题层级
- **区块大标题**：沿用既有 `.rec-header` 的结构（`rec-label = "Regulatory Fairs"` 上标大写 + 两侧细横线；`rec-title = "Compliance & Documentation"` Playfair Display 主标题）
- **子表小标题**：
  - Left column 内：`Legislatory Info` / `Transportation Info` 各成一个 `h3`（字号 `--text-2xl`，Playfair，左对齐，下方 1px `--border-subtle` 细分隔线）
  - Right column 内：`Support Documents` 同样风格

### 4.5 容器设计细节
- 左右两大容器各自独立圆角卡片（`border-radius: 20px`）+ `1px --border-subtle` + `box-shadow: 0 4px 24px rgba(0,0,0,0.04)`
- 内部 padding：上下 `calc(var(--space-unit) * 6)`，左右 `calc(var(--space-unit) * 5)`
- 卡片 hover 无整体位移，仅内部行动效（避免大段内容抖动）

### 4.6 响应式断点
- `≥1024px`: `grid-template-columns: 1fr 1fr; gap: calc(var(--space-unit) * 6)`
- `768–1023px`: 同上，但卡片 padding 降至 `*4`
- `<768px`: `grid-template-columns: 1fr`，每个表格独立成块；单元格中「标签 + 值」改垂直对齐而非水平两列

### 4.7 可访问性
- 语义上仍使用 `<table>` / `<thead>` / `<tbody>` + `scope="col"` / `scope="row"`，视觉层通过 CSS 覆盖
- Download 链接带 `aria-label="Download {filename}"`
- 颜色对比：正文满足 4.5:1；按钮文字 ≥4.5:1

## 五、需要修改的文件
- **主文件**：[ProductInfo.html](file:///D:/我的坚果云/My%20Documents/资料制作/英文官网2026/ProductInfo.html#L2288-L2369)
  - 删除 L2295–L2367 的 `<div class="rec-grid">...</div>`（4 张卡片）
  - 在 L2294 位置替换为新 HTML：`<div class="compliance-grid">` + 左/右两容器 + 3 个子表
- **样式**（新增，写入 ProductInfo.html 末尾 `<style>` 区块的 recommendations 之后，或紧接在 `.rec-grid` 之后替换）：
  - `.compliance-grid` — 主容器 grid
  - `.compliance-card` — 左右两张大圆角卡
  - `.compliance-subtitle` — 子表 h3
  - `.compliance-table` — 子表内部 table/grid
  - `.compliance-row` — 数据行 + hover
  - `.compliance-row.head` — 表头行
  - `.status-pill` / `.status-pill.ok` / `.status-pill.warn` — 值状态胶囊
  - `.btn-download` — Download 按钮
  - 3 个媒体查询断点（见 4.6）

## 六、实施步骤
1. 先删除旧 `.rec-grid` 四张卡片块
2. 在原位置插入 `.compliance-grid` HTML（左右两列，左含 2 表、右含 1 表）
3. 在同文件 `<style>` 块中添加上述样式，并同步更新 `<768px` / `768–1023px` 媒体查询
4. 视审：查看表格是否与 specs-section 视觉语言连贯；标题字体、青色点缀、间距 scale 一致
5. 交付前跑一次对比度自检

## 七、潜在风险 & 对策
- **风险 1**：新表格高度可能比原 4 卡片大，CTA 区段视觉上偏长。  
  → 对策：把卡片内部 padding 控制在 `space-unit * 4–6` 之间，不额外加大外层 section padding
- **风险 2**：移动端单列后表格变窄可能出现折行不优雅。  
  → 对策：移动端下 table-like 两列改用"标签在上 + 值在下"的块模式，宽度始终 100%
- **风险 3**：Download 链接无真实文件，用户未来可能要接入真实 PDF。  
  → 对策：`href="#"` 占位并加 `data-filename` 属性，便于后续替换
