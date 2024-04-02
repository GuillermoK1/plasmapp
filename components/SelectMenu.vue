<script setup lang="ts">
const serviceList =
['Limpieza', 'Mudanza', 'Pintura', 'Recogida de escombros', 'Reparaciones express', 'Manitas', 'Instalación de muebles', 'Cuidado de mascotas']

const selected = ref(serviceList[0])
const value = ref('')
</script>

<template>
  <h2 class="m-2 p-2 font-bold text-neutral-800 bg-indigo-500/50">Escoge un servicio de la lista desplegable.</h2>
  <USelectMenu v-model="selected" :options="serviceList" class="m-3"/>
</template>
