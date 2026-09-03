<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useContent } from "@/content"
import { useTypewriter } from "@/core/motion/useTypewriter"
import RichText from "@/core/components/RichText.vue"
import SectionTag from "@/core/components/SectionTag.vue"

const { t } = useI18n()
const { frame } = useContent()

const { visibleParagraphs, done } = useTypewriter(() => frame.value.why, "frame-why")
</script>

<template>
  <section class="why">
    <SectionTag accent>{{ t("frame.sectionWhy") }}</SectionTag>
    <!-- the ghost reserves the FINAL height (full text) so the growing typed
         text never pushes "02 - Series" down as it types - both share a
         grid cell; the ghost's size wins, the visible one just paints -->
    <div class="statement-frame">
      <RichText class="statement ghost" aria-hidden="true" :paragraphs="frame.why" />
      <RichText class="statement" :class="{ typing: !done }" :paragraphs="visibleParagraphs" />
    </div>
  </section>
</template>

<style scoped>
.why {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.statement-frame {
  display: grid;
}

.statement-frame > * {
  grid-area: 1 / 1;
}

.ghost {
  visibility: hidden;
}

.statement {
  font-size: var(--text-statement);
  line-height: var(--leading-statement);
  font-weight: 500;
  letter-spacing: var(--track-statement);
  max-width: 70rem;
}

.statement.typing :deep(p:last-child)::after {
  content: "";
  display: inline-block;
  width: 0.05em;
  height: 0.9em;
  margin-left: 0.08em;
  background: var(--accent);
  vertical-align: -0.05em;
  animation: cursor-blink 1s step-end infinite;
}

@keyframes cursor-blink {
  0%,
  50% {
    opacity: 1;
  }
  50.01%,
  100% {
    opacity: 0;
  }
}
</style>
