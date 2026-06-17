<script setup lang="ts">
defineProps<{ current: number; total: number; correct: number }>()
</script>
<template>
  <div class="progress-wrap">
    <div class="progress-bar">
      <div class="fill" :style="{ width: total ? ((current / total) * 100) + '%' : '0%' }" />
    </div>
    <span class="progress-text">{{ current }} / {{ total }} &nbsp; ✅ {{ correct }}</span>
  </div>
</template>
<style scoped>
.progress-wrap { display: flex; align-items: center; gap: 12px; width: 100%; }
.progress-bar { flex: 1; height: 8px; background: var(--bg-hover); border-radius: 4px; overflow: hidden; }
.fill { height: 100%; background: var(--accent); border-radius: 4px; transition: width .3s; }
.progress-text { font-size: 14px; color: var(--text-secondary); white-space: nowrap; }
</style>
