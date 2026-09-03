import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import type { SupportedLocale } from "@/i18n"

export function withLocalePrefix(path: string, locale: SupportedLocale): string {
  const clean = path.startsWith("/") ? path : `/${path}`
  if (locale === "en") return clean
  return clean === "/" ? "/pt" : `/pt${clean}`
}

// the three top-level module paths are a fixed, small set for this site -
// hardcoding them here is simpler than deriving from the module registry
export function useNav() {
  const { locale } = useI18n()
  const currentLocale = computed(() => locale.value as SupportedLocale)

  return {
    home: computed(() => withLocalePrefix("/", currentLocale.value)),
    code: computed(() => withLocalePrefix("/code", currentLocale.value)),
    frame: computed(() => withLocalePrefix("/frame", currentLocale.value)),
  }
}

// the route the footer switcher links to: same page, other locale, current
// locale prefix stripped before the other one is applied
export function useLocaleSwitch() {
  const route = useRoute()
  const { locale } = useI18n()

  const other = computed<SupportedLocale>(() => (locale.value === "en" ? "pt" : "en"))
  const otherPath = computed(() => {
    const path = route.path
    const withoutPrefix = path === "/pt" || path.startsWith("/pt/") ? path.slice(3) || "/" : path
    return withLocalePrefix(withoutPrefix, other.value)
  })

  return { other, otherPath }
}
