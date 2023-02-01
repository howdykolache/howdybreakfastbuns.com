<template>
  <main class="container mx-auto mt-8 lg:mt-16">
    <h1 class="text-center font-black text-2xl lg:text-4xl uppercase">
      EMPLOYEE HAPPINESS
    </h1>
    <section class="mt-8 flex flex-col items-start lg:mt-16 md:flex-row">
      <div class="text-xl md:w-1/2">
        <p>
          Is your company or team investing in employee happiness in 2023?
        </p>
        <p>
          For about <span class="text-highlight">$20</span> per month per employee, we deliver amazing breakfast
          sandwiches for your team every week.
        </p>
        <p>
          Build team culture and regular rituals with a simple gesture.
        </p>
        <p>
          Email us to learn more about how we help teams:
        </p>
        <p>
          <a href="mailto:howdy@howdybreakfastbuns.com" class="underline text-highlight">howdy@howdybreakfastbuns.com</a>
        </p>
      </div>
      <div class="flex justify-end items-center">
        <img src="~/assets/img/kolaches.png" class="lg:w-9/12" />
      </div>
    </section>
    <section class="mt-16">
        <div class="block justify-between gap-12 lg:flex">
            <div class="border-2 border-primary p-4 relative overflow-hidden lg:w-6/12">
                <span class="featured-plan-label">MOST POPULAR</span>
                <h4 class="text-highlight text-2xl font-bold">WEEKLY</h4>
                <p>Every Thurs at 9am? You got it!</p>
                <p>You pick the day & time - We’ll make sure your team gets their day started right with Howdy Breakfast Buns. Set it and forget it!</p>
                <div class="flex items-center">
                    <span target='_blank' :href='mailToString' class="btn btn-primary text-sm">Around $20/month/employee</span>
                </div>
            </div>
            <div class="mt-6 border-2 border-primary p-4 lg:w-6/12 lg:mt-0">
                <h4 class="text-highlight text-2xl font-bold">MONTHLY</h4>
                <p>Celebrate monthly birthdays or events.</p>
                <p>We’ll ask you each month what day is best to get your team excited for a great breakfast!</p>
                <div class="flex items-center">
                    <span class="btn btn-primary text-sm">Around $5/month/employee</span>
                </div>
            </div>
        </div>
    </section>
  </main>
</template>

<script>
export default {}
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
