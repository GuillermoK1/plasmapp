<script setup lang="ts">
const route = useRoute()

const links = [{
  label: '¡Ofrece tus servicios!',
    to: '/workerForm'
}]
</script>

<template>
  <UVerticalNavigation :links="links" />
</template>

