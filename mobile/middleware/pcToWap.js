export default function({ req, res, redirect, store }) {
  console.log('req==================>', req)
  // console.log('res==================>', res)
  if (process.server) {
    const toWapUrl = path => {
      // 订婚戒指落地页
      const engagementRingIndexReg = /^\/engagementRingDetails$/
      if (engagementRingIndexReg.test(path)) {
        // console.log('结婚戒指落地页')
        redirect(`/engagement`)
        return
      }

      // 结婚戒指落地页
      const marriageRingIndexReg = /^\/weddingRingDetails$/
      if (marriageRingIndexReg.test(path)) {
        // console.log('结婚戒指落地页')
        redirect(`/marriage-ring`)
        return
      }

      // 钻石
      const diamondsReg = /^\/seleceDiamond\/(.*)\/2$/
      if (diamondsReg.test(path)) {
        // console.log('钻石')
        redirect(`/diamond/diamonds?goodId=${path.match(diamondsReg)[1]}`)
        return
      }

      // 饰品
      const accessoriesReg = /^\/seleceJewellery\/(.*)\/1$/
      if (accessoriesReg.test(path)) {
        // console.log('饰品')
        redirect(
          `/accessories/accessories?goodId=${path.match(accessoriesReg)[1]}`
        )
        return
      }

      // 结婚单戒
      const singleRingReg = /^\/seleceWedding\/(.*)$/
      if (singleRingReg.test(path)) {
        // console.log('结婚单戒')
        redirect(
          `/marriage-ring/single-ring-detail?goodId=${
            path.match(singleRingReg)[1]
          }`
        )
        return
      }

      // 结婚对戒
      const pairRingReg = /^\/seleceRightRing\/(.*)$/
      if (pairRingReg.test(path)) {
        // console.log('结婚对戒')
        redirect(
          `/marriage-ring/pair-ring-detail?ringId=${path.match(pairRingReg)[1]}`
        )
        return
      }

      // 订婚戒指
      const engagementRingReg = /^\/seleceEngagement\/(.*)\/2$/
      if (engagementRingReg.test(path)) {
        // console.log('订婚戒指')
        redirect(
          `/engagement/engagement-rings?goodId=${
            path.match(engagementRingReg)[1]
          }`
        )
      }
    }

    toWapUrl(req.originalUrl)
  }
}


// export default function ({ isServer, req, redirect, route }) {
//   let pcOrigin = 'http://localhost:8318'
//   let mobileOrigin = 'http://localhost:8328'
//   let isMobile = (ua) => {
//     return !!ua.match(/AppleWebKit.*Mobile.*/)
//   }
//   let userAgent = req ? req.headers['user-agent'] : navigator.userAgent || ''
//   return isMobile(userAgent) ? '' : redirect(pcOrigin + route.fullPath)
//   // 使用redirect 重定向到外链需要加上前缀:http / https
// }
