<script setup lang="ts">
import { useI18n } from "vue-i18n"
import SectionTag from "@/core/components/SectionTag.vue"

const { t } = useI18n()
</script>

<template>
  <section class="series">
    <SectionTag>{{ t("frame.sectionSeries") }}</SectionTag>
    <div class="wip">{{ t("frame.seriesWip") }}</div>
  </section>
</template>

<style scoped>
.series {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.wip {
  padding: var(--space-7) 0;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
  font-size: var(--text-2xs);
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  color: var(--fg-subtle);
}
</style>
