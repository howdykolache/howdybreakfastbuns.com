<template>
  <div class="flex justify-between mt-2">
    <div>
      <span class="mr-4"> Tip </span>
      <button
        v-for="(tipAmount, index) in tipButtons"
        :key="index"
        class="tip-button"
        :class="{ active: tip.percentage === tipAmount }"
        @click="onTipButtonClicked(tipAmount)"
      >
        {{ tipAmount }}%
      </button>
      <button
        v-show="this.tip.value != 0"
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
        v-model="tip.value"
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
      tip: { ...this.value },
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
    onChange(source = 'input') {
      // The change was done by directing using the input
      if (source === 'input') {
        // Switch to fixed amount
        this.tip.type = 'fixed'
        this.tip.percentage = null
      }

      // The value was changed using the predefined tip buttons
      if (source === 'tip-button') this.tip.type = 'percentage'

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
      this.tip.value = Math.round(newTipInCents) / 100;

      this.tip.percentage = pct

      this.onChange('tip-button');
    },
    clearTip() {
      this.tip.value = 0;
      this.onChange();
    },
  },
  watch: {
    value: {
        // Re-assign whenever the v-model value gets updated in the parent
        handler: function(newVal){
            this.tip = { ...newVal }
        },
        deep: true
    }
  }
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
