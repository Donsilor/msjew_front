import Moment from 'moment'
export default {
  props: {
    goodInfo: {
      type: Object,
      required: false,
      default() {
        return {
          baseConfig: [],
          carveStatus: 0,
          categoryId: 2,
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
          materialsConfig: [{ id: 0 }],
          metaDesc: '',
          metaTitle: '',
          metaWord: '',
          qrCode: '',
          salePrice: 0,
          simpleGoodsDetailsList: [],
          sizesConfig: [],
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
      showPi: this.goodInfo.salePrice,
      sendGoodsId: null,
      sendDetailsId: null,

      // 评论相关
      starNum: 5,
      comments: {
        userAccount: ``,
        commentsDesc: ``,
        createTime: ``,
        commentsLevel: ``,
        showStatus: 1
      },
      totalCount: 0
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
    this.conditions.push({
      type: 'eject-choose-pro',
      key: 'quality',
      name: this.lang.fineness,
      checked: this.goodInfo.materialsConfig[0].id || '',
      options: this.goodInfo.materialsConfig
    })
    this.chooseSize = this.goodInfo.sizesConfig[0].content
  },
  mounted() {
    this.$axios
      .get(`/wap/goodsComments/getAvgLevel`, {
        params: {
          goodsId: this.$route.query.goodId
        }
      })
      .then(res => {
        this.starNum = res.avgLevel ? res.avgLevel : 5
      })
      .catch(err => {
        console.log(err)
      })
    this.$axios
      .get(`/wap/goodsComments/getGoodsComments`, {
        params: {
          goodsId: this.$route.query.goodId,
          currPage: 1,
          pageSize: 99999,
          shouType: 1
        }
      })
      .then(res => {
        if (!res.totalCount || !res.list || !(res.list.length > 0)) {
          return
        }
        this.totalCount = res.totalCount || 0
        res.list[0].createTime = Moment(res.list[0].createTime).format(
          'YYYY.MM.DD'
        )
        this.comments = res.list[0]
      })
      .catch(err => {
        console.log(err)
      })
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
      const bullShit = this.goodInfo.simpleGoodsDetailsList
      if (this.chooseSizeId === ``) {
        this.showPi = this.goodInfo.salePrice
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
            ct: this.goodInfo.categoryId,
            cartId: ``,
            page: `detail`
          },
          {
            goodsId: null,
            goodsDetailsId: null,
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
