<template>
  <div class="mt-6 lg:mt-12">
    <h4 class="text-center text-lg font-bold lg:text-2xl">
      ORDER SIZE ( ${{ pricePerDozenInCents / 100 }}/dozen)
    </h4>
    <div class="lg:flex justify-between mt-4 lg:gap-x-20 lg:mt-16">
      <div class="w-full lg:w-7/12">
        <Input v-model="fields.numberOfPeople" @change="onChange" type="number">
          How many <span class="text-highlight">people</span> are you feeding?
        </Input>
        <div class="mt-6">
          <label
            >What kind of <span class="text-highlight">appetite</span> are you
            expecting?</label
          >
          <RadioButton
            v-model="fields.bunsPerPerson"
            @change="onChange"
            label="Light (1 per person)"
            sublabel="Casual. Just a light breakfast. Some might not eat, but others might have an extra bite."
            name="bunsPerPerson"
            content="1"
            class="!mt-1"
          />
          <RadioButton
            v-model="fields.bunsPerPerson"
            @change="onChange"
            label="Medium (2 per person)"
            sublabel="Solid. This is about as much for a sit down breakfast per person."
            name="bunsPerPerson"
            content="2"
          />
          <RadioButton
            v-model="fields.bunsPerPerson"
            @change="onChange"
            label="Hungry (3 per person)"
            sublabel="Big eaters. These folks are going to eat!"
            name="bunsPerPerson"
            content="3"
          />
        </div>
        <section id="orderSizeRecommendation" v-if="showRecommendation">
          <p>
            Based on your preferences,
            <span class="text-highlight font-bold"
              >we recommend {{ recommendedDozens }} dozen</span
            >
            breakfast buns (we sell by the dozen).
          </p>
          <Input
            v-model="fields.dozens"
            @change="onChange"
            type="number"
            label="How many dozen would you like? ($59/dozen)"
          />
          <p><span class="text-highlight font-bold">Subtotal: ${{ (subtotal / 100).toLocaleString() }}</span></p>
        </section>
        <button
          :class="{ 'opacity-60 cursor-not-allowed': !canProceed }"
          :disabled="!canProceed"
          class="btn btn-primary w-full p-3 mt-10"
          @click="next"
        >
          {{ inEditMode ? 'Save' : 'Next: SELECT MIX' }}
        </button>
        <PreviousStepButton @previous="$emit('previous')"/>
      </div>
      <div class="hidden lg:block">
        <img src="~/assets/img/howdy2.png" alt="Howdy Breakfast Buns" />
      </div>
    </div>
  </div>
</template>

<script>
import PreviousStepButton from "@/components/direct-order/form/PreviousStepButton.vue"
import RadioButton from "@/components/inputs/RadioButton.vue";
import Input from "@/components/inputs/Input.vue";
import formStepMixin from "@/mixins/order-form/form-step-mixin";

export default {
  components: {
    PreviousStepButton,
    RadioButton,
    Input,
  },
  mixins: [formStepMixin],
  data() {
    return {
      pricePerDozenInCents: 5900,
      fields: {
        numberOfPeople: null,
        bunsPerPerson: null,
        dozens: null,
      },
      nextStepRoute: "/order/direct/form/flavors"
    };
  },
  computed: {
    recommendedDozens() {
      return Math.ceil(
        (this.fields.numberOfPeople * this.fields.bunsPerPerson) / 12
      );
    },
    subtotal() {
      return this.fields.dozens * this.pricePerDozenInCents;
    },
    showRecommendation() {
      return this.fields.numberOfPeople && this.fields.bunsPerPerson;
    },
    canProceed() {
      return this.fields.numberOfPeople && this.fields.bunsPerPerson && Number(this.fields.dozens)
    },
    dataToCommit(){
      return {
        size: {
          ...this.fields,
          kolachesCostInCents: this.subtotal,
        },
      }
    }
  },
  mounted() {
    this.fields.numberOfPeople = this.form.size.numberOfPeople
    this.fields.bunsPerPerson = this.form.size.bunsPerPerson
    this.fields.dozens = this.form.size.dozens || 1
  },
  watch: {
    "fields.numberOfPeople": {
      handler: function (newValue, oldValue) {
        // Ignore the initial assignment/change
        if (oldValue === null) return 

        this.fields.dozens = this.recommendedDozens;
        this.onChange();
      },
    },
    "fields.bunsPerPerson": {
      handler: function (newValue, oldValue) {
        if (oldValue === null) return 

        this.fields.dozens = this.recommendedDozens;
        this.onChange();
      },
    },
  },
};
</script>
