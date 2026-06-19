# 设计语言规范 · Design Language

> 墨彩 (Sumi-sai) — Japanese Ink on Paper  
> 版本: v2.0 · 最后更新: 2026-06-19

---

## 一、设计哲学

**一句话**: 墨色为主，朱红点睛。像一本精心排印的日本教科书，不是花哨的网页应用。

核心原则：

| 原则 | 含义 |
|---|---|
| **墨色为主** | 全站以墨黑/暖白/灰色构建，色彩克制 |
| **朱红点睛** | 每页仅一处使用朱红强调色，标记最关键的交互 |
| **直边直角** | 所有元素 border-radius 为 0，像印刷品，不像网页 |
| **1px 细线** | 分隔用 1px 实线，无阴影、无渐变、无发光 |
| **无 emoji** | 全站 UI 文案不出现任何 emoji |
| **字体即层次** | 衬线体 = 标题/数字，黑体 = 正文，等宽 = 代号 |

---

## 二、色彩令牌

### 浅色模式

```
--bg:           #fafaf5   暖白纸色（页面背景）
--bg-card:      #ffffff   纯白（卡片/表格背景）
--bg-hover:     #f4f3ed   微暖灰（hover 态）
--text-primary: #1a1a18   墨黑（主文字）
--text-secondary: #6b6b66  中灰（辅助文字）
--text-muted:   #969690   浅灰（不重要文字）
--border:       #e2e0da   淡墨线（边框分隔）
--accent:       #c44536   朱红（主强调色，每页慎用）
--accent-hover: #a3382b   深朱红（hover 态）
--correct:      #2d6a4f   墨绿（答对）
--wrong:        #c44536   朱红（答错，同 accent）
--warning:      #b8860b   赭色（警告/待巩固）
```

### 暗色模式

```
--accent:       #d4836e   柔和朱红（暗色下提亮）
--bg:           #1a1a18   墨纸
--bg-card:      #242421   墨纸卡片
--bg-hover:     #2e2e2a
--text-primary: #e8e7e3
--text-secondary: #a0a09a
--text-muted:   #6b6b64
--border:       #3a3a34
```

### 朱红使用规则（重要）

- **允许**: 页面主标题的数字、主操作按钮（每页最多 1 个）、题号 ID、选中态左边框
- **禁止**: 用作装饰色、大面积背景、图标填充、次要按钮、标签底色

---

## 三、字体系统

三级体系，不可混用：

```
--font-display: 'Noto Serif SC', 'Songti SC', 'SimSun', serif;
--font-body:    'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
--font-mono:    'JetBrains Mono', 'SF Mono', 'Consolas', monospace;
```

| 令牌 | 字号 | 字重 | 用途 |
|---|---|---|---|
| `font-display` | 80px | 700 | 刷题完成页正确率百分比 |
| `font-display` | 28-30px | 600 | 统计卡片数值 |
| `font-display` | 22px | 700 | 页面主标题 (h1) |
| `font-display` | 15px | 600 | 区块小标题 (h2) |
| `font-body` | 16px | 400 | 全局默认正文 |
| `font-body` | 15px | 400 | 选项文字、表格内容 |
| `font-body` | 14px | 400 | 按钮文字 |
| `font-body` | 13px | 400 | 辅助文字、标签 |
| `font-body` | 12px | 400 | 提示、说明 |
| `font-mono` | 13px | 600 | 题号、ID |
| `font-mono` | 12px | 600 | 选项按键 (A/B/C/D)、快捷键 kbd |

---

## 四、几何规则

### 圆角
- 所有元素 **border-radius: 0**（默认）
- 滚动条 thumb: 0
- 标记小方块的 legend dot: 2px

### 边框
- 卡片、按钮、选项、输入框: `1px solid var(--border)`
- 表格表头底线: `2px solid var(--border)`
- 选项选中/正确/错误: `border-left: 3px solid` + 对应颜色

### 阴影
- 全站 **无 box-shadow**
- 全站 **无渐变**

---

## 五、组件模式

### 按钮

```css
/* 主操作（每页最多 1 个）*/
.btn-accent { background: var(--accent); color: #fff; border: 1px solid var(--accent); }

/* 次要操作（默认）*/
.btn-outline { background: transparent; color: var(--text-primary); border: 1px solid var(--border); }
.btn-outline:hover { border-color: var(--accent); color: var(--accent); }

/* 危险操作 */
.btn-outline.danger { color: var(--wrong); border-color: rgba(196,69,54,.3); }
.btn-outline.danger:hover { background: #fdf5f4; }

/* 小按钮 */
.btn-sm { padding: 5px 12px; font-size: 12px; }
```

- 标准 padding: `10px 22px`
- 小号 padding: `5px 12px`
- hover 过渡: `transition: all .12s`
- disabled: `opacity: .35; cursor: not-allowed`

### 统计卡片
- 1px 边框，纯白背景
- 数值用 `font-display`，28-30px，`color: var(--accent)`
- 标签用 `font-body`，13px，`color: var(--text-secondary)`
- 无彩色左边框（v1 有，v2 已移除）

### 题目卡片
- 1px 边框，无圆角，padding: 28px
- 题号用 `font-mono`，朱红色
- 题干用 `font-body`，18px
- 选项用左边框 3px 变化表示状态:
  - 默认: transparent border
  - hover/选中: var(--accent) border
  - 正确: var(--correct) border + 浅绿底
  - 错误: var(--wrong) border + 浅红底
  - 遗漏(多选): var(--warning) dashed border

### 表格
- 无圆角，`border-collapse: collapse`
- 表头底线 2px，行底线 1px
- 数值颜色: 绿(>=70%) / 黄(>=40%) / 红(<40%)

### 标签徽章
- 1px transparent 边框，hover 才显示
- 默认 `bg-hover` 底色，hover 变朱红

---

## 六、布局规范

- 页面最大宽度: `1100px`（App.vue main）
- 内容区最大宽度: 各页面自定（560-900px）
- 页面主 padding: `32px 24px`
- 移动端 padding: `20px 16px`
- 区块间距 (section): `32px`
- 卡片 padding: `16px 20px`
- 需大面积留白，不可挤压内容

### 响应式断点

```css
@media (max-width: 640px) { /* 导航缩小、间距收紧 */ }
/* 更小屏幕由 App.vue 导航的 overflow-x: auto 处理 */
```

---

## 七、交互规范

### 过渡
- 所有颜色/边框变化: `transition: all .12s` 或 `.15s`
- 页面切换: opacity + translateY(4px)，150ms
- 进度条: `transition: width .3s ease`
- 掌握度条分段: `transition: flex .4s ease`

### 键盘快捷键
- 刷题页全局键盘监听
- A/B/C/D 选择选项，Enter 提交/下一题，N 下一题
- 快捷键提示用 `<kbd>` 元素，font-mono，1px 边框

### 状态反馈
- 加载中: 居中文字 "加载中..."
- 空数据: 居中文字，text-secondary 颜色
- 操作结果: 短暂状态文字，2-3 秒后消失

---

## 八、文案规范

- 全站使用中文，不用英文
- 无 emoji（`✅❌🎉📖🎲🔄🆕🎯📊📝🚩🎖️📚🏛️⚙️📥📤🗑☀️🌙→`）全部替换为纯文字
- 正确/错误用文字标识，不用图标
- 按钮用动词: "提交答案"、"查看解析"、"标记已掌握"

---

## 九、文件结构约定

```
src/
├── style.css          # 全局令牌、重置、纹理（唯一全局样式）
├── App.vue            # 根布局 + 导航 + 页面过渡
├── components/        # 可复用组件（全部 <style scoped>）
│   ├── QuestionCard.vue
│   ├── ProgressBar.vue
│   ├── StatCard.vue
│   └── TagBadge.vue
├── pages/             # 路由页面（全部 <style scoped>）
│   ├── HomePage.vue
│   ├── QuizPage.vue
│   ├── WrongBookPage.vue
│   ├── AnalysisPage.vue
│   └── SettingsPage.vue
```

- 全局样式仅 `style.css` 一个文件
- 组件/页面一律使用 `<style scoped>`
- 所有 CSS 变量从 `style.css` 引用，不在组件内重新定义颜色
- 不引入第三方 CSS 框架

---

## 十、禁止事项 (Anti-patterns)

- 用 emoji 代替 UI 文案
- 圆角 > 4px
- box-shadow 或渐变
- 蓝紫色调（尤其 #6366f1、#818cf8 等 indigo 系）
- 大面积使用 accent 颜色（朱红是点缀，不是铺底色）
- 在组件内硬编码颜色值（用 `var(--xxx)` 引用令牌）
- 新增 CSS 变量而不更新本文档
- 引入第三方 CSS 库
- `<style>` 不带 `scoped`（除了 style.css）
- 按钮文字用 "点击这里" 等不明确表达
