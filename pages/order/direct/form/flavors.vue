<template>
  <div class="mt-6 lg:mt-12">
    <h4 class="text-center text-lg font-bold lg:text-2xl">FLAVORS</h4>
    <div class="lg:flex justify-between mt-4 lg:gap-x-20 lg:mt-16">
      <div class="w-full lg:w-7/12">
        <p>
          Would you like to use one of our standard recommended breakfast
          assortments or choose your own flavors (by the dozen)
        </p>
        <div>
          <RadioButton
            v-model="flavors"
            @change="onChange"
            label="Howdy Mix (Most Popular!)"
            sublabel="Our standard recommended assortment with our top flavors. 40% vegetarian to cater to everyone's needs."
            name="flavors"
            content="Howdy Mix"
          />
          <RadioButton
            v-model="flavors"
            @change="onChange"
            label="Vegetarian Only"
            sublabel="All vegetarian crowd? Fear not! We've got you covered!"
            name="flavors"
            content="Vegetarian Only"
          />
          <RadioButton
            v-model="flavors"
            @change="onChange"
            label="Sweet & Savory"
            sublabel="Love our sweet variations like cream cheese and seasonal fruit? This is a 50/50 sweet and savory mix."
            name="flavors"
            content="Sweet & Savory"
          />
          <RadioButton
            v-model="flavors"
            @change="onChange"
            :force-checked="showCustomFlavorsInput"
            label="Choose My Own"
            sublabel="Select your own flavors (by the dozen)"
            name="flavors"
            content=""
          />
          <div v-if="showCustomFlavorsInput" class="ml-9 mt-1">
            <label class="text-sm text-gray-400">
              Enter your flavors (1 dozen per flavor)
            </label>
            <textarea
              type="text"
              v-model="flavors"
              @change="onChange"
              class="mt-1 h-28 w-full border border-gray-400 p-2 focus:border-gray-500 focus:outline-none"
            >
            </textarea>
          </div>
          <button
            :class="{ 'opacity-60 cursor-not-allowed': !canProceed }"
            :disabled="!canProceed"
            class="btn btn-primary w-full p-3 mt-10"
            @click="next"
          >
            Next: ADD-ONS
          </button>
          <PreviousStepButton @previous="$emit('previous')"/>
        </div>
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
import formStepMixin from "@/mixins/order-form/form-step-mixin";

export default {
  components: {
    RadioButton,
    PreviousStepButton,
  },
  mixins: [formStepMixin],
  data() {
    return {
      flavors: "Howdy Mix",
      nextStepRoute: "/order/direct/form/addons"
    };
  },
  computed: {
    showCustomFlavorsInput() {
      if (
        this.flavors.startsWith("Howdy Mix") ||
        this.flavors.startsWith("Vegetarian") ||
        this.flavors.startsWith("Sweet")
      )
        return false;

      return true;
    },
    canProceed() {
      return this.flavors.length;
    },
    dataToCommit(){
      return {
        flavors: this.flavors,
      }
    }
  },
  mounted() {
    this.flavors = this.form.flavors
  },
};
</script>
