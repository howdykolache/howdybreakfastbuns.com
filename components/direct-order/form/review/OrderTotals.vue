<template>
  <div class="mt-10">
    <div class="flex items-center">
      <span class="label">ORDER DETAILS</span>
      <EditButton route="/order/direct/form/order-size" next="" />
    </div>
    <!-- Items -->
    <div class="mt-3">
      <div class="flex items-center">
        <strong class="w-10 text-sm">{{ form.size.dozens }}</strong>
        <span>Howdy Breakfast Buns (dozen)</span>
        <span class="flex-1 text-right"
          >${{ formatCents(form.size.kolachesCostInCents) }}</span
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
          >${{ formatCents(addon.qty * addon.priceInCents) }}</span
        >
      </div>
    </div>
    <!-- Subtotal -->
    <div class="mt-10">
      <div class="flex justify-between mt-2 mb-10">
        <span>Subtotal</span>
        <span>${{ formatCents(subtotal) }}</span>
      </div>
      <div class="flex justify-between mt-2">
        <span>Taxes</span>
        <span>${{ formatCents(tax) }}</span>
      </div>
      <div
        v-if="form.delivery.orderType.toLowerCase() === 'delivery'"
        class="flex justify-between mt-2"
      >
        <span>Delivery (10%)</span>
        <span>${{ formatCents(deliveryCost) }}</span>
      </div>
      <TipInput v-model="tip" @change="onTipChange" />
      <div class="flex justify-between mt-8">
        <strong>Total</strong>
        <strong>${{ formatCents(total) }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EditButton from '../EditButton.vue'
import TipInput from './TipInput.vue'
import formStepMixin from "@/mixins/order-form/form-step-mixin";

export default {
  components: {
    EditButton,
    TipInput
  },
  mixins: [formStepMixin],
  data() {
    return {
        tip: {
          type: 'fixed',
          value: 0
        },
    };
  },
  computed: {
    ...mapGetters({
      form: "order-form/fields",
      addonsTotal: "order-form/addonsTotal",
      subtotal: "order-form/subtotal",
      deliveryCost: "order-form/deliveryCost",
      tax: "order-form/tax",
      total: "order-form/total",
    }),
  },
  methods: {
    ...mapActions({
      update: "order-form/update",
    }),
    onTipChange(){
      this.update({
        tipInCents: {
          ...this.tip,
          value: Number(this.tip.value) * 100
        }
      });
    },
    formatCents(cents) {
      return (cents / 100).toLocaleString()
    },
    recomputePercentageTip(){
      let computedTipAmount = (this.form.tipInCents.percentage / 100) * this.subtotal

      this.update({
        tipInCents: {
          ...this.form.tipInCents,
          value: computedTipAmount
        }
      })
    }
  },
  mounted(){
    // If the amount of the tip depends on the subtotal, re-calculate it 
    // whenever this component mounts
    if (this.form.tipInCents.type === 'percentage') this.recomputePercentageTip()

    let tipWithDecimals = this.form.tipInCents.value / 100 
    // Only need up to 2 decimal points
    tipWithDecimals = Math.round(tipWithDecimals * 100) / 100

    this.tip = {
      ...this.form.tipInCents,
      value: tipWithDecimals
    }
  }
};
</script>

