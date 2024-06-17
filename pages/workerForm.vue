<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="postalCode">Código Postal:</label>
        <input type="text" id="postalCode" v-model="formData.postalCode" required>
      </div>
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="formData.name" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required>
      </div>
      <div class="form-group">
        <label for="service">Servicio:</label>
        <CheckBox @update:services="handleServices" />
      </div>
      <div class="form-group">
        <label for="description">Descripción:</label>
        <TextArea id="description" v-model="formData.description" required></TextArea>
      </div>
      <button type="submit">Enviar</button>
      <div v-if="message" :class="{'success-message': success, 'error-message': !success}">
        {{ message }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CheckBox from '../components/CheckBox.vue';
import TextArea from '../components/TextArea.vue'; // Asegúrate de importar este componente si existe
import axios from 'axios';

const formData = ref({
  postalCode: '',
  name: '',
  email: '',
  description: '',
  services: {}
});

const message = ref('');
const success = ref(false);

const handleServices = (services: Record<string, boolean>) => {
  formData.value.services = services;
};

const submitForm = async () => {
  try {
    const response = await axios.post('/api/companies/create', formData.value);
    if (response.data.success) {
      success.value = true;
      message.value = ' Formulario enviado con éxito. ';
    } else {
      success.value = false;
      message.value = ` Error al enviar el formulario: ${response.data.error}`;
    }
  } catch (error) {
    success.value = false;
    message.value = ' Error al enviar el formulario ';
    console.error(' Error submitting form: ', error);
  }
};
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: auto;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  line-height: 20px;
  box-sizing: border-box;
}

.success-message {
  color: green;
  background-color: aliceblue;
}

.error-message {
  color: red;
  background-color: aliceblue;
}
</style>
