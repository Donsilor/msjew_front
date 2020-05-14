import Vue from 'vue'
import Element from 'element-ui'
import En from 'element-ui/lib/locale/lang/en'
import ZhCn from 'element-ui/lib/locale/lang/zh-CN'
import ZhTw from 'element-ui/lib/locale/lang/zh-TW'
// export default ({
//   app
// }) => {
//   Vue.use(Element, {
//     i18n: (key, value) => app.i18n.t(key, value)
//   })
// }

export default function({ $axios, store, app }) {
  // Vue.use(Element, {
  //   i18n: (key, value) => app.i18n.t(key, value)
  // })
  // Vue.use(Element, {
  //   i18n: function(path, options) {
  //     let value = i18n.t(path, options)
  //     if (value !== null && value !== undefined) {
  //       return value
  //     }
  //     return ''
  //   }
  // })
//  if (app.$userLanguage == 'zh-TW') {
//     console.log('en')
//      Vue.use(Element ,{ZhTw})
//   } else if (app.$userLanguage == 'zh-CN'){
//     console.log('zh')
//     Vue.use(Element, {ZhCn})
//   } else {
//     Vue.use(Element, {En})
//   }
  // psn ? p.en :psn ? p.cn :p.zh
  Vue.use(Element, { locale: app.$userLanguage === 'zh_TW' ? ZhTw : app.$userLanguage === 'zh_CN' ? ZhCn : En })
  // Vue.use(Element, { locale: app.$userLanguage === 'zh_TW' ? ZhTw : app.$userLanguage==='en_US'?En :ZhCn})
  // Vue.use(Element, { locale: app.$userLanguage === 'zh_TW' || 'zh_CN' ? ZhCn : En })
}
