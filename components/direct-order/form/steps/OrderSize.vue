<template>
  <div>
    <h4 class="text-center text-lg font-bold lg:text-2xl">
      ORDER SIZE ( ${{ pricePerDozen }}/dozen)
    </h4>
    <div class="lg:flex justify-between mt-4 lg:gap-x-20 lg:mt-16">
      <div class="w-full lg:w-7/12">
        <Input label="About how many people are we feeding?" />
        <div class="mt-6">
          <label>What kind of eaters are we?</label>
          <RadioButton label="Light (1/person)"
            sublabel="Casual. Just a light breakfast. Some might not eat, but others might have an extra bite."
            name="bunsPerPerson" content="1" class="!mt-1" />
          <RadioButton label="Medium (2/person)"
            sublabel="Solid. This is about as much for a sit down breakfast per person." name="bunsPerPerson"
            content="2" />
          <RadioButton label="Hungry (3/person)" sublabel="Big eaters. These folks are going to eat!"
            name="bunsPerPerson" content="2" />
        </div>
        <p>Howdy Breakfast Buns by the dozen. Based on your preferences, we recommend around 5 dozen. </p>
        <Input label="How many dozen would you like?" />
        <p>Subtotal: $59</p>
      </div>
      <div class="hidden lg:block">
        <img src="~/assets/img/howdy2.png" alt="Howdy Breakfast Buns" />
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/components/inputs/RadioButton.vue";
import Input from "@/components/inputs/Input.vue";

export default {
  components: {
    RadioButton,
    Input,
  },
  data() {
    return {
      pricePerDozen: 59,
    };
  },
};
</script>
