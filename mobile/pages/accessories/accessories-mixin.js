import Moment from 'moment'
const storage = process.client ? require('good-storage').default : {}
export default {
  props: {
    goodInfo: {
      type: Object,
      required: false,
      default() {
        return {
          specs: [],
          carveStatus: 0,
          categoryId: 1,
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
          materials: [{ id: 0 }],
          metaDesc: '',
          metaTitle: '',
          metaWord: '',
          qrCode: '',
          salePrice: 0,
          details: [],
          sizes: [{ content: '1' }],
          colors:[],
          totalStock: 0
        }
      }
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.detailCommons,
      conditions: [
        {
          type: 'eject-choose',
          key: 'quality',
          name: this.LANGUAGE.detailCommons.fineness,
          checked: [],
          options: []
        }
      ],
      chooseSize: ``,
      chooseSizeId: ``,
      chooseCarats:``,
      chooseCaratsId:``,
      chooseColors:``,
      chooseColorId:``,
      showPi: 0,
      showP2: 0,
      sendGoodsId: null,
      sendDetailsId: null,
      categoryId:null,
      starNum: 5,
      comments: {
        userAccount: ``,
        commentsDesc: ``,
        createTime: ``,
        commentsLevel: ``,
        showStatus: 1
      },
      total_count: 0,
      list:[],
      cartList:[],
      isLogin: !!this.$store.state.token,
      configId:'',
      colorAttrs:[
        {
          config_id:'',
          config_attr_id:''
        }
      ]
    }
  },
  computed: {
    colorDetail(){
      const Spec = this.goodInfo.specs
      let configId = ''
      if(Spec){
        Spec.forEach(item => {
          if (item.configId === '63') {
            configId = item.configId
          }
        })
      }
      return configId
    },
    goodsAttrs:{
      get(){
        this.colorAttrs[0].config_id = this.colorDetail
        this.colorAttrs[0].config_attr_id = this.chooseColorId
        return this.colorAttrs
      },
      set(){
        
      }
    },
    goodsImages() {
      return this.imageStrToArray(this.goodInfo.goodsImages || '')
    },
    inWish() {
      const goodId =
        this.goodInfo && this.goodInfo.goodId ? this.goodInfo.goodId : ''
      return this.$store.getters.inWish(goodId)
    },
    // 获取不会重复的类时间戳
    getTimestampUuid () {
      return new Date().getTime().toString()
    }
  },
  mounted() {
    // console.log("this.chooseCarats",this.goodInfo.carats)
    if(this.goodInfo.materials||this.goodInfo.sizes){
      this.conditions[0].checked = [
        this.goodInfo.materials.length > 0
          ? this.goodInfo.materials[0].id
          : ``
      ]
      this.conditions[0].options = this.goodInfo.materials
      // this.chooseSize = this.goodInfo.sizes
      //   ? this.goodInfo.sizes[0].content
      //   : ``
      // this.chooseSizeId =this.goodInfo.sizes
      //   ? this.goodInfo.sizes[0].sortBy
      //   :``
      this.chooseCarats = this.goodInfo.carats
        ? this.goodInfo.carats[0].content
        : ``
      this.chooseCaratsId =this.goodInfo.carats
        ? this.goodInfo.carats[0].sortBy
        :``
      this.showPi = this.goodInfo.salePrice
      this.iAmShowMaker()
      this.iAmShowMaker1()
    }
    if(this.goodInfo.colors !== undefined && this.goodInfo.colors.length >0){
      this.chooseColors = this.goodInfo.colors[0].content
      this.chooseColorId = this.goodInfo.colors[0].sortBy
      this.colorAttrs[0].config_id = this.colorDetail
      this.colorAttrs[0].config_attr_id = this.chooseColorId
    }
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
      if (this.goodInfo.sizes) {
        if (this.chooseSizeId === ``) {
          this.showPi = this.goodInfo.salePrice

          if(this.couponType(this.goodInfo.coupon) == 'discount'){
            this.showP2 = this.goodInfo.coupon.discount.price
          }else{
            this.showP2 = this.goodInfo.salePrice
          }
        } else {
          for (const i in bullShit) {
            if (
              parseInt(bullShit[i].carat) === parseInt(this.chooseCaratsId) &&
              parseInt(bullShit[i].size) === parseInt(this.chooseSizeId) &&
              parseInt(bullShit[i].material) === parseInt(this.conditions[0].checked)
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
      } else if(this.goodInfo.carats){
        for (const i in bullShit) {
          if (
            parseInt(bullShit[i].carat) === parseInt(this.chooseCaratsId) &&
            parseInt(bullShit[i].material) ===
            parseInt(this.conditions[0].checked)
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
      } else {
        for (const i in bullShit) {
          if (
            parseInt(bullShit[i].material) ===
            parseInt(this.conditions[0].checked)
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
    },
    showSwiperTap1() {
      this.$refs.caratsSuitability.show()
    },
    getCarats(val) {
      this.chooseCarats = val.item.content
      this.chooseCaratsId = val.item.sortType
      this.iAmShowMaker1()
    },
    showSwiperTapColor(){
      this.$refs.colorsSuitability.show()
    },
    iAmShowMaker1() {
      const bullShit = this.goodInfo.details
      if (this.goodInfo.carats) {
        if (this.chooseCaratsId === ``) {
          this.showPi = this.goodInfo.salePrice

          if(this.couponType(this.goodInfo.coupon) == 'discount'){
            this.showP2 = this.goodInfo.coupon.discount.price
          }else{
            this.showP2 = this.goodInfo.salePrice
          }
        } else {
          for (const i in bullShit) {
            if (
              parseInt(bullShit[i].carat) === parseInt(this.chooseCaratsId) &&
              parseInt(bullShit[i].material) ===
                parseInt(this.conditions[0].checked)
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
        for (const i in bullShit) {
          if (
            parseInt(bullShit[i].material) ===
            parseInt(this.conditions[0].checked)
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
    },
    getColors(val){
      this.chooseColors = val.item.content
      this.chooseColorsId = val.item.sortType
      this.colorAttrs[0].config_id = this.colorDetail
      this.colorAttrs[0].config_attr_id = val.item.sortType
      this.goodsAttrs = this.colorAttrs
      // console.log('color',this.colorAttrs)
    },
    addCart() {
      if (!(this.canAddCart && this.inSale)) {
        return
      }
      if (!this.sendDetailsId && this.goodInfo.sizes && this.goodInfo.carats) {
        this.$toast(this.lang.specificationToast)
        return
      }
      let colorArr = this.colorAttrs.filter(item=>item.config_id !== ''&&item.config_attr_id !== '')
      const goodInfo = {
        goodsCount: 1,
        goodsDetailsId: this.sendDetailsId,
        goodsId: this.sendGoodsId,
        groupId: null,
        groupType: null,
        goodsType: this.categoryId,
        serviceId: 0,
        serviceVal: 'string',
        goods_attr: colorArr
      }
      this.$emit('addCart', goodInfo)
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
                goods_attr:val.goods_attr,
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
            goodsAttr:item.goodsAttr,
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
      // if(!this.isLogin && this.$store.state.platform == 21){
      //   this.ifShowPop = true
      //   return
      // }

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

      let colorArr = this.colorAttrs.filter(item=>item.config_id !== ''&&item.config_attr_id !== '')
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
          goods_type: item.goodsType,
          goods_attr: colorArr
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
        let colorArr = this.colorAttrs.filter(item=>item.config_id !== ''&&item.config_attr_id !== '')
        let goodInfo = [
          {
            goodsCount: 1,
            goodsDetailsId: this.sendDetailsId,
            goodsId: this.sendGoodsId,
            groupId: null,
            groupType: null,
            goodsType: this.categoryId,
            serviceId: 0,
            serviceVal: 'string',
            goods_attr: colorArr
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
        groupId: null,
        groupType: null,
        type: 1
      }
      this.$emit('addWish', goodInfo)
    },
    removeWish() {
      if (!this.goodInfo.goodId) {
        this.$toast(this.lang.specificationToast)
        return
      }
      this.$emit('removeWish', this.goodInfo.goodId)
    },
    startCustomMade() {
      if (!(this.canAddCart && this.inSale)) {
        return
      }
      if (!this.sendDetailsId && this.goodInfo.sizes) {
        this.$toast(this.lang.specificationToast)
        return
      }
      const melo = {
        steps: [
          {
            goodsId: this.sendGoodsId,
            goodsDetailsId: this.sendDetailsId,
            goodsType: this.categoryId,
            ct: this.goodInfo.categoryId,
            cartId: ``,
            page: `detail`
          },
          {
            goodsId: null,
            goodsDetailsId: null,
            goodsType: null,
            ct: 1,
            cartId: ``,
            page: `list`
          }
        ]
      }
      if (parseInt(this.goodInfo.categoryId) === 4) {
        this.$router.push({
          name: `custom-made-necklace-made-diamond-list`,
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(melo)),
            step: 2
          }
        })
      } else if (parseInt(this.goodInfo.categoryId) === 8) {
        this.$router.push({
          name: `custom-made-bracelet-made-diamond-list`,
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(melo)),
            step: 2
          }
        })
      }
    },
    openSize() {
      this.$refs['size-board'].show()
    }
  }
}
