<template>
    <Body class="bg-gradient-to-l from-sky-700 to-indigo-600 z-10  opacity-85 backdrop-brightness-50">

<header class="flex flex-row items-center">
  <div class="basis-1/2 m-3">
    <p class="line-clamp-2">PLA.S.M.A. -Plataforma de servicios múltiples adaptados-</p>
  </div>
  <div class="basis-1/2">
  <SlideOver/>
  </div>
</header>

<div class="w-full mt-12 absolute -z-50 flex justify-center">
    <div class="max-w-[75vw] bg-gradient-to-r from-sky-700 to-indigo-600 rounded-full shadow-2xl">
      <PlasmaBall/>
    </div>
  </div>

<div class="mr-6 z-30 flex flex-col place-items-baseline justify-center m-6 ring-8 ring-offset-purple-100/[.15]">
      <NuxtPage class="h-[81vh] flex place-items-baseline justify-center"/>
    </div>

  <footer>
    <HorizontalNavigation/>
  </footer>
  </Body>

</template>