<script setup lang="ts">
interface TocItem {
  id: string
  text: string
  level: 2 | 3
}
defineProps<{
  items: TocItem[]
  activeId: string
}>()

const emit = defineEmits<{
  navigate: [id: string]
}>()
</script>
<template>
  <nav class="grammar-toc" aria-label="语法目录">
    <div class="toc-header">目录</div>
    <ul class="toc-list">
      <li
        v-for="item in items"
        :key="item.id"
        :class="['toc-item', `level-${item.level}`, { active: item.id === activeId }]"
      >
        <button
          type="button"
          class="toc-link"
          :title="item.text"
          @click="emit('navigate', item.id)"
        >
          {{ item.text }}
        </button>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
.grammar-toc {
  font-size: 13px;
  padding-right: 4px;
}
.toc-header {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 10px;
  padding-left: 12px;
}
.toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-left: 1px solid var(--border);
}
.toc-item {
  margin: 0;
}
.toc-link {
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 13px;
  line-height: 1.5;
  padding: 5px 12px;
  cursor: pointer;
  transition:
    color 0.12s,
    background 0.12s;
  border-left: 2px solid transparent;
  margin-left: -1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.toc-link:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}
.toc-item.active > .toc-link {
  color: var(--accent);
  font-weight: 500;
  border-left-color: var(--accent);
}
.toc-item.level-3 > .toc-link {
  font-size: 12px;
  padding-left: 24px;
  color: var(--text-muted);
}
.toc-item.level-3.active > .toc-link {
  color: var(--accent);
}

@media (max-width: 959px) {
  .grammar-toc {
    display: none;
  }
}
</style>
