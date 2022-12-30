<template>
  <nuxt-link :to="`${route}?editing=1`">
    <img src="~/assets/icons/pencil.svg" class="w-4 cursor-pointer ml-2" />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    route: {
      required: true,
      type: String,
    },
  },
};
</script>
