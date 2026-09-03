import type { SkillGroup } from "./types"

// "since" years are estimated, not documented per-skill on the old site.
// Grounded where a job's chip list ties a skill to a start date (Grama 2020,
// Unbabel 2023, zkipster 2025); everything else falls back to 2020, when his
// professional career began. Flagged in ai/initial-plan.md Open Items for
// Rafael to correct. Order within each group is deliberate, not alphabetical.
export const skills: SkillGroup[] = [
  {
    id: "languages",
    items: [
      { name: "TypeScript", since: 2020 },
      { name: "JavaScript", since: 2016 },
      { name: "CSS", since: 2016 },
      { name: "SCSS", since: 2020 },
      { name: "Java", since: 2016 },
      { name: ".NET", since: 2025 },
      { name: "Python", since: 2020 },
    ],
  },
  {
    id: "frameworks",
    items: [
      { name: "Vue", since: 2020 },
      { name: "React", since: 2020 },
      { name: "Tailwind", since: 2023 },
      { name: "Spring", since: 2020 },
    ],
  },
  {
    id: "tools",
    items: [
      { name: "AWS", since: 2020 },
      { name: "Azure", since: 2020 },
      { name: "Claude", since: 2024 },
      { name: "Figma", since: 2020 },
      { name: "Git", since: 2016 },
    ],
  },
]
