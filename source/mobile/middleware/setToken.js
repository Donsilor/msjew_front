const isServer = process.server
const cookieparser = isServer ? require('cookieparser') : undefined

const getQueryFromUrl = url => {
  const result = {}
  const start = url.indexOf('?')
  if (start === -1) {
    return result
  }
  url = url.slice(start + 1, url.length)
  const query = url.split('&')
  for (let n = 0, length = query.length; n < length; n++) {
    const item = query[n].split('=')
    result[item[0]] = item[1]
  }
  return result
}

export default function({ req, res, redirect, store }) {
  // console.log('req==================>', req)
  // console.log('res==================>', res)
  if (process.server) {
    let token = ''
    const query = getQueryFromUrl(req.originalUrl)
    const cookie = cookieparser.parse(req.headers.cookie || '')

    if (
      query.token &&
      req.originalUrl.indexOf('/paySuccess/') === -1 &&
      req.originalUrl.indexOf('/payFailed/') === -1
    ) {
      token = query.token
    } else if (req.headers.cookie) {
      // console.log('cookie token=====>')
      try {
        token = cookie.token
      } catch (err) {
        // 找不到有效的Cookie
      }
    }

    if (token) {
      res.setHeader('Set-Cookie', [`token=${token}; Path=/;`])

      store.commit('setToken', token)

      if (cookie.lastUrl) {
        res.setHeader('Set-Cookie', [`lastUrl=; Path=/;`])
        store.commit('setLastUrl', '')
        redirect(cookie.lastUrl || '/')
      }
    }

    // console.log('服务器设置header的token==========>', token)
  }
}
