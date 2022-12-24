<template>
  <div class="flex flex-col mt-4">
    <label v-if="label || hasLabelSlot" class="mb-2"><slot>{{ label }}</slot></label>
    <input
      v-model="inputValue"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change')"
      :type="type"
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
  computed: {
    hasLabelSlot() {
      // slot is used and has a value
      return this.$slots.default && !!this.$slots.default[0].text.length
    }
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
