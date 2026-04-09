import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const collapsed = ref(false)
  const theme = ref<'light' | 'dark'>('light')

  const toggleCollapsed = () => {
    collapsed.value = !collapsed.value
  }

  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
    document.body.setAttribute('arco-theme', newTheme)
  }

  return {
    collapsed,
    theme,
    toggleCollapsed,
    setTheme,
  }
})
