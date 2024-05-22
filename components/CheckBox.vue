<template>
  <div v-for="(selected, key) in services" :key="key">
    <UCheckbox v-model="services[key]" :name="key" :label="formatServiceName(key)" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

// Definimos los servicios disponibles y su estado (seleccionado o no)
const services = ref({
  Limpieza: false,
  Mudanza: false,
  Manitas: false,
  Pintura: false,
  RecogidaDeEscombros: false,
  ReparacionesExpress: false,
  InstalacionDeMuebles: false,
  CuidadoDeMascotas: false,
  Fontaneria: false,
  Peluqueria: false,
  CuidadoDePersonas: false
});

// Emitimos el evento 'update:services' cuando cambian los servicios seleccionados
const emits = defineEmits(['update:services']);
watch(services, (newVal) => {
  emits('update:services', newVal);
}, { deep: true });

// Formateamos el nombre del servicio para mostrarlo adecuadamente
function formatServiceName(serviceName: string) {
  return serviceName.match(/[A-Z][a-z]+|[0-9]+/g)?.join(' ');
}
</script>
