# modules/code

- `components/timeline/entry-renderers.ts` is an exhaustive
  `Record<TimelineEventKind, Component>`. Widening `TimelineEventKind` (in
  `content/types.ts`) fails `vue-tsc` right here until you add a renderer -
  that error is the intended workflow, not a bug to route around.
- Dates are never hardcoded strings. `components/timeline/
format-date-range.ts` formats `start`/`end` via `Intl.DateTimeFormat`
  against the active locale, so Portuguese dates are correct for free. Feed
  it raw `'YYYY-MM'` strings from the fact data, never pre-formatted text.
- `/code/:id` case-study routes are generated from `content/projects.ts` in
  the repo root's `vite.config.ts` (`includedRoutes`) - adding a project
  needs no route code, but if a project is renamed/removed, that file's
  route list is where a stale path would need cleaning up too.
- The row layout (`TimelineRow.vue`, `MusicRow.vue`) is a thin wrapper
  around `core/components/EntryRow.vue`, not its own layout. Frame's series
  rows wrap the same `EntryRow` - see `ai/adr/0010`. Don't fork the layout
  here instead of extending `EntryRow`'s props.
