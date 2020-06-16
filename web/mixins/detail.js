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
      // facebook 统计添加购物车-start
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('track', 'AddToCart');
      // facebook统计添加购物车-end

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
