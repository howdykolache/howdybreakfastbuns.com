<template>
  <main class="container mx-auto mt-10 lg:w-11/12 lg:mt-20">
    <h1 class="text-center font-black text-2xl lg:text-4xl">
      Order Breakfast Buns!
    </h1>
    <section class="mt-3 gap-x-20 lg:flex lg:mt-10">
      <div class="text-xl lg:w-6/12">
        <p>
          Order breakfast buns weekdays 7:30am-1:30pm via Toast, ezCater, or
          through us directly.
        </p>
        <section
          class="links mt-10 grid grid-cols-2 grid-rows-2 gap-4"
        >
          <nuxt-link class="order-button directly" to="/order/direct">Order Directly</nuxt-link>
          <a
            class="order-button toasttab"
            href="https://www.toasttab.com/howdybreakfastbuns/v3"
            target="_blank"
          >
            <img src="@/static/toasttab.png" class="max-h-6" />
          </a>
          <a
            class="order-button ezcater"
            href="https://www.ezcater.com/catering/howdy-breakfast-buns-chicago"
            target="_blank"
          >
            <img src="@/static/ezcater.png" class="max-h-6" />
          </a>
        </section>
        <p class="mt-5 mb-1 lg:mt-12">
          Please
          <a
            href="mailto:howdy@howdykolache.com?subject=Request%20for%20info%20for%20order!%20%3A)"
            class="text-highlight"
            >contact us directly for</a>:
        </p>
        <ul class="list-disc ml-10">
          <li>custom orders</li>
          <li>special fillings</li>
          <li>outside standard hours/days</li>
        </ul>
      </div>
      <div class="hidden lg:block">
        <img src="~/assets/img/howdy2.png" alt="Howdy Breakfast Buns" />
      </div>
    </section>


  </main>
</template>

<style>
.links a {
}

.order-button {
  @apply border text-center py-4;
  foo: 'px-12 py-4 m-4 w-full lg:w-1/3 p-3';
}
.order-button > img {
  @apply inline-block;
}
.order-button.directly {
  @apply bg-primary w-full p-3 text-center text-lg lg:p-4 lg:text-xl col-span-2 font-bold hover:opacity-75;
}
.order-button.toasttab {
  @apply border-orange-600  hover:bg-orange-50;
}
.order-button.ezcater {
  @apply border-emerald-500  hover:bg-emerald-50;
}

</style>
