<script setup lang="ts"></script>

<template>
  <span class="chip"><slot /></span>
</template>

<style scoped>
.chip {
  font-size: var(--text-2xs);
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  color: var(--fg-subtle);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-sm);
  white-space: nowrap;
}
</style>
