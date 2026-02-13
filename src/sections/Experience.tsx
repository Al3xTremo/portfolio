import type { Content } from '../content'

import { Reveal } from '../components/Reveal'

type Props = {
  id: string
  data: NonNullable<Content['experience']>
}

export function Experience({ id, data }: Props) {
  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <Reveal as="div" className="lg:col-span-4">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100 sm:text-3xl">
            {data.title}
          </h2>
        </Reveal>

        <div className="lg:col-span-8">
          <div className="grid gap-6">
            {data.items.map((item, idx) => (
              <Reveal
                key={`${item.company}-${item.role}-${item.start}`}
                as="article"
                className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
                delayMs={idx * 80}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-100">
                      {item.company}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{item.role}</p>
                  </div>

                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-300">
                    <span>{item.start}</span>
                    <span
                      aria-hidden="true"
                      className="mx-2 inline-block h-3 w-px bg-zinc-400/60 align-middle dark:bg-zinc-500/60"
                    />
                    <span>{item.end}</span>
                  </p>
                </div>

                {item.bullets.length > 0 ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-800 marker:text-cyan-600 dark:text-zinc-200 dark:marker:text-cyan-300">
                    {item.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
