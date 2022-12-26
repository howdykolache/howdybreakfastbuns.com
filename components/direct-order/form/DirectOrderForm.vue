<template>
  <div class="mt-10">
    <div v-if="!submitting">
      <ProgressIndicator v-if="currentStep <= 5" :steps="5" :current-step="currentStep" />
      <p v-if="error" class="text-center text-red-500 my-4">Something went wrong, please try again later</p>
      <div :class="{'mt-6 lg:mt-12': currentStep <= 5}">
        <ContactInfo v-show="currentStep === 1" @next="next" />
        <DateTime v-show="currentStep === 2" @next="next" @previous="goBackToPreviousStep" />
        <OrderSize v-show="currentStep === 3" @next="next" @previous="goBackToPreviousStep" />
        <Flavors v-show="currentStep === 4" @next="next" @previous="goBackToPreviousStep" />
        <Addons v-show="currentStep === 5" @next="next" @previous="goBackToPreviousStep" />
        <ReviewOrder v-show="currentStep === 6" @submit="onSubmit" @previous="goBackToPreviousStep" />
      </div>
    </div>
    <div v-else class="flex justify-center items-center h-screen">
      <p class="text-lg text-gray-500">Please wait...</p>
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
import { mapGetters } from "vuex";

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
      currentStep: 1,
      submitting: false,
      error: false,
    }
  },
  computed: {
    ...mapGetters({
      form: "order-form/fields"
    }),
    payload(){
      return {
        name: this.form.contact.name,
        email: this.form.contact.email,
        phoneNumber: this.form.contact.phoneNumber,
        date: this.form.delivery.date,
        deliveryTime: this.form.delivery.deliveryTime,
        orderType: this.form.delivery.orderType,
        address: this.form.delivery.address,
        deliveryNotes: this.form.delivery.deliveryNotes,
        dozens: this.form.size.dozens,
        flavors: this.form.flavors,
        addons: this.form.addons,
        tipInCents: this.form.tipInCents || 0,
      }
    }
  },
  methods: {
    next(){
      this.currentStep++
    },
    goBackToPreviousStep(){
      if (this.currentStep > 1) this.currentStep--
    },
    async onSubmit(){
      this.submitting = true
      this.error = false

      try {
        const res = await fetch('/.netlify/functions/checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.payload)
        })
        const data = await res.json()
        window.location.replace(data.url)
      } catch (error) {
        console.error(error)
        this.error = true
        this.submitting = false
      }
    }
  }
};
</script>
