<template>
  <label class="flex mt-2 cursor-pointer">
    <div>
      <input
        type="radio"
        :name="name"
        :value="content"
        :checked="(checked || forceChecked)"
        @change="$emit('input', $event.target.value)"
      />
    </div>
    <div class="ml-4 flex flex-col">
      <span>{{ label }}</span>
      <span v-if="sublabel" class="text-gray-400 text-sm">{{ sublabel }}</span>
    </div>
  </label>
</template>

<script>
export default {
  props: {
    name: {
      required: true,
      type: String,
    },
    content: {
      required: true,
      type: String,
    },
    label: {
      required: true,
      type: String,
    },
    sublabel: {
      required: false,
      type: String,
    },
    value: {
      required: false,
    },    
    forceChecked: {
      required: false,
      default: false
    },
  },
  data() {
    return {
      checked: this.content === this.value,
    };
  },
  watch: {
    value: {
      handler: function (newVal) {
        this.checked = this.content === newVal;
      },
    },
  },
};
</script>

<style scoped>
input {
  @apply w-5 h-5 p-0.5 mt-0.5 inline-block border border-gray-400 bg-transparent appearance-none  bg-clip-content rounded-full;
}

input:checked {
  @apply bg-primary border-primary;
}
</style>
