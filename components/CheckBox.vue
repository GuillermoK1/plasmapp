<template>
  <div v-for="(selected, key) in services" :key="key">
    <UCheckbox v-model="services[key]" :name="key" :label="key" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

// Definimos los servicios disponibles y su estado (seleccionado o no)
// Ahora usamos nombres con espacios para mejorar la legibilidad y búsqueda
const services = ref({
  'Limpieza': false,
  'Mudanza': false,
  'Manitas': false,
  'Pintura': false,
  'Recogida de escombros': false,
  'Reparaciones express': false,
  'Instalación de muebles': false,
  'Cuidado de mascotas': false,
  'Fontanería': false,
  'Peluquería': false,
  'Cuidado de personas': false
});

// Emitimos el evento 'update:services' cuando cambian los servicios seleccionados
const emits = defineEmits(['update:services']);
watch(services, (newVal) => {
  emits('update:services', newVal);
}, { deep: true });
</script>
