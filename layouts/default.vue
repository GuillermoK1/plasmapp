<template>
    <Body class="bg-gradient-to-l from-sky-700 to-indigo-600 z-10  opacity-85">

<header class="flex flex-row items-center h-14">
  <div class="basis-1/2 m-3">
    <p class="line-clamp-2">PLA.S.M.A. -Plataforma de servicios múltiples adaptados-</p>
  </div>
  <div class="basis-1/2">
  <SlideOver/>
  </div>
</header>

<div class="w-full absolute -z-50 flex justify-center">
    <PlasmaBall/>
  </div>

  <div class="z-30 flex flex-col place-items-baseline justify-center m-10 ring-8 ring-offset-purple-100/[.15]">
      <NuxtPage class="flex place-items-baseline justify-center"/>
    </div>

  <footer>
    <HorizontalNavigation/>
  </footer>
  </Body>

</template>