<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { exportData, importData, clearAllData, getSetting, setSetting } from '../db/database'
import { loadQuestionBank } from '../services/quizEngine'

const darkMode = ref(false)
const grammarCount = ref(0)
const wordCount = ref(0)
const statusMsg = ref('')
const confirmClear = ref(false)

onMounted(async () => {
  darkMode.value = await getSetting('darkMode', false)
  applyTheme()
  const g = await loadQuestionBank('grammar')
  const w = await loadQuestionBank('word')
  grammarCount.value = g.length
  wordCount.value = w.length
})

function applyTheme() {
  document.documentElement.setAttribute('data-theme', darkMode.value ? 'dark' : 'light')
}

async function toggleDark() {
  darkMode.value = !darkMode.value
  await setSetting('darkMode', darkMode.value)
  applyTheme()
}

async function handleExport() {
  const data = await exportData()
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `japanese-quiz-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
  statusMsg.value = '✅ 导出成功'
  setTimeout(() => statusMsg.value = '', 2000)
}

function handleImport() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return
    const text = await file.text()
    try {
      await importData(text)
      statusMsg.value = '✅ 导入成功'
    } catch {
      statusMsg.value = '❌ 导入失败，请检查文件格式'
    }
    setTimeout(() => statusMsg.value = '', 3000)
  }
  input.click()
}

async function handleClear() {
  if (!confirmClear.value) {
    confirmClear.value = true
    setTimeout(() => confirmClear.value = false, 5000)
    return
  }
  await clearAllData()
  confirmClear.value = false
  statusMsg.value = '✅ 数据已清空'
  setTimeout(() => statusMsg.value = '', 2000)
}
</script>
<template>
  <div class="settings-page">
    <h1>⚙️ 设置</h1>

    <div class="section">
      <h2>题库信息</h2>
      <div class="info-row"><span>语法题</span><span>{{ grammarCount }} 题</span></div>
      <div class="info-row"><span>单词题</span><span>{{ wordCount }} 题</span></div>
      <div class="info-row"><span>合计</span><span>{{ grammarCount + wordCount }} 题</span></div>
      <div class="info-row"><span>版本</span><span>v1.1</span></div>
    </div>

    <div class="section">
      <h2>外观</h2>
      <div class="toggle-row" @click="toggleDark">
        <span>深色模式</span>
        <span class="toggle" :class="{ on: darkMode }">{{ darkMode ? '🌙' : '☀️' }}</span>
      </div>
    </div>

    <div class="section">
      <h2>数据管理</h2>
      <div class="action-row">
        <button @click="handleExport">📥 导出备份</button>
        <button @click="handleImport">📤 导入备份</button>
      </div>
      <div class="action-row danger-row">
        <button class="danger" @click="handleClear">
          {{ confirmClear ? '⚠️ 再次点击确认清空' : '🗑 清空所有数据' }}
        </button>
      </div>
      <p v-if="statusMsg" class="status">{{ statusMsg }}</p>
    </div>

    <div class="section">
      <h2>快捷键</h2>
      <div class="shortcut-list">
        <div class="shortcut"><kbd>A/B/C/D</kbd><span>选择选项</span></div>
        <div class="shortcut"><kbd>Enter</kbd><span>提交 / 下一题</span></div>
        <div class="shortcut"><kbd>N</kbd><span>下一题</span></div>
      </div>
    </div>

    <div class="section">
      <router-link to="/">← 返回首页</router-link>
    </div>
  </div>
</template>
<style scoped>
.settings-page { max-width: 600px; margin: 0 auto; }
h1 { margin-bottom: 24px; }
.section { margin-bottom: 24px; padding: 16px; background: var(--bg-card); border-radius: 10px; }
.section h2 { font-size: 16px; margin-bottom: 12px; color: var(--text-primary); }
.info-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; color: var(--text-secondary); }
.toggle-row { display: flex; justify-content: space-between; align-items: center; cursor: pointer; padding: 8px 0; font-size: 14px; }
.toggle { font-size: 22px; transition: transform .3s; }
.toggle.on { transform: rotate(360deg); }
.action-row { display: flex; gap: 10px; margin-bottom: 10px; }
.action-row button { padding: 10px 20px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg); color: var(--text-primary); cursor: pointer; font-size: 14px; transition: all .2s; }
.action-row button:hover { background: var(--bg-hover); border-color: var(--accent); }
button.danger { background: rgba(239,68,68,.1); color: #ef4444; border-color: #ef4444; }
button.danger:hover { background: #ef4444; color: #fff; }
.status { font-size: 14px; color: var(--accent); margin-top: 8px; }
.shortcut-list { display: flex; flex-direction: column; gap: 6px; }
.shortcut { display: flex; align-items: center; gap: 12px; font-size: 14px; }
.shortcut kbd {
  padding: 3px 8px; background: var(--bg-hover); border-radius: 4px; font-family: monospace;
  font-size: 12px; border: 1px solid var(--border); min-width: 60px; text-align: center;
}
.shortcut span { color: var(--text-secondary); }
a { color: var(--accent); text-decoration: none; font-size: 14px; }
</style>
