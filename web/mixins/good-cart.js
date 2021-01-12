export default {
  props: {
    g: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default() {
        return -1
      }
    },
    isActive: {
      type: Number,
      default() {
        return -2
      }
    },
    good: {
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      language: this.$store.state.language,
      ifShowEditBtn: true,
      goodsId: -1,
      selectIndex: -2,
      type: '',
      info: {},
      coin: '',
      price: 0,
      cartId: '',
      cartIdB: '',   // 定制第二个商品的购物车ID
      materialsText: '成色',
      caratsText: '主石',
      sizesText: '手寸',
      colorText: '色彩'
    }
  },
  computed: {
    showAttr() {
      var res = false;
      if(this.type == 'single'){
        if(this.carats.length || this.materials.length || this.sizes.length || this.colorDetail.length){
          res = true
        }else{
          res = false
        }
      }else if(this.type == 'doubleA'){
        if(this.caratsA.length || this.materialsA.length || this.sizesA.length || this.firstRingColorDetail.length){
          res = true
        }else{
          res = false
        }
      }else if(this.type == 'doubleB'){
        if(this.caratsB.length || this.materialsB.length || this.sizesB.length || this.secondRingColorDetail.length){
          res = true
        }else{
          res = false
        }
      }else if(this.type == 'madeUpB'){
        if(this.caratsB.length || this.materialsB.length || this.sizesB.length || this.colorDetailB.length){
          res = true
        }else{
          res = false
        }
      }

      return res
    }
  },
  methods: {
    // 编辑商品属性
    editAttr(type) {
      this.resetData()
      this.selectIndex = this.index;
      this.$emit('getIndex', this.selectIndex)
      this.type = type;
      this.info = {};
      this.goodsId = this.g.data[0].goodsId;
      this.cartId = this.g.data[0].id;
      
      this.coin = this.good[this.index].data[0].simpleGoodsEntity.coinType
      this.price = this.good[this.index].data[0].simpleGoodsEntity.salePrice

      if(type == 'madeUpB'){
        this.cartIdB = this.g.data[1].id;
        this.goodsId = this.g.data[1].goodsId;
        this.price = this.good[this.index].data[1].simpleGoodsEntity.salePrice
      }

      if(this.goodsId != -1){
        this.getAttrData()
      }
    },
    // 获取商品属性
    getAttrData() {
      this.$axios({
        method: 'post',
        url: '/web/goods/style/detail',
        data: {
          goodsId: this.goodsId || '',
          backend: ''
        },
        transformRequest: [
          function(data) {
            let ret = ''
            for (const it in data) {
              // 过滤空元素
              if (data[it] === '' || data[it] === null) {
                continue
              }
              ret +=
                encodeURIComponent(it) +
                '=' +
                encodeURIComponent(data[it]) +
                '&'
            }
            return ret
          }
        ],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.info = res.data;
          if(this.type == 'single'){
            this.getRingInfo()
          }else if(this.type == 'doubleA' || this.type == 'doubleB'){
            this.getDoubleInfoA()
            this.getDoubleInfoB()
          }else if(this.type == 'madeUpA'){
            this.getMakeUpInfoA()
          }else if(this.type == 'madeUpB'){
            this.getMakeUpInfoB()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getRingInfo() {
      const _this = this;
      let product = this.info ? JSON.parse(JSON.stringify(this.info)) : {};

      this.productData = Object.assign({}, product, {
        targetUser: (() => {
          const specs = product.specs || []
          let result = '--'
          specs.forEach(item => {
            if (item.configId === 26) {
              result = item.configAttrVal
            }
          })
          return result
        })(),
        materials: product.materials || [],
        // sizes: product.sizes || [],
        sizes:(() =>{
            const sizes = product.sizes || []
            // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
            return sizes;
        })(),
        carats:(() =>{
            const carats = product.carats || []
            // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
            return carats;
        })(),
        specs: product.specs || [],
        details: product.details || [],
        goodsServicesJsons: (product.goodsServicesJsons || []).map(item => {
          item.img = _this.imageStrToArray(item.img)
          return item
        })
      })

      var attrs = this.good[this.index].data[0].simpleGoodsEntity.detailConfig,
          attrCarats = this.productData.carats,
          attrMaterials = this.productData.materials,
          attrSizes = this.productData.sizes;

      for(let n=0; n<attrCarats.length; n++){
        for(let o=0; o<attrs.length; o++){
          if(attrs[o].configId == 59 && attrCarats[n].id == attrs[o].configAttrId){
            this.selected.caratIndex = n;
            this.caratsText = attrs[o].configVal;
            break;
          }
        }
      }
        
      for(let i=0; i<attrMaterials.length; i++){
        for(let j=0; j<attrs.length; j++){
          if(attrs[j].configId == 10 && attrMaterials[i].id == attrs[j].configAttrId){
            this.selected.materialIndex = i;
            this.materialsText = attrs[j].configVal;
            break;
          }
        }
      }
    
      for(let k=0; k<attrSizes.length; k++){
        for(let l=0; l<attrs.length; l++){
          if(attrs[l].configId == 38 && attrSizes[k].id == attrs[l].configAttrId){
            this.selected.sizeIndex = k;
            this.sizesText = attrs[l].configVal;
            break;
          }
        }
      }

      if(this.colorDetail.length){
        var attrColorId = this.good[this.index].data[0].goodsAttr[0].configAttrId;

        for(let m=0; m<this.colorDetail.length; m++){
          if(this.colorDetail[m].id == attrColorId){
            this.selected.colorIndex = m;
            this.colorText = this.good[this.index].data[0].goodsAttr[0].configVal;
            break;
          }
        }
      }
      return
    },
    getDoubleInfoA() {
      const _this = this;
      let productA = _this.info && _this.info.ring && _this.info.ring[0]
      ? JSON.parse(JSON.stringify(_this.info.ring[0])) : {};

      this.productDataA = Object.assign({}, productA, {
        targetUser: (() => {
          const specs = productA.specs || []
          let result = '--'
          specs.forEach(item => {
            if (item.configId === 26) {
              result = item.configAttrVal
            }
          })
          return result
        })(),
        materials: productA.materials || [],
        // sizes: product.sizes || [],
        sizes:(() =>{
            const sizes = productA.sizes || []
            // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
            return sizes;
        })(),
        carats:(() =>{
            const carats = productA.carats || []
            // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
            return carats;
        })(),
        specs: productA.specs || [],
        details: productA.details || [],
        goodsServicesJsons: (productA.goodsServicesJsons || []).map(item => {
          item.img = _this.imageStrToArray(item.img)
          return item
        })
      })

      var attrs = this.good[this.index].data[0].ring[0].lang.goods_spec,
          attrCarats = this.productDataA.carats,
          attrMaterials = this.productDataA.materials,
          attrSizes = this.productDataA.sizes;

      for(let n=0; n<attrCarats.length; n++){
        for(let o=0; o<attrs.length; o++){
          if(attrs[o].attr_id == 59 && attrCarats[n].id == attrs[o].value_id){
            this.doubleSelectedA.caratIndex = n;
            if(this.type == 'doubleA'){
              this.caratsText = attrs[o].attr_name;
            }
            break;
          }
        }
      }
        
      for(let i=0; i<attrMaterials.length; i++){
        for(let j=0; j<attrs.length; j++){
          if(attrs[j].attr_id == 10 && attrMaterials[i].id == attrs[j].value_id){
            this.doubleSelectedA.materialIndex = i;
            if(this.type == 'doubleA'){
              this.materialsText = attrs[j].attr_name;
            }
            break;
          }
        }
      }
        
      for(let k=0; k<attrSizes.length; k++){
        for(let l=0; l<attrs.length; l++){
          if(attrs[l].attr_id == 38 && attrSizes[k].id == attrs[l].value_id){
            this.doubleSelectedA.sizeIndex = k;
            if(this.type == 'doubleA'){
              this.sizesText = attrs[l].attr_name;
            }
            break;
          }
        }
      }

      if(this.firstRingColorDetail.length){
        var attrColorId = this.good[this.index].data[0].goodsAttr[0].configAttrId;

        for(let m=0; m<this.firstRingColorDetail.length; m++){
          if(this.firstRingColorDetail[m].id == attrColorId){
            this.doubleSelectedA.colorIndex = m;
            if(this.type == 'doubleA'){
              this.colorText = this.good[this.index].data[0].goodsAttr[0].configVal;
            }
            break;
          }
        }
      }
    },
    getDoubleInfoB() {
      const _this = this;
      let productB = _this.info && _this.info.ring && _this.info.ring[1]
       ? JSON.parse(JSON.stringify(_this.info.ring[1])) : {};

      this.productDataB = Object.assign({}, productB, {
        targetUser: (() => {
          const specs = productB.specs || []
          let result = '--'
          specs.forEach(item => {
            if (item.configId === 26) {
              result = item.configAttrVal
            }
          })
          return result
        })(),
        materials: productB.materials || [],
        // sizes: product.sizes || [],
        sizes:(() =>{
            const sizes = productB.sizes || []
            // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
            return sizes;
        })(),
        carats:(() =>{
            const carats = productB.carats || []
            // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
            return carats;
        })(),
        specs: productB.specs || [],
        details: productB.details || [],
        goodsServicesJsons: (productB.goodsServicesJsons || []).map(item => {
          item.img = _this.imageStrToArray(item.img)
          return item
        })
      })

      var attrs = this.good[this.index].data[0].ring[1].lang.goods_spec,
          attrCarats = this.productDataB.carats,
          attrMaterials = this.productDataB.materials,
          attrSizes = this.productDataB.sizes;

      for(let n=0; n<attrCarats.length; n++){
        for(let o=0; o<attrs.length; o++){
          if(attrs[o].attr_id == 59 && attrCarats[n].id == attrs[o].value_id){
            this.doubleSelectedB.caratIndex = n;
            if(this.type == 'doubleB'){
              this.caratsText = attrs[o].attr_name;
            }
            break;
          }
        }
      }
      
      for(let i=0; i<attrMaterials.length; i++){
        for(let j=0; j<attrs.length; j++){
          if(attrs[j].attr_id == 10 && attrMaterials[i].id == attrs[j].value_id){
            this.doubleSelectedB.materialIndex = i;
            if(this.type == 'doubleB'){
              this.materialsText = attrs[j].attr_name;
            }
            break;
          }
        }
      }
        
      for(let k=0; k<attrSizes.length; k++){
        for(let l=0; l<attrs.length; l++){
          if(attrs[l].attr_id == 38 && attrSizes[k].id == attrs[l].value_id){
            this.doubleSelectedB.sizeIndex = k;
            if(this.type == 'doubleB'){
              this.sizesText = attrs[l].attr_name;
            }
            break;
          }
        }
      }

      if(this.secondRingColorDetail.length){
        var attrColorId = this.good[this.index].data[0].goodsAttr[1].configAttrId;

        for(let n=0; n<this.secondRingColorDetail.length; n++){
          if(this.secondRingColorDetail[n].id == attrColorId){
            this.doubleSelectedB.colorIndex = n;
            if(this.type == 'doubleB'){
              this.colorText = this.good[this.index].data[0].goodsAttr[0].configVal;
            }
            break;
          }
        }
      }
    },
    getMakeUpInfoA() {
      // const _this = this;
      // let productA = this.info ? JSON.parse(JSON.stringify(this.info)) : {};

      // this.productDataA = Object.assign({}, productA, {
      //   targetUser: (() => {
      //     const specs = productA.specs || []
      //     let result = '--'
      //     specs.forEach(item => {
      //       if (item.configId === 26) {
      //         result = item.configAttrVal
      //       }
      //     })
      //     return result
      //   })(),
      //   materials: productA.materials || [],
      //   // sizes: product.sizes || [],
      //   sizes:(() =>{
      //       const sizes = productA.sizes || []
      //       // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
      //       return sizes;
      //   })(),
      //   carats:(() =>{
      //       const carats = productA.carats || []
      //       // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
      //       return carats;
      //   })(),
      //   specs: productA.specs || [],
      //   details: productA.details || [],
      //   goodsServicesJsons: (productA.goodsServicesJsons || []).map(item => {
      //     item.img = _this.imageStrToArray(item.img)
      //     return item
      //   })
      // })

      // var attrs = this.good[this.index].data[1].simpleGoodsEntity.detailConfig,
      // attrCarats = this.productDataA.carats,
      // attrMaterials = this.productDataA.materials,
      // attrSizes = this.productDataA.sizes;

      // for(let n=0; n<attrCarats.length; n++){
      //   for(let o=0; o<attrs.length; o++){
      //     if(attrs[o].configId == 59 && attrCarats[n].id == attrs[o].configAttrId){
      //       this.madeUpSelectedA.caratIndex = n;
      //       break;
      //     }
      //   }
      // }
        
      // for(let i=0; i<attrMaterials.length; i++){
      //   for(let j=0; j<attrs.length; j++){
      //     if(attrs[j].configId == 10 && attrMaterials[i].id == attrs[j].configAttrId){
      //       this.madeUpSelectedA.materialIndex = i;
      //       break;
      //     }
      //   }
      // }
        
      // for(let k=0; k<attrSizes.length; k++){
      //   for(let l=0; l<attrs.length; l++){
      //     if(attrs[l].configId == 38 && attrSizes[k].id == attrs[l].configAttrId){
      //       this.madeUpSelectedA.sizeIndex = k;
      //       break;
      //     }
      //   }
      // }

      // if(this.colorDetailA.length){
      //   var attrColorId = this.good[this.index].data[0].goodsAttr[0].configAttrId;

      //   for(let m=0; m<this.colorDetailA.length; m++){
      //     if(this.colorDetailA[m].id == attrColorId){
      //       this.madeUpSelectedA.colorIndex = m;
      //       break;
      //     }
      //   }
      // }
    },
    getMakeUpInfoB() {
      const _this = this;
      let productB = this.info ? JSON.parse(JSON.stringify(this.info)) : {};

      this.productDataB = Object.assign({}, productB, {
        targetUser: (() => {
          const specs = productB.specs || []
          let result = '--'
          specs.forEach(item => {
            if (item.configId === 26) {
              result = item.configAttrVal
            }
          })
          return result
        })(),
        materials: productB.materials || [],
        // sizes: product.sizes || [],
        sizes:(() =>{
            const sizes = productB.sizes || []
            // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
            return sizes;
        })(),
        carats:(() =>{
            const carats = productB.carats || []
            // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
            return carats;
        })(),
        specs: productB.specs || [],
        details: productB.details || [],
        goodsServicesJsons: (productB.goodsServicesJsons || []).map(item => {
          item.img = _this.imageStrToArray(item.img)
          return item
        })
      })

      var attrs = this.good[this.index].data[1].simpleGoodsEntity.detailConfig,
      attrCarats = this.productDataB.carats,
      attrMaterials = this.productDataB.materials,
      attrSizes = this.productDataB.sizes;

      for(let n=0; n<attrCarats.length; n++){
        for(let o=0; o<attrs.length; o++){
          if(attrs[o].configId == 59 && attrCarats[n].id == attrs[o].configAttrId){
            this.madeUpSelectedB.caratIndex = n;
            this.caratsText = attrs[o].configVal;
            break;
          }
        }
      }
        
      for(let i=0; i<attrMaterials.length; i++){
        for(let j=0; j<attrs.length; j++){
          if(attrs[j].configId == 10 && attrMaterials[i].id == attrs[j].configAttrId){
            this.madeUpSelectedB.materialIndex = i;
            this.materialsText = attrs[j].configVal;
            break;
          }
        }
      }
        
      for(let k=0; k<attrSizes.length; k++){
        for(let l=0; l<attrs.length; l++){
          if(attrs[l].configId == 38 && attrSizes[k].id == attrs[l].configAttrId){
            this.madeUpSelectedB.sizeIndex = k;
            this.sizesText = attrs[l].configVal;
            break;
          }
        }
      }

      if(this.colorDetailB.length){
        var attrColorId = this.good[this.index].data[0].goodsAttr[0].configAttrId;

        for(let m=0; m<this.colorDetailB.length; m++){
          if(this.colorDetailB[m].id == attrColorId){
            this.madeUpSelectedB.colorIndex = m;
            this.colorText = this.good[this.index].data[0].goodsAttr[0].configVal;
            break;
          }
        }
      }

      this.goodsId = this.g.data[0].goodsId;

      this.$axios({
        method: 'post',
        url: '/web/goods/style/detail',
        data: {
          goodsId: this.goodsId || '',
          backend: ''
        },
        transformRequest: [
          function(data) {
            let ret = ''
            for (const it in data) {
              // 过滤空元素
              if (data[it] === '' || data[it] === null) {
                continue
              }
              ret +=
                encodeURIComponent(it) +
                '=' +
                encodeURIComponent(data[it]) +
                '&'
            }
            return ret
          }
        ],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.info = res.data;
          this.diamondPrice = res.data.salePrice
          this.diamondGoodInfo.goodsDetailsId = res.data.details[0].id,
          this.diamondGoodInfo.goods_id = res.data.details[0].goodsId,
          this.diamondGoodInfo.goods_type = res.data.details[0].categoryId
        })
        .catch(err => {
          console.error(err)
        })
    },
    // 选择成色
    chooseAttr(type, i) {
      if(this.type == 'single'){
        switch (type) {
          case 'carats':
            this.selected.caratIndex = i;
            break;
          case 'materials':
            this.selected.materialIndex = i;
            break;
          case 'size':
            this.selected.sizeIndex = i;
            break;
          case 'color':
            this.selected.colorIndex = i;
            break;
          default:
            break;
        }

        this.price = this.simpleDetail.retailMallPrice
      }else if(this.type == 'doubleA'){
        switch (type) {
          case 'carats':
            this.doubleSelectedA.caratIndex = i;
            break;
          case 'materials':
            this.doubleSelectedA.materialIndex = i;
            break;
          case 'size':
            this.doubleSelectedA.sizeIndex = i;
            break;
          case 'color':
            this.doubleSelectedA.colorIndex = i;
            break;
          default:
            break;
        }

        this.getCategoryId()
      }else if(this.type == 'doubleB'){
        switch (type) {
          case 'carats':
            this.doubleSelectedB.caratIndex = i;
            break;
          case 'materials':
            this.doubleSelectedB.materialIndex = i;
            break;
          case 'size':
            this.doubleSelectedB.sizeIndex = i;
            break;
          case 'color':
            this.doubleSelectedB.colorIndex = i;
            break;
          default:
            break;
        }

        this.getCategoryId()
      }else if(this.type == 'madeUpB'){
        switch (type) {
          case 'carats':
            this.madeUpSelectedB.caratIndex = i;
            break;
          case 'materials':
            this.madeUpSelectedB.materialIndex = i;
            break;
          case 'size':
            this.madeUpSelectedB.sizeIndex = i;
            break;
          case 'color':
            this.madeUpSelectedB.colorIndex = i;
            break;
          default:
            break;
        }

        this.price = this.madeUpDetailB.retailMallPrice
      }
    },
    // 获取对戒ID
    getCategoryId() {
      var goosIdA = -1, goosIdB = -1;

      let lenA = this.productDataA.details.length;
      for(let o=0; o<lenA; o++){
        if(this.caratsA[this.doubleSelectedA.caratIndex].id == this.productDataA.details[o].carat &&
          this.materialsA[this.doubleSelectedA.materialIndex].id == this.productDataA.details[o].material &&
          this.sizesA[this.doubleSelectedA.sizeIndex].id == this.productDataA.details[o].size)
        {
          goosIdA = this.productDataA.details[o].id;
          this.firstRingColorAttrs[0].goods_id = this.productDataA.details[o].id;
          break
        }
      }

      let lenB = this.productDataB.details.length;
      for(let p=0; p<lenA; p++){
        if(this.caratsB[this.doubleSelectedB.caratIndex].id == this.productDataB.details[p].carat &&
          this.materialsB[this.doubleSelectedB.materialIndex].id == this.productDataB.details[p].material &&
          this.sizesB[this.doubleSelectedB.sizeIndex].id == this.productDataB.details[p].size)
        {
          goosIdB = this.productDataB.details[p].id;
          this.secondRingColorAttrs[0].goods_id = this.productDataB.details[p].id;
          break
        }
      }
      
      let lenC = this.info.details.length;
      for(let q=0; q<lenC; q++){
        if(this.info.details[q].ladyRing == goosIdA && this.info.details[q].menRing == goosIdB || 
          this.info.details[q].ladyRing == goosIdB && this.info.details[q].menRing == goosIdA)
        {
          this.categoryId = this.info.details[q].categoryId;
          this.goodsId = this.info.details[q].id;
          this.price = this.info.details[q].retailMallPrice;
          break
        }
      }
    },
    // 重置数据
    resetData() {
      this.type = '';
      this.productData = {}
      this.productDataA = {}
      this.productDataB = {}
      this.selected = {
        caratIndex : -1,
        materialIndex : -1,
        sizeIndex : -1,
        colorIndex : -1
      }
      this.doubleSelectedA = {
        caratIndex : -1,
        materialIndex : -1,
        sizeIndex : -1,
        colorIndex : -1
      }
      this.doubleSelectedB = {
        caratIndex : -1,
        materialIndex : -1,
        sizeIndex : -1,
        colorIndex : -1
      }
      this.madeUpSelectedA = {
        caratIndex : -1,
        materialIndex : -1,
        sizeIndex : -1,
        colorIndex : -1
      }
      this.madeUpSelectedB = {
        caratIndex : -1,
        materialIndex : -1,
        sizeIndex : -1,
        colorIndex : -1
      }
      this.colorAttrs = [
        {
          config_id:'',
          config_attr_id:''
        }
      ]
      this.firstRingColorAttrs = [
        {
          goods_id:'',
          config_id:'',
          config_attr_id:''
        }
      ]
      this.secondRingColorAttrs = [
        {
          goods_id:'',
          config_id:'',
          config_attr_id:''
        }
      ]
      this.madeUpColorAttrs = [
        {
          config_id:'',
          config_attr_id:''
        }
      ]
    },
    // 取消选择属性
    cancelAdjustAttr(e) {
      this.resetData()
      this.$emit('closeAttr')
    },
    // 确认选择属性
    confirmAttr() {
      var _this = this;
      var goodInfo = [];

      if(this.type == 'single'){
        let colorArr = this.goodsAttrs.filter(item=>item.config_id !== null && item.config_attr_id !== null)   //筛选色彩中为空的对象
        
        goodInfo = [
          {
            goods_num: 1,
            goodsDetailsId: _this.simpleDetail.id,
            goods_id: _this.simpleDetail.id,
            group_id: null,
            group_type: null,
            serviceId: 0,
            serviceVal: 'string',
            goods_type:_this.simpleDetail.categoryId,
            goods_attr: colorArr,   //色彩
            id: this.cartId
          }
        ]
      }else if(this.type == 'doubleA' || this.type == 'doubleB'){
        goodInfo = [
          {
            goods_num: 1,
            goodsDetailsId: _this.goodsId,
            goods_id: _this.goodsId,
            group_id: null,
            group_type: null,
            serviceId: 0,
            serviceVal: 'string',
            goods_type: _this.categoryId,
            goods_attr: _this.doubleRingGoodsAttrs,  //色彩
            id: this.cartId
          }
        ]
      }else if(this.type == 'madeUpB'){
        const timeSock = new Date().getTime()
        goodInfo = [
          {
            goods_num: 1,
            goodsDetailsId: this.diamondGoodInfo.goodsDetailsId,
            goods_id: this.diamondGoodInfo.goods_id,
            goods_type: this.diamondGoodInfo.goods_type,
            group_id: timeSock,
            group_type: 2,
            serviceId: 0,
            serviceVal: 'string',
            id: this.cartId
          },
          {
            goods_num: 1,
            goodsDetailsId: _this.madeUpDetailB.id,
            goods_id: _this.madeUpDetailB.id,
            goods_type:_this.madeUpDetailB.categoryId,
            group_id: timeSock,
            group_type: 2,
            serviceId: 0,
            serviceVal: 'string',
            id: this.cartIdB
          }
        ]
      }

      let goodsIndex = _this.selectIndex;
      _this.$store
        .dispatch('editCart', [goodInfo,goodsIndex])
        .then(data => {
          _this.$successMessage(this.$t(`cart.changeAttrSuccess`))
          // setTimeout(function() {
            _this.resetData()
            _this.$emit(`reloadList`)
            _this.$emit('bottomData')
            _this.$emit('closeAttr')
          // }, 2000)
        })
        .catch(err => {
          _this.resetData()
          _this.$emit('closeAttr')
          console.log(err)
        })
    }
  },
  mounted() {
    var url = location.href;
    if(url.indexOf('shopping-cart') == -1){
      this.ifShowEditBtn = false
    }
  }
}
