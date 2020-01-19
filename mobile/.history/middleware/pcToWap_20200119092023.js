export default function({ req, res, redirect, store }) {
  // console.log('req==================>', req)
  // console.log('res==================>', res)
  function versions(u) {
    // var u = navigator.userAgent, app = navigator.appVersion;
    return  u.indexOf('Trident') > -1||                            //IE内核
        u.indexOf('Presto') > -1 ||                             //opera内核
        webKit: u.indexOf('AppleWebKit') > -1,                         //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1 ||    //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),                    //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),               //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1,                              //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1,                                  //是否iPad
        webApp: u.indexOf('Safari') == -1,                             //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1,                      //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == " qq"                                  //是否QQ
 
}



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
