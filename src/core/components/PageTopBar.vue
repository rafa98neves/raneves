<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useContent } from "@/content"
import { useNav, useLocaleSwitch } from "@/core/composables/useLocale"

// a case study overrides the back link to "Go back" -> Selected Work instead
// of the default "<- Rafael Neves" -> Home, so the top bar stays a single
// shared component rather than a near-duplicate per page
withDefaults(defineProps<{ backLabel?: string; backTo?: string }>(), {
  backLabel: undefined,
  backTo: undefined,
})

const { t } = useI18n()
const { profile } = useContent()
const nav = useNav()
const { other, otherPath } = useLocaleSwitch()
</script>

<template>
  <div class="topbar">
    <RouterLink class="back" :to="backTo ?? nav.home.value">
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M19 12H5" />
        <path d="M11 18l-6-6 6-6" />
      </svg>
      {{ backLabel ?? profile.name }}
    </RouterLink>
    <nav class="nav">
      <RouterLink :to="nav.code.value">{{ t("nav.code") }}</RouterLink>
      <RouterLink :to="nav.frame.value">{{ t("nav.frame") }}</RouterLink>
      <RouterLink :to="otherPath">{{ other.toUpperCase() }}</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
/* sticky, not static: Code's timeline and Frame's series/grid run long
   enough that the nav (and the case study's "Go back") would otherwise be
   scrolled out of reach for most of the page. A flat var(--bg-0) here
   looked wrong on Frame (a radial maroon wash, not a flat fill - see
   FrameView.vue) and the case study (a blurred cover image) - both keep
   moving underneath a fixed-position bar, so a solid color visibly seams
   against them. Translucent + blurred instead: it reads as the same
   surface tinted, whatever is actually behind it at that scroll position.

   width: 100vw + the negative inline margin is the standard "break out of
   a padded/centered parent" trick: without it the bar (and its
   background) only spans its parent's content box, leaving that parent's
   own padding showing on every side as an untinted gap. Escaping to full
   viewport width and re-adding the same gutter as padding keeps the back
   link/nav sitting exactly where they did before, while the background
   now genuinely reaches both edges.

   The negative top margin does the same thing vertically: every page
   using this bar puts var(--space-6) of padding-top on the container
   around it (CodeView.vue, FrameView.vue, CaseStudyView.vue's .content),
   meant as breathing room above the first section - not above the bar
   itself. Left alone, that padding sits above the bar even at scroll
   position 0, so the bar only reaches the true top of the viewport once
   you scroll past it. Canceling it here means the bar's normal (unstuck)
   position already IS the top of the viewport, so it is flush from the
   very first frame, not just once sticky engages. */
.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  width: 100vw;
  margin-inline: calc(50% - 50vw);
  margin-top: calc(-1 * var(--space-6));
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: var(--space-2);
  padding: var(--space-5) var(--gutter);
  background: rgba(var(--bg-0-rgb), 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.back {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-2xs);
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  color: var(--fg-subtle);
  text-decoration: none;
}

.nav {
  display: flex;
  gap: var(--space-6);
  font-size: var(--text-2xs);
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  color: var(--fg-subtle);
}

@media (max-width: 480px) {
  .nav {
    gap: var(--space-4);
  }
}

.nav a.router-link-active {
  color: var(--fg);
}
</style>
