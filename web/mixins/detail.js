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
        return
      }
      if (!_this.simpleDetail) {
        _this.$errorMessage('请选择')
        return
      }
      const goodInfo = [
        {
          goodsCount: 1,
          goodsDetailsId: _this.simpleDetail.id,
          goodsId: _this.simpleDetail.goodsId,
          groupId: null,
          groupType: null,
          serviceId: 0,
          serviceVal: 'string'
        }
      ]
      console.log(goodInfo)
      _this.addingCart = true
      _this.$store
        .dispatch('addCart', goodInfo)
        .then(data => {
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
  }
}
