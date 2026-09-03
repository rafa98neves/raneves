# raneves

Two-sided static portfolio for Rafael Neves: software engineering (`/code`)
and photography/film (`/frame`). Vue 3 + Vite, prerendered to static HTML by
`vite-ssg`. EN + PT. No backend, no deployment yet (see `ai/initial-plan.md`
Appendix A).

Visual source of truth: the approved design canvas linked at the top of
`ai/initial-plan.md`.

## Commands

```
pnpm dev             # dev server
pnpm build           # vite-ssg prerender to dist/
pnpm preview         # serve the built dist/
pnpm check           # type-check + lint + boundaries + contrast + build + size
```

## Non-negotiable rules

1. **Module boundaries.** `modules/*` may import `core/`, `content/`, `i18n/`
   - never another module. `core/` never imports `modules/`. `content/`
     collection files import only their own types (`content/index.ts`, the
     aggregator, is the sanctioned exception - it bridges facts with
     `i18n/locales/*`). Enforced by `dependency-cruiser` (`pnpm boundaries`), not
     just documented - a cross-module import fails the build.

2. **Facts vs. translations, not "content is markup."** There is no
   `content/en` / `content/pt` split. Locale-independent facts (dates, hrefs,
   stack arrays, image dimensions) live once in `src/content/*.ts`.
   Translatable prose (titles, body text, labels) lives in
   `src/i18n/locales/{en,pt}.ts` under the `content` key, typed as
   `Record<ExactIdUnion, Translation>` - not `Record<string, Translation>` -
   so a missing PT translation is a **compile error**, not a runtime
   surprise. `useContent()` in `src/content/index.ts` merges the two into
   what components actually consume. No `v-html` anywhere: inline links/bold
   are `TextSegment` objects (defined in `src/i18n/schema.ts`) rendered by
   `<RichText>`.

3. **Where a string lives.** Has structure (an id, a date, an inline link) or
   belongs to a specific content entry -> `i18n/locales/*.ts` under `content`.
   A bare, entry-independent UI label (nav, buttons, section tags) -> the
   top-level keys of the same locale files. No third place.

4. **Adding a company/project/series is a data + translation edit, not a
   component edit.** See `ai/cookbook.md`. If you find yourself writing a new
   component for a new entry, stop - the data model is wrong.

5. **No dependency version younger than 7 days.** `pnpm-workspace.yaml` sets
   `minimumReleaseAge: 10080` (7 days, in minutes). Never add an exclusion.
   Runtime deps are `vue`, `vue-router`, `vue-i18n`, `@unhead/vue` (the last
   one is required by `vite-ssg` itself for correct per-route `<html>`
   attributes during prerendering - see `ai/adr/0012-unhead-vue.md`). A fifth
   needs an ADR.

6. **Components read semantic tokens** (`--bg-1`, `--fg-muted`, `--accent`) -
   never a literal hex outside `core/styles/themes.css`. Never put
   `--fg-subtle` on a maroon fill (measures under AA - see
   `scripts/check-contrast.ts`).

7. **Animation is deliberately minimal.** `core/motion/` holds the theme
   transition, hero entrance, and typewriter composables; the scroll reveal
   and palette lean are pure CSS in `core/styles/motion.css`. No animation
   library. Animate `transform`, `opacity`, or a registered `@property`
   custom property only. Every animated element needs a resting state of
   `opacity: 1` with no animation applied by default - JS/feature-support
   only ever adds motion on top of an already-correct, already-visible page.
   The one exception is `useTypewriter.ts`'s bounded `setInterval` (a
   character-by-character reveal genuinely cannot be done in CSS across
   wrapped, multi-line rich text) - it runs once, briefly, on mount, and is
   not a permanent scroll-tied loop. See `ai/adr/0006-no-animation-library.md`
   and `ai/adr/0014-typewriter-exception.md`.

8. **Keep files small.** Aim for <60 lines per `<template>`/`<script>` block,
   <120 per file (`eslint`/`oxlint` warn, don't block). `<style>` blocks are
   unbounded on purpose - a component's CSS for three themes plus a couple
   of animation states legitimately runs long, and splitting it wouldn't
   make the component simpler to read, just harder to find things in.
   Extract child components into a folder named after the parent
   (`code/components/timeline/`), never a flat bucket. Exception: a single
   flat data or translation file that holds one
   whole collection (`content/timeline.ts`, `i18n/locales/en.ts`) is allowed
   to run long - splitting it would hurt the "one place to look" goal it
   exists to serve.

9. **Every image needs explicit `width`/`height`** from its `ImageRef`
   (`content/types.ts`). Frame ratios are the closed `Ratio` union: `3:2`,
   `2:3`, `1:1`, `21:9`. A fifth ratio is a type error, not a layout surprise.

## Comment style

Comment only the non-obvious _why_ - a hidden constraint, a workaround, a
subtle invariant. No file/module header blocks, no JSDoc on functions,
params, or type fields. Names and types are the documentation. Never use em
dashes.

## Layout

```
src/
  content/      facts only (timeline, projects, series, skills, profile)
  i18n/         schema.ts (MessageSchema, TextSegment/Paragraph) + locales/
  core/         design system: styles/, components/, composables/, motion/
  modules/      home/, code/, frame/ - each owns routes, views, components
  router/       builds locale-prefixed routes from the module registry
scripts/        check-contrast.ts (build-media.ts is Phase 5, not built yet)
```

## Where to look

- `ai/initial-plan.md` - the full plan, decisions, and rationale.
- `ai/architecture.md` - how the pieces actually fit together right now.
- `ai/cookbook.md` - the exact steps for common growth tasks.
- `ai/adr/` - one short file per decision, so nobody re-litigates or
  re-introduces something already tried and rejected (THROUGHLINE, Tailwind,
  Lenis, Pinia, a JS animation library, JSON locale files...).
