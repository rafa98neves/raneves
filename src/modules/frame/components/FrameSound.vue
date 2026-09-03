<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useContent } from "@/content"
import SectionTag from "@/core/components/SectionTag.vue"
import RichText from "@/core/components/RichText.vue"
import Chip from "@/core/components/Chip.vue"

const { t } = useI18n()
const { frame } = useContent()
</script>

<template>
  <section class="sound">
    <SectionTag>{{ t("frame.sectionSound") }}</SectionTag>
    <div class="layout">
      <div class="photo">
        <img src="/images/brass-fusion.jpg" alt="Brass Fusion performing" />
        <div class="wash" />
        <div class="scrim" />
        <div class="caption">Brass Fusion</div>
      </div>
      <div class="copy">
        <div class="title">Brass Fusion</div>
        <RichText class="body" :paragraphs="frame.soundBody" />
        <div class="chips">
          <Chip v-for="chip in frame.soundChips" :key="chip">{{ chip }}</Chip>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sound {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.layout {
  display: grid;
  grid-template-columns: minmax(300px, 620px) 1fr;
  gap: var(--space-7);
  align-items: start;
}

/* isolation: isolate is required here - position: relative alone does not
   create a stacking context, so the mix-blend-mode wash below would otherwise
   climb past this wrapper to the page background and become host-dependent */
.photo {
  position: relative;
  isolation: isolate;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  border-radius: var(--r-lg);
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.78) contrast(1.04) brightness(0.94);
}

.wash {
  position: absolute;
  inset: 0;
  background: var(--maroon);
  mix-blend-mode: multiply;
  opacity: 0.34;
}

.scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(20, 10, 13, 0.62) 0%, rgba(20, 10, 13, 0) 44%);
}

.caption {
  position: absolute;
  left: var(--space-4);
  bottom: var(--space-3);
  font-size: var(--text-2xs);
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  color: var(--fg);
}

.copy {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding-top: var(--space-1);
}

.title {
  font-size: clamp(2.5rem, 2rem + 2vw, 4.25rem);
  line-height: 0.94;
  font-weight: 500;
  letter-spacing: -0.04em;
  color: var(--fg);
}

.body {
  font-size: var(--text-lg);
  line-height: var(--leading-body);
  color: var(--fg-muted);
  max-width: 35rem;
}

.chips {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
