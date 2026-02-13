import { ArrowUp } from 'lucide-react'

type Props = {
  text: string
  backToTop: {
    label: string
    href: string
    ariaLabel: string
  }
}

export function Footer({ text, backToTop }: Props) {
  return (
    <footer className="mt-24 border-t border-black/10 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-zinc-600 dark:text-zinc-300">{text}</p>

        <a
          href={backToTop.href}
          aria-label={backToTop.ariaLabel}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
          <span>{backToTop.label}</span>
        </a>
      </div>
    </footer>
  )
}
