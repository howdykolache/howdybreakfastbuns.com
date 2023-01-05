<template>
  <div class="review-order">
    <div v-if="!submitting">
      <h4 class="text-center text-lg font-bold lg:text-2xl">
        REVIEW YOUR ORDER
      </h4>
      <p v-if="error" class="text-center text-red-500 my-4">
        Something went wrong, please try again later
      </p>
      <div class="lg:flex justify-between mt-4 lg:gap-x-20 lg:mt-16">
        <div class="w-full lg:w-7/12">
          <OrderInfoOverview />
          <OrderTotals />
          <button
            @click="submit"
            class="btn btn-primary w-full p-3 mt-10"
          >
            PAY
          </button>
          <PreviousStepButton />
        </div>
        <div class="hidden lg:block">
          <img src="~/assets/img/howdy2.png" alt="Howdy Breakfast Buns" />
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center items-center h-screen">
      <p class="text-lg text-gray-500">Please wait...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import OrderInfoOverview from "@/components/direct-order/form/review/OrderInfoOverview.vue";
import OrderTotals from "@/components/direct-order/form/review/OrderTotals.vue";
import PreviousStepButton from "@/components/direct-order/form/PreviousStepButton.vue"

export default {
  components: {
    OrderInfoOverview,
    OrderTotals,
    PreviousStepButton
  },
  data() {
    return {
      submitting: false,
      error: false,
    };
  },
  computed: {
    ...mapGetters({
      form: "order-form/fields",
    }),
    payload() {
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
      };
    },
  },
  methods: {
    async submit() {
      this.submitting = true;
      this.error = false;

      try {
        const res = await fetch("/.netlify/functions/checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.payload),
        });

        const data = await res.json();

        if (res.status === 200) {
          window.location.replace(data.session.url);
        } else {
          console.error(data.error)
        }
      } catch (error) {
        console.error(error);
        this.error = true;
      }

      this.submitting = false;
    },
  },
};
</script>

<style>
.review-order .label {
  @apply text-xs text-highlight !font-normal uppercase;
}
</style>
