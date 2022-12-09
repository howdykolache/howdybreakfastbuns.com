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
          <Input label="What date will your order be?" />
          <Input label="What time would you like your order?" />
          <RadioButton
            label="Pickup"
            sublabel="Pick up at our bakery location at 817 W Fulton for no charge"
            name="deliveryType"
            content="pickup"
            class="mt-8"
          />
          <RadioButton
            label="Delivery"
            sublabel="10% of order subtotal, within 5 miles of loop"
            name="deliveryType"
            content="delivery"
          />
          <div class="ml-9">
            <Input label="Address" class="mt-1" />
            <Input label="Delivery notes" class="mt-1" />
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
import RadioButton from "@/components/inputs/RadioButton.vue";
import Input from "@/components/inputs/Input.vue";

export default {
  components: {
    RadioButton,
    Input,
  },
};
</script>
