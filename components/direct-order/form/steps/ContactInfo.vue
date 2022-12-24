<template>
  <section>
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
          label="What is your email address?" 
          sublabel="For sending receipts or confirmations" type="email" 
        />
        <Input 
          v-model="fields.phoneNumber"
          @change="onChange"
          label="What is the best number to text?" 
          sublabel="For notifications on the order date" 
        />
        <button
          :class="{'opacity-60 cursor-not-allowed': !canProceed}"
          :disabled="!canProceed"
          class="btn btn-primary w-full p-3 mt-10"
          @click="$emit('next')"
        >
          Next: DATE & TIME
        </button>
      </div>
      <div class="hidden lg:block">
        <img src="~/assets/img/howdy2.png" alt="Howdy Breakfast Buns" />
      </div>
    </div>
  </section>
</template>

<script>
import Input from "@/components/inputs/Input.vue";
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Input,
  },
  data(){
    return {
      fields: {
        name: '',
        email: '',
        phoneNumber: '',
      }
    }
  },
  computed: {
    ...mapGetters({
      form: 'order-form/fields'
    }),
    canProceed(){
      const { name, email, phoneNumber } = this.fields
      return name.length && email.length && phoneNumber.length
    }
  },
  methods: {
    ...mapActions({
      update: 'order-form/update'
    }),
    onChange(){
      this.update({
        contact: { ...this.fields }
      })
    }
  },
  mounted(){
    this.onChange()
  }
};
</script>
