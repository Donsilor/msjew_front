export default {
    hadLogin (state) {
        return !!state.token
    },
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
    inWish (state, getters) {
        return goodId => {
            return getters.wishGoodIds.indexOf(goodId.toString()) > -1
        }
    },
    comparedGoodIds (state) {
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
    inCompared (state, getters) {
        return goodId => {
            // console.log('goodId==============>', goodId)
            // console.log(
            //   'getters.comparedGoodIds==============>',
            //   getters.comparedGoodIds
            // )
            return getters.comparedGoodIds.indexOf(goodId) > -1
        }
    },
    //当前网址域名
    baseUrl () {
        let host = window.location.host;
        if ((/(bddia|bddco)\.com/).test(host)) {
            host = 'https://' + host
        } else {
            //测试
            host = 'https://' + host
        }
        return host
    },
    platform () {
        let host = window.location.host;
        let platform = 11 //默认 港澳台
        if ((/^cn\./).test(host)) {
            platform = 21 //大陆
        } else if ((/^us\./).test(host)) {
            platform = 31 //美国
        }
        return platform
    }
}
