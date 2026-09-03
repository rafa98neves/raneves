import type { Router } from "vue-router"

// Vue Router resolves a navigation's guards before the new route's component
// actually renders, but document.startViewTransition() needs its callback to
// perform the DOM update and signal when it's done - so the guard's promise
// resolves the OUTER promise (letting the router proceed and Vue re-render),
// and the callback's own returned promise waits one microtask (nextTick) for
// that render to land before telling the browser the transition can capture
// its "after" frame. This ordering is the documented Vue Router + View
// Transitions idiom, not something invented here - it is genuinely fiddly to
// get right, which is why it is isolated in one place rather than inlined.
export function installThemeTransition(router: Router, nextTick: () => Promise<void>) {
  router.beforeResolve((to, from) => {
    if (typeof document === "undefined") return
    if (!("startViewTransition" in document)) return
    if (to.path === from.path) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    return new Promise<void>((resolveGuard) => {
      document.startViewTransition(() => {
        resolveGuard()
        return nextTick()
      })
    })
  })
}
