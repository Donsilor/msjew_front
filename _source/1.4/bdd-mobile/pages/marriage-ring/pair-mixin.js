import Moment from 'moment'
export default {
  props: {
    goodInfo: {
      type: Object,
      required: false,
      default() {
        return {
          id: '',
          name: '',
          ringImg: '',
          salePrice: '',
          ringStyle: '',
          status: '',
          ringCode: '',
          coinType: '',
          simpleGoodsEntityList: []
        }
      }
    },
    averageScores: {
      type: [Number, String],
      required: false,
      default: '0'
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.detailCommons,
      // 第一个戒指
      firstRingSize: {
        id: '',
        text: ''
      },
      firstRingQuality: {
        checked: [],
        options: []
      },
      // 第二个戒指
      secondRingSize: {
        id: '',
        text: ''
      },
      secondRingQuality: {
        checked: [],
        options: []
      },

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
    defaultGoodInfo() {
      return {
        goodId: '',
        goodsDetailsId: null,
        categoryId: '',
        goodsName: '',
        goodsCode: '',
        goodsImages: '',
        goodsStatus: '',
        totalStock: '',
        salePrice: '',
        coinType: '',
        colletion: '',
        qrCode: '',
        htmlUrl: '',
        goodsMod: '',
        goods3ds: '',
        goodsGiaImage: '',
        goodsDesc: '',
        metaTitle: '',
        metaDesc: '',
        metaWord: '',
        customStatus: '',
        carveStatus: '',
        goodsServices: '',
        goodsServicesJsons: [],
        baseConfig: [],
        materialsConfig: [],
        sizesConfig: [],
        simpleGoodsDetailsList: []
      }
    },
    ringBanners() {
      return this.imageStrToArray(this.goodInfo.ringImg || '')
    },
    ringDetail() {
      let ringDesc =
        this.goodInfo && this.goodInfo.ringDesc ? this.goodInfo.ringDesc : ''
      ringDesc = ringDesc.includes(`<script`) ? '' : ringDesc
      return ringDesc
    },
    inWish() {
      const goodId = this.goodInfo && this.goodInfo.id ? this.goodInfo.id : ''
      return this.$store.getters.inWish(goodId)
    },
    firstRing() {
      const goodInfo =
        this.goodInfo &&
        this.goodInfo.simpleGoodsEntityList &&
        this.goodInfo.simpleGoodsEntityList[0]
          ? this.goodInfo.simpleGoodsEntityList[0]
          : this.defaultGoodInfo

      return this.dealGoodInfo(goodInfo)
    },
    secondRing() {
      const goodInfo =
        this.goodInfo &&
        this.goodInfo.simpleGoodsEntityList &&
        this.goodInfo.simpleGoodsEntityList[1]
          ? this.goodInfo.simpleGoodsEntityList[1]
          : this.defaultGoodInfo

      return this.dealGoodInfo(goodInfo)
    },
    firstRingPrize() {
      let result = 0
      const simpleGoodsDetailsList = this.firstRing.simpleGoodsDetailsList
      for (let n = 0, length = simpleGoodsDetailsList.length; n < length; n++) {
        if (
          this.firstRingQuality.checked.indexOf(
            simpleGoodsDetailsList[n].material
          ) > -1 &&
          simpleGoodsDetailsList[n].size === this.firstRingSize.id
        ) {
          result = simpleGoodsDetailsList[n].retailMallPrice
          break
        }
      }
      if (!result) {
        result = simpleGoodsDetailsList[0]
          ? simpleGoodsDetailsList[0].retailMallPrice
          : 0
      }
      console.log('firstRingPrize=====>', result)
      return result
    },
    secondRingPrize() {
      let result = 0
      const simpleGoodsDetailsList = this.secondRing.simpleGoodsDetailsList
      for (let n = 0, length = simpleGoodsDetailsList.length; n < length; n++) {
        if (
          this.secondRingQuality.checked.indexOf(
            simpleGoodsDetailsList[n].material
          ) > -1 &&
          simpleGoodsDetailsList[n].size === this.secondRingSize.id
        ) {
          result = simpleGoodsDetailsList[n].retailMallPrice
          break
        }
      }
      if (!result) {
        result = simpleGoodsDetailsList[0]
          ? simpleGoodsDetailsList[0].retailMallPrice
          : 0
      }
      console.log('secondRingPrize=====>', result)
      return result
    },
    showPrice() {
      if (!this.$helpers) {
        return this.goodInfo.salePrice || '--'
      }
      return (
        this.$helpers.mathAdd(this.firstRingPrize, this.secondRingPrize) ||
        this.goodInfo.salePrice ||
        '--'
      )
    },
    goodsServicesJsons() {
      const result = []
      const names = []

      this.firstRing &&
        this.firstRing.goodsServicesJsons &&
        this.firstRing.goodsServicesJsons.forEach(item => {
          if (names.indexOf(item.name) === -1) {
            names.push(item.name)
            result.push(item)
          }
        })

      this.secondRing &&
        this.secondRing.goodsServicesJsons &&
        this.secondRing.goodsServicesJsons.forEach(item => {
          if (names.indexOf(item.name) === -1) {
            names.push(item.name)
            result.push(item)
          }
        })
      return result
    },
    firstRingQualityText() {
      const result = []
      const checked = this.firstRingQuality.checked
      const options = this.firstRingQuality.options

      for (let n = 0, length = options.length; n < length; n++) {
        if (checked.indexOf(options[n].id) > -1) {
          result.push(options[n].name)
          break
        }
      }
      return result.length === 0 ? this.lang.stArrContent : result.join(',')
    },
    secondRingQualityText() {
      const result = []
      const checked = this.secondRingQuality.checked
      const options = this.secondRingQuality.options

      for (let n = 0, length = options.length; n < length; n++) {
        if (checked.indexOf(options[n].id) > -1) {
          result.push(options[n].name)
          break
        }
      }
      return result.length === 0 ? this.lang.stArrContent : result.join(',')
    },
    firstRingSizeText() {
      return this.firstRingSize.text || this.lang.stArrContent
    },
    secondRingSizeText() {
      return this.secondRingSize.text || this.lang.stArrContent
    },
    firstRingSimpleDetail() {
      const list = this.firstRing.simpleGoodsDetailsList
      let result = null

      console.log(
        'this.firstRingQuality.checked=====>',
        this.firstRingQuality.checked
      )

      for (let n = 0, length = list.length; n < length; n++) {
        if (
          list[n].hasOwnProperty('material') &&
          list[n].hasOwnProperty('size') &&
          this.firstRingQuality.checked.indexOf(list[n].material) > -1 &&
          this.firstRingSize.id === list[n].size
        ) {
          // 同时具有选项的字段，才表示该配置选项已启用
          result = list[n]
          break
        }
      }
      return result
    },
    secondRingSimpleDetail() {
      const list = this.secondRing.simpleGoodsDetailsList
      let result = null

      for (let n = 0, length = list.length; n < length; n++) {
        if (
          list[n].hasOwnProperty('material') &&
          list[n].hasOwnProperty('size') &&
          this.secondRingQuality.checked.indexOf(list[n].material) > -1 &&
          this.secondRingSize.id === list[n].size
        ) {
          // 同时具有选项的字段，才表示该配置选项已启用
          result = list[n]
          break
        }
      }
      return result
    },
    showAverageScores() {
      return parseInt(this.averageScores || '0')
    }
  },
  created() {
    this.firstRingSize = {
      id: this.firstRing.sizesConfig[0].sortType,
      text: this.firstRing.sizesConfig[0].content
    }
    this.firstRingQuality = {
      checked: this.firstRing.materialsConfig[0].id
        ? [this.firstRing.materialsConfig[0].id]
        : [],
      options: this.firstRing.materialsConfig
    }
    this.secondRingSize = {
      id: this.secondRing.sizesConfig[0].sortType,
      text: this.secondRing.sizesConfig[0].content
    }
    this.secondRingQuality = {
      checked: this.secondRing.materialsConfig[0].id
        ? [this.secondRing.materialsConfig[0].id]
        : [],
      options: this.secondRing.materialsConfig
    }
  },
  mounted() {
    this.$axios
      .get(`/wap/goodsComments/getAvgLevel`, {
        params: {
          groupId: this.$route.query.ringId
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
          groupId: this.$route.query.ringId,
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
    dealGoodInfo(goodInfo) {
      goodInfo = JSON.parse(JSON.stringify(goodInfo))
      if (Object.keys(goodInfo).length === 0) {
        return goodInfo
      }

      const mcArr = []
      for (const i in goodInfo.materialsConfig) {
        const o = {
          id: goodInfo.materialsConfig[i].configAttrId,
          name: goodInfo.materialsConfig[i].configAttrIVal,
          image: this.$IMG_URL + goodInfo.materialsConfig[i].configAttrImg || ''
        }
        mcArr.push(o)
      }
      const stArr = []
      for (const i in goodInfo.sizesConfig) {
        const o = {
          content: goodInfo.sizesConfig[i].configAttrIVal,
          sortType: goodInfo.sizesConfig[i].configAttrId,
          sortBy: goodInfo.sizesConfig[i].configAttrId
        }
        stArr.push(o)
      }
      stArr.unshift({
        content: this.lang.stArrContent,
        sortType: ``,
        sortBy: ``
      })
      goodInfo.sizesConfig = stArr
      goodInfo.materialsConfig = mcArr
      goodInfo.goodsDesc = goodInfo.goodsDesc.includes(`<script>`)
        ? ''
        : goodInfo.goodsDesc

      const baseConfig = goodInfo.baseConfig
      const sexMap = {
        462: {
          type: 0,
          text: this.lang.lady
        },
        461: {
          type: 1,
          text: this.lang.gentlemen
        },
        572: {
          type: 2,
          text: this.lang.general
        }
      }
      for (let n = 0, length = baseConfig.length; n < length; n++) {
        if (baseConfig[n].configId === 196) {
          const sex = sexMap[baseConfig[n].configAttrId]
          goodInfo.userSex = sex.type
          goodInfo.userSexText = sex.text
          break
        }
      }

      return goodInfo
    },
    showFirstRingQualityChoose() {
      this.$refs['first-ring-quality-choose'] &&
        this.$refs['first-ring-quality-choose'].showIt(
          this.firstRingQuality.checked
        )
    },
    showSecondRingQualityChoose() {
      this.$refs['second-ring-quality-choose'] &&
        this.$refs['second-ring-quality-choose'].showIt(
          this.secondRingQuality.checked
        )
    },
    showFirstRingSizeChoose() {
      this.$refs['first-ring-suitability'] &&
        this.$refs['first-ring-suitability'].show()
    },
    showSecondRingSizeChoose() {
      this.$refs['second-ring-suitability'] &&
        this.$refs['second-ring-suitability'].show()
    },
    firstRingClearSize(val) {
      this.firstRingSize = {
        id: val.item.sortType,
        text: val.item.content
      }
    },
    secondRingClearSize(val) {
      this.secondRingSize = {
        id: val.item.sortType,
        text: val.item.content
      }
    },
    firstRingClearQuality(data) {
      const firstRingQuality = JSON.parse(JSON.stringify(this.firstRingQuality))
      firstRingQuality.checked = [data[0].id]
      this.firstRingQuality = firstRingQuality
    },
    secondRingClearQuality(data) {
      const secondRingQuality = JSON.parse(
        JSON.stringify(this.secondRingQuality)
      )
      secondRingQuality.checked = [data[0].id]
      this.secondRingQuality = secondRingQuality
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
      if (!this.firstRingSimpleDetail || !this.secondRingSimpleDetail) {
        this.$toast(this.lang.specificationToast)
        return
      }
      const goodInfo = [
        {
          goodsCount: 1,
          goodsDetailsId: this.firstRingSimpleDetail.id,
          goodsId: this.firstRingSimpleDetail.goodsId,
          groupId: this.goodInfo.id,
          groupType: 1,
          serviceId: 0,
          serviceVal: 'string'
        },
        {
          goodsCount: 1,
          goodsDetailsId: this.secondRingSimpleDetail.id,
          goodsId: this.secondRingSimpleDetail.goodsId,
          groupId: this.goodInfo.id,
          groupType: 1,
          serviceId: 0,
          serviceVal: 'string'
        }
      ]
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
      const goodInfo = {
        goodsId: null,
        groupId: this.goodInfo.id,
        groupType: 1,
        type: 1
      }
      this.$emit('addWish', goodInfo)
    },
    removeWish() {
      if (!this.goodInfo.id) {
        this.$toast(this.lang.specificationToast)
        return
      }
      this.$emit('removeWish', this.goodInfo.id)
    },
    openSize() {
      this.$refs['size-board'].show()
    }
  }
}
