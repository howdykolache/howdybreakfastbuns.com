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
          <div class="date-picker-wrapper">
            <label>What date will your order be?</label>
            <DatePicker
              v-model="fields.date"
              @input="onChange"
              :disabled-dates="disabledDates"
              first-day-of-week="mon"
            />
          </div>
          <div class="time-picker-wrapper mt-4">
            <label>What time would you like your order?</label>
            <multiselect
              v-model="fields.deliveryTime" 
              :options="availableHours"
              @select="onHourSelect"
              label="hour"
              track-by="hour"
              placeholder=""
              tagPosition="bottom"
              >
            </multiselect>
          </div>
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
import DatePicker from '@sum.cumo/vue-datepicker'
import '@sum.cumo/vue-datepicker/dist/Datepicker.css'
import moment from 'moment'
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Input,
    RadioButton,
    DatePicker,
    Multiselect
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
      disabledDates: {
        days: [6, 0],
        dates: []
      }
    };
  },
  computed: {
    ...mapGetters({
      form: "order-form/fields",
    }),
    availableHours () {
      const format = 'h:mm a'
      const fromTime = moment('7:30 am', format)
      const toTime = moment('1:30 pm', format)
      const hourList = []

      // add the initial start time
      hourList.push({
        hour: fromTime.format(format)
      })

      while (true) {
        fromTime.add(15, 'minutes')
        hourList.push({
          hour: fromTime.format(format)
        })

        if (fromTime.isSameOrAfter(toTime)) break
      }

      return hourList
    }
  },
  methods: {
    ...mapActions({
      update: "order-form/update",
    }),
    onChange() {
      // format the selected date
      if (this.fields.date) {
        const date = moment(this.fields.date).format('MM/DD/2022')
        this.fields.date = date
      }

      this.update({
        delivery: { ...this.fields },
      });
    },
    onHourSelect(obj){
      this.fields.deliveryTime = obj.hour
      this.onChange()
    }
  },
  mounted(){
    this.onChange()

    const now = moment()
    const isFriday = now.day() === 5
    const orderDeadline = moment('13:00', 'HH:mm')

    // If it’s Friday and it’s 1pm or after, make next Monday unavailable.
    // Tuesday should be the next available day
    if (isFriday && now.isSameOrAfter(orderDeadline)) {
      const nextMondyDate = moment().add(3, 'days').toDate()
      this.disabledDates.dates.push(nextMondyDate)
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.date-picker-wrapper >>> input,
.time-picker-wrapper >>> .multiselect__input,
.time-picker-wrapper >>> .multiselect__tags{
    @apply border border-gray-400 p-2 focus:border-gray-500 focus:outline-none w-full mt-2;
}

.time-picker-wrapper >>>  .multiselect--active .multiselect__tags {
    @apply border-none p-0;
}

.time-picker-wrapper >>>  .multiselect__placeholder {
    @apply m-0;
}
</style>