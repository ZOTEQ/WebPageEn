
# 图标点击功能修复计划

## 问题分析

用户反馈"点击这个图标，没有办法进入产品详情页"。通过代码分析发现：

1. **当前状态**：
   - 产品卡片中的 `.product-card-icon`（首字母图标）只是一个普通的 div，没有点击事件
   - 表格中的 `.ingredient-icon` 同样没有点击事件
   - 只有底部的 `.view-btn` 和 `.product-card-btn` 按钮有 onclick 事件调用 `viewProduct()` 函数

2. **测试结果**：Playwright 测试只验证了按钮点击，未测试图标点击

## 修复方案

### 1. 修改产品卡片模板
在 `renderCards()` 函数中，为 `.product-card-icon` 添加点击事件：
```javascript
<div class="product-card-icon" onclick="viewProduct('${product.name}')">${product.name.charAt(0).toUpperCase()}</div>
```

### 2. 修改表格模板
在 `renderTable()` 和 `filterTable()` 函数中，为 `.ingredient-icon` 添加点击事件：
```javascript
<div class="ingredient-icon" onclick="viewProduct('${product.name}')">${product.name.charAt(0).toUpperCase()}</div>
```

### 3. 添加 CSS 样式
为可点击的图标添加鼠标指针样式，提示用户可点击：
```css
.product-card-icon,
.ingredient-icon {
    cursor: pointer;
}
```

## 文件修改清单

| 文件 | 修改位置 | 修改内容 |
|------|----------|----------|
| `ProductSearch_UI.html` | renderCards() 函数 | 为 `.product-card-icon` 添加 onclick |
| `ProductSearch_UI.html` | renderTable() 函数 | 为 `.ingredient-icon` 添加 onclick |
| `ProductSearch_UI.html` | filterTable() 函数 | 为 `.ingredient-icon` 添加 onclick |
| `ProductSearch_UI.html` | CSS 样式 | 添加 cursor: pointer |

## 测试验证

修复完成后，运行 `test_visual_audit.js` 进行视觉审核，确保：
1. 图标点击能正确跳转到产品详情页
2. 页面布局和样式不受影响

## 风险评估

- 低风险：仅添加点击事件，不影响现有功能
- 需要确保图标上的点击事件不会与其他事件冲突
