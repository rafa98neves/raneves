# raneves

Personal portfolio for Rafael Neves - two sides, one site: software
engineering (`/code`) and photography/film (`/frame`). Vue 3 + Vite,
prerendered to static HTML with `vite-ssg`. English and Portuguese. No
backend.

## Stack

- Vue 3, Vite, vite-ssg (static prerendering, no server at runtime)
- vue-router, vue-i18n (EN + PT)
- Plain CSS with token-based theming, no CSS framework
- No animation library - CSS-first motion, hand-rolled composables
- TypeScript throughout, including locale files typed against one schema

## Commands

```
pnpm dev             # dev server
pnpm build           # vite-ssg prerender to dist/
pnpm preview         # serve the built dist/
pnpm check           # type-check + lint + boundaries + contrast + build + size
```

## Structure

```
src/
  content/      locale-independent facts (timeline, projects, series, skills, profile)
  i18n/         message schema + en/pt locale files
  core/         design system: styles, components, composables, motion
  modules/      home/, code/, frame/ - each owns its routes, views, components
  router/       builds locale-prefixed routes from the module registry
```

Adding a company, project, or photo series is a data edit, not a component
edit - see `ai/cookbook.md`.

## Documentation

The `ai/` folder holds the full plan, architecture notes, growth-task
cookbook, and one ADR per major decision. Start with `ai/initial-plan.md`.
