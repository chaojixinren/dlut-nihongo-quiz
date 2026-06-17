<script setup lang="ts">
defineProps<{ tag: string; active?: boolean; clickable?: boolean }>()
defineEmits<{ click: [tag: string] }>()
</script>
<template>
  <span class="tag-badge" :class="{ active, clickable }" @click="clickable && $emit('click', tag)">
    {{ tag }}
  </span>
</template>
<style scoped>
.tag-badge {
  display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 12px;
  background: var(--bg-hover); color: var(--text-secondary); margin: 2px 4px 2px 0;
  transition: all .2s;
}
.tag-badge.active { background: var(--accent); color: #fff; }
.tag-badge.clickable { cursor: pointer; }
.tag-badge.clickable:hover { background: var(--accent); color: #fff; }
</style>
