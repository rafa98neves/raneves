<script setup lang="ts">
import { useI18n } from "vue-i18n"
import PageTopBar from "@/core/components/PageTopBar.vue"
import SectionTag from "@/core/components/SectionTag.vue"
import PageFooter from "@/core/components/PageFooter.vue"
import CodeAbout from "../components/CodeAbout.vue"
import CodeSkills from "../components/CodeSkills.vue"
import TimelineSpine from "../components/timeline/TimelineSpine.vue"
import SelectedWork from "../components/SelectedWork.vue"

const { t } = useI18n()
</script>

<template>
  <div class="page">
    <PageTopBar />
    <CodeAbout class="section" />
    <CodeSkills class="section" />
    <section class="section">
      <SectionTag>{{ t("code.sectionPath") }}</SectionTag>
      <TimelineSpine />
    </section>
    <SelectedWork class="section" />
    <PageFooter />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: var(--space-6) var(--gutter) var(--space-9);
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
}

.section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>
