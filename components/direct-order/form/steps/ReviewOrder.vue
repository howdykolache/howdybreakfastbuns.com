<template>
  <div>
    <h4 class="text-center text-lg font-bold lg:text-2xl">REVIEW YOUR ORDER</h4>
    <div class="lg:flex justify-between mt-4 lg:gap-x-20 lg:mt-16">
      <div class="w-full lg:w-7/12">
        <!-- Contact/Delivery -->
        <section>
          <div class="flex">
            <div class="w-1/2 flex flex-col mt-5">
              <span class="label">DATE & TIME</span>
              <span class="mt-1">{{ formattedOrderDatetime }}</span>
            </div>
            <div class="w-1/2 flex flex-col mt-5">
              <span class="label">ORDER TYPE</span>
              <span class="mt-1">{{ form.delivery.orderType }}</span>
            </div>
          </div>
          <div class="flex">
            <div class="w-1/2 flex flex-col mt-5">
              <span class="label">CONTACT</span>
              <span class="mt-1 flex flex-col">
                <span>{{ form.contact.name }}</span>
                <span>{{ form.contact.email }}</span>
                <span>{{ form.contact.phoneNumber }}</span>
              </span>
            </div>
            <div class="w-1/2 flex flex-col mt-5">
              <span class="label">ADDRESS</span>
              <span
                v-if="form.delivery.orderType.toLowerCase() === 'pickup'"
                class="mt-1"
              >
                817 W Fulton Market
              </span>
              <span>{{ form.delivery.address }}</span>
            </div>
          </div>
        </section>
        <!-- Order info -->
        <section class="mt-10">
          <span class="label">ORDER DETAILS</span>
          <!-- Items -->
          <div class="mt-3">
            <div class="flex items-center">
              <strong class="w-10 text-sm">{{ form.size.dozens }}</strong>
              <span>Howdy Breakfast Buns (dozen)</span>
              <span class="flex-1 text-right">${{ form.size.subtotal }}</span>
            </div>
            <span class="ml-10 text-gray-500 text-sm">{{ form.flavors }}</span>
          </div>
          <!-- Addons -->
          <div v-for="(addon, index) in form.addons" :key="index" class="mt-3">
            <div class="flex items-center">
              <strong class="w-10 text-sm">{{ addon.qty }}</strong>
              <span>{{ addon.name }}</span>
              <span class="flex-1 text-right"
                >${{ addon.qty * addon.price }}</span
              >
            </div>
          </div>
          <!-- Subtotal -->
          <div class="ml-10 mt-10">
            <div class="flex justify-between mt-2">
              <span>Subtotal</span>
              <span>${{ subtotal }}</span>
            </div>
            <div class="flex justify-between mt-2">
              <span>Taxes</span>
              <span>${{ tax }}</span>
            </div>
            <div
              v-if="form.delivery.orderType.toLowerCase() === 'delivery'"
              class="flex justify-between mt-2"
            >
              <span>Delivery (10%)</span>
              <span>${{ deliveryCost }}</span>
            </div>
            <div class="flex justify-between mt-2">
              <span>Tip</span>
              <div class="flex items-center">
                <span>$</span>
                <input
                  type="text"
                  v-model="tip"
                  @keypress="onTipInputKeypress"
                  class="ml-3 w-16 h-7 border border-gray-400 text-center focus:border-gray-500 focus:outline-none"
                />
              </div>
            </div>
            <div class="flex justify-between mt-8">
              <strong>Total</strong>
              <strong>${{ total }}</strong>
            </div>
          </div>
        </section>
        <button class="btn btn-primary w-full p-3 mt-10">
          PAY
        </button>
      </div>
      <div class="hidden lg:block">
        <img src="~/assets/img/howdy2.png" alt="Howdy Breakfast Buns" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from 'moment'

export default {
  data() {
    return {
        tip: 0,
    };
  },
  computed: {
    ...mapGetters({
      form: "order-form/fields",
    }),
    addonsTotal() {
      return this.form.addons.reduce((t, item) => t + item.qty * item.price, 0);
    },
    subtotal() {
      return this.addonsTotal + this.form.size.subtotal;
    },
    deliveryCost() {
      if (this.form.delivery.orderType.toLowerCase() === "pickup") return 0;

      return Number((0.1 * this.subtotal).toFixed(2));
    },
    tax() {
      return Number((0.1175 * this.subtotal).toFixed(2));
    },
    total() {
      return this.subtotal + this.tax + this.deliveryCost + Number(this.tip)
    },
    formattedOrderDatetime(){
      const date = moment(this.form.delivery.date, 'MM/DD/YYYY').format('MMM DD')
      const time = moment(this.form.delivery.deliveryTime, 'hh:mm a').format('h:mm a')

      return `${date} @ ${time}`
    }
  },
  methods: {
    ...mapActions({
      update: "order-form/update",
    }),
    onTipInputKeypress(e) {
      // Only accept numbers
      if (!(e.charCode >= 48 && e.charCode <= 57)) e.preventDefault()
    },
  },
};
</script>

<style scoped>
.label {
  @apply text-xs text-highlight !font-normal uppercase;
}
</style>
