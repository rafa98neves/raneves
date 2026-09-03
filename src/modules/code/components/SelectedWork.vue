<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useContent } from "@/content"
import { useNav } from "@/core/composables/useLocale"
import Img from "@/core/components/Img.vue"
import SectionTag from "@/core/components/SectionTag.vue"

const { t } = useI18n()
const { projects } = useContent()
const nav = useNav()
</script>

<template>
  <section id="selected-work" class="work">
    <SectionTag>{{ t("code.sectionWork") }}</SectionTag>
    <div class="grid">
      <RouterLink
        v-for="project in projects"
        :key="project.id"
        class="card reveal"
        :to="`${nav.code.value}/${project.id}`"
      >
        <Img class="cover" :image="project.cover" :alt="project.coverAlt" />
        <div class="meta">
          <div class="title">{{ project.title }}</div>
          <div class="summary">{{ project.summary }}</div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.work {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* minmax(min(320px, 100%), 1fr), not minmax(320px, 1fr): the plain 320px
   floor was a real, measured mobile bug - on a 375px viewport it forced
   every card to 320px wide regardless of available space, overflowing the
   page by 25px. min(320px, 100%) lets the floor itself shrink to the
   container's width when 320px would not fit, so a single narrow column is
   possible instead of a forced horizontal scroll. */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
  gap: var(--space-5);
}

.card {
  display: block;
  text-decoration: none;
  color: var(--fg);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-md);
  overflow: hidden;
}

.cover {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

.meta {
  padding: var(--space-4);
}

.title {
  font-size: var(--text-xl);
  font-weight: 500;
  letter-spacing: -0.02em;
}

.summary {
  font-size: var(--text-sm);
  color: var(--fg-muted);
  margin-top: var(--space-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
