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
              <span class="flex-1 text-right">${{ (form.size.kolachesCostInCents / 100).toLocaleString() }}</span>
            </div>
            <span class="ml-10 text-gray-500 text-sm">{{ form.flavors }}</span>
          </div>
          <!-- Addons -->
          <div v-for="(addon, index) in form.addons" :key="index" class="mt-3">
            <div class="flex items-center">
              <strong class="w-10 text-sm">{{ addon.qty }}</strong>
              <span>{{ addon.name }}</span>
              <span class="flex-1 text-right"
                >${{ ((addon.qty * addon.priceInCents) / 100).toLocaleString() }}</span
              >
            </div>
          </div>
          <!-- Subtotal -->
          <div class="ml-10 mt-10">
            <div class="flex justify-between mt-2">
              <span>Subtotal</span>
              <span>${{ (subtotal / 100).toLocaleString() }}</span>
            </div>
            <div class="flex justify-between mt-2">
              <span>Taxes</span>
              <span>${{ (tax / 100).toLocaleString() }}</span>
            </div>
            <div
              v-if="form.delivery.orderType.toLowerCase() === 'delivery'"
              class="flex justify-between mt-2"
            >
              <span>Delivery (10%)</span>
              <span>${{ (deliveryCost / 100).toLocaleString() }}</span>
            </div>
            <div class="flex justify-between mt-2">
              <div>
                <span class="mr-4">
                  Tip
                </span>
                <button
                  class="tip-button"
                  :class="{active: tipPercentEquals(10)}"
                  @click="onTipButtonClicked(10, $event)"
                >
                  10%
                </button>
                <button
                  class="tip-button"
                  :class="{active: tipPercentEquals(20)}"
                  @click="onTipButtonClicked(20, $event)"
                >
                  20%
                </button>
                <button
                  class="tip-button"
                  :class="{active: tipPercentEquals(30)}"
                  @click="onTipButtonClicked(30, $event)"
                >
                  30%
                </button>
                <button
                  @click="clearTip"
                  class="text-sm text-gray-400 pl-4"
                >
                  clear
                </button>
              </div>
              <div class="flex items-center">
                <span>$</span>
                <input
                  type="text"
                  v-model="tip"
                  @keypress="onTipInputKeypress"
                  @change="onTipChange"
                  class="ml-3 w-16 h-7 border border-gray-400 text-center focus:border-gray-500 focus:outline-none"
                />
              </div>
            </div>
            <div class="flex justify-between mt-8">
              <strong>Total</strong>
              <strong>${{ (total / 100).toLocaleString() }}</strong>
            </div>
          </div>
        </section>
        <button @click="$emit('submit')" class="btn btn-primary w-full p-3 mt-10">
          PAY
        </button>
        <button class="btn btn-secondary w-full p-3 mt-2 underline" @click="$emit('previous')">
          Previous step
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
      return this.form.addons.reduce((t, item) => t + item.qty * item.priceInCents, 0);
    },
    subtotal() {
      return this.addonsTotal + this.form.size.kolachesCostInCents;
    },
    deliveryCost() {
      if (this.form.delivery.orderType.toLowerCase() === "pickup") return 0;

      return 0.1 * this.subtotal;
    },
    tax() {
      return parseInt(0.1175 * this.subtotal, 10)
    },
    tipInCents(){
      return Number(this.tip) * 100
    },
    total() {
      return this.subtotal + this.tax + this.deliveryCost + this.tipInCents
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
    onTipButtonClicked(pct, e) {
      let newTipInCents = (pct/100) * this.subtotal
      this.tip = Math.round(newTipInCents) / 100
      this.onTipChange()
    },
    tipPercentEquals(pct) {
      // return true if the amount in the tip input equals approximately the argument percent amount
      let computedTip  = (pct / 100) * this.subtotal
      return Math.abs(computedTip - this.tipInCents) < 100
    },
    clearTip() {
      this.tip = 0
      this.onTipChange()
    },
    onTipInputKeypress(e) {
      // Only accept numbers and period for decimal (46)
      if (!((e.charCode >= 48 && e.charCode <= 57) || e.charCode == 46)) e.preventDefault()
    },
    onTipChange(){
      this.update({
        tipInCents: this.tipInCents
      });
    }
  },
};
</script>

<style scoped>
.label {
  @apply text-xs text-highlight !font-normal uppercase;
}

button.tip-button {
  font-size: 0.8em;
  border-radius: 5px;
  padding: 0em 1em;
}

button.tip-button.active {
  @apply bg-primary;
}
</style>
