import { reactive, watch } from 'vue'

export type Framework = 'vue' | 'react'
export type ThemeMode = 'light' | 'dark'
export type RadiusSize = 'none' | 'sm' | 'md' | 'lg' | 'full'

const STORAGE_KEY = 'dsh-ui-docs-prefs'

function loadPrefs(): Partial<{ framework: Framework; theme: ThemeMode; radius: RadiusSize }> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

const saved = loadPrefs()

export const docsState = reactive({
  framework: (saved.framework ?? 'vue') as Framework,
  theme: (saved.theme ?? 'light') as ThemeMode,
  radius: (saved.radius ?? 'md') as RadiusSize,
  reducedMotion: false,
  searchOpen: false,
  mobileMenuOpen: false,
})

watch(
  () => ({
    framework: docsState.framework,
    theme: docsState.theme,
    radius: docsState.radius,
  }),
  (val) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    } catch {
      // ignore storage errors
    }
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.docsTheme = val.theme
      document.body.setAttribute('arco-theme', val.theme)
    }
  },
  { immediate: true, deep: true }
)
