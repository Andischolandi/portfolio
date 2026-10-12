# Andreas Schwankl — Portfolio (Astro)

- `npm install` once, then `npm run dev` → http://localhost:4321
- Design tokens: `tokens/figma-tokens.json` (from Figma Variables) → `npm run tokens` → `src/styles/tokens.css`
- New case study: copy a folder in `src/content/cases/`, edit `index.mdx` (frontmatter = facts for cards/hero, body = chapters), put images in `images/`.
  - `draft: true` → card shows "coming soon"; `hidden: true` → not listed.
  - `section: latest | older`, `order: 1…` controls the Projects page.
- Components for chapters: `<Chapter>`, `<Figure>` (click → lightbox), `<Gallery>`, `<SubSection>`, `<Outcome>`.

## Deploy
- Hosting: GitHub Pages, custom domain `andreasschwankl.de` (set in repo Settings → Pages).
- Every push to `main` builds and publishes automatically (`.github/workflows/deploy.yml`). Progress: repo tab "Actions".
- `npm run preview:artifact` is only for the Claude preview (relative links) — not used for the live site.
