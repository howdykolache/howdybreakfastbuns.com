<template>
  <nav class="flex justify-between items-center">
    <nuxt-link to="/">
      <img
        src="~/assets/img/logo.svg"
        alt="Howdy breakfast buns"
        class="w-20 lg:w-28"
      />
    </nuxt-link>
    <div class="flex items-center">
      <nuxt-link to="/employee-perks" class="btn btn-secondary text-xs md:text-sm">EMPLOYEE PERKS</nuxt-link >
      <nuxt-link to="/menu" class="btn btn-secondary text-xs md:text-sm">MENU</nuxt-link >
      <nuxt-link 
      to="/order" class="btn btn-primary ml-5 text-xs md:text-sm"
      >
        Order online
      </nuxt-link>
    </div>
  </nav>
</template>
