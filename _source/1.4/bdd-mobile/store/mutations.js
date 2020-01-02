const Cookie = process.client ? require('js-cookie') : undefined

export default {
  setLastUrl(state, val) {
    state.lastUrl = val
    if (!val) {
      Cookie && Cookie.remove('lastUrl')
      return
    }
    Cookie && Cookie.set('lastUrl', val, { path: '/' })
  },
  setToken(state, val) {
    // if (!val) {
    //   return
    // }
    state.token = val
    // console.log('setToken=====>', val)
    if (!val) {
      Cookie && Cookie.remove('token')
      return
    }
    Cookie && Cookie.set('token', val, { path: '/' })
  },
  setCoin(state, val) {
    state.coin = val
    Cookie && Cookie.set('coin', val, { path: '/', expires: 30 })
  },
  setLanguage(state, val) {
    state.language = val
    Cookie && Cookie.set('language', val, { path: '/', expires: 30 })
  },
  setUserInfo(state, val) {
    // console.log('setUserInfo=====>', val)
    state.userInfo = val
  },

  /**
   * 购物车
   */
  setCartAmount(state, val) {
    // console.log('setCartAmount=====>', val)
    state.cartAmount = val
  },
  setCart(state, val) {
    // console.log('setCart=====>', val)
    state.cart = val
  },

  /**
   * 心愿单
   */
  setWishAmount(state, val) {
    // console.log('setWishAmount=====>', val)
    state.wishAmount = val
  },
  setWish(state, val) {
    // console.log('setWish=====>', val)
    state.wish = val
  },

  /**
   * 对比
   */
  setComparedAmount(state, val) {
    // console.log('setComparedAmount=====>', val)
    state.comparedAmount = val
  },
  setCompared(state, val) {
    // console.log('setCompared=====>', val)
    state.compared = val
  }
}
