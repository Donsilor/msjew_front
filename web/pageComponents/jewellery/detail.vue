<template>
  <div class="page-content detail-page">
    <top-nav></top-nav>
    <section class="detail">
      <!--      左侧-->
      <div class="left-detail">
        <product-images :images="thumbnails" @getIdx="getIndex" :coupon="coupons"></product-images>

        <div class="magn-box">
          <bdd-magnifying :msg="magnifying"></bdd-magnifying>
        </div>
      </div>
      <!--      右侧-->
      <div class="right-detail">
        <div class="right-title">
        	<span class="discount-icon fl" v-if="info.coupon.discount">{{ language == 'en_US' ? discountUs(this.info.coupon.discount.discount)+'%' : discountConversion(this.info.coupon.discount.discount)}} {{ $t(`${lang}.discounts2`) }}</span>
        	<span class="favourable-icon fl" v-if="info.coupon.money">￥</span>

        	<h2 class="product-name">
        	  {{ info.goodsName }}
        	</h2>
        </div>

        <div class="product-code">ID:{{ info.goodsCode }}</div>
        <div class="sku" v-if="productInfo.carats.length == ''">
          <div class="left-properties" v-if="productInfo.materials.length > 0">
            <div  class="property-item">
              <span class="item-name">
                {{ $t(`${lang}.color`) }}
              </span>
              <div class="property">
                <div class="had-checked">
                  <i
                    :class="[
                      'iconfont',
                      'iconmaterial-big-pt',
                      'color-icon',
                      materialColors[
                        productInfo.materials[ringChecked.materialIndex].id
                      ]
                    ]"
                  ></i>
                  <span class="name ow-h1">
                    {{ productInfo.materials[ringChecked.materialIndex].name }}
                  </span>
                  <i class="iconfont iconxiala drop-down-icon"></i>
                </div>
                <ul class="options">
                  <li
                    v-for="(item, index) in productInfo.materials"
                    :key="index"
                    :class="[
                      'item',
                      { active: ringChecked.materialIndex === index }
                    ]"
                    @click="changeRingChecked('materialIndex', index)"
                  >
                    <i
                      :class="[
                        'iconfont',
                        'iconmaterial-big-pt',
                        'color-icon',
                        materialColors[item.id]
                      ]"
                    ></i>
                    <span class="name ow-h1">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 色彩 -->
          <div class="left-properties" v-if="colorDetail.length > 0">
            <div  class="property-item">
              <span class="item-name">
                {{ $t(`${lang}.shade`) }}
              </span>
              <div class="property">
                <div class="had-checked">
                  <!-- <i
                    :class="[
                      'iconfont',
                      'iconmaterial-big-pt',
                      'color-icon',
                        colorDetail[ringChecked.colorIndex].id
                    ]"
                  ></i> -->
                  <span class="name ow-h1">
                    {{ colorDetail[ringChecked.colorIndex].name }}
                  </span>
                  <i class="iconfont iconxiala drop-down-icon"></i>
                </div>
                <ul class="options">
                  <li
                    v-for="(item, index) in colorDetail"
                    :key="index"
                    :class="[
                      'item',
                      { active: ringChecked.colorIndex === index }
                    ]"
                    @click="changeRingChecked('colorIndex', index)"
                  >
                    <!-- <i
                      :class="[
                        'iconfont',
                        'iconmaterial-big-pt',
                        'color-icon',
                        colorDetail[item.id]
                      ]"
                    ></i> -->
                    <span class="name ow-h1">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="right-properties" v-if="productInfo.sizes.length > 0">
            <div  class="property-item">
              <span class="item-name">
                {{ $t(`${lang}.size`) }}
              </span>
              <div class="property">
                <div class="had-checked">
                  <span class="name ow-h1">
                    {{ productInfo.sizes[ringChecked.sizeIndex].name }}
                  </span>
                  <i class="iconfont iconxiala drop-down-icon"></i>
                </div>
                <ul class="options">
                  <li
                    v-for="(item, index) in productInfo.sizes"
                    :key="index"
                    :class="[
                      'item',
                      { active: ringChecked.sizeIndex === index }
                    ]"
                    @click="changeRingChecked('sizeIndex', index)"
                  >
                    <span class="name ow-h1">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="sku2" v-else>
          <div class="one">
            <div class="left-properties" v-if="productInfo.carats.length > 0" >
              <div class="property-item">
                <span class="item-name">
                  {{ $t(`${lang}.carat`) }}
                </span>
                <div class="property">
                  <div class="had-checked">
                    <span class="name ow-h1">
                      {{ productInfo.carats[ringChecked.caratIndex].name }}
                    </span>
                    <i class="iconfont iconxiala drop-down-icon"></i>
                  </div>
                  <ul class="options">
                    <li
                      v-for="(item, index) in productInfo.carats"
                      :key="index"
                      :class="[
                        'item',
                        { active: ringChecked.caratIndex === index }
                      ]"
                      @click="changeRingChecked('caratIndex', index)"
                    >
                      <span class="name ow-h1">{{ item.name }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="left-properties"  v-if="productInfo.materials.length > 0">
              <div class="property-item">
                <span class="item-name">
                  {{ $t(`${lang}.color`) }}
                </span>
                <div class="property">
                  <div class="had-checked">
                    <i
                      :class="[
                        'iconfont',
                        'iconmaterial-big-pt',
                        'color-icon',
                        materialColors[
                          productInfo.materials[ringChecked.materialIndex].id
                        ]
                      ]"
                    ></i>
                    <span class="name ow-h1">
                      {{ productInfo.materials[ringChecked.materialIndex].name }}
                    </span>
                    <i class="iconfont iconxiala drop-down-icon"></i>
                  </div>
                  <ul class="options">
                    <li
                      v-for="(item, index) in productInfo.materials"
                      :key="index"
                      :class="[
                        'item',
                        { active: ringChecked.materialIndex === index }
                      ]"
                      @click="changeRingChecked('materialIndex', index)"
                    >
                      <i
                        :class="[
                          'iconfont',
                          'iconmaterial-big-pt',
                          'color-icon',
                          materialColors[item.id]
                        ]"
                      ></i>
                      <span class="name ow-h1">{{ item.name }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 色彩 -->
            <div class="left-properties" v-if="colorDetail.length > 0">
              <div  class="property-item">
                <span class="item-name">
                  {{ $t(`${lang}.shade`) }}
                </span>
                <div class="property">
                  <div class="had-checked">
                    <!-- <i
                      :class="[
                        'iconfont',
                        'iconmaterial-big-pt',
                        'color-icon',
                          colorDetail[ringChecked.colorIndex].id
                      ]"
                    ></i> -->
                    <span class="name ow-h1">
                      {{ colorDetail[ringChecked.colorIndex].name }}
                    </span>
                    <i class="iconfont iconxiala drop-down-icon"></i>
                  </div>
                  <ul class="options">
                    <li
                      v-for="(item, index) in colorDetail"
                      :key="index"
                      :class="[
                        'item',
                        { active: ringChecked.colorIndex === index }
                      ]"
                      @click="changeRingChecked('colorIndex', index)"
                    >
                      <!-- <i
                        :class="[
                          'iconfont',
                          'iconmaterial-big-pt',
                          'color-icon',
                          colorDetail[item.id]
                        ]"
                      ></i> -->
                      <span class="name ow-h1">{{ item.name }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="right-properties" v-if="productInfo.sizes.length > 0" >
              <div class="property-item">
                <span class="item-name">
                  {{ $t(`${lang}.size`) }}
                </span>
                <div class="property">
                  <div class="had-checked">
                    <span class="name ow-h1">
                      {{ productInfo.sizes[ringChecked.sizeIndex].name }}
                    </span>
                    <i class="iconfont iconxiala drop-down-icon"></i>
                  </div>
                  <ul class="options">
                    <li
                      v-for="(item, index) in productInfo.sizes"
                      :key="index"
                      :class="[
                        'item',
                        { active: ringChecked.sizeIndex === index }
                      ]"
                      @click="changeRingChecked('sizeIndex', index)"
                    >
                      <span class="name ow-h1">{{ item.name }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul class="services-list">
          <li
            v-for="(item, index) in productInfo.goodsServicesJsons || []"
            :key="index"
            class="item"
          >
            <div class="item-image">
              <img :src="item.img" />
            </div>
            <div class="item-content">
              <span>{{ item.name }}</span>
            </div>
          </li>
        </ul>

        <!-- 折扣活动 -->
        <div class="discount-box" v-if="info.coupon.discount">
        	<div class="discount-active">
        		<div>
        			<span>{{ $t(`${lang}.discountsActive`) }}：</span>
        			<span class="discount-icon">{{ language == 'en_US' ? discountUs(this.info.coupon.discount.discount)+'%' : discountConversion(this.info.coupon.discount.discount)}} {{ $t(`${lang}.discounts2`) }}</span>
        		</div>
        		<div class="time">{{ $t(`${lang}.activityTime`) }}：{{activeTime}}</div>
        	</div>

        	<div class="discount-price">
        		<span class="old-price">{{ formatCoin(info.coinType) }} {{ formatNumber(price) }}</span>
        		<span class="new-price">{{ formatCoin(info.coinType) }} {{ formatNumber(price2) }}</span>
        	</div>
        </div>

        <!-- 优惠活动 -->
        <div class="favourable-box" v-if="info.coupon.money">
        	<div class="discount-active">
        		<div>
        			<span>{{ $t(`${lang}.discounts1`) }}：</span>
        			<span class="favourable-icon">￥</span>
        			<span class="get" @click="getCoupon">{{ $t(`${lang}.getCoupon`) }}></span>
        		</div>
        		<!-- <div class="time">{{ $t(`${lang}.activityTime`) }}：{{activeTime}}</div> -->
        	</div>

        	<!-- <div class="discount-price">
        		<span class="old-price">HKD  2,222,22</span>
        		<span class="new-price">HKD  2,222,22</span>
        	</div> -->
        </div>


        <div class="product-price" v-if="!info.coupon.discount">
          <span class="coin">
            {{ formatCoin(info.coinType) }}
          </span>
          <span class="price">
            {{ formatNumber(price) }}
          </span>
        </div>
        <div class="button-group">
          <button
            v-loading="orderingNow"
            :class="['add-to-cart', { actived: canAddCart }]"
            @click="orderNow"
          >
            {{ $t(`${lang}.buyNow`) }}
          </button>
          <button
            v-loading="addingCart"
            :class="['add-to-cart', { active: canAddCart }]"
            @click="addCart"
          >
            {{ $t(`${lang}.addCart`) }}
          </button>

          
        </div>

        <!-- <div class="other-info">
          <ul class="operates">
            <li class="item wish-state">
              <i
                v-if="inWish(info.id)"
                class="iconfont iconxin active"
                @click.stop.prevent="setWish(info.id)"
              ></i>
              <i
                v-else
                class="iconfont iconkongxin"
                @click.stop.prevent="setWish(info.id)"
              ></i>
              <span>
                {{ $t(`${lang}.wish`) }}
              </span>
            </li>

          </ul>
        </div> -->

      </div>
    </section>
    <!--    推荐商品-->
    <section class="list-content recommend">
      <h2 class="section-name">
        {{ $t(`${lang}.youMightAlsoLike`) }}
      </h2>
      <recommend-data :recommends="recommends"></recommend-data>
    </section>
    <!--    tab切换-->
   <!-- <ul class="tab">
      <li
        v-for="(item, index) in tabs"
        :key="index"
        :class="['item', { active: activeTab === item.key }]"
        @click="item.onClick"
      >
        <span>{{ item.name }}</span>
      </li>
    </ul> -->
    <!--    商品详情-->
    <h2 class="detail-name">{{ $t(`${lang}.goodsDetails`) }}</h2>
    <section ref="product-desc" class="desc-top">
      <div class="section-name">
        <h3>{{ $t(`${lang}.goodsId`) }}：
          <span>{{ info.goodsCode }}</span>
        </h3>
      </div>
      <div class="attr-group">
        <!-- <h3 class="group-name">{{ $t(`${lang}.productParameters`) }}:</h3> -->
        <ul class="attr-list">
          <li
            v-for="(item, index) in productInfo.specs"
            :key="index"
            class="attr-item"
          >
            <span>{{ item.configName }}:</span>
            <span>{{ item.configAttrVal || '--' }}</span>
          </li>
        </ul>
        <div class="line"></div>
      </div>
    </section>
    <section class="desc" v-html="info.goodsDesc"></section>
    <order-include></order-include>
    <comments ref="product-comments" :good-id="info.id"></comments>

    <!-- 获取优惠券 -->
    <get-coupon v-if="showCoupon" @closeCoupon="showCoupon = false" :moneyInfo="info.coupon.money"></get-coupon>
    <login-pop v-if="ifShowLoginPop" @closeLogin="closeLogin"></login-pop>
  </div>
</template>

<script>
import Detail from '@/mixins/detail.js'
import Operate from '@/mixins/operate.js'
import TopNav from '@/pageComponents/detail/top-nav.vue'
import ProductImages from '@/pageComponents/detail/product-images.vue'
import OrderInclude from '@/pageComponents/detail/order-include.vue'
import Comments from '@/pageComponents/detail/comments.vue'
import RecommendData from '@/pageComponents/detail/recommend.vue'
const lang = 'detail'
export default {
  head() {
    return {
      title: this.info.goodsName,
      meta: [
        {
          name: 'title',
          content: this.info.goodsName,
        },
        {
          name: 'description',
          content: this.info.goodsName,
        },
        {
          name: 'keywords',
          content: this.info.goodsName,
        }
      ]
    }
  },
  components: {
    TopNav,
    ProductImages,
    OrderInclude,
    Comments,
    RecommendData
  },
  mixins: [Detail, Operate],
  data() {
    const _this = this
    return {
      lang,
      tabs: [
        {
          key: 'desc',
          name: this.$t(`${lang}.goodsDetails`),
          ref: '',
          onClick() {
            const targetEle = document.getElementsByClassName('layout-box')[0]
            const top = _this.$refs['product-desc'].offsetTop - 110
            _this.$scrollTopTo(targetEle, top)
          }
        },
        // {
        //   key: 'reviews',
        //   name: this.$t(`${lang}.customerReviews`),
        //   ref: '',
        //   onClick() {
        //     const targetEle = document.getElementsByClassName('layout-box')[0]
        //     const top = _this.$refs['product-comments'].$el.offsetTop - 110
        //     _this.$scrollTopTo(targetEle, top)
        //   }
        // }
      ],
      activeTab: 'desc',
      materialColors: {
        // rings
        31: 'color-14k-white',
        28: 'color-18k-white',
        32: 'color-14k-yellow',
        29: 'color-18k-yellow',
        34: 'color-platinum',
        30: 'color-18k-rose-gold',

        // necklace
        31: 'color-14k-white',
        28: 'color-18k-white',
        32: 'color-14k-yellow',
        29: 'color-18k-yellow',
        34: 'color-platinum',
        30: 'color-18k-rose-gold',

        // pendant
        31: 'color-14k-white',
        28: 'color-18k-white',
        32: 'color-14k-yellow',
        29: 'color-18k-yellow',
        34: 'color-platinum',
        30: 'color-18k-rose-gold',

        // studEarring
        31: 'color-14k-white',
        28: 'color-18k-white',
        32: 'color-14k-yellow',
        29: 'color-18k-yellow',
        34: 'color-platinum',
        30: 'color-18k-rose-gold',

        // earring
        31: 'color-14k-white',
        28: 'color-18k-white',
        32: 'color-14k-yellow',
        29: 'color-18k-yellow',
        34: 'color-platinum',
        30: 'color-18k-rose-gold',

        // braceletLine
        31: 'color-14k-white',
        28: 'color-18k-white',
        32: 'color-14k-yellow',
        29: 'color-18k-yellow',
        34: 'color-platinum',
        30: 'color-18k-rose-gold',

        // bracelet
        31: 'color-14k-white',
        28: 'color-18k-white',
        32: 'color-14k-yellow',
        29: 'color-18k-yellow',
        34: 'color-platinum',
        30: 'color-18k-rose-gold'
      },
      ringChecked: {
        materialIndex: 0,
        sizeIndex: 0,
        caratIndex: 0,
        colorIndex: 0   //色彩
      },
      jewelleryOptions: this.CONDITION_INFO.jewellery,
      magnifying: '',
      showCoupon: false,
      activeTime: '',
      language: this.$store.state.language,
      colorAttrs:[
        {
          config_id:'',
          config_attr_id:''
        }
      ]    //色彩
    }
  },
  computed: {
    //色彩  start
    colorDetail(){
      const Spec = this.productInfo.specs
      let colors = []
      let colorSpec = ''
      let colorId = ''
      Spec.forEach(item => {
        if (item.configId === '63') {
          colorSpec = item.configAttrVal
          colorId = item.configAttrId
          this.configId = item.configId
        }
        if((colorId && colorSpec)!== ""){
          let ids = colorId.split("|")
          let specs = colorSpec.split("|")
          if((ids && specs) !== ''){
            colors = ids.map((id,i) => ({
              id, 
              name: specs[i]
            }));
          }
        }
      })
      // console.log(9999999,colors)
      return colors
    },
    goodsAttrs(){
      const _this = this
      const ringChecked = _this.ringChecked
      const colorDetail = _this.colorDetail

      const color =
        colorDetail.length > 0 && colorDetail[ringChecked.colorIndex]
          ? colorDetail[ringChecked.colorIndex].id
          : null
      _this.colorAttrs[0].config_id = _this.configId
      _this.colorAttrs[0].config_attr_id = color
      // console.log('rrrrrrrrrrrr',color)
      return _this.colorAttrs
    },
    //色彩  end
    coupons() {
      var co;
      if(this.couponType(this.info.coupon) == 'discount'){
        co = this.info.coupon.discount.discount;
      }else if(this.couponType(this.info.coupon) == 'money'){
        co = 'money'
      }else{
        co = 0
      }

      return co
    },
    thumbnails() {
      return this.imageStrToArray(this.info.goodsImages || '')
    },
    productInfo() {
      return this.getProductInfo()
    },
    price() {
      const _this = this
      const info = _this.info || {}
      let result = info.salePrice
      if (_this.simpleDetail) {
        // console.log('相加')
        result = _this.simpleDetail.retailMallPrice
      } else {
        // console.log('不相加')
      }
      return result
    },
    price2() {
      const _this = this
      const info = _this.info || {}
      let result = info.coupon.discount.price
      if (_this.simpleDetail) {
        // console.log('相加')
        result = _this.simpleDetail.coupon.discount.price
      } else {
        // console.log('不相加')
      }
      return result
    },
    simpleDetail() {
      const _this = this
      const productInfo = _this.productInfo
      const details = productInfo.details
      const ringChecked = _this.ringChecked

      const material =
        productInfo.materials.length > 0 &&
        productInfo.materials[ringChecked.materialIndex]
          ? productInfo.materials[ringChecked.materialIndex].id
          : null
      const size =
        productInfo.sizes.length > 0 && productInfo.sizes[ringChecked.sizeIndex]
          ? productInfo.sizes[ringChecked.sizeIndex].id
          : null
       const carat =
        productInfo.carats.length > 0 && productInfo.carats[ringChecked.caratIndex]
          ? productInfo.carats[ringChecked.caratIndex].id
          : null

      let result = null
      for (let n = 0, length = details.length; n < length; n++) {
        const item = details[n]
        if (item.material === material && item.size === size && item.carat === carat) {
          result = item
          break
        }
      }
      // console.log("result",result)
      return result
    }
  },
  watch: {
    info(val, oldVal) {
      // console.log('info=======>')
    }
  },
  mounted() {
    console.log("ddddd",this.info)
    const _this = this
    if(this.info.coupon.hasOwnProperty('discount')){
      this.activeTime = this.changeTime(this.info.coupon.discount.end_time)
    }

    _this.$nextTick(() => {})

	this.magnifying = this.thumbnails[0]
    // this.language = this.getCookie('language')
  },
  methods: {
    getCategoryById(categoryId) {
      const jewelleryOptions = this.jewelleryOptions
      let result = null
      for (let n = 0; n < jewelleryOptions.length; n++) {
        if (jewelleryOptions[n].categoryId === categoryId) {
          result = jewelleryOptions[n]
          break
        }
      }
      return result
    },
    getRecommendProductRouteInfo(product = {}) {
      const category = this.getCategoryById(product.categoryId)
      const categoryName = category && category.qualityName ? category.qualityName : 'other'
      return {
        path: `/jewellery/${categoryName}/${product.id}`,
        query: {
          goodId: product.id,
          ringType: 'single'
        }
      }
    },
    getProductInfo() {
      const _this = this
      const product = _this.info ? JSON.parse(JSON.stringify(_this.info)) : {}

      return Object.assign({}, product, {
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
        sizes: product.sizes || [],
        carats: product.carats || [],
        // sizes:(() =>{
        //     const sizes = product.sizes || []
        //     sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
        //     return sizes;
        // })(),
        specs: product.specs || [],
        details: product.details || [],
        goodsServicesJsons: (product.goodsServicesJsons || []).map(item => {
          item.img = _this.imageStrToArray(item.img)
          return item
        })
      })
    },
    changeRingChecked(key, value) {
      const _this = this
      const ringChecked = JSON.parse(JSON.stringify(_this.ringChecked))
      ringChecked[key] = value
      _this.ringChecked = ringChecked

      _this.colorAttrs = this.goodsAttrs
    },
    // 对戒独有的参数
    addWish(id) {
      const _this = this

      if (!id) {
        this.$errorMessage('no id')
        return
      }

      const goodInfo = {
        goodsId: null,
        groupId: id,
        groupType: 1,
        type: 1
      }

      _this.$store
        .dispatch('addWish', goodInfo)
        .then(data => {
          _this.$successMessage(_this.$t(`common.addWishSuccess`))
        })
        .catch(err => {
          _this.$errorMessage(`${err.message}`)
        })
    },
    getIndex(i) {
      this.magnifying = this.thumbnails[i]
    }
  }
}
</script>

<style lang="less" scoped>
.recommend{
  margin: 110px 0; 
}
.detail-page {
  margin: auto;
}
.sku2 {
  width: 720px;
  padding: 15px 25px;
  box-sizing: border-box;
  background: rgba(250, 250, 246, 1);
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-between;

  .left-properties {
    width: 230px;
  }
  .right-properties {
    // width: 420px;
  }

  .left-properties,
  .right-properties {
    flex-grow: 0;
    flex-shrink: 0;

    .property-item {
      margin-bottom: 12px;
      display: flex;
      align-items: center;

      &:nth-last-of-type(1) {
        margin-bottom: 0;
      }

      .item-name {
        width: 65px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .property {
        position: relative;
        width: 160px;
        height: 28px;
        margin-right: 10px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(187, 187, 187, 1);
        border-radius: 4px;
        box-sizing: border-box;

        .had-checked {
          width: 100%;
          height: 100%;
          padding: 5px 10px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          cursor: pointer;

          .color-icon {
            flex-grow: 0;
            flex-shrink: 0;
            min-width: 0;
            overflow: hidden;
            margin-right: 10px;
            font-size: 14px;
          }
          .name {
            flex-grow: 1;
            flex-shrink: 1;
            min-width: 0;
            overflow: hidden;
            margin-right: 10px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          .drop-down-icon {
            flex-grow: 0;
            flex-shrink: 0;
            min-width: 0;
            overflow: hidden;

            font-size: 12px;
            color: #8b766c;
            font-weight: bold;
          }
        }

        .options {
          list-style: none;
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 100%;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(187, 187, 187, 1);
          box-sizing: border-box;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s linear;
          z-index: 5;

          .item {
            width: 100%;
            height: 36px;
            padding: 5px 10px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: background-color 0.2s linear;

            &:hover {
              background-color: rgba(245, 243, 241, 1);
              color: #8b766c;
            }

            &.active {
              background-color: #cebeb0;
              color: #ffffff;
            }

            .color-icon {
              flex-grow: 0;
              flex-shrink: 0;
              min-width: 0;
              overflow: hidden;
              margin-right: 10px;
              font-size: 14px;
            }
            .name {
              flex-grow: 1;
              flex-shrink: 1;
              min-width: 0;
              overflow: hidden;
              margin-right: 10px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              white-space: nowrap;
            }
          }
        }

        &:hover {
          .options {
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }
  }
  .one{
    display: flex;
  }
  .two{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    .helper-popover {
      white-space: nowrap;

      .helper-name {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin: 0 6px 0 10px;
      }

      .prompt-icon {
        cursor: pointer;
        width: 16px;
        height: 16px;
        font-size: 14px;
        background: #debeab;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        display: inline-block;
        line-height: 14px;
        margin-left: -5px;
      }
    }
    .choose-size{
      text-decoration: underline;
      font-size: 12px;
      color: #aa8a7b;
      cursor: pointer;
      margin-left: 6px;
      line-height: 20px;
    }
  }
}
</style>
