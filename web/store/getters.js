export default {
    // 是否已经登录
    hadLogin (state) {
        return !!state.token
    },

    // 购物车数量
    cartAmount (state) {
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

    // 心愿单所有id
    wishGoodIds (state) {
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

    // 是否在心愿单中
    inWish (state, getters) {
        return goodId => {
            return getters.wishGoodIds.includes(goodId.toString())
        }
    },

    // 莫桑石对比所有id
    comparedGoodIds (state) {
        const result = []
        const compared = state.compared || []
        console.log('compared==============>', compared)
        for (let n = 0, length = compared.length; n < length; n++) {
            result.push(
                compared[n].goodId || compared[n].goodsId || compared[n].groupId
            )
        }
        console.log('comparedGoodIds==============>', result)
        return result
    },

    // 是否在莫桑石对比中
    inCompared (state, getters) {
        return goodId => {
            // console.log('goodId==============>', goodId)
            return getters.comparedGoodIds.includes(goodId)
        }
    },

    // 用户信息
    userInfo (state, getters) {
        // console.log('用户信息用户信息用户信息用户信息')
        const userInfo = state.userInfo
        return userInfo
    },
    //当前网址域名
    baseUrl () {
        let host = window.location.host;
        if ((/(msjew)\.com/).test(host)) {
            host = 'https://' + host
        } else {
            //测试
            host = 'https://' + host
        }
        return host
    },
    platform () {
        let host = window.location.host;
        let platform = 10 //默认 港澳台
        if ((/^cn\./).test(host)) {
            platform = 20 //大陆
        } else if ((/^us\./).test(host)) {
            platform = 30 //美国
        }
        return platform
    }
}
