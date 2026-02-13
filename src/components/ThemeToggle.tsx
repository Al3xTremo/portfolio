import type { Theme } from '../hooks/useTheme'
import { Moon, Sun } from 'lucide-react'

type Props = {
  theme: Theme
  onToggle: () => void
  labels: {
    toLight: string
    toDark: string
    lightShort: string
    darkShort: string
  }
}

export function ThemeToggle({ theme, onToggle, labels }: Props) {
  const isDark = theme === 'dark'
  const nextAria = isDark ? labels.toLight : labels.toDark
  const nextShort = isDark ? labels.lightShort : labels.darkShort

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={nextAria}
      title={nextAria}
      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
    >
      {isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
      <span className="hidden sm:inline">{nextShort}</span>
    </button>
  )
}
