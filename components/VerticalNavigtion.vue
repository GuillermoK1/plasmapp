<script setup lang="ts">
const route = useRoute()

const links = [{
  label: '¡Ofrece tus servicios!',
    src: 'localhost:3000/workerForm.vue'
}]
</script>

<template>
  <UVerticalNavigation :links="links" />
</template>

