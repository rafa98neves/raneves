<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useContent } from "@/content"
import Chip from "@/core/components/Chip.vue"
import SectionTag from "@/core/components/SectionTag.vue"

const { t } = useI18n()
const { skills } = useContent()
</script>

<template>
  <section class="skills">
    <SectionTag>{{ t("code.sectionSkills") }}</SectionTag>
    <div class="groups">
      <div v-for="group in skills" :key="group.id" class="group">
        <h3 class="group-label">{{ group.label }}</h3>
        <div class="chips">
          <Chip v-for="item in group.items" :key="item.name">{{ item.name }}</Chip>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: var(--space-6);
}

.group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  max-width: 400px;
}

.group-label {
  font-size: var(--text-2xs);
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  color: var(--accent);
  margin: 0;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.chips :deep(.chip) {
  transition: border-color var(--dur-fast) var(--ease-out-quart);
}

.chips :deep(.chip:hover) {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
