const isServer = process.server
const cookieparser = isServer ? require('cookieparser') : undefined

export default function (content) {
    const { req, res, app, store } = content
    const definition = app.$bddDefinition
    const coinOptions = definition.coinOptions
    const languageOptions = definition.languageOptions

    if (isServer) {
        const resetCookie = []

        let lastUrl = ''
        let areaId = ''
        let coin = ''
        let language = ''

        const expiresDate = new Date()
        expiresDate.setDate(expiresDate.getDate() + 365)
        const expires = expiresDate.toUTCString()

        if (req.headers.cookie) {
            const cookie = cookieparser.parse(req.headers.cookie || '')
            lastUrl = cookie.lastUrl || ''
            areaId = cookie.areaId || ''
            coin = cookie.coin || ''
            language = cookie.language || ''
        }
        if (language) {
            resetCookie.push(`language=${language}; Path=/; expires=${expires}`)
            store.commit('setLanguage', language)
        }
        if (coin) {
            resetCookie.push(`coin=${coin}; Path=/; expires=${expires}`)
            store.commit('setCoin', coin)
        }

        if (areaId) {
            resetCookie.push(`areaId=${areaId}; Path=/; expires=${expires}`)
            store.commit('setAreaId', areaId)
        }
<<<<<<< HEAD
      }
      if (!trueLanguage) {
        language = languageOptions[0].code
      }
      // console.log('language:Setbasic1:',language)
      resetCookie.push(`language=${language}; Path=/; expires=${expires}`)
      store.commit('setLanguage', language)
    } else {
      store.commit('setLanguage', _language)
    }
    
    if (areaId) {      
      resetCookie.push(`areaId=${areaId}; Path=/; expires=${expires}`)
      store.commit('setAreaId', areaId)
    }else{
      store.commit('setAreaId', _areaId)
    }
=======
>>>>>>> origin/product

        if (lastUrl) {
            resetCookie.push(`lastUrl=${lastUrl}; Path=/; expires=${expires}`)
            store.commit('setLastUrl', lastUrl)
        }
        console.log('setBasic req====>', resetCookie)
        res.setHeader('Set-Cookie', resetCookie)
    }
<<<<<<< HEAD
    // console.log('setBasic req====>', resetCookie)
    res.setHeader('Set-Cookie', resetCookie)
  }
=======
>>>>>>> origin/product
}
