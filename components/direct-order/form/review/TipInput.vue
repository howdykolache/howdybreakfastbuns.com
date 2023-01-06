<template>
  <div class="flex justify-between mt-2">
    <span>Tip</span>
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
export default {
  props: {
    value: {
      required: true
    },
  },
  data() {
    return {
      tip: this.value,
    };
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
  },
};
</script>
