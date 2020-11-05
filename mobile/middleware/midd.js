export default function ({ isServer, req, redirect, route }) {
    let pcOrigin = 'http://localhost:8318'
    let mobileOrigin = 'http://localhost:8328'
    let isMobile = (ua) => {
      return !!ua.match(/AppleWebKit.*Mobile.*/)
    }
    let userAgent = req ? req.headers['user-agent'] : navigator.userAgent || ''
    return isMobile(userAgent) ? '' : redirect(pcOrigin + route.fullPath)
    // 使用redirect 重定向到外链需要加上前缀:http / https
}