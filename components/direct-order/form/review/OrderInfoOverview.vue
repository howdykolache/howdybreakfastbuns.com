<template>
  <div>
    <div class="flex">
      <div class="w-1/2 flex flex-col mt-5">
        <span class="label">DATE & TIME</span>
        <span class="mt-1">{{ formattedOrderDatetime }}</span>
      </div>
      <div class="w-1/2 flex flex-col mt-5">
        <span class="label">ORDER TYPE</span>
        <span class="mt-1">{{ form.delivery.orderType }}</span>
      </div>
    </div>
    <div class="flex">
      <div class="w-1/2 flex flex-col mt-5">
        <span class="label">CONTACT</span>
        <span class="mt-1 flex flex-col">
          <span>{{ form.contact.name }}</span>
          <span>{{ form.contact.email }}</span>
          <span>{{ form.contact.phoneNumber }}</span>
        </span>
      </div>
      <div class="w-1/2 flex flex-col mt-5">
        <span class="label">ADDRESS</span>
        <span
          v-if="form.delivery.orderType.toLowerCase() === 'pickup'"
          class="mt-1"
        >
          817 W Fulton Market
        </span>
        <span>{{ form.delivery.address }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from 'moment'

export default {
  computed: {
    ...mapGetters({
      form: "order-form/fields",
    }),
    formattedOrderDatetime(){
      const date = moment(this.form.delivery.date, 'MM/DD/YYYY').format('MMM DD')
      const time = moment(this.form.delivery.deliveryTime, 'hh:mm a').format('h:mm a')

      return `${date} @ ${time}`
    }
  },
};
</script>