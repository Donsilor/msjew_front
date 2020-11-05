import Moment from 'moment'
const storage = process.client ? require('good-storage').default : {}
export default {
  data() {
    return {
      lang: this.LANGUAGE.detailCommons,
      conditions: [
        {
          type: 'eject-choose-pro',
          key: 'quality',
          name: this.LANGUAGE.detailCommons.fineness,
          checked: [],
          options: []
        }
      ],
      chooseSize: ``,
      chooseSizeId: ``,
      chooseCarat: ``,
      chooseCaratId:``,
      sizeLine: 0,
      caratLine: 0,
      showPi: 0,
      showP2: 0,
      sendGoodsId: null,
      sendDetailsId: null,
      categoryId: null,
      goodInfo: {
        specs: [],
        carveStatus: 0,
        categoryId: 5,
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
        totalStock: 0,
        coupon: {},
        carats:[],
      },
      starNum: 5,
      comments: {
        userAccount: `*******`,
        commentsDesc: `wonderful`,
        createTime: `*******`,
        commentsLevel: `5`,
        showStatus: 1
      },
      total_count: 0,
      list:[],
      cartList:[],
      isLogin: !!this.$store.state.token,
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
    // 获取不会重复的类时间戳
    getTimestampUuid () {
      return new Date().getTime().toString()
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })

    this.$axios({
      method: `post`,
      url: `/wap/goods/style/detail`,
      params: {
        goodsId: this.$route.query.goodId
      }
    })
      .then(res => {
        this.$nuxt.$loading.finish()
        // console.log(4444,res)
        const mcArr = []
        for (const i in res.materials) {
          const o = {
            id: res.materials[i].id,
            name: res.materials[i].name,
            // image: this.$IMG_URL + res.materials[i].configAttrImg
            image: res.materials[i].image

          }
          mcArr.push(o)
        }
        const stArr = []
        for (const i in res.sizes) {
          const o = {
            content: res.sizes[i].name,
            sortType: res.sizes[i].id,
            sortBy: res.sizes[i].id
          }
          stArr.push(o)
        }
        // stArr.unshift({
        //   content: this.lang.stArrContent,
        //   sortType: ``,
        //   sortBy: ``
        // })
        if(res.carats){
          const carats = []
          for (const i in res.carats) {
            const o = {
              content: res.carats[i].name,
              sortType: res.carats[i].id,
              sortBy: res.carats[i].id
            }
            carats.push(o)
          }
          res.carats = carats
        }

        res.sizes = stArr
        res.materials = mcArr
        // res.goodsDesc = res.goodsDesc.includes(`<script>`) ? '' : res.goodsDesc
        this.goodInfo = res
        // console.log("res",res)

        if(res.coupon){
          for(var i in res.coupon){
            this.goodInfo.coupon[i] = res.coupon[i];
          }
        }

        this.conditions[0].options = this.goodInfo.materials
        if (this.$route.query.isBack) {
          console.log(11111111)
          const melo = JSON.parse(
            this.$helpers.base64Decode(this.$route.query.melo)
          )
          const thatId =
            melo.steps[0].ct === 1
              ? melo.steps[1].goodsDetailsId
              : melo.steps[0].goodsDetailsId
          for (let i = 0; i < res.details.length; i++) {
            if (res.details[i].id === thatId) {
              this.showPi = res.details[i].retailMallPrice

              for (let j = 0; j < res.sizes.length; j++) {
                if (
                  res.sizes[j].sortBy ===
                  res.details[i].size
                ) {
                  this.chooseSize = res.sizes[j].content
                  this.chooseSizeId = res.sizes[j].sortBy
                  this.sizeLine = j
                }
              }
              for (let j = 0; j < res.materials.length; j++) {
                if (
                  res.materials[j].id ===
                  res.details[i].material
                ) {
                  this.conditions[0].checked = [res.materials[j].id]
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
          if(this.goodInfo.materials){
            this.conditions[0].checked = [
              this.goodInfo.materials[0].id || ''
            ]
          }
          this.chooseSize = ''
          // this.chooseSize = this.goodInfo.sizes[0].content
          if(this.goodInfo.carats){
            this.chooseCaratId = this.goodInfo.carats[0].sortBy
            this.chooseCarat = this.goodInfo.carats[0].content
          }
        }
        this.iAmShowMaker()

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
    // this.$axios
    //   .get(`/wap/goodsComments/getAvgLevel`, {
    //     params: {
    //       goodsId: this.$route.query.goodId
    //     }
    //   })
    //   .then(res => {
    //     this.starNum = res.avgLevel ? res.avgLevel : 5
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // this.$axios
    //   .get(`/wap/goodsComments/getGoodsComments`, {
    //     params: {
    //       goodsId: this.$route.query.goodId,
    //       page: 1,
    //       page_size: 99999,
    //       shouType: 1
    //     }
    //   })
    //   .then(res => {
    //     if (!res.total_count || !res.list || !(res.list.length > 0)) {
    //       return
    //     }
    //     this.total_count = res.total_count || 0
    //     res.list[0].createTime = Moment(res.list[0].createTime).format(
    //       'YYYY.MM.DD'
    //     )
    //     this.comments = res.list[0]
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  },
  methods: {
    conditionText() {
      const result = []
      const checked = this.conditions[0].checked
      const options = this.conditions[0].options

      for (let n = 0, length = options.length; n < length; n++) {
        if (checked.indexOf(options[n].id) > -1) {
          result.push(options[n].name)
        }
      }
      return result.join(', ')
    },
    showChooseEject(info) {
      // console.log(info)
      const refName = `${info.key}-${info.type}`
      this.$refs[refName] &&
        this.$refs[refName].showIt(this.conditions[0].checked)
    },
    clearQuality(data) {
      const conditions = JSON.parse(JSON.stringify(this.conditions))
      conditions[0].checked = [data[0].id]
      this.conditions = conditions
      this.iAmShowMaker()
    },
    showSwiperTap() {
      this.$refs.suitability.show()
    },
    getSortBy(val) {
      this.chooseSize = val.item.content
      this.chooseSizeId = val.item.sortType
      this.iAmShowMaker()
    },
    iAmShowMaker() {
      const bullShit = this.goodInfo.details
      if (this.goodInfo.carats && this.goodInfo.sizes) {
        if (this.chooseSizeId === `` || this.chooseCaratId === ``) {
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
              parseInt(bullShit[i].carat) === parseInt(this.chooseCaratId) &&
              parseInt(bullShit[i].size) === parseInt(this.chooseSizeId) &&
              parseInt(bullShit[i].material) ===
                parseInt(this.conditions[0].checked[0])
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
        if (this.chooseSizeId === ``) {
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
              parseInt(bullShit[i].size) === parseInt(this.chooseSizeId) &&
              parseInt(bullShit[i].material) ===
                parseInt(this.conditions[0].checked[0])
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
    showSwiperTap1() {
      this.$refs.caratsSuitability.show()
    },
    getCarats(val) {
      this.chooseCarat = val.item.content
      this.chooseCaratId = val.item.sortType
      this.iAmShowMaker1()
    },
    iAmShowMaker1() {
      const bullShit = this.goodInfo.details
      if (this.goodInfo.carats && this.goodInfo.sizes) {
        if (this.chooseSizeId === `` || this.chooseCaratId === ``) {
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
              parseInt(bullShit[i].carat) === parseInt(this.chooseCaratId) &&
              parseInt(bullShit[i].size) === parseInt(this.chooseSizeId) &&
              parseInt(bullShit[i].material) ===
                parseInt(this.conditions[0].checked[0])
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
        if (this.chooseSizeId === ``) {
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
              parseInt(bullShit[i].size) === parseInt(this.chooseSizeId) &&
              parseInt(bullShit[i].material) ===
                parseInt(this.conditions[0].checked[0])
            ) {
              this.showPi = bullShit[i].retailMallPrice
              this.sendGoodsId = bullShit[i].goodsId
              this.sendDetailsId = bullShit[i].id
              this.categoryId = bullShit[i].categoryId
            }
          }
        }
      }
    },
    emitStep(type) {
      if (!(this.canAddCart && this.inSale)) {
        return
      }
      // console.log(this.sendGoodsId, this.sendDetailsId)
      if (!this.sendGoodsId || !this.sendDetailsId) {
        this.$toast(this.lang.chooseRingSizeToast)
        return
      }
      this.$emit(`step`, {
        goodsId: this.sendGoodsId,
        detailsId: this.sendDetailsId,
        goodsType: this.categoryId,
        type: type,
        goodInfo: this.goodInfo
      })
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
        goodsType: parseInt(this.categoryId),
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
    // 立即购买
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
      let goodInfo =[{
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
    setWish() {
      if (this.inWish) {
        this.removeWish()
      } else {
        this.addWish()
      }
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
        goodsType: this.categoryId,
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
    },
    openSize() {
      this.$refs['size-board'].show()
    }
  }
}
