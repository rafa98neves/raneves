<script setup lang="ts">
withDefaults(defineProps<{ accent?: boolean }>(), { accent: false })
</script>

<template>
  <div class="tag" :class="{ accent }"><slot /></div>
</template>

<style scoped>
.tag {
  font-size: var(--text-2xs);
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  color: var(--fg-subtle);
}

.tag.accent {
  color: var(--accent);
}
</style>
