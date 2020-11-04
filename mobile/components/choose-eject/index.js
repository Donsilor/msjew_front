import IndexComponent from './index.vue'
import ListComponent from './pro.vue'

export default {
  install(Vue) {
    Vue.component('choose-eject', IndexComponent)
    Vue.component('choose-eject-pro', ListComponent)
  }
}
