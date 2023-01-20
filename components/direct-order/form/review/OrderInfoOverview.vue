<template>
  <div>
    <div class="flex">
      <div class="w-1/2 flex flex-col mt-5">
        <div class="flex items-center">
          <span class="label">DATE & TIME</span>
          <EditButton route="/order/direct/form/order-date" />
        </div>
        <span class="mt-1">{{ formattedOrderDatetime }}</span>
      </div>
      <div class="w-1/2 flex flex-col mt-5">
        <div class="flex items-center">
          <span class="label">ORDER TYPE</span>
          <EditButton route="/order/direct/form/order-date" />
        </div>
        <span class="mt-1">{{ form.delivery.orderType }}</span>
      </div>
    </div>
    <div class="flex">
      <div class="w-1/2 flex flex-col mt-5">
        <div class="flex items-center">
          <span class="label">CONTACT</span>
          <EditButton route="/order/direct/form/contact-info" />
        </div>
        <span class="mt-1 flex flex-col">
          <span>{{ form.contact.name }}</span>
          <span>{{ form.contact.email }}</span>
          <span>{{ form.contact.phoneNumber }}</span>
        </span>
      </div>
      <div class="w-1/2 flex flex-col mt-5">
        <div class="flex items-center">
          <span class="label">ADDRESS</span>
          <EditButton route="/order/direct/form/order-date" />
        </div>
        <span
          v-if="form.delivery.orderType.toLowerCase() === 'pickup'"
          class="mt-1"
        >
          817 W Fulton Market
        </span>
        <span v-else>{{ form.delivery.address }}</span>
      </div>
    </div>
    <div 
      v-if="form.delivery.deliveryNotes && form.delivery.orderType.toLowerCase() === 'delivery'" 
      class="mt-5 flex flex-col"
    >
      <div class="flex items-center">
        <span class="label">Delivery Instructions</span>
        <EditButton route="/order/direct/form/order-date" />
      </div>
      <span>{{ form.delivery.deliveryNotes }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from 'moment'
import EditButton from '../EditButton.vue'

export default {
  components: {
    EditButton
  },
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