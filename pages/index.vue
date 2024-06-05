<template>
  <div class="grid grid-flow-row auto-rows-max">
    <SelectMenu />
    <ZipCode v-model:zip-code="zipCode" />
    <UButton @click="searchCompanies" class="bg-gradient-to-r from-sky-700 to-indigo-600 z-10 opacity-85 w-64 m-3">Buscar empresas...</UButton>
    <Companies :companies="companies" />
  </div>
</template>

<script setup lang="ts">

interface Company {
    geoCoords: string;
    name: string;
    services: string;
    description: string;
    email: string;
    zip: string;
}

const selectedService = useState('selectedService');
const zipCode = ref('');
const companies = ref<Company[]>([]);

const searchCompanies = async () => {
  const zipCodeCookie = useCookie('zipCode');
  zipCodeCookie.value = zipCode.value;

  try {
    const data = await $fetch(`/api/companies/search?service=${selectedService.value}&postalCode=${zipCode.value}`);
    companies.value = data.map((company: any) => ({
      name: company.name,
      description: company.description,
      services: company.services,
      email: company.email,
      distance: company.distance,
      geoCoords: JSON.parse(company.geoCoords),
      zip: company.zip,
    }));
  } catch (error) {
    console.error('Error fetching companies:', error);
  }
};
</script>
