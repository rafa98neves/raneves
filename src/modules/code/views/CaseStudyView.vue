<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import { useContent } from "@/content"
import { useNav } from "@/core/composables/useLocale"
import { useEntranceReady } from "@/core/motion/useEntranceReady"
import PageTopBar from "@/core/components/PageTopBar.vue"
import RichText from "@/core/components/RichText.vue"
import Chip from "@/core/components/Chip.vue"
import Link from "@/core/components/Link.vue"
import PageFooter from "@/core/components/PageFooter.vue"

const route = useRoute()
const { t } = useI18n()
const { projects } = useContent()
const nav = useNav()
const { ready } = useEntranceReady()

const project = computed(() => projects.value.find((p) => p.id === route.params.slug))
</script>

<template>
  <div v-if="project" class="page">
    <!-- the cover as a low-opacity backdrop, not an inline image - a scrim
         gradient on top guarantees the text stays readable regardless of
         how bright any given project's cover happens to be -->
    <div class="backdrop-clip">
      <img class="backdrop" :src="project.cover.src" alt="" aria-hidden="true" />
    </div>
    <div class="scrim" />

    <div class="content">
      <PageTopBar :back-label="t('code.backToWork')" :back-to="`${nav.code.value}#selected-work`" />

      <h1 class="title rise" :class="{ 'entrance-ready': ready }">{{ project.title }}</h1>
      <p class="summary rise" :class="{ 'entrance-ready': ready }" style="animation-delay: 80ms">
        {{ project.summary }}
      </p>

      <div
        v-if="project.stack.length"
        class="stack rise"
        :class="{ 'entrance-ready': ready }"
        style="animation-delay: 160ms"
      >
        <Chip v-for="tech in project.stack" :key="tech">{{ tech }}</Chip>
      </div>

      <div class="links rise" :class="{ 'entrance-ready': ready }" style="animation-delay: 200ms">
        <Link v-if="project.links.live" :href="project.links.live">Live</Link>
        <Link v-if="project.links.code" :href="project.links.code">Code</Link>
        <Link v-if="project.links.article" :href="project.links.article">Article</Link>
      </div>

      <div class="case-study">
        <div>
          <h2>Problem</h2>
          <RichText :paragraphs="project.problem" />
        </div>
        <div>
          <h2>Role</h2>
          <RichText :paragraphs="project.role" />
        </div>
      </div>

      <PageFooter />
    </div>
  </div>
</template>

<style scoped>
.page {
  position: relative;
  min-height: 100vh;
}

/* overflow: hidden lives here, scoped to just the backdrop, rather than on
   .page itself - .page holds the sticky top bar and footer, and overflow
   other than visible on an ancestor breaks position: sticky against the
   viewport (it becomes the sticky containing block instead) */
.backdrop-clip {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

/* blurred and desaturated, not just faded: at low opacity alone, a busy UI
   screenshot (cards, charts, buttons) still reads as legible competing
   content, not ambient texture - blur is what actually turns it into
   background rather than a second, harder-to-read page underneath the text */
.backdrop {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.22;
  filter: blur(12px) saturate(0.6);
  transform: scale(1.05); /* avoids a blurred, transparent edge from the blur radius */
}

/* never fully transparent, even at the "clearest" band in the middle - the
   first version dropped to transparent there and the backdrop was legible
   enough to fight the text on top of it */
.scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(var(--bg-0-rgb), 0.94) 0%,
    rgba(var(--bg-0-rgb), 0.55) 25%,
    rgba(var(--bg-0-rgb), 0.55) 55%,
    rgba(var(--bg-0-rgb), 0.94) 100%
  );
}

.content {
  position: relative;
  padding: var(--space-6) var(--gutter) var(--space-9);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  max-width: 60rem;
  margin: 0 auto;
}

/* same resting-state-first pattern as HomePortraitBand.vue: fully visible by
   default (matches the prerendered HTML, so no-JS visitors see the finished
   page), the rise-in only plays once .entrance-ready is added on mount */
.rise {
  opacity: 1;
  transform: translateY(0);
}

.rise.entrance-ready {
  animation: rise-in var(--dur-slow) var(--ease-out-expo) both;
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  font-size: var(--text-row);
  line-height: var(--leading-row);
  font-weight: 500;
  letter-spacing: var(--track-row);
  color: var(--fg);
}

.summary {
  font-size: var(--text-lg);
  color: var(--fg-muted);
}

.stack,
.links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.case-study {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  margin-top: var(--space-6);
}

.case-study h2 {
  font-size: var(--text-2xs);
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  color: var(--fg-subtle);
  margin: 0 0 var(--space-2);
}
</style>
