import Vue from 'vue'
import VueI18n from 'vue-i18n'
const i18n = require('@/assets/i18n/index.js')

Vue.use(VueI18n)

export default ({ app, store }) => {
  const language = app.$userLanguage
  const messages = {}
  messages[language] = i18n.getLang(language)

  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: language,
    // fallbackLocale: 'en',
    messages
  })

  // 预留，根据url切换语言
  // app.i18n.path = link => {
  //   if (app.i18n.locale === app.i18n.fallbackLocale) {
  //     return `/${link}`
  //   }
  //
  //   return `/${app.i18n.locale}/${link}`
  // }
}
