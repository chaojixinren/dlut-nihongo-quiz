<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Question } from '../types/question'
import TagBadge from './TagBadge.vue'

const props = defineProps<{
  question: Question
  selectedKey: string
  submitted: boolean
  mode: string
  questionIndex: number
  totalQuestions: number
  bookmarked: boolean
}>()

const emit = defineEmits<{
  select: [key: string]
  submit: []
  next: []
  bookmark: []
}>()

const showExplanation = ref(false)

function handleSelect(key: string) {
  if (props.submitted) return
  if (props.question.multiAnswer) {
    const selected = new Set(props.selectedKey.split(''))
    if (selected.has(key)) selected.delete(key)
    else selected.add(key)
    emit('select', [...selected].sort().join(''))
  } else {
    emit('select', key)
  }
}

const optionLabels = ['A', 'B', 'C', 'D', 'E']

function isSelected(key: string) {
  return props.selectedKey.includes(key)
}
function isCorrectOption(key: string) {
  // Multi-answer: only highlight options the user got right (selected & correct).
  // Missed-correct options are flagged separately so the user can spot them.
  if (props.question.multiAnswer) {
    return props.submitted && props.question.answerKey.includes(key) && props.selectedKey.includes(key)
  }
  return props.submitted && key === props.question.answerKey
}
function isWrongOption(key: string) {
  if (props.question.multiAnswer) {
    return props.submitted && props.selectedKey.includes(key) && !props.question.answerKey.includes(key)
  }
  return props.submitted && props.selectedKey === key && key !== props.question.answerKey
}
function isMissedOption(key: string) {
  if (!props.question.multiAnswer) return false
  return props.submitted && props.question.answerKey.includes(key) && !props.selectedKey.includes(key)
}

const canSubmit = computed(() => props.selectedKey.length > 0)

const isCorrectOverall = computed(() => {
  if (props.question.multiAnswer) {
    const a = new Set(props.selectedKey.split(''))
    const b = new Set(props.question.answerKey.split(''))
    return a.size === b.size && [...a].every(x => b.has(x))
  }
  return props.selectedKey === props.question.answerKey
})

const subTypeLabel = computed(() => {
  if (props.question.questionType === 'multi') return '多选题'
  if (props.question.questionType === 'judgement') return '判断题'
  if (props.question.questionType === 'single') return '单选题'
  if (props.question.subType === 'kana-to-kanji') return '选汉字'
  if (props.question.subType === 'kanji-to-kana') return '选假名'
  return ''
})

const tagsSectionTitle = computed(() => props.question.category === 'word' ? '标签' : '考点')
</script>
<template>
  <div class="question-card">
    <div class="q-header">
      <span class="q-id">{{ question.id }}</span>
      <span class="q-group">{{ question.groupTitle }}</span>
      <span class="q-sub" v-if="subTypeLabel">{{ subTypeLabel }}</span>
      <span class="q-mode">{{ mode }}</span>
    </div>
    <div class="q-stem" v-text="question.stem" />
    <div class="q-hint" v-if="question.multiAnswer">（多选，请勾选所有正确选项）</div>
    <div class="q-options">
      <button
        v-for="(opt, i) in question.options" :key="opt.key"
        class="opt-btn"
        :class="{
          selected: isSelected(opt.key),
          correct: isCorrectOption(opt.key),
          wrong: isWrongOption(opt.key),
          missed: isMissedOption(opt.key),
          multi: !!question.multiAnswer,
        }"
        @click="handleSelect(opt.key)"
        :disabled="submitted"
      >
        <span class="opt-key">{{ optionLabels[i] }}</span>
        <span class="opt-text">{{ opt.text }}</span>
        <span v-if="isCorrectOption(opt.key)" class="opt-icon">✓</span>
        <span v-if="isWrongOption(opt.key)" class="opt-icon">✗</span>
        <span v-if="isMissedOption(opt.key)" class="opt-icon">·</span>
      </button>
    </div>
    <div class="q-actions" v-if="!submitted">
      <button class="btn btn-primary" :disabled="!canSubmit" @click="emit('submit')">
        提交答案
      </button>
    </div>
    <div class="q-actions" v-else>
      <button class="btn btn-primary" @click="emit('next')">
        {{ questionIndex >= totalQuestions - 1 ? '完成' : '下一题 →' }}
      </button>
      <button
        class="btn btn-ghost bookmark-btn"
        :class="{ 'bookmark-active': bookmarked }"
        @click="emit('bookmark')"
      >
        {{ bookmarked ? '★ 已收藏' : '☆ 收藏' }}
      </button>
      <button class="btn btn-ghost" @click="showExplanation = !showExplanation">
        {{ showExplanation ? '收起解析' : '查看解析' }}
      </button>
    </div>
    <div class="q-result" v-if="submitted">
      <div class="result-line" :class="isCorrectOverall ? 'correct' : 'wrong'">
        {{ isCorrectOverall ? '✅ 正确！' : '❌ 错误！' }}
        正确答案：<strong>{{ question.answerKey }}<span v-if="question.answerText">. {{ question.answerText }}</span></strong>
      </div>
    </div>
    <div class="q-explanation" v-if="submitted && showExplanation">
      <div class="exp-section" v-if="question.headword">
        <h4>词条</h4>
        <p>{{ question.headword }}</p>
      </div>
      <div class="exp-section" v-if="question.translation">
        <h4>中文翻译</h4>
        <p>{{ question.translation }}</p>
      </div>
      <div class="exp-section" v-if="question.tags.length > 0">
        <h4>{{ tagsSectionTitle }}</h4>
        <div class="tag-list">
          <TagBadge v-for="t in question.tags" :key="t" :tag="t" />
        </div>
      </div>
      <div class="exp-section">
        <h4>解析</h4>
        <div class="exp-text" v-html="question.explanation.replace(/\n/g, '<br>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.question-card {
  background: var(--bg-card); border-radius: 14px; padding: 24px; max-width: 720px; margin: 0 auto;
}
.q-header { display: flex; gap: 10px; margin-bottom: 16px; font-size: 13px; align-items: center; }
.q-id { color: var(--accent); font-weight: 700; }
.q-group { color: var(--text-secondary); }
.q-sub { padding: 2px 8px; border-radius: 6px; background: rgba(99,102,241,.1); color: #6366f1; font-size: 12px; }
.q-mode { color: var(--text-muted); margin-left: auto; }
.q-stem { font-size: 18px; line-height: 1.6; color: var(--text-primary); margin-bottom: 12px; }
.q-hint { font-size: 13px; color: var(--text-muted); margin-bottom: 16px; }
.q-options { display: flex; flex-direction: column; gap: 10px; }
.opt-btn {
  display: flex; align-items: center; gap: 12px; padding: 14px 18px;
  border: 2px solid var(--border); border-radius: 10px; background: var(--bg);
  cursor: pointer; transition: all .2s; text-align: left; font-size: 15px; color: var(--text-primary);
}
.opt-btn:hover:not(:disabled) { border-color: var(--accent); background: var(--bg-hover); }
.opt-btn.selected { border-color: var(--accent); background: rgba(99,102,241,.1); }
.opt-btn.correct { border-color: #22c55e; background: rgba(34,197,94,.1); }
.opt-btn.wrong { border-color: #ef4444; background: rgba(239,68,68,.1); }
.opt-btn.missed { border-color: #f59e0b; background: rgba(245,158,11,.1); border-style: dashed; }
.opt-key { width: 28px; height: 28px; border-radius: 50%; background: var(--bg-hover); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0; }
.opt-btn.multi .opt-key { border-radius: 6px; }
.opt-text { flex: 1; }
.opt-icon { font-weight: 700; font-size: 18px; }
.correct .opt-icon { color: #22c55e; }
.wrong .opt-icon { color: #ef4444; }
.missed .opt-icon { color: #f59e0b; font-size: 24px; }
.q-actions { display: flex; gap: 10px; margin-top: 20px; }
.btn { padding: 10px 22px; border-radius: 8px; border: none; cursor: pointer; font-size: 15px; transition: all .2s; }
.btn:disabled { opacity: .4; cursor: not-allowed; }
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:hover:not(:disabled) { filter: brightness(1.1); }
.btn-ghost { background: transparent; color: var(--text-secondary); border: 1px solid var(--border); }
.btn-ghost:hover { background: var(--bg-hover); }
.bookmark-btn.bookmark-active { color: #f59e0b; border-color: #f59e0b; background: rgba(245,158,11,.1); }
.bookmark-btn.bookmark-active:hover { background: rgba(245,158,11,.18); }
.q-result { margin-top: 16px; }
.result-line { font-size: 16px; padding: 10px 16px; border-radius: 8px; }
.result-line.correct { background: rgba(34,197,94,.1); color: #22c55e; }
.result-line.wrong { background: rgba(239,68,68,.1); color: #ef4444; }
.q-explanation { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); }
.exp-section { margin-bottom: 14px; }
.exp-section h4 { font-size: 14px; color: var(--accent); margin-bottom: 6px; }
.exp-text { font-size: 14px; color: var(--text-secondary); line-height: 1.7; max-height: 400px; overflow-y: auto; }
.tag-list { display: flex; flex-wrap: wrap; }
</style>
