<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useContent } from "@/content"
import SocialLinks from "./SocialLinks.vue"

const { t } = useI18n()
const { profile } = useContent()

// baked in at prerender time, not per-visit - correct as long as the site
// gets rebuilt at least once a year, which a portfolio in active use will
const year = new Date().getFullYear()
</script>

<template>
  <footer class="page-footer">
    <SocialLinks />
    <p class="copyright">
      &copy; {{ year }} {{ profile.name }}. {{ t("common.allRightsReserved") }}
    </p>
  </footer>
</template>

<style scoped>
/* sticky, not static, to match the top bar - it stays reachable while
   scrolling instead of only showing up once the page truly ends. See
   PageTopBar.vue for why the fill is translucent + blurred rather than a
   flat var(--bg-0), and for what the width/margin-inline pair does: breaks
   the footer out of its parent's padding so the background reaches every
   edge, then re-adds that same gutter as padding so the content inside
   sits exactly where it did before.

   margin-bottom cancels the container's own padding-bottom
   (var(--space-9), the same on every page using this footer) the same
   way PageTopBar.vue cancels padding-top - without it, a page short
   enough to need no scrolling would still show that padding as a gap
   below the footer instead of the footer sitting flush at the bottom. */
.page-footer {
  position: sticky;
  bottom: 0;
  z-index: 20;
  width: 100vw;
  margin-inline: calc(50% - 50vw);
  margin-top: var(--space-6);
  margin-bottom: calc(-1 * var(--space-9));
  padding: var(--space-4) var(--gutter);
  border-top: 1px solid var(--border-subtle);
  background: rgba(var(--bg-0-rgb), 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.copyright {
  font-size: var(--text-2xs);
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  color: var(--fg-subtle);
  margin: 0;
}
</style>
