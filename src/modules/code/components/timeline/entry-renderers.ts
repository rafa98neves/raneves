import type { Component } from "vue"
import type { TimelineEventKind } from "@/content/types"
import TimelineRow from "./TimelineRow.vue"
import MusicRow from "./MusicRow.vue"

// Record<K, V> requires every key of TimelineEventKind to be present, so widening
// that union (adding e.g. 'award') fails to compile HERE until a renderer is
// assigned - this is the "compiler is your index" mechanism from ai/initial-plan.md
export const entryRenderers: Record<TimelineEventKind, Component> = {
  role: TimelineRow,
  education: TimelineRow,
  milestone: TimelineRow,
  music: MusicRow,
}
