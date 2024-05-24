<script setup lang="ts">
const links = [{
  label: 'Formulario de trabajadores.',
  to: '/workerForm'

}]
</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>

