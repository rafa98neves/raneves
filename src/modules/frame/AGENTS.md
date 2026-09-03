# modules/frame

- `Ratio` (`content/types.ts`) is a closed union: `3:2`, `2:3`, `1:1`,
  `21:9`. A fifth ratio is a type error, not a layout surprise - the dense
  gallery grid (not built yet, Phase 5) depends on there being exactly four
  buckets. Don't widen it casually.
- `FrameSound.vue`'s photo wrapper needs `isolation: isolate`. Without it,
  `position: relative` alone does not create a stacking context, so the
  `mix-blend-mode: multiply` maroon wash climbs past the wrapper to the page
  background instead of compositing against the photo - a host-dependent
  bug that is easy to reintroduce if the wrapper is refactored.
- `FrameSeriesRow.vue` wraps `core/components/EntryRow.vue` - the same
  component Engineering's timeline rows use. Do not copy `TimelineRow.vue`
  from `modules/code` here; that import is blocked by the module-boundary
  rule (`ai/adr/0010`) for exactly this reason.
- No real photography/video exists yet. `content/series.ts` entries all
  have `frames: []`, and `FrameGrid.vue` renders the four-ratio demo, not a
  real gallery. When real frames land (Phase 5, `scripts/build-media.ts`),
  cap concurrently _playing_ videos at 2 - per the original plan, autoplay
  loops on hover/focus/intersection, everything else stays paused.
