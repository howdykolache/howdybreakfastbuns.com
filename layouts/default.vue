<template>
    <div class="text-base">
        <NameChangeNotificationBanner />
        <Header />
        <Nuxt />
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/header/Header';
import NameChangeNotificationBanner from '@/components/header/NameChangeNotificationBanner';
import Footer from '@/components/Footer';

export default {
  components: {
    Header,
    NameChangeNotificationBanner,
    Footer
  }
}
</script>
