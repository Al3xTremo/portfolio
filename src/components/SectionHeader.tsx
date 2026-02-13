type Props = {
  title: string
  description?: string
}

export function SectionHeader({ title, description }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100 sm:text-3xl">
        {title}
      </h2>

      <div
        aria-hidden="true"
        className="mt-4 h-px w-16 bg-gradient-to-r from-cyan-400 via-lime-400 to-emerald-400 opacity-80"
      />

      {description ? (
        <p className="mt-4 max-w-prose text-base text-zinc-700 dark:text-zinc-300">
          {description}
        </p>
      ) : null}
    </div>
  )
}
