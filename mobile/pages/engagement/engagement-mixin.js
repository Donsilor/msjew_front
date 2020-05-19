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
          categoryId: 6,
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
          carats:[],
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
          type: 'eject-choose-pro',
          key: 'quality',
          name: this.LANGUAGE.detailCommons.fineness,
          checked: [this.goodInfo.materials[0].id || ''],
          options: this.goodInfo.materials
        }
      ],
      chooseSize: this.goodInfo.sizes[0].content,
      chooseSizeId: ``,
      chooseCarat: this.goodInfo.carats[0].content,
      chooseCaratId:this.goodInfo.carats[0].sortBy,
      showPi: this.goodInfo.salePrice,
      sendGoodsId: null,
      sendDetailsId: null,
      categoryId: null,
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
      if (this.chooseSizeId === ``) {
        this.showPi = this.goodInfo.salePrice
      } else {
        for (const i in bullShit) {
          if (
            parseInt(bullShit[i].carat) === parseInt(this.chooseCaratId) &&
            parseInt(bullShit[i].size) === parseInt(this.chooseSizeId) &&
            parseInt(bullShit[i].material) ===
              parseInt(this.conditions[0].checked)
          ) {
            this.showPi = bullShit[i].retailMallPrice
            this.sendGoodsId = bullShit[i].goodsId
            this.sendDetailsId = bullShit[i].id
            this.categoryId = bullShit[i].categoryId
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
      if (this.chooseCaratId === ``) {
        this.showPi = this.goodInfo.salePrice
        this.sendGoodsId = ``
        this.sendDetailsId = ``
        this.categoryId = ``
      } else {
        for (const i in bullShit) {
          if (
            parseInt(bullShit[i].carat) === parseInt(this.chooseCaratId) &&
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
    }
  }
}
