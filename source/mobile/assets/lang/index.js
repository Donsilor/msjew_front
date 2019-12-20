const ms = require.context('./', false, /\.json$/)
const i18n = {}
ms.keys().forEach(k => {
  // console.log('k=======>', k)
  const n = k.substring(2, k.length - 5)
  i18n[n] = ms(k)
})

let lang = null

if (process.client) {
  const Cookies = process.client ? require('js-cookie') : undefined
  const language = Cookies.get('language')
  if (i18n.hasOwnProperty(language)) {
    lang = i18n[language]
  } else {
    lang = i18n.zh_TW
  }
} else {
  lang = i18n.zh_TW
}

export const getLang = language => {
  if (i18n.hasOwnProperty(language)) {
    return i18n[language]
  } else {
    return i18n.zh_TW
  }
}

const useLang = lang
export default useLang
