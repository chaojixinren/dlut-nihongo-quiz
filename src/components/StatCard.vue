<script setup lang="ts">
defineProps<{ label: string; value: string | number; color?: string; sub?: string }>()
</script>
<template>
  <div class="stat-card" :style="{ borderLeftColor: color || 'var(--accent)' }">
    <div class="stat-value">{{ value }}</div>
    <div class="stat-label">{{ label }}</div>
    <div v-if="sub" class="stat-sub">{{ sub }}</div>
  </div>
</template>
<style scoped>
.stat-card {
  background: var(--bg-card); border-radius: 10px; padding: 16px;
  border-left: 4px solid; min-width: 100px; flex: 1;
}
.stat-value { font-size: 28px; font-weight: 700; color: var(--text-primary); }
.stat-label { font-size: 13px; color: var(--text-secondary); margin-top: 4px; }
.stat-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
</style>
