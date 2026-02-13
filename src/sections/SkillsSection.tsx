import type { Content } from '../content'

import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'

type Props = {
  id: string
  data: Content['skills']
}

export function SkillsSection({ id, data }: Props) {
  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <Reveal as="div" className="lg:col-span-4">
          <SectionHeader title={data.title} />
        </Reveal>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {data.groups.map((group, idx) => (
              <Reveal
                key={group.name}
                as="div"
                className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(700px_circle_at_0%_0%,rgba(34,211,238,0.16),transparent_62%)] before:opacity-0 before:transition before:duration-500 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(700px_circle_at_100%_0%,rgba(163,230,53,0.14),transparent_55%)] after:opacity-0 after:transition after:duration-500 hover:after:opacity-100"
                delayMs={idx * 70}
              >
                <div className="relative z-10">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-300">
                    {group.name}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
