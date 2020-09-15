export default {
  props: {
    goodInfo: {
      type: Object,
      required: false,
      default() {
        return {
          specs: [],
          carveStatus: 0,
          categoryId: 7,
          diamondCompare: 0,
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
        }
      }
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.detailCommons,
      showPi: this.goodInfo.salePrice,
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
    console.log(this.goodInfo)
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
    // console.log(this.force)
    // console.log(this.force.carat, this.caratLeft)
    this.iAmShowMaker()
    if (this.goodInfo.goods3ds) {
      this.is360 = false
      this.has360 = false
    } else {
      this.is360 = false
      this.has360 = false
    }
  },
  methods: {
    iAmShowMaker() {
      const bullShit = this.goodInfo.details
      this.showPi = bullShit[0].retailMallPrice
      this.sendGoodsId = bullShit[0].goodsId
      this.sendDetailsId = bullShit[0].id
      this.categoryId = bullShit[0].categoryId
    },
    goTo4C() {
      this.$router.push({
        name: `help-pages-knowledge`
      })
    },
    goCustomMade(type) {
      if (!(this.canAddCart && this.inSale)) {
        return
      }
      const obj = {
        steps: [
          {
            goodsId: this.sendGoodsId,
            goodsDetailsId: this.sendDetailsId,
            goodsType: this.categoryId,
            ct: 1,
            cartId: ``,
            page: `detail`
          },
          {
            goodsId: null,
            goodsDetailsId: null,
            goodsType: null,
            ct: null,
            cartId: ``,
            page: `list`
          }
        ],
        step: 1
      }
      if (type === `ring`) {
        obj.steps[1].ct = 2
        this.$router.push({
          name: `custom-made-diamond-made-ring-list`,
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(obj)),
            step: 2
          }
        })
      } else if (type === `necklace`) {
        obj.steps[1].ct = 4
        this.$router.push({
          name: `custom-made-diamond-made-necklace-list`,
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(obj)),
            step: 2
          }
        })
      } else if (type === `bracelet`) {
        obj.steps[1].ct = 8
        this.$router.push({
          name: `custom-made-diamond-made-bracelet-list`,
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(obj)),
            step: 2
          }
        })
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
      this.$emit('addCompared', goodInfo)
    },
    removeCompared() {
      if (!this.goodInfo.goodId) {
        this.$toast(this.lang.specificationToast)
        return
      }
      this.$emit('removeCompared', this.goodInfo.goodId)
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
    }
  }
}
