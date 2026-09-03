# 0012 - @unhead/vue as a fourth runtime dependency

**Context.** `document.documentElement.lang = ...` (set imperatively in a
route hook) does nothing during prerendering - there is no `document`
without jsdom mocking - and, even when run client-side, was found to be
silently overwritten by vite-ssg's own build-time `renderDOMHead()` pass,
which always runs and manages `<html>` attributes through `@unhead/vue`
regardless of whether the app calls into it directly.

**Decision.** Added `@unhead/vue` as an explicit runtime dependency and set
the `lang` attribute via its `useHead()` composable in `App.vue`, pinned to
`^2.1.2` - the same major/minor line `vite-ssg` depends on internally, so
`useHead()` here resolves against the *same* head instance vite-ssg's
`renderDOMHead()` later renders, not a second, disconnected one (a version
mismatch would risk two separate unhead instances existing in the same
dependency tree).

**Consequences.** Runtime dependency count is four (`vue`, `vue-router`,
`vue-i18n`, `@unhead/vue`), not three as originally planned. This was
discovered empirically - prerendered pages all showed `lang="en"` regardless
of route until this fix - not predicted in advance. Don't attempt to remove
this dependency by going back to the imperative form; it does not work
under vite-ssg's rendering pipeline.
