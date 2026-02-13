import { useLayoutEffect, useRef } from 'react'

import { content } from './content'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { SkipLink } from './components/SkipLink'
import { useTheme } from './hooks/useTheme'
import { AboutSection } from './sections/AboutSection'
import { ContactSection } from './sections/ContactSection'
import { HeroSection } from './sections/HeroSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { SkillsSection } from './sections/SkillsSection'

const SECTIONS = {
  home: 'home',
  about: 'about',
  projects: 'projects',
  skills: 'skills',
  contact: 'contact',
} as const

const NAV_ITEMS = [
  { id: SECTIONS.home, label: content.ui.nav.homeLabel },
  { id: SECTIONS.about, label: content.about.title },
  { id: SECTIONS.projects, label: content.projects.title },
  { id: SECTIONS.skills, label: content.skills.title },
  { id: SECTIONS.contact, label: content.contact.title },
]

const SOCIAL = {
  urls: {
    github: content.links.github,
    linkedin: content.links.linkedin,
    email: `mailto:${content.links.email}`,
    cvUrl: content.links.cvUrl,
  },
  labels: content.ui.social,
}

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const headerRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return

    const setVar = () => {
      document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`)
    }

    setVar()

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => setVar())
      ro.observe(header)
      return () => ro.disconnect()
    }

    window.addEventListener('resize', setVar)
    return () => window.removeEventListener('resize', setVar)
  }, [])

  return (
    <div className="min-h-dvh">
      <SkipLink href="#main" label={content.ui.a11y.skipToContent} />

      <Navbar
        ref={headerRef}
        brand={{
          label: content.profile.name,
          href: `#${SECTIONS.home}`,
          ariaLabel: content.ui.a11y.brandAriaLabel,
        }}
        items={NAV_ITEMS}
        navLabel={content.ui.a11y.navLabel}
        mobileMenuLabels={content.ui.nav}
        theme={theme}
        themeToggle={content.ui.themeToggle}
        onToggleTheme={toggleTheme}
      />

      <main
        id="main"
        className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12"
      >
        <HeroSection id={SECTIONS.home} profile={content.profile} hero={content.hero} social={SOCIAL} />
        <AboutSection id={SECTIONS.about} data={content.about} />
        <ProjectsSection id={SECTIONS.projects} data={content.projects} labels={content.ui.projectLinks} />
        <SkillsSection id={SECTIONS.skills} data={content.skills} />
        <ContactSection
          id={SECTIONS.contact}
          data={content.contact}
          email={content.links.email}
          social={SOCIAL}
        />
      </main>

      <Footer
        text={content.ui.footer.text}
        backToTop={{
          label: content.ui.footer.backToTopLabel,
          href: `#${SECTIONS.home}`,
          ariaLabel: content.ui.a11y.backToTopAriaLabel,
        }}
      />
    </div>
  )
}
