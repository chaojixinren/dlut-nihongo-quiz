<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { marked } from 'marked'
import markedKatex from 'marked-katex-extension'
import rawNotes from '../content/calculus-notes.md?raw'
import GrammarToc from '../components/GrammarToc.vue'
import 'katex/dist/katex.min.css'

marked.use(markedKatex({ throwOnError: false, nonStandard: true }))

interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

const html = ref<string>('')
const toc = ref<TocItem[]>([])
const activeId = ref<string>('')
const mobileLesson = ref<string>('')
const mobileLessons = ref<TocItem[]>([])

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[\s.·、，,:：()（）「」]/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function buildToc(markdown: string): TocItem[] {
  const items: TocItem[] = []
  const lines = markdown.split('\n')
  const seen = new Set<string>()
  for (const line of lines) {
    if (line.startsWith('>')) continue
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line)
    if (!m) continue
    const level = m[1].length as 2 | 3
    const text = m[2].replace(/#+$/, '').trim()
    let id = slugify(text)
    let n = 2
    while (seen.has(id)) {
      id = `${slugify(text)}-${n++}`
    }
    seen.add(id)
    items.push({ id, text, level })
  }
  return items
}

function renderMarkdown(markdown: string): string {
  const raw = marked.parse(markdown, { async: false }) as string
  return raw.replace(/<(h[23])>([^<]+)<\/\1>/g, (_full, tag, text) => {
    const id = slugify(text)
    return `<${tag} id="${id}">${text}</${tag}>`
  })
}

let observer: IntersectionObserver | null = null

function setupObserver() {
  if (observer) observer.disconnect()
  const headings = document.querySelectorAll<HTMLElement>(
    '.grammar-content h2[id], .grammar-content h3[id]',
  )
  if (headings.length === 0) return
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible.length > 0) {
        const id = visible[0].target.getAttribute('id') || ''
        if (id) activeId.value = id
      }
    },
    {
      rootMargin: '-80px 0px -65% 0px',
      threshold: 0,
    },
  )
  headings.forEach((h) => observer!.observe(h))
}

function navigateTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 60
  window.scrollTo({ top, behavior: 'smooth' })
  activeId.value = id
}

function selectMobileLesson(id: string) {
  mobileLesson.value = id
  nextTick(() => navigateTo(id))
}

function onScroll() {
  if (window.scrollY < 60 && toc.value.length > 0) {
    activeId.value = toc.value[0].id
  }
}

onMounted(() => {
  html.value = renderMarkdown(rawNotes)
  toc.value = buildToc(rawNotes)
  mobileLessons.value = toc.value.filter((t) => t.level === 2)
  if (toc.value.length > 0) {
    activeId.value = toc.value[0].id
    mobileLesson.value = toc.value[0].id
  }
  nextTick(() => {
    setupObserver()
    window.addEventListener('scroll', onScroll, { passive: true })
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  window.removeEventListener('scroll', onScroll)
})

const subtitle = computed(() => {
  const lessons = mobileLessons.value.length
  const total = toc.value.length
  return `${lessons} 课 · 共 ${total} 个知识点 · 滚动阅读，点击目录跳转`
})
</script>
<template>
  <div class="grammar-page">
    <header class="grammar-header">
      <div class="title-row">
        <h1>微积分2 · 核心笔记</h1>
        <span class="meta-chip">第 1–18 课</span>
      </div>
      <p class="subtitle">{{ subtitle }}</p>
    </header>

    <div class="mobile-lesson-switcher">
      <label for="lesson-select">跳转到</label>
      <select
        id="lesson-select"
        :value="mobileLesson"
        @change="selectMobileLesson(($event.target as HTMLSelectElement).value)"
      >
        <option v-for="l in mobileLessons" :key="l.id" :value="l.id">{{ l.text }}</option>
      </select>
    </div>

    <div class="grammar-body">
      <aside class="grammar-side">
        <GrammarToc :items="toc" :active-id="activeId" @navigate="navigateTo" />
      </aside>
      <article class="grammar-content markdown-body" v-html="html" />
    </div>

    <div class="grammar-footer-actions">
      <button class="btn btn-outline" @click="navigateTo(toc[0]?.id || '')">回到顶部</button>
    </div>
  </div>
</template>
<style scoped>
.grammar-page {
  max-width: 1100px;
  margin: 0 auto;
}
.grammar-header {
  margin-bottom: 24px;
}
.title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
h1 {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 1px;
}
.meta-chip {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 2px 8px;
  letter-spacing: 0.5px;
}
.subtitle {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.mobile-lesson-switcher {
  display: none;
  margin-bottom: 16px;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--text-secondary);
}
.mobile-lesson-switcher select {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 14px;
}

.grammar-body {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 32px;
  align-items: start;
}
.grammar-side {
  position: sticky;
  top: 60px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  align-self: start;
}
.grammar-content {
  min-width: 0;
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 28px 32px;
}

.grammar-footer-actions {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

@media (max-width: 959px) {
  .grammar-body {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .grammar-content {
    padding: 18px 16px;
  }
  .mobile-lesson-switcher {
    display: flex;
  }
}
</style>
