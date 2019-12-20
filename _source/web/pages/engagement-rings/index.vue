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
                <span>{{ $t(`${lang}.engagementRings`) }}</span>
              </div>
              <div class="content-sub-title">
                {{ $t(`${lang}.designPromptFirstLine`) }}<br />
                {{ $t(`${lang}.designPromptSecondLine`) }}
              </div>
              <div class="icon-group">
                <span class="icon">
                  <i class="iconfont iconstar-jt"></i>
                </span>
                <span class="symbol">+</span>
                <span class="icon">
                  <i class="iconfont iconicon-zuanshi"></i>
                </span>
                <span class="symbol">=</span>
                <span class="icon">
                  <i class="iconfont iconJewelry-made-ring"></i>
                </span>
              </div>
              <div class="button-group">
                <nuxt-link :to="{ path: $startDj(2) }">
                  <button class="margin-bottom-30">
                    {{ $t(`${lang}.choiceFirst`) }}
                  </button>
                </nuxt-link>
                <nuxt-link :to="{ path: $startDj(1) }">
                  <button>{{ $t(`${lang}.diamondFirst`) }}</button>
                </nuxt-link>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>
    <section class="design">
      <h1 class="section-title">
        {{ $t(`${lang}.howToDesignEngagementRing`) }}
      </h1>
      <div class="section-title-line"></div>
      <div class="section-content">
        <div class="design-area">
          <div class="box">
            <i class="icon iconfont" @click="swiperPrev(0)">&#xe663;</i>
            <div class="ring-swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <img src="/engagement-rings/design/ring1.png" />
                </div>
                <div class="swiper-slide">
                  <img src="/engagement-rings/design/ring2.png" />
                </div>
                <div class="swiper-slide">
                  <img src="/engagement-rings/design/ring3.png" />
                </div>
              </div>
            </div>
            <i class="icon iconfont" @click="swiperNext(0)">&#xe652;</i>
          </div>
          <span>&</span>
          <div class="box">
            <i class="icon iconfont" @click="swiperPrev(1)">&#xe663;</i>
            <div class="diamond-swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <img src="/engagement-rings/design/diamond1.jpg" />
                </div>
                <div class="swiper-slide">
                  <img src="/engagement-rings/design/diamond2.jpg" />
                </div>
                <div class="swiper-slide">
                  <img src="/engagement-rings/design/diamond3.jpg" />
                </div>
              </div>
            </div>
            <i class="icon iconfont" @click="swiperNext(1)">&#xe652;</i>
          </div>
          <span>=</span>
          <div class="box">
            <nuxt-link :to="{ path: '/engagement-rings/all' }">
              <img :src="addmeile" />
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <section class="design-your-ring">
      <h1 class="section-title">
        {{ recommendRings.title }}
      </h1>
      <div class="section-title-line"></div>
      <div class="section-content">
        <div class="certify">
          <div class="certify-swiper-container">
            <div class="swiper-wrapper">
              <div
                v-for="(item, index) in recommendRings.products"
                :key="index"
                class="swiper-slide"
              >
                <div class="image">
                  <img :src="item.goodsImages[0]" />
                </div>
                <div class="price">
                  {{ item.coinType }}
                  {{ formatMoney(item.salePrice) }}
                </div>
                <div class="name">{{ item.goodsName }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="more">
          <nuxt-link :to="{ path: '/engagement-rings/all' }">
            <button>{{ $t(`${lang}.more`) }}</button>
            <img src="/wedding-rings/arrow-right.png" />
          </nuxt-link>
        </div>
      </div>
    </section>
    <section class="believe-us">
      <h1 class="section-title">
        {{ $t(`${lang}.whyBelieveBdd`) }}
      </h1>
      <div class="section-title-line"></div>
      <div class="section-content">
        <ul class="our-advantage">
          <li class="advantage">
            <div class="advantage-image">
              <img src="/engagement-rings/believe-us/zhengshu.png" />
            </div>
            <div class="advantage-info">
              <h2 class="name">{{ $t(`${lang}.profession`) }}</h2>
              <p class="desc">{{ $t(`${lang}.professionDesc`) }}</p>
              <div class="other">
                <nuxt-link :to="{ path: '/education/diamonds/carat' }">
                  {{ $t(`${lang}.moreProfessionInfo`) }}
                </nuxt-link>
              </div>
            </div>
          </li>
          <li class="advantage">
            <div class="advantage-image">
              <img src="/engagement-rings/believe-us/xingjiabi.png" />
            </div>
            <div class="advantage-info">
              <h2 class="name">{{ $t(`${lang}.valueForMoney`) }}</h2>
              <p class="desc">{{ $t(`${lang}.valueForMoneyDesc`) }}</p>
              <div class="other">
                <nuxt-link :to="{ path: '/contact-us' }">
                  {{ $t(`${lang}.moreValueForMoneyInfo`) }}
                </nuxt-link>
              </div>
            </div>
          </li>
          <li class="advantage">
            <div class="advantage-image">
              <img src="/engagement-rings/believe-us/baozhi.png" />
            </div>
            <div class="advantage-info">
              <h2 class="name">{{ $t(`${lang}.warranty`) }}</h2>
              <p class="desc">{{ $t(`${lang}.warrantyDesc`) }}</p>
              <div class="other">
                <nuxt-link :to="{ path: '/policies/quality-value' }">
                  {{ $t(`${lang}.moreWarrantyInfo`) }}
                </nuxt-link>
              </div>
            </div>
          </li>
          <li class="advantage">
            <div class="advantage-image">
              <img src="/engagement-rings/believe-us/shouh.png" />
            </div>
            <div class="advantage-info">
              <h2 class="name">{{ $t(`${lang}.afterSale`) }}</h2>
              <p class="desc">{{ $t(`${lang}.afterSaleDesc`) }}</p>
              <div class="other">
                <nuxt-link :to="{ path: '/policies/return-refund-policy' }">
                  {{ $t(`${lang}.moreAfterSaleInfo`) }}
                </nuxt-link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryIndexPage from '@/mixins/category-index-page.js'
const lang = 'engagementRing'
export default {
  head() {
    return this.seoInfo || {}
  },
  mixins: [CategoryIndexPage],
  data() {
    return {
      lang,
      ringSwiper: null,
      diamondSwiper: null,
      certifySwiper: null,
      addmeile: '/engagement-rings/design/add2.jpg',
      addmeiles: [
        '/engagement-rings/design/add1.jpg',
        '/engagement-rings/design/add2.jpg',
        '/engagement-rings/design/add3.jpg'
      ]
    }
  },
  computed: {
    recommendRings() {
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
    }
  },
  async asyncData({ $axios, route, store, app }) {
    const seoInfo = await app.$getSeoInfo(2)

    return $axios({
      method: 'get',
      url: '/web/Website/queryWebsiteModule',
      params: {
        type: 2
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
    _this.$nextTick(() => {
      const Swiper = require('swiper/dist/js/swiper.js')
      _this.ringSwiper = new Swiper('.ring-swiper-container', {
        direction: 'vertical',
        mousewheelControl: true,
        mousewheelInvert: true,
        slidesPerView: 3,
        loop: true,
        onSetTransition: () => {
          setTimeout(() => {
            const swiper = _this.ringSwiper
            const index = swiper.realIndex + 1 > 2 ? 0 : swiper.realIndex + 1
            _this.addmeile = _this.addmeiles[index]
          }, 100)
        }
      })

      _this.diamondSwiper = new Swiper('.diamond-swiper-container', {
        direction: 'vertical',
        mousewheelControl: true,
        mousewheelInvert: true,
        slidesPerView: 3,
        loop: true,
        onSetTransition: () => {
          setTimeout(() => {
            // const swiper = _this.ringSwiper
          }, 100)
        }
      })

      _this.certifySwiper = new Swiper('.certify-swiper-container', {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        slideToClickedSlide: true,
        onSlideChangeStart(swiper) {
          for (let i = 0; i < swiper.slides.length; i++) {
            const slide = swiper.slides.eq(i)
            if (swiper.activeIndex === i) {
              slide[0].children[1].style.opacity = 1
              slide[0].children[2].style.opacity = 1
            } else {
              slide[0].children[1].style.opacity = 0
              slide[0].children[2].style.opacity = 0
            }
          }
        },
        onProgress(swiper) {
          // 监听滚动
          for (let i = 0; i < swiper.slides.length; i++) {
            const slide = swiper.slides.eq(i)
            const slideProgress = swiper.slides[i].progress
            let modify = 1
            if (Math.abs(slideProgress) > 1) {
              modify = (Math.abs(slideProgress) - 1) * 0.3 + 1
            }
            let translateY = slideProgress * 60
            translateY = translateY > 0 ? -translateY : translateY

            const translate = slideProgress * modify * 200 + 'px'
            const scale = 1 - Math.abs(slideProgress) / 5
            const zIndex = 999 - Math.abs(Math.round(10 * slideProgress))
            slide.transform(
              'translateX(' +
                translate +
                ') translateY(' +
                translateY +
                'px) scale(' +
                scale +
                ')'
            )
            slide.css('zIndex', zIndex)
            // slide.css('opacity', 1)
            slide.css(
              'opacity',
              slideProgress > 2 || slideProgress < -2 ? 0 : 1
            )
            if (Math.abs(slideProgress) > 3) {
              slide.css('opacity', 0)
              slide[0].children[0].style.opacity = 0
            } else {
              let opacity = scale
              if (opacity === 0.8) {
                opacity = 0.6
              } else if (opacity === 0.6) {
                opacity = 0.5
              }
              slide[0].children[0].style.opacity = opacity
            }
          }
          for (let i = 0; i < swiper.slides.length; i++) {
            const slide = swiper.slides.eq(i)
            if (swiper.activeIndex === i) {
              slide[0].children[1].style.opacity = 1
              slide[0].children[2].style.opacity = 1
            } else {
              slide[0].children[1].style.opacity = 0
              slide[0].children[2].style.opacity = 0
            }
          }
        },
        onSetTransition(swiper, transition) {
          for (let i = 0; i < swiper.slides.length; i++) {
            const slide = swiper.slides.eq(i)
            slide.transition(transition)
          }
        },
        onTap: swiper => {
          // 获取点击事件
          const product =
            _this.recommendRings.products[swiper.realIndex] || null
          if (!product) {
            return
          }
          if (product.showType === 1) {
            window.open(_this.routeDataToUrl(product.to))
          } else {
            _this.$router.push(product.to)
          }
        }
      })

      setTimeout(() => {
        _this.certifySwiper.updateProgress()
      }, 200)
    })
  },
  methods: {
    swiperPrev(type) {
      if (type === 0) {
        this.ringSwiper.slidePrev()
      } else {
        this.diamondSwiper.slidePrev()
      }
    },
    swiperNext(type) {
      if (type === 0) {
        this.ringSwiper.slideNext()
      } else {
        this.diamondSwiper.slideNext()
      }
    },
    more() {
      this.$router.push({
        path: '/engagement-rings/all'
      })
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
      left: 60%;
      max-width: 600px;
      transform: translate(0, -50%);

      .content-title {
        margin-bottom: 18px;
        font-size: 48px;
        font-family: twCenMt;
        font-weight: 400;
        color: rgba(114, 80, 80, 1);
        text-align: center;
      }

      .content-sub-title {
        margin-bottom: 30px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(114, 80, 80, 1);
        text-align: center;
      }

      .icon-group {
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon {
          display: inline-block;
          width: 33px;
          height: 33px;
          border-radius: 50%;
          background: #fff;
          text-align: center;
          line-height: 33px;

          .iconfont {
            color: #edbbb5;
            font-size: 17px;
          }
        }

        .symbol {
          color: #fff;
          margin-left: 2px;
          margin-right: 2px;
          height: 33px;
          vertical-align: middle;
          line-height: 33px;
          display: inline-block;
          font-size: 20px;
          font-weight: 700;
        }
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
          color: rgba(114, 80, 80, 1);
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 2px 0px 0px rgba(243, 224, 219, 1);
        }
      }
    }
  }
}

.design {
  padding: 60px 0 77px 0;

  .section-title-line {
    margin-bottom: 40px;
  }
  .section-content {
    width: 1366px;
    margin: 0 auto;

    .design-area {
      margin: 0 auto;
      width: 1360px;

      .box {
        position: relative;
        i {
          position: absolute;
          left: 40px;
          cursor: pointer;
          color: #656565;
          z-index: 11;
          font-size: 15px;
        }
        i:first-child {
          top: 70px;
        }
        i:last-child {
          bottom: 70px;
        }
      }
      .box:nth-child(3) {
        i {
          left: initial;
          right: 40px;
        }
      }
      img {
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -ms-transition: all 0.3s;
        transition: all 0.3s;
      }
      .ring-swiper-container,
      .diamond-swiper-container {
        height: 420px;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        &:before {
          content: '';
          height: 1px;
          position: absolute;
          width: 244px;
          left: 58px;
          top: 130px;
          z-index: 1;
          box-shadow: 0px -3px 7px #d0d0d0;
        }
        &:after {
          content: '';
          height: 1px;
          position: absolute;
          width: 244px;
          left: 58px;
          top: 290px;
          z-index: 1;
          box-shadow: 0px 3px 7px #d0d0d0;
        }
        .swiper-slide {
          text-align: center;

          img {
            transform: scale(0.6, 0.6);
            display: inline-block;
          }

          &.swiper-slide-next {
            img {
              transform: scale(1, 1);
            }
          }
        }
      }
      > div {
        width: 360px;
        height: 420px;
        box-shadow: 0 1px 5px #ddd;
        display: inline-block;
        vertical-align: top;
        &:nth-child(5) {
          img {
            cursor: pointer;
            height: 420px;
          }
        }
      }
      > span {
        height: 420px;
        font-size: 51px;
        color: #d6d2c3;
        font-family: twCenMt;
        display: inline-block;
        vertical-align: top;
        line-height: 420px;
        margin-left: 45px;
        margin-right: 45px;
      }
    }
  }
}

.design-your-ring {
  padding: 60px 0;
  background-color: #fafaf4;

  .section-title-line {
    margin-bottom: 40px;
  }

  .section-content {
    position: relative;
    width: 1366px;
    margin: 0 auto;

    .certify {
      position: relative;
      width: 1360px;
      margin: 0 auto;
      .swiper-container {
        padding-top: 60px;
        padding-bottom: 57px;
      }

      .swiper-slide {
        width: 520px;
        height: 420px;
        padding: 45px 50px 40px 50px;
        box-sizing: border-box;
        background: #fff;
        box-shadow: 0 1px 10px #ddd;
        cursor: pointer;

        .image {
          position: relative;
          line-height: 0;
          font-size: 0;
          text-align: center;
          height: 289px;
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 100%;
            max-height: 100%;
          }
        }
        .price {
          text-align: center;
          color: #f29b87;
          font-size: 24px;
          font-weight: 300;
          margin-bottom: 15px;
          font-family: twCenMt;
          -webkit-transition: all 0.2s ease-in-out;
          -moz-transition: all 0.2s ease-in-out;
          -ms-transition: all 0.2s ease-in-out;
          transition: all 0.2s ease-in-out;
        }
        .name {
          text-align: center;
          color: #333333;
          font-size: 14px;
          -webkit-transition: all 0.2s ease-in-out;
          -moz-transition: all 0.2s ease-in-out;
          -ms-transition: all 0.2s ease-in-out;
          transition: all 0.2s ease-in-out;
        }
      }
    }

    .more {
      position: absolute;
      bottom: 27px;
      right: 5px;
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
        cursor: pointer;
      }
      img {
        margin-left: -35px;
      }
    }
  }
}

.believe-us {
  padding: 60px 0;

  .section-title-line {
    margin-bottom: 40px;
  }

  .section-content {
    .our-advantage {
      width: 1366px;
      margin: 0 auto;
      list-style: none;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .advantage {
        width: 300px;

        display: flex;
        flex-direction: column;
        align-items: stretch;

        .advantage-image {
          flex-grow: 0;
          flex-shrink: 0;
          width: 100%;
          height: 200px;
          line-height: 0;
          font-size: 0;
          overflow: hidden;

          img {
            width: 100%;
            transform: scale(1, 1);
            transition: all 0.2s linear;
          }
        }

        .advantage-info {
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
          .advantage-image {
            img {
              transform: scale(1.2, 1.2);
            }
          }
        }
      }
    }
  }
}
</style>
