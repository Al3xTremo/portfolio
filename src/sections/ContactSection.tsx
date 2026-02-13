import type { Content } from '../content'

import { Mail } from 'lucide-react'

import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { SocialButtons } from '../components/SocialButtons'

type Props = {
  id: string
  data: Content['contact']
  email: string
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

export function ContactSection({ id, data, email, social }: Props) {
  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(data.emailSubject)}`

  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <Reveal as="div" className="lg:col-span-5">
          <SectionHeader title={data.title} description={data.text} />
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal
            as="div"
            className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(700px_circle_at_0%_0%,rgba(34,211,238,0.18),transparent_60%)] before:opacity-0 before:transition before:duration-500 hover:before:opacity-100 focus-within:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(700px_circle_at_100%_0%,rgba(163,230,53,0.14),transparent_55%)] after:opacity-0 after:transition after:duration-500 hover:after:opacity-100 focus-within:after:opacity-100"
            delayMs={80}
          >
            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">{email}</p>

              <div className="flex flex-wrap gap-2">
                <a
                  href={mailtoHref}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 via-lime-300 to-emerald-300 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-sm transition hover:opacity-90"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>{data.emailCtaLabel}</span>
                </a>

                <SocialButtons
                  urls={social.urls}
                  labels={social.labels}
                  keys={['linkedin', 'github']}
                  variant="pill"
                  labelMode="always"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
