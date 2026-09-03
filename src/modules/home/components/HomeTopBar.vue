<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useNav } from "@/core/composables/useLocale"

const { t } = useI18n()
const nav = useNav()
</script>

<template>
  <div class="topbar">
    <div class="monogram">RN</div>
    <nav class="nav">
      <RouterLink :to="nav.code.value">{{ t("nav.code") }}</RouterLink>
      <RouterLink :to="nav.frame.value">{{ t("nav.frame") }}</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.monogram {
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: var(--track-label);
}

.nav {
  display: flex;
  gap: var(--space-6);
  font-size: var(--text-2xs);
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  color: var(--fg-subtle);
}
</style>
