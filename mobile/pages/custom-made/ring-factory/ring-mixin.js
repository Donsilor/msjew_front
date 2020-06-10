import Moment from 'moment'

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
        carats:[],
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
      // if (this.$store.getters.hadLogin) {
      //   return this.goodInfo.colletion === 1
      // } else {
      //   const goodId =
      //     this.goodInfo && this.goodInfo.goodId ? this.goodInfo.goodId : ''
      //   return this.$store.getters.inWish(goodId)
      // }
    }
  },
  created() {},
  mounted() {
    this.$axios({
      method: `post`,
      url: `/wap/goods/style/detail`,
      params: {
        goodsId: this.$route.query.goodId
      }
    })
      .then(res => {
        console.log(4444,res)
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
        console.log("res",res)
        this.conditions[0].options = this.goodInfo.materials
        if (this.$route.query.isBack) {
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
          this.conditions[0].checked = [
            this.goodInfo.materials[0].id || ''
          ]
          this.chooseSize = this.goodInfo.sizes[0].content
          if(this.goodInfo.carats){
            this.chooseCaratId = this.goodInfo.carats[0].sortBy
            this.chooseCarat = this.goodInfo.carats[0].content
          }
        }
        this.iAmShowMaker()
      })
      .catch(err => {
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
            }
          }
        }
      } else {
        if (this.chooseSizeId === ``) {
          this.showPi = this.goodInfo.salePrice
          this.sendGoodsId = ``
          this.sendDetailsId = ``
          this.categoryId = ``
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
            }
          }
        }
      } else {
        if (this.chooseSizeId === ``) {
          this.showPi = this.goodInfo.salePrice
          this.sendGoodsId = ``
          this.sendDetailsId = ``
          this.categoryId = ``
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
