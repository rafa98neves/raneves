<script setup lang="ts">
import { computed, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { useHead } from "@unhead/vue"
import { useTheme } from "@/core/composables/useTheme"

const { theme } = useTheme()
const { t } = useI18n()
const router = useRouter()
const route = useRoute()

// vite-ssg always runs prerendered pages through @unhead/vue's renderDOMHead,
// which owns and overwrites <html> attributes on every route - a direct
// document.documentElement.lang assignment gets silently clobbered by that
// pipeline afterward, so the html lang must be set through useHead(), the
// sanctioned path, not imperatively
useHead({
  htmlAttrs: { lang: computed(() => (route.meta.locale as string) ?? "en") },
})

const announcement = ref("")

router.afterEach((to) => {
  const navKey = to.meta.navKey as "home" | "code" | "frame" | undefined
  if (navKey) {
    announcement.value = t("a11y.routeChanged", { pageTitle: t(`nav.${navKey}`) })
  }
})
</script>

<template>
  <a href="#main" class="skip-link">{{ t("a11y.skipToContent") }}</a>
  <div :data-theme="theme" class="shell">
    <main id="main">
      <RouterView />
    </main>
  </div>
  <div class="visually-hidden" role="status" aria-live="polite">{{ announcement }}</div>
</template>

<style scoped>
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 100;
  padding: var(--space-3) var(--space-4);
  background: var(--bg-1);
  color: var(--fg);
}

.skip-link:focus {
  left: var(--space-4);
  top: var(--space-4);
}

.shell {
  min-height: 100vh;
}

/* top/left:0 matters, not just cosmetic: without them this sits at its
   static position (wherever it falls in DOM flow - the very bottom of the
   page, being last), which was silently adding 1px to scrollHeight on every
   page and forcing a scrollbar even when content otherwise fit exactly */
.visually-hidden {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>
