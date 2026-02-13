import { useEffect, useMemo, useState } from 'react'

type Options = {
  rootMargin?: string
  threshold?: number | number[]
}

export function useActiveSection(ids: readonly string[], options: Options = {}) {
  const [activeId, setActiveId] = useState<string>('')

  const idsKey = useMemo(() => ids.join('|'), [ids])

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const top = visible[0]?.target
        if (!top || !(top instanceof HTMLElement)) return
        if (!top.id) return

        setActiveId(top.id)
      },
      {
        root: null,
        rootMargin: options.rootMargin ?? '-40% 0px -55% 0px',
        threshold: options.threshold ?? [0.2, 0.35, 0.5, 0.65],
      },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [idsKey, ids, options.rootMargin, options.threshold])

  return activeId
}
