<script setup lang="ts">
import { ref, watch } from 'vue';

const serviceList = [
  'Limpieza', 'Mudanza', 'Pintura', 'Recogida de escombros',
  'Reparaciones express', 'Manitas', 'Instalación de muebles',
  'Cuidado de mascotas', 'Fontaneria', 'Peluqueria', 'Cuidado de personas'
];

const selected = ref(serviceList[0]);

const emit = defineEmits(['update:selectedService']);

watch(selected, (newValue) => {
  emit('update:selectedService', newValue);
});
</script>

<template>
  <h2 class="m-2 p-2 font-bold text-neutral-800 bg-gradient-to-r from-sky-700 to-indigo-600 z-10 opacity-85">Escoge un servicio de la lista desplegable.</h2>
  <USelectMenu v-model="selected" :options="serviceList" class="m-3"/>
</template>
