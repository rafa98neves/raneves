<script setup lang="ts">
import PageTopBar from "@/core/components/PageTopBar.vue"
import PageFooter from "@/core/components/PageFooter.vue"
import FrameWhy from "../components/FrameWhy.vue"
import FrameSeries from "../components/FrameSeries.vue"
import FrameGrid from "../components/FrameGrid.vue"
import FrameSound from "../components/FrameSound.vue"
</script>

<template>
  <div class="page">
    <PageTopBar />
    <FrameWhy class="section" />
    <FrameGrid class="section" />
    <FrameSeries class="section" />
    <FrameSound class="section" />
    <PageFooter />
  </div>
</template>

<style scoped>
/* a maroon wash on top of the flat --bg-0: the base theme color alone reads
   as near-black rather than red at this luminance (human color perception
   drops off sharply in near-darkness) - see ai/adr for the palette change
   this went with. --maroon-rgb lives in themes.css; the alpha/shape here is
   layout, not a color value, so it stays a plain declaration */
.page {
  min-height: 100vh;
  padding: var(--space-6) var(--gutter) var(--space-9);
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
  background-color: var(--bg-0);
  background-image: radial-gradient(
    120% 60% at 50% -10%,
    rgba(var(--maroon-rgb), 0.3) 0%,
    transparent 65%
  );
}

.section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>
