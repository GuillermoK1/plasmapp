<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCookie } from '#app';

// Definimos la variable de estado para el código postal
const zipCode = ref('');

// Emitir eventos para la comunicación con el componente padre
const emit = defineEmits(['update:zipCode']);

// Crear la cookie para el código postal con SameSite=None; Secure
const zipCodeCookie = useCookie('zipCode', { sameSite:'strict', secure: true });

// Validar que solo se permiten números en la entrada
const validateInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^0-9]/g, '');
};

// Observa los cambios en zipCode y actualiza la cookie y emite el nuevo valor
watch(zipCode, (newValue) => {
  if (newValue.length === 5) {
  zipCodeCookie.value = newValue;
  emit('update:zipCode', newValue);
}
});
</script>

<template>
  <h2 class="m-2 p-2 font-bold text-neutral-800 bg-gradient-to-r from-sky-700 to-indigo-600 z-10 opacity-85">Introduce tu código postal.</h2>
  <input 
    v-model="zipCode" 
    @input="validateInput" 
    type="text" 
    class="m-3 p-2 border rounded"
    maxlength="5"
    placeholder="00000"
  />
</template>
