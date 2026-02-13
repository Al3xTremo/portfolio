import clsx from 'clsx'
import { FileText, Github, Linkedin, Mail } from 'lucide-react'

type SocialKey = 'github' | 'linkedin' | 'email' | 'cv'
type Variant = 'pill' | 'icon'
type LabelMode = 'always' | 'sm' | 'never'

type Props = {
  urls: {
    github: string
    linkedin: string
    email: string
    cvUrl: string
  }
  labels: {
    github: string
    linkedin: string
    email: string
    cv: string
  }
  keys?: readonly SocialKey[]
  variant?: Variant
  labelMode?: LabelMode
  dense?: boolean
}

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://')
}

export function SocialButtons({
  urls,
  labels,
  keys,
  variant = 'pill',
  labelMode = 'sm',
  dense = false,
}: Props) {
  const pillBase =
    'inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10'
  const pillCompact = dense ? 'px-3 py-2' : 'px-4 py-2'

  const iconBase =
    'inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-zinc-900 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10'
  const iconCompact = dense ? 'h-9 w-9' : 'h-10 w-10'

  const items = [
    {
      key: 'github',
      href: urls.github,
      label: labels.github,
      icon: Github,
    },
    {
      key: 'linkedin',
      href: urls.linkedin,
      label: labels.linkedin,
      icon: Linkedin,
    },
    {
      key: 'email',
      href: urls.email,
      label: labels.email,
      icon: Mail,
    },
    {
      key: 'cv',
      href: urls.cvUrl,
      label: labels.cv,
      icon: FileText,
    },
  ] as const satisfies ReadonlyArray<{
    key: SocialKey
    href: string
    label: string
    icon: typeof Github
  }>

  const filtered = keys ? items.filter((i) => keys.includes(i.key)) : items

  const labelSpanClass =
    labelMode === 'always'
      ? ''
      : labelMode === 'sm'
        ? 'hidden sm:inline'
        : 'sr-only'

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filtered.map((item) => {
        const Icon = item.icon
        const external = isExternalHref(item.href) || item.href.endsWith('.pdf')

        const className =
          variant === 'icon'
            ? clsx(iconBase, iconCompact)
            : clsx(pillBase, pillCompact)

        return (
          <a
            key={item.key}
            href={item.href}
            aria-label={item.label}
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            className={className}
            title={item.label}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {variant === 'icon' ? (
              <span className="sr-only">{item.label}</span>
            ) : (
              <span className={labelSpanClass}>{item.label}</span>
            )}
          </a>
        )
      })}
    </div>
  )
}
