const isServer = process.server
const cookieparser = isServer ? require('cookieparser') : undefined

export default function(content) {
  const { req, res, app, store } = content
  const definition = app.$bddDefinition
  const coinOptions = definition.coinOptions
  const languageOptions = definition.languageOptions

  if (isServer) {
    const resetCookie = []
    let coin = ''
    let language = ''
    let lastUrl = ''
    let areaId = ''

    const expiresDate = new Date()
    expiresDate.setDate(expiresDate.getDate() + 365)
    const expires = expiresDate.toUTCString()

    if (req.headers.cookie) {
      const cookie = cookieparser.parse(req.headers.cookie || '')
      coin = cookie.coin || ''
      language = cookie.language || ''
      lastUrl = cookie.lastUrl || ''
      areaId  = cookie.areaId || ''
    }

    if (coin) {
      let trueCoin = false
      for (let n = 0, length = coinOptions.length; n < length; n++) {
        if (coin === coinOptions[n].code) {
          trueCoin = true
          break
        }
      }
      if (!trueCoin) {
        coin = coinOptions[0].code
      }
      resetCookie.push(`coin=${coin}; Path=/; expires=${expires}`)
      store.commit('setCoin', coin)
    } else {
      coin = app.$bddDefinition.coinOptions[0].code
      //resetCookie.push(`coin=${coin}; Path=/; expires=${expires}`)
      store.commit('setCoin', coin)
    }

    if (language) {
      let trueLanguage = false
      for (let n = 0, length = languageOptions.length; n < length; n++) {
        if (language === languageOptions[n].code) {
          trueLanguage = true
          break
        }
      }
      if (!trueLanguage) {
        language = languageOptions[0].code
      }
      resetCookie.push(`language=${language}; Path=/; expires=${expires}`)
      store.commit('setLanguage', language)
    } else {
      language = app.$bddDefinition.languageOptions[0].code
      //resetCookie.push(`language=${language}; Path=/; expires=${expires}`)
      store.commit('setLanguage', language)
    }

    if (areaId) {      
      resetCookie.push(`areaId=${areaId}; Path=/; expires=${expires}`)
      store.commit('setAreaId', areaId)
    }

    if (lastUrl) {
      resetCookie.push(`lastUrl=${lastUrl}; Path=/; expires=${expires}`)
      store.commit('setLastUrl', lastUrl)
    }
    console.log('setBasic req====>', resetCookie)
    res.setHeader('Set-Cookie', resetCookie)
  }
}
