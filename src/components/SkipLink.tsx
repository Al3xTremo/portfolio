type Props = {
  href: string
  label: string
}

export function SkipLink({ href, label }: Props) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] rounded-full bg-lime-300 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-lg"
    >
      {label}
    </a>
  )
}
