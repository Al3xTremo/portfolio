import { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react'

import clsx from 'clsx'
import { Menu, X } from 'lucide-react'

import type { Content } from '../content'
import type { Theme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useActiveSection'
import { ThemeToggle } from './ThemeToggle'

type NavItem = {
  id: string
  label: string
}

type Props = {
  brand: {
    label: string
    href: string
    ariaLabel: string
  }
  items: readonly NavItem[]
  navLabel: string
  mobileMenuLabels: Pick<Content['ui']['nav'], 'openMenuLabel' | 'closeMenuLabel'>
  theme: Theme
  themeToggle: Content['ui']['themeToggle']
  onToggleTheme: () => void
}

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'

function trapFocus(container: HTMLElement | null, e: KeyboardEvent) {
  if (!container) return

  const focusables = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) =>
      !el.hasAttribute('disabled') &&
      el.getAttribute('aria-hidden') !== 'true' &&
      !el.closest('[aria-hidden="true"]'),
  )

  if (focusables.length === 0) return

  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  const active = document.activeElement

  if (e.shiftKey) {
    if (active === first) {
      e.preventDefault()
      last.focus()
    }
    return
  }

  if (active === last) {
    e.preventDefault()
    first.focus()
  }
}

export const Navbar = forwardRef<HTMLElement, Props>(function Navbar(
  { brand, items, navLabel, mobileMenuLabels, theme, themeToggle, onToggleTheme },
  ref,
) {
  const ids = useMemo(() => items.map((i) => i.id), [items])
  const activeId = useActiveSection(ids)

  const menuId = useId()
  const [open, setOpen] = useState(false)
  const openButtonRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return

    const prev = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusFirst = () => {
      const el = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)
      el?.focus()
    }

    const r = window.requestAnimationFrame(focusFirst)

    return () => {
      window.cancelAnimationFrame(r)
      document.body.style.overflow = prevOverflow
      prev?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        return
      }
      if (e.key === 'Tab') trapFocus(panelRef.current, e)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (!open) return

    const onHashChange = () => setOpen(false)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [open])

  const linkClass = (id: string) =>
    clsx(
      'inline-flex items-center justify-center whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition',
      activeId === id
        ? 'border-cyan-400/60 bg-cyan-400/10 text-zinc-950 dark:text-zinc-100'
        : 'border-black/10 bg-white/50 text-zinc-700 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:text-zinc-100',
    )

  return (
    <header
      ref={ref}
      className="sticky top-0 z-50 relative animate-fade-in border-b border-black/10 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 motion-reduce:animate-none after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-cyan-400/50 after:via-lime-400/50 after:to-emerald-400/50 after:opacity-70 dark:border-white/10 dark:bg-zinc-950/45 dark:supports-[backdrop-filter]:bg-zinc-950/35 dark:after:opacity-90"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href={brand.href}
          aria-label={brand.ariaLabel}
          className="inline-flex items-center gap-2 font-mono text-sm tracking-tight text-zinc-900 hover:opacity-90 dark:text-zinc-100"
        >
          <span
            className="inline-flex h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_0_6px_rgba(163,230,53,0.18)]"
            aria-hidden="true"
          />
          <span>{brand.label}</span>
        </a>

        <nav aria-label={navLabel} className="hidden md:block">
          <ul className="flex items-center gap-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={linkClass(item.id)}
                  aria-current={activeId === item.id ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} labels={themeToggle} />

          <button
            ref={openButtonRef}
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 p-2 text-zinc-900 shadow-sm transition hover:bg-white md:hidden dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
            aria-label={open ? mobileMenuLabels.closeMenuLabel : mobileMenuLabels.openMenuLabel}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[60] md:hidden" role="presentation">
          <div
            className="absolute inset-0 bg-zinc-950/35 backdrop-blur-sm"
            onPointerDown={() => setOpen(false)}
          />

          <div
            ref={panelRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label={navLabel}
            className="absolute right-4 top-4 w-[min(92vw,420px)] rounded-3xl border border-black/10 bg-white/90 p-4 shadow-xl dark:border-white/10 dark:bg-zinc-950/90"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-300">
                {navLabel}
              </p>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 p-2 text-zinc-900 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                aria-label={mobileMenuLabels.closeMenuLabel}
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label={navLabel} className="mt-4">
              <ul className="grid gap-2">
                {items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={clsx(linkClass(item.id), 'w-full justify-start')}
                      aria-current={activeId === item.id ? 'page' : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-4">
              <ThemeToggle
                theme={theme}
                onToggle={onToggleTheme}
                labels={themeToggle}
              />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
})
