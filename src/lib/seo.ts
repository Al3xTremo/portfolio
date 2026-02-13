type MetaAttr = 'name' | 'property'

function setMeta(attr: MetaAttr, key: string, value: string) {
  if (!value) return

  const selector = `meta[${attr}="${CSS.escape(key)}"]`
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setLink(rel: string, href: string) {
  if (!href) return

  const selector = `link[rel="${CSS.escape(rel)}"]`
  let el = document.head.querySelector<HTMLLinkElement>(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function setThemeColorMeta(color: string) {
  setMeta('name', 'theme-color', color)
}

export function applySeo(seo: {
  title: string
  description: string
  url: string
  themeColor: { light: string; dark: string }
  og: {
    type: string
    url: string
    title: string
    description: string
    siteName: string
    locale: string
    image: string
  }
  twitter: {
    card: string
    title: string
    description: string
    image: string
  }
}) {
  document.title = seo.title

  setMeta('name', 'description', seo.description)
  setLink('canonical', seo.url)

  setMeta('property', 'og:title', seo.og.title)
  setMeta('property', 'og:description', seo.og.description)
  setMeta('property', 'og:type', seo.og.type)
  setMeta('property', 'og:url', seo.og.url)
  setMeta('property', 'og:image', seo.og.image)
  setMeta('property', 'og:site_name', seo.og.siteName)
  setMeta('property', 'og:locale', seo.og.locale)

  setMeta('name', 'twitter:card', seo.twitter.card)
  setMeta('name', 'twitter:title', seo.twitter.title)
  setMeta('name', 'twitter:description', seo.twitter.description)
  setMeta('name', 'twitter:image', seo.twitter.image)

  const isDark = document.documentElement.classList.contains('dark')
  setThemeColorMeta(isDark ? seo.themeColor.dark : seo.themeColor.light)
}
