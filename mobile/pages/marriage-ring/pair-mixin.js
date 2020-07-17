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
      firstRingCarat: {
        id: '',
        text: ''
      },
      firstRingSize: {
        id: '',
        text: ''
      },
      firstRingQuality: {
        checked: [],
        options: []
      },
      // 第二个戒指
      secondRingCarat: {
        id: '',
        text: ''
      },
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
      total_count: 0,
      showPi: 0,
      showP2: 0
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
        specs: [],
        materials: [],
        sizes: [],
        carats: [],
        details: [],
        firstRingId:'',
        secondRingId:'',
        coupleLadyId:'',
        coupleMenId:'',
        goodsId:'',
        styleId:'',
        stock:'',
      }
    },
    ringBanners() {
      return this.imageStrToArray(this.goodInfo.goodsImages || '')
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
        this.goodInfo.ring &&
        this.goodInfo.ring[0]
          ? this.goodInfo.ring[0]
          : this.defaultGoodInfo

      return this.dealGoodInfo(goodInfo)
    },
    secondRing() {
      const goodInfo =
        this.goodInfo &&
        this.goodInfo.ring &&
        this.goodInfo.ring[1]
          ? this.goodInfo.ring[1]
          : this.defaultGoodInfo

      return this.dealGoodInfo(goodInfo)
    },
    firstRingPrize() {
      let result = 0
      const details = this.firstRing.details
      for (let n = 0, length = details.length; n < length; n++) {
        if (
          this.firstRingQuality.checked.indexOf(
            details[n].material
          ) > -1 &&
          details[n].size === this.firstRingSize.id &&
          details[n].carat === this.firstRingCarat.id
        ) {
          result = details[n].retailMallPrice
          break
        }
      }
      if (!result) {
        result = details[0]
          ? details[0].retailMallPrice
          : 0
      }
      // console.log('firstRingPrize=====>', result)
      return result
    },
    secondRingPrize() {
      let result = 0
      const details = this.secondRing.details
      for (let n = 0, length = details.length; n < length; n++) {
        if (
          this.secondRingQuality.checked.indexOf(
            details[n].material
          ) > -1 &&
          details[n].size === this.secondRingSize.id &&
          details[n].carat === this.firstRingCarat.id
        ) {
          result = details[n].retailMallPrice
          break
        }
      }
      if (!result) {
        result = details[0]
          ? details[0].retailMallPrice
          : 0
      }
      // console.log('secondRingPrize=====>', result)
      return result
    },
    showPrice() {
      if (!this.$helpers) {
        return this.goodInfo.salePrice || '--'
      }
      return (
        // this.$helpers.mathAdd(this.firstRingPrize, this.secondRingPrize) ||
        this.goodInfo.salePrice ||
        '--'
      )
    },
    showPrice2() {
      console.log("this.goodInfo",this.goodInfo)
      if (!this.$helpers) {
        return this.goodInfo.coupon.discount.price || '--'
      }
      return (
        // this.$helpers.mathAdd(this.firstRingPrize, this.secondRingPrize) ||
        this.goodInfo.coupon.discount.price ||
        '--'
      )
    },
    goodsServicesJsons() {
      const result = []
      // const names = []
      // console.log("goodsServicesJsons1", this.firstRing,this.secondRing)
      this.goodInfo && this.goodInfo.goodsServicesJsons.forEach(item => {
        result.push(item)
        // if (names.indexOf(item.name) === -1) {
        //   names.push(item.name)
        //   result.push(item)
        // }
      })
      // this.firstRing &&
      //   this.firstRing.goodsServicesJsons &&
      //   this.firstRing.goodsServicesJsons.forEach(item => {
      //     if (names.indexOf(item.name) === -1) {
      //       names.push(item.name)
      //       result.push(item)
      //     }
      //   })

      // this.secondRing &&
      //   this.secondRing.goodsServicesJsons &&
      //   this.secondRing.goodsServicesJsons.forEach(item => {
      //     // console.log("goodsServicesJsons2",item)
      //     if (names.indexOf(item.name) === -1) {
      //       names.push(item.name)
      //       result.push(item)
      //     }
      //   })
        
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
    firstRingCaratText() {
      return this.firstRingCarat.text
    },
    secondRingCaratText() {
      return this.secondRingCarat.text
    },
    firstRingSizeText() {
      return this.firstRingSize.text || this.lang.stArrContent
    },
    secondRingSizeText() {
      return this.secondRingSize.text || this.lang.stArrContent
    },
    // firstRingSimpleDetail() {
    //   const list = this.firstRing.details
    //   let result = null

    //   // console.log(
    //   //   'this.firstRingQuality.checked=====>',
    //   //   this.firstRingQuality.checked
    //   // )

    //   for (let n = 0, length = list.length; n < length; n++) {
    //     if (
    //       list[n].hasOwnProperty('material') &&
    //       list[n].hasOwnProperty('size') &&
    //       // list[n].hasOwnProperty('carat') &&
    //       this.firstRingQuality.checked.indexOf(list[n].material) > -1 &&
    //       this.firstRingSize.id === list[n].size 
    //       // this.firstRingCarat.id === list[n].carat
    //     ) {
    //       // 同时具有选项的字段，才表示该配置选项已启用
    //       result = list[n]
    //       break
    //     }
    //   }
    //   console.log("result",result)
    //   this.firstRingId = result.id
    //   return result
    // },
    // secondRingSimpleDetail() {
    //   const list = this.secondRing.details
    //   let result = null

    //   for (let n = 0, length = list.length; n < length; n++) {
    //     if (
    //       list[n].hasOwnProperty('material') &&
    //       list[n].hasOwnProperty('size') &&
    //       // list[n].hasOwnProperty('carat') &&
    //       this.secondRingQuality.checked.indexOf(list[n].material) > -1 &&
    //       this.secondRingSize.id === list[n].size
    //       // this.firstRingCarat.id === list[n].carat
    //     ) {
    //       // 同时具有选项的字段，才表示该配置选项已启用
    //       result = list[n]
    //       break
    //     }
    //   }
    //   console.log("result2",result)
    //   this.secondRingId = result.id
    //   return result
    // },
    firstRingSimpleDetail() {
      const list = this.firstRing.details
      let result = null
      // console.log("ggg",this.firstRing)
      // console.log(
      //   'this.firstRingQuality.checked=====>',
      //   this.firstRingQuality.checked
      // )
      if(this.firstRing.carats.length >0){
        for (let n = 0, length = list.length; n < length; n++) {
          if (
            list[n].hasOwnProperty('material') &&
            list[n].hasOwnProperty('size') &&
            list[n].hasOwnProperty('carat') &&
            this.firstRingQuality.checked.indexOf(list[n].material) > -1 &&
            this.firstRingSize.id === list[n].size &&
            this.firstRingCarat.id === list[n].carat
          ) {
            // 同时具有选项的字段，才表示该配置选项已启用
            result = list[n].id
            break
          }
        }
      } else {
        for (let n = 0, length = list.length; n < length; n++) {
          if (
            list[n].hasOwnProperty('material') &&
            list[n].hasOwnProperty('size') &&
            this.firstRingQuality.checked.indexOf(list[n].material) > -1 &&
            this.firstRingSize.id === list[n].size
          ) {
            // 同时具有选项的字段，才表示该配置选项已启用
            result = list[n].id
            break
          }
        }
      }
      this.firstRingId = result
      // console.log("result",this.firstRingId)
      return this.changeChecked()
    },
    secondRingSimpleDetail() {
      const list = this.secondRing.details
      let result = null

      if(this.secondRing.carats.length >0){
        for (let n = 0, length = list.length; n < length; n++) {
          if (
            list[n].hasOwnProperty('material') &&
            list[n].hasOwnProperty('size') &&
            list[n].hasOwnProperty('carat') &&
            this.secondRingQuality.checked.indexOf(list[n].material) > -1 &&
            this.secondRingSize.id === list[n].size &&
            this.secondRingCarat.id === list[n].carat
          ) {
            // 同时具有选项的字段，才表示该配置选项已启用
            result = list[n].id
            break
          }
        }
      } else{
        for (let n = 0, length = list.length; n < length; n++) {
          if (
            list[n].hasOwnProperty('material') &&
            list[n].hasOwnProperty('size') &&
            this.secondRingQuality.checked.indexOf(list[n].material) > -1 &&
            this.secondRingSize.id === list[n].size
          ) {
            // 同时具有选项的字段，才表示该配置选项已启用
            result = list[n].id
            break
          }
        }
      }
      this.secondRingId = result
      // console.log("result2",this.secondRingId)
      // this.secondRingId = result.id
      return this.changeChecked()
    },
    showAverageScores() {
      return parseInt(this.averageScores || '0')
    },
    
  },
  created() {
    if(this.firstRing.carats.length>0){
      this.firstRingCarat = {
        id: this.firstRing.carats[0].sortType,
        text: this.firstRing.carats[0].content
      }
    }
    this.firstRingSize = {
      id: this.firstRing.sizes[0].sortType,
      text: this.firstRing.sizes[0].content
    }
    this.firstRingQuality = {
      checked: this.firstRing.materials[0].id
        ? [this.firstRing.materials[0].id]
        : [],
      options: this.firstRing.materials
    }
    if(this.secondRing.carats.length>0){
      this.secondRingCarat = {
        id: this.secondRing.carats[0].sortType,
        text: this.secondRing.carats[0].content
      }
    }
    this.secondRingSize = {
      id: this.secondRing.sizes[0].sortType,
      text: this.secondRing.sizes[0].content
    }
    this.secondRingQuality = {
      checked: this.secondRing.materials[0].id
        ? [this.secondRing.materials[0].id]
        : [],
      options: this.secondRing.materials
    }
      // this.secondRingCarat = {
      //   id: this.secondRing.carats[0].sortType,
      //   text: this.secondRing.carats[0].content
      // }
      if(this.secondRing.materials[0].id){
        // this.secondRingSize = {
        //   id: this.secondRing.sizes[0].sortType,
        //   text: this.secondRing.sizes[0].content
        // }
        this.secondRingQuality = {
          checked: this.secondRing.materials[0].id
            ? [this.secondRing.materials[0].id]
            : [],
          options: this.secondRing.materials
        }
      }
  },
  mounted() {
    
    // this.$axios carats
    //   .get(`/wap/goodsComments/getAvgLevel`, {
    //     params: {
    //       groupId: this.$route.query.goodId
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
    //       groupId: this.$route.query.goodId,
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
    //下拉框更新后触发
    changeChecked() {
      const _this = this

      const firstRing = _this.firstRingId
      const secondRing = _this.secondRingId

      if(!firstRing || !secondRing) {
        _this.coupleLadyId = ''
        _this.coupleMenId = ''
        _this.goodsId = ''
        _this.styleId = ''
        _this.categoryId = ''
        _this.stock = ''
        return;
      }
      // console.log("firstRing",firstRing,secondRing)
      _this.doubleRingDetailId(firstRing, secondRing);
    },
    doubleRingDetailId(ladyRing, menRing) {
      const _this = this
      _this.coupleLadyId = ''
        _this.coupleMenId = ''
        _this.goodsId = ''
        _this.styleId = ''
        _this.categoryId = ''
        _this.stock = ''
      // console.log("goodinfo",this.goodInfo.details)
      this.goodInfo.details.map((item, i) => {
        if(ladyRing == item.ladyRing && menRing == item.menRing || menRing == item.ladyRing && ladyRing == item.menRing) {
          console.log("item",item)
          _this.coupleLadyId = item.ladyRing
          _this.coupleMenId = item.menRing
          _this.goodsId = item.id
          _this.styleId = item.goodsId
          _this.categoryId = item.categoryId
          _this.goodInfo.salePrice = item.retailMallPrice
          if(_this.goodInfo.coupon.discount){
            _this.goodInfo.coupon.discount.price = item.coupon.discount.price
          }
          _this.stock = item.stock
        }
      })
    },
    dealGoodInfo(goodInfo) {
      goodInfo = JSON.parse(JSON.stringify(goodInfo))
      if (Object.keys(goodInfo).length === 0) {
        return goodInfo
      }

      const mcArr = []
      for (const i in goodInfo.materials) {
        const o = {
          id: goodInfo.materials[i].id,
          name: goodInfo.materials[i].name,
          image: goodInfo.materials[i].image
          // image: this.$IMG_URL + goodInfo.materials[i].configAttrImg || ''
        }
        mcArr.push(o)
      }
      const carats = []
      const stArr = []
      for (const i in goodInfo.sizes) {
        const o = {
          content: goodInfo.sizes[i].name,
          sortType: goodInfo.sizes[i].id,
          sortBy: goodInfo.sizes[i].id
        }
        stArr.push(o)
      }
      stArr.unshift({
        content: this.lang.stArrContent,
        sortType: ``,
        sortBy: ``
      })
      for (const i in goodInfo.carats) {
        const o = {
          content: goodInfo.carats[i].name,
          sortType: goodInfo.carats[i].id,
          sortBy: goodInfo.carats[i].id
        }
        carats.push(o)
      }
      // carats.unshift({
      //   content: ``,
      //   sortType: ``,
      //   sortBy: ``
      // })
      goodInfo.carats = carats
      goodInfo.sizes = stArr
      goodInfo.materials = mcArr
      goodInfo.goodsDesc = goodInfo.goodsDesc.includes(`<script>`)
        ? ''
        : goodInfo.goodsDesc

      const specs = goodInfo.specs
      const sexMap = {
        '42': {
          type: 0,
          text: this.lang.lady
        },
        '41': {
          type: 1,
          text: this.lang.gentlemen
        },
        '43': {
          type: 2,
          text: this.lang.general
        }
      }
      for (let n = 0, length = specs.length; n < length; n++) {
        if (specs[n].configId === '26') {
          const sex = sexMap[specs[n].configAttrId]
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
    showFirstRingCaratChoose() {
      this.$refs['first-ring-carat'] &&
        this.$refs['first-ring-carat'].show()
    },
    showSecondRingCaratChoose() {
      this.$refs['second-ring-carat'] &&
        this.$refs['second-ring-carat'].show()
    },
    firstRingClearCarat(val) {
      this.firstRingCarat = {
        id: val.item.sortType,
        text: val.item.content
      }
    },
    secondRingClearCarat(val) {
      this.secondRingCarat = {
        id: val.item.sortType,
        text: val.item.content
      }
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
      const bullShit = this.goodInfo.details
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
            parseInt(bullShit[i].carat) === parseInt(this.chooseCaratId) && 
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
    addCart() {
      if (!(this.canAddCart && this.inSale)) {
        this.$toast(this.lang.doubleRingTip)
        return
      }
      if (!this.goodsId) {
        this.$toast(this.lang.doubleRingTip)
        return
      }
      // const goodInfo = [
      //   {
      //     goodsCount: 1,
      //     goodsDetailsId: this.firstRingSimpleDetail.id,
      //     goodsId: this.firstRingSimpleDetail.goodsId,
      //     groupId: this.goodInfo.id,
      //     groupType: 1,
      //     goodsType: this.firstRingSimpleDetail.categoryId,
      //     serviceId: 0,
      //     serviceVal: 'string'
      //   },
      //   {
      //     goodsCount: 1,
      //     goodsDetailsId: this.secondRingSimpleDetail.id,
      //     goodsId: this.secondRingSimpleDetail.goodsId,
      //     groupId: this.goodInfo.id,
      //     groupType: 1,
      //     goodsType: this.secondRingSimpleDetail.categoryId,
      //     serviceId: 0,
      //     serviceVal: 'string'
      //   }
      // ]

      const goodInfo = {
        goodsCount: 1,
        goodsDetailsId:  this.goodsId,
        goodsId: this.goodsId,
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
