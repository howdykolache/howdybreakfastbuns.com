<template>
  <div class="mt-6 lg:mt-12">
    <h4 class="text-center text-lg font-bold lg:text-2xl">CONTACT INFO</h4>
    <div class="lg:flex justify-between mt-4 lg:gap-x-20 lg:mt-16">
      <div class="w-full lg:w-7/12">
        <p>Let's get started with some basic info for the order</p>
        <Input v-model="fields.name" @change="onChange">
          What is your <span class="text-highlight">name</span>?
        </Input>
        <Input
          v-model="fields.email"
          @change="onChange"
          sublabel="For sending receipts or confirmations"
          type="email"
        >
          What is your <span class="text-highlight">email address</span>?
        </Input>
        <Input
          v-model="fields.phoneNumber"
          @change="onChange"
          sublabel="For text message notifications on the order date"
        >
          What is the best
          <span class="text-highlight">cell phone number</span> to text?
        </Input>
        <button
          :class="{ 'opacity-60 cursor-not-allowed': !canProceed }"
          :disabled="!canProceed"
          class="btn btn-primary w-full p-3 mt-10"
          @click="next"
        >
          {{ inEditMode ? 'Save' : 'Next: DATE & TIME' }}
        </button>
      </div>
      <div class="hidden lg:block">
        <img src="~/assets/img/howdy2.png" alt="Howdy Breakfast Buns" />
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/components/inputs/Input.vue";
import formStepMixin from "@/mixins/order-form/form-step-mixin";

export default {
  components: {
    Input,
  },
  mixins: [formStepMixin],
  data() {
    return {
      fields: {
        name: "",
        email: "",
        phoneNumber: "",
      },
      nextStepRoute: "/order/direct/form/order-date"
    };
  },
  computed: {
    canProceed() {
      const { name, email, phoneNumber } = this.fields;
      return name.length && email.length && phoneNumber.length;
    },
    dataToCommit(){
      return {
        contact: { ...this.fields },
      }
    }
  },
  mounted() {
    this.fields = { ...this.form.contact }
  },
};
</script>
