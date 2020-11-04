import Component from './index.vue'

const ms = require.context('./', false, /\.vue$/)
const modules = {}
ms.keys().forEach(k => {
  // console.log('k=======>', k)
  const n = k.substring(2, k.length - 4)
  modules[n] = ms(k).index
})
// console.log('Component=======>', Component)
// console.log('modules=======>', modules)

export default {
  install(Vue) {
    Vue.component('order-safe', Component)
  }
}
