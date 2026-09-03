# raneves - two-sided portfolio

**Visual source of truth:** the approved design canvas at
<https://claude.ai/code/artifact/6c9af701-5602-42f9-994a-f890cc44dd45> (page "Chosen").
Where this document and the canvas disagree, the canvas wins for visuals and this document wins
for architecture.

## Context

Rafael's current portfolio ([rafa98neves.github.io](https://rafa98neves.github.io), source at
[rafa98neves/portefolio](https://github.com/rafa98neves/portefolio)) is a single-route Vue 3 + Vite 5
site: flat `components/{atoms,blocks,sections}`, all copy hardcoded in `src/constants/text.ts` as
strings with raw HTML inside rendered through `v-html`, English only, dev side only.

The new site is a **two-sided portfolio**: software engineering, and photography/cinema.

**The driving requirement is maintainability.** Adding a company he worked at, or a film he worked
on, must be **one new entry in a data file**, not an expedition through the codebase. Everything
below is shaped by that.

Old-site problems this fixes: content-as-markup, no module boundaries, no SEO-visible HTML
(client-rendered, so fetching it returns an empty shell), no theming layer, no i18n, no performance
budget.

**Target dir:** `/Users/rafael.neves/Documents/github/personal/raneves`.

---

## Decisions locked

| Area | Decision |
|---|---|
| Framework | Vue 3 + Vite, prerendered to static HTML via `vite-ssg` |
| Package manager | **pnpm** with a 7-day dependency cooldown |
| Styling | **Plain CSS + custom-property tokens.** No Tailwind |
| Section names | `Engineering` (`/code`) and `Frame` (`/frame`) |
| Themes | **All three dark.** Neutral home, cool dark grey Engineering, dark maroon Frame |
| Display font | **Bricolage Grotesque** + Schibsted Grotesk body. **No mono** |
| i18n | **vue-i18n 11**, EN + PT, TS locale files typed against one schema |
| Animation | **No animation library.** CSS-first + ~3KB of composables |
| WebGL / Lenis / Pinia | **No** to all three |
| Deploy | **Out of scope for v1.** Local dev only. Design kept in Appendix A |
| Launch | **Engineering first**, Frame behind a teaser |

Runtime dependencies: **three** - `vue`, `vue-router`, `vue-i18n`. Everything else is a
devDependency, which never ships to a visitor.

### What was rejected, and why (do not resurrect these)

An earlier concept called THROUGHLINE ran a single brass SVG line through every page, morphing
between a square wave and a sine wave, with the route transition unfolding the new theme outward
from the line. **Rejected.** It was a strong organising idea but it dragged the Engineering page
toward a technical-drawing aesthetic: a reserved monospace marginalia column and a tick grid behind
everything, which read as dense and cramped. The line, the morph, `useThroughline`, the marginalia
gutter, the blueprint language and the light-grey Engineering theme are **all out**.

---

## Design concept

> **The unifier is Rafael himself, plus one shared type system. The two sides are the same site at
> different temperatures.**

No graphic device carries the concept. What carries it is:

1. **The portrait.** A cut-out of him, centred on the home page, standing in front of a background
   that drifts from cool grey on the left to maroon on the right. The duality lives in his photo
   rather than in an abstract shape.
2. **One type system, unchanged across all three surfaces.** Same face, same scale, same section
   grammar. Only the temperature moves.
3. **A shared structural grammar.** Every inner page is a numbered sequence of big statements:
   a small accent-coloured section tag (`01 - Now`), then either one 62px sentence or a stack of
   rows with 96px titles, hairline separators, and roughly 120px of vertical air per row.

Because Engineering and Frame are built from identical bones, moving between them feels like a
temperature change in one world, not a jump between two websites. That is the whole trick, and it is
cheap: no extra DOM, no library, no fragile choreography.

**The payoff is the Sound chapter** at the bottom of Frame: Brass Fusion, the animation band he
co-founded, with a real photograph. He has played since he was ten, finished music school, and
taught music part-time through his engineering degree. It is the oldest thing on the site and the
single most distinctive fact he has. The old portfolio buried it at the bottom of an academic list.

### The signature moments

There is no single scripted set piece any more. There are three cheap, robust ones:

1. **The palette lean (home).** Hovering or focusing a gate interpolates the shell palette toward
   that side's theme, so the page visibly leans before you commit. Needs
   `@property --bg-0 { syntax: '<color>'; inherits: true }`, since unregistered custom properties
   cannot interpolate. **Scope it to the hero background layer and the gate borders only** - it
   repaints every element consuming the variable. This is the one effect with real paint risk, and
   it is also the most persuasive.
2. **The temperature shift (navigation).** A View Transition cross-fade where the background
   gradient interpolates from the outgoing theme's tokens to the incoming theme's. ~240ms, GPU-only.
   Native API, feature-detected, degrades to an instant swap.
3. **The hero entrance (home).** Name splits into two lines and rises from behind
   `overflow: hidden` wrappers, stagger 80ms, 700ms, `--ease-out-expo`; the portrait fades and
   settles 40ms behind it. Gated on `document.fonts.ready` with a **400ms timeout fallback** so a
   slow font never blocks the hero. The `getClientRects()` line measurement happens **once, before**
   the animation, never during.

Plus two ambient ones: scroll reveals on rows and tiles (pure CSS `animation-timeline: view()`,
off the main thread, `@supports`-guarded, resting state `opacity: 1` so nothing is ever stuck
invisible), and a **state chip anchored inside the hovered element** (`VIEW 03/12`) instead of a
pointer-following cursor, which would be a permanent rAF loop, dead on touch and invisible to
keyboard. CSS only, 0KB, identical for keyboard users.

**With `prefers-reduced-motion`**, reveals become instant, the entrance does not run, the lean stops,
and the navigation cross-fade drops to a 120ms opacity fade. Nothing is hidden behind a trigger.

---

## Maintainability: the "one new entry" contract

| Task | What you touch | Component work |
|---|---|---|
| **New company / job** | Append one `TimelineEvent` to `content/{en,pt}/timeline.ts`; drop `logo.svg` in `modules/code/assets/logos/` | **None** |
| **New project** | Append one `Project` to `content/{en,pt}/projects.ts`; drop a cover in `content/media/projects/<slug>/` | **None.** `/code/:slug` is generated from the array, so the case study exists and prerenders automatically |
| **New film / photo series** | Append one `Series` to `content/{en,pt}/series.ts`; create `content/media/frame/<slug>/` and drop the frames in | **None.** The build script scans the folder, reads dimensions and dominant colour into the manifest, and the gallery renders it |
| **New skill** | One entry in `content/{en,pt}/skills.ts` with a `since` year | **None** |
| **New *kind* of timeline entry** (award, talk) | Add the string to the `kind` union. **TS then fails at `entry-renderers.ts` and points at the file to edit.** Add one small component beside the map and one line to the map | One ~40-line component, in an obvious place |
| **New whole section** | Copy `modules/_template/`, add one line to `modules/index.ts` | Scaffolded |

Four mechanisms make that true:

**1. Data-driven views, no per-entity components.** Views map over collections. There is no
`UnbabelCard.vue`. A rendering difference is a `kind` on the data, never a new bespoke component in
a new place.

**2. Exhaustive unions make the compiler your index.** Every polymorphic render goes through a
`Record<Kind, Component>` map, so widening a union produces a type error **at the file you need to
edit**. This is what removes the hunting.

**3. Convention over configuration for media.** `scripts/build-media.ts` scans
`src/content/media/**` and emits `src/content/generated/media.manifest.json`. Dropping files into a
correctly-named folder is the entire interface.

**4. A module manifest plus a registry.** Each module declares itself in one `module.ts`; a single
`modules/index.ts` aggregates them and the router builds every locale's routes from that.

```ts
// src/modules/code/module.ts
export default defineModule({
  id: 'code',
  path: 'code',
  theme: 'steel',
  navKey: 'nav.code',
  routes: [
    { path: '', component: () => import('./views/CodeView.vue') },
    { path: ':slug', component: () => import('./views/CaseStudyView.vue'), fromCollection: 'projects' },
  ],
})
```

### File size

Soft rule, enforced as warnings so it guides rather than blocks:

```js
'vue/max-lines-per-block': ['warn', { template: 60, script: 60, style: 100, skipBlankLines: true }],
'max-lines': ['warn', { max: 120, skipBlankLines: true, skipComments: true }],
```

(`vue/max-lines-per-block` exists in eslint-plugin-vue since v9.15.0 with exactly these options.)
CI prints these but does not fail on them. A `<template>` over ~60 lines almost always contains a
child component wanting extraction; sub-components live in a folder named after their parent
(`components/timeline/`), never a flat bucket.

---

## Architecture

```
raneves/
├── AGENTS.md                    # canonical AI instructions
├── CLAUDE.md                    # one line: @AGENTS.md
├── ai/
│   ├── initial-plan.md          # this document
│   ├── architecture.md
│   ├── cookbook.md              # "how do I add a company / project / series / module"
│   └── adr/0001-*.md ...
├── pnpm-workspace.yaml          # the dependency cooldown
├── .dependency-cruiser.cjs
├── .size-limit.json
├── scripts/
│   ├── build-media.ts           # sharp: rungs + manifest, by folder convention
│   ├── check-locales.ts         # entry-id parity across en/pt
│   └── check-contrast.ts
├── public/fonts/*.woff2
└── src/
    ├── main.ts
    ├── App.vue                  # theme container, live region, skip link
    ├── i18n/
    │   ├── schema.ts            # MessageSchema interface - the contract
    │   ├── locales/{en,pt}.ts   # both annotated `: MessageSchema`
    │   └── index.ts
    ├── router/{index.ts,locale.ts}
    ├── core/                    # design system. NEVER imports from modules/
    │   ├── styles/{reset,tokens,themes}.css
    │   ├── components/          # RichText, Img, Link, Dialog, SectionTag, StateChip, Chip
    │   ├── motion/              # useThemeTransition, usePaletteLean, useReveal, useSplitLines
    │   ├── composables/         # useTheme, useMotionPreference
    │   └── types/
    ├── content/                 # pure typed data. Imports nothing but its own types.
    │   ├── types.ts
    │   ├── index.ts             # useContent(): resolves a collection for the active locale
    │   ├── en/{profile,timeline,projects,skills,series}.ts
    │   ├── pt/{...}
    │   ├── media/
    │   └── generated/media.manifest.json
    └── modules/
        ├── index.ts             # THE REGISTRY - one line per module
        ├── _template/
        ├── home/
        ├── code/
        │   ├── module.ts
        │   ├── views/
        │   ├── components/timeline/{TimelineSpine.vue,entry-renderers.ts,RoleEntry.vue,...}
        │   └── assets/logos/
        └── frame/
```

### The three boundary rules

1. A module may import from `core/`, `content/` and `i18n/`. **Never from another module.**
2. `core/` may import `content/types` and `i18n/schema`. **Never from any module.**
3. `content/` imports nothing but its own types.

**Enforced, not documented.** `dependency-cruiser` (v18.2.0, dev-only) runs in `lint` and CI:

```js
forbidden: [
  { name: 'no-cross-module', severity: 'error',
    from: { path: '^src/modules/([^/]+)/' },
    to:   { path: '^src/modules/([^/]+)/', pathNot: '^src/modules/$1/' } },
  { name: 'core-is-independent', severity: 'error',
    from: { path: '^src/core/' }, to: { path: '^src/modules/' } },
  { name: 'content-is-pure', severity: 'error',
    from: { path: '^src/content/' }, to: { path: '^src/(core|modules)/' } },
  { name: 'no-circular', severity: 'error', from: {}, to: { circular: true } },
]
```

The old site's `atoms/blocks/sections` split by *shape* rather than *ownership*, so nothing stopped
the Frame gallery leaking into the Engineering bundle. Keep the layering instinct inside
`core/components/`, drop the names.

### Content as data, not markup

No `v-html` anywhere. Inline links are structured segments rendered by `<RichText>`:

```ts
// src/content/types.ts
export type TextSegment =
  | { kind: 'text'; value: string }
  | { kind: 'link'; value: string; href: string }
  | { kind: 'strong'; value: string }
export type Paragraph = TextSegment[]

export interface ImageRef {
  src: string; width: number; height: number; alt: string; dominant: string
}

export interface TimelineEvent {
  id: string                            // stable across locales; check-locales.ts asserts parity
  kind: 'role' | 'education' | 'music' | 'milestone'
  title: string
  org?: { name: string; href?: string; logo?: string }
  location?: string
  start: string                         // 'YYYY-MM'
  end: string | 'present'
  body: Paragraph[]
  stack: string[]
}

export interface Project {
  id: string; slug: string; title: string; year: number
  summary: string
  problem: Paragraph[]; approach: Paragraph[]; role: Paragraph[]; outcome: Paragraph[]
  stack: string[]
  cover: ImageRef
  links: { live?: string; code?: string; article?: string }
}

export type Ratio = '3:2' | '2:3' | '1:1' | '21:9'
export interface Frame { image: ImageRef; ratio: Ratio; kind: 'photo' | 'video'; poster?: ImageRef }
export interface Series {
  id: string; slug: string; title: string; year: number
  intent: string
  kind: 'photo-essay' | 'film'
  runtime?: string
  frames: Frame[]
}
export interface SkillGroup { label: string; items: { name: string; since: number }[] }
```

`<RichText>` and `<Link>` centrally apply `rel="noopener noreferrer"`. **Dates are never stored
formatted** - `start`/`end` are ISO-ish and rendered through `Intl.DateTimeFormat` with the active
locale, so Portuguese dates are correct for free.

`Ratio` is a closed union on purpose: the gallery's composition depends on there being exactly four
buckets, and a fifth ratio should be a type error, not a layout surprise.

### i18n

**vue-i18n 11.4.10**, Composition API mode (`legacy: false`, `globalInjection: true`). No
`@intlify/unplugin-vue-i18n`: that plugin precompiles JSON/YAML message files and SFC `<i18n>`
blocks, and our locale files are plain typed TS modules, so the plugin would be dead weight - they
bundle as ordinary TS via Vite's normal pipeline.

**Locale files are `.ts`, not `.json`, annotated against one shared interface.** A missing or
misspelled Portuguese key becomes a **compile error**, which JSON locale files cannot give you:

```ts
// src/i18n/schema.ts
export interface MessageSchema {
  nav: { home: string; code: string; frame: string }
  common: { readMore: string; backToTop: string }
  frame: { counter: (n: number, total: number) => string }
}

// src/i18n/locales/pt.ts
import type { MessageSchema } from '../schema'
export const pt: MessageSchema = {          // omit a key and tsc fails
  nav: { home: 'Início', code: 'Engenharia', frame: 'Frame' },
  common: { readMore: 'Ler mais', backToTop: 'Voltar ao topo' },
  frame: { counter: (n, total) => `Frame ${n} de ${total}` },
}
```

Then augment vue-i18n so `$t()` keys are typed:

```ts
declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}
```

**One unambiguous rule for where a string lives:**

> **If it has structure (inline links, a stack array, a date, an image), it is content and lives in
> `src/content/{en,pt}/`. If it is a bare UI label, it is a message and lives in
> `src/i18n/locales/`. There is no third place.**

Long-form prose cannot live in an i18n message without regressing to HTML-in-strings, which is the
exact bug being fixed. vue-i18n owns chrome; content modules own prose.

**Parity types cannot enforce:** `TimelineEvent[]` in EN and PT are both valid arrays even holding
different entries. `scripts/check-locales.ts` compares the `id` sets of every collection across
locales and fails CI on a mismatch. That is why every content type carries a stable `id`.

**Routing:** EN at the root (`/`, `/code`), PT under a prefix (`/pt`, `/pt/code`). Slugs stay
English so URLs are stable. Both locales prerender (~24 static routes) with `hreflang` alternates
and the correct `lang` baked in. Footer switcher preserves the current route. Initial locale from
URL, then `localStorage`, then `navigator.language`.

**Cost:** ~12-14KB gzip with precompiled messages and the runtime-only build.

### Routing and state

Hand-written module route files aggregated by the registry, every view lazy-imported.
`unplugin-vue-router` is **skipped**: its latest release still peers on `vue-router@^4` while we are
on 5.x, and explicit routes suit module ownership better.

**No Pinia.** `useTheme()` derives the theme from the matched module (already baked into prerendered
HTML) and `useMotionPreference()` handles `prefers-reduced-motion` plus a persisted toggle.

### Prerender, do not SPA

`vite-ssg@28.3.0` as a **devDependency** (confirmed peers: `vite ^8.0.0-0`, `vue-router ^5.0.0-0`).
Static HTML out, no Node at runtime.

Fetching the old site returns nothing but `<title>Portfolio | Rafael Neves</title>`, fatal for
something recruiters must find. Prerendering also bakes `data-theme` and `lang` into the markup,
killing the theme flash and the wrong-language flash.

---

## Theming

Three themes, all dark, each a variable swap on a container. Components read **semantic tokens
only**, never a literal hex.

```html
<div :data-theme="theme"><RouterView /></div>
```

**Motion is a theme token too**, which is what makes the sides feel different beyond colour:

| | Engineering (steel) | Frame (velvet) |
|---|---|---|
| `--dur-base` | 190ms (crisp, snaps) | 320ms (heavy, settles) |
| default easing | `--ease-out-expo` | `--ease-out-quart` |
| `--r-md` | 2px | 12px |

Radius as a theme variable means a theme switch changes *form*, not just hue.

```css
/* home shell: neutral drifting warm */
[data-theme="ink"] {
  --bg-grad: linear-gradient(100deg, #191D22 0%, #191D22 34%, #1F1519 64%, #26141A 100%);
  --bg-0:#191D22; --bg-1:#1F1519; --bg-2:#26141A;
  --fg:#F4F3F0; --fg-muted:#B9B9C0; --fg-subtle:#8E8E97; --fg-sep:#7A7A83;
  --accent:#D8B26A;                         /* brass */
  --border-subtle:rgba(244,243,240,0.16);
  --focus:#E3C285; --focus-halo:#0B0B0D;
  --r-sm:3px; --r-md:6px; --r-lg:14px;
}
/* Engineering: cool dark grey */
[data-theme="steel"] {
  --bg-0:#17181B; --bg-1:#1B1D21; --bg-2:#24262B;
  --fg:#F4F3F0; --fg-muted:#B0B0B8; --fg-subtle:#949AA3;
  --accent:#D8B26A;
  --border-subtle:rgba(244,243,240,0.14);
  --focus:#E3C285; --focus-halo:#0B0B0D;
  --r-sm:1px; --r-md:2px; --r-lg:4px;
}
/* Frame: dark maroon */
[data-theme="velvet"] {
  --bg-0:#140A0D; --bg-1:#1E0F14; --bg-2:#2A151B; --bg-3:#3A1E25;
  --maroon:#6B2231;                         /* washes, buttons, the multiply grade */
  --fg:#F5EDE9; --fg-muted:#C7B0B2; --fg-subtle:#B49A9E;
  --accent:#E7B573;
  --border-subtle:rgba(245,237,233,0.14);
  --focus:#F0C68C; --focus-halo:#140A0D;
  --r-sm:6px; --r-md:12px; --r-lg:20px;
}
```

**Contrast is computed, not estimated.** Every pair below was measured; `scripts/check-contrast.ts`
re-verifies in CI so a palette tweak cannot silently break AA.

| Theme | pair | worst ratio across that theme's surfaces |
|---|---|---|
| ink | `--fg` | **15.26** |
| ink | `--fg-muted` | **8.68** |
| ink | `--fg-subtle` | **5.21** |
| ink | `--accent` | **8.46** |
| steel | `--fg` | **13.64** |
| steel | `--fg-muted` | **7.03** |
| steel | `--fg-subtle` | **5.34** |
| steel | `--accent` | **7.57** |
| velvet | `--fg` | **14.88** |
| velvet | `--fg-muted` | **8.42** |
| velvet | `--fg-subtle` | **6.60** |
| velvet | `--accent` | **9.21** |

Two traps found by measuring, recorded so they are not reintroduced: the original steel subtle grey
`#8B8B94` measured **4.48** on the card surface `#24262B`, just under AA, hence `#949AA3`; and the
original velvet subtle `#8C7276` measured **3.92**, a clear fail, hence `#B49A9E`. Also note
`--fg-subtle` on a maroon `#6B2231` fill is only 4.24, so **never put subtle text on a maroon
fill** - use `--fg` or `--fg-muted` there.

Why the steel side will not look like default bootstrap grey: the greys are blue-cool (~230deg at
low saturation), radii are 1-2px, the accent is brass used sparingly, and the page is mostly air.

Why brass survives next to photography: it is analogous to maroon (warm, ~35deg), so it never
chromatically fights an image the way cyan would, it reads as gold film titles, and at 9.21:1 on
velvet surfaces it stays legible over a dark photograph.

---

## Typography

Two families. **No mono** - the marginalia system that justified it is gone, and the small uppercase
letterspaced tags are set in the body face. That saves a whole font file.

| Role | Face | Licence |
|---|---|---|
| Display | **Bricolage Grotesque Variable** (`wght`, `wdth`, `opsz`) | SIL OFL 1.1 |
| Body + tags | **Schibsted Grotesk Variable** (`wght`) | SIL OFL 1.1 |

Verify both licence files at install time rather than trusting this table.

**Three files, self-hosted** (no Google Fonts: better privacy, no third-party DNS/TLS):

| File | Subset | ~KB woff2 | Strategy |
|---|---|---|---|
| `bricolage-hero.woff2` | ~50 glyphs, only what the home H1 needs, incl. PT diacritics | **~8** | `<link rel="preload">` |
| `bricolage-var.woff2` | Latin + PT diacritics, `wght` + `wdth` | ~54 | `font-display: swap` |
| `schibsted-var.woff2` | Latin + PT diacritics | ~28 | `font-display: swap` |

~90KB total, ~8KB on the home critical path. Subsets **must** include the full Portuguese diacritic
set. Subsetting uses Python `fonttools`, deliberately not an npm dependency.

**CLS = 0** via metric-matched fallbacks:

```css
@font-face {
  font-family: "Schibsted Fallback";
  src: local("Helvetica Neue"), local("Arial");
  size-adjust: 97%; ascent-override: 92%; descent-override: 24%; line-gap-override: 0%;
}
```

Measure the real percentages with the Fontaine algorithm rather than guessing.

**Type rules, as built:** display always `letter-spacing: -0.045em` / `line-height: 0.86` at hero
scale, `-0.05em` / `0.92` at the 96px row scale, `-0.032em` / `1.1` at the 62px statement scale.
Body 17.5-19px at `line-height: 1.6`, `max-width: 640px`. Tags 11.5px, `letter-spacing: 0.18em`,
uppercase. Section tags follow the pattern `NN - Title` with the number and title in one string.

---

## Page structure

Matches the approved canvas. All three share: an 80px side gutter (72px on home), a top bar with a
back affordance on the left and nav plus locale on the right, and numbered sections.

### Home `/` - theme `ink`

1. **Top bar**: `RN` monogram left; Engineering / Frame / EN right.
2. **Eyebrow**, centred, flex row with `/` separators: Senior Frontend Developer, Photographer,
   Coimbra Portugal.
3. **Name** at 148px, centred, two words on one line.
4. **The portrait band**: a three-column grid, copy left (right-aligned), the cut-out portrait
   centred at 424px, copy right. Left copy carries the career and the client names; right copy
   carries the two-ways-in framing and the brass.
5. **Two gates**, equal width, side by side: `01 Engineering` and `02 Frame`, each with a title, a
   one-line subtitle and a corner arrow. The Frame gate carries an **intentional teaser state** until
   Frame ships. Palette lean on hover/focus. Real `<a>` elements, >=56px tap height.

The background gradient runs the full width behind everything, cool grey to maroon.

### Engineering `/code` - theme `steel`

`01 Now` (one 62px sentence, currently the Unbabel cluster and the client names) /
`02 The path` (rows) / `03 Selected work` (two-up tiles).

Each path row is a two-column grid, `1fr 320px`: left holds a 96px company name and a 19px
description at `max-width: 640px`; right is right-aligned and holds the year range, the location,
and a wrapped row of stack chips. `padding: 62px 0 58px`, hairline top border, hairline bottom on the
last row.

**Still to build:** a contact section, and the widened timeline. The path currently shows only the
three jobs; the plan is **~14 events** including first line of code, music school, BSc FCTUC
2016-2018, part-time music teacher, Brass Fusion co-founded, Sala-Z built from zero, ALT21, MSc
2019-2021, and the Unbabel lead role. **The music entries sitting inside the engineering timeline
are the point** - they are what makes the two-sided site cohere. That is what `TimelineEvent.kind`
exists for, and what the `entry-renderers.ts` map dispatches on.

**Go deep on six projects, not wide on twenty.** Each expands to a real case study at `/code/:slug`:
problem, approach, stack, role, outcome. Six 400-word write-ups read as substantial; twenty
one-liners read as empty.

### Frame `/frame` - theme `velvet`

`01 Why` / `02 Series` / `03 Frames` / `04 Sound`.

**It deliberately does not open on a full-bleed cover photo.** It opens on a 62px sentence, exactly
like Engineering. That keeps the two sides structurally identical, and it means the first paint is
text, which is what keeps a photography-heavy page fast on a phone. The photography is something you
scroll into, not something you wait for.

- **02 Series** reuses the Engineering row grammar exactly: 96px title, intent line, right column
  with year and frame count or runtime, plus a corner arrow (series are navigable; jobs are not, and
  that difference is deliberate).
- **03 Frames** makes the four-ratio rule visible. `Ratio` is a closed union of `3:2`, `2:3`, `1:1`,
  `21:9`; every frame crops to one. That constraint is what lets a dense grid look composed rather
  than accidental. Layout is a full-width 21:9 panorama, then a flush row of 3:2 / 2:3 / 1:1 / 2:3.
  Both rows end on the same edge, because a ragged edge would argue against the section's own claim.
  **CLS is structurally zero** - every `aspect-ratio` comes from the build manifest.
- **04 Sound** is the payoff. Real photograph, two-column: image left at 3:2, copy right. The image
  carries a `#6B2231` `mix-blend-mode: multiply` wash at 0.34 opacity plus a bottom scrim, so a
  photograph *joins* the theme instead of sitting on top of it. **The wrapper needs
  `isolation: isolate`** - `position: relative` alone does not create a stacking context, so the
  blend group would otherwise climb to the root element and the wash would become
  host-dependent.

**Gallery mechanics** (not yet mocked, unchanged from the earlier plan): CSS Grid with
`grid-auto-flow: dense`, no masonry library, and **not** CSS `columns`, which reorders content and
breaks tab order. Video items render as `<img>` posters; on hover/focus/intersection an inline muted
loop attaches (`preload="none"`, ~480px, AV1 60-120KB) with a **hard cap of 2 concurrent playing
videos**. Off-screen series get `content-visibility: auto` with `contain-intrinsic-size`. The
lightbox is a native `<dialog>` - free focus trap, free `Esc`, free background `inert`, zero
dependency - with a View Transition from thumb to full frame, arrow keys, `Home`/`End`, swipe, and
**neighbours +/-1 preloaded only**.

---

## Animation: no library

| Native capability | Covers |
|---|---|
| `animation-timeline: view()` / `scroll()` | Every scroll reveal. Off main thread |
| View Transitions API | The temperature shift, thumb to lightbox, card to case study |
| `@property` + `transition` on custom props | The palette lean |
| `linear()` easing | Real spring curves, no physics library |
| `<dialog>` + `inert` | Lightbox modality and focus management |

| Option | gzip | Verdict |
|---|---|---|
| GSAP core + ScrollTrigger + SplitText | ~40KB | **Rejected.** Fully free including all former Club plugins since April 2025, but free is not weightless, and every effect here is transform/opacity |
| `motion-v` 2.4 | ~18-24KB | **Rejected.** A wrapper over what CSS now does natively |
| `@vueuse/motion` | ~12KB + `@vueuse/core` | **Rejected.** Same, larger surface |
| **CSS + WAAPI + IntersectionObserver fallback** | **~3KB** | **Chosen** |

Four composables, ~280 lines: `useThemeTransition` (View Transitions behind a feature check in
`router.afterEach`), `usePaletteLean` (the gate hover, scoped to two surfaces), `useSplitLines`
(measure-once line wrapping), `useReveal` (IntersectionObserver fallback for browsers without
`view()`).

Dropping the line concept removed `useThroughline` and its rAF path-lerp loop entirely, which means
**there is now no main-thread animation on the site at all**. Everything is transform, opacity, or a
registered custom property.

**No Lenis.** It inserts a JS rAF loop between the user's most-used input and the pixels, a direct
INP liability; it desynchronises the scrollbar and breaks find-in-page and `PageDown`;
reduced-motion must disable it so both paths need maintaining. Instead: `scroll-behavior: smooth`
for anchor jumps only, and `scroll-snap-type: x mandatory` on the series rails, which is native,
thumb-perfect on touch and keyboard-accessible for free.

**No WebGL.** Three.js even tree-shaken is ~120-180KB, it costs shader compilation exactly when we
are chasing LCP, it burns battery on the device class most likely to view a photography site, and a
non-WebGL fallback is required anyway. Replacements: film grain is one 128x128 tiling PNG on an
oversized fixed pseudo-element animated with `translate3d` in 8 `steps()` (~2KB, and **never**
animate `background-position`, which repaints the full viewport); bokeh is pre-blurred build-time
variants; the maroon grade is `mix-blend-mode`, not an SVG filter, which on large images is
expensive and non-composited.

---

## Performance budget

**Changed from the earlier plan: the home page now has an image.** The old concept had a type-only
hero, so LCP was free. The approved design puts a 424px portrait at the centre of the page, and that
is almost certainly the LCP element. This is the honest cost of the design and it is worth it.

| Route | JS gzip | CSS | Fonts | Images | LCP target |
|---|---|---|---|---|---|
| `/` | ~70KB | ~11KB | 8KB critical | portrait ~70-90KB | **< 1.6s on 4G** |
| `/code` | +7KB | +3KB | - | logos ~20KB | < 1.6s |
| `/frame` | +7KB | +4KB | - | ~450-500KB above fold | < 2.5s |

Targets: **LCP < 2.5s, INP < 200ms, CLS < 0.05** (0 by construction).

The ~70KB home baseline is vue + vue-router + vue-i18n (~58KB) plus app code. Dropping the mono font
saved 24KB from `/code`.

**The portrait is a cut-out with transparency**, so JPEG is not an option. Serve **AVIF with alpha,
WebP with alpha as fallback**, at 424 / 636 / 848 CSS-px rungs, `fetchpriority="high"`, preloaded,
with explicit `width`/`height`. Budget 70-90KB for the 2x rung. `sharp` handles alpha in both
formats.

Held by: exactly **one** `fetchpriority="high"` image per page; `loading="lazy"` +
`decoding="async"` below the fold; `content-visibility: auto` on off-screen series; explicit
dimensions on every image; video posters instead of video.

**Image pipeline:** `scripts/build-media.ts` uses `sharp` to generate rungs in AVIF + WebP with a
JPEG fallback for opaque images, and writes the manifest with dimensions and dominant colour. `<Img>`
consumes it to emit `srcset`/`sizes`. Placeholder is a CSS gradient from the dominant hex (~40 bytes)
rather than a base64 LQIP (~600 bytes). Prefer this script over `vite-imagetools` because the
manifest is a committed artifact the gallery layout reads at build time, and because folder-scanning
is what makes "drop the frames in" work.

**Verified in CI:** `size-limit` per-route budgets, Lighthouse CI with asserted thresholds, and
`check-contrast.ts`.

---

## Tooling and the 7-day dependency rule

```yaml
# pnpm-workspace.yaml
minimumReleaseAge: 10080          # 7 days, in MINUTES
minimumReleaseAgeExclude: []      # keep empty; every exclusion is a hole in the rule
```

```json
// package.json
"packageManager": "pnpm@11.22.0",
"engines": { "node": ">=22", "pnpm": ">=11" }
```

pnpm has had `minimumReleaseAge` since 10.16 and defaults it on (1440) since v11, so it is the
best-tested implementation. npm's equivalent is `min-release-age` **in days**, but it needs npm
>= 11.10.0 and this machine has 11.6.0. pnpm arrives via `corepack`, which is already installed;
11.22.0 was itself published 15 days ago, so the pin satisfies the rule it enforces.

**The scaffold ordering trap:** with the cooldown active you cannot install a version published
today. This is not something to work around - pnpm resolves to the newest version already older than
7 days. Set the cooldown **before the first install** and let the resolver pick. Never disable it
"just to scaffold".

**CI enforcement** (the config file alone is not enforcement):
- Commit `pnpm-lock.yaml`; CI runs `pnpm install --frozen-lockfile`.
- CI asserts the cooldown is still configured and `minimumReleaseAgeExclude` is empty **before**
  installing, so nobody can quietly delete the line.
- A CI step re-resolves and fails if any locked version's publish date is under 7 days old. That is
  the actual gate.
- Automated updates: **Renovate** with a matching 7-day cooldown, grouped weekly.

**Dev toolchain:** TypeScript + `vue-tsc`, `oxlint` plus `eslint`/`eslint-plugin-vue` for the Vue SFC
rules oxlint does not yet cover, `prettier`, `dependency-cruiser`, `size-limit`, `sharp`, `svgo`.

**Comment style** (his global rule): comment only the non-obvious *why*. No file or module header
blocks, no JSDoc on functions, params or type fields. Names and types are the documentation. **Never
use em dashes.**

---

## AI-facing documentation

`AGENTS.md` is the cross-tool convention; Claude Code reads `CLAUDE.md`. Keep **one** source of
truth: `AGENTS.md` holds the content and `CLAUDE.md` is a single line, `@AGENTS.md`, which Claude
Code resolves as an import. Everything longer lives in `ai/`.

Root `AGENTS.md` skeleton:

```markdown
# raneves

Two-sided static portfolio. Vue 3 + Vite, prerendered by vite-ssg. EN + PT. No backend.
Visual source of truth: the design canvas linked in ai/initial-plan.md.

## Commands
pnpm dev / build / preview / lint / check
(check = type-check + boundaries + locale parity + budget + contrast)

## Non-negotiable rules
1. Module boundaries: modules/* may import core/, content/, i18n/ - never each other.
   core/ never imports modules/. content/ imports nothing. Enforced by dependency-cruiser.
2. Content is data, never markup. No v-html anywhere. Inline links are TextSegment
   objects rendered by <RichText>.
3. Where a string lives: has structure (links, arrays, dates, images) -> src/content/{en,pt}/.
   Bare UI label -> src/i18n/locales/. No exceptions, no third place.
4. Every content entry has a stable `id` and MUST exist in both en/ and pt/.
   check-locales.ts fails CI on a mismatch.
5. Adding a company/project/series is a DATA edit. If you find yourself writing a new
   component for a new entry, stop - the data model is wrong. See ai/cookbook.md.
6. No dependency version younger than 7 days. pnpm minimumReleaseAge=10080. Never add
   an exclusion. Runtime deps are vue, vue-router, vue-i18n. A fourth needs an ADR.
7. Components read semantic tokens (--bg-1, --fg-muted). Never a literal hex outside
   core/styles/themes.css. Never put --fg-subtle on a maroon fill.
8. Animate transform, opacity, and registered custom properties only. There is NO
   main-thread animation on this site; do not introduce one. No scroll-time rAF.
   Every animation needs a reduced-motion path and a resting state of opacity: 1.
9. Keep files small: aim for <60 lines per SFC block, <120 per file. Extract child
   components into a folder named after the parent, never a flat bucket.
10. Every image needs explicit width/height from the media manifest. Frame ratios are
    the closed Ratio union: 3:2, 2:3, 1:1, 21:9. A fifth ratio is a type error.

## Comment style
Comment only the non-obvious why. No file/module header blocks, no JSDoc on functions,
params or type fields. Names and types are the documentation. Never use em dashes.

## Layout / Budget / Where to look
(the tree, the per-route table, and pointers to ai/cookbook.md, ai/architecture.md, ai/adr/)
```

**Not** in `AGENTS.md`: prose about the design concept, full token values, changelogs, or anything
already visible in the code. Those go in `ai/architecture.md`.

Nested `src/modules/{code,frame}/AGENTS.md` carry module-local rules only (Frame: "ratios come from
the manifest and the Ratio union; never more than 2 concurrent videos; the Sound image wrapper needs
isolation: isolate").

**`ai/cookbook.md`** is the direct answer to "I do not want to hunt for the right place": one section
per growth task, each 2-3 numbered steps with real paths and a real example.

**ADRs** in `ai/adr/`, ~15 lines each: pnpm + cooldown, prerender over SPA and over Nuxt, plain CSS
over Tailwind, vue-i18n with TS locale files over JSON, no animation library, no WebGL, no Lenis, no
Pinia, module boundaries, content-as-data, **and one recording why THROUGHLINE was dropped**, so a
future agent does not helpfully reinvent it.

---

## Accessibility

**Two independent motion switches:** OS `prefers-reduced-motion`, and a visible `Motion: on/off`
toggle in the footer writing `data-motion="off"` on `<html>`, persisted in `localStorage`. Both gate
the same CSS block, listened to live via `matchMedia().addEventListener('change')`.

**Nothing is hidden waiting for a trigger that never fires.** Every revealed element's resting state
is `opacity: 1`; reveals only ever animate *from* an offset.

**Focus, two-tone so it survives any surface** including a photograph:

```css
:where(a, button, [tabindex], summary, input):focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--focus-halo);
}
```

On gallery photographs the offset goes to 3px and the halo does the work.

**Keyboard:** skip link first in tab order. Route changes announce into a polite live region in the
active locale. The gallery is a real list of `<a>`/`<button>` in DOM order matching visual order -
exactly why CSS `columns` is banned - each labelled from `frame.counter`. The lightbox returns focus
to the thumbnail that opened it.

Body text >=16px (body copy here is 17.5-19px), touch targets >=44x44 and >=56px on the home gates,
`prefers-contrast: more` promotes borders and muted text, `lang` correct per locale. A keyboard and
VoiceOver walkthrough **in both locales** is a launch gate, not a post-launch audit.

---

## Assets Rafael needs to produce

Universal: RAW capture, 50-85mm equivalent, f/2.8-4, subject 1.5-2m clear of the background, no
patterned clothing, 15-20% headroom for crop latitude.

**The hero portrait is now on the critical path and is the single highest-priority asset.** The
design composites a cut-out over a gradient, so it must be delivered **cut out with a clean alpha
channel**. The 500x500 cut-out currently standing in from the old site is far too small for a 424px
display at 2x and its edges are rough.

1. **Hero portrait (blocking)** - 3/4 length, standing, plain seamless mid-grey wall (~#C9CBCE) so
   the cut-out is clean. One large soft key at 45deg camera-left, feathered; subtle rim from behind
   camera-right at 1/4 power for edge separation against a dark background. Direct to lens.
   **Deliver both the as-shot frame and a cut-out PNG with alpha at 1600px tall minimum.**
2. **Environmental / desk** - 28-35mm, ambient plus practicals, deliberate negative space on the
   right third for text overlay. Engineering page. *3:2, 4000px.*
3. **Camera in hand** - single harder source, deep shadows, a warm tungsten practical in frame to
   sit inside the maroon. Frame page. *4:5, 4000px.*
4. **Brass / instrument** - dark background, warm key, clean specular highlight on the brass. Sound
   chapter. *4:5, 4000px, plus alpha cut-out.*
5. **Hands, two frames** - on a keyboard, and on a camera or valves. Tight, shallow. *1:1, 3000px.*

**Photography.** 40-60 images curated as **4-6 series of 8-12**. **Only the four ratios** - `3:2`,
`2:3`, `1:1`, `21:9`; every frame crops to one, and that constraint is enforced in the type system.
Export **JPEG q90, long edge 2560px, 8-bit, sRGB IEC61966-2.1 embedded** (not AdobeRGB or ProPhoto,
which render desaturated in browsers), metadata stripped except copyright, **max 3MB per file**.

**Video.** 4-6 clips. *Loops:* 6-12s, **no audio track at all**, 1920x1080 or 1920x816, constant 24
or 25fps. *Pieces:* 1-2 proper edits up to 60-90s, lightbox only. Masters ProRes 422 or H.264 CRF 16.
Build output is AV1 (`crf 32`, `cpu-used 4`) plus H.264 High at 480/720/1080p, targeting **an 8s
1080p loop <=900KB in AV1** - if a clip will not hit that it is too busy for a loop, recut it.
**Every video needs a poster frame exported as a separate still**; the poster is what loads. Speech
needs a `.vtt` per locale.

**Already in hand:** the Brass Fusion photograph from the old site is real, usable content and is
already wired into the Sound chapter. A higher-resolution original would be better if one exists.

**Logos:** Unbabel, Grama, Plug Events, FCTUC, Brass Fusion, Sala-Z, ALT21, X-Hedge, Unravel.
**SVG only**, text converted to outlines, no embedded rasters, `viewBox` normalised, all
`fill`/`stroke` attributes stripped so CSS can set `fill: currentColor`. **One monochrome variant
each** - full-colour logos would wreck all three palettes. <=4KB each after SVGO.

**Favicon and OG:** favicon needs designing now that the line glyph is gone; a brass `RN` monogram on
ink is the obvious candidate. `icon.svg`, `favicon.ico` 32x32, `apple-touch-icon.png` 180x180 **with
a solid background**. **Three OG images, one per theme**, 1200x630, under 300KB.

---

## Open items for Rafael

1. **Portuguese copy.** The old site is English only, so all PT content is new writing: ~14 timeline
   entries, 6 case studies, the about text, the Frame sections, and the UI labels. Phase 1 stubs
   `pt/` with matching `id`s so the build stays green while he writes.
2. **The bracketed placeholders on the Frame board**: series titles, years, frame counts, the film
   runtime, where he shoots, and his instrument.
3. **Three contradictions in his own old content**, unresolved:
   - "Senior Frontend Developer" (About) vs "lead frontend developer" (Unbabel). Currently rendered
     as the former on home and the latter as the Unbabel role, which is coherent, but confirm.
   - Location "Coimbra, Portugal" vs Unbabel dated "Lisbon". Assumed he lives in Coimbra and
     Unbabel is Lisbon-based.
   - Unbabel dated "2023 - Present" in the heading but the body says "since August 2022".
4. Whether the timeline's extra events (first line of code, music school, teaching, Brass Fusion
   founding) can be dated. The path needs ~14 real events and only ~8 are documented.
5. The 6 case studies need his words for problem / approach / role / outcome.
6. Confirm the 4-6 series groupings before the media pipeline is built, since folder names become
   URLs.

---

## Phases

Each phase ends in something viewable at `pnpm dev` / `pnpm preview`. **No deployment in v1.**

**Phase 0 - guardrails first.** `git init`; pnpm with `minimumReleaseAge: 10080` **before the first
install**; Vite + Vue + TS scaffold; `vite-ssg`; oxlint / eslint-plugin-vue / prettier with the
file-size warnings; dependency-cruiser rules; size-limit; `pnpm check` plus a GitHub Actions workflow
running it. `AGENTS.md`, `CLAUDE.md`, `ai/cookbook.md`, `ai/architecture.md`, the ADR set.
*Ends: an empty but fully-gated project where every rule above is machine-checked.*

**Phase 1 - the foundation.** `core/styles/{reset,tokens,themes}.css` with all three themes;
`check-contrast.ts` seeded with the measured table above; the three font files subsetted (with PT
diacritics) and metric-matched; i18n schema + EN/PT locale files + `useContent()`; locale-aware
router built from the module registry; `modules/_template/`; `core/components` primitives
(`RichText`, `Img`, `Link`, `Dialog`, `SectionTag`, `Chip`, `StateChip`); `App.vue` shell with the
theme container, skip link and live region. All real copy migrated from the old `text.ts` into
`content/en/`, with `content/pt/` stubbed to the same `id` set.
*Ends: six themed routes (3 x 2 locales) with real content and real type.*

**Phase 2 - motion.** `useThemeTransition`, `usePaletteLean`, `useSplitLines`, `useReveal`, plus the
reduced-motion and no-JS paths in the same pass. Smaller and lower-risk than the old Phase 2, since
there is no path-morph to build.
*Ends: the temperature shift, the gate lean and the hero entrance all work, desktop and mobile.*

**Phase 3 - Home.** Build `Main.dc.html` for real. Needs the hero portrait cut-out.
*Ends: a finished home page in both locales.*

**Phase 4 - Engineering.** The `01/02/03` sections, the `kind` renderer map, the widened ~14-event
path, six case-study routes generated from `projects.ts`, plus the contact section that the mockup
still lacks. Logos and portrait 2 needed. **Prove the contract here: add a throwaway 15th timeline
entry and confirm it takes one data edit.**
*Ends: Home + Engineering complete in EN and PT, Frame teasing. The v1 milestone.*

**Phase 5 - media pipeline + gallery.** `build-media.ts`, the manifest, `<Img>` wired to it, the
four-ratio dense grid, the `<dialog>` lightbox, video poster/loop logic.
*Ends: the gallery works on placeholder frames, and dropping a folder in adds a series.*

**Phase 6 - Frame.** The four sections for real, per-series routes. Portraits 3 and 4 plus all
photography and video needed.
*Ends: both sides complete.*

**Phase 7 - polish.** Reduced-motion, keyboard and VoiceOver gate in both locales; favicon and OG
images; Lighthouse assertions tightened.

**Later, out of scope now:** hosting, domain, CSP and cache headers. See Appendix A.

---

## Verification

**`pnpm check`, locally and in CI:**
- `pnpm install --frozen-lockfile`, plus the **dependency-age gate**: fail if any locked version was
  published under 7 days ago, or if `minimumReleaseAge` is missing or the exclude list is non-empty.
- `vue-tsc --noEmit`. **A missing PT message key fails here.**
- `pnpm lint` - oxlint + eslint-plugin-vue + prettier. File-size rules report as warnings.
- `depcruise src` - the three boundary rules and no cycles. **A cross-module import fails the build.**
- `check-locales.ts` - entry-`id` parity across `en/` and `pt/` for every collection.
- `check-contrast.ts` - every token pair still meets AA against every surface in its theme.
- `size-limit` - per-route budgets.
- Lighthouse CI against `pnpm preview` on `/`, `/code`, `/frame`.

**Manual, per phase:**
- `pnpm build && pnpm preview`, then **`grep` the built HTML** and confirm real content is in the
  markup, not an empty shell. This is the specific failure of the old site.
- Confirm `data-theme` and the correct `lang` are in the served HTML for each route in both locales.
- Switch language on every route; confirm the route is preserved and nothing falls back to EN.
- Throttle to 4G + 4x CPU. Confirm the portrait is the preloaded LCP image and that no main-thread
  animation exists. Watch the palette lean specifically for paint cost.
- Toggle OS reduced-motion and the footer switch mid-session; both must take effect without reload
  and nothing may stay invisible.
- Disable JS entirely: every route must render, themed, in the right language, navigable.
- Tab through all three themes in both locales; the focus ring must survive photographs.
- **The maintainability test, every phase:** add a throwaway entry to each collection and confirm it
  renders with no component changes. If it needs code, the data model is wrong.
- Verify both font licence files at install time.

---

## Appendix A - deployment, when he wants it

Out of scope for v1, recorded so the design is not lost. **Cloudflare Pages** + own domain, because
GitHub Pages cannot set HTTP response headers and so cannot serve a real CSP, HSTS or
`frame-ancestors`, and gives no cache-control tuning for gallery images.

```
# public/_headers
/*
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; media-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'; object-src 'none'; upgrade-insecure-requests
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Cross-Origin-Opener-Policy: same-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable
/fonts/*
  Cache-Control: public, max-age=31536000, immutable
```

`style-src 'unsafe-inline'` is required because the palette lean and the theme transition set CSS
custom properties from JS, landing as inline `style` attributes. Scoped SFC styles compile to real
stylesheets and are fine. `script-src` needs **no** inline allowance. To tighten later, move
JS-driven variables onto a constructed `CSSStyleSheet`.

Analytics: drop the old site's `vue-gtag`. Start with none, which keeps `script-src` clean and gives
nothing to consent to. If numbers are wanted, Cloudflare Web Analytics is cookieless and free at the
cost of adding `static.cloudflareinsights.com` to `script-src`. Add `hreflang` alternates and a
per-locale sitemap at deploy time.
