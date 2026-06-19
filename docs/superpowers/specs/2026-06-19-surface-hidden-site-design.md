# 表站/里站 设计文档

## 概述

在现有 Vue/Vite 静态题库应用中引入"表站（表面）"和"里站（暗阁）"的双层结构。部分题库和知识点讲解隐藏于里站，通过仪式性操作进入。全静态，不接数据库，不接后端。

## 设计决策汇总

| 维度 | 表站 | 里站 |
|---|---|---|
| 可见性 | 公开，导航直接进入 | 长按 5 秒触发，导航不显示入口 |
| 背景色 | `#faf8f4` (暖白纸) | `#3a3530` (暖墨灰) |
| 卡片底色 | `#fff` | `#4a4038` (深木色) |
| 卡片边框 | `#e0dcd0` (浅灰) | `#6a5a48` (暖棕) |
| 正文色 | `#2c2c2c` (深黑) | `#e8e0d0` (暖米白) |
| 二级文字 | `#888` | `#a09888` |
| 强调色 | 朱砂红 (不变) | 朱砂红 (不变) |
| 字体 | 宋/明体 + 系统无衬线 (不变) | 宋/明体 + 系统无衬线 (不变) |
| 状态存储 | — | `sessionStorage` (刷新即失) |

## 内容划分

### 表站（公开）
- 学习通题库 (`question-bank.json`, groups g01–g10)
- 词汇选择题 (`word-question-bank.json`)
- 首页、答题、错题本、分析、设置

### 里站（隐藏）
- 核心语法整理 (现有 grammar-notes.md，原 `/grammar-notes` 路由移除)
- 2024 年期末真题 (`japanese-2024-question-bank.json`, 80 题)
- 2021 年期末真题 (scripts/add-2021-exam.cjs, g11, 80 题)
- 未来扩展：复习笔记资料、新增题库套卷

## 入口机制

### 触发位置
页面底部版权文字区域（稍高于移动端安全区）。

### 触发方式
- 桌面：鼠标长按 (mousedown → 5s → mouseup)
- 移动端：手指长按 (touchstart → 5s → touchend)
- 手指移动超过 10px 视为取消，防止滚动误触

### 进度反馈
长按区域出现微弱墨色进度环，5 秒走满。

### 进入动画
CSS 过渡：`body::before` 伪元素从四角向中心渐变，2 秒内页面背景从纸白浸为墨色。动画结束后路由切换到 `/#/hidden`。

## 退出机制

- 里站每页底部固定「合上」按钮
- 点击触发退出动画（墨色退回，1.5 秒），路由回到 `/home`
- 清除 `sessionStorage` 中的解锁状态

## 路由

```
表站（不变）:
  / → LandingPage
  /home → HomePage
  /quiz → QuizPage
  /wrong → WrongBookPage
  /analysis → AnalysisPage
  /settings → SettingsPage

里站（唯一入口）:
  /hidden → HiddenPortal.vue
    ├── Tab: 核心语法 (嵌入原 GrammarNotesPage 内容)
    ├── Tab: 2024 年真题
    ├── Tab: 2021 年真题
    └── (Tab 可扩展)
```

- 移除 `/grammar-notes` 路由，内容迁入 HiddenPortal
- 表站导航中不出现任何里站路由引用

## 核心模块

### `useHiddenSite` composable (`src/composables/useHiddenSite.ts`)

```ts
isUnlocked: Ref<boolean>        // 里站是否解锁
unlockProgress: Ref<number>      // 长按进度 0–100
unlocking: Ref<boolean>          // 进入动画播放中
toggle(): void                   // 进入/退出
startLongPress(): void           // 开始长按计时
cancelLongPress(): void          // 取消长按
```

状态读写在 `sessionStorage`（key: `hidden-unlocked`），刷新即消失。

### CSS 变量切换

在 `<body>` 上设置 `data-site="hidden"` 属性来切换整套颜色变量。所有组件通过 `var(--bg-page)` 等引用颜色，无需逐个修改组件样式。

### HiddenPortal 组件

承载里站所有内容的面板页。内部用 tab 切换不同隐藏模块。每个 tab 的内容区域复用现有题库组件（QuestionCard 等）或嵌入独立内容区域。

## 移动端适配

- 长按触发区域不小于 44×44px（符合触摸目标最小尺寸）
- 触发文案距底部 24px，高于 iOS home indicator
- 书架式网格：移动端 2 列，平板/桌面 3 列
- 「合上」按钮高度 48px，移动端友好
- 触摸事件与滚动事件互斥处理（10px 移动阈值）

## 数据流

```
用户长按 5s → startLongPress() → 进度环更新 → unlockProgress = 100
→ unlocking = true → 墨色动画 → isUnlocked = true → router.push('/hidden')
→ HiddenPortal 渲染 → tab 切换加载不同内容面板
→ 用户点击「合上」→ toggle() → 退出动画 → router.push('/home') → sessionStorage 清除
```

## 可扩展性

- 新增隐藏题库：在 HiddenPortal 内新增 tab，指向新的题库数据源
- 新增复习笔记：同上，tab + markdown raw import
- 门槛升级：未来如需要，可将 `useHiddenSite` 的 `startLongPress` 替换为密码输入等机制，接口不变

## 不变项

- 现有的 Dexie 存储逻辑不变
- 现有的 QuestionCard / QuizPage / 错题本 / 分析页不变
- 现有的 markdown → JSON 数据管道不变
- 现有的墨彩 v2.0 设计语言的基础变量体系不变
