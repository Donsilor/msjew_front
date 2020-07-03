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
      categoryId: null,
      addWay: false,
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
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
      })
      
      this.showPop = true

      this.$axios({
        method: `post`,
        url: `/wap/goods/diamond/detail`,
        params: {
          goodsId: this.$route.query.goodId
        }
      })
        .then(res => {
          this.$nuxt.$loading.finish()
          // const _this = this
          // _this.$nuxt.$loading.finish()
          // console.log(res)
          const mcArr = []
          for (const i in res.materials) {
            const o = {
              id: res.materials[i].id,
              name: res.materials[i].name,
              // image: this.$IMG_URL + res.materials[i].configAttrImg
              image: res.materials[i].image
            }
            mcArr.push(o)
            const stArr = []
            for (const i in res.sizes) {
              const o = {
                content: res.sizes[i].name,
                sortType: res.sizes[i].id,
                sortBy: res.sizes[i].id
              }
              stArr.push(o)
            }
            stArr.unshift({
              content: this.lang.stArrContent,
              sortType: ``,
              sortBy: ``
            })
            res.sizes = stArr
            res.materials = mcArr
            res.goodsDesc = res.goodsDesc.includes(`<script>`)
              ? ''
              : res.goodsDesc
          }
          this.goodInfo = res
          this.showPi = this.goodInfo.salePrice
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
            this.is360 = true
            this.has360 = true
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
