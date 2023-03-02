<template>
  <div class="w-2/12 flex justify-between items-center">
    <img
      src="~/assets/icons/minus.svg"
      @click="minus"
      class="w-6 cursor-pointer"
    />
    <input
      type="text"
      @change="onChange"
      @keypress="onKeypress"
      v-model="number"
      class="w-9 h-7 border border-gray-400 text-center focus:border-gray-500 focus:outline-none"
    />
    <img
      src="~/assets/icons/plus.svg"
      @click="plus"
      class="w-6 cursor-pointer"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      number: this.value,
    };
  },
  methods: {
    plus() {
      this.number++;
      this.onChange();
    },
    minus() {
      if (!this.number) return;

      this.number--;
      this.onChange();
    },
    onChange() {
      this.$emit("input", this.number);
      this.$emit("change");
    },
    onKeypress(e) {
      if (!(e.charCode >= 48 && e.charCode <= 57)) e.preventDefault();
    },
  },
  watch: {
    value: {
      handler: function (newVal) {
        this.number = newVal;
      },
    },
  },
};
</script>
