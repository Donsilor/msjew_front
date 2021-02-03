import Moment from 'moment'
const storage = process.client ? require('good-storage').default : {}
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
      isLogin: !!this.$store.state.token,
      // 第一个戒指
      firstRingCarat: {
        id: '',
        text: ''
      },
      firstRingMaterial: {
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
      firstRingColor: {
        id: '',
        text: ''
      },
      // 第二个戒指
      secondRingCarat: {
        id: '',
        text: ''
      },
      secondRingMaterial: {
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
      secondRingColor: {
        id: '',
        text: ''
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
      showP2: 0,
      list:[],
      cartList:[],
      isLogin: !!this.$store.state.token,
      firstRingColorAttrs:[
        {
          goods_id:'',
          config_id:'',
          config_attr_id:''
        }
      ],
      secondRingColorAttrs:[
        {
          goods_id:'',
          config_id:'',
          config_attr_id:''
        }
      ],
      doubleRingColorAttrs:[],
      seleceIndexA: {
        caratsIndex: 0,
        materialsIndex: 0,
        sizesIndex: 0,
        colorsIndex: 0
      },
      seleceIndexB: {
        caratsIndex: 0,
        materialsIndex: 0,
        sizesIndex: 0,
        colorsIndex: 0
      },
      firstStock: '',
      secondStock: '',
      defaultAs: {},
      defaultBs: {},
      goodsAttrA: {
        materials: [],
        sizes: [],
        carats: [],
        colors: []
      },
      goodsAttrB: {
        materials: [],
        sizes: [],
        carats: [],
        colors: []
      }
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
        colors: [],
        details: [],
        firstRingId:'',
        secondRingId:'',
        coupleLadyId:'',
        coupleMenId:'',
        goodsId:'',
        styleId:'',
        stock:''
      }
    },
    // 色彩  start
    firstRingColorDetail(){
      const Spec = this.firstRing.specs
      let configId = ''
      if(Spec){
        Spec.forEach(item => {
          if (item.configId === '63') {
            configId = item.configId
          }
        })
      }
      return configId
    },
    secondRingColorDetail(){
      const Spec = this.secondRing.specs
      let configId = ''
      if(Spec){
        Spec.forEach(item => {
          if (item.configId === '63') {
            configId = item.configId
          }
        })
      }
      return configId
    },
    firstRingGoodsAttrs:{
      get(){
        this.firstRingColorAttrs[0].goods_id = this.firstRingId
        this.firstRingColorAttrs[0].config_id = this.firstRingColorDetail
        this.firstRingColorAttrs[0].config_attr_id = this.firstRingColor.id
        return this.firstRingColorAttrs
      },
      set(){
        
      }
    },
    secondRingGoodsAttrs:{
      get(){
        this.secondRingColorAttrs[0].goods_id = this.secondRingId
        this.secondRingColorAttrs[0].config_id = this.secondRingColorDetail
        this.secondRingColorAttrs[0].config_attr_id = this.secondRingColor.id
        return this.secondRingColorAttrs
      },
      set(){
        
      }
    },
    doubleRingGoodsAttrs(){
      this.doubleRingColorAttrs = this.firstRingGoodsAttrs.concat(this.secondRingGoodsAttrs)
      let arr = this.doubleRingColorAttrs.filter(item=>item.goods_id !== ''&&item.config_id !== ''&&item.config_attr_id !== '')
      // console.log('mmmmm',arr)
      return arr
    },
    // 色彩  end
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
      if(this.goodInfo && this.goodInfo.goodsServicesJsons){
        this.goodInfo && this.goodInfo.goodsServicesJsons.forEach(item => {
          result.push(item)
          // if (names.indexOf(item.name) === -1) {
          //   names.push(item.name)
          //   result.push(item)
          // }
        })
      }
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
    firstRingMaterialText() {
      return this.firstRingMaterial.text
    },
    secondRingmaterialText() {
      return this.secondRingMaterial.text
    },
    firstRingCaratText() {
      return this.firstRingCarat.text
    },
    secondRingCaratText() {
      return this.secondRingCarat.text
    },
    firstRingColorText() {
      return this.firstRingColor.text
    },
    secondRingColorText() {
      return this.secondRingColor.text
    },
    firstRingSizeText() {
      return this.firstRingSize.text
    },
    secondRingSizeText() {
      return this.secondRingSize.text
    },
    firstRingSimpleDetail() {
      const list = this.firstRing.details
      let result = null

      if(this.firstRing.carats.length >0){
        for (let n = 0, length = list.length; n < length; n++) {
          if (
            list[n].hasOwnProperty('material') &&
            list[n].hasOwnProperty('size') &&
            list[n].hasOwnProperty('carat') &&
            (this.firstRingQuality.checked+'').indexOf(list[n].material) > -1 &&
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
      
      // this.firstRingId = result
      // console.log("result",this.firstRingId)
      // return this.changeChecked()
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
            // result = list[n].id
            break
          }
        }
      }
      this.secondRingId = result
      // console.log("result2",result)
      // this.secondRingId = result.id
      // return this.changeChecked()
    },
    showAverageScores() {
      return parseInt(this.averageScores || '0')
    },
    // 获取不会重复的类时间戳
    getTimestampUuid () {
      return new Date().getTime().toString()
    }
  },
  created() {
    this.defaultAttr()
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
    // 获取默认属性
    defaultAttr() {
      // -----------------戒指一属性---------------------
      this.defaultAs = this.firstRing.details;
      let repetitionA = false, materialsA=[], caratsA=[], sizesA=[];

      this.defaultAs.forEach(item => {
        if(item.material){
          repetitionA = false
          materialsA.forEach(m => {
            if(m == item.material){
              repetitionA = true;
            }
          })

          if(!repetitionA){
            materialsA.push(item.material)
          }
        }

        if(item.carat){
          repetitionA = false
          caratsA.forEach(m => {
            if(m == item.carat){
              repetitionA = true;
            }
          })

          if(!repetitionA && item.material == materialsA[0]){
            caratsA.push(item.carat)
          }
        }

        if(item.size){
          repetitionA = false
          sizesA.forEach(m => {
            if(m == item.sizes){
              repetitionA = true;
            }
          })

          if(!repetitionA && item.material == materialsA[0] && item.carat == caratsA[0]){
            sizesA.push(item.size)
          }
        }
      })

      // id转换为具体数据
      this.firstRing.materials.forEach(n => {
        materialsA.forEach(o => {
          if(o == n.id){
            this.goodsAttrA.materials.push(n)
          }
        })
      })

      this.firstRing.carats.forEach(p => {
        caratsA.forEach(q => {
          if(q == p.sortBy){
            this.goodsAttrA.carats.push(p)
          }
        })
      })

      this.firstRing.sizes.forEach(r => {
        sizesA.forEach(s => {
          if(s == r.sortBy){
            this.goodsAttrA.sizes.push(r)
          }
        })
      })
      this.firstRing.colors.forEach(u => {
        this.goodsAttrA.colors.push(u)
      })

      if(this.goodsAttrA.materials.length){
        this.firstRingMaterial = {
          id: this.goodsAttrA.materials[0].id,
          text: this.goodsAttrA.materials[0].name
        }
      }

      if(this.goodsAttrA.carats.length){
        this.firstRingCarat = {
          id: this.goodsAttrA.carats[0].sortBy,
          text: this.goodsAttrA.carats[0].content
        }
      }

      if(this.goodsAttrA.sizes.length){
        this.firstRingSize = {
          id: this.goodsAttrA.sizes[0].sortType,
          text: this.goodsAttrA.sizes[0].content
        }
      }

      if(this.goodsAttrA.colors.length){
        this.firstRingColor = {
          id: this.firstRing.colors[0].sortType,
          text: this.firstRing.colors[0].content
        }
        this.firstRingColorAttrs[0].config_id = this.firstRingColorDetail
        this.firstRingColorAttrs[0].config_attr_id = this.firstRingColor.id
      }

      // 获取已选中属性的戒指一ID
      this.firstRing.details.forEach(t => {
        if(t.material == (this.goodsAttrA.materials.length ? this.goodsAttrA.materials[0].id : null) &&
          t.carat == (this.goodsAttrA.carats.length ? this.goodsAttrA.carats[0].sortBy : null) &&
          t.size == (this.goodsAttrA.sizes.length ? this.goodsAttrA.sizes[0].sortBy : null)
        ){
          this.firstRingId = t.id
          this.firstStock = t.stock;
        }
      })

      // -----------------戒指二属性---------------------
      this.defaultBs = this.secondRing.details;
      let repetitionB = false, materialsB=[], caratsB=[], sizesB=[];

      this.defaultBs.forEach(item => {
        if(item.material){
          repetitionB = false
          materialsB.forEach(m => {
            if(m == item.material){
              repetitionB = true;
            }
          })
          
          if(!repetitionB){
            materialsB.push(item.material)
          }
        }

        if(item.carat){
          repetitionB = false
          caratsB.forEach(m => {
            if(m == item.carat){
              repetitionB = true;
            }
          })
          
          if(!repetitionB && item.material == materialsB[0]){
            caratsB.push(item.carat)
          }
        }

        if(item.size){
          repetitionB = false
          sizesB.forEach(m => {
            if(m == item.sizes){
              repetitionB = true;
            }
          })
          
          if(!repetitionB && item.material == materialsB[0] && item.carat == caratsB[0]){
            sizesB.push(item.size)
          }
        }
      })

      // id转换为具体数据
      this.secondRing.materials.forEach(n => {
        materialsB.forEach(o => {
          if(o == n.id){
            this.goodsAttrB.materials.push(n)
          }
        })
      })

      this.secondRing.carats.forEach(p => {
        caratsB.forEach(q => {
          if(q == p.sortBy){
            this.goodsAttrB.carats.push(p)
          }
        })
      })

      this.secondRing.sizes.forEach(r => {
        sizesB.forEach(s => {
          if(s == r.sortBy){
            this.goodsAttrB.sizes.push(r)
          }
        })
      })
      this.secondRing.colors.forEach(u => {
        this.goodsAttrB.colors.push(u)
      })

      if(this.goodsAttrB.materials.length){
        this.secondRingMaterial = {
          id: this.goodsAttrB.materials[0].id,
          text: this.goodsAttrB.materials[0].name
        }
      }

      if(this.goodsAttrB.carats.length){
        this.secondRingCarat = {
          id: this.goodsAttrB.carats[0].sortBy,
          text: this.goodsAttrB.carats[0].content
        }
      }

      if(this.goodsAttrB.sizes.length){
        this.secondRingSize = {
          id: this.goodsAttrB.sizes[0].sortType,
          text: this.goodsAttrB.sizes[0].content
        }
      }

      if(this.goodsAttrB.colors.length){
        this.secondRingColor = {
          id: this.secondRing.colors[0].sortType,
          text: this.secondRing.colors[0].content
        }
        this.secondRingColorAttrs[0].config_id = this.secondRingColorDetail
        this.secondRingColorAttrs[0].config_attr_id = this.secondRingColor.id
      }

      // 获取已选中属性的戒指二ID
      this.secondRing.details.forEach(t => {
        if(t.material == (this.goodsAttrB.materials.length ? this.goodsAttrB.materials[0].id : null) &&
          t.carat == (this.goodsAttrB.carats.length ? this.goodsAttrB.carats[0].sortBy : null) &&
          t.size == (this.goodsAttrB.sizes.length ? this.goodsAttrB.sizes[0].sortBy : null)
        ){
          this.secondRingId = t.id
          this.secondStock = t.stock;
        }
      })

      // 获取最终对戒ID及价格
      let item = '';
      for(let i=0, len=this.goodInfo.details.length; i<len; i++){
        item = this.goodInfo.details[i]
        if((this.firstRingId == item.ladyRing && this.secondRingId == item.menRing) || (this.firstRingId == item.menRing && this.secondRingId == item.ladyRing)){
          this.coupleLadyId = item.ladyRing
          this.coupleMenId = item.menRing
          this.goodsId = item.id
          this.styleId = item.goodsId
          this.categoryId = item.categoryId
          this.goodInfo.salePrice = item.retailMallPrice
          if(this.goodInfo.coupon.discount){
            this.goodInfo.coupon.discount.price = item.coupon.discount.price
          }
          this.stock = item.stock
        }
      }
    },
    //下拉框更新后触发
    changeChecked() {
      const _this = this

      const firstRing = _this.firstRingId
      const secondRing = _this.secondRingId
      
      _this.firstRingColorAttrs[0].goods_id = firstRing
      _this.secondRingColorAttrs[0].goods_id = secondRing

      if(!firstRing || !secondRing) {
        _this.coupleLadyId = ''
        _this.coupleMenId = ''
        _this.goodsId = ''
        _this.styleId = ''
        _this.categoryId = ''
        _this.stock = ''
        return;
      }
      console.log("firstRing",firstRing,secondRing)
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
          // console.log("item",item)
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
      
      const Spec = goodInfo.specs
      let colors = []
      let colorSpec = ''
      let colorId = ''
      let configId = ''
      if(Spec){
        Spec.forEach(item => {
          if (item.configId === '63') {
            colorSpec = item.configAttrVal
            colorId = item.configAttrId
            configId = item.configId
          }
          if((colorId && colorSpec)!== ""){
            let ids = colorId.split("|")
            let specs = colorSpec.split("|")
            if((ids && specs) !== ''){
              colors = ids.map((id,i) => ({
                id, 
                image: null,
                name: specs[i]
              }));
            }
          }
        })
      }
      let info = {colors:[]}
      info = goodInfo
      info.colors = colors
      goodInfo = info
      // console.log("yyygoodinfo",goodInfo) 
      
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
      // stArr.unshift({
      //   content: this.lang.stArrContent,
      //   sortType: ``,
      //   sortBy: ``
      // })
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
      const clArr = []
      for (const i in goodInfo.colors) {
        const o = {
          content: goodInfo.colors[i].name,
          sortType: goodInfo.colors[i].id,
          sortBy: goodInfo.colors[i].id
        }
        clArr.push(o)
      }
      goodInfo.carats = carats
      goodInfo.colors = clArr
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
    // 色彩
    showFirstRingColorChoose() {
      this.$refs['first-ring-color'] &&
        this.$refs['first-ring-color'].show()
    },
    showSecondRingColorChoose() {
      this.$refs['second-ring-color'] &&
        this.$refs['second-ring-color'].show()
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
    // 色彩
    firstRingClearColor(val) {
      this.firstRingColor = {
        id: val.item.sortType,
        text: val.item.content
      }
      this.firstRingColorAttrs[0].config_id = this.firstRingColorDetail
      this.firstRingColorAttrs[0].config_attr_id = val.item.sortType
      this.firstRingGoodsAttrs = this.firstRingColorAttrs
      this.doubleRingColorAttrs = this.doubleRingGoodsAttrs
      console.log("firstRingClearColor",this.firstRingColor.id) 
    },
    secondRingClearColor(val) {
      this.secondRingColor = {
        id: val.item.sortType,
        text: val.item.content
      }
      this.secondRingColorAttrs[0].config_id = this.secondRingColorDetail
      this.secondRingColorAttrs[0].config_attr_id = val.item.sortType
      this.secondRingGoodsAttrs = this.secondRingColorAttrs
      this.doubleRingColorAttrs = this.doubleRingGoodsAttrs
      console.log("secondRingClearColor",this.secondRingColor.id)
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
        serviceVal: 'string',
        goods_attr: this.doubleRingGoodsAttrs
      }
      this.$emit('addCart', goodInfo)
    },
    // 获取登录列表数据
    getList(val) {
      const _this = this
      _this
        .$axios({
          method: 'get',
          url: `/web/member/cart`
        })
        .then(res => {
          const result = []
          let keys = Object.keys(res)
          keys = keys.sort((a, b) => {
            return b - a
          })
          keys.forEach(item => {
            result.push(res[item])
          })
          this.doFormat(result,val)
        })
        .catch(err => {
          console.log('err:', err)
        })
    },
    // 获取本地数据
    getLocalList(list,val) {
      this.$axios({
        method: 'post',
        url: `/web/member/cart/local`,
        data: {
          goodsCartList:list
        }
      })
        .then(res => {
          this.doFormat(res,val)
        })
        .catch(err => {
          console.log('err:', err)
        })
    },
    // 获取本地local列表
    getLocalCart(val) {
      this.$store.dispatch('getLocalCart').then(res => {
        if (res.length > 0) {
          this.noListData = false
          this.cartList = []
          res.map((item, index) => {
            item.data.map((val, ind) => {
              const o = {
                createTime: item.createTime,
                goods_num: val.goodsCount,
                goodsDetailsId: val.goodsDetailsId,
                goods_id: val.goodsDetailsId,
                goods_type:val.goodsType,
                group_id:
                  val.goodsType == 19
                    ? val.goodsId
                    : val.groupType === 2
                    ? item.id
                    : null,
                group_type: val.groupType,
                goods_attr:val.goods_attr,
                updateTime: item.id 
              }
              this.cartList.push(o)
            })
          })
          this.cartList.reverse()
          this.getLocalList(this.cartList,val)
        } else {
          this.num = 0
          this.list = []
        }
      })
    },
    // 格式化数据列表,从购物车中筛选出要提交的商品数据提交订单
    doFormat(res,val) {
      this.list = []
      if (res && res.length > 0) {
        this.noListData = false
        res.map((item, index) => {
          // console.log(item)
          const o = {
            isSelect: false,
            goodsImages: item.simpleGoodsEntity.goodsImages,
            goodsName:item.simpleGoodsEntity.goodsName,
            config:
              item.goodsType == 19
                ? item.ring
                : item.simpleGoodsEntity.categoryId === 20
                ? item.simpleGoodsEntity.baseConfig
                : item.simpleGoodsEntity.detailConfig,
            goodsAttr:item.goodsAttr,
            sku:
              item.goodsType == 19
                ? item.ring
                : item.simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode,
            salePrice: item.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice,
            totalPrice:item.goodsType == 19
                ? item.simpleGoodsEntity.salePrice
                : item.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice,
            groupType: item.groupType || 0,
            goodsType: item.simpleGoodsEntity.categoryId,
            createTime:
              item.goodsType == 19
                ? item.createTime
                : item.groupId
                ? item.groupId
                : item.goodsId,
            goodsId: item.goodsId,
            goodsDetailsId: item.goodsDetailsId,
            id: item.id,
            localSn: item.localSn,
            groupId: item.groupId || null,
            simpleGoodsEntity: item.simpleGoodsEntity,
            status:item.goodsType,
            goodsStatus:item.simpleGoodsEntity.goodsStatus,
            coupon:
            item.coupon ? item.coupon : {}
          }
          this.list.push(o)
          const result = []
          this.list.forEach(item => {
            // console.log(val,item)
            if(this.isLogin){
              if (val.includes(item.id)) {
                result.push(item)
              }
            } else{
              if(item.simpleGoodsEntity.categoryId === 19){
                if (val.includes(item.createTime)) {
                  result.push(item)
                } 
              } else {
                if (val.includes(item.localSn)) {
                  result.push(item)
                }
              }
            }
          })
          // console.log('result',result)
          storage && storage.set('myCartList', JSON.stringify(result))
          this.$router.push({
            name: 'cart-sureOrder'
          })
        })
        for (let i = 0; i < this.list.length - 1; i++) {
          if (
            this.list[i].simpleGoodsEntity.categoryId === 20 &&
            this.list[i].createTime === this.list[i + 1].createTime
          ) {
            const tamp = this.list[i]
            this.list[i] = this.list[i + 1]
            this.list[i + 1] = tamp
          }
        }
      } else {
        this.noListData = true
        this.num = 0
      }
    },
    // 立即购买
    orderNow(){
      // if(!this.isLogin && this.$store.state.platform == 21){
      //   this.ifShowPop = true
      //   return
      // }
      
      if (!(this.canAddCart && this.inSale)) {
        this.$toast(this.lang.specificationToast)
        return
      }
      if (!this.goodsId) {
        this.$toast(this.lang.specificationToast)
        return
      }
      const time = this.getTimestampUuid
      let goodInfo =[{
        goodsCount: 1,
        goodsDetailsId:  this.goodsId,
        goodsId: this.goodsId,
        groupId: null,
        groupType: null,
        goodsType: this.categoryId,
        serviceId: 0,
        serviceVal: 'string',
        goods_attr: this.doubleRingGoodsAttrs
      }] 
      
      goodInfo = goodInfo.map(function (item) {
        item.createTime = time
        item.updateTime = time
        return {
          createTime: item.createTime,
          updateTime: item.updateTime,
          goods_num: item.goodsCount,
          goodsDetailsId: item.goodsDetailsId,
          goods_id: item.goodsDetailsId,
          group_id: item.groupId,
          group_type: parseInt(item.groupType),
          serviceId: 0,
          serviceVal: 'string',
          goods_type: item.goodsType,
          goods_attr: item.goods_attr
        }
      });
      // console.log("goodInfogggggggggg",goodInfo)
      if(this.isLogin){
        this.$axios({
          method: 'post',
          url: `/web/member/cart/add`,
          data: {
              goodsCartList: goodInfo
          }
        })
        .then(data => {
          // console.log("id",data[0])
          const dataId = []
          dataId.push(data[0].id)
          this.getList(dataId)
          return Promise.resolve('success')
        })
        .catch(err => {
            return Promise.reject(err)
        })
      } else {
        const CART = 'cart'
        let goodInfo = [
          {
            goodsCount: 1,
            goodsDetailsId:  this.goodsId,
            goodsId: this.goodsId,
            groupId: null,
            groupType: null,
            goodsType: this.categoryId,
            serviceId: 0,
            serviceVal: 'string',
            goods_attr: this.doubleRingGoodsAttrs
          }
        ]
        const addInfo = {
          id: time,
          createTime: time,
          updateTime: time,
          data: goodInfo
        }
        // console.log("goodInfoggggggggggffffffff",goodInfo)
        return new Promise(async (resolve, reject) => {
          try {
              let cart = JSON.parse(localStorage.getItem(CART) || '[]')
              cart = cart.concat(addInfo)
              if (cart.length > 30) {
                  return reject(new Error(lang.cartIsFull))
              }
              localStorage.setItem(CART, JSON.stringify(cart))
              // console.log("dddd",cart)
              const dataId = []
              dataId.push(addInfo.id)
              this.getLocalCart(dataId)
              return resolve('success')
          } catch (e) {
              return reject(e)
          }
      })
      }
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
