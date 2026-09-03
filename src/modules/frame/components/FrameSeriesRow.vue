<script setup lang="ts">
import { computed } from "vue"
import type { Series } from "@/content/types"
import EntryRow from "@/core/components/EntryRow.vue"

const props = defineProps<{ series: Series }>()

const kindLabel = computed(() => (props.series.kind === "film" ? "Film" : "Photo essay"))
</script>

<template>
  <EntryRow>
    <template #title>{{ series.title }}</template>
    <template #body>{{ series.intent }}</template>
    <template #right>
      <div class="year">{{ series.year }}</div>
      <div class="meta">
        {{ kindLabel }}<template v-if="series.runtime"> &middot; {{ series.runtime }}</template>
      </div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--accent)"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M5 19 19 5" />
        <path d="M9 5h10v10" />
      </svg>
    </template>
  </EntryRow>
</template>

<style scoped>
.year {
  font-size: var(--text-xl);
  letter-spacing: 0.02em;
}

.meta {
  font-size: var(--text-2xs);
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  color: var(--fg-subtle);
  margin-bottom: var(--space-4);
}
</style>
