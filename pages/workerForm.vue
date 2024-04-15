<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
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
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CheckBox from '../components/CheckBox.vue';
import axios from 'axios';

const formData = ref({
  name: '',
  email: '',
  description: '',
  services: {}
});

const handleServices = (services: {}) => {
  formData.value.services = services;
};

const submitForm = async () => {
  try {
    const response = await axios.post('/api/submit', formData.value);
    console.log('Server response:', response.data);
  } catch (error) {
    console.error('Error submitting form:', error);
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
  </style>
  