# Molecular Formula容器毛玻璃效果修改计划

## 需求分析

根据用户反馈，Molecular Formula容器需要修改为：
- **毛玻璃效果优化**：背景更透明（降低不透明度）
- **间距规范**：使用设计规范中的间距单位（`--space-unit: 8px`）设置容器与图片三边的距离

## 修改方案

### 修改文件
- `ProductInfo.html` - 修改`.molecular-formula-container`的CSS样式

### 修改步骤

1. **优化毛玻璃效果**：
   - 将背景不透明度从0.92降低到0.75，增强透明感
   - 保持backdrop-filter模糊效果

2. **规范间距**：
   - 使用`--space-unit`变量设置底部距离（如`calc(var(--space-unit) * 6)`）
   - 设置左右边距（如`calc(var(--space-unit) * 5)`）

### 风险考虑
- 确保容器内容在透明背景上依然清晰可读
- 确保间距在响应式布局下保持一致

## 预期效果

容器将具有更明显的毛玻璃透明效果，同时与图片边界保持规范的间距。