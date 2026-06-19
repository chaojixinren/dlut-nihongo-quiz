import { ref } from 'vue'
import type { Ref } from 'vue'
import { getSetting, setSetting } from '../db/database'
import type { Category } from '../types/question'

const activeCategory: Ref<Category> = ref<Category>('grammar')
const activeSubBankKey: Ref<string | null> = ref<string | null>(null)
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
  activeSubBankKey.value = null
  await setSetting('activeCategory', cat)
}

export function getActiveCategory(): Category {
  return activeCategory.value
}

export function useActiveCategory(): Ref<Category> {
  return activeCategory
}

export function getActiveSubBankKey(): string | null {
  return activeSubBankKey.value
}

export function setActiveSubBankKey(key: string | null): void {
  activeSubBankKey.value = key
}

export function useActiveSubBankKey(): Ref<string | null> {
  return activeSubBankKey
}
