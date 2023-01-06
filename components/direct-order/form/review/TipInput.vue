<template>
  <div class="flex justify-between mt-2">
    <div>
      <span class="mr-4"> Tip </span>
      <button
        v-for="(tipAmount, index) in tipButtons"
        :key="index"
        class="tip-button"
        :class="{ active: tipPercentEquals(tipAmount) }"
        @click="onTipButtonClicked(tipAmount)"
      >
        {{ tipAmount }}%
      </button>
      <button
        v-show="this.tip != 0"
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
        @keypress="onInputKeypress"
        @change="onChange"
        class="ml-3 w-16 h-7 border border-gray-400 text-center focus:border-gray-500 focus:outline-none"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    value: {
      required: true
    },
  },
  data() {
    return {
      tip: this.value,
      tipButtons: [10, 20, 30],
    };
  },
  computed: {
    ...mapGetters({
      subtotal: "order-form/subtotal",
      form: "order-form/fields",
    }),
  },
  methods: {
    onChange() {
      this.$emit("input", this.tip);
      this.$emit("change");
    },
    onInputKeypress(e) {
      // Only accept numbers and period for decimal (46)
      if (!((e.charCode >= 48 && e.charCode <= 57) || e.charCode == 46)) {
        e.preventDefault();
      }
    },
    onTipButtonClicked(pct) {
      let newTipInCents = (pct / 100) * this.subtotal;
      this.tip = Math.round(newTipInCents) / 100;
      this.onChange();
    },
    tipPercentEquals(pct) {
      // return true if the amount in the tip input equals approximately the argument percent amount
      let computedTip = (pct / 100) * this.subtotal;
      return Math.abs(computedTip - this.form.tipInCents) < 100;
    },
    clearTip() {
      this.tip = 0;
      this.onChange();
    },
  },
};
</script>

<style scoped>
button.tip-button {
  @apply border-primary border;
  font-size: 0.8em;
  border-radius: 5px;
  padding: 0em 1em;
}
button.tip-button.active {
  @apply bg-primary;
}
</style>
