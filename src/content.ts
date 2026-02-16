export type CtaVariant = 'primary' | 'secondary'

export type Content = {
  profile: {
    name: string
    role: string
    location: string
    shortBio: string
    avatar: {
      src: string
      alt: string
    }
  }

  links: {
    github: string
    linkedin: string
    email: string
    cvUrl: string
  }

  hero: {
    headline: string
    subheadline: string
    ctas: Array<{
      label: string
      href: string
      variant: CtaVariant
    }>
    codePanel: {
      title: string
      lines: string[]
    }
  }

  about: {
    title: string
    paragraphs: string[]
  }

  skills: {
    title: string
    groups: Array<{
      name: string
      items: string[]
    }>
  }

  projects: {
    title: string
    items: Array<{
      title: string
      description: string
      stack: string[]
      highlights: string[]
      links: {
        demo?: string
        publicRepo?: string
        publicRepoLabel?: string
        privateRepo?: string
        privateRepoLabel?: string
        hasPrivateRepo?: boolean
      }
      images?: string[]
    }>
  }

  experience?: {
    title: string
    items: Array<{
      company: string
      role: string
      start: string
      end: string
      bullets: string[]
    }>
  }

  contact: {
    title: string
    text: string
    emailCtaLabel: string
    emailSubject: string
  }

  seo: {
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
  }

  ui: {
    a11y: {
      skipToContent: string
      navLabel: string
      brandAriaLabel: string
      backToTopAriaLabel: string
      socialLabel: string
    }
    nav: {
      homeLabel: string
      openMenuLabel: string
      closeMenuLabel: string
    }
    themeToggle: {
      toLight: string
      toDark: string
      lightShort: string
      darkShort: string
    }
    social: {
      github: string
      linkedin: string
      email: string
      cv: string
    }
    projectLinks: {
      demoLabel: string
      publicRepoLabel: string
      privateRepoLabel: string
    }
    contact: {
      copyEmailLabel: string
      copiedLabel: string
    }
    footer: {
      text: string
      backToTopLabel: string
    }
  }
}

const siteUrl = 'https://al3xtremo.github.io/portfolio/'
const basePath = import.meta.env.BASE_URL
const toAssetPath = (path: string) => `${basePath}${path.replace(/^\/+/, '')}`
const ogImageUrl = new URL('og.png', siteUrl).toString()
const cvUrl = toAssetPath('cv.pdf')

const profile: Content['profile'] = {
  name: 'Alejandro Nafria Medina',
  role: 'Ingeniero de Computadores',
  location: 'Madrid (España)',
  shortBio:
    'Me gusta la IA, las bases de datos, las redes y los sistemas Linux. Programo en Python, C++ y Java, y disfruto llevando ideas a soluciones que se pueden desplegar y mantener.',
  avatar: {
    src: toAssetPath('cara.png'),
    alt: 'Foto de Alejandro Nafría Medina',
  },
}

const links: Content['links'] = {
  github: 'https://github.com/Al3xtremo',
  linkedin: 'https://www.linkedin.com/in/alejandronafriamedina',
  email: 'alejandronafriamedina@gmail.com',
  cvUrl,
}

export const content: Content = {
  profile,

  links,

  hero: {
    headline: 'IA, datos y sistemas. Del prototipo al despliegue.',
    subheadline: 'Python • C++ • Java • Linux • Redes • SQL',
    ctas: [
      { label: 'Ver proyectos', href: '#projects', variant: 'primary' },
      { label: 'Contactar', href: '#contact', variant: 'secondary' },
    ],
    codePanel: {
      title: 'profile.ts',
      lines: [
        'export const profile = {',
        `  name: ${JSON.stringify(profile.name)},`,
        `  role: ${JSON.stringify(profile.role)},`,
        `  location: ${JSON.stringify(profile.location)},`,
        '  interests: ["IA", "Bases de datos", "Redes", "Linux"],',
        '  languages: ["Python", "C++", "Java"],',
        '  links: {',
        `    github: ${JSON.stringify(links.github)},`,
        `    linkedin: ${JSON.stringify(links.linkedin)},`,
        `    email: ${JSON.stringify(links.email)},`,
        '  },',
        '} as const',
      ],
    },
  },

  about: {
    title: 'Sobre mi',
    paragraphs: [
      'Me interesa aplicar IA para resolver problemas concretos: desde preparar datos y definir metricas, hasta iterar con experimentos y evaluar resultados con criterio.',
      'Disfruto la parte "bajo el capot": modelado y consultas en bases de datos, diagnostico en redes (TCP/IP, DNS, HTTP) y trabajo en entornos Linux para automatizar, desplegar y operar proyectos.',
    ],
  },

  skills: {
    title: 'Habilidades',
    groups: [
      {
        name: 'Lenguajes',
        items: ['Python', 'C++', 'Java', 'SQL', 'Bash'],
      },
      {
        name: 'IA y datos',
        items: [
          'Machine Learning (fundamentos)',
          'Preprocesado y feature engineering',
          'Evaluacion y metricas',
          'NLP / LLMs (conceptos)',
          'Analisis de datos con Python',
        ],
      },
      {
        name: 'Bases de datos',
        items: [
          'Modelado relacional',
          'PostgreSQL',
          'MySQL',
          'Indice y rendimiento de consultas',
          'Transacciones y consistencia',
        ],
      },
      {
        name: 'Redes',
        items: ['TCP/IP', 'HTTP', 'DNS', 'TLS (basico)', 'Wireshark (basico)'],
      },
      {
        name: 'Linux y sistemas',
        items: [
          'Linux (CLI)',
          'Scripting y automatizacion',
          'Procesos y permisos',
          'Docker (basico)',
          'Git / GitHub Actions',
        ],
      },
    ],
  },

  projects: {
    title: 'Proyectos',
    items: [
      {
        title: 'Khomun (TFG)',
        description:
          'Plataforma para monitorizar fatiga en futbol sala a partir de datos de chaleco durante entrenamientos, con carga de CSV/XLSX, preprocesado y prediccion para apoyar decisiones de sustitucion.',
        stack: ['Python', 'Pandas', 'Scikit-learn', 'Flask', 'React', 'SQL'],
        highlights: [
          'Pipeline de datos: captura del chaleco, limpieza y subida a la plataforma',
          'Seleccion de modelos (MLP, Random Forest, XGBoost) para prediccion',
          'Visualizacion de metricas por jugador/equipo con calendario y graficas',
        ],
        links: {
          publicRepo: 'https://github.com/DanielOrtizDelgado/Khomun-Frontend',
          publicRepoLabel: 'Repo Frontend',
          privateRepo: 'https://github.com/DanielOrtizDelgado/Khomun-Backend',
          privateRepoLabel: 'Repo Backend',
        },
        images: [
          toAssetPath('projects/khomun-inicio.png'),
          toAssetPath('projects/khomun-calendario.png'),
          toAssetPath('projects/khomun-metricas.png'),
          toAssetPath('projects/khomun-seleccion.png'),
          toAssetPath('projects/khomun-resultados.png'),
        ],
      },
      {
        title: 'Uno+ (MVP)',
        description:
          'Web App responsive para conectar organizadores y jugadores: publicar y buscar partidos/ofertas por cercania y fecha, solicitar plaza y gestionar aceptaciones/rechazos con notificaciones.',
        stack: [
          'Vue 3',
          'Tailwind CSS',
          'FastAPI',
          'PostgreSQL + PostGIS',
          'Docker',
          'FCM',
        ],
        highlights: [
          'MVP por hitos: auth e infraestructura, anuncios con filtros/paginacion, flujo de solicitudes y notificaciones push.',
          'Despliegue en entorno productivo con SSL y copia de seguridad automatica accesible por cliente.',
          'Transferencia completa: documentacion tecnica, credenciales operativas y revocacion de accesos al cierre.',
        ],
        links: {
          hasPrivateRepo: true,
        },
        images: [],
      },
    ],
  },

  contact: {
    title: 'Contacto',
    text:
      'Si queres hablar de IA, datos, redes o Linux, escribime. Estoy abierto a oportunidades y proyectos donde pueda aprender y aportar.',
    emailCtaLabel: 'Enviar email',
    emailSubject: 'Contacto desde el portfolio - IA / Datos / Sistemas',
  },

  seo: {
    title: 'Alejandro Nafría Medina | IA, Datos, Redes y Linux',
    description:
      'Portfolio de Alejandro Nafría Medina (Madrid). IA, bases de datos, redes y Linux. Python, C++ y Java.',
    url: siteUrl,
    themeColor: {
      light: '#FAF8F2',
      dark: '#05070B',
    },
    og: {
      type: 'website',
      url: siteUrl,
      title: 'Alejandro Nafría Medina | IA, Datos, Redes y Linux',
      description:
        'Proyectos y habilidades en IA, bases de datos, redes y Linux. Contacto y links.',
      siteName: 'Alejandro Nafría Medina',
      locale: 'es_ES',
      image: ogImageUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Alejandro Nafría Medina | IA, Datos, Redes y Linux',
      description:
        'IA, bases de datos, redes y Linux. Python, C++ y Java.',
      image: ogImageUrl,
    },
  },

  ui: {
    a11y: {
      skipToContent: 'Saltar al contenido',
      navLabel: 'Navegacion principal',
      brandAriaLabel: 'Ir al inicio',
      backToTopAriaLabel: 'Volver al inicio',
      socialLabel: 'Enlaces',
    },
    nav: {
      homeLabel: 'Inicio',
      openMenuLabel: 'Abrir menu',
      closeMenuLabel: 'Cerrar menu',
    },
    themeToggle: {
      toLight: 'Cambiar a claro',
      toDark: 'Cambiar a oscuro',
      lightShort: 'Claro',
      darkShort: 'Oscuro',
    },
    social: {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'Email',
      cv: 'CV',
    },
    projectLinks: {
      demoLabel: 'Demo',
      publicRepoLabel: 'Repo publico',
      privateRepoLabel: 'Repo privado',
    },
    contact: {
      copyEmailLabel: 'Copiar email',
      copiedLabel: 'Copiado',
    },
    footer: {
      text: 'Hecho con Vite, React, TypeScript y Tailwind.',
      backToTopLabel: 'Volver arriba',
    },
  },
}
