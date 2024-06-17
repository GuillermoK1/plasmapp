<template>
  <div class="grid grid-flow-row auto-rows-max">
    <SelectMenu @update:selectedService="updateSelectedService" class="mx-8" />
    <ZipCode v-model:zip-code="zipCode" class="mx-8" />
    <UButton @click="searchCompanies" class="animate-pulse bg-gradient-to-r from-sky-700 to-indigo-600 z-10 opacity-85 w-64 m-3">Buscar empresas...</UButton>
    <Companies class="m-6"  :companies="companies" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Companies from '~/components/Companies.vue';

interface Company {
  name: string;
  description: string;
  services: string[];
  email: string;
  distance: number;
  geoCoords: string;
  zip: string;
}

const selectedService = useState<string>('selectedService', () => 'Limpieza');
const zipCode = ref<string>('');
const companies = ref<Company[]>([]);

const updateSelectedService = (service: string) => {
  selectedService.value = service;
};

const searchCompanies = async () => {
  const service = selectedService.value;
  const zipCodeCookie = useCookie('zipCode');
  zipCodeCookie.value = zipCode.value;

  if (!service || !zipCode.value) {
    console.error('Service and postal code are required');
    return;
  }

  try {
    const data = await $fetch<Company[]>(`/api/companies/search?service=${service}&postalCode=${zipCode.value}`);
    companies.value = data.map((company) => ({
      name: company.name,
      description: company.description,
      services: company.services,
      email: company.email,
      distance: company.distance,
      geoCoords: company.geoCoords,
      zip: company.zip,
    }));
  } catch (error) {
    console.error('Error fetching companies:', error);
  }
};

onMounted(() => {
  const cookieValue = useCookie('zipCode').value;
  if (cookieValue) {
    zipCode.value = cookieValue;
  }
});
</script>
