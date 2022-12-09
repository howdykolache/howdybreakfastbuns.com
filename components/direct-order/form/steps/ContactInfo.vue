<template>
  <section>
    <h4 class="text-center text-lg font-bold lg:text-2xl">CONTACT INFO</h4>
    <div class="lg:flex justify-between mt-4 lg:gap-x-20 lg:mt-16">
      <div class="w-full lg:w-7/12">
        <p>Let's get started with some basic info for the order</p>
        <Input label="What is your name?" />
        <Input
          label="What is your email address?" 
          sublabel="For sending receipts or confirmations" type="email" 
        />
        <Input 
          label="What is the best number to text?" 
          sublabel="For notifications on the order date" 
        />
      </div>
      <div class="hidden lg:block">
        <img src="~/assets/img/howdy2.png" alt="Howdy Breakfast Buns" />
      </div>
    </div>
  </section>
</template>

<script>
import Input from "@/components/inputs/Input.vue";

export default {
  components: {
    Input,
  },
};
</script>
