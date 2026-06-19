import { ref } from 'vue'

const isUnlocked = ref(false)
const unlockProgress = ref(0)

let pressTimer: ReturnType<typeof setInterval> | null = null

export function useHiddenSite() {
  function startLongPress() {
    if (isUnlocked.value) return
    unlockProgress.value = 0
    pressTimer = setInterval(() => {
      unlockProgress.value += 2
      if (unlockProgress.value >= 100) {
        unlockProgress.value = 100
        cancelLongPress()
        isUnlocked.value = true
      }
    }, 100)
  }

  function cancelLongPress() {
    if (pressTimer) {
      clearInterval(pressTimer)
      pressTimer = null
    }
    if (unlockProgress.value < 100) {
      unlockProgress.value = 0
    }
  }

  function lock() {
    isUnlocked.value = false
  }

  return {
    isUnlocked,
    unlockProgress,
    startLongPress,
    cancelLongPress,
    lock,
  }
}
