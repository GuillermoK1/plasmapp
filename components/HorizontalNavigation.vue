<script setup lang="ts">
const route = useRoute()

const links = [{
  label: 'Formulario de trabajadores.',
    src: 'localhost:3000/workerForm',
}]
</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>

