<template>
  <main class="container mx-auto mt-8">
    <section>
      <div class="flex flex-col gap-x-14 lg:flex-row">
        <div class="lg:w-1/2">
          <p>We specialize in group orders for offices, parties, & events!</p>
          <p>
            Our stuffed breakfast sandwiches will delight your coworkers or
            guests with light, airy dough wrapped around delicious fillings!
          </p>
          <p>We’ll guide you through the process to make the perfect order.</p>
          <nuxt-link :to="pathToInitialStep" class="btn btn-primary mt-10 hidden uppercase lg:inline-block">Begin order</nuxt-link>

        </div>
        <div>
            <img src="~/assets/img/kolaches.png" />
        </div>
      </div>
      <nuxt-link :to="pathToInitialStep" class="btn btn-primary mt-8 w-full block uppercase lg:hidden">Begin order</nuxt-link>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      pathToInitialStep: '/order/direct/form/contact-info/'
    }
  },
}
</script>