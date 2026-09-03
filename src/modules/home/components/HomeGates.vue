<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useNav } from "@/core/composables/useLocale"

const { t } = useI18n()
const nav = useNav()
</script>

<template>
  <div class="gates">
    <RouterLink class="gate gate-code" :to="nav.code.value">
      <div class="gate-heading">
        <span class="gate-index">01</span>
        <div>
          <div class="gate-title">{{ t("home.gateCodeTitle") }}</div>
          <div class="gate-subtitle">{{ t("home.gateCodeSubtitle") }}</div>
        </div>
      </div>
    </RouterLink>
    <RouterLink class="gate gate-frame" :to="nav.frame.value">
      <div class="gate-heading">
        <span class="gate-index">02</span>
        <div>
          <div class="gate-title">{{ t("home.gateFrameTitle") }}</div>
          <div class="gate-subtitle">{{ t("home.gateFrameSubtitle") }}</div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.gates {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-5);
}

/* backdrop-filter, not just the tint alone: HomePortraitBand.vue's fixed
   background portrait can sit directly behind these cards, and the tints
   below were tuned for a flat --bg-0 behind them - without blurring
   whatever's actually there, a card's near-transparent background just
   lets the photo show through sharply, reading as a bug rather than a
   frosted surface */
.gate {
  display: flex;
  align-items: center;
  padding: var(--space-5) var(--space-6);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-md);
  text-decoration: none;
  color: var(--fg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: background-color var(--dur-base) var(--ease-default);
}

.gate-code {
  background: rgba(255, 255, 255, 0.03);
}

.gate-code:hover,
.gate-code:focus-visible {
  background: rgba(255, 255, 255, 0.06);
}

.gate-frame {
  background: linear-gradient(90deg, rgba(142, 46, 63, 0.14), rgba(142, 46, 63, 0.32));
}

.gate-frame:hover,
.gate-frame:focus-visible {
  background: linear-gradient(90deg, rgba(142, 46, 63, 0.2), rgba(142, 46, 63, 0.4));
}

.gate-heading {
  display: flex;
  align-items: baseline;
  gap: var(--space-5);
}

.gate-index {
  font-size: var(--text-xs);
  letter-spacing: var(--track-label);
  color: var(--fg-subtle);
}

.gate-title {
  font-size: var(--text-2xl);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.05;
}

.gate-subtitle {
  font-size: var(--text-xs);
  color: var(--fg-muted);
  margin-top: var(--space-2);
}

@media (max-width: 768px) {
  .gates {
    grid-template-columns: 1fr;
  }
}
</style>
