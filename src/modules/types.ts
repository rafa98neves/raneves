import type { Component } from "vue"
import type { Theme } from "@/core/composables/useTheme"

export interface ModuleRoute {
  path: string
  component: () => Promise<{ default: Component }>
  name: string
}

export interface Module {
  id: string
  path: string
  theme: Theme
  navKey: "home" | "code" | "frame"
  routes: ModuleRoute[]
}

export function defineModule(module: Module): Module {
  return module
}
