import { computed, onMounted, onUnmounted, ref } from "vue"
import type { Paragraph, TextSegment } from "@/i18n/schema"

// the one deliberate exception to "no main-thread animation" (ai/adr/0006,
// ai/adr/0011): a genuine character-by-character reveal across wrapped,
// multi-line rich text cannot be done in CSS alone - the classic
// steps()+width typewriter trick only works for a single unwrapped line.
// this is bounded and short-lived (a few seconds, once, on mount), not a
// permanent scroll-tied loop, which is what those rules actually guard
// against - see the note in AGENTS.md rule 7.
// sessionKey scopes the "already played" flag to sessionStorage, not a plain
// module-level variable - a module-level flag would also survive route
// changes, but sessionStorage is what actually matches "once per session":
// cleared when the tab closes, kept across a reload of the same tab.
export function useTypewriter(source: () => Paragraph[], sessionKey: string, charsPerSecond = 55) {
  const visibleChars = ref(0)
  let timer: ReturnType<typeof setInterval> | null = null
  const storageKey = `typewriter-played:${sessionKey}`

  function hasPlayed(): boolean {
    try {
      return sessionStorage.getItem(storageKey) === "1"
    } catch {
      return false
    }
  }

  function markPlayed() {
    try {
      sessionStorage.setItem(storageKey, "1")
    } catch {
      // storage blocked (e.g. private browsing) - the animation just
      // replays on the next visit instead of failing outright
    }
  }

  const totalChars = computed(() =>
    source().reduce(
      (sum, paragraph) => sum + paragraph.reduce((s, seg) => s + seg.value.length, 0),
      0,
    ),
  )

  const done = computed(() => visibleChars.value >= totalChars.value)

  const visibleParagraphs = computed<Paragraph[]>(() => {
    let remaining = visibleChars.value
    const result: Paragraph[] = []
    for (const paragraph of source()) {
      if (remaining <= 0) break
      const segments: TextSegment[] = []
      for (const segment of paragraph) {
        if (remaining <= 0) break
        if (segment.value.length <= remaining) {
          segments.push(segment)
          remaining -= segment.value.length
        } else {
          segments.push({ ...segment, value: segment.value.slice(0, remaining) })
          remaining = 0
        }
      }
      result.push(segments)
    }
    return result
  })

  function stop() {
    if (timer) clearInterval(timer)
    timer = null
  }

  function start() {
    stop()
    visibleChars.value = 0
    const intervalMs = 1000 / charsPerSecond
    timer = setInterval(() => {
      visibleChars.value += 1
      if (visibleChars.value >= totalChars.value) stop()
    }, intervalMs)
  }

  onMounted(() => {
    if (typeof document === "undefined") {
      visibleChars.value = totalChars.value
      return
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      visibleChars.value = totalChars.value
      return
    }
    if (hasPlayed()) {
      visibleChars.value = totalChars.value
      return
    }
    markPlayed()
    start()
  })

  onUnmounted(stop)

  return { visibleParagraphs, done }
}
