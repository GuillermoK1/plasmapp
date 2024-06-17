<template>
  <div v-if="companies.length === 0">
    No companies found.
  </div>
  <div v-else>
    <UCarousel
      :items="companies"
      :ui="{
        item: 'basis-full',
        container: 'rounded-lg',
        indicators: {
          wrapper: 'relative bottom-0 mt-4'
        }
      }"
      indicators
      class="w-64 mx-auto"
    >
      <template #default="{ item }">
        <div class="company-card">
          <h2>{{ item.name }}</h2>
          <p>{{ item.description }}</p>
          <p><strong>Services:</strong> {{ item.services.join(', ') }}</p>
          <p><strong>Email:</strong> {{ item.email }}</p>
          <p><strong>Distance:</strong> {{ (item.distance / 1000).toFixed(1) }} km</p>
          <p><strong>Zip Code:</strong> {{ item.zip }}</p>
        </div>
      </template>

      <template #indicator="{ onClick, page, active }">
        <UButton :label="String(page)" :variant="active ? 'solid' : 'outline'" size="2xs" class="rounded-full min-w-6 justify-center" @click="onClick(page)" />
      </template>
    </UCarousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Company {
  name: string;
  description: string;
  services: string[];
  email: string;
  distance: number;
  zip: string;
}

export default defineComponent({
  name: 'Companies',
  props: {
    companies: {
      type: Array as () => Company[],
      required: true
    }
  }
});
</script>

<style scoped>
.company-card {
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
