import Vue from 'vue'
import resolveConfig from 'tailwindcss/resolveConfig'
const tailwindConfig = require('~/tailwind.config')

export default function() {
  const $tw = resolveConfig(tailwindConfig).theme

  Vue.prototype.$tw = $tw
}
