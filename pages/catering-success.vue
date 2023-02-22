<template>
  <main class="container mx-auto mt-16">
    <div v-if="!loading">
      <p class="text-center">
        <span class="font-bold text-2xl">ORDER CONFIRMED!</span>
        <span class="block text-5xl mt-10">🥳</span>
      </p>
      <div class="mt-16 lg:px-24">
        <p>Woohoooo! Your order for {{ formattedOrderDatetime }} is confirmed!</p>
  
        <p>We’ll be sending you an email confirmation shortly.</p>
  
        <p>
          If you have any questions or need to make adjustments, please email us
          directly at howdy@howdybreakfastbuns.com
        </p>
      </div>
    </div>
    <div v-else class="flex justify-center items-center mt-32">
      <p class="text-lg text-gray-500">Please wait...</p>
    </div>
  </main>
</template>

<script>
import moment from 'moment'
import { persistentformData } from '@/helpers/order-form-persistence'

export default {
  data() {
    return {
      loading: true,
      sessionId: this.$route.query.session_id,
      order: null
    }
  },
  computed: {
    formattedOrderDatetime(){
      const date = moment(this.order.date, 'MM/DD/YYYY').format('MMM DD')

      return `${this.order.deliveryTime} on ${date}`
    },
  },
  methods: {
    async getCheckoutSessionData(){
      this.loading = true

      try {
        const res =await fetch(`/.netlify/functions/get-checkout-session-metadata?session_id=${this.sessionId}`)
        if (res.status === 200) {
          this.order = await res.json()

          persistentformData.clear()
        }
      } catch (error) {
        console.error(error)
      }

      this.loading = false
    },
  },
  mounted(){
    // Redirect to the home if session id is not included in the url
    if (!this.sessionId){
      this.$router.push('/')
      return
    }

    this.getCheckoutSessionData()
  }
}
</script>