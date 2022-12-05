<template>
  <header class="container mx-auto py-4">
    <Navbar />
    <Hero v-if="$route.path === '/'" />
  </header>
</template>

<script>
import Navbar from "./Navbar.vue";
import Hero from "./Hero.vue";

export default {
  components: {
    Navbar,
    Hero,
  },
};
</script>
