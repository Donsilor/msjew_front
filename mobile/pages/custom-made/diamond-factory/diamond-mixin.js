const storage = process.client ? require('good-storage').default : {}
export default {
  data() {
    return {
      lang: this.LANGUAGE.detailCommons,
      showPi: 0,
      showP2: 0,
      force: {
        cut: 0,
        carat: 0,
        color: 0,
        clarity: 0
      },
      caratLeft: 0,
      sendGoodsId: null,
      sendDetailsId: null,
      categoryId: null,
      addWay: false,
      chooseColor: ``,
      chooseColorId: ``,
      chooseCarat: ``,
      chooseCaratId:``,
      chooseClarity: ``,
      chooseClarityId:``,
      colorLine: 0,
      caratLine: 0,
      clarityLine: 0,
      goodInfo: {
        specs: [],
        carveStatus: 0,
        categoryId: 3,
        coinType: '',
        colletion: 0,
        customStatus: 0,
        goodId: null,
        goods3ds: '',
        goodsCode: '',
        goodsDesc: '',
        goodsDetailsId: null,
        goodsGiaImage: '',
        goodsImages: '',
        goodsMod: null,
        goodsName: '',
        goodsServices: '',
        goodsServicesJson: {},
        goodsStatus: null,
        htmlUrl: '',
        materials: [],
        metaDesc: '',
        metaTitle: '',
        metaWord: '',
        qrCode: '',
        salePrice: 0,
        details: [],
        sizes: [],
        color:[],
        carats:[],
        clarity:[],
        totalStock: 0,
        coupon: {}
      },
      is360: false,
      has360: false,
      list:[],
      cartList:[],
      isLogin: !!this.$store.state.token
    }
  },
  computed: {
    goodsImages() {
      return this.imageStrToArray(this.goodInfo.goodsImages || '')
    },
    inWish() {
      const goodId =
        this.goodInfo && this.goodInfo.goodId ? this.goodInfo.goodId : ''
      return this.$store.getters.inWish(goodId)
      // if (this.$store.getters.hadLogin) {
      //   return this.goodInfo.colletion === 1
      // } else {
      //   const goodId =
      //     this.goodInfo && this.goodInfo.goodId ? this.goodInfo.goodId : ''
      //   return this.$store.getters.inWish(goodId)
      // }
    },
    inCompared() {
      const goodId =
        this.goodInfo && this.goodInfo.goodId ? this.goodInfo.goodId : ''
      return this.$store.getters.inCompared(goodId)
      // if (this.$store.getters.hadLogin) {
      //   return this.goodInfo.diamondCompare === 1
      // } else {
      //   const goodId =
      //     this.goodInfo && this.goodInfo.goodId ? this.goodInfo.goodId : ''
      //   return this.$store.getters.inCompared(goodId)
      // }
    },
    // 获取不会重复的类时间戳
    getTimestampUuid () {
      return new Date().getTime().toString()
    }
  },
  mounted() {
    // console.log(`12345678============?`,this.goodInfo)
    if (this.$route.query.goodId) {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
      })
      
      this.showPop = true

      this.$axios({
        method: `post`,
        url: `/wap/goods/style/detail`,
        params: {
          goodsId: this.$route.query.goodId
        }
      })
        .then(res => {
          this.$nuxt.$loading.finish()
          // const _this = this
          // _this.$nuxt.$loading.finish()
          console.log("res",res)
          const mcArr = []
          for (const i in res.color) {
            const o = {
              content: res.color[i].name,
              sortType: res.color[i].id,
              sortBy: res.color[i].id
            }
            mcArr.push(o)
          }
          
          const stArr = []
          for (const i in res.clarity) {
            const o = {
              content: res.clarity[i].name,
              sortType: res.clarity[i].id,
              sortBy: res.clarity[i].id
            }
            stArr.push(o)
          }

          const carats = []
          for (const i in res.carats) {
            const o = {
              content: res.carats[i].name,
              sortType: res.carats[i].id,
              sortBy: res.carats[i].id
            }
            carats.push(o)
          }

          res.color = mcArr
          res.clarity = stArr
          res.carats = carats
          res.goodsDesc = res.goodsDesc.includes(`<script>`)
            ? ''
            : res.goodsDesc
          // }
          this.goodInfo = res
          // this.goodInfo.coupon = res.coupon
          if(res.coupon){
            for(var i in res.coupon){
              this.goodInfo.coupon[i] = res.coupon[i];
            }
          }

          if (this.$route.query.isBack) {
            const melo = JSON.parse(
              this.$helpers.base64Decode(this.$route.query.melo)
            )
            const thatId =
              melo.steps[0].ct === 1
                ? melo.steps[1].goodsDetailsId
                : melo.steps[0].goodsDetailsId
            for (let i = 0; i < res.details.length; i++) {
              console.log(11111111)
              if (res.details[i].id === thatId) {
                this.showPi = res.details[i].retailMallPrice
  
                for (let j = 0; j < res.color.length; j++) {
                  if (
                    res.color[j].sortBy ===
                    res.details[i].color
                  ) {
                    this.chooseColor = res.color[j].content
                    this.chooseColorId = res.color[j].sortBy
                    this.colorLine = j
                  }
                }
                for (let j = 0; j < res.clarity.length; j++) {
                  if (
                    res.clarity[j].id ===
                    res.details[i].clarity
                  ) {
                    this.chooseClarity = res.clarity[j].content
                    this.chooseClarityId = res.clarity[j].sortBy
                    this.clarityLine = j
                  }
                }
                for (let j = 0; j < res.carats.length; j++) {
                  if (
                    res.carats[j].sortBy ===
                    res.details[i].carat
                  ) {
                    this.chooseCarat = res.carats[j].content
                    this.chooseCaratId = res.carats[j].sortBy
                    this.caratLine = j
                  }
                }
              }
            }
          } else {
            this.showPi = this.goodInfo.salePrice
            if(this.goodInfo.color.length > 0){
              this.chooseColorId = this.goodInfo.color[0].sortBy
              this.chooseColor = this.goodInfo.color[0].content
            }

            if(this.goodInfo.clarity.length > 0){
              this.chooseClarityId = this.goodInfo.clarity[0].sortBy
              this.chooseClarity = this.goodInfo.clarity[0].content
            }

            if(this.goodInfo.carats.length > 0){
              this.chooseCaratId = this.goodInfo.carats[0].sortBy
              this.chooseCarat = this.goodInfo.carats[0].content
            }
          }

          this.iAmShowMaker()

          for (let i = 0; i < this.goodInfo.specs.length; i++) {
            if (this.goodInfo.specs[i].configId === 4) {
              this.force.cut = this.goodInfo.specs[i].configAttrId
            } else if (this.goodInfo.specs[i].configId === 5) {
              this.force.carat = parseFloat(
                this.goodInfo.specs[i].configAttrVal
              )
              if (this.force.carat < 2 && this.force.carat > 1) {
                this.caratLeft = (this.force.carat - 1) * 50 + 50
              } else if (this.force.carat < 1 && this.force.carat > 0.25) {
                this.caratLeft = ((this.force.carat - 0.25) / 0.75) * 50
              } else if (this.force.carat <= 0.25) {
                this.caratLeft = 0
              } else if (this.force.carat >= 2) {
                this.caratLeft = 100
              } else if (this.force.carat === 1) {
                this.caratLeft = 50
              }
            } else if (this.goodInfo.specs[i].configId === 7) {
              this.force.color = this.goodInfo.specs[i].configAttrId
            } else if (this.goodInfo.specs[i].configId === 2) {
              this.force.clarity = this.goodInfo.specs[i].configAttrId
            }
          }
          this.sendGoodsId = this.goodInfo.details[0].goodsId
          this.sendDetailsId = this.goodInfo.details[0].id
          this.categoryId = this.goodInfo.details[0].categoryId

          if (this.goodInfo.goods3ds) {
            this.is360 = false
            this.has360 = false
          } else {
            this.is360 = false
            this.has360 = false
          }
          let gay = false
          let gayNum = ``
          this.goodInfo.specs.forEach(item => {
            if (item.configId === 31) {
              gayNum = item.configAttrVal
            } else if (item.configId === 48 && item.configAttrId === 60) {
              gay = true
            }
          })
          this.goodInfo.goodsGiaImage = gay
            ? `https://www.gia.edu/report-check?reportno=${gayNum}`
            : ``


          let fbqInfo = {
            content_type: 'product', //  固定值：pruduct
            content_ids: res.id,  // 对应网站产品的 id或者Sku
            value:res.salePrice,     //对应产品的价值
            currency: res.coinType //对应货币类型
          };

          fbq('track', 'ViewContent', fbqInfo);
          
        })
        .catch(err => {
          this.$nuxt.$loading.finish()
          console.log(err)
        })
    }
  },
  methods: {
    goTo4C() {
      this.$router.push({
        name: `help-pages-knowledge`
      })
    },
    emitStep(type) {
      // console.log(this.goodInfo, this.canAddCart, this.inSale)
      if (!(this.canAddCart && this.inSale)) {
        return
      }
      // console.log(type)
      this.$emit(`step`, {
        goodsId: this.sendGoodsId,
        detailsId: this.sendDetailsId,
        goodsType: this.categoryId,
        type: type
      })
    },
    showSwiperTapClarity() {
      this.$refs.claritysuitability.show()
    },
    showSwiperTapColor() {
      this.$refs.colorsuitability.show()
    },
    showSwiperTapCarats() {
      this.$refs.caratsSuitability.show()
    },
    getSortByColor(val) {
      this.chooseColor = val.item.content
      this.chooseColorId = val.item.sortType
      this.iAmShowMaker()
    },
    getSortByClarity(val){
      this.chooseClarity = val.item.content
      this.chooseClarityId = val.item.sortType
      this.iAmShowMaker()
    },
    getCarats(val) {
      this.chooseCarat = val.item.content
      this.chooseCaratId = val.item.sortType
      this.iAmShowMaker()
    },
    iAmShowMaker() {
      const bullShit = this.goodInfo.details
      if (this.goodInfo.color.length >0 && this.goodInfo.clarity.length >0 &&  this.goodInfo.carats.length >0) {
        if (this.chooseColorId === `` || this.chooseCaratId === `` || this.chooseClarityId === ``) {
          this.showPi = this.goodInfo.salePrice
          this.sendGoodsId = ``
          this.sendDetailsId = ``
          this.categoryId = ``
          
          if(this.couponType(this.goodInfo.coupon) == 'discount'){
            this.showP2 = this.goodInfo.coupon.discount.price
          }else{
            this.showP2 = this.goodInfo.salePrice
          }
        } else {
          for (const i in bullShit) {
            if (
              parseInt(bullShit[i].color) === parseInt(this.chooseColorId) &&
              parseInt(bullShit[i].carat) === parseInt(this.chooseCaratId) &&
              parseInt(bullShit[i].clarity) === parseInt(this.chooseClarityId)
            ) {
              this.showPi = bullShit[i].retailMallPrice
              this.sendGoodsId = bullShit[i].goodsId
              this.sendDetailsId = bullShit[i].id
              this.categoryId = bullShit[i].categoryId
              
              if(this.couponType(bullShit[i].coupon) == 'discount'){
                this.showP2 = bullShit[i].coupon.discount.price
              }else{
                this.showP2 = bullShit[i].retailMallPrice
              }
            }
          }
        }
      } else {
        if (this.chooseClarityId === ``) {
          this.showPi = this.goodInfo.salePrice
          this.sendGoodsId = ``
          this.sendDetailsId = ``
          this.categoryId = ``
          
          if(this.couponType(this.goodInfo.coupon) == 'discount'){
            this.showP2 = this.goodInfo.coupon.discount.price
          }else{
            this.showP2 = this.goodInfo.salePrice
          }
        } else {
          for (const i in bullShit) {
            if (
              parseInt(bullShit[i].clarity) === parseInt(this.chooseClarityId) &&
              parseInt(bullShit[i].color) === parseInt(this.chooseColorId)
            ) {
              this.showPi = bullShit[i].retailMallPrice
              this.sendGoodsId = bullShit[i].goodsId
              this.sendDetailsId = bullShit[i].id
              this.categoryId = bullShit[i].categoryId
              
              if(this.couponType(bullShit[i].coupon) == 'discount'){
                this.showP2 = bullShit[i].coupon.discount.price
              }else{
                this.showP2 = bullShit[i].retailMallPrice
              }
            }
          }
        }
      }
    },
    addCart() {
      if (!(this.canAddCart && this.inSale)) {
        return
      }
      if (!this.sendDetailsId) {
        this.$toast(this.lang.specificationToast)
        return
      }
      const goodInfo = {
        goodsCount: 1,
        goodsDetailsId: this.sendDetailsId,
        goodsId: this.sendGoodsId,
        groupId: null,
        groupType: null,
        goodsType: this.categoryId,
        serviceId: 0,
        serviceVal: 'string'
      }
      this.$nuxt.$loading.start()
      this.$store
        .dispatch('addCart', goodInfo)
        .then(data => {
          // facebook 添加购物车统计-start
          fbq('track', 'AddToCart');
          // facebook 添加购物车统计-end

          this.$nuxt.$loading.finish()
          this.$toast(this.lang.addCartSuccess)
        })
        .catch(err => {
          this.$nuxt.$loading.finish()
          this.$toast(`${err.message}`)
        })
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
                : item.simpleGoodsEntity.categoryId === 20
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
            // console.log('val',item)
            if(this.isLogin){
              if (val.includes(item.id)) {
                result.push(item)
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
            this.list[i].simpleGoodsEntity.categoryId === 20 &&
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
    //立即购买
    orderNow(){
      if(!this.isLogin && this.$store.state.platform == 21){
        this.ifShowPop = true
        return
      }
      
      if (!(this.canAddCart && this.inSale)) {
        return
      }
      if (!this.sendDetailsId) {
        this.$toast(this.lang.specificationToast)
        return
      }
      
      const time = this.getTimestampUuid
      let goodInfo = [{
        goodsCount: 1,
        goodsDetailsId: this.sendDetailsId,
        goodsId: this.sendGoodsId,
        groupId: null,
        groupType: null,
        goodsType: this.categoryId,
        serviceId: 0,
        serviceVal: 'string'
      }]

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

      if(this.isLogin){
        this.$axios({
          method: 'post',
          url: `/web/member/cart/add`,
          data: {
              goodsCartList: goodInfo
          }
        })
        .then(data => {
          // console.log("diamond",1111111111)
          // console.log("id",data[0])
          const dataId = []
          dataId.push(data[0].id)
          this.getList(dataId)
          return Promise.resolve('success')
        })
        .catch(err => {
            return Promise.reject(err)
        })
      } else {
        const CART = 'cart'
        let goodInfo = [
          {
            goodsCount: 1,
            goodsDetailsId: this.sendDetailsId,
            goodsId: this.sendGoodsId,
            groupId: null,
            groupType: null,
            goodsType: this.categoryId,
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
              // console.log("dddd",cart)
              const dataId = []
              dataId.push(addInfo.id)
              this.getLocalCart(dataId)
              return resolve('success')
          } catch (e) {
              return reject(e)
          }
      })
      }
    },
    setCompared() {
      if (this.inCompared) {
        this.removeCompared()
      } else {
        this.addCompared()
      }
    },
    addCompared() {
      if (!this.goodInfo.goodId) {
        this.$toast(this.lang.specificationToast)
        return
      }
      // const goodInfo = {
      //   goodsId: this.goodInfo.goodId,
      //   groupId: null,
      //   type: 1
      // }
      const goodInfo = {
        goodsId: this.goodInfo.goodId,
        groupId: null,
        groupType: null,
        type: 1
      }
      this.$nuxt.$loading.start()
      this.$store
        .dispatch('addCompared', goodInfo)
        .then(data => {
          this.$nuxt.$loading.finish()
          this.$toast(this.lang.addComparedSuccess)
        })
        .catch(err => {
          this.$nuxt.$loading.finish()
          this.$toast(`${err.message}`)
          // this.$toast(`${this.lang.addCompareFail}：${err.message}`)
        })
    },
    removeCompared() {
      if (!this.goodInfo.goodId) {
        this.$toast(this.lang.specificationToast)
        return
      }
      this.$nuxt.$loading.start()
      this.$store
        .dispatch('removeCompared', this.goodInfo.goodId)
        .then(data => {
          this.$nuxt.$loading.finish()
          this.$toast(this.lang.removeComparedSuccess)
        })
        .catch(err => {
          this.$nuxt.$loading.finish()
          this.$toast(`${err.message}`)
        })
    },
    addWish() {
      if (!this.goodInfo.goodId) {
        this.$toast(this.lang.specificationToast)
        return
      }
      // const goodInfo = {
      //   goodsId: this.goodInfo.goodId,
      //   groupId: null,
      //   type: 1
      // }
      const goodInfo = {
        goodsId: this.goodInfo.goodId,
        groupId: null,
        groupType: null,
        type: 1
      }
      this.$nuxt.$loading.start()
      this.$store
        .dispatch('addWish', goodInfo)
        .then(data => {
          this.$nuxt.$loading.finish()
          this.$toast(this.lang.addWishSuccess)
        })
        .catch(err => {
          this.$nuxt.$loading.finish()
          this.$toast(`${err.message}`)
        })
    },
    setWish() {
      if (this.inWish) {
        this.removeWish()
      } else {
        this.addWish()
      }
    },
    removeWish() {
      if (!this.goodInfo.goodId) {
        this.$toast(this.lang.specificationToast)
        return
      }
      this.$nuxt.$loading.start()
      this.$store
        .dispatch('removeWish', this.goodInfo.goodId)
        .then(data => {
          this.$nuxt.$loading.finish()
          this.$toast(this.lang.removeWishSuccess)
        })
        .catch(err => {
          this.$nuxt.$loading.finish()
          this.$toast(`${err.message}`)
        })
    }
  }
}
