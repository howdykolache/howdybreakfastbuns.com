<template>
  <nav class="flex justify-between items-center">
    <nuxt-link to="/">
      <img
        src="~/assets/img/logo.svg"
        alt="Howdy breakfast buns"
        class="w-20 lg:w-28"
      />
    </nuxt-link>
    <button @click="toggleMobileMenu" class="w-10 block md:hidden">
      <img src="~/assets/img/menu.svg" class="w-full h-full object-cover"/>
    </button>
    <div v-if="showMenu" class="flex flex-col items-center fixed inset-x-0 inset-y-0 bg-white z-50 gap-y-3 p-4 pt-28 md:static md:p-0 md:z-0 md:flex-row">
      <img @click="toggleMobileMenu" src="~/assets/img/close.svg" width="45" class="absolute right-4 top-4 block md:hidden">
      <nuxt-link to="/employee-perks" class="btn btn-secondary text-3xl md:text-sm">EMPLOYEE PERKS</nuxt-link >
      <nuxt-link to="/menu" class="btn btn-secondary text-3xl md:text-sm">MENU</nuxt-link >
      <nuxt-link 
      to="/order" class="btn btn-primary text-3xl mt-2 md:text-sm md:ml-5 md:mt-0"
      >
        Order online
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showMenu: true
    }
  },
  methods: {
    toggleMobileMenu(){
      this.showMenu = !this.showMenu
    }
  },
  created(){
    // Initially, hide the menu if it’s a tablet or smaller
    if(screen.width <= 768) this.showMenu = false
  },
  watch: {
    $route(to, from) {
      // On tablet on below, hide the menu on route change (In case it’s open)
      if(screen.width <= 768) this.showMenu = false
    },
  },
}
</script>