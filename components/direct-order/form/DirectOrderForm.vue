<template>
  <div class="mt-10">
    <ProgressIndicator v-if="currentStep <= 5" :steps="5" :current-step="currentStep" />
    <div :class="{'mt-6 lg:mt-12': currentStep <= 5}">
      <ContactInfo v-if="currentStep === 1" @next="next" />
      <DateTime v-if="currentStep === 2" @next="next" />
      <OrderSize v-if="currentStep === 3" @next="next" />
      <Flavors v-if="currentStep === 4" @next="next" />
      <Addons v-if="currentStep === 5" @next="next" />
      <ReviewOrder v-if="currentStep === 6" />
    </div>
  </div>
</template>

<script>
import ContactInfo from "./steps/ContactInfo.vue";
import DateTime from "./steps/DateTime.vue";
import OrderSize from "./steps/OrderSize.vue";
import Flavors from "./steps/Flavors.vue";
import Addons from "./steps/Addons.vue";
import ReviewOrder from "./steps/ReviewOrder.vue";
import ProgressIndicator from "./ProgressIndicator.vue";

export default {
  components: {
    ContactInfo,
    DateTime,
    OrderSize,
    Flavors,
    Addons,
    ReviewOrder,
    ProgressIndicator
  },
  data () {
    return {
      currentStep: 1
    }
  },
  methods: {
    next(){
      this.currentStep++
    }
  }
};
</script>
