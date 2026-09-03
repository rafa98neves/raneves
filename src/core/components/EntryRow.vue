<script setup lang="ts">
// the shared row grammar behind both the Engineering timeline and the Frame
// series list - "reuses the row grammar exactly" per ai/initial-plan.md means
// this lives in core/, since modules/code and modules/frame may not import
// from each other
withDefaults(defineProps<{ accent?: boolean }>(), { accent: false })
</script>

<template>
  <div class="row reveal" :class="{ accent }">
    <div class="row-left">
      <div class="row-title"><slot name="title" /></div>
      <div class="row-body"><slot name="body" /></div>
    </div>
    <div class="row-right"><slot name="right" /></div>
  </div>
</template>

<style scoped>
.row {
  padding: var(--space-8) 0 var(--space-7) 0;
  border-top: 1px solid var(--border-subtle);
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--space-7);
  align-items: start;
}

.row.accent {
  padding-left: var(--space-5);
  padding-right: var(--space-5);
  border-left: 2px solid var(--accent);
}

.row-title {
  font-size: var(--text-row);
  line-height: var(--leading-row);
  font-weight: 500;
  letter-spacing: var(--track-row);
  margin-bottom: var(--space-4);
  color: var(--fg);
}

.row.accent .row-title {
  color: var(--accent);
}

.row-body {
  font-size: var(--text-lg);
  line-height: var(--leading-body);
  color: var(--fg-muted);
  max-width: 40rem;
}

.row-right {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-2);
}

/* the fixed 320px right column is what was causing real horizontal overflow
   on mobile (measured: a 375px viewport rendering a 646px-wide page) - below
   this width the two columns stack instead of sitting side by side */
@media (max-width: 640px) {
  .row {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .row-right {
    text-align: left;
    align-items: flex-start;
  }
}
</style>
