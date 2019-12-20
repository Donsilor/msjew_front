import Vue from 'vue'
import Element from 'element-ui'
import En from 'element-ui/lib/locale/lang/en'
import ZhCn from 'element-ui/lib/locale/lang/zh-CN'

export default function({ $axios, store, app }) {
  Vue.use(Element, { locale: app.$userLanguage === 'zh_TW' ? ZhCn : En })
}
