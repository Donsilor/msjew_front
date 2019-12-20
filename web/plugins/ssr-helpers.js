import Vue from 'vue'
import Helpers from '@/assets/js/helpers.js'

const ERROR_IMAGE = '/error/image-error.png'

const RESOURCE_URL = process.env.RESOURCE_URL
const IMG_URL = RESOURCE_URL

// console.log('IMG_URL==========>', IMG_URL)

export default function({ req, res, app, store }) {
  Vue.prototype.ERROR_IMAGE = ERROR_IMAGE

  Vue.prototype.LANGUAGE = app.$bddLanguage

  Vue.prototype.CONDITION_INFO = app.$bddDefinition

  //  定义全局变量IMG_URL
  Vue.prototype.IMG_URL = IMG_URL

  Vue.prototype.$helpers = Helpers

  // 公共样式顶部返回按钮的函数
  Vue.prototype.showEmail = Helpers.showEmail

  // 金額按千位逗號分隔
  Vue.prototype.formatMoney = Helpers.formatMoney

  //  公共样式顶部返回按钮的函数
  Vue.prototype.goBack = function(router) {
    router.go(-1)
  }

  Vue.prototype.resizeOSSImageStr =
    '?x-oss-process=image/resize,m_lfit,w_1000,h_1000'

  Vue.prototype.completionImageStr = str => {
    return `${IMG_URL}${str}`
  }

  Vue.prototype.imageStrToArray = str => {
    if (!str) {
      return [ERROR_IMAGE]
    }
    if (str.length > 0) {
      if (str.includes(',')) {
        const images = str.split(',').map(item => {
          return item.indexOf('/') === 0 ? item : `${IMG_URL}${item}`
        })
        return images.length > 0 ? images : [ERROR_IMAGE]
      } else {
        return [str.indexOf('/') === 0 ? str : `${IMG_URL}${str}`]
      }
    } else {
      return [ERROR_IMAGE]
    }
  }

  Vue.prototype.strToArray = str => {
    if (!str) {
      return []
    }
    if (str.length > 0) {
      if (str.includes(',')) {
        const arr = str.split(',')
        return arr.length > 0 ? arr : []
      } else {
        return [str]
      }
    } else {
      return []
    }
  }

  Vue.prototype.imageError = image => {
    event.target.src = image && typeof image === 'string' ? image : ERROR_IMAGE
  }

  Vue.prototype.formatNumber = str => {
    // console.log(str)
    if (!str) {
      return 0
    }
    str = str.toString()

    function addComma(str) {
      if (str.length <= 3) {
        return str
      } else {
        return (
          addComma(str.substr(0, str.length - 3)) +
          ',' +
          str.substr(str.length - 3)
        )
      }
    }

    const intStr = str.split('.')[0]
    let floatStr = str.split('.')[1] ? `${str.split('.')[1]}` : '00'
    if (floatStr.length > 2) {
      floatStr = floatStr.slice(0, 2)
    } else if (floatStr.length < 2) {
      floatStr += `0`
    }

    return `${addComma(intStr)}.${floatStr}`
  }

  Vue.prototype.removeFormatMoney = str => {
    return parseFloat(str.replace(/[^\d.-]/g, ''))
  }

  Vue.prototype.routeDataToUrl = (route = {}) => {
    let result = '/'
    if (route.path) {
      result = route.path
    }
    if (route.query && Object.keys(route.query).length > 0) {
      const keys = Object.keys(route.query)
      const queryStrArray = []
      for (let n = 0, length = keys.length; n < length; n++) {
        queryStrArray.push(`${keys[n]}=${route.query[keys[n]]}`)
      }
      result += `?${queryStrArray.join('&')}`
    }
    return result
  }

  Vue.prototype.getDetailUrlByAttriEntity = (attriEntity = []) => {
    const configIds = []
    const configAttrIds = []

    attriEntity.map(item => {
      configIds.push(item.configId)
      configAttrIds.push(item.configAttrId)
    })
  }

  Vue.prototype.$startDj = i => {
    const step = {
      steps: [
        {
          goodsId: null,
          goodsDetailsId: null,
          ct: i,
          cartId: ``,
          page: `list`
        },
        {
          goodsId: null,
          goodsDetailsId: null,
          ct: null,
          cartId: ``,
          page: `list`
        }
      ],
      step: 2
    }
    const strStep = JSON.stringify(step)
    const urlStep = Helpers.base64Encode(strStep)
    return `/build-your-own-ring/${
      i === 1 ? 'diamonds' : 'settings'
    }?steps=${urlStep}&step=1`
  }

  Vue.prototype.$successMessage = message => {
    Vue.prototype.$message({
      message,
      type: 'success'
    })
  }

  Vue.prototype.$errorMessage = message => {
    Vue.prototype.$message.error(message)
  }

  Vue.prototype.getJumpLink = (obj, query = {}) => {
    let route = {
      path: '/',
      query: {}
    }

    if (obj.groupType === 1) {
      // console.log(`对戒💍`)
      route = {
        path: `/ring/wedding-rings/${obj.goodsName.replace(/\//g, '')}`,
        query: {
          goodId: obj.data[0].groupId,
          ringType: 'pair'
        }
      }
    } else if (obj.groupType === 2) {
      // console.log(`定制💍`)
      const steps = {
        steps: [
          {
            goodsId: obj.data[0].goodsId,
            goodsDetailsId: obj.data[0].goodsDetailsId,
            ct: obj.data[0].simpleGoodsEntity.categoryId,
            cartId: obj.id,
            page: `detail`
          },
          {
            goodsId: obj.data[1].goodsId,
            goodsDetailsId: obj.data[1].goodsDetailsId,
            ct: obj.data[1].simpleGoodsEntity.categoryId,
            cartId: obj.id,
            page: `detail`
          }
        ],
        step: 3
      }
      const bs64 = Vue.prototype.$helpers.base64Encode(JSON.stringify(steps))
      route = {
        path: '/build-your-own-ring/review',
        query: {
          step: 3,
          steps: bs64
        }
      }
    } else {
      // console.log(obj.data[0].simpleGoodsEntity)
      const ct = obj.data[0].simpleGoodsEntity.categoryId
      // console.log(ct)
      if (ct === 1) {
        // console.log(`💎`)
        route = {
          path: `/diamond-details/${obj.goodsName.replace(/\//g, '')}`,
          query: {
            goodId: obj.data[0].goodsId
          }
        }
      } else if (ct === 2) {
        // console.log(`💍`)
        route = {
          path: `/ring/wedding-rings/${obj.goodsName.replace(/\//g, '')}`,
          query: {
            goodId: obj.data[0].goodsId,
            ringType: 'single'
          }
        }
      } else {
        // console.log(`饰品`)
        route = {
          path: `/jewellery/all/${obj.goodsName.replace(/\//g, '')}`,
          query: {
            goodId: obj.data[0].goodsId
          }
        }
      }
    }
    route.query = Object.assign(route.query, query)
    return Vue.prototype.routeDataToUrl(route)
  }

  Vue.prototype.$scrollTopTo = (target, top, time = 300) => {
    if (!process.client) {
      return
    }

    if (!target) {
      return
    }

    const oldTop = target.scrollTop || 0
    const gapTime = 10
    const moveNum = time / gapTime
    const eachMove = (top - oldTop) / moveNum

    let n = 0
    const interval = setInterval(() => {
      if (n >= moveNum) {
        target.scrollTop = top
        clearInterval(interval)
      } else {
        target.scrollTop = target.scrollTop + eachMove
        n++
      }
    }, gapTime)
  }
}
