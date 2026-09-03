import type { Project } from "./types.ts"

// covers are interim static paths under public/images/projects/<id>/ - Phase 5's
// build-media.ts will treat src/content/media/** as the real source and generate
// optimized rungs from there, replacing these with manifest-driven paths
export const projects: Project[] = [
  {
    id: "unbabel-portal",
    title: "Unbabel Portal",
    year: 2023,
    stack: ["Vue 2", "Vue 3", "E2E Testing", "Unit Testing", "JavaScript", "TypeScript"],
    cover: {
      src: "/images/projects/unbabel-portal/cover.png",
      width: 767,
      height: 439,
      dominant: "#1b1d21",
    },
    links: {
      live: "https://unbabel.com/sv/introducing-the-unbabel-portal-a-new-way-to-manage-customer-service-language-operations/",
    },
  },
  {
    id: "x-hedge",
    title: "X-Hedge",
    year: 2022,
    stack: ["Vue 2", "TypeScript", "Java", "Quarkus", "Azure", "AWS", "Storybook"],
    cover: {
      src: "/images/projects/x-hedge/cover.png",
      width: 1197,
      height: 648,
      dominant: "#0a0d12",
    },
    links: { live: "https://www.alt21.com/x-hedge/" },
  },
  {
    id: "sala-z",
    title: "Sala-Z",
    year: 2020,
    stack: ["Vue 2", "TypeScript", "Java", "Quarkus", "Azure", "AWS", "Storybook"],
    cover: {
      src: "/images/projects/sala-z/cover.jpeg",
      width: 1200,
      height: 713,
      dominant: "#c391b0",
    },
    links: { live: "https://www.grama.io/work/sala-z.html" },
  },
  {
    id: "unravel",
    title: "Unravel",
    year: 2023,
    stack: ["Vue 3"],
    cover: {
      src: "/images/projects/unravel/cover.png",
      width: 1917,
      height: 915,
      dominant: "#1b1d21",
    },
    links: {
      live: "https://unravel-a3818.web.app/",
      code: "https://github.com/rafa98neves/unravel",
    },
  },
  {
    id: "plug-events",
    title: "Plug Events",
    year: 2022,
    stack: ["Vue 2", "TypeScript"],
    cover: {
      src: "/images/projects/plug-events/cover.png",
      width: 1452,
      height: 1477,
      dominant: "#1b1d21",
    },
    links: { live: "https://www.plug.events/space/_/_/events" },
  },
]
