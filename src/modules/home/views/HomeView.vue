<script setup lang="ts">
import HomeTopBar from "../components/HomeTopBar.vue"
import HomePortraitBand from "../components/HomePortraitBand.vue"
import HomeGates from "../components/HomeGates.vue"
</script>

<template>
  <section class="home">
    <HomeTopBar class="above-portrait" />
    <HomePortraitBand />
    <HomeGates class="gates-anchor above-portrait" />
  </section>
</template>

<style scoped>
/* background is owned by core/styles/motion.css, not here - it needs to be a
   global (unscoped) rule so its :has() can react to HomeGates.vue's hover
   state, which Vue's scoped-CSS attribute selectors would otherwise break */
/* min-height, not height + overflow:hidden: the vh-based caps in
   HomePortraitBand.vue (on the portrait and the eyebrow/name margins) are
   what keep this fitting in one viewport on common laptop heights - if some
   future asset still overflows a very short viewport, degrading to a small
   scroll is far better than clipping the gates out of reach entirely */
.home {
  min-height: 100vh;
  padding: var(--space-5) var(--gutter-home) var(--space-5);
  display: flex;
  flex-direction: column;
}

/* the portrait no longer sits in a flex: 1 wrapper eating leftover space
   (it's position: fixed now, see HomePortraitBand.vue), so nothing pushes
   this to the bottom of a tall viewport without it - margin-top: auto
   claims all the leading space instead, keeping the gates anchored low */
.gates-anchor {
  margin-top: auto;
}

/* HomePortraitBand.vue's fixed portrait + scrim sit behind .text-content
   for the same reason this needs it: position: fixed content always
   paints above plain static content regardless of DOM order, so without
   an explicit stacking context of its own, this would render UNDER the
   scrim instead of over it - see the comment in HomePortraitBand.vue. */
.above-portrait {
  position: relative;
  z-index: 1;
}
</style>
