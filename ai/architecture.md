# Architecture

This describes what actually exists in the codebase today. For why each
choice was made, see `ai/adr/`. For the full original design brief, see
`ai/initial-plan.md`.

## The three layers, and the one rule that matters

```
modules/{home,code,frame}   <- routes, views, per-module components
        |
        v  (may import)
core/                        <- design system: tokens, components, motion
content/, i18n/              <- data
```

`modules/*` may import `core/`, `content/`, `i18n/`. They may **never** import
from each other. `core/` may never import `modules/`. This is enforced by
`.dependency-cruiser.cjs`, run via `pnpm boundaries` and checked in `pnpm
check` - a violation fails the build, it is not a style guideline.

The concrete reason this mattered in practice: the plan originally wanted the
Engineering timeline row and the Frame series row to "reuse the same
grammar." The naive move would have been importing `TimelineRow.vue` from
`modules/code` into `modules/frame`. That is exactly what the boundary rule
forbids. The actual fix was extracting the shared layout into
`core/components/EntryRow.vue` (a slots-based generic row), with
`modules/code/components/timeline/TimelineRow.vue` and
`modules/frame/components/FrameSeriesRow.vue` each a thin wrapper around it.
`pnpm boundaries` catching that mistake is the whole point of the rule.

## Content: facts vs. translations

This is the part that changed most since the initial plan, so it is worth
explaining in full.

**The problem.** The first implementation had `content/en/timeline.ts` and
`content/pt/timeline.ts`, each a full array of `TimelineEvent` objects. Only
`title` and `body` actually differed between them - `id`, `kind`, `org.href`,
`start`, `end`, and `stack` were byte-for-byte duplicated. Correcting a date
meant remembering to edit two files. That directly fought the project's
stated top priority (see `AGENTS.md` rule 4).

**The fix.** Split every collection into two halves:

- **Facts** (`src/content/*.ts`) - one file per collection, no locale
  variants. `TimelineEvent`, `Project`, `Series`, `SkillGroup`, `Profile` hold
  only what does not change by language: ids, dates, URLs, image dimensions,
  stack arrays.
- **Translations** (`src/i18n/locales/{en,pt}.ts`) - under a `content` key,
  one entry per id, holding only the prose: `title`, `body` (a
  `Paragraph[]`), `location`, `summary`, `intent`, and so on.

`src/content/index.ts` exports `useContent()`, which merges the two
reactively based on the active locale (`{ ...fact, ...translation }`) and
returns what every component actually consumes - so `TimelineRow.vue` still
just reads `event.title`, `event.body`, `event.stack` on one flat object. The
split is invisible to consumers; it only matters to whoever is adding data.

**Why translations live inside the i18n locale files, not a separate
mechanism.** vue-i18n's `t()` works on flat strings with named interpolation
(`"Frame {n} of {total}"`). It cannot express "the word *Sala-Z* here is a
link to grama.io" without either raw HTML-in-strings (`v-html` - the exact
bug the old site had) or vue-i18n's slot-based `<i18n-t>`, which needs one
message key and one component invocation per paragraph shape. Given how many
entries have inline links, `TextSegment`/`Paragraph` (defined in
`i18n/schema.ts`, rendered by `core/components/RichText.vue`) exists so
prose can carry structure as data. Once that structure exists, it is simplest
for it to live as the message VALUE for a given locale - not scattered into a
third, parallel "content" mechanism.

**Why this still gives compile-time parity.** Each collection's id union is
declared once in `content/types.ts` (`TimelineId`, `ProjectId`, `SeriesId`)
and used in two places: the fact array's `id` field, and the translation
map's key type - `Record<TimelineId, TimelineTranslation>`, not
`Record<string, TimelineTranslation>`. TypeScript requires every key of a
literal union to be present in an object typed as `Record<ThatUnion, V>`, so
a locale file missing a translation for an id fails `vue-tsc` immediately,
at the exact line, in both directions (add an id without translating it in
either locale: compile error; typo a key: compile error). This is why
`scripts/check-locales.ts` was deleted - it was a runtime script re-checking
something the type system now enforces at edit time, more precisely.

## Theming

Three themes (`ink` home, `steel` Engineering, `velvet` Frame), each a
`[data-theme="x"]` block in `core/styles/themes.css` defining the same set of
custom properties (`--bg-0`, `--fg`, `--fg-muted`, `--accent`, `--focus`,
radii, and a per-theme `--dur-base`/`--ease-default` so motion itself feels
different per section, not just color). `useTheme()` derives the active
theme from the matched route's `meta.theme` and `App.vue` puts it on the
`.shell` div wrapping `<RouterView>`.

**The one real gotcha, already hit and fixed:** `:root` also carries a
fallback copy of the `ink` values. Without it, `body`'s own
`color: var(--fg)` in `reset.css` cannot resolve - `--fg` is only defined on
the `[data-theme]` div, which is a *descendant* of `body`, and custom
properties do not cascade upward. Anything relying on plain inheritance from
`body` (rather than re-asserting `color: var(--fg)` on itself) would render
in whatever `color`'s initial value is (effectively black) without the
`:root` fallback. `scripts/check-contrast.ts` parses `themes.css` directly
and asserts every text-role/surface pair meets WCAG AA - it will not catch
this specific inheritance bug (that is a rendering bug, not a token-value
bug), which is why it is written down here.

## Motion

`core/motion/` holds the three pieces that need real logic:

- `useHeroEntrance.ts` - gates the home hero's word-by-word rise on
  `document.fonts.ready`, with a 400ms timeout fallback so a slow font never
  blocks the reveal.
- `useThemeTransition.ts` - wraps route navigation in
  `document.startViewTransition()` so moving between Home/Engineering/Frame
  cross-fades instead of hard-cutting. Registered once in `main.ts`'s
  `ViteSSG` setup callback (not inside `App.vue`'s `setup()` - a guard
  registered there would miss the very first navigation during
  prerendering, since that navigation resolves before the app ever mounts).
- `useTypewriter.ts` - the one place with a genuine, bounded `setInterval`
  loop: a character-by-character reveal of Engineering's "Now" and Frame's
  "Why" statements. Truncates a `Paragraph[]` down to the currently-visible
  character count and hands the result straight to `RichText.vue`, so no
  separate rendering path was needed. Skips entirely under
  `prefers-reduced-motion`. See `ai/adr/0014-typewriter-exception.md` for
  why this is a deliberate, narrow exception to "no main-thread animation,"
  not a quiet violation of it.

Everything else is CSS, in `core/styles/motion.css`:

- `.reveal` - scroll-linked fade/rise via `animation-timeline: view()`,
  `@supports`-guarded, resting state always `opacity: 1` so nothing is stuck
  invisible without browser support.
- The home palette lean - hovering a gate interpolates the shell background
  toward that theme via `@property`-registered `<color>` custom properties
  and a `.home:has(.gate-frame:hover)` rule. This rule is deliberately
  **global**, not inside `HomeView.vue`'s `<style scoped>` - `:has()` needs
  to react to `HomeGates.vue`'s hover state, and Vue's scoped-CSS attribute
  selectors would break a scoped version of that cross-component reach. It
  runs on `--dur-lazy` (900ms), not the more common `--dur-slow` (420ms) -
  deliberately slow enough that the mutation itself is perceptible, not
  just its end state.

There is no animation library. See `ai/adr/0006-no-animation-library.md`.

## i18n and routing

EN lives at the root (`/`, `/code`), PT under a `/pt` prefix. `router/
locale.ts` builds both sets of routes from the module registry
(`modules/index.ts`); `main.ts`'s `router.beforeEach` sets
`i18n.global.locale` from `route.meta.locale` **before** the matched
component renders - critical during prerendering, where vite-ssg processes
routes concurrently in the same Node process, so a module-level i18n
singleton would leak one route's locale into another's render. `createAppI18n()`
in `i18n/index.ts` is a factory, not a singleton, for exactly this reason -
each `ViteSSG` app instance gets its own.

The `<html lang>` attribute is set via `@unhead/vue`'s `useHead()` in
`App.vue`, not `document.documentElement.lang =`. The imperative form does
nothing during prerendering (no `document` without mocking) and, even
client-side, gets silently overwritten by vite-ssg's own
`renderDOMHead()` pass if set outside unhead's reactive system. `@unhead/vue`
is pinned to the same major version vite-ssg depends on internally
(`^2.1.2`) to guarantee `useHead()` here resolves against the *same* head
instance vite-ssg's build step later renders, not a second, disconnected one.

## Verification

`pnpm check` runs, in order: `vue-tsc --noEmit` (also where locale-parity
failures surface), `oxlint` + `eslint` + `prettier --check`, `depcruise`
(module boundaries), `check-contrast.ts`, a full `vite-ssg build`, and
`size-limit` against the built app entry.

The build step is not redundant with type-checking: several real bugs here
only surfaced by actually building and looking at the output HTML or a live
browser render - CSS files that were never imported anywhere, a component
whose fallthrough `class` silently went nowhere because its template had
multiple root nodes, an i18n singleton leaking locale across concurrent
prerenders. None of those are type errors. When in doubt, build it and look.
