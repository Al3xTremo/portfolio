import { useCallback, useEffect, useState } from 'react'

type Options = {
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
}

function shouldRevealImmediately() {
  if (typeof window === 'undefined') return true
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return true
  if (!('IntersectionObserver' in window)) return true
  return false
}

export function useInView(options: Options = {}) {
  const { rootMargin = '0px 0px -12% 0px', threshold = 0.15, once = true } = options

  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [inView, setInView] = useState<boolean>(() => shouldRevealImmediately())

  const ref = useCallback((node: HTMLElement | null) => {
    setTarget(node)
  }, [])

  useEffect(() => {
    if (!target) return
    if (inView && once) return

    if (typeof window === 'undefined') return
    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(entry.target)
          return
        }

        if (!once) setInView(false)
      },
      { root: null, rootMargin, threshold },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [inView, once, rootMargin, target, threshold])

  return { ref, inView }
}
