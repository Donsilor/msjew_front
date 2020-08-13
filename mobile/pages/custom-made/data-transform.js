import Finish from './finish.vue'
const storage = process.client ? require('good-storage').default : {}
export default {
  layout: `no-bar`,
  directives: {
    clickOutSide: {
      bind(el, binding, vnode) {
        function documentHandler(e) {
          if (el.contains(e.target)) {
            return false
          }
          if (binding.expression) {
            binding.value(e)
          }
        }

        el.__vueClickOutside__ = documentHandler
        document.addEventListener('click', documentHandler)
      },
      unbind(el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
      }
    }
  },
  data() {
    return {
      lang: this.LANGUAGE['custom-made'],
      isBoard: false,
      boardDesc: {
        url: ``,
        title: ``,
        price: ``,
        step: null
      },
      boardArr: [],
      diamondTag: null,
      list:[],
      cartList:[],
      isLogin: !!this.$store.state.token,
    }
  },
  watch: {
    $route: function() {
      this.makeBoardArr()
    }
  },
  mounted() {
    // const melo = JSON.parse(this.$helpers.base64Decode(this.$route.query.melo))
    this.makeBoardArr()
  },
  components: {
    finish: Finish
  },
  computed: {
    doneBegin: function() {
      return this.boardArr.length >= 1
    },
    doneFinish: function() {
      return this.boardArr.length >= 2
    },
    active: function() {
      return parseInt(this.$route.query.step)
    },
    // 获取不会重复的类时间戳
    getTimestampUuid () {
      return new Date().getTime().toString()
    }
  },
  methods: {
    judgeStep(index) {
      return
      const l = this.boardArr.length
      switch (index) {
        case 1:
          if (l > 0) {
            setTimeout(() => {
              if (this.boardDesc.step === 1) {
                this.isBoard = !this.isBoard
              } else {
                this.isBoard = true
              }
              this.boardDesc = this.boardArr[0]
            }, 0)
          }
          break
        case 2:
          if (l > 1) {
            setTimeout(() => {
              if (this.boardDesc.step === 2) {
                this.isBoard = !this.isBoard
              } else {
                this.isBoard = true
              }
              this.boardDesc = this.boardArr[1]
            }, 0)
          }
          console.log(this.boardArr[1])
          break
        case 3:
          // console.log(this.$route.query.melo)
          if (l > 1) {
            this.$router.push({
              name: this.$route.name,
              query: {
                melo: this.$route.query.melo,
                step: 3,
                isBack: true
              }
            })
            this.isBoard = false
          }
          break
      }
    },
    closeBoard() {
      this.isBoard = false
    },
    switchStep() {
      if (this.boardDesc.step === 1) {
        this.doSomeRemark(
          JSON.parse(this.$helpers.base64Decode(this.$route.query.melo))
            .steps[0],
          1
        )
      } else if (this.boardDesc.step === 2) {
        this.doSomeRemark(
          JSON.parse(this.$helpers.base64Decode(this.$route.query.melo))
            .steps[1],
          2
        )
      } else {
      }
      this.isBoard = !this.isBoard
    },
    resetStep() {
      let melo = JSON.parse(this.$helpers.base64Decode(this.$route.query.melo))
      const isBack = this.$route.query.isBack
      const step = parseInt(this.$route.query.step)
      const routeArr = this.$route.name.split(`-`)
      const linkArr = [routeArr[0], routeArr[1]]
      if (this.boardDesc.step === 1) {
        // 第一步
        // this.$toast(`click reset step one`)
        if (step === 3) {
          // 完成后的重置
          linkArr.push(this.checkCt(melo.steps[1].ct))
          linkArr.push(`made`)
          linkArr.push(this.checkCt(melo.steps[0].ct))
          linkArr.push(`list`)
          const obj = {
            steps: [
              {
                goodsId: melo.steps[1].goodsId,
                goodsDetailsId: melo.steps[1].goodsDetailsId,
                goodsType: melo.steps[1].goodsType,
                ct: melo.steps[1].ct,
                cartId: melo.steps[1].cartId,
                page: `detail`
              },
              {
                goodsId: null,
                goodsDetailsId: null,
                goodsType: null,
                ct: melo.steps[0].ct,
                cartId: melo.steps[0].cartId,
                page: `list`
              }
            ]
          }
          this.isBoard = false
          this.$router.push({
            name: linkArr.join(`-`),
            query: {
              melo: this.$helpers.base64Encode(JSON.stringify(obj)),
              step: 2
            }
          })
        } else if (isBack && step !== 3) {
          linkArr.push(this.checkCt(melo.steps[1].ct))
          linkArr.push(`made`)
          linkArr.push(this.checkCt(melo.steps[0].ct))
          linkArr.push(`list`)
          const obj = {
            steps: [
              {
                goodsId: melo.steps[1].goodsId,
                goodsDetailsId: melo.steps[1].goodsDetailsId,
                goodsType: melo.steps[1].goodsType,
                ct: melo.steps[1].ct,
                cartId: melo.steps[1].cartId,
                page: `detail`
              },
              {
                goodsId: null,
                goodsDetailsId: null,
                goodsType: null,
                ct: melo.steps[0].ct,
                cartId: melo.steps[0].cartId,
                page: `list`
              }
            ]
          }
          melo = JSON.parse(JSON.stringify(obj))
          this.isBoard = false
          this.$router.push({
            name: linkArr.join(`-`),
            query: {
              melo: this.$helpers.base64Encode(JSON.stringify(melo)),
              step: 2
            }
          })
        } else {
          // 未完成的重置
          linkArr.push(this.checkCt(melo.steps[0].ct))
          linkArr.push(`made`)
          linkArr.push(this.checkCt(melo.steps[0].ct))
          linkArr.push(`list`)
          const obj = {
            steps: [
              {
                goodsId: null,
                goodsDetailsId: null,
                goodsType: null,
                ct: melo.steps[0].ct,
                cartId: ``,
                page: `list`
              },
              {
                goodsId: null,
                goodsDetailsId: null,
                goodsType: null,
                ct: null,
                cartId: ``,
                page: `list`
              }
            ]
          }
          melo = JSON.parse(JSON.stringify(obj))
          this.isBoard = false
          this.$router.push({
            name: linkArr.join(`-`),
            query: {
              melo: this.$helpers.base64Encode(JSON.stringify(melo)),
              step: 1
            }
          })
        }
      } else if (this.boardDesc.step === 2) {
        // 第二步
        // this.$toast(`click reset step two`)
        linkArr.push(this.checkCt(melo.steps[0].ct))
        linkArr.push(`made`)
        linkArr.push(this.checkCt(melo.steps[1].ct))
        linkArr.push(`list`)
        const obj = {
          steps: [
            {
              goodsId: melo.steps[0].goodsId,
              goodsDetailsId: melo.steps[0].goodsDetailsId,
              goodsType: melo.steps[0].goodsType,
              ct: melo.steps[0].ct,
              cartId: melo.steps[0].cartId,
              page: `detail`
            },
            {
              goodsId: null,
              goodsDetailsId: null,
              goodsType: null,
              ct: melo.steps[1].ct,
              cartId: melo.steps[1].cartId,
              page: `list`
            }
          ]
        }
        melo = JSON.parse(JSON.stringify(obj))
        this.isBoard = false
        this.$router.push({
          name: linkArr.join(`-`),
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(melo)),
            step: 2
          }
        })
      }
    },
    async makeBoardArr() {
      const ctNum = JSON.parse(
        this.$helpers.base64Decode(this.$route.query.melo)
      ).steps[0].ct
      this.diamondTag = parseInt(ctNum)
      // setTimeout(() => {
      //   this.diamondTag = parseInt(ctNum)
      // }, 0)
      // console.log(
      //   `diamond=========>`,
      //   JSON.parse(this.$helpers.base64Decode(this.$route.query.melo))
      // )


      if (!this.$route.query.isBack && parseInt(this.$route.query.step) === 2) {
        // if(this.diamondTag == 2){
          var url1 =  `/wap/goods/style/detail`;
        // }else{
          // var url1 =  `/wap/goods/diamond/detail`;
        // }
        this.$axios({
          method: `post`,
          url: url1,
          params: {
            goodsId: JSON.parse(
              this.$helpers.base64Decode(this.$route.query.melo)
            ).steps[0].goodsId
          }
        })
          .then(res => {
            console.log("fffff",res)
            var price = 0;
            if(res.coupon.hasOwnProperty('discount')){
              price = res.coupon.discount.price
            }else{
              price = res.details[i].retailMallPrice;
            }

            this.boardArr = []
            const gdi = JSON.parse(
              this.$helpers.base64Decode(this.$route.query.melo)
            ).steps[0].goodsDetailsId
            for (const i in res.details) {
              if (gdi === res.details[i].id) {
                const o = {
                  url: `${this.$IMG_URL}${res.goodsImages.split(',')[0]}`,
                  title: `${res.goodsName}`,
                  price: `${res.coinType} ${price}`,
                  step: 1
                }
                this.boardArr.push(o)
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else if (
        this.$route.query.isBack ||
        parseInt(this.$route.query.step) === 3
      ) {
        if(this.diamondTag == 1){
          // var url2 =  `/wap/goods/diamond/detail`;
          var url3 =  `/wap/goods/style/detail`;

        }else{
          var url2 =  `/wap/goods/style/detail`;
          // var url3 =  `/wap/goods/diamond/detail`;
        }

        await this.$axios({
          method: `post`,
          url: url2,
          params: {
            goodsId: JSON.parse(
              this.$helpers.base64Decode(this.$route.query.melo)
            ).steps[0].goodsId
          }
        })
          .then(res => {
            var price2 = 0;
            if(res.coupon.hasOwnProperty('discount')){
              price2 = res.coupon.discount.price
            }else{
              price2 = res.details[0].retailMallPrice;
            }

            this.boardArr = []
            const gdi = JSON.parse(
              this.$helpers.base64Decode(this.$route.query.melo)
            ).steps[0].goodsDetailsId
            for (const i in res.details) {
              if (gdi === res.details[i].id) {
                const o = {
                  url: `${this.$IMG_URL}${res.goodsImages.split(',')[0]}`,
                  title: `${res.goodsName}`,
                  price: `${res.coinType} ${price2}`,
                  step: 1
                }
                this.boardArr.push(o)
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
        await this.$axios({
          method: `post`,
          url: url3,
          params: {
            goodsId: JSON.parse(
              this.$helpers.base64Decode(this.$route.query.melo)
            ).steps[1].goodsId
          }
        })
          .then(res => {
            // for (const i in res) {
            //   if (
            //     parseInt(res[1].Id) ===
            //     parseInt(data.details[i].id)
            //   ) {
            //     if(data.details[i].coupon.hasOwnProperty('discount')){
            //       this.price2 = data.details[i].coupon.discount.price
            //     }else{
            //       this.price2 = data.details[i].retailMallPrice
            //     }
            //   }
            // }
            console.log(666,this.data)

            console.log(777,res)
            var price3 = 0;
            if(res.coupon.hasOwnProperty('discount')){
              price3 = res.coupon.discount.price
            }else{
              price3 = res.details[0].retailMallPrice;
            }

            const gdi = JSON.parse(
              this.$helpers.base64Decode(this.$route.query.melo)
            ).steps[1].goodsDetailsId
            for (const i in res.details) {
              if (gdi === res.details[i].id) {
                const o = {
                  url: `${this.$IMG_URL}${res.goodsImages.split(',')[0]}`,
                  title: `${res.goodsName}`,
                  price: `${res.coinType} ${price3}`,
                  step: 2
                }
                this.boardArr.push(o)
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    doSomeRemark(obj, step) {
      const melo = JSON.parse(
        this.$helpers.base64Decode(this.$route.query.melo)
      )
      const routeArr = this.$route.name.split(`-`)
      const linkArr = [routeArr[0], routeArr[1], routeArr[2], routeArr[3]]
      const cd = parseInt(obj.ct)
      if (cd === 1 && obj.page === `list`) {
        linkArr.push(`diamond`)
        linkArr.push(`list`)
      } else if (cd === 1 && obj.page === `detail`) {
        linkArr.push(`diamond`)
        linkArr.push(`detail`)
      } else if (cd === 2 && obj.page === `list`) {
        linkArr.push(`ring`)
        linkArr.push(`list`)
      } else if (cd === 2 && obj.page === `detail`) {
        linkArr.push(`ring`)
        linkArr.push(`detail`)
      } else if (cd === 4 && obj.page === `list`) {
        linkArr.push(`necklace`)
        linkArr.push(`list`)
      } else if (cd === 4 && obj.page === `detail`) {
        linkArr.push(`necklace`)
        linkArr.push(`detail`)
      } else if (cd === 8 && obj.page === `list`) {
        linkArr.push(`bracelet`)
        linkArr.push(`list`)
      } else if (cd === 8 && obj.page === `detail`) {
        linkArr.push(`bracelet`)
        linkArr.push(`detail`)
      }
      if (step === 1 && melo.steps[1].goodsId === null) {
        melo.steps[1].ct = null
      }
      this.$router.push({
        name: linkArr.join(`-`),
        query: {
          melo: this.$helpers.base64Encode(JSON.stringify(melo)),
          step: step,
          goodId: obj.goodsId,
          isBack: melo.steps[1].goodsId !== null
        }
      })
    },
    checkCt(i) {
      switch (i) {
        case 1:
          return `diamond`
        case 2:
          return `ring`
        case 4:
          return `necklace`
        case 8:
          return `bracelet`
      }
    },
    async addCart() {
      console.log(`in!!!!!`)
      const melo = JSON.parse(
        this.$helpers.base64Decode(this.$route.query.melo)
      )
      if (melo.steps.length === 1000) {
        console.log(1)
      } else if (melo.steps[0].goodsDetailsId && melo.steps[1].goodsDetailsId) {
        const timeSock = new Date().getTime()
        const goodInfo = [
          {
            goodsCount: 1,
            goodsDetailsId:
              melo.steps[0].ct === 1
                ? melo.steps[0].goodsDetailsId
                : melo.steps[1].goodsDetailsId,
            goodsId:
              melo.steps[0].ct === 1
                ? melo.steps[0].goodsId
                : melo.steps[1].goodsId,
            groupId: timeSock,
            groupType: 2,
            goodsType:
              melo.steps[0].ct === 1
                ? melo.steps[0].goodsType
                : melo.steps[1].goodsType,
            serviceId: 0,
            serviceVal: 'string'
          },
          {
            goodsCount: 1,
            goodsDetailsId:
              melo.steps[0].ct === 1
                ? melo.steps[1].goodsDetailsId
                : melo.steps[0].goodsDetailsId,
            goodsId:
              melo.steps[0].ct === 1
                ? melo.steps[1].goodsId
                : melo.steps[0].goodsId,
            groupId: timeSock,
            groupType: 2,
            goodsType:
              melo.steps[0].ct === 1
                ? melo.steps[1].goodsType
                : melo.steps[0].goodsType,
            serviceId: 0,
            serviceVal: 'string'
          }
        ]
        console.log(melo)
        this.$nuxt.$loading.start()
        let smoothly = true
        if (melo.steps[0].cartId || melo.steps[1].cartId) {
          await this.$store
            .dispatch('removeCart', [
              melo.steps[0].cartId,
              melo.steps[1].cartId
            ])
            .then(data => {
              smoothly = true
            })
            .catch(err => {
              console.log(err)
              smoothly = false
              this.$nuxt.$loading.finish()
              this.$toast(`${err.message}`)
            })
        }
        if (!smoothly) return
        await this.$store
          .dispatch('addCart', goodInfo)
          .then(data => {
            // facebook 添加购物车统计-start
            fbq('track', 'AddToCart');
            // facebook 添加购物车统计-end
            
            this.$nuxt.$loading.finish()
            this.$toast(this.lang.addCartSuccess)
            setTimeout(() => {
              this.$router.push({
                name: `cart`
              })
            }, 500)
          })
          .catch(err => {
            this.$nuxt.$loading.finish()
            this.$toast(`${err.message}`)
          })
      }
    },
    
    // 立即购买
    async orderNow() {
      if(!this.isLogin && this.$store.state.platform == 21){
        this.$toast(this.lang.firstLogin)
        return
      }
      console.log(`in!!!!!`)
      const melo = JSON.parse(
        this.$helpers.base64Decode(this.$route.query.melo)
      )
      if (melo.steps.length === 1000) {
        console.log(1)
      } else if (melo.steps[0].goodsDetailsId && melo.steps[1].goodsDetailsId) {
        const timeSock = new Date().getTime()
        const time = this.getTimestampUuid
        let goodInfo = [
          {
            goodsCount: 1,
            goodsDetailsId:
              melo.steps[0].ct === 1
                ? melo.steps[0].goodsDetailsId
                : melo.steps[1].goodsDetailsId,
            goodsId:
              melo.steps[0].ct === 1
                ? melo.steps[0].goodsId
                : melo.steps[1].goodsId,
            groupId: timeSock,
            groupType: 2,
            goodsType:
              melo.steps[0].ct === 1
                ? melo.steps[0].goodsType
                : melo.steps[1].goodsType,
            serviceId: 0,
            serviceVal: 'string'
          },
          {
            goodsCount: 1,
            goodsDetailsId:
              melo.steps[0].ct === 1
                ? melo.steps[1].goodsDetailsId
                : melo.steps[0].goodsDetailsId,
            goodsId:
              melo.steps[0].ct === 1
                ? melo.steps[1].goodsId
                : melo.steps[0].goodsId,
            groupId: timeSock,
            groupType: 2,
            goodsType:
              melo.steps[0].ct === 1
                ? melo.steps[1].goodsType
                : melo.steps[0].goodsType,
            serviceId: 0,
            serviceVal: 'string'
          }
        ]

        goodInfo = goodInfo.map(function (item) {
          item.createTime = time
          item.updateTime = time
          return {
            createTime: item.createTime,
            updateTime: item.updateTime,
            goods_num: item.goodsCount,
            goodsDetailsId: item.goodsDetailsId,
            goods_id: item.goodsDetailsId,
            group_id: item.groupId,
            group_type: parseInt(item.groupType),
            serviceId: 0,
            serviceVal: 'string',
            goods_type: item.goodsType
          }
        });
        console.log(melo)
        this.$nuxt.$loading.start()
        let smoothly = true
        if (melo.steps[0].cartId || melo.steps[1].cartId) {
          await this.$store
            .dispatch('removeCart', [
              melo.steps[0].cartId,
              melo.steps[1].cartId
            ])
            .then(data => {
              smoothly = true
            })
            .catch(err => {
              console.log(err)
              smoothly = false
              this.$nuxt.$loading.finish()
              this.$toast(`${err.message}`)
            })
        }
        if (!smoothly) return
        if(this.isLogin){
          this.$axios({
            method: 'post',
            url: `/web/member/cart/add`,
            data: {
                goodsCartList: goodInfo
            }
          })
          .then(data => {
            // console.log("data",data[0].group_id)
            this.$nuxt.$loading.finish()
            const dataId = []
            data.forEach(item => {
              // console.log("data",item)
              if(item.group_type === 2){
                dataId.push(data[0].group_id)
              } else {
                dataId.push(data[0].id)
              }
            })
            // console.log("data2",dataId)
            this.getList(dataId)
            return Promise.resolve('success')
          })
          .catch(err => {
            this.$nuxt.$loading.finish()
              return Promise.reject(err)
          })
        } else {
          const CART = 'cart'
          let goodInfo = [
            {
              goodsCount: 1,
              goodsDetailsId:
                melo.steps[0].ct === 1
                  ? melo.steps[0].goodsDetailsId
                  : melo.steps[1].goodsDetailsId,
              goodsId:
                melo.steps[0].ct === 1
                  ? melo.steps[0].goodsId
                  : melo.steps[1].goodsId,
              groupId: timeSock,
              groupType: 2,
              goodsType:
                melo.steps[0].ct === 1
                  ? melo.steps[0].goodsType
                  : melo.steps[1].goodsType,
              serviceId: 0,
              serviceVal: 'string'
            },
            {
              goodsCount: 1,
              goodsDetailsId:
                melo.steps[0].ct === 1
                  ? melo.steps[1].goodsDetailsId
                  : melo.steps[0].goodsDetailsId,
              goodsId:
                melo.steps[0].ct === 1
                  ? melo.steps[1].goodsId
                  : melo.steps[0].goodsId,
              groupId: timeSock,
              groupType: 2,
              goodsType:
                melo.steps[0].ct === 1
                  ? melo.steps[1].goodsType
                  : melo.steps[0].goodsType,
              serviceId: 0,
              serviceVal: 'string'
            }
          ]
          const addInfo = {
            id: time,
            createTime: time,
            updateTime: time,
            data: goodInfo
          }
          return new Promise(async (resolve, reject) => {
            try {
                let cart = JSON.parse(localStorage.getItem(CART) || '[]')
                cart = cart.concat(addInfo)
                if (cart.length > 30) {
                    return reject(new Error(lang.cartIsFull))
                }
                localStorage.setItem(CART, JSON.stringify(cart))
                console.log("dddd",cart)
                const dataId = []
                dataId.push(addInfo.id)
                this.getLocalCart(dataId)
                return resolve('success')
            } catch (e) {
                return reject(e)
            }
          })
        }
      }
    },
    // 获取登录列表数据
    getList(val) {
      const _this = this
      _this
        .$axios({
          method: 'get',
          url: `/web/member/cart`
        })
        .then(res => {
          const result = []
          let keys = Object.keys(res)
          keys = keys.sort((a, b) => {
            return b - a
          })
          keys.forEach(item => {
            result.push(res[item])
          })
          this.doFormat(result,val)
        })
        .catch(err => {
          console.log('err:', err)
        })
    },
    // 获取本地数据
    getLocalList(list,val) {
      this.$axios({
        method: 'post',
        url: `/web/member/cart/local`,
        data: {
          goodsCartList:list
        }
      })
        .then(res => {
          this.doFormat(res,val)
        })
        .catch(err => {
          console.log('err:', err)
        })
    },
    // 获取本地local列表
    getLocalCart(val) {
      this.$store.dispatch('getLocalCart').then(res => {
        if (res.length > 0) {
          this.noListData = false
          this.cartList = []
          res.map((item, index) => {
            item.data.map((val, ind) => {
              const o = {
                createTime: item.createTime,
                goods_num: val.goodsCount,
                goodsDetailsId: val.goodsDetailsId,
                goods_id: val.goodsDetailsId,
                goods_type:val.goodsType,
                group_id:
                  val.goodsType == 19
                    ? val.goodsId
                    : val.groupType === 2
                    ? item.id
                    : null,
                group_type: val.groupType,
                updateTime: item.id 
              }
              this.cartList.push(o)
            })
          })
          this.cartList.reverse()
          this.getLocalList(this.cartList,val)
        } else {
          this.num = 0
          this.list = []
        }
      })
    },
    // 格式化数据列表,从购物车中筛选出要提交的商品数据提交订单
    doFormat(res,val) {
      this.list = []
      if (res && res.length > 0) {
        this.noListData = false
        res.map((item, index) => {
          const o = {
            isSelect: false,
            goodsImages: item.simpleGoodsEntity.goodsImages,
            goodsName:item.simpleGoodsEntity.goodsName,
            config:
              item.goodsType == 19
                ? item.ring
                : item.simpleGoodsEntity.categoryId === 1
                ? item.simpleGoodsEntity.baseConfig
                : item.simpleGoodsEntity.detailConfig,
            sku:
              item.goodsType == 19
                ? item.ring
                : item.simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode,
            salePrice: item.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice,
            totalPrice:item.goodsType == 19
                ? item.simpleGoodsEntity.salePrice
                : item.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice,
            groupType: item.groupType || 0,
            goodsType: item.simpleGoodsEntity.categoryId,
            createTime:
              item.goodsType == 19
                ? item.createTime
                : item.groupId
                ? item.groupId
                : item.goodsId,
            goodsId: item.goodsId,
            goodsDetailsId: item.goodsDetailsId,
            id: item.id,
            localSn: item.localSn,
            groupId: item.groupId || null,
            simpleGoodsEntity: item.simpleGoodsEntity,
            status:item.goodsType,
            goodsStatus:item.simpleGoodsEntity.goodsStatus,
            coupon:
            item.coupon ? item.coupon : {}
          }
          this.list.push(o)
          // console.log("this.list",this.list)
          const result = []
          this.list.forEach(item => {
            // console.log('val',val)
            if(this.isLogin){
              if(item.groupType === 2){
                if (val.includes(item.createTime)) {
                  result.push(item)
                }
              } else {
                if (val.includes(item.id)) {
                  result.push(item)
                }
              }
            } else{
              if(item.simpleGoodsEntity.categoryId === 19){
                if (val.includes(item.createTime)) {
                  result.push(item)
                } 
              } else {
                if (val.includes(item.localSn)) {
                  result.push(item)
                }
              }
            }
          })
          // console.log('result',result)
          storage && storage.set('myCartList', JSON.stringify(result))
          this.$router.push({
            name: 'cart-sureOrder'
          })
        })
        for (let i = 0; i < this.list.length - 1; i++) {
          if (
            this.list[i].simpleGoodsEntity.categoryId === 1 &&
            this.list[i].createTime === this.list[i + 1].createTime
          ) {
            const tamp = this.list[i]
            this.list[i] = this.list[i + 1]
            this.list[i + 1] = tamp
          }
        }
      } else {
        this.noListData = true
        this.num = 0
      }
    },
  }
}
