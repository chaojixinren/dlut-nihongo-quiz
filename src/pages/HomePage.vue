<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { loadQuestionBank, getAllTags } from '../services/quizEngine'
import { getWeakTags, getMasterySummary, getWrongQuestionIds, getUntouchedQuestionIds } from '../services/reviewScheduler'
import { db } from '../db/database'
import { loadActiveSession, clearActiveSession, isSessionInProgress, type ActiveSession } from '../services/sessionResume'
import { useActiveCategory, loadActiveCategory } from '../services/categoryStore'
import StatCard from '../components/StatCard.vue'
import TagBadge from '../components/TagBadge.vue'
import type { Recommendation } from '../services/reviewScheduler'
import type { Question } from '../types/question'

const router = useRouter()
const activeCategory = useActiveCategory()
const questions = ref<Question[]>([])
const totalQuestions = ref(0)
const doneCount = ref(0)
const totalAttempts = ref(0)
const totalCorrect = ref(0)
const wrongCount = ref(0)
const recentCorrectRate = ref(0)
const weakTags = ref<Recommendation[]>([])
const mastery = ref({ mastered: 0, learning: 0, weak: 0, untouched: 0 })
const wrongIds = ref<string[]>([])
const untouchedIds = ref<string[]>([])
const activeSession = ref<ActiveSession | null>(null)

async function refresh() {
  const cat = activeCategory.value
  const all = await loadQuestionBank(cat)
  questions.value = all
  totalQuestions.value = all.length

  const validIds = new Set(all.map(q => q.id))
  const stats = await db.questionStats.toArray()
  const relevant = stats.filter(s => validIds.has(s.questionId))

  doneCount.value = relevant.filter(s => s.attemptCount > 0).length
  totalAttempts.value = relevant.reduce((sum, s) => sum + s.attemptCount, 0)
  totalCorrect.value = relevant.reduce((sum, s) => sum + s.correctCount, 0)
  wrongCount.value = relevant.filter(s => s.wrongCount > 0).length

  const recentAll = await db.attempts.orderBy('id').reverse().limit(100).toArray()
  const recent = recentAll.filter(a => validIds.has(a.questionId)).slice(0, 30)
  recentCorrectRate.value = recent.length > 0
    ? Math.round((recent.filter(a => a.isCorrect).length / recent.length) * 100)
    : 0

  weakTags.value = await getWeakTags(cat)
  mastery.value = await getMasterySummary(cat)
  wrongIds.value = await getWrongQuestionIds(cat)
  untouchedIds.value = await getUntouchedQuestionIds(cat)

  const saved = await loadActiveSession()
  activeSession.value = isSessionInProgress(saved) ? saved : null
  if (saved && !isSessionInProgress(saved)) await clearActiveSession()
}

onMounted(async () => {
  await loadActiveCategory()
  await refresh()
})

watch(activeCategory, () => { refresh() })

function startQuiz(mode: string) {
  const params: Record<string, string> = { mode }
  if (mode === 'wrong' && wrongIds.value.length > 0) {
    params.ids = wrongIds.value.join(',')
  } else if (mode === 'untouched' && untouchedIds.value.length > 0) {
    params.ids = untouchedIds.value.join(',')
  }
  router.push({ path: '/quiz', query: params })
}

function startTagQuiz(tag: string) {
  router.push({ path: '/quiz', query: { tag } })
}

function resumeSession() {
  router.push({ path: '/quiz', query: { resume: '1' } })
}

async function discardSession() {
  await clearActiveSession()
  activeSession.value = null
}

const titleText = computed(() => activeCategory.value === 'word' ? '📖 日语单词题库' : '📚 日语期末复习题库')
const subtitleText = computed(() => activeCategory.value === 'word'
  ? `${totalQuestions.value}题 · 第26-36课 · 汉字 ↔ 假名`
  : `${totalQuestions.value}题 · 8大题组 · 智能复习系统`)
const tagSectionTitle = computed(() => activeCategory.value === 'word' ? '按课/标签复习' : '按语法标签复习')
const weakSectionTitle = computed(() => activeCategory.value === 'word' ? '📊 薄弱课/标签（优先复习）' : '📊 薄弱语法点（优先复习）')
</script>
<template>
  <div class="home">
    <h1>{{ titleText }}</h1>
    <p class="subtitle">{{ subtitleText }}</p>

    <div v-if="activeSession" class="resume-banner">
      <div class="resume-info">
        <span class="resume-title">📌 继续上次</span>
        <span class="resume-meta">第 {{ (activeSession.submitted ? activeSession.currentIndex + 1 : activeSession.currentIndex) + 1 }}/{{ activeSession.totalQuestions }} 题 · 模式：{{ activeSession.mode }}</span>
      </div>
      <div class="resume-actions">
        <button class="resume-btn primary" @click="resumeSession">继续</button>
        <button class="resume-btn ghost" @click="discardSession">放弃</button>
      </div>
    </div>

    <div class="stats-row">
      <StatCard label="今日推荐" :value="Math.max(5, wrongIds.length)" color="#f59e0b" sub="优先复习错题" />
      <StatCard label="总进度" :value="`${doneCount}/${totalQuestions}`" color="#6366f1" sub="已做题 / 总题数" />
      <StatCard label="总正确率" :value="totalAttempts ? Math.round(totalCorrect / totalAttempts * 100) + '%' : '--'" color="#22c55e" />
      <StatCard label="最近正确率" :value="doneCount ? recentCorrectRate + '%' : '--'" color="#3b82f6" sub="近30题" />
      <StatCard label="错题数" :value="wrongCount" color="#ef4444" sub="有待重刷" />
    </div>

    <div class="section">
      <h2>掌握程度</h2>
      <div class="mastery-bar">
        <div class="seg mastered" :style="{ flex: mastery.mastered }" title="已掌握">{{ mastery.mastered }}</div>
        <div class="seg learning" :style="{ flex: mastery.learning }" title="学习中">{{ mastery.learning }}</div>
        <div class="seg weak" :style="{ flex: mastery.weak }" title="薄弱">{{ mastery.weak }}</div>
        <div class="seg untouched" :style="{ flex: mastery.untouched }" title="未做">{{ mastery.untouched }}</div>
      </div>
      <div class="mastery-legend">
        <span>🟢 已掌握</span><span>🔵 学习中</span><span>🟡 薄弱</span><span>⚪ 未做</span>
      </div>
    </div>

    <div class="section">
      <h2>快速开始</h2>
      <div class="quick-actions">
        <button class="action-btn primary" @click="startQuiz('sequential')">📖 顺序刷题</button>
        <button class="action-btn" @click="startQuiz('random')">🎲 随机刷题</button>
        <button class="action-btn" @click="startQuiz('untouched')" v-if="untouchedIds.length > 0">🆕 未做题 ({{ untouchedIds.length }})</button>
        <button class="action-btn danger" @click="startQuiz('wrong')" v-if="wrongIds.length > 0">🔄 错题重刷 ({{ wrongIds.length }})</button>
        <button class="action-btn" @click="startQuiz('weakness')">🎯 弱点突破</button>
      </div>
    </div>

    <div class="section" v-if="weakTags.length > 0">
      <h2>{{ weakSectionTitle }}</h2>
      <div class="weak-list">
        <div v-for="w in weakTags.slice(0, 6)" :key="w.tag" class="weak-item" @click="startTagQuiz(w.tag)">
          <div class="weak-info">
            <span class="weak-tag">{{ w.tag }}</span>
            <span class="weak-rate">正确率 {{ w.correctRate }}%</span>
          </div>
          <div class="weak-bar-bg"><div class="weak-bar" :style="{ width: w.correctRate + '%', background: w.correctRate < 50 ? '#ef4444' : w.correctRate < 70 ? '#f59e0b' : '#22c55e' }" /></div>
          <span class="weak-arrow">→</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>{{ tagSectionTitle }}</h2>
      <div class="tag-cloud">
        <TagBadge v-for="t in getAllTags(activeCategory).slice(0, 20)" :key="t.tag" :tag="t.tag" :clickable="true" @click="startTagQuiz(t.tag)" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.home { max-width: 880px; margin: 0 auto; }
h1 { font-size: 26px; margin-bottom: 4px; }
.subtitle { color: var(--text-secondary); margin-bottom: 24px; }
.resume-banner { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 18px; margin-bottom: 20px; border-radius: 12px; background: rgba(99,102,241,.1); border: 1px solid var(--accent); }
.resume-info { display: flex; flex-direction: column; gap: 4px; }
.resume-title { font-weight: 700; color: var(--accent); font-size: 15px; }
.resume-meta { font-size: 13px; color: var(--text-secondary); }
.resume-actions { display: flex; gap: 8px; }
.resume-btn { padding: 8px 18px; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all .2s; }
.resume-btn.primary { background: var(--accent); color: #fff; border: none; }
.resume-btn.primary:hover { filter: brightness(1.1); }
.resume-btn.ghost { background: transparent; color: var(--text-secondary); border: 1px solid var(--border); }
.resume-btn.ghost:hover { background: var(--bg-hover); }
.stats-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }
.section { margin-bottom: 28px; }
.section h2 { font-size: 18px; margin-bottom: 12px; color: var(--text-primary); }
.mastery-bar { display: flex; height: 32px; border-radius: 8px; overflow: hidden; margin-bottom: 8px; }
.mastery-bar .seg { display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; color: #fff; min-width: 0; transition: flex .3s; }
.mastered { background: #22c55e; } .learning { background: #3b82f6; } .weak { background: #f59e0b; } .untouched { background: #d4d4d8; }
.mastery-legend { display: flex; gap: 16px; font-size: 13px; color: var(--text-secondary); }
.quick-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.action-btn { padding: 12px 24px; border-radius: 10px; border: 2px solid var(--border); background: var(--bg-card); color: var(--text-primary); font-size: 15px; cursor: pointer; transition: all .2s; }
.action-btn:hover { border-color: var(--accent); }
.action-btn.primary { background: var(--accent); color: #fff; border-color: var(--accent); }
.action-btn.danger { background: #ef4444; color: #fff; border-color: #ef4444; }
.weak-list { display: flex; flex-direction: column; gap: 8px; }
.weak-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: var(--bg-card); border-radius: 8px; cursor: pointer; transition: all .2s; }
.weak-item:hover { background: var(--bg-hover); }
.weak-info { min-width: 140px; display: flex; flex-direction: column; }
.weak-tag { font-weight: 600; font-size: 14px; }
.weak-rate { font-size: 12px; color: var(--text-muted); }
.weak-bar-bg { flex: 1; height: 6px; background: var(--bg-hover); border-radius: 3px; overflow: hidden; }
.weak-bar { height: 100%; border-radius: 3px; transition: width .3s; }
.weak-arrow { color: var(--text-muted); }
.tag-cloud { display: flex; flex-wrap: wrap; gap: 4px; }
</style>
