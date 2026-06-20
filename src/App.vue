<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useActiveCategory, loadActiveCategory, setActiveCategory } from './services/categoryStore'
import { getQuestionById } from './services/quizEngine'
import { CATEGORIES } from './config/categories'
import { useHiddenSite } from './composables/useHiddenSite'
import type { Category } from './types/question'
import SearchOverlay from './components/SearchOverlay.vue'

const router = useRouter()
const route = useRoute()
const routeKey = ref(0)
const activeCategory = useActiveCategory()
const searchOpen = ref(false)
const mobileMenuOpen = ref(false)

const { isUnlocked, unlockProgress, startLongPress, cancelLongPress, lock } = useHiddenSite()

function exitHidden() {
  lock()
}

// Long press handlers — both touch and mouse
let pressStartX = 0
let pressStartY = 0
function onPressStart(e: MouseEvent | TouchEvent) {
  if (e instanceof MouseEvent) {
    pressStartX = e.clientX
    pressStartY = e.clientY
  } else {
    const t = e.touches[0]
    pressStartX = t.clientX
    pressStartY = t.clientY
  }
  startLongPress()
}
function onPressMove(e: MouseEvent | TouchEvent) {
  let x: number, y: number
  if (e instanceof MouseEvent) {
    x = e.clientX
    y = e.clientY
  } else {
    x = e.touches[0].clientX
    y = e.touches[0].clientY
  }
  if (Math.abs(x - pressStartX) > 10 || Math.abs(y - pressStartY) > 10) {
    cancelLongPress()
  }
}
function onPressEnd() {
  if (unlockProgress.value < 100) {
    cancelLongPress()
  }
}

const navLinks = [
  { to: '/', label: '首页' },
  { to: '/home', label: '仪表盘' },
  { to: '/quiz', label: '刷题' },
  { to: '/wrong', label: '错题本' },
  { to: '/analysis', label: '分析' },
  { to: '/settings', label: '设置' },
] as const

onMounted(async () => {
  await loadActiveCategory()
})

function navigateTo(path: string) {
  mobileMenuOpen.value = false
  if (route.path === path) {
    routeKey.value++
  }
  router.push(path)
}

function switchCategory(cat: Category) {
  mobileMenuOpen.value = false
  if (cat !== activeCategory.value) {
    setActiveCategory(cat)
  }
  if (route.path === '/home') {
    routeKey.value++
  }
  router.push('/home')
}

function handleSearchNavigate(questionId: string) {
  searchOpen.value = false
  mobileMenuOpen.value = false
  const q = getQuestionById(questionId)
  if (!q) return
  if (q.category !== activeCategory.value) {
    setActiveCategory(q.category)
  }
  router.push({ path: '/quiz', query: { ids: questionId } })
}

function openSearchFromMobile() {
  searchOpen.value = true
  mobileMenuOpen.value = false
}
</script>
<template>
  <div class="app-shell">
    <nav class="nav">
      <div class="nav-left">
        <div class="nav-brand" @click="router.push('/')">题库</div>
        <button class="nav-search-icon" @click="searchOpen = true" aria-label="搜索">⌕</button>
      </div>
      <div class="nav-desktop">
        <div class="category-switch">
          <button
            v-for="c in CATEGORIES"
            :key="c.key"
            :class="['cat-btn', { active: activeCategory === c.key }]"
            @click="switchCategory(c.key)"
          >
            {{ c.short }}
          </button>
        </div>
        <div class="nav-links">
          <a
            v-for="l in navLinks"
            :key="l.to"
            :class="{ 'router-link-active': route.path === l.to }"
            href="#"
            @click.prevent="navigateTo(l.to)"
            >{{ l.label }}</a
          >
          <button class="search-trigger" @click="searchOpen = true">⌕ 搜索</button>
        </div>
      </div>
      <button class="nav-hamburger" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="菜单">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>

    <Transition name="nav-mobile">
      <div v-if="mobileMenuOpen" class="nav-mobile-backdrop" @click="mobileMenuOpen = false">
        <div class="nav-mobile-menu" @click.stop>
          <div class="nav-mobile-section">
            <div class="nav-mobile-section-title">导航</div>
            <a
              v-for="l in navLinks"
              :key="l.to"
              :class="{ 'router-link-active': route.path === l.to }"
              href="#"
              @click.prevent="navigateTo(l.to)"
              >{{ l.label }}</a
            >
            <button class="mobile-search-trigger" @click="openSearchFromMobile">⌕ 搜索题目</button>
          </div>
          <div class="nav-mobile-section">
            <div class="nav-mobile-section-title">切换题库</div>
            <button
              v-for="c in CATEGORIES"
              :key="c.key"
              :class="{ active: activeCategory === c.key }"
              @click="switchCategory(c.key)"
            >
              {{ c.short }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <main class="main">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" :key="routeKey" />
        </transition>
      </router-view>
    </main>
    <footer class="app-footer">
      <div class="footer-inner">
        <span
          class="footer-copyright"
          @mousedown="onPressStart"
          @mousemove="onPressMove"
          @mouseup="onPressEnd"
          @mouseleave="onPressEnd"
          @touchstart="onPressStart"
          @touchmove="onPressMove"
          @touchend="onPressEnd"
        >
          <span class="press-ring" :style="{ width: unlockProgress + '%' }"></span>
          题库 &copy; 2025 tianxingleo
        </span>
        <span class="footer-sep">·</span>
        <a href="https://github.com/tianxingleo/dlut-nihongo-quiz" target="_blank">GitHub</a>
        <span class="footer-sep">·</span>
        <span>Apache-2.0</span>
        <span class="footer-sep">·</span>
        <span>DLUT 国际信息与软件学院</span>
        <template v-if="isUnlocked">
          <span class="footer-sep">·</span>
          <button class="footer-exit-btn" @click="exitHidden">合上</button>
        </template>
      </div>
    </footer>
  </div>

  <SearchOverlay
    :visible="searchOpen"
    @close="searchOpen = false"
    @navigate="handleSearchNavigate"
  />
</template>
<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 24px;
  height: 44px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  overflow: hidden;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.nav-brand {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  color: var(--text-primary);
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 1px;
  user-select: none;
}

.nav-search-icon {
  display: none;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 20px;
  padding: 4px;
  cursor: pointer;
  line-height: 1;
}
.nav-search-icon:hover {
  color: var(--accent);
}

.nav-desktop {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
  min-width: 0;
}

.category-switch {
  display: flex;
  gap: 2px;
  flex-shrink: 0;
}
.cat-btn {
  padding: 3px 8px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 13px;
  transition:
    color 0.18s var(--ease-ink),
    background 0.18s var(--ease-ink);
  white-space: nowrap;
  position: relative;
}
.cat-btn:hover {
  color: var(--text-primary);
}
.cat-btn.active {
  color: var(--accent);
  font-weight: 500;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  flex-shrink: 0;
}
.nav-links a,
.nav-links button {
  padding: 4px 8px;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 13px;
  transition:
    color 0.18s var(--ease-ink),
    background 0.18s var(--ease-ink);
  white-space: nowrap;
  border-radius: 2px;
  position: relative;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 8px;
  right: 8px;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transition: transform 0.22s var(--ease-brush);
  transform-origin: left center;
}
.nav-links a:hover::after {
  transform: scaleX(1);
}
.nav-links a {
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
}
.nav-links a:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}
.nav-links a.router-link-active {
  color: var(--accent);
  font-weight: 500;
}
.nav-links a.router-link-active::after {
  transform: scaleX(1);
}

.search-trigger {
  background: none;
  border: 1px solid var(--border);
  font-family: inherit;
  font-size: 13px;
  color: var(--text-muted);
  padding: 3px 8px;
  cursor: pointer;
  transition:
    color 0.18s var(--ease-ink),
    border-color 0.18s var(--ease-ink);
  white-space: nowrap;
}
.search-trigger:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 3px;
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  margin-left: auto;
  flex-shrink: 0;
}
.nav-hamburger span {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--text-primary);
  transition: background 0.18s var(--ease-ink);
  border-radius: 1px;
}
.nav-hamburger:hover span {
  background: var(--accent);
}

.nav-mobile-backdrop {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 99;
}
.nav-mobile-menu {
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  padding: 8px 0;
}
.nav-mobile-section {
  padding: 8px 16px;
}
.nav-mobile-section + .nav-mobile-section {
  border-top: 1px solid var(--border);
  padding-top: 12px;
  margin-top: 4px;
}
.nav-mobile-section-title {
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 1px;
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
}
.nav-mobile-section a,
.nav-mobile-section button {
  display: block;
  width: 100%;
  text-align: left;
  padding: 8px 12px;
  font-size: 14px;
  color: var(--text-primary);
  text-decoration: none;
  background: none;
  border: none;
  font-family: inherit;
  cursor: pointer;
  border-radius: 2px;
  transition: background 0.1s;
}
.nav-mobile-section a:hover,
.nav-mobile-section button:hover {
  background: var(--bg-hover);
}
.nav-mobile-section a.router-link-active,
.nav-mobile-section button.active {
  color: var(--accent);
  font-weight: 500;
}

.mobile-search-trigger {
  color: var(--text-muted) !important;
  margin-top: 4px;
}
.mobile-search-trigger:hover {
  color: var(--accent) !important;
}

.nav-mobile-enter-active {
  transition: opacity 0.16s var(--ease-page);
}
.nav-mobile-leave-active {
  transition: opacity 0.12s var(--ease-ink);
}
.nav-mobile-enter-from,
.nav-mobile-leave-to {
  opacity: 0;
}
.nav-mobile-enter-active .nav-mobile-menu {
  animation: fade-down 0.2s var(--ease-page) both;
}
.nav-mobile-leave-active .nav-mobile-menu {
  animation: fade-up 0.12s var(--ease-ink) both reverse;
}

.main {
  flex: 1;
  padding: 32px 24px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
}

.page-fade-enter-active {
  transition:
    opacity 0.22s var(--ease-page),
    transform 0.26s var(--ease-page);
}
.page-fade-leave-active {
  transition:
    opacity 0.14s var(--ease-ink),
    transform 0.16s var(--ease-ink);
}
.page-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (prefers-reduced-motion: reduce) {
  .page-fade-enter-active,
  .page-fade-leave-active {
    transition: opacity 0.1s ease;
  }
  .page-fade-enter-from,
  .page-fade-leave-to {
    transform: none;
  }
}

.app-footer {
  padding: 20px 24px;
  border-top: 1px solid var(--border);
  background: var(--bg-card);
  margin-top: auto;
}
.footer-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 13px;
  color: var(--text-muted);
  flex-wrap: wrap;
}
.footer-inner a {
  color: var(--text-secondary);
}
.footer-inner a:hover {
  color: var(--accent);
  text-decoration: none;
}
.footer-sep {
  color: var(--border);
}
.footer-exit-btn {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 2px;
  padding: 2px 10px;
  cursor: pointer;
  transition:
    color 0.18s var(--ease-ink),
    border-color 0.18s var(--ease-ink),
    background 0.18s var(--ease-ink);
}
.footer-exit-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
}

@media (max-width: 639px) {
  .nav {
    gap: 8px;
    padding: 0 12px;
  }
  .nav-hamburger {
    display: flex;
  }
  .nav-desktop {
    display: none;
  }
  .nav-search-icon {
    display: block;
  }
  .nav-brand {
    font-size: 15px;
  }
  .main {
    padding: 20px 16px;
  }
  .footer-inner {
    font-size: 12px;
    gap: 6px;
  }
}

@media (min-width: 640px) and (max-width: 768px) {
  .nav {
    gap: 8px;
    padding: 0 14px;
    overflow-x: auto;
  }
  .cat-btn {
    padding: 2px 5px;
    font-size: 12px;
  }
  .nav-links a {
    padding: 3px 5px;
    font-size: 12px;
  }
  .main {
    padding: 20px 16px;
  }
  .footer-inner {
    font-size: 12px;
    gap: 6px;
  }
}

/* Hidden site entrance — long press trigger */
.footer-copyright {
  position: relative;
  cursor: default;
  user-select: none;
  -webkit-user-select: none;
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  padding: 6px 4px;
}
.press-ring {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--accent);
  opacity: 0.6;
  transition: width 0.08s linear;
  pointer-events: none;
}
</style>
