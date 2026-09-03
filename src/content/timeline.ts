import type { TimelineEvent } from "./types"

export const timeline: TimelineEvent[] = [
  {
    id: "edu-bsc-fctuc",
    kind: "education",
    org: { name: "FCTUC" },
    start: "2016-09",
    end: "2018-07",
    stack: [],
  },
  {
    id: "role-grama",
    kind: "role",
    org: { name: "Grama", href: "https://grama.io" },
    start: "2020-01",
    end: "2023-01",
    stack: ["Vue 2", "TypeScript", "Java", "Quarkus", "Azure", "AWS", "Storybook"],
  },
  {
    id: "edu-msc-fctuc",
    kind: "education",
    org: { name: "FCTUC" },
    start: "2019-09",
    end: "2021-07",
    stack: [],
  },
  {
    id: "role-plug-events",
    kind: "role",
    org: { name: "Plug Events", href: "https://about.plug.events/" },
    start: "2022-01",
    end: "2023-01",
    stack: ["Vue 2", "TypeScript"],
  },
  {
    id: "role-unbabel",
    kind: "role",
    org: { name: "Unbabel", href: "https://unbabel.com" },
    start: "2023-01",
    end: "2025-01",
    stack: ["Vue 2", "Vue 3", "E2E Testing", "Unit Testing", "JavaScript", "TypeScript"],
  },
  {
    id: "role-zkipster",
    kind: "role",
    org: { name: "zkipster", href: "https://www.zkipster.com" },
    start: "2025-01",
    end: "present",
    stack: ["Vue 3", "Playwright", ".NET", "Azure"],
  },
]
