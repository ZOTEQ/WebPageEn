# Molecular Formula容器内容布局修改计划

## 需求分析

根据用户反馈，Molecular Formula容器内的内容需要修改为：
- **桌面端（全屏）**：Molecular Formula 和 Molecular Weight 并排放置（水平排列）
- **移动端（响应式）**：两个项目上下放置（垂直排列）

## 修改方案

### 修改文件
- `ProductInfo.html` - 修改`.formula-grid`的CSS样式

### 修改步骤

1. **桌面端布局**：
   - 将`.formula-grid`的flex方向改为`row`（横向排列）
   - 设置两个项目之间的间距

2. **响应式布局**：
   - 在媒体查询中，将`.formula-grid`的flex方向改回`column`（垂直排列）

### 风险考虑
- 确保桌面端并排显示时内容不会溢出
- 确保响应式断点设置合理

## 预期效果

- 桌面端：两个分子式信息并排显示，充分利用水平空间
- 移动端：两个分子式信息垂直堆叠，适应小屏幕显示