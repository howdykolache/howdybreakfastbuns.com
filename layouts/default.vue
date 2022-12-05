<template>
    <div class="text-base">
        <Header />
        <Nuxt />
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/header/Header';
import Footer from '@/components/Footer';

export default {
  components: {
    Header,
    Footer
  }
}
</script>