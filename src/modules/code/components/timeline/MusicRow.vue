<script setup lang="ts">
import type { TimelineEvent } from "@/content/types"
import RichText from "@/core/components/RichText.vue"
import Chip from "@/core/components/Chip.vue"
import EntryRow from "@/core/components/EntryRow.vue"

defineProps<{ event: TimelineEvent; dateRange: string }>()
</script>

<template>
  <EntryRow accent>
    <template #title>{{ event.title }}</template>
    <template #body>
      <RichText :paragraphs="event.body" />
    </template>
    <template #right>
      <div class="row-dates">{{ dateRange }}</div>
      <div v-if="event.location" class="row-location">{{ event.location }}</div>
      <div v-if="event.stack.length" class="row-stack">
        <Chip v-for="tag in event.stack" :key="tag">{{ tag }}</Chip>
      </div>
    </template>
  </EntryRow>
</template>

<style scoped>
.row-dates {
  font-size: var(--text-xl);
  letter-spacing: 0.02em;
}

.row-location {
  font-size: var(--text-2xs);
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  color: var(--fg-subtle);
  margin-bottom: var(--space-4);
}

.row-stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  justify-content: flex-end;
}

@media (max-width: 640px) {
  .row-stack {
    justify-content: flex-start;
  }
}
</style>
