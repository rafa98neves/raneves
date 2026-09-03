# 0006 - No animation library

**Context.** The design needs a route-level theme transition, a scroll
reveal, a font-gated hero entrance, and a hover-triggered palette lean.
GSAP, `motion-v`, and `@vueuse/motion` were all considered (GSAP has been
fully free, including former Club plugins, since April 2025 - being free
doesn't make it free of bytes).

**Decision.** None of them. Native CSS covers every effect actually needed:
`animation-timeline: view()` for scroll reveals, the View Transitions API
for the route cross-fade, `@property` + `transition` for the palette lean,
and one small `document.fonts.ready`-gated composable for the hero entrance.
Total: `core/motion/` (two files, under 60 lines combined) plus
`core/styles/motion.css`.

**Consequences.** Runtime dependency count stays at four (`vue`,
`vue-router`, `vue-i18n`, `@unhead/vue`) instead of five-plus. Every
animated element's CSS default is the fully visible resting state - motion
is added on top by a supported browser or by JS marking a class, never
required for correctness. If a genuinely scroll-scrubbed, pinned sequence is
ever needed (something CSS truly cannot do), the documented escape hatch is
a dynamic `import('gsap')` scoped to the one route that needs it - not a
project-wide dependency.
