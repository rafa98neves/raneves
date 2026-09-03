// facts only: locale-independent structure. Translatable prose (titles, body
// text, labels) lives in src/i18n/locales/{en,pt}.ts under the `content`
// namespace, keyed by the ids declared here - see src/content/index.ts for
// where facts and translation get merged.

export interface ImageRef {
  src: string
  width: number
  height: number
  dominant: string
}

export type TimelineId =
  | "edu-bsc-fctuc"
  | "role-grama"
  | "edu-msc-fctuc"
  | "role-plug-events"
  | "role-unbabel"
  | "role-zkipster"

export type TimelineEventKind = "role" | "education" | "music" | "milestone"

export interface TimelineEvent {
  id: TimelineId
  kind: TimelineEventKind
  org?: { name: string; href?: string; logo?: string }
  start: string // 'YYYY-MM'
  end: string | "present"
  stack: string[]
}

export type ProjectId = "unbabel-portal" | "x-hedge" | "sala-z" | "unravel" | "plug-events"

export interface Project {
  id: ProjectId
  title: string // product name, a proper noun - not translated
  year: number
  stack: string[]
  cover: ImageRef
  links: { live?: string; code?: string; article?: string }
}

export type Ratio = "30:22" | "2:3"

export interface Frame {
  image: ImageRef
  alt: string
  kind: "photo" | "video"
  ratio: Ratio
  poster?: ImageRef
}

export type SeriesId = "series-one" | "series-two" | "series-three"

export interface Series {
  id: SeriesId
  year: number
  kind: "photo-essay" | "film"
  frames: Frame[]
}

export type SkillGroupId = "languages" | "frameworks" | "tools"

export interface SkillGroup {
  id: SkillGroupId
  items: { name: string; since: number }[]
}

export interface Profile {
  name: string // proper noun - not translated
  born: number
  portrait: ImageRef
  links: { github: string; linkedin: string; email: string }
}
