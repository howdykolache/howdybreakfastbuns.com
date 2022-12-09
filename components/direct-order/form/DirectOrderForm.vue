<template>
  <div class="mt-10">
    <ProgressIndicator v-if="currentStep <= 5" :steps="5" :current-step="currentStep" />
    <div :class="{'mt-6 lg:mt-12': currentStep <= 5}">
      <ContactInfo v-if="currentStep === 1" />
      <DateTime v-if="currentStep === 2" />
      <OrderSize v-if="currentStep === 3" />
      <Flavors v-if="currentStep === 4" />
      <Addons v-if="currentStep === 5" />
      <ReviewOrder v-if="currentStep === 6" />
      <div class="mt-10 lg:w-1/2">
        <button v-if="currentStep <= 5" @click="currentStep++" class="btn btn-primary w-full p-3">{{ buttonLabel }}</button>
        <button v-else class="btn btn-primary w-full p-3">PAY</button>
      </div>
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
  computed: {
    buttonLabel () {
      switch (this.currentStep) {
        case 1:
          return 'Next: DATE & TIME'        
        case 2:
          return 'Next: ORDER SIZE'
        case 3:
          return 'Next: SELECT MIX'
        case 4:
          return 'Next: ADD-ONS'
        case 5:
          return 'REVIEW'       
        case 6:
          return 'PAY'
        default:
          break;
      }
    }
  }
};
</script>
