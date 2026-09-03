# Cookbook

Exact steps for the tasks that come up repeatedly. If a task needs more than
this, the data model is probably wrong - see `AGENTS.md` rule 4.

## Add a company / job / education entry to the Engineering timeline

1. Pick a stable id (kebab-case, e.g. `role-newco`) and add it to the
   `TimelineId` union in `src/content/types.ts`.
2. Append one `TimelineEvent` to `src/content/timeline.ts` - `id`, `kind`
   (`role` | `education` | `music` | `milestone`), optional `org`, `start`,
   `end`, `stack`.
3. Add the matching translation to **both** `src/i18n/locales/en.ts` and
   `pt.ts`, under `content.timeline["role-newco"]` - `title`, optional
   `location`, `body` (a `Paragraph[]` - see "Write a paragraph with a link"
   below).

Skip either locale's translation and `vue-tsc` fails immediately at that
file - `Record<TimelineId, TimelineTranslation>` requires every id in both
languages. No component work.

## Add a project / case study

1. Add the id to `ProjectId` in `content/types.ts`.
2. Append one `Project` to `content/projects.ts` - `id`, `title` (the
   product name; proper nouns are not translated, see below), `year`,
   `stack`, `cover` (an `ImageRef`), `links`.
3. Drop the cover image under `public/images/projects/<id>/` and point
   `cover.src` at it. Get its real pixel `width`/`height` (`sips -g
   pixelWidth -g pixelHeight <file>` on macOS) - explicit dimensions are
   required, see `AGENTS.md` rule 9.
4. Add the translation to both locale files under
   `content.projects["<id>"]` - `summary`, `coverAlt`, and `problem` /
   `approach` / `role` / `outcome` (each a `Paragraph[]`; write
   `[[{ kind: "text", value: "[ case study pending ]" }]]` if you don't have
   the real write-up yet - that is the existing convention, don't leave it
   silently empty).

The `/code/:id` route and its case-study page render automatically - nothing
to touch in `modules/code/`. The route itself is generated from
`content/projects.ts` in `vite.config.ts`'s `includedRoutes` (needed because
`vite-ssg` cannot prerender a dynamic route without an explicit path list).

## Add a photo/film series to Frame

1. Add the id to `SeriesId` in `content/types.ts`.
2. Append one `Series` to `content/series.ts` - `id`, `year`, `kind`
   (`photo-essay` | `film`), `frames` (empty array is fine until real photos
   exist).
3. Add the translation to both locales under `content.series["<id>"]` -
   `title`, `intent`, optional `runtime` (for a film).

No component work. `FrameSeries.vue` renders whatever is in
`content/series.ts`.

**Real frames** (the actual photos/video, not placeholder ratio tiles) are
Phase 5 work - `scripts/build-media.ts` and the manifest pipeline described
in `ai/initial-plan.md` do not exist yet. Until then, `Series.frames` stays
empty and Frame's "03 Frames" section shows the four-ratio demo, not real
photography.

## Add a skill

Append one entry to the matching group's `items` array in
`content/skills.ts` - `{ name: "...", since: <year> }`. If you're adding a
whole new group (not just a skill within Languages/Frameworks/Tools), add
its id to `SkillGroupId` in `content/types.ts` and its label to the
top-level `skills` key in both locale files.

## Add a new *kind* of timeline entry (e.g. an award or a talk)

This is the one case that legitimately needs a small component, not just
data:

1. Widen `TimelineEventKind` in `content/types.ts` to include the new kind.
2. `pnpm exec vue-tsc --noEmit` now fails at
   `src/modules/code/components/timeline/entry-renderers.ts` - the
   `Record<TimelineEventKind, Component>` there is missing the new key. That
   error is pointing you at exactly the file to edit.
3. Either map the new kind to an existing renderer (`TimelineRow` or
   `MusicRow`) if it should look the same as one of those, or write a new
   ~40-line component next to them and map to that instead.

## Add a whole new top-level section (a fourth module)

There is no `modules/_template/` yet (planned, not built). For now, copy the
shape of the smallest existing module (`modules/home/`):

1. `modules/<name>/module.ts` - `defineModule({ id, path, theme, navKey,
   routes })`.
2. `modules/<name>/views/<Name>View.vue`.
3. Add the theme to `themes.css` if it's a genuinely new one.
4. One line in `modules/index.ts`'s `modules` array.
5. Add the nav label to both locale files' `nav` key, and to `useNav()` in
   `core/composables/useLocale.ts` if the new module needs a direct link
   from elsewhere (Home's gates, the shared `PageTopBar`).

## Write a paragraph with an inline link or bold span

Never write HTML in a string. A `Paragraph` is `TextSegment[]`:

```ts
body: [
  [
    { kind: "text", value: "I built " },
    { kind: "link", value: "Sala-Z", href: "https://www.grama.io/work/sala-z.html" },
    { kind: "text", value: " from nothing." },
  ],
],
```

The outer array is paragraphs (each renders as its own `<p>`); the inner
array is the segments within one paragraph. `core/components/RichText.vue`
renders this with `core/components/Link.vue`, which applies `rel="noopener
noreferrer"` to every external link automatically - never add that by hand.

## Decide: does this string go in `content/` or `i18n`?

If it's tied to a specific entry's id (a project's summary, a timeline
event's body) - it goes under `i18n/locales/*.ts`'s `content` key, next to
that id's other translations. If it's a bare UI label that exists regardless
of any particular entry (a nav item, "Read more", a section tag like "01 -
Now") - it's a top-level key in the same locale files. There is no third
place, and nothing here is ever hardcoded English in a `.vue` template.

## Add a company/product logo

SVG only, `fill`/`stroke` stripped so `fill: currentColor` works in every
theme, `viewBox` normalized, run through SVGO (`pnpm exec svgo`). One
monochrome variant - a full-color logo will fight both the steel and velvet
palettes. Not built into any component yet; when it is, it should live
under the owning module's `assets/logos/` (e.g.
`modules/code/assets/logos/`), matching the module-ownership rule.
