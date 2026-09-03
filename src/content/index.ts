import { computed } from "vue"
import { useI18n } from "vue-i18n"
import type { SupportedLocale } from "@/i18n"
import { en } from "@/i18n/locales/en"
import { pt } from "@/i18n/locales/pt"
import { timeline } from "./timeline"
import { projects } from "./projects"
import { series } from "./series"
import { skills } from "./skills"
import { profile } from "./profile"

const messagesByLocale = { en, pt }

// merges locale-independent facts (this directory) with the active locale's
// translated prose (src/i18n/locales/*.ts) into the flat shape components
// consume - see the "content is data" section in ai/initial-plan.md for why
// the split exists and where each piece lives
export function useContent() {
  const { locale } = useI18n()
  const messages = computed(() => messagesByLocale[locale.value as SupportedLocale] ?? en)

  return {
    profile: computed(() => ({ ...profile, ...messages.value.profile })),
    home: computed(() => messages.value.content.home),
    code: computed(() => messages.value.content.code),
    frame: computed(() => messages.value.content.frame),
    timeline: computed(() =>
      timeline.map((event) => ({ ...event, ...messages.value.content.timeline[event.id] })),
    ),
    projects: computed(() =>
      projects.map((project) => ({ ...project, ...messages.value.content.projects[project.id] })),
    ),
    series: computed(() =>
      series.map((item) => ({ ...item, ...messages.value.content.series[item.id] })),
    ),
    skills: computed(() =>
      skills.map((group) => ({ ...group, label: messages.value.skills[group.id] })),
    ),
  }
}
