<template>
  <main class="container mx-auto mt-10">
    <h1 class="text-center font-black text-2xl lg:text-4xl uppercase">Menu</h1>
    <section class="mt-10">
      <h2 class="text-2xl text-highlight">BREAKFAST BUN ASSORTMENTS (1 DOZEN EACH)</h2>
      <div class="py-4">
        <img src="~/assets/img/kolaches.png" style='max-height:200px;' class="mx-auto"/>
        <div class=''>
          <p>In order to make it easy for our clients, you just decide how many breakfast buns you want (by the dozen) and then choose what type of assortment you want for the entire order.</p>
          <p>All orders come in our eye-catching yellow boxes and we include napkins for easy serving.</p>
        </div>
      </div>
      <div class="card">
        <h3 class="title">Howdy Mix (Most Popular!) - <span class="price">$59/dozen</span></h3>
        <p class="description">Our standard recommended assortment packs our top flavors into a perfect dozen. 40% vegetarian to cater to everyone's needs.</p>
        <p class="description underline">Includes:</p>
        <ul>
          <li>👉 Sausage, scrambled egg, &amp; cheddar</li>
          <li>👉 Spinach, scrambled egg, &amp; feta</li>
          <li>👉 Bacon, scrambled egg, &amp; jalapeno</li>
          <li>👉 Everything bagel seasoning &amp; cream cheese</li>
          <li>👉 Sweet cream cheese w/ lemon zest</li>
        </ul>
      </div>

      <div class="card">
        <h3 class="title">Veggie Lovers Breakfast Box - <span class="price">$59/dozen</span></h3>
        <p class="description">If you've got an all vegetarian group, we've got you covered. Order this option to get a solid no-meat breakfast spread for your group.</p>
        <p class="description underline">Includes:</p>
        <ul>
          <li>👉 Spinach, scrambled egg, &amp; feta</li>
          <li>👉 Everything bagel seasoning &amp; cream cheese</li>
          <li>👉 Sweet cream cheese w/ lemon zest</li>
          <li>👉 Seasonal fruit</li>
        </ul>
      </div>

      <div class="card">
        <h3 class="title">Sweet &amp; Savory - <span class="price">$59/dozen</span></h3>
        <p class="description">Love our sweet variations like cream cheese and seasonal fruit? This is a 50/50 sweet and savory mix.</p>
        <p class="description underline">Includes:</p>
        <ul>
          <li>👉 Sausage, scrambled egg, &amp; cheddar</li>
          <li>👉 Spinach, scrambled egg, &amp; feta</li>
          <li>👉 Bacon, scrambled egg, &amp; jalapeno</li>
          <li>👉 Everything bagel seasoning &amp; cream cheese</li>
          <li>👉 Sweet cream cheese w/ lemon zest</li>
          <li>👉 Seasonal fruit options</li>
        </ul>
      </div>

      <div class="card">
        <h3 class="title">Customize your own - <span class="price">$59/dozen</span></h3>
        <p class="description">Want more fine grained control? You can order your own mix - 1 dozen per variety (contact for individual filling options as they change)</p>
      </div>

      <nuxt-link
        to="/order" class="nav-link btn btn-primary text-2xl mt-6 mx-auto w-1/3 block"
        >Begin Order</nuxt-link>

    </section>
    <section class="mt-20">
      <h2 class="text-2xl text-highlight">ADD-ONS / BEVERAGES</h2>
      <div class="card">
        <h3 class="title">Organic Chia Pudding - Gluten Free/Vegan (Single serving) - <span class="price">$4.99/ea</span></h3>
        <p class="description">Gluten free or vegan? Or just love chia pudding? We're really proud of our house made, organic chia pudding. We use no refined sugars (organic maple syrup as a sweetener), organic white chia seeds, with an almond milk base. Then we add fruit jams and toppings to round it out!</p>
      </div>
      <div class="card">
        <h3 class="title">Coffee Carafe (Serves 10) - <span class="price">$34.99/ea</span></h3>
        <p class="description">Hot coffee from Groundswell, one of our favorite local roasters and coffee shops. Comes with everything you need: cups, lids, sweeteners, creamer, etc.</p>
      </div>
      <div class="card">
        <h3 class="title">Tea Carafe (Serves 10) - <span class="price">$34.99/ea</span></h3>
        <p class="description">Hot tea! English breakfast tea by default, but if you have another preference, please let us know.  Comes with everything you need: cups, lids, sweeteners, creamer, etc.</p>
      </div>
      <div class="card">
        <h3 class="title">Hot Chocolate Carafe (Serves 10) - <span class="price">$34.99/ea</span></h3>
        <p class="description">Hot chocolate!</p>
      </div>
      <div class="card">
        <h3 class="title">Topo Chico (Single Serving) - <span class="price">$3.99/ea</span></h3>
        <p class="description">The one, the only! Topo Chico is sparkling mineral water sourced and bottled in Monterrey, Mexico since 1895.</p>
      </div>
      <div class="card">
        <h3 class="title">Orange Juice (Single serving) - <span class="price">$3.99/ea</span></h3>
        <p class="description">Single serving orange juice. The perfect tangy, vitamin C rich complement to a delicious Howdy Breakfast Bun.</p>
      </div>
      <nuxt-link
        to="/order" class="nav-link btn btn-primary text-2xl mt-6 mx-auto w-1/3 block"
        >Begin Order</nuxt-link>
    </section>
  </main>
</template>

<script>
import ProductInfoCard from "../components/menu/ProductInfoCard.vue";

export default {
  components: {
    ProductInfoCard,
  },
};
</script>

<style scoped>
h3.title {
  font-weight: bold;
  font-size: 1.25em;
}
p.description {
  margin: 1em 0;
}

.card {
  @apply w-full border border-primary p-8 my-4 mr-4;
}
</style>
