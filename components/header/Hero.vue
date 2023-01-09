<template>
  <div class="mt-20 flex flex-col items-center md:flex-row md:items-start">
    <div
      class="md:w-1/2 text-center md:text-left order-2 md:order-1 mt-6 md:m-0"
    >
      <h1 class="text-4xl md:text-4xl lg:text-5xl font-bold leading-snug">
        FAMOUS STUFFED <br />
        BREAKFAST BUNS 😍
      </h1>
      <p class="text-2xl lg:text-3xl mt-12">
        Better breakfast sandwiches,<br />
        for your office or group event
      </p>
    </div>
    <div class="w-10/12 md:w-1/2 order-1 md:order-2">
      <img src="~/assets/img/featured-image-transparent.png" alt="" />
    </div>
  </div>
</template>

<style scoped>
h1::after {
  content: "";
  display: block;
  width: 100%;
  height: 9px;
  @apply bg-primary;
  margin-top: 40px;
}

@media only screen and (min-width: 800px) {
  h1::after {
    width: 255px;
  }
}
</style>
