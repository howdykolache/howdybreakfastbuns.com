<template>
  <div
    v-if="currentStepIndex >= 0"
    class="relative w-9/12 mx-auto flex items-center justify-between lg:w-4/12"
  >
    <div
      v-for="(step, index) in stepRoutes.length"
      :key="step"
      @click="onNavigateToStep(index)" 
      :class="{
        selected: index <= currentStepIndex,
        'cursor-pointer': isStepSelectable(index),
      }"
      class="step"
    ></div>
    <div
      class="crossline progress"
      :style="{ '--step-index': currentStepIndex - 1 }"
    ></div>
    <div class="crossline"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      stepRoutes: "order-form/stepRoutes"
    }),
    // Compares current step route against the known route names and returns its index
    currentStepIndex(){
      const urlPaths = this.$route.path.split('/').filter(val => val.trim().length)
      const lastPath = urlPaths[urlPaths.length - 1]
      
      return this.stepRoutes.indexOf(lastPath)
    }
  },
  methods: {
    isStepSelectable(stepIndex) {
      return stepIndex < this.currentStepIndex; // We can only go back to preceding steps
    },
    onNavigateToStep(stepIndex) {
      if (!this.isStepSelectable(stepIndex)) return;

      const stepRoute = this.stepRoutes[stepIndex]

      this.$router.push(`/order/direct/form/${stepRoute}`);
    },
  },
};
</script>

<style scoped>
.step {
  @apply w-4 h-4 rounded-full;
  background: #d9d9d9;
}

.step.selected {
  background: #00b373;
}

.crossline {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #d9d9d9;
  z-index: -2;
}

.crossline.progress {
  --step-index: 0;
  width: calc(100% / 4 * var(--step-index));
  background: #00b373;
  z-index: -1;
}
</style>
