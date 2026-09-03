import type { ProjectId, SeriesId, TimelineId } from "@/content/types"

// rich text belongs here, not in content/types.ts: it exists specifically to
// express translated prose with inline structure (a link, a bold span)
// without regressing to v-html-with-raw-HTML - see ai/initial-plan.md
export type TextSegment =
  | { kind: "text"; value: string }
  | { kind: "link"; value: string; href: string }
  | { kind: "strong"; value: string }

export type Paragraph = TextSegment[]

export interface TimelineTranslation {
  title: string
  location?: string
  body: Paragraph[]
}

export interface ProjectTranslation {
  summary: string
  coverAlt: string
  problem: Paragraph[]
  role: Paragraph[]
}

export interface SeriesTranslation {
  title: string
  intent: string
  runtime?: string
}

export interface MessageSchema {
  nav: {
    home: string
    code: string
    frame: string
  }
  common: {
    readMore: string
    backToTop: string
    email: string
    location: string
    linkedin: string
    github: string
    allRightsReserved: string
  }
  home: {
    gateCodeTitle: string
    gateCodeSubtitle: string
    gateFrameTitle: string
    gateFrameSubtitle: string
    gateFrameTeaser: string
  }
  code: {
    sectionAbout: string
    sectionSkills: string
    sectionPath: string
    sectionWork: string
    present: string
    backToWork: string
  }
  frame: {
    sectionWhy: string
    sectionSeries: string
    sectionFrames: string
    sectionSound: string
    why: string
    seriesWip: string
    seriesComingSoon: string
    vscoCta: string
    counter: string // named interpolation: "Frame {n} of {total}"
  }
  a11y: {
    skipToContent: string
    routeChanged: string // named interpolation: "Navigated to {pageTitle}"
  }
  skills: {
    languages: string
    frameworks: string
    tools: string
  }
  profile: {
    role: string
    tagline: string
    location: string
    portraitAlt: string
  }
  // every translatable piece of the timeline/projects/series/home/frame
  // content, keyed by the same ids the locale-independent facts use.
  // Record<ExactUnion, T> - not Record<string, T> - is what makes a missing
  // translation a COMPILE error: TypeScript requires every key of the union
  // to be present, the same "compiler is your index" mechanism the
  // entry-renderers map uses.
  content: {
    timeline: Record<TimelineId, TimelineTranslation>
    projects: Record<ProjectId, ProjectTranslation>
    series: Record<SeriesId, SeriesTranslation>
    home: { intro: Paragraph[]; outro: Paragraph[] }
    code: { about: Paragraph[] }
    frame: {
      why: Paragraph[]
      gallerySummary: Paragraph[]
      soundBody: Paragraph[]
      soundChips: string[]
    }
  }
}
