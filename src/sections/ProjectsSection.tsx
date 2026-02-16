import type { Content } from '../content'
import { useState } from 'react'

import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'

type Props = {
  id: string
  data: Content['projects']
  labels: Content['ui']['projectLinks']
}

type ProjectItem = Content['projects']['items'][number]

type ProjectCarouselProps = {
  projectTitle: string
  images?: ProjectItem['images']
}

function ProjectCarousel({ projectTitle, images }: ProjectCarouselProps) {
  const slides = images ?? []
  const [current, setCurrent] = useState(0)

  if (slides.length === 0) return null

  const goTo = (nextIndex: number) => {
    setCurrent((nextIndex + slides.length) % slides.length)
  }

  return (
    <div className="mb-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
      <div className="relative h-56 bg-zinc-100/70 p-2 dark:bg-zinc-900/35 sm:h-64">
        <img
          src={slides[current]}
          alt={`${projectTitle} - captura ${current + 1}`}
          className="h-full w-full rounded-xl object-contain object-center"
          loading="lazy"
        />

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/60"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => goTo(current + 1)}
              aria-label="Imagen siguiente"
              className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/60"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-2 py-1 backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={`${projectTitle}-dot-${i}`}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Mostrar captura ${i + 1}`}
                    className={`h-1.5 w-1.5 rounded-full transition ${i === current ? 'bg-white' : 'bg-white/45 hover:bg-white/70'}`}
                  />
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://')
}

export function ProjectsSection({ id, data, labels }: Props) {
  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <Reveal as="div" className="lg:col-span-4">
          <SectionHeader title={data.title} />
        </Reveal>
        <div className="lg:col-span-8" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {data.items.map((p, idx) => (
          <Reveal
            key={p.title}
            as="article"
            className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-within:-translate-y-0.5 focus-within:shadow-md dark:border-white/10 dark:bg-white/5 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(700px_circle_at_0%_0%,rgba(34,211,238,0.18),transparent_60%)] before:opacity-0 before:transition before:duration-500 hover:before:opacity-100 focus-within:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(700px_circle_at_100%_0%,rgba(163,230,53,0.16),transparent_55%)] after:opacity-0 after:transition after:duration-500 hover:after:opacity-100 focus-within:after:opacity-100"
            delayMs={idx * 80}
          >
            <div className="relative z-10">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {p.description}
              </p>

              <ProjectCarousel projectTitle={p.title} images={p.images} />

              {p.highlights.length > 0 ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-800 marker:text-cyan-600 dark:text-zinc-200 dark:marker:text-cyan-300">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.links.publicRepo ? (
                  <a
                    href={p.links.publicRepo}
                    {...(isExternalHref(p.links.publicRepo)
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                  >
                    <span>{p.links.publicRepoLabel ?? labels.publicRepoLabel}</span>
                    <ExternalLink className="h-4 w-4 opacity-70" aria-hidden="true" />
                  </a>
                ) : null}

                {p.links.privateRepo ? (
                  <a
                    href={p.links.privateRepo}
                    {...(isExternalHref(p.links.privateRepo)
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-zinc-900/90 px-4 py-2 text-sm font-semibold text-zinc-100 shadow-sm transition hover:bg-zinc-900 dark:border-white/10 dark:bg-zinc-100/90 dark:text-zinc-900 dark:hover:bg-zinc-100"
                  >
                    <span>{p.links.privateRepoLabel ?? labels.privateRepoLabel}</span>
                    <ExternalLink className="h-4 w-4 opacity-70" aria-hidden="true" />
                  </a>
                ) : null}

                {p.links.hasPrivateRepo && !p.links.privateRepo ? (
                  <span className="inline-flex items-center rounded-full border border-black/10 bg-zinc-900/90 px-4 py-2 text-sm font-semibold text-zinc-100 dark:border-white/10 dark:bg-zinc-100/90 dark:text-zinc-900">
                    {p.links.privateRepoLabel ?? labels.privateRepoLabel}
                  </span>
                ) : null}

                {p.links.demo ? (
                  <a
                    href={p.links.demo}
                    {...(isExternalHref(p.links.demo)
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 via-lime-300 to-emerald-300 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-sm transition hover:opacity-90"
                  >
                    <span>{labels.demoLabel}</span>
                    <ExternalLink className="h-4 w-4 opacity-80" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
