<template>
  <div>
    <section class="container mx-auto mt-20 flex flex-col items-center">
      <span class="text-gray-500 uppercase">as seen in</span>
      <div
        class="w-full lg:w-9/12 grid grid-cols-2 gap-10 lg:grid-cols-4 justify-center items-center"
      >
        <a
          href="https://www.nbcchicago.com/entertainment/chicago-today/howdy-kolache-you-can-finally-try-these-savory-texas-czech-style-kolaches-in-chicago/2767128/"
          target="_blank"
        >
          <img src="~/assets/img/nbc.png" class="w-24 mx-auto lg:w-32" />
        </a>
        <a
          class="md:mt-0"
          href="https://chicago.eater.com/2022/10/18/23409216/howdy-kolache-texas-czech-pastry-fulton-market-chicago"
          target="_blank"
        >
          <img src="~/assets/img/eater.png" class="w-20 mx-auto lg:w-32" />
        </a>
        <a
          class=" w-full md:mt-0"
          href="https://www.chicagomag.com/chicago-magazine/november-2021/howdy-kolache-bring-a-texas-tradition-north/"
          target="_blank"
        >
          <img src="~/assets/img/chicago-mag.png" class="w-28 mx-auto lg:w-48" />
        </a>
        <a
          class="md:mt-0"
          href="https://abc7chicago.com/howdy-kolache-chicago-bakery-west-loop-restaurants/11224703/"
          target="_blank"
        >
          <img src="~/assets/img/abc.png" class="w-20 mx-auto lg:w-28" />
        </a>
      </div>
    </section>

    <section
      class="container mx-auto py-4 mt-12 flex flex-col md:flex-row items-start"
    >
      <div class="md:w-1/2 text-center md:text-left order-2 md:order-1">
        <h2 class="text-3xl font-bold leading-snug mt-6 md:m-0">
          THE BEST BREAKFAST <br />
          FOR YOUR WORKPLACE
        </h2>
        <p>Does your company order breakfast?</p>

        <p>Is it *AMAZING*? 🤔</p>

        <p><strong>Howdy Breakfast Buns</strong> are!</p>

        <p>
          We work with companies in Chicago to give them a savory, nourishing,
          and most importantly
          <span class="text-highlight">fun and delicious</span> breakfast for
          their employees.
        </p>
        <p>
          Clients include trading companies, law firms, tech companies and
          co-working spaces.
        </p>
        <p>Your coworkers will thank you!</p>
        <nuxt-link to='/order'  class="mt-3 inline-block btn btn-primary">ORDER NOW</nuxt-link>
      </div>
      <div class="flex justify-end items-center order-1 md:order-2">
        <img src="~/assets/img/index/strawberry.jpg" alt="Strawberries & KREAM" class="lg:w-9/12" />
      </div>
    </section>

    <section
      class="container mx-auto mt-20 flex flex-col md:flex-row justify-between items-start"
    >
      <div class="flex items-center">
        <img src="~/assets/img/kolaches.png" />
      </div>
      <div class="lg:w-1/2 md:ml-10 mt-6 md:mt-0 text-center md:text-left">
        <h2 class="text-3xl font-bold leading-snug">PERFECT FOR GROUPS</h2>
        <p>
          <strong>Howdy Breakfast Buns</strong> are the genetically engineered
          <span class="text-highlight">perfect breakfast sandwich</span>
          and designed for
          <span class="text-highlight">big group or events</span>
        </p>
        <ul class="mt-8 text-left">
          <li>👉 No mess</li>
          <li>👉 Portable</li>
          <li>👉 No silvereware or plates required</li>
          <li>👉 Keeps well</li>
          <li>👉 Beautiful packaging for transport</li>
          <li>👉 Hand crafted with love in Chicago! ❤️</li>
        </ul>
        <nuxt-link to="/order" class="mt-8 inline-block btn btn-primary">Order online</nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.sticky-bar {
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  height: 40px;
  background: #fce300;
}
</style>
