<template>
  <div class="mt-10">
    <span class="label">ORDER DETAILS</span>
    <!-- Items -->
    <div class="mt-3">
      <div class="flex items-center">
        <strong class="w-10 text-sm">{{ form.size.dozens }}</strong>
        <div class="flex items-center">
          <span>Howdy Breakfast Buns (dozen)</span>
          <EditButton route="/order/direct/form/order-size" />
        </div>
        <span class="flex-1 text-right"
          >${{ form.size.kolachesCostInCents / 100 }}</span
        >
      </div>
      <span class="ml-10 text-gray-500 text-sm">{{ form.flavors }}</span>
    </div>
    <!-- Addons -->
    <div v-for="(addon, index) in form.addons" :key="index" class="mt-3">
      <div class="flex items-center">
        <strong class="w-10 text-sm">{{ addon.qty }}</strong>
        <span>{{ addon.name }}</span>
        <span class="flex-1 text-right"
          >${{ (addon.qty * addon.priceInCents) / 100 }}</span
        >
      </div>
    </div>
    <!-- Subtotal -->
    <div class="ml-10 mt-10">
      <div class="flex justify-between mt-2">
        <span>Subtotal</span>
        <span>${{ subtotal / 100 }}</span>
      </div>
      <div class="flex justify-between mt-2">
        <span>Taxes</span>
        <span>${{ tax / 100 }}</span>
      </div>
      <div
        v-if="form.delivery.orderType.toLowerCase() === 'delivery'"
        class="flex justify-between mt-2"
      >
        <span>Delivery (10%)</span>
        <span>${{ deliveryCost / 100 }}</span>
      </div>
      <div class="flex justify-between mt-2">
        <span>Tip</span>
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
        <strong>${{ total / 100 }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EditButton from '../EditButton.vue'

export default {
  components: {
    EditButton
  },
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
  },
  methods: {
    ...mapActions({
      update: "order-form/update",
    }),
    onTipInputKeypress(e) {
      // Only accept numbers
      if (!(e.charCode >= 48 && e.charCode <= 57)) e.preventDefault()
    },
    onTipChange(){
      this.update({
        tipInCents: this.tipInCents
      });
    }
  },
};
</script>

