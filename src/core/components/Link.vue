<script setup lang="ts">
const props = defineProps<{ href: string }>()

const isExternal = /^https?:\/\//.test(props.href) || props.href.startsWith("mailto:")
</script>

<template>
  <a
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </a>
</template>
