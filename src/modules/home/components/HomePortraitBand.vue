<script setup lang="ts">
import { computed } from "vue"
import { useContent } from "@/content"
import { useEntranceReady } from "@/core/motion/useEntranceReady"
import RichText from "@/core/components/RichText.vue"
import Img from "@/core/components/Img.vue"
import SocialLinks from "@/core/components/SocialLinks.vue"

const { profile, home } = useContent()
const { ready } = useEntranceReady()

const nameWords = computed(() => profile.value.name.split(" "))
</script>

<template>
  <Img
    class="portrait-bg"
    :class="{ 'entrance-ready': ready }"
    :image="profile.portrait"
    :alt="profile.portraitAlt"
    priority
  />
  <div class="text-content">
    <div class="eyebrow">
      <span>{{ profile.role }}</span>
      <span class="sep">/</span>
      <span>{{ profile.location }}</span>
    </div>

    <h1 class="name" :class="{ 'entrance-ready': ready }">
      <span v-for="(word, i) in nameWords" :key="word" class="word-mask">
        <span class="word" :style="{ animationDelay: `${i * 130}ms` }">{{ word }}</span>
      </span>
    </h1>

    <div class="text-row">
      <div class="code-column">
        <RichText class="copy" :paragraphs="home.intro" />
        <SocialLinks class="socials" :linkedin="false" :email="false" />
      </div>
      <div class="frame-column">
        <RichText class="copy" :paragraphs="home.outro" />
        <SocialLinks class="socials" :github="false" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* see the template comment above .text-content for why this needs an
   explicit stacking context */
.text-content {
  position: relative;
  z-index: 1;
}

.eyebrow {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  margin-top: min(var(--space-9), 3vh);
  font-size: var(--text-2xs);
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  color: var(--fg-subtle);
}

.sep {
  color: var(--fg-sep);
}

/* flex-wrap:wrap matters on narrow viewports - without it, two words at
   --text-hero size were simply wider than the viewport, and the parent's
   overflow:hidden (from .word-mask) silently clipped the tail of "Neves"
   rather than showing an overflow scrollbar, which is why it wasn't caught
   by a pure overflow-width check */
/* text-shadow, not a solid backing shape: the name sits directly over the
   portrait's head/hair now, and a soft dark halo is what lets white type
   hold its own against whatever happens to be behind any given letter,
   without needing a scrim band across the whole name (which would darken
   the face right where it is most visible) */
.name {
  margin: var(--space-3) 0 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.22em;
  font-size: var(--text-hero);
  line-height: var(--leading-hero);
  font-weight: 500;
  letter-spacing: var(--track-hero);
  color: var(--fg);
  text-shadow: 0 4px 12px var(--focus-halo);
}

/* default: fully visible, no transform - matches the prerendered HTML exactly,
   so JS-disabled visitors never see anything but the resting state. Only once
   .entrance-ready is added (after fonts are ready or the 400ms fallback)
   does the rise-in play */
.word-mask {
  display: inline-block;
}

.word {
  display: inline-block;
}

.entrance-ready .word {
  animation: word-rise var(--dur-lazy) var(--ease-out-expo) both;
}

@keyframes word-rise {
  from {
    transform: translateY(45%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.text-row {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: var(--gutter-home);
  pointer-events: none;
}

/* both sides share the one voice now - the italic serif Rafael liked from
   the Frame column. System stack only: the site has no self-hosted font
   files yet (see ai/initial-plan.md's font plan, still Phase 1 work), and
   ADR 0006-adjacent policy is no Google Fonts, so this reaches for what
   every OS already ships rather than a webfont. */
.copy {
  pointer-events: auto;
  text-align: center;
  font-size: var(--text-sm);
  line-height: var(--leading-body);
  color: var(--fg-muted);
  font-family: Georgia, "Iowan Old Style", "Times New Roman", serif;
  font-style: italic;
  max-width: 22rem;
}

/* each column, not .text-row's flex slots directly - the socials moved
   here (split GitHub under Code, LinkedIn/Email under Frame) after
   sitting centered under the name made them nearly illegible over a real
   photo's face */
.code-column,
.frame-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  pointer-events: auto;
}

.socials {
  justify-content: center;
}

/* position: fixed takes it out of .home's flex layout entirely (fixed/
   absolute elements are never flex items, regardless of DOM position), so
   it no longer competes with the text for vertical space the way the old
   flex: 1 wrapper did - free to be sized much larger as a result. Centered
   on the viewport rather than flowing with the page, and painted first in
   the template so normal-flow siblings (with their own implicit stacking
   order) paint over it without needing an explicit z-index on them. */
.portrait-bg {
  position: fixed;
  top: 57%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(1200px, 60vw);
  height: auto;
  max-height: 95vh;
  object-fit: contain;
  opacity: 0.85;
}

.entrance-ready.portrait-bg {
  animation: portrait-fade-in var(--dur-lazy) var(--ease-out-expo) both;
  animation-delay: 120ms;
}

@keyframes portrait-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.7;
  }
}

/* below 840px the side-pinned text and the fixed portrait both stop
   making sense (nowhere near enough width for edge columns plus a clear
   center), so this reverts to the pre-fixed layout: photo hidden, text
   back in normal flow, centered and stacked. */
@media (max-width: 840px) {
  .portrait-bg {
    display: none;
  }

  .text-row {
    position: static;
    inset: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
    padding-inline: 0;
    margin-top: min(var(--space-6), 1.5vh);
    pointer-events: auto;
  }
}
</style>
