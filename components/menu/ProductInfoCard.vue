<template>
  <div class="item-card border border-primary p-2 mt-5 md:flex">
    <div class="flex flex-col items-center md:w-4/12">
      <div>
        <img
        :src="image"
        alt="Howdy Breakfast Buns - Coloradough"
        class="wf-full h-full object-cover"
      />
      </div>
      <span class="uppercase text-gray-400 text-xl mt-3 font-bold text-center">{{ name }}</span>
    </div>
    <div class="ml-4 w-8/12">
      <span class="uppercase text-gray-400 mt-4 block">INGREDIENTS</span>
      <p class="m-0" v-html="formattedIngredients"></p>
      <span class="uppercase text-gray-400 mt-4 block">DESCRIPTION</span>
      <p class="m-0">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
    },    
    description: {
      type: String,
    },    
    highlightedIngredients: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    formattedIngredients(){
      let ingredients = this.ingredients
      // Encapsulating target words in elements so we can highlight them using CSS
      this.highlightedIngredients.forEach(word => {
        const includesTargetWord = ingredients.toLowerCase().includes(word.toLowerCase())

        if (includesTargetWord){
          const replacement = `<span class="highlighted-ingredient">${word}</span>`
          ingredients = ingredients.replace(word, replacement)
        }
      })

      return ingredients
    }
  }
};
</script>

<style>
.item-card{
    width: 100%;
}

.highlighted-ingredient {
  color: #E56A54;
  font-weight: bold;
}

@media only screen and (min-width: 1024px) {
  .item-card{
    width: 49%;
  }
}
</style>
