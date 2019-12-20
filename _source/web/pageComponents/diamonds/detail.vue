<template>
  <div class="page-content detail-page">
    <top-nav></top-nav>
    <section class="detail">
      <!--      左侧-->
      <div class="left-detail">
        <product-images
          :images="thumbnails"
          :gia-number="productInfo.giaNumber"
        ></product-images>
      </div>
      <!--      右侧-->
      <div class="right-detail">
        <h2 class="product-name">
          {{ info.goodsName }}
        </h2>
        <div class="product-code">ID:{{ info.goodsCode }}</div>
        <div v-if="showSkuBox" class="sku">
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
        <div
          v-if="
            (parseInt($route.query.step) === 1 && !$route.query.isBack) ||
              !$route.query.step
          "
          class="button-group"
        >
          <nuxt-link v-if="canAddCart" :to="startDj">
            <button class="start-dj">
              开始DJ
            </button>
          </nuxt-link>
          <button
            v-loading="addingCart"
            :class="['add-to-cart', { active: canAddCart }]"
            @click="addCart"
          >
            {{ $t(`${lang}.addCart`) }}
          </button>
        </div>
        <div
          v-if="
            ($route.query.step && parseInt($route.query.step) !== 1) ||
              $route.query.isBack
          "
          class="button-group"
        >
          <nuxt-link v-if="canAddCart" :to="finishDj">
            <button class="sure-choose">
              确认选择
            </button>
          </nuxt-link>
          <button v-else :class="['sure-choose', { active: canAddCart }]">
            确认选择
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
            <li class="item compared-state">
              <i
                v-if="inCompared(info.id)"
                class="iconfont iconliebiao-duibi active"
                @click="setCompared(info.id)"
              ></i>
              <i
                v-else
                class="iconfont iconliebiao-duibi"
                @click="setCompared(info.id)"
              ></i>
              <span>
                {{ $t(`${lang}.wish`) }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!--    &lt;!&ndash;    推荐商品&ndash;&gt;-->
    <!--    <section class="list-content recommend">-->
    <!--      <h2 class="section-name">-->
    <!--        {{ $t(`${lang}.youMightAlsoLike`) }}-->
    <!--      </h2>-->
    <!--      <recommend-data :recommends="recommends"></recommend-data>-->
    <!--    </section>-->
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
    <diamond-specs-info
      ref="diamonds-four-c"
      :specs="productInfo.specs"
    ></diamond-specs-info>
  </div>
</template>

<script>
import Detail from '@/mixins/detail.js'
import Operate from '@/mixins/operate.js'
import TopNav from '@/pageComponents/detail/top-nav.vue'
import ProductImages from '@/pageComponents/detail/product-images.vue'
import OrderInclude from '@/pageComponents/detail/order-include.vue'
// import RecommendData from '@/pageComponents/detail/recommend.vue'
import DiamondSpecsInfo from '@/pageComponents/detail/diamond-specs-info.vue'
const lang = 'detail'
export default {
  components: {
    TopNav,
    ProductImages,
    OrderInclude,
    // RecommendData,
    DiamondSpecsInfo
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
          targetRef: '',
          onClick() {
            const targetEle = document.getElementsByClassName('layout-box')[0]
            const top = _this.$refs['product-desc'].offsetTop - 110
            _this.$scrollTopTo(targetEle, top)
          }
        },
        {
          key: 'reviews',
          name: this.$t(`${lang}.diamond4C`),
          targetRef: '',
          onClick() {
            const targetEle = document.getElementsByClassName('layout-box')[0]
            const top = _this.$refs['diamonds-four-c'].$el.offsetTop - 110
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
        125: 'color-18k-rose-gold'
      },
      ringChecked: {
        materialIndex: 0,
        sizeIndex: 0
      }
    }
  },
  computed: {
    showSkuBox() {
      return (
        this.productInfo.materials.length > 0 &&
        this.productInfo.sizes.length > 0
      )
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
    },
    startDj() {
      const step = {
        steps: [
          {
            goodsId: this.simpleDetail.goodsId,
            goodsDetailsId: this.simpleDetail.id,
            ct: 1,
            cartId: ``,
            page: `detail`
          },
          {
            goodsId: null,
            goodsDetailsId: null,
            ct: null,
            cartId: ``,
            page: `list`
          }
        ],
        step: 2
      }
      const strStep = JSON.stringify(step)
      const urlStep = this.$helpers.base64Encode(strStep)
      return `/build-your-own-ring/settings?steps=${urlStep}&selectGoodsId=${this.simpleDetail.goodsId}&step=2`
    },
    finishDj() {
      if (this.$route.query.steps) {
        const queryStep = JSON.parse(
          this.$helpers.base64Decode(this.$route.query.steps)
        )
        queryStep.steps[1].goodsId = this.simpleDetail.goodsId
        queryStep.steps[1].goodsDetailsId = this.simpleDetail.id
        queryStep.steps[1].ct = 1
        queryStep.step = 3
        const strStep = JSON.stringify(queryStep)
        const urlStep = this.$helpers.base64Encode(strStep)
        return `/build-your-own-ring/review?steps=${urlStep}&selectGoodsId=${this.simpleDetail.goodsId}&step=3`
      } else {
        return ``
      }
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
    console.log(this.simpleDetail, `<=======`)
  },
  methods: {
    getProductInfo() {
      const _this = this
      const product = _this.info ? JSON.parse(JSON.stringify(_this.info)) : {}

      const specs = product.specs || []

      return Object.assign({}, product, {
        targetUser: (() => {
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
        specs,
        details: product.details || [],
        goodsServicesJsons: (product.goodsServicesJsons || []).map(item => {
          item.img = _this.imageStrToArray(item.img)
          return item
        }),
        giaNumber: (() => {
          let gay = false
          let gayNum = ``
          specs.forEach(item => {
            if (item.configId === 191) {
              gayNum = item.configAttrVal
            } else if (item.configId === 192 && item.configAttrId === 442) {
              gay = true
            }
          })
          return gay && gayNum ? gayNum : ''
        })()
      })
    },
    changeRingChecked(key, value) {
      const _this = this
      const ringChecked = JSON.parse(JSON.stringify(_this.ringChecked))
      ringChecked[key] = value
      _this.ringChecked = ringChecked
    }
  }
}
</script>

<style lang="less" scoped>
.detail-page {
  margin: auto;

  .four-c {
    padding: 40px;
    .p-title {
      margin-bottom: 40px;
      font-size: 24px;
      color: #1b1b1b;
      text-align: left;
    }
    .c-content {
      border-bottom: 1px solid #eeeeee;
      padding-bottom: 40px;
      margin-bottom: 40px;
      h6 {
        font-size: 24px;
        color: #333333;
        margin-bottom: 20px;
        span {
          font-weight: normal;
          font-size: 20px;
        }
      }
      .tips {
        width: 54px;
        height: 1px;
        background: #aa8a7b;
        margin: 0 auto;
      }
      .c-body {
        .img {
          width: 1056px;
          height: 146px;
        }
        .test {
          width: 910px;
          height: 70px;
          margin: 20px 0 0 110px;
          background: #e9c7bf;
          font-size: 12px;
          line-height: 24px;
          text-align: left;
          padding-left: 12px;
          color: #ffffff;
        }
      }
    }
    .color {
      margin-top: 40px;
      border-top: 1px solid #eeeeee;
      padding-top: 40px;
      .c-body {
        ul {
          display: inline-block;
          margin: 40px auto 0;
          li {
            float: left;
            width: 100px;
            height: 105px;
            margin: 0 10px;
            span {
              display: block;
              text-align: center;
              font-size: 18px;
              color: #333333;
              margin: 12px 0;
            }
            img {
              width: 71px;
              height: 58px;
            }
          }
          .active {
            border: 1px solid #ba7f8c;
            box-shadow: 0px 1px 3px #e2c09f;
          }
        }
        .color-explain {
          display: inline-block;
          width: 1080px;
          height: 100px;
          margin: 20px auto 0;
          .explain-1 {
            float: left;
            width: 340px;
            height: 100px;
            margin-left: 10px;
            div {
              width: 340px;
              height: 20px;
              border: 1px solid #aa8a7b;
              border-top: none;
              margin-bottom: 30px;
            }
            p {
              font-size: 18px;
              color: #333333;
            }
          }
          .explain-2 {
            float: left;
            width: 476px;
            height: 100px;
            margin-left: 10px;
            div {
              width: 476px;
              height: 20px;
              border: 1px solid #aa8a7b;
              border-top: none;
              margin-bottom: 30px;
            }
            p {
              font-size: 18px;
              color: #333333;
            }
          }
          .explain-3 {
            float: left;
            width: 226px;
            height: 100px;
            margin-left: 10px;
            div {
              width: 224px;
              height: 20px;
              border: 1px solid #aa8a7b;
              border-top: none;
              margin-bottom: 30px;
            }
            p {
              font-size: 18px;
              color: #333333;
            }
          }
        }
      }
    }
    .cut {
      .c-body {
        .img {
          width: 1056px;
          height: 180px;
        }
        .test {
          position: relative;
          width: 1056px;
          img {
            position: absolute;
            top: -10px;
            left: 10px;
            height: 10px;
            width: 20px;
          }
        }
      }
    }
    .carat {
      padding-bottom: 0px;
      margin-bottom: 0px;
      border-bottom: none;
      .c-body {
        .test {
          position: relative;
          img {
            position: absolute;
            top: -10px;
            left: 10px;
            height: 10px;
            width: 20px;
          }
        }
        .left {
          float: left;
          width: 350px;
          ul {
            display: inline-block;
            height: 220px;
            width: 183px;
            border-bottom: 1px solid #aa8a7b;
            li {
              position: relative;
              width: 100%;
              height: 40px;
              font-size: 18px;
              line-height: 40px;
              border: 1px solid #aa8a7b;
              border-bottom: none;
              &:last-child {
                border-bottom: 1px solid #aa8a7b;
              }
              span {
              }
              div {
                display: none;
                position: absolute;
                top: 0;
                left: 210px;
                width: 420px;
                padding: 8px 10px;
                background: #e9c7bf;
                color: #ffffff;
                text-align: left;
                border-radius: 2px;
                b {
                  float: left;
                  font-size: 24px;
                  line-height: 26px;
                  margin-bottom: 10px;
                  font-weight: 300;
                }
                p {
                  float: left;
                  width: 100%;
                  font-size: 14px;
                  line-height: 18px;
                }
                img {
                  position: absolute;
                  top: 20px;
                  left: -9px;
                  width: 10px;
                  height: 20px;
                }
              }
            }
            .active {
              height: 60px;
              line-height: 60px;
              background: #eeeeee;
              div {
                display: block;
              }
            }
          }
        }
        .right {
          float: right;
          width: 360px;
          margin-right: 100px;
          p {
            font-size: 12px;
            color: #666666;
            margin-bottom: 24px;
          }
          img {
            width: 300px;
            height: 200px;
          }
        }
      }
    }
  }
}
</style>
