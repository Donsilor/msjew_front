const isServer = process.server
const cookieparser = isServer ? require('cookieparser') : undefined

export default function ({ req, res, app, store }) {
    const definition = app.$bddDefinition
    const coinOptions = definition.coinOptions
    const languageOptions = definition.languageOptions

    if (isServer) {
        const resetCookie = []
        let lastUrl = ''
        let host = req.headers['host']
        const expiresDate = new Date()
        expiresDate.setDate(expiresDate.getDate() + 365)
        const expires = expiresDate.toUTCString()

        if (req.headers.cookie) {
            const cookie = cookieparser.parse(req.headers.cookie || '')
            lastUrl = cookie.lastUrl || ''
        }

        if (lastUrl) {
            resetCookie.push(`lastUrl=${lastUrl}; Path=/; expires=${expires}`)
            store.commit('setLastUrl', lastUrl)
        }
        console.log('setBasic req====>', resetCookie)
        res.setHeader('Set-Cookie', resetCookie)
    }
}
