<template>
  <main class="container mx-auto mt-10">
    <h1 class="text-center font-black text-2xl lg:text-4xl uppercase">Menu</h1>
    <section class="mt-10">
      <h2 class="text-2xl text-highlight">SAVORY BREAKFAST BUNS</h2>
      <div class="flex justify-between flex-wrap">
        <ProductInfoCard
          name="Coloradough"
          :image="require('~/assets/img/coloradough.png')"
          :highlighted-ingredients="['sausage']"
          ingredients="sausage, egg, bell pepper, onion & cheddar"
          description="We call it the “colora-dough” because it’s like a denver omelette, but with breakfast sausage"
        />
        <ProductInfoCard
          name="EL GRECO"
          :image="require('~/assets/img/el-greco.png')"
          :highlighted-ingredients="['spinach']"
          ingredients="spinach, egg & feta cheese"
          description="Vegetarians unite for this delightful Mediterranean inspired breakfast bun!"
        />
        <ProductInfoCard
          name="RON SWANSON"
          :image="require('~/assets/img/ron-swanson.png')"
          :highlighted-ingredients="['bacon']"
          ingredients="bacon, egg & jalapeño"
          description="Inspired by our favorite grumpy character on Parks and Rec, who wants “ALL” the bacon & eggs"
        />
      </div>
    </section>   
    <section class="mt-20">
      <h2 class="text-2xl text-highlight">SWEET BREAKFAST BUNS</h2>
      <div class="flex justify-between flex-wrap">
        <ProductInfoCard
          name="K.R.E.A.M."
          :image="require('~/assets/img/ron-swanson.png')"
          :highlighted-ingredients="['sweet cream cheese']"
          ingredients="sweet cream cheese & a hint of lemon zest"
          description="If a cheesecake had a baby with our fabulously light dough, you’d get this!"
        />        
        <ProductInfoCard
          name="BLUEBERRY"
          :image="require('~/assets/img/blueberry.png')"
          :highlighted-ingredients="['blueberry']"
          ingredients="blueberry"
        />        
        <ProductInfoCard
          name="PEACHES + KREAM"
          :image="require('~/assets/img/blueberry.png')"
          :highlighted-ingredients="['peaches']"
          ingredients="peaches"
        />
      </div>
    </section>   
    <section class="mt-20">
      <h2 class="text-2xl text-highlight">GLUTEN FREE / VEGAN</h2>
      <div class="flex justify-between flex-wrap">
        <ProductInfoCard
          name="CHIA PUDDING"
          :image="require('~/assets/img/blueberry.png')"
          :highlighted-ingredients="['chia seeds']"
          ingredients="organic white chia seeds, almond milk, maple syrup, vanilla, toppings"
          description="Our house made chia pudding uses no refined sugar and we top it with fruit or other toppings. Contains almonds."
        />
      </div>
    </section>
    <section class="mt-20">
      <h2 class="text-2xl text-highlight">BEVERAGES</h2>
      <ul class="mt-5 text-xl font-bold">
        <li>Coffee</li>
        <li>Tea</li>
        <li>Topo Chico</li>
        <li>Orange juice</li>
      </ul>
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
