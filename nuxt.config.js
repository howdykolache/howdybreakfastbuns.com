export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,

  env: {
    //
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Howdy Breakfast Buns',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'facebook-domain-verification', content: '2ij40knbmlnr9v3u80rbzu2etzrqip' },
      { hid: 'description', name: 'description', content: 'Stuffed breakfast sandwiches perfect for offices or events. No mess, fun and delicious!' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:title', name: 'og:title', content: 'Howdy Breakfast Buns' },
      { hid: 'og:description', name: 'og:description', content: 'Stuffed breakfast sandwiches perfect for offices or events. No mess, fun and delicious!' },
      { hid: 'og:image', property: 'og:image', content: process.env.BASE_URL + '/thumb.png' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/formatCents.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxt/postcss8',
    ['@nuxtjs/dotenv', { systemvars: true }],
    '@nuxtjs/svg'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/gtm',
  ],
  gtm: {
    id: 'GTM-N7CHK9C'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  }
}
