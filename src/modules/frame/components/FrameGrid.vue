<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { useContent } from "@/content"
import Img from "@/core/components/Img.vue"
import Link from "@/core/components/Link.vue"
import RichText from "@/core/components/RichText.vue"
import SectionTag from "@/core/components/SectionTag.vue"

const { t } = useI18n()
const { series, frame: frameContent } = useContent()

// one dense wall of images across every series, not grouped - that's
// FrameSeries.vue's job (the text list above this section)
const frames = computed(() => series.value.flatMap((item) => item.frames))
</script>

<template>
  <section class="frames">
    <SectionTag>{{ t("frame.sectionFrames") }}</SectionTag>
    <div class="gallery">
      <div
        v-for="(frame, i) in frames"
        :key="frame.image.src"
        class="item reveal"
        :data-ratio="frame.ratio"
        :style="{
          aspectRatio: frame.ratio.replace(':', ' / '),
          animationDelay: `${i * 60}ms`,
        }"
      >
        <Img class="frame-img" :image="frame.image" :alt="frame.alt" :priority="i === 0" />
      </div>
    </div>
    <div class="gallery-note">
      <RichText :paragraphs="frameContent.gallerySummary" />
      <Link class="vsco-cta" href="https://vsco.co/rafaneves98/gallery">
        <svg class="icon" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9.2" stroke="currentColor" stroke-width="1.6" />
          <circle cx="12" cy="12" r="3.4" stroke="currentColor" stroke-width="1.6" />
        </svg>
        {{ t("frame.vscoCta") }}
      </Link>
    </div>
  </section>
</template>

<style scoped>
.frames {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* each cell's aspect-ratio matches its own photo exactly, so the whole
   frame shows - object-fit: cover only crops when the box and image ratios
   differ, and here they never do. A landscape (3:2) frame spans two
   columns instead of one, so it reads as a wider, more prominent tile
   next to the single-column portraits rather than the same size as them.
   The animation-delay stagger makes .reveal's entrance read as a
   deliberate cascade across the grid instead of every tile animating at
   once - still the same opacity: 1 resting state and @supports-gated
   animation from core/styles/motion.css, just offset per item. */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: var(--space-3);
}

.item[data-ratio="30:22"] {
  grid-column: span 2;
}

.item {
  overflow: hidden;
  border-radius: var(--r-md);
  background: var(--bg-2);
}

.frame-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* named .gallery-note, not .statement - FrameWhy.vue's typewriter text
   already uses .statement, and while Vue's scoped styles keep the CSS
   from colliding, the shared name still made an outside query
   (document.querySelector('.statement')) grab the wrong element during
   verification. Typography matches HomePortraitBand.vue's side columns
   (.copy) - the italic serif voice this same gallerySummary text is
   meant to echo across the two pages. */
.gallery-note {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  max-width: 34rem;
  margin: 0 auto;
  text-align: center;
}

.gallery-note :deep(p) {
  font-size: var(--text-sm);
  line-height: var(--leading-body);
  color: var(--fg-muted);
  font-family: Georgia, "Iowan Old Style", "Times New Roman", serif;
  font-style: italic;
}

/* a lens/aperture mark, not the actual VSCO logo - there's no verified
   brand asset to reach for here, so this stays honestly generic rather
   than guessing at one. Styled like SocialLinks.vue's links (small icon,
   uppercase label, subtle-to-fg on hover) rather than another gallery
   card. */
.vsco-cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--fg-subtle);
  text-decoration: none;
  font-size: var(--text-2xs);
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  transition: color var(--dur-base) var(--ease-default);
}

.vsco-cta:hover,
.vsco-cta:focus-visible {
  color: var(--fg);
}

.icon {
  flex-shrink: 0;
}
</style>
