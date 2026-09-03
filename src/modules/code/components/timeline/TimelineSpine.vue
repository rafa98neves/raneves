<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { useContent } from "@/content"
import { entryRenderers } from "./entry-renderers"
import { formatDateRange } from "./format-date-range"

const { t, locale } = useI18n()
const { timeline } = useContent()

// most recent first - the current role leads, not the oldest entry
const sorted = computed(() => [...timeline.value].sort((a, b) => (a.start > b.start ? -1 : 1)))
</script>

<template>
  <div class="spine">
    <component
      :is="entryRenderers[event.kind]"
      v-for="event in sorted"
      :key="event.id"
      :event="event"
      :date-range="formatDateRange(event.start, event.end, locale, t('code.present'))"
    />
  </div>
</template>

<style scoped>
.spine :deep(.row:last-child) {
  border-bottom: 1px solid var(--border-subtle);
}
</style>
