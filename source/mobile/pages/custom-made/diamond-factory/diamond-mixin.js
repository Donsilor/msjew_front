export default {
  data() {
    return {
      lang: this.LANGUAGE.detailCommons,
      showPi: 0,
      force: {
        cut: 0,
        carat: 0,
        color: 0,
        clarity: 0
      },
      caratLeft: 0,
      sendGoodsId: null,
      sendDetailsId: null,
      addWay: false,
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
      is360: false,
      has360: false
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
    }
  },
  mounted() {
    // console.log(`12345678============?`)
    // console.log(JSON.stringify(this.$route.query.goodId))
    if (this.$route.query.goodId) {
      this.$axios({
        method: `post`,
        url: `/wap/goods/goodsDetail`,
        params: {
          goodsId: this.$route.query.goodId
        }
      })
        .then(res => {
          console.log(res)
          const mcArr = []
          for (const i in res.materialsConfig) {
            const o = {
              id: res.materialsConfig[i].configAttrId,
              name: res.materialsConfig[i].configAttrIVal,
              image: this.$IMG_URL + res.materialsConfig[i].configAttrImg
            }
            mcArr.push(o)
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
            res.materialsConfig = mcArr
            res.goodsDesc = res.goodsDesc.includes(`<script>`)
              ? ''
              : res.goodsDesc
          }
          this.goodInfo = res
          this.showPi = this.goodInfo.salePrice
          for (let i = 0; i < this.goodInfo.baseConfig.length; i++) {
            if (this.goodInfo.baseConfig[i].configId === 33) {
              this.force.cut = this.goodInfo.baseConfig[i].configAttrId
            } else if (this.goodInfo.baseConfig[i].configId === 31) {
              this.force.carat = parseFloat(
                this.goodInfo.baseConfig[i].configAttrIVal
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
            } else if (this.goodInfo.baseConfig[i].configId === 34) {
              this.force.color = this.goodInfo.baseConfig[i].configAttrId
            } else if (this.goodInfo.baseConfig[i].configId === 35) {
              this.force.clarity = this.goodInfo.baseConfig[i].configAttrId
            }
          }
          this.sendGoodsId = this.goodInfo.simpleGoodsDetailsList[0].goodsId
          this.sendDetailsId = this.goodInfo.simpleGoodsDetailsList[0].id
          if (this.goodInfo.goods3ds) {
            this.is360 = true
            this.has360 = true
          } else {
            this.is360 = false
            this.has360 = false
          }
          let gay = false
          let gayNum = ``
          this.goodInfo.baseConfig.forEach(item => {
            if (item.configId === 191) {
              gayNum = item.configAttrIVal
            } else if (item.configId === 192 && item.configAttrId === 442) {
              gay = true
            }
          })
          this.goodInfo.goodsGiaImage = gay
            ? `https://www.gia.edu/report-check?reportno=${gayNum}`
            : ``
        })
        .catch(err => {
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
        type: type
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
