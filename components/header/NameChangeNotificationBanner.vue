<template>
  <div class='bg-red-500 px-6 py-0 flex justify-center' v-if='showBanner'>
    <p class="text-white self-center" style="">
      We've changed our name from Howdy Kolache to Howdy Breakfast Buns! 🎉
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    showBanner() {
      return this.$route.query.r == 1
    }
  }
}
</script>

