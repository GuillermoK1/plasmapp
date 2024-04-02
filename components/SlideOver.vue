<!--Prevent Close-->
<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <div>
    <UButton class= "max-w-[90vw]" color= "indigo" label="Abrir menú" @click="isOpen = true" />

    <USlideover v-model="isOpen" prevent-close>
      <UCard class="flex flex-col max-w-[95vw]" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-end justify-end">
            
            <UButton color="indigo" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false">
              <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Cerrar menú...
              </h3>
            </UButton>
          </div>
        </template>

        <VerticalNavigtion/>
      </UCard>
    </USlideover>
  </div>
</template>

