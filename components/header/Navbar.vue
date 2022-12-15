<template>
  <nav class="flex justify-between items-center">
    <a href="/">
      <img
        src="~/assets/img/logo.svg"
        alt="Howdy breakfast buns"
        class="w-20 lg:w-28"
      />
    </a>
    <div class="flex items-center">
      <a href="" class="btn btn-secondary text-xs md:text-sm">MENU</a>
      <nuxt-link 
      to="/order" class="btn btn-primary ml-2 text-xs md:text-sm"
      >
        Order online
      </nuxt-link>
    </div>
  </nav>
</template>
