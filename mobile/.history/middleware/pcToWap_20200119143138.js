export default function({ req, res, redirect, store , route}) {
  // console.log('req==================>', req)
  // console.log('res==================>', res)
  function isWap(u) {
    // var u = navigator.userAgent, app = navigator.appVersion;
    return !!u.match(/AppleWebKit.*Mobile.*/)||                   //是否为移动终端
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

function queryParams (data) {
  let _result = []
  for (let key in data) {
    let value = data[key]
    // 去掉为空的参数
    if (['', undefined, null].includes(value)) {
      continue
    }
    if (value.constructor === Array) {
      value.forEach(_value => {
        _result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value))
      })
    } else {
      _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
    }
  }

  return _result.length ? _result.join('&') + '&' : ''
}

  if (process.server) {
  
    let u = req.headers['user-agent']

    if(isWap(u)) {
      return
    }

    let host = 'http://localhost:8318';

    const toWapUrl = path => {
      if(path === '/undefined') {
        return
      }

      let href =  path.split('?')
      let rules = [
        {
          'mobileUrl':/^\/$/,
          'pcUrl':`/`,
        },
        // 订婚  engagement   engagement-rings
        {
          'mobileUrl':/\/engagement\//,
          'pcUrl':`/engagement-rings/`,
          'params':{
            'goodId':'goodId',
            'ringType':'ringType',
          },
        }, 
        // 结婚  marriage-ring wedding-rings
        {
          'mobileUrl':/^\/marriage-ring\//,
          'pcUrl':`/wedding-rings`
        },
        // 结婚 详情  marriage-ring/single-ring-detail  ring/wedding-rings
        {
          'mobileUrl':/^\/marriage-ring\/single-ring-detail\//,
          'pcUrl':`/ring/wedding-rings`,
          'params':{
            'goodId':'goodId',
            'ringType':'ringType',
          },
        },
        // 裸钻   diamond/list  diamonds
        {
          'mobileUrl':/\/diamond\/list/,
          'pcUrl':`/diamonds`
        },
        // 选择戒托   custom-made/ring-made/ring-list  build-your-own-ring/settings
        {
          'mobileUrl':/\/custom-made\/ring-made\/ring-list/,
          'pcUrl':`/build-your-own-ring/settings`
        },
        // 戒托详情  custom-made/ring-made/ring-detail  build-your-own-ring/setting-details
        {
          'mobileUrl':/\/custom-made\/ring-made\/ring-detail/,
          'pcUrl':`/build-your-own-ring/setting-details`,
          'params':{
            'goodId':'goodId',
            'ringType':'ringType',
          },
        },
        // 选择钻石   diamond/list build-your-own-ring/diamonds
        {
          'mobileUrl':/\/diamond\/list/,
          'pcUrl':`/build-your-own-ring/diamonds`
        },
        // 主石戒  diamond/list   engagement-rings/solitaire
        {
          'mobileUrl':/\/diamond\/list/,
          'pcUrl':`/engagement-rings/solitaire`
        },
        // 珠宝首饰   accessories/list jewellery/all
        {
          'mobileUrl':/\/accessories\/list/,
          'pcUrl':`/jewellery/all`
        },
        // 知识 help-pages/knowledge  education/diamonds/carat
        {
          'mobileUrl':/\/help-pages\/knowledge/,
          'pcUrl':`/education/diamonds/carat`
        },
        // 裸钻详情  diamond/diamonds  diamond-details
        {
          'mobileUrl':/\/diamond\/diamonds/,
          'pcUrl':`/diamond-details`,
          'params':{
            'goodId':'goodId',
          },
        },
        {
          'mobileUrl':/\/accessories\/accessories/,
          'pcUrl':`/jewellery/necklace`,
          'params':{
            'goodId':'goodId',
          },
        }
      ]

      if(href.length>0) {

        for(let i=0;i<rules.length;i++) {

          let rule = rules[i]

          if((rule['mobileUrl']).test(href[0])) {
            let url = host + rule['pcUrl']

            let param = ''
            if(typeof rule['params'] !== 'undefined') {
              let params = rule['params'];
              let query2 = {}
              let query1 = getQueryFromUrl(req.originalUrl)
              
              Object.keys(params).forEach(function(key) {
                if(typeof query1[key] !== 'undefined') {
                  query2[params[key]] = query1[key]
                }
              });
              // param = queryParams(query2)
              href[1] = queryParams(query2)
            }

            if(href.length>1) {
              url = url + '?' + param + href[1]
            }
// console.log(url)
            redirect(url)
            return  
          }
        }
      }
      redirect(host)
      return
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
