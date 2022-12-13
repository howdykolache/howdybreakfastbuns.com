<template>
  <div>
    <h4 class="text-center text-lg font-bold lg:text-2xl">
      ORDER SIZE ( ${{ pricePerDozenInCents / 100 }}/dozen)
    </h4>
    <div class="lg:flex justify-between mt-4 lg:gap-x-20 lg:mt-16">
      <div class="w-full lg:w-7/12">
        <Input
          v-model="fields.numberOfPeople"
          @change="onChange"
          type="number"
          label="About how many people are we feeding?"
        />
        <div class="mt-6">
          <label>What kind of eaters are we?</label>
          <RadioButton
            v-model="fields.bunsPerPerson"
            @change="onChange"
            label="Light (1/person)"
            sublabel="Casual. Just a light breakfast. Some might not eat, but others might have an extra bite."
            name="bunsPerPerson"
            content="1"
            class="!mt-1"
          />
          <RadioButton
            v-model="fields.bunsPerPerson"
            @change="onChange"
            label="Medium (2/person)"
            sublabel="Solid. This is about as much for a sit down breakfast per person."
            name="bunsPerPerson"
            content="2"
          />
          <RadioButton
            v-model="fields.bunsPerPerson"
            @change="onChange"
            label="Hungry (3/person)"
            sublabel="Big eaters. These folks are going to eat!"
            name="bunsPerPerson"
            content="3"
          />
        </div>
        <p>
          Howdy Breakfast Buns by the dozen. Based on your preferences, we
          recommend around {{ recommendedDozens }} dozen.
        </p>
        <Input
          v-model="fields.dozens"
          @change="onChange"
          type="number"
          label="How many dozen would you like?"
        />
        <p>Subtotal: ${{ subtotal / 100 }}</p>
        <button
          :class="{'opacity-60 cursor-not-allowed': !canProceed}"
          :disabled="!canProceed"
          class="btn btn-primary w-full p-3 mt-10"
          @click="$emit('next')"
        >
          Next: SELECT MIX
        </button>
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
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    RadioButton,
    Input,
  },
  data() {
    return {
      pricePerDozenInCents: 5900,
      fields: {
        numberOfPeople: 1,
        bunsPerPerson: 1,
        dozens: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      form: "order-form/fields",
    }),
    recommendedDozens(){
      return Math.ceil((this.fields.numberOfPeople * this.fields.bunsPerPerson) / 12)
    },
    subtotal(){
      return this.fields.dozens * this.pricePerDozenInCents
    },
    canProceed(){
      return this.fields.numberOfPeople && this.fields.dozens
    }
  },
  methods: {
    ...mapActions({
      update: "order-form/update",
    }),
    onChange() {
      this.update({
        size: { 
          ...this.fields,
          kolachesCostInCents: this.subtotal
        },
      });
    },
  },
  mounted(){
    this.onChange()
  },
  watch: {
    'fields.numberOfPeople': {
      handler: function() {
        this.fields.dozens = this.recommendedDozens
        this.onChange()
      }
    },
    'fields.bunsPerPerson': {
      handler: function() {
        this.fields.dozens = this.recommendedDozens
        this.onChange()
      }
    }
  }
};
</script>
