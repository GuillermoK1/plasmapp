<template>
  <h2 class="m-2 p-2 font-bold text-neutral-800 bg-indigo-500/50">Por favor introduzca un código postal para hacer una busqueda de empresas cercanas.</h2>
  <div class="zip-code-input relative m-2">
    <input
      v-for="(digit, index) in zipCodeDigits"
      :key="index"
      type="text"
      maxlength="1"
      v-model="zipCodeDigits[index]"
      @input="focusNext(index)"
      @keydown.backspace="focusPrevious(index)"
      class="zip-code-box"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const zipCodeLength = 5; // Ajusta esto según la longitud deseada del código postal
const zipCodeDigits = ref(Array(zipCodeLength).fill(''));

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
