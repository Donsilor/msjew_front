import Vue from 'vue'
import Element from 'element-ui'
import En from 'element-ui/lib/locale/lang/en'
import ZhCn from 'element-ui/lib/locale/lang/zh-CN'
// import ZhTw from 'element-ui/lib/locale/lang/zh-TW'

export default function({ $axios, store, app }) {
  Vue.use(Element, {
    i18n: function(path, options) {
      let value = i18n.t(path, options)
      if (value !== null && value !== undefined) {
        return value
      }
      return ''
    }
  })
  Vue.use(Element, { locale: app.$userLanguage === 'zh-TW' ? ZhCn : En })
  // Vue.use(Element, { locale: app.$userLanguage === 'zh_TW' ? ZhTw : app.$userLanguage==='en_US'?En :ZhCn})
  // Vue.use(Element, { locale: app.$userLanguage === 'zh_TW' || 'zh_CN' ? ZhCn : En })
}
