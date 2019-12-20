<template>
  <div class="page">
    <section class="banner">
      <el-carousel
        trigger="click"
        arrow="never"
        :autoplay="false"
        :height="bannerHeight + 'px'"
      >
        <el-carousel-item v-for="(item, index) in banner" :key="index">
          <div class="banner-item">
            <div class="banner-item-bg">
              <img :src="item.image" />
            </div>
            <div class="banner-item-content">
              <div class="content-title">
                <img class="gia-logo" src="/diamonds/gia.png" />
                <span>{{ $t(`${lang}.diamonds`) }}</span>
              </div>
              <div class="content-sub-title">
                {{ $t(`${lang}.subTitle`) }}
              </div>
              <div class="content-sub-desc">
                {{ $t(`${lang}.GIADiamonds`) }}
              </div>
              <div class="button-group">
                <nuxt-link :to="{ path: $startDj(1) }">
                  <button class="margin-bottom-30">
                    {{ $t(`${lang}.chooseDiamonds`) }}
                  </button>
                </nuxt-link>
                <nuxt-link :to="{ path: '/education/diamonds/carat' }">
                  <button>{{ $t(`${lang}.knowDiamonds`) }}</button>
                </nuxt-link>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>
    <section class="shape">
      <h1 class="section-title">
        {{ $t(`${lang}.diamondShape`) }}
      </h1>
      <div class="section-title-line"></div>
      <div class="section-content">
        <div :class="['shape-list-button', 'prev-button']">
          <span @click="prevShape"><</span>
        </div>
        <div class="shape-list">
          <div
            v-for="(item, index) in shapeList"
            :key="index"
            class="shape-item"
            :style="shapStyle"
          >
            <nuxt-link :to="item.to">
              <div class="shape-image">
                <img :src="item.image" />
              </div>
              <div class="shape-name ow-h1">{{ item.name }}</div>
              <p class="shape-sesc ow-h3">{{ item.desc }}</p>
            </nuxt-link>
          </div>
        </div>
        <div :class="['shape-list-button', 'next-button']">
          <span @click="nextShape">></span>
        </div>
      </div>
    </section>
    <section class="product">
      <h1
        v-for="(category, index) in categories"
        :key="index"
        class="section-title"
      >
        {{ category.name }}
      </h1>
      <div class="section-title-line"></div>
      <div class="tabs">
        <ul class="categories">
          <li
            v-for="(category, index) in categories"
            :key="index"
            :class="[
              'category-item',
              { active: category.type === activeCategoryType }
            ]"
            @click="changeActiveCategoryType(category.type)"
          >
            <div class="category-logo">
              <i :class="['iconfont', category.icon]"></i>
            </div>
            <div class="category-name">
              {{ category.name }}
            </div>
          </li>
        </ul>
      </div>
      <div class="section-content">
        <div
          v-for="(category, index) in categories"
          v-show="category.type === activeCategoryType"
          :key="index"
          class="category-product"
        >
          <div class="active-image">
            <img
              :src="
                activeProductInfo[category.type].goodsImages[2] ||
                  activeProductInfo[category.type].goodsImages[0]
              "
            />
          </div>
          <div class="product-swiper">
            <div :class="['product-swiper-button', 'prev-button']">
              <span @click="prevProduct"><</span>
            </div>
            <div class="swiper-content">
              <el-carousel
                :ref="'swiper-content-' + category.type"
                loop
                trigger="click"
                :autoplay="false"
                arrow="never"
                height="420px"
                @change="changeActiveProductIndex"
              >
                <el-carousel-item
                  v-for="(item, itemIndex) in categoryProduct[category.type]"
                  :key="itemIndex"
                >
                  <nuxt-link :to="item.to">
                    <div class="item">
                      <div class="item-image">
                        <img :src="item.goodsImages[0]" />
                      </div>
                      <div class="item-price">
                        <span class="coin">{{ item.coinType }}</span>
                        <span class="price">{{
                          formatNumber(item.salePrice)
                        }}</span>
                      </div>
                      <div class="item-title ow-h1">
                        {{ item.goodsName }}
                      </div>
                    </div>
                  </nuxt-link>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div :class="['product-swiper-button', 'next-button']">
              <span @click="nextProduct">></span>
            </div>
            <div class="swiper-indicator">
              <span
                v-for="(item, itemIndex) in categoryProduct[category.type]"
                :key="itemIndex"
                :class="[
                  'indicator-item',
                  {
                    active: itemIndex === activeProductIndex[activeCategoryType]
                  }
                ]"
              ></span>
            </div>
          </div>
          <div class="product-list">
            <ul class="list">
              <li
                v-for="(item, itemIndex) in categoryProduct[category.type]"
                :key="itemIndex"
                :class="[
                  'item',
                  { active: itemIndex === activeProductIndex[category.type] }
                ]"
                @click="setProductActiveItem(itemIndex)"
              >
                <div class="image">
                  <img :src="item.goodsImages[0]" />
                </div>
              </li>
            </ul>
            <div class="more">
              <nuxt-link :to="$startDj(2)">
                <button>{{ $t(`${lang}.more`) }}</button>
                <img src="/wedding-rings/arrow-right.png" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="select-your-diamond">
      <div class="section-content">
        <div class="bg">
          <img src="/diamonds/select-bg.png" />
        </div>
        <div class="bg-content">
          <div class="title-logo">
            <img src="/diamonds/select.png" />
          </div>
          <div class="title">
            {{ $t(`${lang}.howToChooseDiamonds`) }}
          </div>
          <div class="sub-title">
            {{ $t(`${lang}.toKnowChooseDiamonds`) }}
          </div>
          <div class="button-group">
            <nuxt-link :to="{ path: '/education/diamonds/carat' }">
              <button>{{ $t(`${lang}.knowMore`) }}</button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <section class="diamond-attributes">
      <h1 class="section-title">
        {{ $t(`${lang}.about4C`) }}
      </h1>
      <div class="section-title-line"></div>
      <div class="section-content">
        <ul class="four-attributes">
          <li class="attribute">
            <div class="attribute-image">
              <img src="/diamonds/4c/zu1.png" />
            </div>
            <div class="attribute-info">
              <h2 class="name">{{ $t(`${lang}.carat`) }}</h2>
              <p class="desc">{{ $t(`${lang}.aboutCarat`) }}</p>
              <div class="other">
                <nuxt-link :to="{ path: '/education/diamonds/carat' }">
                  {{ $t(`${lang}.checkDetails`) }}
                </nuxt-link>
              </div>
            </div>
          </li>
          <li class="attribute">
            <div class="attribute-image">
              <img src="/diamonds/4c/qiegong.png" />
            </div>
            <div class="attribute-info">
              <h2 class="name">{{ $t(`${lang}.cut`) }}</h2>
              <p class="desc">{{ $t(`${lang}.aboutCut`) }}</p>
              <div class="other">
                <nuxt-link :to="{ path: '/education/diamonds/cut' }">
                  {{ $t(`${lang}.checkDetails`) }}
                </nuxt-link>
              </div>
            </div>
          </li>
          <li class="attribute">
            <div class="attribute-image">
              <img src="/diamonds/4c/yanse.png" />
            </div>
            <div class="attribute-info">
              <h2 class="name">{{ $t(`${lang}.color`) }}</h2>
              <p class="desc">{{ $t(`${lang}.aboutColor`) }}</p>
              <div class="other">
                <nuxt-link :to="{ path: '/education/diamonds/color' }">
                  {{ $t(`${lang}.checkDetails`) }}
                </nuxt-link>
              </div>
            </div>
          </li>
          <li class="attribute">
            <div class="attribute-image">
              <img src="/diamonds/4c/jingdu.png" />
            </div>
            <div class="attribute-info">
              <h2 class="name">{{ $t(`${lang}.clarity`) }}</h2>
              <p class="desc">{{ $t(`${lang}.aboutClarity`) }}</p>
              <div class="other">
                <nuxt-link :to="{ path: '/education/diamonds/clarity' }">
                  {{ $t(`${lang}.checkDetails`) }}
                </nuxt-link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="diamond-gia">
      <div class="section-content">
        <div class="bg">
          <img src="/diamonds/zhengshu.png" />
        </div>
        <div class="bg-content">
          <div class="title-logo">
            <img src="/diamonds/certification.png" />
          </div>
          <div class="title">
            {{ $t(`${lang}.diamondReport`) }}
          </div>
          <div class="sub-title">
            {{ $t(`${lang}.aboutOurDiamondReport`) }}
          </div>
          <div class="button-group">
            <nuxt-link :to="{ path: '/education/diamonds/certification' }">
              <button>{{ $t(`${lang}.knowMore`) }}</button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryIndexPage from '@/mixins/category-index-page.js'
const lang = 'diamonds'
export default {
  head() {
    return this.seoInfo || {}
  },
  mixins: [CategoryIndexPage],
  data() {
    return {
      lang,
      shapeList: [
        {
          id: 18,
          name: this.$t(`${lang}.shape.round`),
          image: '/diamonds/shape/round.png',
          desc: this.$t(`${lang}.shape.roundDesc`),
          to: {
            path: '/diamonds/round-cut'
          }
        },
        {
          id: 25,
          name: this.$t(`${lang}.shape.oval`),
          image: '/diamonds/shape/oval.png',
          desc: this.$t(`${lang}.shape.ovalDesc`),
          to: {
            path: '/diamonds/oval-cut'
          }
        },
        {
          id: 19,
          name: this.$t(`${lang}.shape.princess`),
          image: '/diamonds/shape/pincess.png',
          desc: this.$t(`${lang}.shape.princessDesc`),
          to: {
            path: '/diamonds/princess-cut'
          }
        },
        {
          id: 20,
          name: this.$t(`${lang}.shape.emerald`),
          image: '/diamonds/shape/emerald.png',
          desc: this.$t(`${lang}.shape.emeraldDesc`),
          to: {
            path: '/diamonds/emerald-cut'
          }
        },
        {
          id: 27,
          name: this.$t(`${lang}.shape.heart`),
          image: '/diamonds/shape/heart.png',
          desc: this.$t(`${lang}.shape.heartDesc`),
          to: {
            path: '/diamonds/heart-shaped'
          }
        },
        {
          id: 23,
          name: this.$t(`${lang}.shape.marquise`),
          image: '/diamonds/shape/marquise.png',
          desc: this.$t(`${lang}.shape.marquiseDesc`),
          to: {
            path: '/diamonds/marquise-cut'
          }
        },
        {
          id: 22,
          name: this.$t(`${lang}.shape.cushion`),
          image: '/diamonds/shape/cushion.png',
          desc: this.$t(`${lang}.shape.cushionDesc`),
          to: {
            path: '/diamonds/cushion-cut'
          }
        },
        {
          id: 26,
          name: this.$t(`${lang}.shape.pearShape`),
          image: '/diamonds/shape/pear.png',
          desc: this.$t(`${lang}.shape.pearShapeDesc`),
          to: {
            path: '/diamonds/pear-shaped'
          }
        },
        {
          id: 21,
          name: this.$t(`${lang}.shape.asscher`),
          image: '/diamonds/shape/asscher.png',
          desc: this.$t(`${lang}.shape.asscherDesc`),
          to: {
            path: '/diamonds/asscher-cut'
          }
        },
        {
          id: 24,
          name: this.$t(`${lang}.shape.radiant`),
          image: '/diamonds/shape/radiant.png',
          desc: this.$t(`${lang}.shape.radiantDesc`),
          to: {
            path: '/diamonds/radiant-cut'
          }
        }
      ],
      shapeMoveNum: 0,
      categories: [
        {
          icon: 'iconstar-jt',
          name: this.$t(`${lang}.diyRing`),
          type: 3
        }
        // {
        //   icon: 'icondiamond-pendant',
        //   name: this.$t(`${lang}.diyNecklace`),
        //   type: 4
        // },
        // {
        //   icon: 'iconJewelry-made-Bracelet',
        //   name: this.$t(`${lang}.diyBracelet`),
        //   type: 5
        // }
      ],
      activeCategoryType: 3,
      activeProductIndex: {
        3: 0
      }
    }
  },
  computed: {
    shapStyle() {
      return {
        transform: `translate(-${this.shapeMoveNum * 280}px, 0)`
        // transform: `translate(-${this.shapeMoveNum * 100}%, 0)`
      }
    },
    categoryProduct() {
      const webSite = JSON.parse(
        JSON.stringify(this.webSite && this.webSite[0] ? this.webSite[0] : [])
      )
      const moduleGoods = webSite.moduleGoods || []
      const result = {}

      moduleGoods.forEach(item => {
        if (!result.hasOwnProperty(item.type)) {
          result[item.type] = []
        }

        const getToInfoByProductInfo = product => {
          const result = {
            path: '/',
            query: {}
          }

          if (product.type === 3) {
            // 订婚戒指
            result.path = `/ring/engagement-rings/${product.goodsName.replace(
              /\//g,
              ''
            )}`
            result.query = {
              goodId: product.id,
              ringType: 'engagement'
            }
          }
          return result
        }

        const good = item.goods
        good.showType = webSite.showType
        good.type = item.type
        good.goodsImages = this.imageStrToArray(good.goodsImages || '')
        good.to = getToInfoByProductInfo(good)

        result[item.type].push(good)
      })
      return result
    },
    activeProductInfo() {
      const result = {}
      const categoryProduct = this.categoryProduct
      const activeProductIndex = this.activeProductIndex

      Object.keys(categoryProduct).forEach(type => {
        const index = activeProductIndex[type] || 0
        result[type] = categoryProduct[type][index]
      })

      return result
    }
  },
  async asyncData({ $axios, route, store, app }) {
    const seoInfo = await app.$getSeoInfo(4)

    return $axios({
      method: 'get',
      url: '/web/Website/queryWebsiteModule',
      params: {
        type: 4
      }
    })
      .then(data => {
        return {
          seoInfo,
          ad: data.advert,
          webSite: data.webSite
        }
      })
      .catch(err => {
        console.error(err)
      })
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  },
  methods: {
    setShapeMoveNum(num) {
      this.shapeMoveNum = num
    },
    prevShape() {
      if (this.shapeMoveNum < 1) {
        return
      }
      this.setShapeMoveNum(this.shapeMoveNum - 1)
    },
    nextShape() {
      if (this.shapeMoveNum >= this.shapeList.length - 4) {
        return
      }
      this.setShapeMoveNum(this.shapeMoveNum + 1)
    },
    changeActiveCategoryType(type) {
      this.activeCategoryType = type
    },
    prevProduct() {
      const type = this.activeCategoryType
      const swiperContent = this.$refs[`swiper-content-${type}`]
      swiperContent &&
        swiperContent[0] &&
        swiperContent[0].prev &&
        swiperContent[0].prev()
    },
    nextProduct() {
      const type = this.activeCategoryType
      const swiperContent = this.$refs[`swiper-content-${type}`]
      swiperContent &&
        swiperContent[0] &&
        swiperContent[0].next &&
        swiperContent[0].next()
    },
    setProductActiveItem(num) {
      const type = this.activeCategoryType
      const swiperContent = this.$refs[`swiper-content-${type}`]
      swiperContent &&
        swiperContent[0] &&
        swiperContent[0].setActiveItem &&
        swiperContent[0].setActiveItem(num)
    },
    changeActiveProductIndex(index) {
      const activeProductIndex = JSON.parse(
        JSON.stringify(this.activeProductIndex)
      )
      activeProductIndex[this.activeCategoryType] = index
      this.activeProductIndex = activeProductIndex
    }
  }
}
</script>

<style lang="less" scoped>
section {
  .section-title {
    position: relative;
    font-size: 30px;
    font-weight: 400;
    /*font-weight: bold;*/
    color: rgba(51, 51, 51, 1);
    text-align: center;
    margin-bottom: 15px;
    z-index: 2;
  }
  .section-sub-title {
    position: relative;
    font-size: 20px;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    text-align: center;
    z-index: 2;
  }
  .section-title-line {
    position: relative;
    width: 100px;
    height: 1px;
    margin: 0 auto;
    background-color: #999999;
    z-index: 2;
  }
}

.el-carousel--horizontal {
  overflow: hidden;
}
.banner {
  overflow-x: hidden;
  .banner-item {
    position: relative;
    width: 100%;
    height: 100%;

    .banner-item-bg {
      width: 100%;
      height: 100%;
      line-height: 0;
      font-size: 0;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .banner-item-content {
      position: absolute;
      top: 50%;
      right: 5.7%;
      transform: translate(0, -50%);

      .content-title {
        margin-bottom: 19px;
        font-size: 48px;
        font-family: twCenMt;
        font-weight: 400;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: center;

        .gia-logo {
          height: 48px;
          margin-right: 51px;
        }
      }

      .content-sub-title {
        margin-bottom: 30px;
        font-size: 26px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        text-align: center;
      }

      .content-sub-desc {
        margin-bottom: 60px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        text-align: center;
      }

      .button-group {
        margin: auto;
        width: 220px;

        button {
          width: 100%;
          height: 34px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 2px 0px 0px rgba(153, 153, 153, 1);
        }
      }
    }
  }
}

.shape {
  width: 1366px;
  margin: 0 auto;
  padding-top: 60px;

  .section-content {
    padding: 60px 0;
    display: flex;
    flex-direction: row;
    align-items: center;

    .shape-list-button {
      flex-grow: 1;
      flex-shrink: 1;
      text-align: center;

      span {
        font-size: 30px;
        color: #999999;
        cursor: pointer;
      }
    }

    .shape-list {
      width: 1020px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }

      .shape-item {
        flex-grow: 0;
        flex-shrink: 0;
        padding-right: 100px;
        box-sizing: content-box;
        width: 180px;
        text-align: center;
        font-size: 0;
        transition: transform 0.3s linear;

        &:nth-last-of-type(1) {
          padding-right: 0;
        }
        .shape-image {
          margin-bottom: 40px;
          height: 94px;
          font-size: 0;
          line-height: 0;

          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
        .shape-name {
          margin-bottom: 35px;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
        .shape-sesc {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          line-height: 20px;
        }
      }
    }
  }
}

.product {
  .section-title-line {
    margin-bottom: 60px;
  }
  .tabs {
    display: none;
    width: 100%;
    height: 120px;
    padding: 20px 0;
    margin-bottom: 60px;
    box-sizing: border-box;

    .categories {
      width: 1366px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: stretch;

      .category-item {
        width: 240px;
        border-right: 1px solid #d2d2d2;
        margin-right: 20px;
        display: flex;
        align-items: center;
        color: #000000;
        cursor: pointer;
        transition: all 0.2s linear;

        .category-logo {
          flex-grow: 0;
          flex-shrink: 0;
          width: 36px;
          text-align: left;
          .iconfont {
            font-size: 20px;
          }
        }

        .category-name {
          flex-grow: 1;
          flex-shrink: 1;
          min-width: 0;
          text-align: left;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
        }

        &.active {
          color: #a88f82;
        }
      }
    }
  }
  .section-content {
    margin-bottom: 60px;

    .category-product {
      width: 1366px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;

      .active-image {
        flex-grow: 0;
        flex-shrink: 0;
        margin-bottom: 30px;
        position: relative;
        width: 720px;
        height: 500px;
        font-size: 0;
        line-height: 0;
        overflow: hidden;

        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          /*max-width: 100%;*/
          /*max-height: 100%;*/
        }
      }
      .product-swiper {
        flex-grow: 1;
        flex-shrink: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;

        .product-swiper-button {
          flex-grow: 1;
          flex-shrink: 1;
          text-align: center;
          cursor: pointer;
        }

        .swiper-content {
          width: 500px;
          height: 420px;
          box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);

          .item {
            position: relative;
            width: 100%;
            height: 100%;

            .item-image {
              position: relative;
              height: 312px;
              margin-bottom: 15px;
              line-height: 0;
              font-size: 0;

              img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: 100%;
                max-height: 100%;
              }
            }

            .item-price {
              height: 24px;
              padding: 0 12px;
              box-sizing: border-box;
              margin-bottom: 8px;
              font-size: 20px;
              font-family: twCenMT;
              font-weight: 400;
              color: rgba(242, 155, 135, 1);
              display: flex;
              align-items: center;
              justify-content: center;

              .coin {
                flex-grow: 0;
                flex-shrink: 0;
                margin-right: 6px;
              }

              .price {
                flex-grow: 0;
                flex-shrink: 0;
                min-width: 0;
              }
            }

            .item-title {
              padding: 0 12px;
              box-sizing: border-box;
              text-align: center;
            }
          }
        }

        .swiper-indicator {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          .indicator-item {
            margin: 0 7px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: #e6e6e6;

            &.active {
              background-color: #a88f82;
            }
          }
        }
      }
      .product-list {
        flex-grow: 0;
        flex-shrink: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;

        .list {
          flex-grow: 1;
          flex-shrink: 1;
          list-style: none;
          display: flex;
          flex-direction: row;

          .item {
            margin-right: 60px;
            background-color: #ffffff;
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);

            &:nth-last-of-type(1) {
              margin-right: 0;
            }

            &.active {
              box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
            }

            .image {
              position: relative;
              width: 180px;
              height: 180px;
              font-size: 0;
              line-height: 0;
              overflow: hidden;

              img {
                position: absolute;
                top: 50%;
                left: 50%;
                max-width: 100%;
                max-height: 100%;
                transform: translate(-50%, -50%) scale(1, 1);
                transition: all 0.2s linear;
              }
            }

            &:hover {
              .image {
                img {
                  transform: translate(-50%, -50%) scale(1.2, 1.2);
                }
              }
            }
          }
        }
        .more {
          flex-grow: 0;
          flex-shrink: 0;
          margin-right: 20px;
          position: relative;
          cursor: pointer;

          button {
            width: 98px;
            height: 34px;
            line-height: 34px;
            padding: 0 20px;
            box-sizing: border-box;
            text-align: left;
            border: 1px solid rgba(178, 172, 164, 1);
            font-size: 14px;
            font-weight: 400;
            color: rgba(178, 172, 164, 1);
          }
          img {
            margin-left: -35px;
          }
        }
      }
    }
  }
}

.select-your-diamond {
  .section-content {
    position: relative;
    width: 1366px;
    margin: 0 auto;

    .bg {
      position: relative;
      font-size: 0;
      line-height: 0;
      img {
        width: 100%;
      }
    }
    .bg-content {
      position: absolute;
      text-align: center;
      top: 50%;
      left: 913px;
      transform: translate(0, -50%);
      width: 354px;

      .title-logo {
        margin-bottom: 20px;
        font-size: 0;
        line-height: 0;
      }

      .title {
        margin-bottom: 23px;
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }

      .sub-title {
        margin-bottom: 40px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
      }

      .button-group {
        margin-bottom: 6px;
        text-align: center;
        button {
          width: 110px;
          height: 34px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          background: rgba(208, 204, 198, 1);
        }
      }
    }
  }
}

.diamond-attributes {
  padding: 60px 0;

  .section-title-line {
    margin-bottom: 40px;
  }

  .section-content {
    .four-attributes {
      width: 1366px;
      margin: 0 auto;
      list-style: none;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .attribute {
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: stretch;

        .attribute-image {
          flex-grow: 0;
          flex-shrink: 0;
          width: 100%;
          height: 198px;
          line-height: 0;
          font-size: 0;
          overflow: hidden;

          img {
            width: 100%;
            transform: scale(1, 1);
            transition: all 0.2s linear;
          }
        }

        .attribute-info {
          flex-grow: 1;
          flex-shrink: 1;
          padding: 30px 33px 25px 27px;
          box-sizing: border-box;
          box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
          min-height: 198px;
          display: flex;
          flex-direction: column;

          .name {
            flex-grow: 0;
            flex-shrink: 0;
            height: 20px;
            margin-bottom: 25px;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333333;
          }

          .desc {
            flex-grow: 1;
            flex-shrink: 1;
            margin-bottom: 25px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 18px;
          }

          .other {
            flex-grow: 0;
            flex-shrink: 0;
            height: 18px;

            a {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              text-decoration: underline;
              color: #f29b87;
            }
          }
        }

        &:hover {
          .attribute-image {
            img {
              transform: scale(1.2, 1.2);
            }
          }
        }
      }
    }
  }
}

.diamond-gia {
  padding-bottom: 50px;
  .section-content {
    position: relative;
    width: 1366px;
    margin: 0 auto;

    .bg {
      position: relative;
      font-size: 0;
      line-height: 0;
      img {
        width: 100%;
      }
    }
    .bg-content {
      position: absolute;
      text-align: center;
      top: 50%;
      left: 110px;
      transform: translate(0, -50%);
      width: 300px;

      .title-logo {
        margin-bottom: 20px;
        font-size: 0;
        line-height: 0;
      }

      .title {
        margin-bottom: 23px;
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }

      .sub-title {
        margin-bottom: 40px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
      }

      .button-group {
        margin-bottom: 6px;
        text-align: center;
        button {
          width: 110px;
          height: 34px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          background: #c9bfb6;
        }
      }
    }
  }
}
</style>
