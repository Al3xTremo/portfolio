import { useCallback, useEffect, useState } from 'react'

import { content } from '../content'
import { setThemeColorMeta } from '../lib/seo'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'theme'

function readInitialTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => readInitialTheme())

  const applyTheme = useCallback((next: Theme, persist: boolean) => {
    document.documentElement.classList.toggle('dark', next === 'dark')

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // ignore
      }
    }

    setThemeColorMeta(
      next === 'dark' ? content.seo.themeColor.dark : content.seo.themeColor.light,
    )
    setThemeState(next)
  }, [])

  const setTheme = useCallback(
    (next: Theme) => {
      applyTheme(next, true)
    },
    [applyTheme],
  )

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [setTheme, theme])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return

      const next = e.newValue === 'light' ? 'light' : 'dark'
      applyTheme(next, false)
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [applyTheme])

  return { theme, setTheme, toggleTheme }
}
