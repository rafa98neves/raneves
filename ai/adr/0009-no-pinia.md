# 0009 - No Pinia

**Context.** Pinia is the default state-management choice in most Vue 3
projects, including Rafael's day job codebase.

**Decision.** Not used here. There is no shared mutable domain state to
manage - this is a content site. Theme is derived from the matched route
(`useTheme()`); motion preference is a small `ref` plus a `localStorage`
side effect (`useMotionPreference()`); locale is owned by vue-i18n itself.
None of that needs a store.

**Consequences.** One fewer dependency and one fewer concept to explain.
Revisit only if a genuine cross-component mutable state need shows up that
composables + route/i18n state can't cover cleanly - not preemptively.
