import Moment from 'moment'
export default {
  props: {
    goodInfo: {
      type: Object,
      required: false,
      default() {
        return {
          specs: [],
          carveStatus: 0,
          categoryId: 8,
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
          sizes: [],
          carats:[],
          totalStock: 0
        }
      }
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.detailCommons,
      conditions: [],
      chooseSize: '',
      chooseSizeId: ``,
      chooseCarats:``,
      chooseCaratsId:``,
      showPi: this.goodInfo.salePrice,
      showP2: 0,
      sendGoodsId: null,
      sendDetailsId: null,
      categoryId: null,

      // 评论相关
      starNum: 5,
      comments: {
        userAccount: ``,
        commentsDesc: ``,
        createTime: ``,
        commentsLevel: ``,
        showStatus: 1
      },
      total_count: 0
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
    }
  },
  created() {
    // console.log("gggg",this.goodInfo)
    this.conditions.push({
      type: 'eject-choose-pro',
      key: 'quality',
      name: this.lang.fineness,
      checked: this.goodInfo.materials[0].id || '',
      options: this.goodInfo.materials
    })
    this.chooseSize = this.goodInfo.sizes[0].content
    if(this.goodInfo.carats !== undefined){
      this.chooseCarats = this.goodInfo.carats[0].content
      this.chooseCaratsId = this.goodInfo.carats[0].sortBy
    }

    if(this.couponType(this.goodInfo.coupon) == 'discount'){
      this.showP2 = this.goodInfo.coupon.discount.price
    }else{
      this.showP2 = this.goodInfo.salePrice
    }
  },
  mounted() {
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
      // return '请选择'
      let result = this.lang.stArrContent
      const checked = this.conditions[0].checked
      const options = this.conditions[0].options

      for (let n = 0, length = options.length; n < length; n++) {
        if (checked === options[n].id) {
          result = options[n].name
          break
        }
      }
      return result
    },
    showChooseEject(info) {
      const refName = `${info.key}-${info.type}`
      this.$refs[refName] &&
        this.$refs[refName].showIt([this.conditions[0].checked])
    },
    clearQuality(data) {
      const conditions = JSON.parse(JSON.stringify(this.conditions))
      conditions[0].checked = data[0].id
      this.conditions = conditions
      this.iAmShowMaker()
      this.iAmShowMaker1()
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
        if (this.chooseSizeId === `` || this.chooseCaratsId === ``) {
          this.showPi = this.goodInfo.salePrice

          if(this.couponType(this.goodInfo.coupon) == 'discount'){
            this.showP2 = this.goodInfo.coupon.discount.price
          }else{
            this.showP2 = this.goodInfo.salePrice
          }
        } else {
          for (const i in bullShit) {
            if (
              parseInt(bullShit[i].carat) == parseInt(this.chooseCaratsId) &&
              parseInt(bullShit[i].size) === parseInt(this.chooseSizeId) &&
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
              parseInt(bullShit[i].size) === parseInt(this.chooseSizeId) &&
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
      }
    },
    showSwiperTap1(){
      this.$refs.caratsSuitability.show()
    },
    getCarats(val){
      this.chooseCarats = val.item.content
      this.chooseCaratsId = val.item.sortType
      this.iAmShowMaker1()
    },
    iAmShowMaker1() {
      const bullShit = this.goodInfo.details
      if (this.goodInfo.carats && this.goodInfo.sizes) {
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
              parseInt(bullShit[i].size) === parseInt(this.chooseSizeId) &&
              parseInt(bullShit[i].material) ===parseInt(this.conditions[0].checked)
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

          if(this.couponType(this.goodInfo.coupon) == 'discount'){
            this.showP2 = this.goodInfo.coupon.discount.price
          }else{
            this.showP2 = this.goodInfo.salePrice
          }
        } else {
          for (const i in bullShit) {
            if (
              parseInt(bullShit[i].size) === parseInt(this.chooseSizeId) &&
              parseInt(bullShit[i].material) ===parseInt(this.conditions[0].checked)
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
      // console.log("this.s",this.sendDetailsId)
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
      this.$emit('addCart', goodInfo)
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
      if (!this.sendDetailsId) {
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
      this.$router.push({
        name: `custom-made-ring-made-diamond-list`,
        query: {
          melo: this.$helpers.base64Encode(JSON.stringify(melo)),
          step: 2
        }
      })
    },
    openSize() {
      this.$refs['size-board'].show()
    },
    // getCarats(){
    //   this.$refs['size-board'].show()
    // }
  }
}
