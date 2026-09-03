import { computed } from "vue"
import { useRoute } from "vue-router"

export type Theme = "ink" | "steel" | "velvet"

export function useTheme() {
  const route = useRoute()
  const theme = computed<Theme>(() => (route.meta.theme as Theme | undefined) ?? "ink")
  return { theme }
}
