<template>
  <div>
    <h2 class="m-2 p-2 font-bold text-neutral-800 bg-gradient-to-r from-sky-700 to-indigo-600 z-10 opacity-85">
      Por favor introduzca un código postal para hacer una búsqueda de empresas cercanas.
    </h2>
    <div class="zip-code-input relative m-2">
      <input
        v-for="(digit, index) in zipCodeDigits"
        :key="index"
        type="text"
        maxlength="1"
        v-model="zipCodeDigits[index]"
        @input="onInput(index)"
        @keydown.backspace="focusPrevious(index)"
        class="zip-code-box"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useCookie } from '#app';

const zipCodeLength = 5; // Ajusta esto según la longitud deseada del código postal
const zipCodeDigits = ref(Array(zipCodeLength).fill(''));

const onInput = (index) => {
  // Asegurar que solo se permitan números
  zipCodeDigits.value[index] = zipCodeDigits.value[index].replace(/[^0-9]/g, '');
  focusNext(index);
};

const focusNext = (index) => {
  if (index < zipCodeLength - 1) {
    document.querySelectorAll('.zip-code-box')[index + 1].focus();
  }
};

const focusPrevious = (index) => {
  if (index > 0 && zipCodeDigits.value[index] === '') {
    document.querySelectorAll('.zip-code-box')[index - 1].focus();
  }
};

// Obtener el valor de la cookie 'zipCode'
const { value: zipCode } = useCookie('zipCode');

// Si la cookie tiene un valor válido, inicializa zipCodeDigits con él
if (zipCode && zipCode.length === zipCodeLength) {
  zipCodeDigits.value = zipCode.split('');
}

// Observar cambios en zipCodeDigits para guardar el código completo en la cookie
watch(zipCodeDigits, (newValue) => {
  const fullZipCode = newValue.join('');
  if (fullZipCode.length === zipCodeLength) {
    useCookie('zipCode', fullZipCode, { path: '/', maxAge: 60 * 60 * 24 * 7 }); // Guardar por 1 semana
  }
}, { deep: true });
</script>

<style>
.zip-code-box {
  width: 40px;
  height: 40px;
  margin: 0 5px;
  text-align: center;
}

.zip-code-input {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
