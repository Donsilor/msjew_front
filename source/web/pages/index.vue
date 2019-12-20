<template>
  <div class="page">
    <section class="banner">
      <el-carousel
        trigger="click"
        :autoplay="true"
        :height="bannerHeight + 'px'"
      >
        <el-carousel-item v-for="(item, index) in banner" :key="index">
          <!--          有链接地址，且是外部链接-->
          <a
            v-if="item.openType === 1 && item.url"
            :href="item.url"
            target="_blank"
          >
            <div class="banner-item">
              <img :src="item.image" />
            </div>
          </a>
          <!--          有链接地址，且不是外部链接-->
          <nuxt-link
            v-else-if="item.url && !item.isOutUrl"
            :to="{ path: item.url }"
          >
            <div class="banner-item">
              <img :src="item.image" />
            </div>
          </nuxt-link>
          <!--          有链接地址，且是外部链接-->
          <a v-else-if="item.url && item.isOutUrl" :href="item.url">
            <div class="banner-item">
              <img :src="item.image" />
            </div>
          </a>
          <!--          没有链接地址-->
          <div v-else-if="!item.url" class="banner-item">
            <img :src="item.image" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>
    <section class="design">
      <h1 class="section-title">
        {{ $t(`${lang}.designYourEngagementRing`) }}
      </h1>
      <h2 class="section-sub-title">{{ $t(`${lang}.startFromDiamond`) }}</h2>
      <interactive></interactive>
    </section>
    <section class="recommend-category">
      <div class="categories">
        <div
          v-for="(category, index) in recommendCategories"
          :key="index"
          class="category-item"
        >
          <nuxt-link :to="category.to">
            <div class="bg">
              <img :src="category.bgImage" />
              <div class="hover-cover"></div>
            </div>
            <div class="info">
              <h1 class="title">{{ category.title }}</h1>
              <h2 class="sub-title">{{ category.subTitle }}</h2>
              <div class="info-border-line border-t"></div>
              <div class="info-border-line border-r"></div>
              <div class="info-border-line border-b"></div>
              <div class="info-border-line border-l"></div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </section>

    <!--    首頁商品推薦模塊-->
    <section class="hot">
      <h1 class="section-title">
        {{ hotProductInfo.title }}
      </h1>
      <div class="section-title-line"></div>
      <div class="hot-list" :style="{ height: hotProductItemWidth + 'px' }">
        <swiper
          ref="hot-product-list"
          :item-width="20"
          :scale="true"
          :scale-multiple="1.5"
          :indicator="false"
        >
          <div
            v-for="(product, n) in hotProductInfo.products"
            :key="n"
            class="product-item"
          >
            <a
              v-if="product.showType === 1"
              :href="routeDataToUrl(product.to)"
              target="_blank"
            >
              <div class="product-image">
                <img class="product-image" :src="product.goodsImages[0]" />
              </div>
            </a>
            <nuxt-link v-else :to="product.to">
              <div class="product-image">
                <img class="product-image" :src="product.goodsImages[0]" />
              </div>
            </nuxt-link>
          </div>
        </swiper>
      </div>
      <div class="hot-list-bar">
        <div class="left-button" @click="nextActiveHotProduct(false)">
          <img src="/index/arrow-left.png" />
        </div>
        <div class="active-product-info">
          <h1 class="title ow-h1">{{ activeHotProductInfo.goodsName }}</h1>
        </div>
        <div class="right-button" @click="nextActiveHotProduct(true)">
          <img src="/index/arrow-right.png" />
        </div>
      </div>
    </section>
    <section class="diamond-gia">
      <div class="bg">
        <img src="/index/middle-gia.png" />
      </div>
      <div class="content">
        <h1 class="title">
          {{ $t(`${lang}.haveProfessionalCertificate`) }}
        </h1>
        <p class="description">
          {{ $t(`${lang}.professionalCertificateInfo`) }}
        </p>
        <div class="button-group">
          <nuxt-link :to="{ path: '/education/diamonds/certification' }">
            <button class="check-now">
              {{ $t(`${lang}.startYourDiamondCheck`) }}
            </button>
          </nuxt-link>
        </div>
      </div>
    </section>

    <!--    钻石类型-->
    <section class="diamond">
      <h1 class="section-title">
        {{ $t(`${lang}.chooseYourDiamond`) }}
      </h1>
      <div class="section-title-line"></div>
      <h2 class="section-sub-title">
        {{ $t(`${lang}.360DiamondInfo`) }}
      </h2>
      <div class="diamond-list" :style="{ height: diamondItemWidth + 'px' }">
        <swiper
          ref="diamond-list"
          :item-width="20"
          :scale="true"
          :scale-multiple="1.5"
          :indicator="false"
          @change="changeActiveDiamond"
        >
          <div v-for="(diamond, n) in diamonds" :key="n" class="product-item">
            <nuxt-link :to="diamond.to">
              <div class="product-image">
                <img class="product-image" :src="diamond.img" />
              </div>
            </nuxt-link>
          </div>
        </swiper>
      </div>
      <div class="diamond-list-bar">
        <div class="left-button" @click="nextActiveDiamond(false)">
          <img src="/index/arrow-left.png" />
        </div>
        <div class="active-product-info">
          <h1 class="title ow-h1">{{ activeDiamondInfo.name }}</h1>
          <h2 class="sub-title ow-h1">{{ activeDiamondInfo.desc }}</h2>
        </div>
        <div class="right-button" @click="nextActiveDiamond(true)">
          <img src="/index/arrow-right.png" />
        </div>
      </div>
    </section>
    <section class="jewellery">
      <h1 class="jewellery-section-top">
        {{ $t(`${lang}.findYourSparkle`) }}
      </h1>
      <div class="section-content">
        <h1 class="section-title">
          {{ $t(`${lang}.jewelry`) }}
        </h1>
        <div class="section-title-line"></div>
        <h2 class="section-sub-title">
          {{ $t(`${lang}.goodForYouEverywhere`) }}
        </h2>
        <ul class="categories">
          <li class="item">
            <div class="bg-text">
              {{ $t(`${lang}.eternityRingsSlow`) }}
            </div>
            <div class="category">
              <div class="bg">
                <img src="/index/jewelry-1.png" />
              </div>
              <div class="info">
                <h3 class="name">{{ $t(`${lang}.eternalRing`) }}</h3>
                <p class="desc">{{ $t(`${lang}.eternityRingsInfo`) }}</p>
                <div class="button-group">
                  <nuxt-link :to="{ path: '/engagement-rings/all' }">
                    <button>{{ $t(`${lang}.explore`) }}</button>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </li>
          <li class="item">
            <div class="bg-text">
              {{ $t(`${lang}.menWedding`) }}
            </div>
            <div class="category">
              <div class="bg">
                <img src="/index/jewelry-2.png" />
              </div>
              <div class="info">
                <h3 class="name">{{ $t(`${lang}.menWeddingRings`) }}</h3>
                <p class="desc">{{ $t(`${lang}.menWeddingRingsInfo`) }}</p>
                <div class="button-group">
                  <nuxt-link :to="{ path: '/wedding-rings/mens-classic' }">
                    <button>{{ $t(`${lang}.discover`) }}</button>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </li>
          <li class="item">
            <div class="bg-text">
              {{ $t(`${lang}.diamondStuds`) }}
            </div>
            <div class="category">
              <div class="bg">
                <img src="/index/jewelry-3.png" />
              </div>
              <div class="info">
                <h3 class="name">{{ $t(`${lang}.diamondStudEarrings`) }}</h3>
                <p class="desc">{{ $t(`${lang}.diamondStudsInfo`) }}</p>
                <div class="button-group">
                  <nuxt-link :to="{ path: '/jewellery/all' }">
                    <button>{{ $t(`${lang}.browse`) }}</button>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="waiting-you">
      <h1 class="section-title">
        {{ $t(`${lang}.yourDiamondWaiting`) }}
      </h1>
      <div class="section-title-line"></div>
      <div class="section-content">
        <div class="item left-item">
          <div class="picture">
            <img src="/index/shop-left.png" />
          </div>
          <div class="content">
            <h2 class="sub-title">{{ $t(`${lang}.understand`) }}</h2>
            <h1 class="title">{{ $t(`${lang}.brandStory`) }}</h1>
            <p class="desc">
              {{ $t(`${lang}.witnessContentFirstLine`) }}<br />
              {{ $t(`${lang}.witnessContentSecondLine`) }}<br />
              {{ $t(`${lang}.witnessContentThirdLine`) }}
            </p>
            <div class="button-group">
              <nuxt-link :to="{ path: '/policies/quality-value' }">
                <button>{{ $t(`${lang}.scheduleAppointment`) }}</button>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="item right-item">
          <div class="content">
            <h2 class="sub-title">{{ $t(`${lang}.expertLevel`) }}</h2>
            <h1 class="title">{{ $t(`${lang}.customerService`) }}</h1>
            <p class="desc">
              {{ $t(`${lang}.customerServiceInfo`) }}
            </p>
            <div class="button-group">
              <nuxt-link :to="{ path: '/contact-us' }">
                <button>{{ $t(`${lang}.contactUs`) }}</button>
              </nuxt-link>
            </div>
          </div>
          <div class="picture">
            <img src="/index/shop-right.png" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryIndexPage from '@/mixins/category-index-page.js'
import Interactive from '@/pageComponents/index/interactive.vue'
const lang = 'index'
export default {
  head() {
    return this.seoInfo || {}
  },
  components: {
    Interactive
  },
  mixins: [CategoryIndexPage],
  data() {
    return {
      lang,
      recommendCategories: [
        {
          title: this.$t(`${lang}.engagementRings`),
          subTitle: '',
          bgImage: '/index/recommend-category-1.png',
          to: {
            path: '/engagement-rings'
          }
        },
        {
          title: this.$t(`${lang}.weddingAnd`),
          subTitle: this.$t(`${lang}.anniversary`),
          bgImage: '/index/recommend-category-2.png',
          to: {
            path: '/wedding-rings'
          }
        },
        {
          title: this.$t(`${lang}.fineJewelry`),
          subTitle: '',
          bgImage: '/index/recommend-category-3.png',
          to: {
            path: '/jewellery/all'
          }
        }
      ],
      hotProductItemWidth: 0,
      activeHotProductIndex: 0,

      diamonds: [
        {
          id: '18',
          name: this.$t(`${lang}.round`),
          desc: this.$t(`${lang}.roundDesc`),
          img: '/index/round.png',
          to: {
            path: '/diamonds/round-cut'
          }
        },
        {
          id: '19',
          name: this.$t(`${lang}.princessSquare`),
          desc: this.$t(`${lang}.princessSquareDesc`),
          img: '/index/pincess.png',
          to: {
            path: '/diamonds/princess-cut'
          }
        },
        {
          id: '20',
          name: this.$t(`${lang}.octagonalTrapezoid`),
          desc: this.$t(`${lang}.octagonalTrapezoidDesc`),
          img: '/index/emerald.png',
          to: {
            path: '/diamonds/emerald-cut'
          }
        },
        {
          id: '21',
          name: this.$t(`${lang}.laserSquare`),
          desc: this.$t(`${lang}.laserSquareDesc`),
          img: '/index/asscher.png',
          to: {
            path: '/diamonds/asscher-cut'
          }
        },
        {
          id: '22',
          name: this.$t(`${lang}.pincushion`),
          desc: this.$t(`${lang}.pincushionDesc`),
          img: '/index/cushion.png',
          to: {
            path: '/diamonds/cushion-cut'
          }
        },
        {
          id: '23',
          name: this.$t(`${lang}.marquise`),
          desc: this.$t(`${lang}.marquiseDesc`),
          img: '/index/marquise.png',
          to: {
            path: '/diamonds/marquise-cut'
          }
        },
        {
          id: '24',
          name: this.$t(`${lang}.octagonalLaser`),
          desc: this.$t(`${lang}.octagonalLaserDesc`),
          img: '/index/radiant.png',
          to: {
            path: '/diamonds/radiant-cut'
          }
        },
        {
          id: '25',
          name: this.$t(`${lang}.oval`),
          desc: this.$t(`${lang}.ovalDesc`),
          img: '/index/oval.png',
          to: {
            path: '/diamonds/oval-cut'
          }
        },
        {
          id: '26',
          name: this.$t(`${lang}.dropShape`),
          desc: this.$t(`${lang}.dropShapeDesc`),
          img: '/index/pear.png',
          to: {
            path: '/diamonds/pear-shaped'
          }
        },
        {
          id: '27',
          name: this.$t(`${lang}.heartShaped`),
          desc: this.$t(`${lang}.heartShapedDesc`),
          img: '/index/heart.png',
          to: {
            path: '/diamonds/heart-shaped'
          }
        }
      ],
      diamondItemWidth: 0,
      activeDiamondIndex: 0
    }
  },
  computed: {
    hotProductInfo() {
      const webSite = JSON.parse(
        JSON.stringify(this.webSite && this.webSite[0] ? this.webSite[0] : [])
      )

      const result = {
        title: webSite.moduleTitle
      }
      const products = []

      if (webSite.moduleGoods) {
        webSite.moduleGoods.forEach(item => {
          const product = item.goods
          product.showType = webSite.showType
          product.goodsImages = this.imageStrToArray(product.goodsImages || '')
          // 删除后端无故增加的一层嵌套
          product.configAttriEntity = product.configAttriEntity[product.id]
          product.to = {
            path: `/ring/engagement-rings/${product.goodsName.replace(
              /\//g,
              ''
            )}`,
            query: {
              goodId: product.id,
              ringType: 'engagement'
            }
          }

          products.push(product)
        })
      }
      result.products = products
      return result
    },
    activeHotProductInfo() {
      return this.hotProductInfo.products[this.activeHotProductIndex] || {}
    },
    activeDiamondInfo() {
      return this.diamonds[this.activeDiamondIndex] || {}
    }
  },
  async asyncData({ $axios, route, store, app }) {
    const seoInfo = await app.$getSeoInfo(1)

    return $axios({
      method: 'get',
      url: '/web/Website/queryWebsiteModule',
      params: {
        type: 1
      }
    })
      .then(data => {
        return {
          ad: data.advert,
          webSite: data.webSite,
          seoInfo
        }
      })
      .catch(err => {
        console.error(err)
      })
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      console.log('this is index.vue')
    })
  },
  methods: {
    // 页面尺寸改变时触发重新计算
    screenResize() {
      const _this = this
      _this.resetBannerSize()
      _this.hotProductItemWidth = document.body.clientWidth / 5
      _this.diamondItemWidth = document.body.clientWidth / 5
    },
    changeActiveHotProduct(data) {
      this.activeHotProductIndex = data.index
    },
    nextActiveHotProduct(type) {
      this.$refs['hot-product-list'].goNext(type)
    },
    changeActiveDiamond(data) {
      this.activeDiamondIndex = data.index
    },
    nextActiveDiamond(type) {
      this.$refs['diamond-list'].goNext(type)
    }
  }
}
</script>

<style scoped lang="less">
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
    width: 100%;
    height: 100%;
    line-height: 0;
    font-size: 0;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.design {
  padding-top: 87px;
  background: rgba(255, 252, 247, 1);
  overflow-x: hidden;

  .section-title {
    font-size: 36px;
    font-weight: 400;
    color: #666666;
  }

  .section-sub-title {
    font-size: 14px;
    font-weight: 400;
    color: #666666;
  }
}

.recommend-category {
  width: 100%;
  padding: 56px 0 59px 0;
  background: #ffffff;
  overflow-x: hidden;

  .categories {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .category-item {
      flex-grow: 1;
      flex-shrink: 1;
      position: relative;
      margin-right: 30px;

      &:nth-last-of-type(1) {
        margin-right: 0;
      }

      .bg {
        position: relative;
        font-size: 0;
        line-height: 0;

        img {
          width: 100%;
        }
        .hover-cover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #000000;
          opacity: 0;
          transition: opacity 0.3s linear;
        }
      }
      .info {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        height: 37%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;

        .title {
          font-size: 48px;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
          cursor: pointer;
        }
        .sub-title {
          font-size: 48px;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
          cursor: pointer;
        }
        .info-border-line {
          position: absolute;
          background: #ffffff;
          transition: all 0.3s ease-in;
        }
        .border-t {
          top: 0;
          right: 0;
          width: 0;
          height: 1px;
        }
        .border-r {
          bottom: 0;
          right: 0;
          width: 1px;
          height: 0;
        }
        .border-b {
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
        }
        .border-l {
          top: 0;
          left: 0;
          width: 1px;
          height: 0;
        }
      }

      &:hover {
        .bg {
          .hover-cover {
            opacity: 0.18;
          }
        }
        .info {
          .border-t {
            width: 100%;
          }
          .border-r {
            height: 100%;
          }
          .border-b {
            width: 100%;
          }
          .border-l {
            height: 100%;
          }
        }
      }
    }
  }
}

.hot {
  padding-top: 53px;
  background-color: #fbf8f3;
  overflow-x: hidden;

  .hot-list {
    width: 100%;
    background-color: #ffffff;
    margin-top: -15px;
    padding: 6% 0 6% 0;

    .product-item {
      .product-image {
        font-size: 0;
        line-height: 0;

        .product-image {
          width: 100%;
        }
      }
    }
  }
  .hot-list-bar {
    padding-bottom: 119px;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .left-button,
    .right-button {
      font-size: 0;
      line-height: 0;
      cursor: pointer;
      img {
        width: 64px;
      }
    }

    .active-product-info {
      margin: 0 20px;
      width: 473px;

      .title {
        font-size: 24px;
        font-weight: 400;
        color: #333333;
        text-align: center;
      }
    }
  }
}
.diamond-gia {
  overflow-x: hidden;
  position: relative;

  .bg {
    font-size: 0;
    line-height: 0;

    img {
      width: 100%;
    }
  }

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 33%;
    transform: translate(0, -50%);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    .title {
      flex-grow: 93;
      margin-bottom: 50px;
      font-size: 36px;
      font-weight: 400;
      color: #000000;
    }
    .description {
      flex-grow: 258;
      margin-bottom: 40px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
    }
    .button-group {
      flex-grow: 43;
      .check-now {
        width: 361px;
        height: 43px;
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
        background: rgba(207, 195, 189, 1);
        cursor: pointer;
      }
    }
  }
}

.diamond {
  padding-top: 41px;
  background-color: #ffffff;
  overflow-x: hidden;

  .section-title-line {
    margin-bottom: 20px;
  }

  .diamond-list {
    width: 100%;
    padding: 3% 0 5% 0;
    box-sizing: content-box;
    background-color: #ffffff;

    .product-item {
      .product-image {
        font-size: 0;
        line-height: 0;

        .product-image {
          width: 100%;
        }
      }
    }
  }
  .diamond-list-bar {
    padding-bottom: 119px;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .left-button,
    .right-button {
      font-size: 0;
      line-height: 0;
      cursor: pointer;
      img {
        width: 64px;
      }
    }

    .active-product-info {
      margin: 0 20px;
      width: 473px;

      .title {
        margin-bottom: 10px;
        font-size: 24px;
        font-weight: 400;
        color: #333333;
        text-align: center;
      }
      .sub-title {
        font-size: 18px;
        font-weight: 400;
        color: #333333;
        text-align: center;
      }
    }
  }
}

.jewellery {
  overflow-x: hidden;

  .jewellery-section-top {
    height: 172px;
    font-size: 180px;
    font-weight: bold;
    color: #fbf8f3;
    text-align: center;
    white-space: nowrap;
  }

  .section-content {
    margin-top: -37px;
    padding-top: 92px;
    padding-bottom: 105px;
    background-color: #fbf8f3;

    .section-title {
      margin-bottom: 20px;
    }
    .section-title-line {
      margin-bottom: 20px;
    }
    .section-sub-title {
      width: 550px;
      margin: auto;
      padding-bottom: 130px;
      font-size: 18px;
      font-weight: 400;
      color: #333333;
      line-height: 28px;
    }
    .categories {
      list-style: none;

      .item {
        position: relative;

        .bg-text {
          position: absolute;
          font-size: 130px;
          font-weight: 400;
          font-family: SimSun;
          color: #f4eeea;
          white-space: nowrap;
          line-height: 1;
        }
        .category {
          position: relative;

          .bg {
            width: 100%;
            font-size: 0;
            line-height: 0;

            img {
              width: 100%;
            }
          }

          .info {
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            box-sizing: border-box;
            background: rgba(255, 255, 255, 0.8);
            padding: 7.6% 7.2% 3.8% 12.4%;

            .name {
              font-size: 24px;
              font-weight: 400;
              color: #333333;
            }
            .desc {
              font-size: 14px;
              font-weight: 400;
              color: #333333;
              line-height: 29px;
            }
            .button-group {
              button {
                height: 42px;
                padding: 0 20px;
                font-size: 16px;
                font-weight: bold;
                color: #ffffff;
                background: #d4bfb5;
                cursor: pointer;
              }
            }
          }
        }

        &:nth-of-type(1) {
          .bg-text {
            left: 0;
            bottom: 23.3%;
          }
          .category {
            width: 35.2%;
            margin-left: 20.3%;

            .info {
              /*top: 10.2%;*/
              left: -28.6%;
              width: 65.2%;
              /*height: 75.7%;*/

              .name {
                margin-bottom: 9%;
              }
              .desc {
                margin-bottom: 26.1%;
              }
            }
          }
        }
        &:nth-of-type(2) {
          .bg-text {
            left: 64.6%;
            bottom: -15.2%;
          }
          .category {
            width: 34.1%;
            margin-left: 55.5%;

            .info {
              /*top: 10.2%;*/
              left: -28.6%;
              width: 65.2%;
              /*height: 75.7%;*/

              .name {
                margin-bottom: 9%;
              }
              .desc {
                margin-bottom: 26.1%;
              }
            }
          }
        }
        &:nth-of-type(3) {
          .bg-text {
            left: 3.3%;
            bottom: 0;
          }
          .category {
            width: 35.2%;
            margin-left: 20.3%;

            .info {
              /*top: 10.2%;*/
              left: -28.6%;
              width: 65.2%;
              /*height: 75.7%;*/

              .name {
                margin-bottom: 9%;
              }
              .desc {
                margin-bottom: 26.1%;
              }
            }
          }
        }
      }
    }
  }
}

.waiting-you {
  padding: 74px 0 60px 0;

  .section-title-line {
    margin-bottom: 76px;
  }
  .section-content {
    min-width: 1360px;
    max-width: 1550px;
    margin: auto;
    display: flex;
    justify-content: center;

    .item {
      width: 48%;
      margin-right: 30px;
      display: flex;
      flex-direction: row;
      align-items: center;

      &:nth-last-of-type(1) {
        margin-right: 0;
      }

      .picture {
        flex-grow: 0;
        flex-shrink: 0;
        width: 42.9%;
        height: 100%;
        font-size: 0;
        line-height: 0;

        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        flex-grow: 1;
        flex-shrink: 1;
        height: calc(100% - 150px);
        border: 1px solid #ffffff;
        box-sizing: border-box;
        padding: 5% 3.7% 5.5% 3.7%;

        display: flex;
        flex-direction: column;
        justify-content: center;

        .sub-title {
          flex-grow: 0;
          flex-shrink: 0;
          font-size: 24px;
          font-weight: 400;
          color: #333333;
          margin-bottom: 5px;
        }
        .title {
          flex-grow: 0;
          flex-shrink: 0;
          font-size: 29px;
          font-weight: 400;
          color: #333333;
          margin-bottom: 15px;
        }
        .desc {
          flex-grow: 1;
          flex-shrink: 1;
          font-size: 14px;
          font-weight: 400;
          color: #333333;
          line-height: 24px;
        }
        .button-group {
          flex-grow: 0;
          flex-shrink: 0;
          button {
            height: 42px;
            padding: 0 20px;
            background: #d4b5b5;
            font-size: 12px;
            font-weight: 400;
            color: #ffffff;
            cursor: pointer;
          }
        }
      }

      &.left-item {
        background-color: #f0e2da;

        .content {
          margin-right: 20px;
          border-left: 0;
          text-align: right;
        }
      }

      &.right-item {
        background-color: #f4eade;

        .content {
          margin-left: 20px;
          border-right: 0;
          text-align: left;
        }
      }
    }
  }
}
</style>
