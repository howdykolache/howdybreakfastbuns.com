<template>
  <main class="container mx-auto mt-8 lg:mt-16">
    <h1 class="text-center font-black text-2xl lg:text-4xl uppercase">
      EMPLOYEE HAPPINESS
    </h1>
    <section class="mt-8 flex flex-col items-start lg:mt-16 md:flex-row">
      <div class="text-xl md:w-1/2">
        <p>
          Do you want to invest in employee happiness in 2023?
        </p>
        <p>
          For about <span class="text-highlight">$20</span> per month per employee, Howdy drops off amazing breakfast
          sandwiches for your team every week!
        </p>
        <p>
          Build amazing culture &amp; give your team a reason to be excited to
          come into the office!
        </p>
      </div>
      <div class="flex justify-end items-center">
        <img src="~/assets/img/kolaches.png" class="lg:w-9/12" />
      </div>
    </section>
    <section class="mt-16">
        <p class="text-xl">Join companies like Google, Facebook, and tons of other businesses who with a small, simple gesture, let their teams know they care.</p>
        <div class="block justify-between gap-12 lg:flex">
            <div class="border-2 border-primary p-4 relative overflow-hidden lg:w-6/12">
                <span class="featured-plan-label">MOST POPULAR</span>
                <h4 class="text-highlight text-2xl font-bold">WEEKLY</h4>
                <p>Every Thurs at 9am? You got it!</p>
                <p>You pick the day & time - We’ll make sure your team gets their day started right with Howdy Breakfast Buns. Set it and forget it!</p>
                <div class="flex items-center">
                    <a target='_blank' :href='mailToString' class="btn btn-primary text-sm">LEARN MORE</a>
                    <span class="text-gray-400 ml-2">Around $20/month/employee</span>
                </div>
            </div>
            <div class="mt-6 border-2 border-primary p-4 lg:w-6/12 lg:mt-0">
                <h4 class="text-highlight text-2xl font-bold">MONTHLY</h4>
                <p>Celebrate monthly birthdays or events.</p>
                <p>We’ll ask you each month what day is best to get your team excited for a great breakfast!</p>
                <div class="flex items-center">
                    <a target='_blank' :href='mailToString' class="btn btn-primary text-sm">LEARN MORE</a>
                    <span class="text-gray-400 ml-2">Around $5/month/employee</span>
                </div>
            </div>
        </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      mailTo: 'howdy@howdybreakfastbuns.com',
      subject: 'Interested in hearing more about weekly or monthly Howdy Breakfast Buns for our group! 😊'.replaceAll(' ', '%20'),
      body: 'Hi Eric!%0A%0A' +
            'I would like to learn more more about weekly or monthly Howdy Breakfast Buns for our group!%0A%0A' +
            'Name:%0A' +
            'Phone:%0A' +
            'Company or organization:%0A' +
            'Weekly or monthly:%0A' +
            'Number of team members:%0A' +
            'Address:%0A'
    }
  },
  computed: {
    mailToString() {
      return 'mailto:' + this.mailTo + '?subject=' + this.subject + '&body=' + this.body
    }
  }
}
</script>

<style>
.featured-plan-label{
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    @apply bg-primary;
    position: absolute;
    right: -161px;
    top: 26px;
    font-size: 10px;
    width: 400px;
    display: block;
    text-align: center;
    text-transform: uppercase;
}
</style>
