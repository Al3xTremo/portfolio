import type { Content } from '../content'

import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'

type Props = {
  id: string
  data: Content['about']
}

export function AboutSection({ id, data }: Props) {
  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <Reveal as="div" className="lg:col-span-4">
          <SectionHeader title={data.title} />
        </Reveal>

        <div className="lg:col-span-8">
          <Reveal
            as="div"
            className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(700px_circle_at_0%_0%,rgba(34,211,238,0.16),transparent_62%)] before:opacity-0 before:transition before:duration-500 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(700px_circle_at_100%_0%,rgba(163,230,53,0.14),transparent_55%)] after:opacity-0 after:transition after:duration-500 hover:after:opacity-100"
            delayMs={80}
          >
            <div className="relative z-10">
              {data.paragraphs.map((p) => (
                <p
                  key={p}
                  className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 [&:not(:first-child)]:mt-4"
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
