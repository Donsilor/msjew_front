import LANGUAGE from '@/assets/lang/index.js'
const lang = LANGUAGE.error

const CART = 'cart'
const WISH = 'wish'
const COMPARED = 'compared'
const SEARCHHISTORY = 'searchHistory'

// let lastTimestamp = 0
// let lastNum = 0
//
// // 获取不会重复的类时间戳
// function getTimestampUuid() {
//   const time = new Date().getTime().toString()
//   time = time.substr(0, time.length - 3)
//   let result = time
//   if (time === lastTimestamp) {
//     lastNum++
//   } else {
//     lastTimestamp = time
//     lastNum = 0
//   }
//   result = `${time}${lastNum}`
//   return result
// }

// 获取不会重复的类时间戳
function getTimestampUuid() {
  return new Date().getTime().toString()
}

function makeCartGoodGroups(cart = []) {
  const result = []
  const localData = {}
  cart.forEach(item => {
    if (localData.hasOwnProperty(item.localSn)) {
      localData[item.localSn].data.push(item)
    } else {
      localData[item.localSn] = {
        id: item.localSn,
        data: [item]
      }
    }
  })
  let keys = Object.keys(localData)
  keys = keys.sort((a, b) => {
    return b - a
  })
  keys.forEach(item => {
    result.push(localData[item])
  })
  return result
}

function makeWishGoodGroups(wish = []) {
  return wish
}

function makeComparedGoodGroups(compared = []) {
  return compared
}

export default {
  nuxtServerInit({ commit }, { req, app }) {
    // console.log('nuxtServerInit======>')
  },
  // 退出登录
  logout({ $axios, state, commit, dispatch }) {
    commit('setToken', '')
  },
  // 获取用户数据
  getUserInfo({ $axios, state, commit, dispatch }) {
    return this.$axios({
      method: 'get',
      url: `/wap/user/me`
    })
      .then(data => {
        commit('setUserInfo', data)
        return data
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },

  /**
   * 历史搜索记录
   */
  getLocalSearchHistory({ $axios, state, getters, commit, dispatch }) {
    return JSON.parse(localStorage.getItem(SEARCHHISTORY) || '[]')
  },
  addLocalSearchHistory({ $axios, state, getters, commit, dispatch }, keyword) {
    return new Promise(async (resolve, reject) => {
      try {
        let searchHistory = await dispatch('getLocalSearchHistory')
        searchHistory = searchHistory.slice(0, 4)
        console.log('searchHistory=====>', searchHistory)
        let start = -1
        searchHistory.forEach((item, index) => {
          if (item.keyword === keyword) {
            start = index
          }
        })
        if (start > -1) {
          searchHistory.splice(start, 1)
        }
        searchHistory.unshift({
          keyword: keyword
        })
        console.log('searchHistory after=====>', searchHistory)
        localStorage.setItem(SEARCHHISTORY, JSON.stringify(searchHistory))
        return resolve('success')
      } catch (e) {
        return reject(e)
      }
    })
  },
  cleanLocalSearchHistory({ $axios, state, getters, commit, dispatch }) {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(SEARCHHISTORY, '[]')
        return resolve('success')
      } catch (e) {
        return reject(e)
      }
    })
  },

  /**
   * 购物车相关
   */
  // 同步到线上购物车中
  async synchronizeCart({ $axios, state, getters, commit, dispatch }) {
    // console.log('synchronizeCart=====>')

    if (!getters.hadLogin) {
      return Promise.reject(new Error('只有登录后才可以同步购物车'))
    }

    const groups = await dispatch('getLocalCart')
    if (groups.length === 0) {
      return Promise.resolve('cart is not need to synchronize')
    }
    let sendData = []
    groups.forEach(group => {
      let data = group.data || []
      data = data.map(good => {
        good.createTime = group.createTime
        good.updateTime = group.updateTime
        return good
      })
      sendData = sendData.concat(data)
    })

    return this.$axios({
      method: 'post',
      url: `/wap/goodsCart/add`,
      data: {
        addType: 2, // 类别(1:普通批量添加,2:登录批量添加
        goodsCartList: sendData
      }
    })
      .then(data => {
        dispatch('cleanLocalCart')
        return Promise.resolve('success')
      })
      .catch(err => {
        if (!err.response) {
          dispatch('cleanLocalCart')
        }
        return Promise.reject(err)
      })
  },
  // 加入到购物车
  addCart({ $axios, state, getters, commit, dispatch }, goods = []) {
    let data = null
    if (goods instanceof Array) {
      data = goods
    } else if (goods instanceof Object) {
      data = [goods]
    } else {
      return Promise.reject(new Error('goods must be Array or Object'))
    }

    if (data.length === 0) {
      return Promise.reject(new Error('goods can not be null'))
    }

    let request = null
    if (getters.hadLogin) {
      // 已登录的操作
      // console.log('已登录的操作')
      request = dispatch('addOnlineCart', data)
    } else {
      // 未登录的操作
      // console.log('未登录的操作')
      request = dispatch('addLocalCart', data)
    }
    request
      .then(data => {
        // 加入成功后，重新获取购物车数据
        dispatch('getCart')
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
    return request
  },
  // 加入到线上购物车中
  addOnlineCart({ $axios, state, getters, commit, dispatch }, goods = []) {
    // console.log('addOnlineCart=====>')
    const time = getTimestampUuid()

    goods = goods.map(item => {
      item.createTime = time
      item.updateTime = time
      return item
    })

    // // console.log('goods-------->', goods)

    return this.$axios({
      method: 'post',
      url: `/wap/goodsCart/add`,
      data: {
        addType: 1, // 类别(1:普通批量添加,2:登录批量添加
        goodsCartList: goods
      }
    })
      .then(data => {
        // 重新请求购物车数量（和购物车列表）
        return Promise.resolve('success')
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 加入到本地购物车中
  addLocalCart({ $axios, state, getters, commit, dispatch }, goods = []) {
    // console.log('addLocalCart=====>')
    // const time = new Date().getTime()
    // goods = goods.map((item, index) => {
    //   item.id = `${time}${index}`
    //   return item
    // })

    const time = getTimestampUuid()
    const addInfo = {
      id: time,
      createTime: time,
      updateTime: time,
      data: goods
    }

    return new Promise(async (resolve, reject) => {
      try {
        let cart = await dispatch('getLocalCart')
        cart = cart.concat(addInfo)
        if (cart.length > 30) {
          return reject(new Error(lang.cartIsFull))
        }
        // cart = cart.concat(goods)
        localStorage.setItem(CART, JSON.stringify(cart))
        return resolve('success')
      } catch (e) {
        return reject(e)
      }
    })
  },
  // 删除购物车商品
  removeCart({ $axios, state, getters, commit, dispatch }, goods = []) {
    console.log('removeCart=====>')
    let data = null
    if (goods instanceof Array) {
      data = JSON.parse(JSON.stringify(goods))
    } else if (typeof goods === 'number') {
      data = [goods]
    } else if (typeof goods === 'string') {
      data = [goods]
    } else {
      return Promise.reject(
        new Error('goods must be Array || Number || String')
      )
    }

    if (data.length === 0) {
      return Promise.reject(new Error('goods can not be null'))
    }

    let request = null
    if (getters.hadLogin) {
      // 已登录的操作
      // console.log('已登录的操作')
      request = dispatch('removeOnlineCart', data)
    } else {
      // 未登录的操作
      // console.log('未登录的操作')
      request = dispatch('removeLocalCart', data)
    }
    request
      .then(data => {
        // 删除成功后，重新获取购物车数据
        dispatch('getCart')
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
    return request
  },
  // 删除线上购物车中的商品
  removeOnlineCart({ $axios, state, getters, commit, dispatch }, goods = []) {
    console.log('removeOnlineCart=====>')
    return this.$axios({
      method: 'post',
      url: `/wap/goodsCart/delete`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        ids: goods
      },
      transformRequest: [
        function(data) {
          let ret = ''
          for (const it in data) {
            // 过滤空元素
            if (data[it] === '' || data[it] === null) {
              continue
            }
            ret +=
              encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }
      ]
    })
      .then(data => {
        // 重新请求购物车数量（和购物车列表）
        return Promise.resolve('success')
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 删除本地购物车中的商品
  removeLocalCart({ $axios, state, getters, commit, dispatch }, goods = []) {
    console.log('removeLocalCart=====>')
    goods = goods.map(item => {
      let result = ''
      switch (typeof item) {
        case 'number':
          result = item.toString()
          break
        case 'string':
          result = item
          break
        default:
          result = ''
      }
      return result
    })
    return new Promise(async (resolve, reject) => {
      try {
        const newCart = []
        const cart = await dispatch('getLocalCart')
        for (let n = 0, length = cart.length; n < length; n++) {
          if (goods.indexOf(cart[n].id) === -1) {
            newCart.push(cart[n])
          }
        }
        localStorage.setItem(CART, JSON.stringify(newCart))
        return resolve('success')
      } catch (e) {
        return reject(e)
      }
    })
  },
  // 清空本地购物车中所有商品
  cleanLocalCart({ $axios, state, getters, commit, dispatch }) {
    localStorage.setItem(CART, JSON.stringify([]))
  },
  // 获取购物车数据
  getCart({ $axios, state, getters, commit, dispatch }) {
    let request = null
    if (getters.hadLogin) {
      // 已登录的操作
      // console.log('已登录的操作')
      request = dispatch('getOnlineCart')
    } else {
      // 未登录的操作
      // console.log('未登录的操作')
      request = dispatch('getLocalCartAndDealData')
    }
    dispatch('getCartAmount')
    request
      .then(data => {
        commit('setCart', data)
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
    return request
  },
  // 获取在线购物车数据
  getOnlineCart({ $axios, state, getters, commit, dispatch }) {
    // console.log('getOnlineCart=====>')
    return this.$axios({
      method: 'get',
      url: `/wap/goodsCart/list`
    })
      .then(data => {
        return makeCartGoodGroups(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 获取本地购物车数据
  getLocalCart({ $axios, state, getters, commit, dispatch }) {
    // console.log('getLocalCart=====>')
    return JSON.parse(localStorage.getItem(CART) || '[]')
  },
  // 获取购物车商品数量
  getCartAmount({ $axios, state, getters, commit, dispatch }) {
    let request = null
    if (getters.hadLogin) {
      // 已登录的操作
      // console.log('已登录的操作')
      request = dispatch('getOnlineCartAmount')
    } else {
      // 未登录的操作
      // console.log('未登录的操作')
      request = dispatch('getLocalCartAmount')
    }
    request
      .then(data => {
        commit('setCartAmount', data)
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
    return request
  },
  // 获取在线购物车商品数量
  getOnlineCartAmount({ $axios, state, getters, commit, dispatch }) {
    // console.log('getOnlineCartAmount=====>')
    return this.$axios({
      method: 'get',
      url: `/wap/goodsCart/count`
    })
      .then(data => {
        console.log('线上购物车商品总数====>', data)
        return data
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 获取本地购物车商品数量
  async getLocalCartAmount({ $axios, state, getters, commit, dispatch }) {
    // console.log('getLocalCartAmount=====>')
    const cart = await dispatch('getLocalCart')
    return cart.length
  },
  // 使用本地购物车数据置换购物车商品数据
  localCartToGoodsInfo(
    { $axios, state, getters, commit, dispatch },
    localCart
  ) {
    let data = null
    if (localCart instanceof Array) {
      data = localCart
    } else if (typeof localCart === 'number') {
      data = [localCart]
    } else if (typeof localCart === 'string') {
      data = [localCart]
    } else {
      return Promise.reject(
        new Error('goods must be Array || Number || String')
      )
    }

    if (data.length === 0) {
      return Promise.resolve([])
    }
    // console.log('data=====>', data)

    // 将前端的数据格式转换为后端需要的格式
    let sendData = []
    data.forEach(item => {
      let goods = item.data
      // console.log('goods----------->', goods)
      goods = goods.map(good => {
        good.updateTime = item.id
        good.createTime = item.id
        return good
      })
      sendData = sendData.concat(goods)
    })

    // console.log('sendData===========>', sendData)

    return this.$axios({
      method: 'post',
      url: `/wap/goodsCart/postCart`,
      data: sendData
    })
      .then(data => {
        return makeCartGoodGroups(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 获取本地购物车，并转换数据格式
  getLocalCartAndDealData({ $axios, state, getters, commit, dispatch }) {
    // console.log('getLocalCartAndDealData=====>')
    return new Promise((resolve, reject) => {
      dispatch('getLocalCart')
        .then(data => {
          dispatch('localCartToGoodsInfo', data)
            .then(data => {
              commit('setCart', data)
              resolve(data)
            })
            .catch(err => {
              console.error(err)
              reject(err)
            })
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    })
  },

  /**
   * 心愿单相关
   */
  // 同步到线上心愿单中
  async synchronizeWish({ $axios, state, getters, commit, dispatch }) {
    // console.log('synchronizeWish=====>')

    if (!getters.hadLogin) {
      return Promise.reject(new Error('只有登录后才可以同步心愿单'))
    }

    const goods = await dispatch('getLocalWish')
    if (goods.length === 0) {
      return Promise.resolve('wish is not need to synchronize')
    }
    const sendData = goods.map(item => {
      delete item.id
      delete item.groupType
      return item
    })

    return this.$axios({
      method: 'post',
      url: `/wap/collection/addList`,
      data: {
        addType: 2, // 类别(1:普通批量添加,2:登录批量添加
        type: 1,
        userCollectionList: sendData
      }
    })
      .then(data => {
        dispatch('cleanLocalWish')
        return Promise.resolve('success')
      })
      .catch(err => {
        if (!err.response) {
          dispatch('cleanLocalWish')
        }
        return Promise.reject(err)
      })
  },
  // 加入到心愿单
  addWish({ $axios, state, getters, commit, dispatch }, goods = []) {
    let data = null
    if (goods instanceof Array) {
      data = goods
    } else if (goods instanceof Object) {
      data = [goods]
    } else {
      return Promise.reject(new Error('goods must be Array or Object'))
    }

    if (data.length === 0) {
      return Promise.reject(new Error('goods can not be null'))
    }

    const time = getTimestampUuid()

    data = data.map(item => {
      item.createTime = time
      return item
    })

    let request = null
    if (getters.hadLogin) {
      // 已登录的操作
      // console.log('已登录的操作')
      request = dispatch('addOnlineWish', data)
    } else {
      // 未登录的操作
      // console.log('未登录的操作')
      request = dispatch('addLocalWish', data)
    }
    request
      .then(data => {
        // 加入成功后，重新获取心愿单数据
        dispatch('getWish')
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
    return request
  },
  // 加入到线上心愿单中
  addOnlineWish({ $axios, state, getters, commit, dispatch }, goods = []) {
    // console.log('addOnlineWish=====>')

    const sendData = goods.map(item => {
      delete item.groupType
      return item
    })

    return this.$axios({
      method: 'post',
      url: `/wap/collection/addList`,
      data: {
        addType: 1, // 类别(1:普通批量添加,2:登录批量添加
        type: 1,
        userCollectionList: sendData
      }
    })
      .then(data => {
        // 重新请求心愿单数量（和心愿单列表）
        return Promise.resolve('success')
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 加入到本地心愿单中
  addLocalWish({ $axios, state, getters, commit, dispatch }, goods = []) {
    // console.log('addLocalWish=====>')

    goods = goods.map(item => {
      item.id = item.goodsId || item.groupId
      return item
    })

    return new Promise(async (resolve, reject) => {
      try {
        let wish = await dispatch('getLocalWish')
        if (getters.inWish(goods[0].id)) {
          return reject(new Error('已存在心愿单中'))
        }
        wish = wish.concat(goods)
        if (wish.length > 30) {
          return reject(new Error(lang.wishListIsFull))
        }
        localStorage.setItem(WISH, JSON.stringify(wish))
        return resolve('success')
      } catch (e) {
        return reject(e)
      }
    })
  },
  // 删除心愿单商品
  removeWish({ $axios, state, getters, commit, dispatch }, goods = []) {
    let data = null
    if (goods instanceof Array) {
      data = goods
    } else if (typeof goods === 'number') {
      data = [goods]
    } else if (typeof goods === 'string') {
      data = [goods]
    } else {
      return Promise.reject(
        new Error('goods must be Array || Number || String')
      )
    }

    if (data.length === 0) {
      return Promise.reject(new Error('goods can not be null'))
    }

    let request = null
    if (getters.hadLogin) {
      // 已登录的操作
      // console.log('已登录的操作')
      request = dispatch('removeOnlineWish', data)
    } else {
      // 未登录的操作
      // console.log('未登录的操作')
      request = dispatch('removeLocalWish', data)
    }
    request
      .then(data => {
        // 删除成功后，重新获取心愿单数据
        dispatch('getWish')
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
    return request
  },
  // 删除线上心愿单中的商品
  removeOnlineWish({ $axios, state, getters, commit, dispatch }, goods = []) {
    // console.log('removeOnlineWish=====>')

    // 将商品id转换为心愿单id
    goods = JSON.parse(JSON.stringify(goods)).map(item => {
      const wish = state.wish
      let result = null
      for (let n = 0, length = wish.length; n < length; n++) {
        if (wish[n].goodsId === item || wish[n].groupId === item) {
          result = wish[n].id
          break
        }
      }
      return result
    })

    return this.$axios({
      method: 'post',
      url: `/wap/collection/delete`,
      params: {
        ids: goods.join(',')
      }
    })
      .then(data => {
        // 重新请求心愿单数量（和心愿单列表）
        return Promise.resolve('success')
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 删除本地心愿单中的商品
  removeLocalWish({ $axios, state, getters, commit, dispatch }, goods = []) {
    // console.log('removeLocalWish=====>', goods)
    return new Promise(async (resolve, reject) => {
      try {
        let count = 0
        goods.forEach(item => {
          if (getters.inWish(item)) {
            count++
          }
        })
        if (!count) {
          return reject(new Error('心愿单中不存在该商品'))
        }

        const newWish = []
        const wish = await dispatch('getLocalWish')
        for (let n = 0, length = wish.length; n < length; n++) {
          if (goods.indexOf(wish[n].goodsId || wish[n].groupId) === -1) {
            newWish.push(wish[n])
          }
        }
        localStorage.setItem(WISH, JSON.stringify(newWish))
        return resolve('success')
      } catch (e) {
        return reject(e)
      }
    })
  },
  // 清空本地心愿单中所有商品
  cleanLocalWish({ $axios, state, getters, commit, dispatch }) {
    localStorage.setItem(WISH, JSON.stringify([]))
  },
  // 获取心愿单数据
  getWish({ $axios, state, getters, commit, dispatch }) {
    let request = null
    if (getters.hadLogin) {
      // 已登录的操作
      // console.log('已登录的操作')
      request = dispatch('getOnlineWish')
    } else {
      // 未登录的操作
      // console.log('未登录的操作')
      request = dispatch('getLocalWishAndDealData')
    }
    dispatch('getWishAmount')
    request
      .then(data => {
        commit('setWish', data)
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
    return request
  },
  // 获取在线心愿单数据
  getOnlineWish({ $axios, state, getters, commit, dispatch }) {
    // console.log('getOnlineWish=====>')
    return this.$axios({
      method: 'get',
      url: `/wap/collection/list`,
      params: {
        type: 1,
        currPage: 1,
        pageSize: 9999
      }
    })
      .then(data => {
        return makeWishGoodGroups(data.list)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 获取本地心愿单数据
  getLocalWish({ $axios, state, getters, commit, dispatch }) {
    return Promise.resolve(JSON.parse(localStorage.getItem(WISH) || '[]'))
  },
  // 获取心愿单商品数量
  getWishAmount({ $axios, state, getters, commit, dispatch }) {
    let request = null
    if (getters.hadLogin) {
      // 已登录的操作
      // console.log('已登录的操作')
      request = dispatch('getOnlineWishAmount')
    } else {
      // 未登录的操作
      // console.log('未登录的操作')
      request = dispatch('getLocalWishAmount')
    }
    request
      .then(data => {
        commit('setWishAmount', data)
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
    return request
  },
  // 获取在线心愿单商品数量
  getOnlineWishAmount({ $axios, state, getters, commit, dispatch }) {
    // console.log('getOnlineWishAmount=====>')
    return this.$axios({
      method: 'get',
      url: `/wap/collection/count`,
      params: {
        type: 1
      }
    })
      .then(data => {
        // console.log('线上心愿单商品总数====>', data)
        return data['collection-1']
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 获取本地心愿单商品数量
  async getLocalWishAmount({ $axios, state, getters, commit, dispatch }) {
    // console.log('getLocalWishAmount=====>')
    const wish = await dispatch('getLocalWish')
    return wish.length
  },
  // 使用本地心愿单数据置换心愿单商品数据
  localWishToGoodsInfo(
    { $axios, state, getters, commit, dispatch },
    localWish
  ) {
    // console.log('localWishToGoodsInfo=====>', localWish)
    let data = null
    if (localWish instanceof Array) {
      data = localWish
    } else if (typeof localWish === 'number') {
      data = [localWish]
    } else if (typeof localWish === 'string') {
      data = [localWish]
    } else {
      return Promise.reject(
        new Error('goods must be Array || Number || String')
      )
    }

    if (data.length === 0) {
      return Promise.resolve([])
    }

    data = data.map((item, index) => {
      item.goodsDetailsId = null
      delete item.id
      delete item.type
      delete item.createTime
      return item
    })

    return this.$axios({
      method: 'post',
      url: `/wap/goodsCart/postBDD`,
      data: data
    })
      .then(data => {
        data = data.map((item, index) => {
          let result = {}
          if (item.hasOwnProperty('ringsSimpleGoodsEntity')) {
            // 对戒
            item = item.ringsSimpleGoodsEntity
            result = {
              goodsId: null,
              groupId: item.id,
              groupType: 1,

              name: item.name,
              images: item.ringImg,
              coinType: item.coinType,
              price: item.salePrice
            }
          } else if (item.hasOwnProperty('simpleGoodsEntity')) {
            // 单品
            item = item.simpleGoodsEntity
            result = {
              goodsId: item.goodId,
              groupId: null,
              groupType: null,

              name: item.goodsName,
              images: item.goodsImages,
              coinType: item.coinType,
              price: item.salePrice
            }
          }

          return result
        })
        return data
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 获取本地心愿单，并转换数据格式
  getLocalWishAndDealData({ $axios, state, getters, commit, dispatch }) {
    // console.log('getLocalWishAndDealData=====>')
    return new Promise((resolve, reject) => {
      dispatch('getLocalWish')
        .then(data => {
          dispatch('localWishToGoodsInfo', data)
            .then(data => {
              commit('setWish', data)
              resolve(data)
            })
            .catch(err => {
              console.error(err)
              reject(err)
            })
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    })
  },
  /**
   * 对比相关
   */
  // 同步到线上对比中
  async synchronizeCompared({ $axios, state, getters, commit, dispatch }) {
    // console.log('synchronizeCompared=====>')

    if (!getters.hadLogin) {
      return Promise.reject(new Error('只有登录后才可以同步对比'))
    }

    const goods = await dispatch('getLocalCompared')
    if (goods.length === 0) {
      return Promise.resolve('wish is not need to synchronize')
    }
    const sendData = goods.map(item => {
      delete item.id
      delete item.groupType
      return item
    })

    return this.$axios({
      method: 'post',
      url: `/wap/collection/addList`,
      data: {
        addType: 2, // 类别(1:普通批量添加,2:登录批量添加
        type: 2,
        userCollectionList: sendData
      }
    })
      .then(data => {
        dispatch('cleanLocalCompared')
        return Promise.resolve('success')
      })
      .catch(err => {
        if (!err.response) {
          dispatch('cleanLocalCompared')
        }
        return Promise.reject(err)
      })
  },
  // 加入到对比
  addCompared({ $axios, state, getters, commit, dispatch }, goods = []) {
    let data = null
    if (goods instanceof Array) {
      data = goods
    } else if (goods instanceof Object) {
      data = [goods]
    } else {
      return Promise.reject(new Error('goods must be Array or Object'))
    }

    if (data.length === 0) {
      return Promise.reject(new Error('goods can not be null'))
    }

    const time = getTimestampUuid()

    data = data.map(item => {
      item.createTime = time
      return item
    })

    let request = null
    if (getters.hadLogin) {
      // 已登录的操作
      // console.log('已登录的操作')
      request = dispatch('addOnlineCompared', data)
    } else {
      // 未登录的操作
      // console.log('未登录的操作')
      request = dispatch('addLocalCompared', data)
    }
    request
      .then(data => {
        // 加入成功后，重新获取对比数据
        dispatch('getCompared')
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
    return request
  },
  // 加入到线上对比中
  addOnlineCompared({ $axios, state, getters, commit, dispatch }, goods = []) {
    // console.log('addOnlineCompared=====>')

    const sendData = goods.map(item => {
      delete item.groupType
      return item
    })

    return this.$axios({
      method: 'post',
      url: `/wap/collection/addList`,
      data: {
        addType: 1, // 类别(1:普通批量添加,2:登录批量添加
        type: 2,
        userCollectionList: sendData
      }
    })
      .then(data => {
        // 重新请求对比数量（和对比列表）
        return Promise.resolve('success')
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 加入到本地对比中
  addLocalCompared({ $axios, state, getters, commit, dispatch }, goods = []) {
    // console.log('addLocalCompared=====>')

    goods = goods.map(item => {
      item.id = item.goodsId || item.groupId
      return item
    })

    return new Promise(async (resolve, reject) => {
      try {
        let compared = await dispatch('getLocalCompared')
        if (getters.inCompared(goods[0].id)) {
          return reject(new Error('已存在对比中'))
        }
        compared = compared.concat(goods)
        if (compared.length > 10) {
          return reject(new Error(lang.comparedListIsFull))
        }
        localStorage.setItem(COMPARED, JSON.stringify(compared))
        return resolve('success')
      } catch (e) {
        return reject(e)
      }
    })
  },
  // 删除对比商品
  removeCompared({ $axios, state, getters, commit, dispatch }, goods = []) {
    let data = null
    if (goods instanceof Array) {
      data = goods
    } else if (typeof goods === 'number') {
      data = [goods]
    } else if (typeof goods === 'string') {
      data = [goods]
    } else {
      return Promise.reject(
        new Error('goods must be Array || Number || String')
      )
    }

    if (data.length === 0) {
      return Promise.reject(new Error('goods can not be null'))
    }

    let request = null
    if (getters.hadLogin) {
      // 已登录的操作
      // console.log('已登录的操作')
      request = dispatch('removeOnlineCompared', data)
    } else {
      // 未登录的操作
      // console.log('未登录的操作')
      request = dispatch('removeLocalCompared', data)
    }
    request
      .then(data => {
        // 删除成功后，重新获取对比数据
        dispatch('getCompared')
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
    return request
  },
  // 删除线上对比中的商品
  removeOnlineCompared(
    { $axios, state, getters, commit, dispatch },
    goods = []
  ) {
    // console.log('removeOnlineCompared=====>')

    // 将商品id转换为比中单id
    goods = JSON.parse(JSON.stringify(goods)).map(item => {
      const compared = state.compared
      let result = null
      for (let n = 0, length = compared.length; n < length; n++) {
        if (compared[n].goodsId === item) {
          result = compared[n].id
          break
        }
      }
      return result
    })

    return this.$axios({
      method: 'post',
      url: `/wap/collection/delete`,
      params: {
        ids: goods.join(',')
      }
    })
      .then(data => {
        // 重新请求对比数量（和对比列表）
        return Promise.resolve('success')
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 删除本地对比中的商品
  removeLocalCompared(
    { $axios, state, getters, commit, dispatch },
    goods = []
  ) {
    // console.log('removeLocalCompared=======>', goods)
    return new Promise(async (resolve, reject) => {
      try {
        let count = 0
        goods.forEach(item => {
          if (getters.inCompared(item)) {
            count++
          }
        })
        if (!count) {
          return reject(new Error('对比单中不存在该商品'))
        }

        const newCompared = []
        const compared = await dispatch('getLocalCompared')
        for (let n = 0, length = compared.length; n < length; n++) {
          if (
            goods.indexOf(compared[n].goodsId || compared[n].groupId) === -1
          ) {
            newCompared.push(compared[n])
          }
        }
        localStorage.setItem(COMPARED, JSON.stringify(newCompared))
        return resolve('success')
      } catch (e) {
        return reject(e)
      }
    })
  },
  // 清空本地对比中的商品
  cleanLocalCompared({ $axios, state, getters, commit, dispatch }) {
    localStorage.setItem(COMPARED, JSON.stringify([]))
  },
  // 获取对比数据
  getCompared({ $axios, state, getters, commit, dispatch }) {
    let request = null
    if (getters.hadLogin) {
      // 已登录的操作
      // console.log('已登录的操作')
      request = dispatch('getOnlineCompared')
    } else {
      // 未登录的操作
      // console.log('未登录的操作')
      request = dispatch('getLocalComparedAndDealData')
    }
    dispatch('getComparedAmount')
    request
      .then(data => {
        commit('setCompared', data)
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
    return request
  },
  // 获取在线对比数据
  getOnlineCompared({ $axios, state, getters, commit, dispatch }) {
    // console.log('getOnlineCompared=====>')
    return this.$axios({
      method: 'get',
      url: `/wap/collection/list`,
      params: {
        type: 2,
        currPage: 1,
        pageSize: 9999
      }
    })
      .then(data => {
        return makeComparedGoodGroups(data.list)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 获取本地对比数据
  getLocalCompared({ $axios, state, getters, commit, dispatch }) {
    return Promise.resolve(JSON.parse(localStorage.getItem(COMPARED) || '[]'))
  },
  // 获取对比商品数量
  getComparedAmount({ $axios, state, getters, commit, dispatch }) {
    let request = null
    if (getters.hadLogin) {
      // 已登录的操作
      // console.log('已登录的操作')
      request = dispatch('getOnlineComparedAmount')
    } else {
      // 未登录的操作
      // console.log('未登录的操作')
      request = dispatch('getLocalComparedAmount')
    }
    request
      .then(data => {
        commit('setComparedAmount', data)
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
    return request
  },
  // 获取在线对比商品数量
  getOnlineComparedAmount({ $axios, state, getters, commit, dispatch }) {
    // console.log('getOnlineComparedAmount=====>')
    return this.$axios({
      method: 'get',
      url: `/wap/collection/count`,
      params: {
        type: 2
      }
    })
      .then(data => {
        // console.log('线上对比商品总数====>', data)
        return data['collection-2']
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 获取本地对比商品数量
  async getLocalComparedAmount({ $axios, state, getters, commit, dispatch }) {
    // console.log('getLocalComparedAmount=====>')
    const wish = await dispatch('getLocalCompared')
    return wish.length
  },
  // 使用本地对比数据置换对比商品数据
  localComparedToGoodsInfo(
    { $axios, state, getters, commit, dispatch },
    localCompared
  ) {
    // console.log('localComparedToGoodsInfo=====>', localCompared)
    let data = null
    if (localCompared instanceof Array) {
      data = localCompared
    } else if (typeof localCompared === 'number') {
      data = [localCompared]
    } else if (typeof localCompared === 'string') {
      data = [localCompared]
    } else {
      return Promise.reject(
        new Error('goods must be Array || Number || String')
      )
    }

    if (data.length === 0) {
      return Promise.resolve([])
    }

    data = data.map((item, index) => {
      item.goodsDetailsId = null
      delete item.id
      delete item.type
      delete item.createTime
      return item
    })

    return this.$axios({
      method: 'post',
      url: `/wap/goodsCart/postBDD`,
      data: data
    })
      .then(data => {
        data = data.map((item, index) => {
          let result = {}
          if (item.hasOwnProperty('ringsSimpleGoodsEntity')) {
            // 对戒
            item = item.ringsSimpleGoodsEntity
            result = {
              goodsId: null,
              groupId: item.id,
              groupType: 1,

              name: item.name,
              images: item.ringImg,
              coinType: item.coinType,
              price: item.salePrice
            }
          } else if (item.hasOwnProperty('simpleGoodsEntity')) {
            // 单品
            item = item.simpleGoodsEntity
            result = {
              goodsId: item.goodId,
              groupId: null,
              groupType: null,

              name: item.goodsName,
              images: item.goodsImages,
              coinType: item.coinType,
              price: item.salePrice
            }
          }

          return result
        })
        return data
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 获取本地对比，并转换数据格式
  getLocalComparedAndDealData({ $axios, state, getters, commit, dispatch }) {
    // console.log('getLocalComparedAndDealData=====>')
    return new Promise((resolve, reject) => {
      dispatch('getLocalCompared')
        .then(data => {
          dispatch('localComparedToGoodsInfo', data)
            .then(data => {
              commit('setCompared', data)
              resolve(data)
            })
            .catch(err => {
              console.error(err)
              reject(err)
            })
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    })
  },

  // 获取产品平均评分
  getGoodAvgLevel({ $axios, state, getters, commit, dispatch }, options = {}) {
    // console.log('getGoodAvgLevel=====>')
    return this.$axios({
      method: 'get',
      url: `/wap/goodsComments/getAvgLevel`,
      params: options.params || {}
    })
      .then(data => {
        // console.log('获取产品平均评分====>', data)
        return data
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },

  // 订单确认收货
  orderSigning({ $axios, state, getters, commit, dispatch }, orderId) {
    // console.log('orderSigning=====>')
    return this.$axios({
      method: 'get',
      url: `/wap/myOrder/confirmReceipt`,
      params: {
        orderId: orderId
      }
    })
      .then(data => {
        return data
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 取消订单
  cancelOrder({ $axios, state, getters, commit, dispatch }, orderId) {
    // console.log('cancelOrder=====>')
    return this.$axios({
      method: 'post',
      url: `/wap/myOrder/cancelOrder`,
      params: {
        orderId: orderId
      }
    })
      .then(data => {
        return data
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}
