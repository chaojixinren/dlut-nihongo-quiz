# 贡献指南

感谢你对 dlut-nihongo-quiz 的兴趣！本文档介绍如何参与贡献。

## 🐛 报告 Bug / 提建议

请通过 [GitHub Issues](https://github.com/tianxingleo/dlut-nihongo-quiz/issues/new/choose) 提交。

提交前请：

1. 搜索现有 Issue，避免重复
2. 使用对应的模板（Bug Report 或 Feature Request）
3. 提供尽可能详细的信息（环境、复现步骤、截图）

## 📝 添加 / 修改题目

题库的 single source of truth 是 Markdown 文件。

### 语法题

1. 编辑 `data/raw/日语期末复习题目答案解析_题目选项在上版.md`
2. 题目格式：

   ```markdown
   ### 第N题

   [题目正文]

   A. 选项A
   B. 选项B
   C. 选项C
   D. 选项D

   答案：B

   解析：[详细解析]
   ```

3. 运行 `npm run parse:grammar`
4. 检查 `data/processed/validation-report.json` 是否有报错
5. 提交：`git add data/raw public/question-bank.json data/processed/validation-report.json`

### 单词题

类似流程，编辑 `data/raw/日语汉字单词选择题-第XX-YY课.md`，运行 `npm run parse:words`。

## 💻 开发流程

```bash
# 1. Fork & clone
git clone https://github.com/<your-name>/dlut-nihongo-quiz.git
cd dlut-nihongo-quiz

# 2. 安装依赖（需 Node.js 18+）
npm install

# 3. 启动 dev server
npm run dev

# 4. 改代码、加题目...

# 5. 本地构建验证
npm run build

# 6. 提交（参考下方 Commit 规范）
git add ...
git commit -m "..."

# 7. Push 并发起 PR
git push origin my-feature-branch
```

## 🎨 代码风格

- TypeScript + Vue 3 `<script setup>`
- 2 空格缩进
- 单引号字符串
- 文件末尾保留空行

`.editorconfig` 已配置，主流编辑器会自动识别。

## 📤 Commit 规范

参考 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)：

| 前缀 | 用途 |
|---|---|
| `feat:` | 新功能（`feat: add fill-in-blank mode`） |
| `fix:` | Bug 修复（`fix: wrong analysis chart on empty history`） |
| `docs:` | 文档（`docs: update README screenshots`） |
| `refactor:` | 重构 |
| `chore:` | 杂项 |
| `content:` | 题库内容变更（`content: add grammar questions for lesson 30`） |

## 🚦 PR 流程

1. 从 `main` 拉新分支
2. 改完跑一遍 `npm run build` 确保不破坏构建
3. 填写 PR 模板
4. 等待 CI 通过 + review

## 📜 行为准则

参与本项目即代表你同意遵守 [Code of Conduct](CODE_OF_CONDUCT.md)。请在交流中保持友善和尊重。
