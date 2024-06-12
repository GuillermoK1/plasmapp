<template>
  <div class="companies-container m-4 p-4">
    <h2 class="font-bold text-neutral-800 bg-gradient-to-r from-sky-700 to-indigo-600 p-2 z-10 opacity-85">
      Empresas cercanas
    </h2>
    <UCarousel :items="companies" :autoplay="false" class="my-4">
      <template #item="{ item }">
        <div class="company-card p-4 bg-white shadow-md rounded-lg">
          <h3 class="font-bold text-xl">{{ item.name }}</h3>
          <p class="text-gray-700">{{ item.description }}</p>
          <p class="text-gray-500">Servicios: {{ item.services.join(', ') }}</p>
          <p class="text-gray-500">Correo: {{ item.email }}</p>
          <p class="text-gray-500">Distancia: {{ item.distance }} metros</p>
        </div>
      </template>
    </UCarousel>
  </div>
</template>

<script setup lang="ts">

interface Company {
    geoCoords: object;
    name: string;
    services: object;
    description: string;
    email: string;
    zip: string;
}

const companies = ref<Company[]>([]);

const fetchCompanies = async () => {
  const service = useState('selectedService').value || 'Limpieza';
  const postalCode = useCookie('zipCode').value || '00000';

  const { data, error } = await useFetch(`/api/companies/search?service=${service}&postalCode=${postalCode}`);

  if (error.value) {
    console.error('Error fetching companies:', error.value);
  } else if (data.value) {
    companies.value = data.value.map((company: any) => ({
      name: company.name,
      description: company.description,
      services: company.services,
      email: company.email,
      distance: company.distance,
      geoCoords: company.geoCoords,
      zip: company.zip,
    }));
  }
};

onMounted(() => {
  fetchCompanies();
});
</script>

<style scoped>
.companies-container {
  background-color: #f7fafc;
  border-radius: 8px;
}

.company-card {
  width: 250px;
  height: 200px;
}
</style>
