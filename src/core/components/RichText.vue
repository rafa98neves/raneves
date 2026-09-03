<script setup lang="ts">
import type { Paragraph } from "@/i18n/schema"
import Link from "./Link.vue"

defineProps<{ paragraphs: Paragraph[] }>()
</script>

<template>
  <div>
    <p v-for="(paragraph, pIndex) in paragraphs" :key="pIndex">
      <template v-for="(segment, sIndex) in paragraph" :key="sIndex">
        <Link v-if="segment.kind === 'link'" :href="segment.href">{{ segment.value }}</Link>
        <strong v-else-if="segment.kind === 'strong'">{{ segment.value }}</strong>
        <template v-else>{{ segment.value }}</template>
      </template>
    </p>
  </div>
</template>
