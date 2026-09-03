<script setup lang="ts">
import type { ImageRef } from "@/content/types"

withDefaults(
  defineProps<{
    image: ImageRef
    alt: string
    priority?: boolean
  }>(),
  { priority: false },
)
</script>

<template>
  <img
    :src="image.src"
    :width="image.width"
    :height="image.height"
    :alt="alt"
    :loading="priority ? undefined : 'lazy'"
    :decoding="priority ? undefined : 'async'"
    :fetchpriority="priority ? 'high' : undefined"
  />
</template>
