import { ref } from 'vue'
import type { Ref } from 'vue'
import { getSetting, setSetting } from '../db/database'
import type { Category } from '../types/question'

const activeCategory: Ref<Category> = ref<Category>('grammar')
let loaded = false

export async function loadActiveCategory(): Promise<Category> {
  if (!loaded) {
    activeCategory.value = await getSetting<Category>('activeCategory', 'grammar')
    loaded = true
  }
  return activeCategory.value
}

export async function setActiveCategory(cat: Category): Promise<void> {
  activeCategory.value = cat
  await setSetting('activeCategory', cat)
}

export function getActiveCategory(): Category {
  return activeCategory.value
}

export function useActiveCategory(): Ref<Category> {
  return activeCategory
}
