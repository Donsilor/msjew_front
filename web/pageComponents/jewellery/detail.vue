<template>
  <div class="page-content detail-page">
    <top-nav></top-nav>
    <section class="detail">
      <!--      左侧-->
      <div class="left-detail">
        <product-images :images="thumbnails"></product-images>
      </div>
      <!--      右侧-->
      <div class="right-detail">
        <h2 class="product-name">
          {{ info.goodsName }}
        </h2>
        <div class="product-code">ID:{{ info.goodsCode }}</div>
        <div class="sku">
          <div class="left-properties">
            <div v-if="productInfo.materials.length > 0" class="property-item">
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
          <div class="right-properties">
            <div v-if="productInfo.sizes.length > 0" class="property-item">
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
        <div class="product-price">
          <span class="coin">
            {{ info.coinType }}
          </span>
          <span class="price">
            {{ formatNumber(price) }}
          </span>
        </div>
        <div class="button-group">
          <button
            v-loading="addingCart"
            :class="['add-to-cart', { active: canAddCart }]"
            @click="addCart"
          >
            {{ $t(`${lang}.addCart`) }}
          </button>
        </div>
        <div class="other-info">
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
        </div>
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
    <ul class="tab">
      <li
        v-for="(item, index) in tabs"
        :key="index"
        :class="['item', { active: activeTab === item.key }]"
        @click="item.onClick"
      >
        <span>{{ item.name }}</span>
      </li>
    </ul>
    <!--    商品详情-->
    <section ref="product-desc" class="desc-top">
      <div class="section-name">
        <h2>{{ $t(`${lang}.goodsDetails`) }}</h2>
        <h3>ID：{{ info.goodsCode }}</h3>
      </div>
      <div class="attr-group">
        <h3 class="group-name">{{ $t(`${lang}.productParameters`) }}</h3>
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
      </div>
    </section>
    <section class="desc" v-html="info.goodsDesc"></section>
    <order-include></order-include>
    <comments ref="product-comments" :good-id="info.id"></comments>
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
        {
          key: 'reviews',
          name: this.$t(`${lang}.customerReviews`),
          ref: '',
          onClick() {
            const targetEle = document.getElementsByClassName('layout-box')[0]
            const top = _this.$refs['product-comments'].$el.offsetTop - 110
            _this.$scrollTopTo(targetEle, top)
          }
        }
      ],
      activeTab: 'desc',
      materialColors: {
        // rings
        120: 'color-14k-white',
        121: 'color-18k-white',
        122: 'color-14k-yellow',
        123: 'color-18k-yellow',
        124: 'color-platinum',
        125: 'color-18k-rose-gold',

        // necklace
        219: 'color-14k-white',
        222: 'color-18k-white',
        220: 'color-14k-yellow',
        223: 'color-18k-yellow',
        225: 'color-platinum',
        224: 'color-18k-rose-gold',

        // pendant
        227: 'color-14k-white',
        230: 'color-18k-white',
        228: 'color-14k-yellow',
        231: 'color-18k-yellow',
        233: 'color-platinum',
        232: 'color-18k-rose-gold',

        // studEarring
        235: 'color-14k-white',
        238: 'color-18k-white',
        236: 'color-14k-yellow',
        239: 'color-18k-yellow',
        241: 'color-platinum',
        240: 'color-18k-rose-gold',

        // earring
        243: 'color-14k-white',
        246: 'color-18k-white',
        244: 'color-14k-yellow',
        247: 'color-18k-yellow',
        249: 'color-platinum',
        248: 'color-18k-rose-gold',

        // braceletLine
        251: 'color-14k-white',
        254: 'color-18k-white',
        252: 'color-14k-yellow',
        255: 'color-18k-yellow',
        257: 'color-platinum',
        256: 'color-18k-rose-gold',

        // bracelet
        259: 'color-14k-white',
        262: 'color-18k-white',
        260: 'color-14k-yellow',
        263: 'color-18k-yellow',
        265: 'color-platinum',
        264: 'color-18k-rose-gold'
      },
      ringChecked: {
        materialIndex: 0,
        sizeIndex: 0
      }
    }
  },
  computed: {
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
        console.log('相加')
        result = _this.simpleDetail.retailMallPrice
      } else {
        console.log('不相加')
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

      let result = null
      for (let n = 0, length = details.length; n < length; n++) {
        const item = details[n]
        if (item.material === material && item.size === size) {
          result = item
          break
        }
      }
      return result
    }
  },
  watch: {
    info(val, oldVal) {
      console.log('info=======>')
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  },
  methods: {
    getProductInfo() {
      const _this = this
      const product = _this.info ? JSON.parse(JSON.stringify(_this.info)) : {}

      return Object.assign({}, product, {
        targetUser: (() => {
          const specs = product.specs || []
          let result = '--'
          specs.forEach(item => {
            if (item.configId === 196) {
              result = item.configAttrVal
            }
          })
          return result
        })(),
        materials: product.materials || [],
        sizes: product.sizes || [],
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
    }
  }
}
</script>

<style lang="less" scoped>
.detail-page {
  margin: auto;
}
</style>
