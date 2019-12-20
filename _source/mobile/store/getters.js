export default {
  hadLogin(state) {
    return !!state.token
  },
  cartAmount(state) {
    const result = state.cartAmount
    if (result === null) {
      return result
    }
    if (result < 1) {
      return 0
    }
    if (result > 99) {
      return '9+'
    }
    return result
  },
  wishGoodIds(state) {
    const result = []
    const wish = state.wish || []
    // console.log('wish==============>', wish)
    for (let n = 0, length = wish.length; n < length; n++) {
      result.push((wish[n].goodsId || wish[n].groupId).toString())
      // result.push(wish[n].goodsId || wish[n].groupId)
    }
    // console.log('wishGoodIds==============>', result)
    return result
  },
  inWish(state, getters) {
    return goodId => {
      return getters.wishGoodIds.indexOf(goodId.toString()) > -1
    }
  },
  comparedGoodIds(state) {
    const result = []
    const compared = state.compared || []
    // console.log('compared==============>', compared)
    for (let n = 0, length = compared.length; n < length; n++) {
      result.push(compared[n].goodsId || compared[n].groupId)
      // result.push(compared[n].goodsId || compared[n].groupId)
    }
    // console.log('comparedGoodIds==============>', result)
    return result
  },
  inCompared(state, getters) {
    return goodId => {
      console.log('goodId==============>', goodId)
      console.log(
        'getters.comparedGoodIds==============>',
        getters.comparedGoodIds
      )
      return getters.comparedGoodIds.indexOf(goodId) > -1
    }
  }
}
