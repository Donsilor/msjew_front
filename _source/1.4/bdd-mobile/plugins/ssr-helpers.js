import Vue from 'vue'
import Helpers from '@/assets/js/helpers.js'

const ERROR_IMAGE = '/error/image-error.png'

export default function({ req, res, app, store }) {
  Vue.prototype.LANGUAGE = app.$bddLanguage

  Vue.prototype.CONDITION_INFO = app.$bddDefinition

  Vue.prototype.$helpers = Helpers

  //  公共样式顶部返回按钮的函数
  Vue.prototype.showEmail = Helpers.showEmail

  //  公共样式顶部返回按钮的函数
  Vue.prototype.goBack = function(router) {
    router.go(-1)
  }

  Vue.prototype.resizeOSSImageStr = ''
  // '?x-oss-process=image/format,webp'
  // '?x-oss-process=image/resize,w_750/format,webp'
  // '?x-oss-process=image/resize,m_lfit,w_1000,h_1000'

  Vue.prototype.completionImageStr = str => {
    return `${app.$IMG_URL}${str}${Vue.prototype.resizeOSSImageStr}`
  }

  Vue.prototype.imageStrToArray = str => {
    if (!str) {
      return [ERROR_IMAGE]
    }
    if (str.length > 0) {
      if (str.indexOf(',') > -1) {
        const images = str.split(',').map(item => {
          return item.indexOf('/') === 0
            ? item
            : `${app.$IMG_URL}${item}${Vue.prototype.resizeOSSImageStr}`
        })
        return images.length > 0 ? images : [ERROR_IMAGE]
      } else {
        return [
          str.indexOf('/') === 0
            ? str
            : `${app.$IMG_URL}${str}${Vue.prototype.resizeOSSImageStr}`
        ]
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
      if (str.indexOf(',') > -1) {
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
}
