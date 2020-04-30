const isServer = process.server
const cookieparser = isServer ? require('cookieparser') : undefined

export default function (content) {
    const { req, res, app, store } = content
    const definition = app.$bddDefinition
    const coinOptions = definition.coinOptions
    const languageOptions = definition.languageOptions

    if (isServer) {
        const resetCookie = []
        let _language = 'zh_TW'
        let _coin = 'HKD'
        let _areaId = 2

        let language = ''
        let coin = ''
        let areaId = ''
        let lastUrl = ''
        let host = req.headers['host']

        const expiresDate = new Date()
        expiresDate.setDate(expiresDate.getDate() + 365)
        const expires = expiresDate.toUTCString()

        if (req.headers.cookie) {
            const cookie = cookieparser.parse(req.headers.cookie || '')
            //coin = cookie.coin || ''
            //language = cookie.language || ''
            lastUrl = cookie.lastUrl || ''
            areaId = cookie.areaId || ''
        }

        //默认语言和默认货币
        if ((/^(cn|wap-cn)\./is).test(host)) {
            language = 'zh_CN'
            coin = 'HKD'
            areaId = 1
        } else if ((/^(us|wap-us)\./is).test(host)) {
            language = 'en_US'
            coin = 'USD'
            areaId = 99
        } else {
            language = 'zh_TW'
            coin = 'HKD'
            areaId = 2
        }
        if (coin) {
            resetCookie.push(`coin=${coin}; Path=/; expires=${expires}`)
            store.commit('setCoin', coin)
        } else {
            store.commit('setCoin', _coin)
        }
        /*
        if (language) {
            resetCookie.push(`language=${language}; Path=/; expires=${expires}`)
            store.commit('setLanguage', language)
        } else {
            store.commit('setLanguage', _language)
        }*/
        if (areaId) {
            resetCookie.push(`areaId=${areaId}; Path=/; expires=${expires}`)
            store.commit('setAreaId', areaId)
        } else {
            store.commit('setAreaId', _areaId)
        }

        if (lastUrl) {
            resetCookie.push(`lastUrl=${lastUrl}; Path=/; expires=${expires}`)
            store.commit('setLastUrl', lastUrl)
        }
        console.log('setBasic req====>', resetCookie)
        res.setHeader('Set-Cookie', resetCookie)
    }
}
