import type { Content } from '../content'

import { Reveal } from '../components/Reveal'
import { SocialButtons } from '../components/SocialButtons'

type Props = {
  id: string
  profile: Content['profile']
  hero: Content['hero']
  social: {
    urls: {
      github: string
      linkedin: string
      email: string
      cvUrl: string
    }
    labels: Content['ui']['social']
  }
}

export function HeroSection({ id, profile, hero, social }: Props) {
  return (
    <section id={id} className="pt-8 sm:pt-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <Reveal as="div" className="lg:col-span-7">
          <div className="flex items-start gap-5 sm:gap-6">
            <div className="relative shrink-0">
              <div
                className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-r from-cyan-400/30 via-lime-400/30 to-emerald-400/30 blur-2xl"
                aria-hidden="true"
              />

              <div className="relative h-40 w-40 overflow-hidden rounded-full ring-1 ring-black/10 [mask-image:radial-gradient(circle_at_50%_44%,black_55%,transparent_78%)] [-webkit-mask-image:radial-gradient(circle_at_50%_44%,black_55%,transparent_78%)] dark:ring-white/15 sm:h-48 sm:w-48 lg:h-64 lg:w-64">
                <img
                  src={profile.avatar.src}
                  alt={profile.avatar.alt}
                  className="h-full w-full object-cover object-center drop-shadow-[0_22px_34px_rgba(0,0,0,0.32)]"
                  loading="eager"
                />
              </div>
            </div>

            <div className="min-w-0 pt-1">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-700 dark:text-zinc-300">
                {profile.name}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-200">
                <span>{profile.role}</span>
                <span
                  aria-hidden="true"
                  className="mx-2 inline-block h-3 w-px bg-cyan-600/40 align-middle dark:bg-cyan-300/35"
                />
                <span>{profile.location}</span>
              </p>
            </div>
          </div>

          <h1 className="mt-4 text-4xl font-semibold leading-[1.06] tracking-tight text-zinc-950 dark:text-zinc-100 sm:text-6xl">
            <span className="bg-gradient-to-r from-cyan-500 via-lime-500 to-emerald-500 bg-clip-text text-transparent dark:from-cyan-300 dark:via-lime-200 dark:to-emerald-200">
              {hero.headline}
            </span>
          </h1>

          <p className="mt-4 font-mono text-sm text-zinc-700 dark:text-zinc-300 sm:text-base">
            {hero.subheadline}
          </p>

          <p className="mt-6 max-w-prose text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
            {profile.shortBio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {hero.ctas.map((cta) => {
              const className =
                cta.variant === 'primary'
                  ? 'inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-300 via-lime-300 to-emerald-300 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-sm transition hover:opacity-90'
                  : 'inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10'

              return (
                <a key={cta.href} href={cta.href} className={className}>
                  {cta.label}
                </a>
              )
            })}
          </div>

          <div className="mt-6">
            <SocialButtons
              urls={social.urls}
              labels={social.labels}
              keys={['github', 'linkedin', 'email', 'cv']}
              variant="icon"
            />
          </div>
        </Reveal>

        <Reveal as="div" className="lg:col-span-5" delayMs={120}>
          <div className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(700px_circle_at_20%_0%,rgba(34,211,238,0.20),transparent_60%)] before:opacity-0 before:transition before:duration-500 group-hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(700px_circle_at_80%_0%,rgba(163,230,53,0.16),transparent_55%)] after:opacity-0 after:transition after:duration-500 group-hover:after:opacity-100">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-rose-400/80" />
                  <span className="h-2 w-2 rounded-full bg-amber-300/80" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                </div>

                <p className="font-mono text-xs text-zinc-600 dark:text-zinc-300">{hero.codePanel.title}</p>

                <span
                  className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_0_6px_rgba(34,211,238,0.14)]"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-black/10 bg-white/60 dark:border-white/10 dark:bg-zinc-950/35">
                <div
                  className="max-h-[360px] overflow-auto"
                  tabIndex={0}
                  aria-label={hero.codePanel.title}
                >
                  <ol className="py-3 font-mono text-[12px] leading-6 text-zinc-800 dark:text-zinc-100">
                    {hero.codePanel.lines.map((line, i) => (
                      <li
                        key={`${hero.codePanel.title}-${i}`}
                        className="grid grid-cols-[2.25rem_1fr] gap-3 px-4"
                      >
                        <span className="select-none text-zinc-500 dark:text-zinc-500">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="whitespace-pre">{line}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
