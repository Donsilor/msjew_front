<template>
  <div>
    <step></step>
    <div class="page-content detail-page">
      <top-nav></top-nav>
      <section class="detail">
        <!--      左侧-->
        <div class="left-detail">
          <product-images :images="thumbnails"></product-images>
        </div>
        <!--      右侧-->
        <div class="right-detail">
          <div class="double-box">
            <div class="info-block">
              <div class="left-info-block">
                <img :src="imageStrToArray(block1.pick)" />
                <div class="title-block">
                  <div class="title-block-name">
                    {{ block1.name }}
                  </div>
                  <div class="title-block-sku">
                    {{ block1.sku }}
                  </div>
                </div>
              </div>
              <div class="right-info-block product-price">
                <span class="coin">
                  {{ info.coinType }}
                </span>
                <span class="price">
                  {{ formatNumber(block1.price) }}
                </span>
              </div>
            </div>
            <div class="info-block">
              <div class="left-info-block">
                <img :src="imageStrToArray(block2.pick)" />
                <div class="title-block">
                  <div class="title-block-name">
                    {{ block1.name }}
                  </div>
                  <div class="title-block-sku">
                    {{ block1.sku }}
                  </div>
                </div>
              </div>
              <div class="right-info-block product-price">
                <span class="coin">
                  {{ info.coinType }}
                </span>
                <span class="price">
                  {{ formatNumber(block2.price) }}
                </span>
              </div>
            </div>
          </div>
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
              :class="['add-to-cart', { active: true }]"
              @click="addCart"
            >
              {{ $t(`${lang}.addCart`) }}
            </button>
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
  </div>
</template>

<script>
import Helpers from '@/assets/js/helpers.js'
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
  data() {
    const _this = this
    return {
      lang,
      addingCart: false,
      info: null,
      steps: {},
      block1: {
        pick: ``,
        name: ``,
        sku: ``,
        price: ``,
        detail: ``
      },
      block2: {
        pick: ``,
        name: ``,
        sku: ``,
        price: ``,
        detail: ``
      },
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
      activeTab: 'desc'
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
      })
      return allData
    },
    // // 是否在销售
    // inSale() {
    //   return this.info.goodsStatus === 2
    // },
    // // 是否有存货
    // hadStock() {
    //   try {
    //     if (this.simpleDetail.stock > 0) {
    //       return true
    //     }
    //     return false
    //   } catch (e) {
    //     return false
    //   }
    // },
    // // 是否可以加入购物车
    // canAddCart() {
    //   // console.log('canAddCart======>', this.inSale, this.hadStock)
    //   return this.inSale && this.hadStock
    // },
    thumbnails() {
      return this.imageStrToArray(this.info.goodsImages || '')
    },
    productInfo() {
      return this.getRingInfo()
    },
    price() {
      return this.block1.price + this.block2.price
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
  asyncData({ $axios, route, store }) {
    const getSingleRing = () => {
      const steps = JSON.parse(Helpers.base64Decode(route.query.steps))
      const goodsId =
        steps.steps[0].ct === 1
          ? steps.steps[1].goodsId
          : steps.steps[0].goodsId
      return $axios({
        method: 'post',
        url: '/web/goods/goodsDetail',
        params: {
          goodsId
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
        .then(data => {
          return {
            info: data
          }
        })
        .catch(err => {
          console.error(err)
        })
    }

    return getSingleRing()
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      this.steps = JSON.parse(
        this.$helpers.base64Decode(this.$route.query.steps)
      )
      this.getPrice(this.steps.steps[0].goodsId, this.steps.steps[1].goodsId)
    })
  },
  methods: {
    getRingInfo() {
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
    async getPrice(id1, id2) {
      const data1 = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify({ goodsId: id1 })),
        false
      )
      const data2 = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify({ goodsId: id2 })),
        false
      )
      await this.$axios
        .post(`/wap/goods/goodsDetail`, data1)
        .then(res => {
          // console.log(res, `11111111111111`)
          this.block1.name = res.goodsName
          this.block1.sku = res.goodsCode
          this.block1.pick = res.goodsImages.split(`,`)[0] || ``
          for (const i in res.simpleGoodsDetailsList) {
            if (
              this.steps.steps[0].goodsDetailsId ===
              res.simpleGoodsDetailsList[i].id
            ) {
              this.block1.price = res.simpleGoodsDetailsList[i].retailMallPrice
            }
          }
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
      await this.$axios
        .post(`/wap/goods/goodsDetail`, data2)
        .then(res => {
          // console.log(res, `2222222222222222222`)
          this.block2.name = res.goodsName
          this.block2.sku = res.goodsCode
          this.block2.pick = res.goodsImages.split(`,`)[0] || ``
          for (const i in res.simpleGoodsDetailsList) {
            if (
              this.steps.steps[1].goodsDetailsId ===
              res.simpleGoodsDetailsList[i].id
            ) {
              this.block2.price = res.simpleGoodsDetailsList[i].retailMallPrice
            }
          }
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    async addCart() {
      const timeSock = new Date().getTime()
      const goodInfo = [
        {
          goodsCount: 1,
          goodsDetailsId:
            this.steps.steps[0].ct === 1
              ? this.steps.steps[0].goodsDetailsId
              : this.steps.steps[1].goodsDetailsId,
          goodsId:
            this.steps.steps[0].ct === 1
              ? this.steps.steps[0].goodsId
              : this.steps.steps[1].goodsId,
          groupId: timeSock,
          groupType: 2,
          serviceId: 0,
          serviceVal: 'string'
        },
        {
          goodsCount: 1,
          goodsDetailsId:
            this.steps.steps[0].ct === 1
              ? this.steps.steps[1].goodsDetailsId
              : this.steps.steps[0].goodsDetailsId,
          goodsId:
            this.steps.steps[0].ct === 1
              ? this.steps.steps[1].goodsId
              : this.steps.steps[0].goodsId,
          groupId: timeSock,
          groupType: 2,
          serviceId: 0,
          serviceVal: 'string'
        }
      ]
      let smoothly = true
      if (this.steps.steps[0].cartId || this.steps.steps[1].cartId) {
        await this.$store
          .dispatch('removeCart', [
            this.steps.steps[0].cartId,
            this.steps.steps[1].cartId
          ])
          .then(data => {
            smoothly = true
          })
          .catch(err => {
            smoothly = false
            if (!err.response) {
              this.$message.error(err.message)
            } else {
              // console.log(err)
            }
          })
      }
      if (!smoothly) return
      await this.$store
        .dispatch('addCart', goodInfo)
        .then(data => {
          this.$message.success(this.$t(`${lang}.addCartSuccess`))
          setTimeout(() => {
            this.$router.push(`/shopping-cart`)
          }, 500)
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.detail-page {
  margin: auto;
}
.double-box {
  width: 100%;
  height: 400px;
  /*background: pink;*/
  .info-block {
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-info-block {
      display: flex;
      align-items: center;
      .title-block-name {
        font-size: 18px;
        color: #333;
        margin-bottom: 3px;
      }
      .title-block-sku {
        font-size: 14px;
        color: #999;
      }
    }
    img {
      display: block;
      width: 62px;
      height: 62px;
      border: 1px solid #ddd;
      margin-right: 74-62px;
    }
    .product-price {
      font-size: 20px;
      .coin {
        font-size: 20px;
      }
      .price {
        font-size: 20px;
      }
    }
  }
}
</style>
