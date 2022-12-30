<template>
  <div class="mt-6 lg:mt-12">
    <h4 class="text-center text-lg font-bold lg:text-2xl">ADD-ONS</h4>
    <div class="lg:flex justify-between mt-4 lg:gap-x-20 lg:mt-16">
      <div class="w-full lg:w-8/12">
        <div
          v-for="(addon, key) in addons"
          :key="key"
          :class="{ '!mt-6': !addon.description }"
          class="flex items-start mt-2"
        >
          <div class="w-2/12 flex justify-between items-center">
            <img
              src="~/assets/icons/minus.svg"
              @click="decrementAddonQty(key)"
              class="w-6 cursor-pointer"
            />
            <input
              type="text"
              @change="onChange"
              @keypress="onQtyInputKeypress"
              v-model="addons[key].value"
              class="w-9 h-7 border border-gray-400 text-center focus:border-gray-500 focus:outline-none"
            />
            <img
              src="~/assets/icons/plus.svg"
              @click="incrementAddonQty(key)"
              class="w-6 cursor-pointer"
            />
          </div>
          <div class="w-10/12 ml-4 flex flex-col">
            <span class="mt-0.5">{{ addon.name }}</span>
            <span class="text-gray-400 text-sm">{{ addon.description }}</span>
          </div>
        </div>
        <button @click="next" class="btn btn-primary w-full p-3 mt-10">
          REVIEW
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
import formStepMixin from "@/mixins/order-form/form-step-mixin";

export default {
  components: {
    PreviousStepButton,
  },
  mixins: [formStepMixin],
  data() {
    return {
      addons: {
        "chia pudding": {
          name: "Chia pudding (Vegan/Gluten Free)",
          description:
            "Fruit chia pudding that we make in house. Gluten free and vegan. No refined sugars. Contains almond milk.",
          value: 0,
          priceInCents: 0,
          id: 1,
        },
        "coffee carafe": {
          name: "Coffee carafe ($35)",
          description:
            "Coffee carafe, cups, lids, creamer, sweetener for 10 people. Serving Groundswell coffee, one of our favorite local brewers in Chicago.",
          value: 0,
          priceInCents: 3500,
          id: 2,
        },
        "tea carafe": {
          name: "Tea carafe ($35)",
          description:
            "Hot water carafe, assorted tea bags, cups for 10 people.",
          value: 0,
          priceInCents: 3500,
          id: 3,
        },
        "orange juice": {
          name: "Orange juice ($4)",
          value: 0,
          priceInCents: 400,
          id: 4,
        },
        "topo chico": {
          name: "Topo chico ($4)",
          value: 0,
          priceInCents: 400,
          id: 5,
        },
      },
      nextStepRoute: "/order/direct/form/review"
    };
  },
  computed: {
    selectedAddons() {
      const res = [];

      for (const key in this.addons) {
        const addon = this.addons[key];
        if (parseInt(addon.value)) {
          res.push({
            name: addon.name,
            qty: Number(addon.value),
            priceInCents: addon.priceInCents,
            id: addon.id,
          });
        }
      }

      return res;
    },
    dataToCommit(){
      return {
        addons: this.selectedAddons,
      }
    }
  },
  methods: {
    incrementAddonQty(key) {
      this.addons[key].value++;
      this.onChange();
    },
    decrementAddonQty(key) {
      if (!this.addons[key].value) return;

      this.addons[key].value--;
      this.onChange();
    },
    onQtyInputKeypress(e) {
      if (!(e.charCode >= 48 && e.charCode <= 57)) e.preventDefault();
    },
    initFromStore(){
      for (const key in this.addons) {
        const addon = this.addons[key];
        const previousInstance = this.form.addons.find(a => a.id === addon.id)

        if(previousInstance) this.addons[key].value = previousInstance.qty
      }
    }
  },
  mounted() {
    this.initFromStore()
  },
};
</script>
