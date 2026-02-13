import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

import clsx from 'clsx'

import { useInView } from '../hooks/useInView'

type RevealStyle = CSSProperties & {
  ['--reveal-delay']?: string
}

type RevealElement = 'div' | 'section' | 'article' | 'li'

type Props = {
  as?: RevealElement
  children: ReactNode
  className?: string
  style?: RevealStyle
  delayMs?: number
  once?: boolean
  rootMargin?: string
  threshold?: number | number[]
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'>

export function Reveal({
  as = 'div',
  children,
  className,
  style,
  delayMs,
  once,
  rootMargin,
  threshold,
  ...rest
}: Props) {
  const { ref, inView } = useInView({ once, rootMargin, threshold })

  const mergedStyle: RevealStyle = {
    ...style,
    ...(delayMs != null ? { ['--reveal-delay']: `${delayMs}ms` } : {}),
  }

  const common = {
    ...rest,
    ref,
    'data-inview': inView ? 'true' : 'false',
    className: clsx('reveal', className),
    style: mergedStyle,
  }

  if (as === 'section') return <section {...common}>{children}</section>
  if (as === 'article') return <article {...common}>{children}</article>
  if (as === 'li') return <li {...common}>{children}</li>
  return <div {...common}>{children}</div>
}
