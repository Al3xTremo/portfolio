# al3xtremo.github.io

Portfolio SPA (Vite + React + TypeScript + Tailwind) pensado para GitHub Pages en subruta `/portfolio/`.

## Requisitos

- Node 20+

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy a GitHub Pages (`/portfolio/`)

1) Crea el repo en GitHub (ejemplo):

`portfolio`

2) Sube el codigo al branch `main`.

3) En GitHub, ve a:

Settings -> Pages -> Source: GitHub Actions

4) Espera a que termine el workflow (Actions).

5) Verifica que publica en:

https://al3xtremo.github.io/portfolio/

Notas:

- `vite.config.ts` esta configurado con `base: '/portfolio/'`.
- El workflow moderno esta en `.github/workflows/deploy.yml` (sin branch `gh-pages`).
- Contenido editable: `src/content.ts`.
