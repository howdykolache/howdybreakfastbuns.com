<template>
  <div class="flex flex-col mt-4">
    <label v-if="label">{{ label }}</label>
    <input
      v-model="inputValue"
      @input="$emit('input', $event.target.value)"
      :type="type"
      :class="{'mt-2': label}"
      class="border border-gray-400 p-2 focus:border-gray-500 focus:outline-none"
    />
    <span v-if="sublabel" class="text-sm text-gray-400 mt-1">{{
      sublabel
    }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      required: false,
      type: String,
    },
    sublabel: {
      required: false,
      type: String,
    },    
    type: {
      default: 'text',
      type: String,
    },
    value: {
      required: false,
    },
  },
  data() {
    return {
      inputValue: this.value,
    };
  },
  watch: {
    value: {
      handler: function (newVal) {
        this.inputValue = newVal;
      },
    },
  },
};
</script>
