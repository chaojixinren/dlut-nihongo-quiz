<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { loadQuestionBank, getQuestionById } from '../services/quizEngine'
import { db } from '../db/database'
import { useActiveCategory, loadActiveCategory } from '../services/categoryStore'
import type { QuestionStats } from '../types/question'

const router = useRouter()
const activeCategory = useActiveCategory()
const wrongItems = ref<{ questionId: string; stats: QuestionStats; stem: string; group: string }[]>([])
const filter = ref<'all' | 'recent' | 'most-wrong'>('all')

async function refreshList() {
  const cat = activeCategory.value
  const all = await loadQuestionBank(cat)
  const validIds = new Set(all.map(q => q.id))

  const allStats = await db.questionStats.toArray()
  const wrong = allStats.filter(s => s.wrongCount > 0 && validIds.has(s.questionId))
  wrongItems.value = wrong.map(s => {
    const q = getQuestionById(s.questionId)
    return { questionId: s.questionId, stats: s, stem: q?.stem || '', group: q?.groupTitle || '' }
  })
}

onMounted(async () => {
  await loadActiveCategory()
  await refreshList()
})

watch(activeCategory, () => { refreshList() })

const filteredItems = computed(() => {
  let items = [...wrongItems.value]
  if (filter.value === 'most-wrong') items.sort((a, b) => b.stats.wrongCount - a.stats.wrongCount)
  if (filter.value === 'recent') items.sort((a, b) => new Date(b.stats.lastAttemptAt).getTime() - new Date(a.stats.lastAttemptAt).getTime())
  return items
})

function goReview(ids: string[]) {
  router.push({ path: '/quiz', query: { ids: ids.join(',') } })
}

async function clearWrong(questionId: string) {
  await db.questionStats.update(questionId, { wrongCount: 0, masteryLevel: 3 })
  await refreshList()
}
</script>
<template>
  <div class="wrong-page">
    <h1>错题本</h1>
    <div class="toolbar">
      <div class="filters">
        <button :class="{ active: filter === 'all' }" @click="filter = 'all'">全部</button>
        <button :class="{ active: filter === 'recent' }" @click="filter = 'recent'">最近</button>
        <button :class="{ active: filter === 'most-wrong' }" @click="filter = 'most-wrong'">最多错</button>
      </div>
      <button class="btn-primary" @click="goReview(filteredItems.map(i => i.questionId))" :disabled="filteredItems.length === 0">
        一键重刷全部错题
      </button>
    </div>
    <div v-if="filteredItems.length === 0" class="empty"><p>暂无错题，继续保持！</p></div>
    <div class="wrong-list">
      <div v-for="item in filteredItems" :key="item.questionId" class="wrong-item">
        <div class="wi-left">
          <span class="wi-id">{{ item.questionId }}</span>
          <span class="wi-stem">{{ item.stem.substring(0, 50) }}{{ item.stem.length > 50 ? '...' : '' }}</span>
          <span class="wi-group">{{ item.group }}</span>
        </div>
        <div class="wi-stats">
          <span class="badge wrong">错 {{ item.stats.wrongCount }} 次</span>
          <span class="badge rate">正确率 {{ item.stats.attemptCount ? Math.round(item.stats.correctCount / item.stats.attemptCount * 100) : 0 }}%</span>
          <span class="badge level">掌握 {{ '★'.repeat(item.stats.masteryLevel) }}</span>
        </div>
        <div class="wi-actions">
          <button @click="goReview([item.questionId])">刷这题</button>
          <button @click="clearWrong(item.questionId)">标记已掌握</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrong-page { max-width: 860px; margin: 0 auto; }
h1 { margin-bottom: 16px; }
.toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 12px; flex-wrap: wrap; }
.filters { display: flex; gap: 8px; }
.filters button { padding: 8px 16px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-card); color: var(--text-secondary); cursor: pointer; font-size: 14px; transition: all .2s; }
.filters button.active { background: var(--accent); color: #fff; border-color: var(--accent); }
.btn-primary { padding: 10px 20px; border-radius: 8px; border: none; background: var(--accent); color: #fff; cursor: pointer; font-size: 14px; }
.btn-primary:disabled { opacity: .4; }
.empty { text-align: center; padding: 60px 20px; color: var(--text-secondary); }
.wrong-list { display: flex; flex-direction: column; gap: 10px; }
.wrong-item { display: flex; align-items: center; gap: 12px; padding: 14px 18px; background: var(--bg-card); border-radius: 10px; flex-wrap: wrap; }
.wi-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 200px; }
.wi-id { font-weight: 700; color: var(--accent); font-size: 13px; }
.wi-stem { font-size: 14px; color: var(--text-primary); }
.wi-group { font-size: 12px; color: var(--text-muted); }
.wi-stats { display: flex; gap: 6px; }
.badge { padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
.badge.wrong { background: rgba(239,68,68,.1); color: #ef4444; }
.badge.rate { background: rgba(245,158,11,.1); color: #f59e0b; }
.badge.level { background: rgba(99,102,241,.1); color: #6366f1; }
.wi-actions { display: flex; gap: 6px; }
.wi-actions button { padding: 6px 14px; border-radius: 6px; border: 1px solid var(--border); background: transparent; color: var(--text-secondary); cursor: pointer; font-size: 13px; transition: all .2s; }
.wi-actions button:hover { background: var(--bg-hover); border-color: var(--accent); }
</style>
