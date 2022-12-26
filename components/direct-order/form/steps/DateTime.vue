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
              first-day-of-week="sun"
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
          <button
            :class="{'opacity-60 cursor-not-allowed': !canProceed}"
            :disabled="!canProceed"
            class="btn btn-primary w-full p-3 mt-10"
            @click="$emit('next')"
          >
            Next: ORDER SIZE
          </button>
          <button class="btn btn-secondary w-full p-3 mt-2 underline" @click="$emit('previous')">
            Previous step
          </button>
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
        ranges: [
          { // howdy winter holiday
            from: new Date(2022, 11, 21),
            to: new Date(2023, 0, 4)
          }
        ],
        dates: [
          new Date(2023, 0, 16) // MLK day
        ],
        to: moment().toDate() // Disable past dates
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
    },
    canProceed(){
      if (!this.fields.date || !this.fields.deliveryTime) return false
      if (
        this.fields.orderType.toLowerCase() === 'delivery' &&
        !this.fields.address.length
      ) return false
      
      return true
    }
  },
  methods: {
    ...mapActions({
      update: "order-form/update",
    }),
    onChange() {
      // format the selected date
      if (this.fields.date) {
        const date = moment(this.fields.date).format('MM/DD/YYYY')
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
    const orderDeadline = moment('13:00', 'HH:mm')

    // If it’s 1pm or after, make next day unavailable.
    if (now.isSameOrAfter(orderDeadline)) {
      const tomorrow = moment().add(1, 'days').toDate()
      this.disabledDates.dates.push(tomorrow)
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.date-picker-wrapper >>> input,
.time-picker-wrapper >>> .multiselect__input,
.time-picker-wrapper >>> .multiselect__tags{
    @apply border border-gray-400 p-2 focus:border-primary focus:outline-none w-full mt-2;
}

.time-picker-wrapper >>>  .multiselect--active .multiselect__tags {
    @apply border-none p-0;
}

.time-picker-wrapper >>>  .multiselect__placeholder {
    @apply m-0;
}
</style>
