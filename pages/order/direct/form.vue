<template>
  <div class="container mx-auto">
    <div class="mt-10">
      <ProgressIndicator />
      <NuxtChild />
    </div>
  </div>
</template>

<script>
import ProgressIndicator from "@/components/direct-order/form/ProgressIndicator.vue";

export default {
  components: {
    ProgressIndicator
  }
};
</script>
