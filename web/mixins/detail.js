export default {
  props: {
    info: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      addingCart: false
    }
  },
  computed: {
    recommends() {
      const _this = this
      const allData = JSON.parse(JSON.stringify(_this.info.recommends || []))
      allData.forEach(item => {
        item.images = _this.imageStrToArray(item.goodsImages || '')
        item.name = item.goodsName
        item.price = item.salePrice
        item.to = _this.getRecommendProductRouteInfo(item)
      })
      return allData
    },
    // 选择规格后取到的detail对象
    simpleDetail() {
      return null
    },
    // 是否在销售
    inSale() {
      return this.info.goodsStatus === 2
    },
    // 是否有存货
    hadStock() {
      try {
        if (this.simpleDetail.stock > 0) {
          return true
        }
        return false
      } catch (e) {
        return false
      }
    },
    // 是否可以加入购物车
    canAddCart() {
      // console.log(11,this.inSale,22,this.hadStock)
      return this.inSale && this.hadStock
    }
  },
  methods: {
    getRecommendProductRouteInfo(product = {}) {
      return {
        path: '/'
      }
    },
    // 加入购物车
    addCart() {
      const _this = this
      if (!_this.canAddCart) {
        _this.$errorMessage(_this.$t(`common.pleaseSelect`))
        return
      }
      if (!_this.simpleDetail) {
        _this.$errorMessage(_this.$t(`common.pleaseSelect`))
        return
      }
      const goodInfo = [
        {
          goods_num: 1,
          goodsDetailsId: _this.simpleDetail.id,
          goods_id: _this.simpleDetail.id,
          group_id: null,
          group_type: null,
          serviceId: 0,
          serviceVal: 'string',
          goods_type:_this.simpleDetail.categoryId
        }
      ]
      // console.log(goodInfo)
      _this.addingCart = true
      _this.$store
        .dispatch('addCart', goodInfo)
        .then(data => {
          // facebook 添加购物车统计-start
          fbq('track', 'AddToCart')
          // facebook 添加购物车统计-end
          

          setTimeout(() => {
            _this.$successMessage(_this.$t(`common.addCartSuccess`))
            _this.addingCart = false
          }, 1000)
        })
        .catch(err => {
          setTimeout(() => {
            _this.$errorMessage(`${err.message}`)
            _this.addingCart = false
          }, 1000)
        })
    }
  },
  mounted() {

    //facebook统计详情页
    let fbqInfo = {
      content_type: 'product', //  固定值：pruduct
      content_ids: this.info.id,  // 对应网站产品的 id或者Sku
      value:this.info.salePrice,     //对应产品的价值
      currency: this.info.coinType //对应货币类型
    };
    fbq('track', 'ViewContent', fbqInfo);
  }
}
