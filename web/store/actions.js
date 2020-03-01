import LANGUAGE from '@/assets/i18n/index.js'
import axios from 'axios'

const Cookie = process.client ? require('js-cookie') : undefined
const CART = 'cart'
const WISH = 'wish'
const COMPARED = 'compared'
const SEARCHHISTORY = 'searchHistory'

// 获取不会重复的类时间戳
function getTimestampUuid () {
    return new Date().getTime().toString()
}

function makeCartGoodGroups (cart = []) {
    // console.log("cart",cart)
    const result = []
    const localData = {}
    cart.forEach(item => {
        let groupId = item['groupId'] || item['id'] || item['createTime']
        item.goodsId=item.goodsDetailsId
        if (localData.hasOwnProperty(groupId)) {
            localData[groupId].data.push(item)
        } else {
            localData[groupId] = {
                id: groupId.toString(),
                groupType: item.groupType || null,
                data: [item]
            }
        }
    })
    
    let keys = Object.keys(localData)
    // console.log("local",keys)
    keys = keys.sort((a, b) => {
        return b - a
    })
    keys.forEach(item => {
        result.push(localData[item])
    })
    // console.log("iiiii", result)
    // 将定制的商品进行排序，钻石放在后面
    result.map(item => {
        // console.log('a',item)
        if (item.groupType === null) {
            // 单品
            const simpleGoodsEntity = item.data[0].simpleGoodsEntity || {}
            item.groupTypeText = '单品'
            item.goodsName = simpleGoodsEntity.goodsName
            item.image = simpleGoodsEntity.goodsImages
            item.coinType = simpleGoodsEntity.coinType
            item.price = simpleGoodsEntity.simpleGoodsDetails.retailMallPrice
        } else if (item.groupType === 1) {
            // 对戒
            const ringsSimpleGoodsEntity = item.data[0].ringsSimpleGoodsEntity || {}
            item.groupTypeText = '对戒'
            item.goodsName = ringsSimpleGoodsEntity.name
            item.image = ringsSimpleGoodsEntity.ringImg
            item.coinType = ringsSimpleGoodsEntity.coinType
            item.price = ringsSimpleGoodsEntity.salePrice
                // ringsSimpleGoodsEntity.simpleGoodsEntity.simpleGoodsDetails
                //     .retailMallPrice +
                // item.data[1].ringsSimpleGoodsEntity.simpleGoodsEntity.simpleGoodsDetails
                //     .retailMallPrice
        } else if (item.groupType === 2) {
            // 定制
            const diamond = []
            const pedestal = []
            item.data.forEach(detail => {
                // console.log("data",detail)
                if (detail.categoryId ===
                    1) {
                    diamond.push(detail)
                } else {
                    pedestal.push(detail)
                }
            })
            item.data = pedestal.concat(diamond)
            const simpleGoodsEntity = item.data[0].simpleGoodsEntity || {}
            item.groupTypeText = '定制'
            item.goodsName = simpleGoodsEntity.goodsName
            item.image = simpleGoodsEntity.goodsImages
            item.coinType = simpleGoodsEntity.coinType
            item.price =
                parseFloat(simpleGoodsEntity.simpleGoodsDetails.retailMallPrice) +
                parseFloat(item.data[1].simpleGoodsEntity.simpleGoodsDetails.retailMallPrice)
        }
        // console.log('a',item)
        return item
    })

    // console.log("result",result)

    return result
}

function makeWishGoodGroups (wish = []) {
    return wish
}

function makeComparedGoodGroups (compared = []) {
    return compared
}

export default {
    //刷新token
    refreshTokenRequest ({ $axios, state, getters, commit, dispatch }) {

        const loginTime = parseInt(localStorage.getItem('loginTime'));
        const refreshTime = parseInt(localStorage.getItem('refreshTime'));
        let nowDate = parseInt((new Date()).getTime() / 1000)
        let refreshOnceTime = 30 * 60  //过期后每隔多少时间刷新token    

        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken || (nowDate - refreshTime < refreshOnceTime)) {
            return
        }
        return this.$axios({
            method: 'post',
            url: '/web/site/refresh',
            data: {
                refresh_token: refreshToken
            }
        }).then(res => {
            if (res.code == 200) {
                localStorage.setItem("refreshTime", nowDate);
                localStorage.setItem('refreshToken', res.data.refresh_token);
                localStorage.setItem('accessToken', res.data.access_token);
                commit('setToken', res.data.access_token);
                //window.location.reload()
            } else {
                dispatch('logout')
                //window.location.reload()
            }

        })
    },
    //根据IP缓存本地默认 地区，语言，货币
    localAreaSetting({ $axios, state, getters, commit, dispatch }){
        let areaId = Cookie.get('areaId')
        let language = Cookie.get('language')
        let coin = Cookie.get('coin')        
        //刷新时间控制
        let refreshAreaTime = parseInt(localStorage.getItem('refreshAreaTime'));
        let nowDate = parseInt((new Date()).getTime() / 1000)
        let refreshOnceTime = 60  //过期后每隔多少秒刷新地区    
        if ((language && coin) && (nowDate - refreshAreaTime < refreshOnceTime)) {
            return
        }
        this.$axios({
            method: `get`,
            url: `/web/site/setting`
        }).then(res => {
            const data = res.data
            if(!language) {
                commit('setLanguage', data.language)
            }                    
            if(!coin) {               
                commit('setCoin', data.currency)
            }
            localStorage.setItem('refreshAreaTime',nowDate)
            if(data.area_id != areaId) {
                commit('setAreaId', data.area_id)
                window.location.reload();
            } 
                     
        })
        .catch(err => {
            console.error(err)
        })

    },

    nuxtServerInit ({ commit }, { req, res,app,store,$axios }) {
                
    },
    // 退出登录
    logout ({ $axios, state, commit, dispatch }) {
        commit('setToken', '')
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshTime');
    },
    // 获取用户数据
    getUserInfo ({ $axios, state, commit, dispatch }) {
        return this.$axios({
            method: 'get',
            url: 'web/member/member/me'
        })
        .then(res => {
            // console.log("个人",res.data)
            commit('setUserInfo', res.data)
            return res.data
        })
        .catch(err => {
            return Promise.reject(err)
        })
    },

    /**
     * 历史搜索记录
     */
    getLocalSearchHistory ({ $axios, state, getters, commit, dispatch }) {
        return JSON.parse(localStorage.getItem(SEARCHHISTORY) || '[]')
    },
    addLocalSearchHistory ({ $axios, state, getters, commit, dispatch }, keyword) {
        return new Promise(async (resolve, reject) => {
            try {
                let searchHistory = await dispatch('getLocalSearchHistory')
                searchHistory = searchHistory.slice(0, 4)
                // console.log('searchHistory=====>', searchHistory)
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
                    keyword
                })
                console.log('searchHistory after=====>', searchHistory)
                localStorage.setItem(SEARCHHISTORY, JSON.stringify(searchHistory))
                return resolve('success')
            } catch (e) {
                return reject(e)
            }
        })
    },
    cleanLocalSearchHistory ({ $axios, state, getters, commit, dispatch }) {
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
    async synchronizeCart ({ $axios, state, getters, commit, dispatch }) {
        // console.log('synchronizeCart=====>同步购物车')

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
                good.goods_id = good.goodsDetailsId
                return good
            })
            sendData = sendData.concat(data)
        })
        console.log("购物车", sendData)

        return this.$axios({
            method: 'post',
            url: 'web/member/cart/add',
            data: {
                // goods_type: 1, // 类别(1:普通批量添加,2:登录批量添加
                goodsCartList: sendData
            }
        })
            .then(res => {
                // console.log("hahahah",res)
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
    addCart ({ $axios, state, getters, commit, dispatch }, goods = []) {
        // console.log("lalal",goods)
        let data = null
        if (Array.isArray(goods)) {
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
            request = dispatch('addLocalCart', data)
            // setTimeout(() => {
            //     this.$router.push(`/login`)
            // }, 2000)
            // return Promise.reject(new Error('请先登陆！'))
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
    addOnlineCart ({ $axios, state, getters, commit, dispatch }, goods = []) {
        // console.log('addOnlineCart=====>',goods)
        const time = getTimestampUuid()

        goods = goods.map(item => {
            item.createTime = time
            item.updateTime = time
            item.goods_id = item.goodsDetailsId
            return item
        })

        console.log('goods-------->', goods)

        return this.$axios({
            method: 'post',
            url: 'web/member/cart/add',
            data: {
                // goods_type: 1, // 类别(1:普通批量添加,2:登录批量添加
                goodsCartList: goods
            }
        })
            .then(data => {
                console.log("添加购物车", data)
                // 重新请求购物车数量（和购物车列表）
                return Promise.resolve('success')
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    // 加入到本地购物车中
    addLocalCart ({ $axios, state, getters, commit, dispatch }, goods = []) {
        console.log("2222",goods)
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
                // 本地加入购物车数据
                localStorage.setItem(CART, JSON.stringify(cart))
                return resolve()
            } catch (e) {
                // console.log("eeeeee", e)
                return reject(e)
            }
        })
    },
    //保存游客订单id
    setLocalCartOrder({ $axios, state, getters, commit, dispatch }, orderSn) {
        const cartOrderSn = 'cartOrderSn'

        return new Promise(async (resolve, reject) => {
            try {
                localStorage.setItem(cartOrderSn, orderSn)
                return resolve()
            } catch (e) {
                return reject(e)
            }
        })
    },
    //获取游客订单id
    getLocalCartOrder ({ $axios, state, getters, commit, dispatch }) {
        const cartOrderSn = 'cartOrderSn'
        return localStorage.getItem(cartOrderSn)
    },

    // 删除购物车商品
    removeCart ({ $axios, state, getters, commit, dispatch }, goods = []) {
        console.log('removeCart=====>',goods)
        let data = null
        if (Array.isArray(goods)) {
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
    removeOnlineCart ({ $axios, state, getters, commit, dispatch }, goods = []) {
        // console.log('removeOnlineCart=====>',goods)

        const cart = state.cart
        const ids = []
        goods.forEach(groupId => {
            for (let n = 0, length = cart.length; n < length; n++) {
                if (cart[n].id === groupId.toString()) {
                    cart[n].data.forEach(good => {
                        ids.push(good.id)

                    })
                }
            }
        })
        // console.log("id",ids)
        return this.$axios({
            method: 'post',
            url: '/web/member/cart/del',
            data: {
                id: ids
            },
            transformRequest: [
                function (data) {
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
                console.log("count", data)
                // 重新请求购物车数量（和购物车列表）
                return Promise.resolve('success')
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    // 删除本地购物车中的商品
    removeLocalCart ({ $axios, state, getters, commit, dispatch }, goods = []) {
        console.log('removeLocalCart=====>',goods)
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
                    if (!goods.includes(cart[n].id)) {
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
    cleanLocalCart ({ $axios, state, getters, commit, dispatch }) {
        localStorage.setItem(CART, JSON.stringify([]))
    },
    // 获取购物车数据
    getCart ({ $axios, state, getters, commit, dispatch }) {
        let request = null
        if (getters.hadLogin) {
            // 已登录的操作
            console.log('已登录的操作')
            request = dispatch('getOnlineCart')
        } else {
            // 未登录的操作
            // console.log('未登录的操作')
            request = dispatch('getLocalCartAndDealData')
            // return Promise.reject(new Error('请登录！'))
        }
        dispatch('getCartAmount')
        request
            .then(data => {
                // console.log("本地",data)
                commit('setCart', data)
                return Promise.resolve(data)
            })
            .catch(err => {
                return Promise.reject(err)
            })
        return request
    },
    // 获取在线购物车数据
    getOnlineCart ({ $axios, state, getters, commit, dispatch }) {
        // console.log('getOnlineCart=====>')
        return this.$axios({
            method: 'get',
            url: '/web/member/cart'
        }).then(res => {
            // console.log("购物车列表",res.data)
            return makeCartGoodGroups(res.data)
        })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    // 获取本地购物车数据
    getLocalCart ({ $axios, state, getters, commit, dispatch }) {
        // console.log('getLocalCart=====>',localStorage.getItem(CART))
        return JSON.parse(localStorage.getItem(CART) || '[]')
    },
    // 获取购物车商品数量
    getCartAmount ({ $axios, state, getters, commit, dispatch }) {
        let request = null
        if (getters.hadLogin) {
            // 已登录的操作
            console.log('已登录的操作')
            request = dispatch('getOnlineCartAmount')
            // request
            //     .then(data => {
            //         commit('setCartAmount', data)
            //         return Promise.resolve(data)
            //     })
            //     .catch(err => {
            //         return Promise.reject(err)
            //     })
            // return request
        } else {
            // 未登录的操作
            // return Promise.reject(new Error('请登录！'))
            request = dispatch('getLocalCartAmount')
            // console
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
    async  getOnlineCartAmount ({ $axios, state, getters, commit, dispatch }) {
        // const cart =await dispatch('getList')
        // return cart.length  /web/goodsCart/count
        // console.log('getOnlineCartAmount=====>',)
        return this.$axios({
            method: 'get',
            url: '/web/member/cart/count'
        })
            .then(res => {
                // console.log('线上购物车商品总数====>', data)
                if (res.code == 200) {
                    return res.data
                } else {
                    return
                }

            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    // 获取本地购物车商品数量
    async getLocalCartAmount ({ $axios, state, getters, commit, dispatch }) {
        const cart = await dispatch('getLocalCart')
        // console.log('getLocalCartAmount=====>',cart.length)
        return cart.length
    },
    // 使用本地购物车数据置换购物车商品数据
    localCartToGoodsInfo (
        { $axios, state, getters, commit, dispatch },
        localCart
    ) {
        console.log("localtion",localCart)
        let data = null
        if (Array.isArray(localCart)) {
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
            console.log(goods,'dssasdf')
            // console.log('goods----------->', item)
            goods = goods.map(good => {
                good.updateTime = item.id
                good.createTime = item.id
                good.goods_id = good.goodsDetailsId
                return good
            })
            sendData = sendData.concat(goods)
        })

        console.log('sendData===========>', sendData)

        return this.$axios({
            method: 'post',
            url: '/web/member/cart/local',
            data: {
                goodsCartList:sendData
            }
        })
            .then(res => {
                console.log("本地置换数据",res.data)
                return makeCartGoodGroups(res.data)
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    // 获取本地购物车，并转换数据格式
    getLocalCartAndDealData ({ $axios, state, getters, commit, dispatch }) {
        // console.log('getLocalCartAndDealData=====>')
        return new Promise((resolve, reject) => {
            dispatch('getLocalCart')
                .then(data => {
                    // console.log("本地购物车列表11111",data)
                    dispatch('localCartToGoodsInfo', data)
                        .then(data => {

                            commit('setCart', data)
                            resolve(data)
                        })
                        .catch(err => {
                            // console.error("aaaaaa===",err)
                            reject(err)
                        })
                })
                .catch(err => {
                    console.error(err)
                    reject(err)
                })
        })
    },
    // 根据购物车id获取对应的购物车商品
    async getCartGoodsByCartId (
        { $axios, state, getters, commit, dispatch },
        goods = []
    ) {
        console.log('getCartGoodsByCartId=====>',goods)
        let data = null
        if (Array.isArray(goods)) {
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
        await dispatch(`getCart`)
        // console.log("cart==========",state.cart)
        const cart = state.cart || []
        const result = []
        cart.forEach(item => {
            // console.log("cart==========",state.cart)
            if (data.includes(item.id)) {
                result.push(item)
            }
        })
        // console.log(`inTest=====> `, cart)
        console.log(`cccc=====> `, result)
        return result
    },

    /**
     * 心愿单相关
     */
    // 同步到线上心愿单中
    async synchronizeWish ({ $axios, state, getters, commit, dispatch }) {
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
            url: `/web/collection/addList`,
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
    addWish ({ $axios, state, getters, commit, dispatch }, goods = []) {
        let data = null
        if (Array.isArray(goods)) {
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
    addOnlineWish ({ $axios, state, getters, commit, dispatch }, goods = []) {
        // console.log('addOnlineWish=====>')

        const sendData = goods.map(item => {
            delete item.groupType
            return item
        })

        return this.$axios({
            method: 'post',
            url: `/web/collection/addList`,
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
    addLocalWish ({ $axios, state, getters, commit, dispatch }, goods = []) {
        // console.log('addLocalWish=====>')

        goods = goods.map(item => {
            item.id = item.goodsId || item.groupId
            return item
        })

        console.log('addWish=========>', goods)

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
    removeWish ({ $axios, state, getters, commit, dispatch }, goods = []) {
        let data = null
        if (Array.isArray(goods)) {
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
    removeOnlineWish ({ $axios, state, getters, commit, dispatch }, goods = []) {
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
            url: `/web/collection/delete`,
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
    removeLocalWish ({ $axios, state, getters, commit, dispatch }, goods = []) {
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
                    if (!goods.includes(wish[n].goodsId || wish[n].groupId)) {
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
    cleanLocalWish ({ $axios, state, getters, commit, dispatch }) {
        localStorage.setItem(WISH, JSON.stringify([]))
    },
    // 获取心愿单数据
    getWish ({ $axios, state, getters, commit, dispatch }) {
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
    getOnlineWish ({ $axios, state, getters, commit, dispatch }) {
        // console.log('getOnlineWish=====>')
        // return this.$axios({
        //   method: 'get',
        //   url: `/web/collection/list`,
        //   params: {
        //     type: 1,
        //     page: 1,
        //     page_size: 9999
        //   }
        // })
        //   .then(data => {
        //     return makeWishGoodGroups(data.list)
        //   })
        //   .catch(err => {
        //     return Promise.reject(err)
        //   })
    },
    // 获取本地心愿单数据
    getLocalWish ({ $axios, state, getters, commit, dispatch }) {
        return Promise.resolve(JSON.parse(localStorage.getItem(WISH) || '[]'))
    },
    // 获取心愿单商品数量
    getWishAmount ({ $axios, state, getters, commit, dispatch }) {
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
    getOnlineWishAmount ({ $axios, state, getters, commit, dispatch }) {
        // console.log('getOnlineWishAmount=====>')
        return this.$axios({
            method: 'get',
            // url: `/web/collection/count`,
            params: {
                type: 1
            }
        })
            .then(data => {
                // console.log('线上心愿单商品总数====>', data)
                return data.collection_1
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    // 获取本地心愿单商品数量
    async getLocalWishAmount ({ $axios, state, getters, commit, dispatch }) {
        // console.log('getLocalWishAmount=====>')
        const wish = await dispatch('getLocalWish')
        return wish.length
    },
    // 使用本地心愿单数据置换心愿单商品数据
    localWishToGoodsInfo (
        { $axios, state, getters, commit, dispatch },
        localWish
    ) {
        // console.log('localWishToGoodsInfo=====>', localWish)
        let data = null
        if (Array.isArray(localWish)) {
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
            url: `/web/goodsCart/postBDD`,
            data
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
    getLocalWishAndDealData ({ $axios, state, getters, commit, dispatch }) {
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
    async synchronizeCompared ({ $axios, state, getters, commit, dispatch }) {
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
            url: `/web/collection/addList`,
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
    addCompared ({ $axios, state, getters, commit, dispatch }, goods = []) {
        let data = null
        if (Array.isArray(goods)) {
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
    addOnlineCompared ({ $axios, state, getters, commit, dispatch }, goods = []) {
        // console.log('addOnlineCompared=====>')

        const sendData = goods.map(item => {
            delete item.grouptype
            return item
        })

        return this.$axios({
            method: 'post',
            url: `/web/collection/addList`,
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
    addLocalCompared ({ $axios, state, getters, commit, dispatch }, goods = []) {
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
    removeCompared ({ $axios, state, getters, commit, dispatch }, goods = []) {
        let data = null
        if (Array.isArray(goods)) {
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
    removeOnlineCompared (
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
            url: `/web/collection/delete`,
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
    removeLocalCompared (
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
                    if (!goods.includes(compared[n].goodsId || compared[n].groupId)) {
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
    cleanLocalCompared ({ $axios, state, getters, commit, dispatch }) {
        localStorage.setItem(COMPARED, JSON.stringify([]))
    },
    // 获取对比数据
    getCompared ({ $axios, state, getters, commit, dispatch }) {
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
    getOnlineCompared ({ $axios, state, getters, commit, dispatch }) {
        // console.log('getOnlineCompared=====>')
        // return this.$axios({
        //   method: 'get',
        //   url: `/web/collection/list`,
        //   params: {
        //     type: 2,
        //     page: 1,
        //     page_size: 9999
        //   }
        // })
        //   .then(data => {
        //     return makeComparedGoodGroups(data.list)
        //   })
        //   .catch(err => {
        //     return Promise.reject(err)
        //   })
    },
    // 获取本地对比数据
    getLocalCompared ({ $axios, state, getters, commit, dispatch }) {
        return Promise.resolve(JSON.parse(localStorage.getItem(COMPARED) || '[]'))
    },
    // 获取对比商品数量
    getComparedAmount ({ $axios, state, getters, commit, dispatch }) {
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
    getOnlineComparedAmount ({ $axios, state, getters, commit, dispatch }) {
        // console.log('getOnlineComparedAmount=====>')
        return this.$axios({
            method: 'get',
            // url: `/web/collection/count`,
            params: {
                type: 2
            }
        })
            .then(data => {
                // console.log('线上对比商品总数====>', data)
                return data.collection_2
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    // 获取本地对比商品数量
    async getLocalComparedAmount ({ $axios, state, getters, commit, dispatch }) {
        // console.log('getLocalComparedAmount=====>')
        const wish = await dispatch('getLocalCompared')
        return wish.length
    },
    // 使用本地对比数据置换对比商品数据
    localComparedToGoodsInfo (
        { $axios, state, getters, commit, dispatch },
        localCompared
    ) {
        // console.log('localComparedToGoodsInfo=====>', localCompared)
        let data = null
        if (Array.isArray(localCompared)) {
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

        const ids = []

        data.forEach(item => {
            ids.push(item.goodsId)
        })

        return this.$axios({
            method: 'post',
            url: `/web/goodsCart/zhu`,
            data: {
                goodsIds: ids
            },
            transformRequest: [
                function (data) {
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
            ],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(data => {
                return data
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    // 获取本地对比，并转换数据格式
    getLocalComparedAndDealData ({ $axios, state, getters, commit, dispatch }) {
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
    getGoodAvgLevel ({ $axios, state, getters, commit, dispatch }, options = {}) {
        // console.log('getGoodAvgLevel=====>')
        return this.$axios({
            method: 'get',
            url: `/web/goodsComments/getAvgLevel`,
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
    orderSigning ({ $axios, state, getters, commit, dispatch }, orderId) {
        // console.log('orderSigning=====>')
        return this.$axios({
            method: 'get',
            url: `/web/myOrder/confirmReceipt`,
            params: {
                orderId
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
    cancelOrder ({ $axios, state, getters, commit, dispatch }, orderId) {
        // console.log('cancelOrder=====>')
        return this.$axios({
            method: 'post',
            url: `/web/myOrder/cancelOrder`,
            params: {
                orderId
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
