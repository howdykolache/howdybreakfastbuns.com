<template>
  <button class="w-full p-3 mt-2 text-smaller text-gray-300" @click="onClick">
    back
  </button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      stepRoutes: "order-form/stepRoutes",
    }),
    // TODO: Refactor this, currently using same exact fun in ProgressIndicator
    currentStepIndex(){
      const urlPaths = this.$route.path.split('/').filter(val => val.trim().length)
      const lastPath = urlPaths[urlPaths.length - 1]
      
      return this.stepRoutes.indexOf(lastPath)
    }
  },
  methods: {
    onClick(){
      if (!this.currentStepIndex) return

      const stepRoute = this.stepRoutes[this.currentStepIndex - 1]

      this.$router.push(`/order/direct/form/${stepRoute}`);
    }
  }
}
</script>
