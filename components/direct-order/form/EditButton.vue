<template>
  <nuxt-link :to="to">
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
    next: {
      default: '/order/direct/form/review',
      type: String
    }
  },
  computed: {
    to(){
      let to = `${this.route}?editing=1`

      if (this.next.length) to += `&next=${this.next}`

      return to
    }
  }
};
</script>
