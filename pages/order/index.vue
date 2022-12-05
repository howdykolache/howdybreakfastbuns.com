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
    <section
      class="links mt-10 flex flex-col items-center gap-y-6 lg:mt-20 lg:flex-row lg:gap-y-0 lg:gap-x-12"
    >
      <a href="https://www.toasttab.com/howdykolache/">TOAST</a>
      <a href="https://www.ezcater.com/catering/howdy-kolache-3">ezCater</a>
      <nuxt-link to="/order/direct">Through us directly</nuxt-link>
    </section>
  </main>
</template>

<style>
.links a {
  @apply bg-primary w-full lg:w-1/3 p-3 text-center font-bold text-lg lg:p-4 lg:text-xl;
}
</style>
