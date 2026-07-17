# CSS/JS 分离重构计划

## 目标

将所有HTML文件中的内联CSS和JS代码分离出来，统一放到指定目录下，实现代码结构清晰化。

## 现状分析

### 当前项目结构

```
英文官网2026/
├── components/          # 已有：nav/footer组件
│   ├── nav.css
│   ├── nav.js
│   ├── footer.css
│   └── footer.js
├── index.html           # 内含大量<style>和<script>
├── Contact.html
├── ProductSearch_UI.html
├── ProductInfo.html
├── OwnProduct_light.html
└── FacilityInfo.html
```

### 各文件CSS/JS情况

| 文件                     | CSS行数   | JS行数   | 备注             |
| ---------------------- | ------- | ------ | -------------- |
| index.html             | \~3000行 | \~500行 | 最大文件           |
| FacilityInfo.html      | \~1595行 | \~72行  | <br />         |
| ProductInfo.html       | \~1114行 | \~400行 | <br />         |
| OwnProduct\_light.html | \~792行  | \~238行 | <br />         |
| Contact.html           | \~外链CSS | \~外链JS | 使用nav/footer组件 |

***

## 目标目录结构

```
英文官网2026/
├── styles/              # 新建：统一存放CSS
│   ├── index.css
│   ├── contact.css
│   ├── product-search.css
│   ├── product-info.css
│   ├── own-product.css
│   └── facility-info.css
│
├── scripts/             # 新建：统一存放JS
│   ├── index.js
│   ├── contact.js
│   ├── product-search.js
│   ├── product-info.js
│   ├── own-product.js
│   └── facility-info.js
│
├── components/          # 已有：nav/footer组件
│   ├── nav.css
│   ├── nav.js
│   ├── footer.css
│   └── footer.js
│
├── index.html           # 简化后的HTML
├── Contact.html
├── ProductSearch_UI.html
├── ProductInfo.html
├── OwnProduct_light.html
└── FacilityInfo.html
```

***

## 实施步骤

### 步骤1：创建目录结构

* 创建 `styles/` 目录

* 创建 `scripts/` 目录

### 步骤2：提取各文件CSS到styles/

1. 从 index.html 提取 `<style>` 内容 → `styles/index.css`
2. 从 Contact.html 提取内联style → `styles/contact.css`
3. 从 ProductSearch\_UI.html 提取 → `styles/product-search.css`
4. 从 ProductInfo.html 提取 → `styles/product-info.css`
5. 从 OwnProduct\_light.html 提取 → `styles/own-product.css`
6. 从 FacilityInfo.html 提取 → `styles/facility-info.css`

### 步骤3：提取各文件JS到scripts/

1. 从 index.html 提取 `<script>` 内容 → `scripts/index.js`
2. 从 ProductSearch\_UI.html 提取 → `scripts/product-search.js`
3. 从 ProductInfo.html 提取 → `scripts/product-info.js`
4. 从 OwnProduct\_light.html 提取 → `scripts/own-product.js`
5. 从 FacilityInfo.html 提取 → `scripts/facility-info.js`

### 步骤4：更新HTML文件引用

对每个HTML文件：

1. 删除 `<style>` 标签，添加 `<link rel="stylesheet" href="styles/xxx.css">`
2. 删除内联 `<script>` 标签，添加 `<script src="scripts/xxx.js"></script>`
3. 保留外部组件引用（nav.js, footer.js）

### 步骤5：更新dev-server.js

确保服务器正确服务新的styles和scripts目录

### 步骤6：测试验证

* 启动服务器

* 访问各页面验证样式和功能正常

***

## 涉及文件

| 操作     | 文件                                                                                                            |
| ------ | ------------------------------------------------------------------------------------------------------------- |
| 新建CSS  | styles/index.css, contact.css, product-search.css, product-info.css, own-product.css, facility-info.css       |
| 新建JS   | scripts/index.js, contact.js, product-search.js, product-info.js, own-product.js, facility-info.js            |
| 修改HTML | index.html, Contact.html, ProductSearch\_UI.html, ProductInfo.html, OwnProduct\_light.html, FacilityInfo.html |
| 修改配置   | JS-tests/dev-server.js                                                                                        |

***

## 注意事项

1. 保持DESIGN.md中的设计规范不变
2. 分离后确保所有样式和功能与原来一致
3. 备份所有原始HTML文件后再进行修改
4. ProductSearch\_UI.html（深色页面）保持原有深色主题

