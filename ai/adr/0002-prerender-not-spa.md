# 0002 - Prerender with vite-ssg, not a plain SPA or Nuxt

**Context.** The old site was a client-rendered SPA - fetching it returns
only `<title>Portfolio | Rafael Neves</title>`, nothing else. Fatal for a
portfolio that needs to be findable and shareable. Something has to produce
real static HTML per route.

**Decision.** `vite-ssg`, run at build time (`pnpm build`), no Node server
at runtime. Nuxt was considered and rejected: it solves the same problem for
~12-24 routes at the cost of a framework's worth of conventions and
dependency surface, which cuts against the "fewer dependencies, smaller
attack surface" posture.

**Consequences.** Dynamic routes (`/code/:id`) don't prerender by default -
`vite.config.ts`'s `ssgOptions.includedRoutes` must list every concrete path
explicitly, and a *custom* `includedRoutes` receives the **unfiltered** path
list (dynamic segments included), so it must also filter those out itself -
the default behavior it's replacing did that silently. `@unhead/vue` comes
along as a real dependency because vite-ssg uses it internally for
per-route `<html>` attributes during prerendering (see ADR 0012). Content
updates need a rebuild, which is fine for a git-deployed static site.
