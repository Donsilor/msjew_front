export default function({ req, res, redirect, store , route}) {
  // console.log('req==================>', req)
  // console.log('res==================>', res)
  // let isMobile = (ua) => {
  //   return !!ua.match(/AppleWebKit.*Mobile.*/)
  // }
  // let userAgent = req ? req.headers['user-agent'] : navigator.userAgent || ''
  // if(/Android|webOS| iPhone | iPad | iPod |BlackBerry|opera mini|opera mobile|appleWebkit.*mobile|mobile/i.test(navigator.userAgent)) {
    // console.log("url",navigator.userAgent)
    // window.location.href = "域名地址/mobile/index.html";
  // }
  function isWap(u) {
    // var u = navigator.userAgent, app = navigator.appVersion;
    return  !!u.match(/AppleWebKit.*Mobile.*/)||                   //是否为移动终端
        (u.indexOf('Trident') > -1||                            //IE内核
        u.indexOf('Presto') > -1 ||                             //opera内核
        u.indexOf('AppleWebKit') > -1,                         //苹果、谷歌内核
        u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1 ||    //火狐内核
        
        !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)||              //ios终端
        u.indexOf('Android') > -1 || u.indexOf('Linux') > -1||//android终端或者uc浏览器
        u.indexOf('iPhone') > -1||                              //是否为iPhone或者QQHD浏览器
        u.indexOf('iPad') > -1||                                  //是否iPad
        u.indexOf('Safari') == -1||                             //是否web应该程序，没有头部与底部
        u.indexOf('MicroMessenger') > -1||                      //是否微信 （2015-01-22新增）
        u.match(/\sQQ/i) == " qq"  )                                //是否QQ
}
  let u=req.headers['user-agent']
  if (process.server && isWap(u)) {
    //return

    const toWapUrl = path => {
      let rules = [
        {
          '1':/^\/engagementRingDetails$/,
          '2':`/engagement`
        }
      ]

      for(let i=0;i<rules.length;i++) {
        let rule = rules
      }
      console.log("ggggggggggg1245678901", path) 
      // redirect(`http://localhost:8328/diamond/diamonds?goodId=`)
      // 订婚戒指落地页
      const engagementRingIndexReg = /^\/engagementRingDetails$/
      if (engagementRingIndexReg.test(path)) {
        // console.log("aaaa",path)
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
        redirect(`http://localhost:8328/diamond/diamonds?goodId=${path.match(diamondsReg)[1]}`)
        return
      }

      // 饰品
      const accessoriesReg = /^\/seleceJewellery\/(.*)\/1$/
      if (accessoriesReg.test(path)) {
        // console.log('饰品')
        redirect(
          `http://localhost:8328/accessories/accessories?goodId=${path.match(accessoriesReg)[1]}`
        )
        return
      }

      // 结婚单戒
      const singleRingReg = /^\/seleceWedding\/(.*)$/
      if (singleRingReg.test(path)) {
        // console.log('结婚单戒')
        redirect(
          `http://localhost:8328/marriage-ring/single-ring-detail?goodId=${
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
          `http://localhost:8328/marriage-ring/pair-ring-detail?ringId=${path.match(pairRingReg)[1]}`
        )
        return
      }

      // 订婚戒指
      const engagementRingReg = /^\/seleceEngagement\/(.*)\/2$/

      if (engagementRingReg.test(path)) {
        // console.log('订婚戒指')
        redirect(
          `http://localhost:8328/engagement-rings/engagement-rings?goodId=${
            path.match(engagementRingReg)[1]
          }`
        )
      }
    }
    // return isMobile(userAgent) ? '' : redirect(route.fullPath)
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
