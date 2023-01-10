import Vue from 'vue'

export default () => {
  Vue.filter('formatCents', function (cents) {
     if (!cents) return ''
     return '$' + (cents / 100).toLocaleString()
  })
}

