import Moment from 'moment'

export default {
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
      sizeLine: 0,
      showPi: 0,
      sendGoodsId: null,
      sendDetailsId: null,
      goodInfo: {
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
        materialsConfig: [],
        metaDesc: '',
        metaTitle: '',
        metaWord: '',
        qrCode: '',
        salePrice: 0,
        simpleGoodsDetailsList: [],
        sizesConfig: [],
        totalStock: 0
      },
      starNum: 5,
      comments: {
        userAccount: `*******`,
        commentsDesc: `wonderful`,
        createTime: `*******`,
        commentsLevel: `5`,
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
      // if (this.$store.getters.hadLogin) {
      //   return this.goodInfo.colletion === 1
      // } else {
      //   const goodId =
      //     this.goodInfo && this.goodInfo.goodId ? this.goodInfo.goodId : ''
      //   return this.$store.getters.inWish(goodId)
      // }
    }
  },
  mounted() {
    if (this.$route.query.goodId) {
      this.$axios({
        method: `post`,
        url: `/wap/goods/goodsDetail`,
        params: {
          goodsId: this.$route.query.goodId
        }
      })
        .then(res => {
          const mcArr = []
          for (const i in res.materialsConfig) {
            const o = {
              id: res.materialsConfig[i].configAttrId,
              name: res.materialsConfig[i].configAttrIVal,
              image: this.$IMG_URL + res.materialsConfig[i].configAttrImg
            }
            mcArr.push(o)
          }
          res.materialsConfig = mcArr
          if (res.sizesConfig) {
            const stArr = []
            for (const i in res.sizesConfig) {
              const o = {
                content: res.sizesConfig[i].configAttrIVal,
                sortType: res.sizesConfig[i].configAttrId,
                sortBy: res.sizesConfig[i].configAttrId
              }
              stArr.push(o)
            }
            stArr.unshift({
              content: this.lang.stArrContent,
              sortType: ``,
              sortBy: ``
            })
            res.sizesConfig = stArr
          }
          res.goodsDesc = res.goodsDesc.includes(`<script>`)
            ? ''
            : res.goodsDesc
          this.goodInfo = res
          this.conditions[0].options = this.goodInfo.materialsConfig
          if (this.$route.query.isBack) {
            const melo = JSON.parse(
              this.$helpers.base64Decode(this.$route.query.melo)
            )
            const thatId =
              melo.steps[0].ct === 1
                ? melo.steps[1].goodsDetailsId
                : melo.steps[0].goodsDetailsId
            for (let i = 0; i < res.simpleGoodsDetailsList.length; i++) {
              if (res.simpleGoodsDetailsList[i].id === thatId) {
                this.showPi = res.simpleGoodsDetailsList[i].retailMallPrice
                if (res.sizesConfig) {
                  for (let j = 0; j < res.sizesConfig.length; j++) {
                    if (
                      res.sizesConfig[j].sortBy ===
                      res.simpleGoodsDetailsList[i].size
                    ) {
                      this.chooseSize = res.sizesConfig[j].content
                      this.chooseSizeId = res.sizesConfig[j].sortBy
                      this.sizeLine = j
                    }
                  }
                }
                for (let j = 0; j < res.materialsConfig.length; j++) {
                  if (
                    res.materialsConfig[j].id ===
                    res.simpleGoodsDetailsList[i].material
                  ) {
                    this.conditions[0].checked = [res.materialsConfig[j].id]
                  }
                }
              }
            }
          } else {
            this.showPi = this.goodInfo.salePrice
            this.conditions[0].checked = [
              this.goodInfo.materialsConfig[0].id || ''
            ]
            if (res.sizesConfig) {
              this.chooseSize = this.goodInfo.sizesConfig[0].content
            }
          }
          this.iAmShowMaker()
        })
        .catch(err => {
          console.log(err)
        })
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
    }
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
      console.log(info)
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
      const bullShit = this.goodInfo.simpleGoodsDetailsList
      if (this.goodInfo.sizesConfig) {
        if (this.chooseSizeId === ``) {
          this.showPi = this.goodInfo.salePrice
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
          }
        }
      }
    },
    emitStep(type) {
      if (!(this.canAddCart && this.inSale)) {
        return
      }
      if (!this.sendGoodsId || !this.sendDetailsId) {
        if (this.goodInfo.sizesConfig) {
          this.$toast(this.lang.chooseRingSizeToast)
          return
        }
      }
      this.$emit(`step`, {
        goodsId: this.sendGoodsId,
        detailsId: this.sendDetailsId,
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
        serviceId: 0,
        serviceVal: 'string'
      }
      this.$nuxt.$loading.start()
      this.$store
        .dispatch('addCart', goodInfo)
        .then(data => {
          this.$nuxt.$loading.finish()
          this.$toast(this.lang.addCartSuccess)
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
