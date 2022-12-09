<template>
  <div>
    <h4 class="text-center text-lg font-bold lg:text-2xl">ORDER DATE & TIME</h4>
    <div class="lg:flex justify-between mt-4 lg:gap-x-20 lg:mt-16">
      <div class="w-full lg:w-7/12">
        <p>
          Our standard orders are weekdays from 7:30-1:30pm. For orders outside
          that, please
          <a
            href="mailto:howdy@howdykolache.com?subject=Request%20for%20info%20for%20order!%20%3A)"
            class="text-highlight"
            >contact us directly</a
          >.
        </p>
        <div>
          <Input
            v-model="fields.date"
            @change="onChange"
            label="What date will your order be?"
          />
          <Input
            v-model="fields.deliveryTime"
            @change="onChange"
            label="What time would you like your order?"
          />
          <RadioButton
            v-model="fields.orderType"
            @change="onChange"
            label="Pickup"
            sublabel="Pick up at our bakery location at 817 W Fulton for no charge"
            name="deliveryType"
            content="Pickup"
            class="mt-8"
          />
          <RadioButton
            v-model="fields.orderType"
            @change="onChange"
            label="Delivery"
            sublabel="10% of order subtotal, within 5 miles of loop"
            name="deliveryType"
            content="Delivery"
          />
          <div
            v-if="fields.orderType.toLowerCase() === 'delivery'"
            class="ml-9"
          >
            <Input
              v-model="fields.address"
              @change="onChange"
              label="Address"
              class="mt-1"
            />
            <Input
              v-model="fields.deliveryNotes"
              @change="onChange"
              label="Delivery notes"
              class="mt-1"
            />
          </div>
        </div>
      </div>
      <div class="hidden lg:block">
        <img src="~/assets/img/howdy2.png" alt="Howdy Breakfast Buns" />
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/components/inputs/Input.vue";
import RadioButton from "@/components/inputs/RadioButton";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Input,
    RadioButton,
  },
  data() {
    return {
      fields: {
        date: null,
        deliveryTime: null,
        orderType: "Pickup",
        address: "",
        deliveryNotes: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      form: "order-form/fields",
    }),
  },
  methods: {
    ...mapActions({
      update: "order-form/update",
    }),
    onChange() {
      this.update({
        delivery: { ...this.fields },
      });
    },
  },
  mounted(){
    this.onChange()
  }
};
</script>
