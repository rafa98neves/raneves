import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { projects } from "./src/content/projects.ts"

// vite-ssg's default includedRoutes filters out every dynamic (:slug) route,
// so case-study pages need their concrete paths listed explicitly here -
// this is the only place a new project's route needs registering beyond
// appending to content/projects.ts
const caseStudyRoutes = [
  ...projects.map((project) => `/code/${project.id}`),
  ...projects.map((project) => `/pt/code/${project.id}`),
]

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  ssgOptions: {
    // a custom includedRoutes receives the RAW, unfiltered path list (dynamic
    // segments included) - the default dynamic-route filter is opted out of
    // entirely once you provide your own function, so it has to be redone here
    includedRoutes(paths) {
      const staticPaths = paths.filter((path) => !path.includes(":"))
      return [...staticPaths, ...caseStudyRoutes]
    },
  },
})
