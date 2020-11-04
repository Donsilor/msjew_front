import Vue from 'vue'
import Helpers from '@/assets/js/helpers.js'

Vue.prototype.$helpers = Helpers

Vue.prototype.$shareFacelook = function(url = location.href) {
  window.open(
    'http://www.facebook.com/sharer.php?u=' + encodeURIComponent(url),
    'newWindow'
  )
}
