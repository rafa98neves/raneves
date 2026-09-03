import type { RouteRecordRaw } from "vue-router"
import type { Module } from "@/modules/types"
import type { SupportedLocale } from "@/i18n"
import { withLocalePrefix } from "@/core/composables/useLocale"

const LOCALES: SupportedLocale[] = ["en", "pt"]

export function buildLocalizedRoutes(modules: Module[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  for (const locale of LOCALES) {
    for (const mod of modules) {
      for (const route of mod.routes) {
        const modulePath = [mod.path, route.path].filter(Boolean).join("/")
        const path = withLocalePrefix(modulePath, locale)

        routes.push({
          path,
          name: `${locale}-${route.name}`,
          component: route.component,
          meta: { theme: mod.theme, locale, navKey: mod.navKey },
        })
      }
    }
  }

  // unknown paths fall back to that locale's home, not a dead end - checked
  // by prefix rather than via i18n/useLocale, since a route redirect runs
  // outside component context and only ever sees the raw target path
  routes.push({ path: "/pt/:pathMatch(.*)*", redirect: "/pt", name: "pt-not-found" })
  routes.push({ path: "/:pathMatch(.*)*", redirect: "/", name: "not-found" })

  return routes
}
