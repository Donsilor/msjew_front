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
                <span>{{ $t(`${lang}.weddingRings`) }}</span>
              </div>
              <div class="content-sub-title">
                {{ $t(`${lang}.weddingRingContent`) }}
              </div>
              <div class="button-group">
                <nuxt-link :to="{ path: '/wedding-rings/all' }">
                  <button class="margin-bottom-30">
                    {{ $t(`${lang}.myWeddingRing`) }}
                  </button>
                </nuxt-link>
                <nuxt-link :to="{ path: '/wedding-rings/classic-series' }">
                  <button>{{ $t(`${lang}.ourWeddingRing`) }}</button>
                </nuxt-link>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>
    <section class="recommend-pair-ring">
      <h1 class="section-title">
        {{ recommendPairRingInfo.moduleTitle }}
      </h1>
      <div class="section-title-line"></div>
      <ul class="list">
        <li
          v-for="(product, index) in recommendPairRingInfo.moduleGoods"
          :key="index"
          class="item"
        >
          <a
            v-if="product.showType === 1"
            :href="routeDataToUrl(product.to)"
            target="_blank"
          >
            <div class="image">
              {{ product.ringImg }}
              <img :src="product.ringImg && product.ringImg[0]" />
            </div>
            <div class="price ow-h1">
              {{ product.coinType }} {{ product.salePrice }}
            </div>
            <div class="name ow-h1">
              {{ product.name }}
            </div>
          </a>
          <nuxt-link v-else :to="product.to">
            <div class="image">
              {{ product.ringImg }}
              <img :src="product.ringImg && product.ringImg[0]" />
            </div>
            <div class="price ow-h1">
              {{ product.coinType }} {{ product.salePrice }}
            </div>
            <div class="name ow-h1">
              {{ product.name }}
            </div>
          </nuxt-link>
        </li>
      </ul>
      <div class="button-group">
        <nuxt-link :to="{ path: '/wedding-rings/classic-series' }">
          <button class="more">{{ $t(`${lang}.morePairRings`) }}</button>
        </nuxt-link>
      </div>
    </section>
    <section class="recommend-ring">
      <h1 class="section-title">
        {{ recommendLadyRingInfo.moduleTitle }}
      </h1>
      <div class="section-title-line"></div>
      <div class="recommend-category lady-ring">
        <div class="bg">
          <img src="/wedding-rings/lady.png" />
        </div>
        <div class="bg-content">
          <div class="title-logo">
            <img src="/wedding-rings/logo-lady.png" />
          </div>
          <div class="title">
            {{ recommendLadyRingInfo.title }}
          </div>
          <div class="sub-title">
            {{ recommendLadyRingInfo.recommendInfo }}
          </div>
        </div>
        <div class="products">
          <ul class="list">
            <li
              v-for="(product, index) in recommendLadyRingInfo.moduleGoods"
              :key="index"
              class="item"
            >
              <a
                v-if="product.showType === 1"
                target="_blank"
                :href="routeDataToUrl(product.to)"
              >
                <div class="image">
                  <img :src="product.goodsImages[0]" />
                </div>
              </a>
              <nuxt-link v-else :to="product.to">
                <div class="image">
                  <img :src="product.goodsImages[0]" />
                </div>
              </nuxt-link>
            </li>
          </ul>
          <div class="more">
            <nuxt-link :to="{ path: '/wedding-rings/womens-classic' }">
              <button>{{ $t(`${lang}.more`) }}</button>
              <img src="/wedding-rings/arrow-right.png" />
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="recommend-category men-ring">
        <div class="bg">
          <img src="/wedding-rings/men.png" />
        </div>
        <div class="bg-content">
          <div class="title-logo">
            <img src="/wedding-rings/logo-men.png" />
          </div>
          <div class="title">
            {{ recommendManRingInfo.title }}
          </div>
          <div class="sub-title">
            {{ recommendManRingInfo.recommendInfo }}
          </div>
        </div>
        <div class="products">
          <ul class="list">
            <li
              v-for="(product, index) in recommendManRingInfo.moduleGoods"
              :key="index"
              class="item"
            >
              <a
                v-if="product.showType === 1"
                target="_blank"
                :href="routeDataToUrl(product.to)"
              >
                <div class="image">
                  <img :src="product.goodsImages[0]" />
                </div>
              </a>
              <nuxt-link v-else :to="product.to">
                <div class="image">
                  <img :src="product.goodsImages[0]" />
                </div>
              </nuxt-link>
            </li>
          </ul>
          <div class="more">
            <nuxt-link :to="{ path: '/wedding-rings/mens-classic' }">
              <button>{{ $t(`${lang}.more`) }}</button>
              <img src="/wedding-rings/arrow-right.png" />
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="recommend-category wedding-ring">
        <div class="bg">
          <img src="/wedding-rings/jiehunzhinan.png" />
        </div>
        <div class="bg-content">
          <div class="title-logo">
            <img src="/wedding-rings/logo-wedding-rings.png" />
          </div>
          <div class="title">
            {{ $t(`${lang}.pairRingGuide`) }}
          </div>
          <div class="sub-title">
            {{ $t(`${lang}.howToChoosePairRing`) }}
            <br />
            {{ $t(`${lang}.howToMatchPairRing`) }}
          </div>
          <div class="button-group">
            <nuxt-link :to="{ path: '/education/rings/wedding-ring' }">
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
const lang = 'weddingRings'
export default {
  head() {
    return this.seoInfo || {}
  },
  mixins: [CategoryIndexPage],
  data() {
    return {
      lang
    }
  },
  computed: {
    recommendPairRingInfo() {
      // const _this = this
      const webSite = JSON.parse(
        JSON.stringify(this.webSite && this.webSite[0] ? this.webSite[0] : {})
      )

      if (webSite.moduleGoods && webSite.moduleGoods.length > 0) {
        const moduleGoods = []
        webSite.moduleGoods.forEach(item => {
          const productInfo = item.ring
          // 处理商品图片路径
          productInfo.ringImg = this.imageStrToArray(productInfo.ringImg || '')
          // 增加打开方式
          productInfo.showType = webSite.showType
          productInfo.to = {
            path: '/ring/wedding-rings/' + productInfo.name.replace(/\//g, ''),
            query: {
              goodId: productInfo.id,
              ringType: 'pair'
            }
          }

          moduleGoods.push(productInfo)
        })
        webSite.moduleGoods = moduleGoods
      } else {
        webSite.moduleGoods = []
      }
      return webSite
    },
    recommendLadyRingInfo() {
      // const _this = this
      const webSite = JSON.parse(
        JSON.stringify(this.webSite && this.webSite[1] ? this.webSite[1] : {})
      )

      if (webSite.moduleGoods && webSite.moduleGoods.length > 0) {
        const moduleGoods = []
        webSite.moduleGoods.forEach(item => {
          const productInfo = item.goods
          // 处理商品图片路径
          productInfo.goodsImages = this.imageStrToArray(
            productInfo.goodsImages || ''
          )
          // 增加打开方式
          productInfo.showType = webSite.showType
          productInfo.to = {
            path:
              '/ring/wedding-rings/' + productInfo.goodsName.replace(/\//g, ''),
            query: {
              goodId: productInfo.id,
              ringType: 'single'
            }
          }

          moduleGoods.push(productInfo)
        })
        webSite.moduleGoods = moduleGoods
      } else {
        webSite.moduleGoods = []
      }
      return webSite
    },
    recommendManRingInfo() {
      // const _this = this
      const webSite = JSON.parse(
        JSON.stringify(this.webSite && this.webSite[2] ? this.webSite[2] : {})
      )

      if (webSite.moduleGoods && webSite.moduleGoods.length > 0) {
        const moduleGoods = []
        webSite.moduleGoods.forEach(item => {
          const productInfo = item.goods
          // 处理商品图片路径
          productInfo.goodsImages = this.imageStrToArray(
            productInfo.goodsImages || ''
          )
          // 增加打开方式
          productInfo.showType = webSite.showType
          productInfo.to = {
            path:
              '/ring/wedding-rings/' + productInfo.goodsName.replace(/\//g, ''),
            query: {
              goodId: productInfo.id,
              ringType: 'single'
            }
          }

          moduleGoods.push(productInfo)
        })
        webSite.moduleGoods = moduleGoods
      } else {
        webSite.moduleGoods = []
      }
      return webSite
    }
  },
  async asyncData({ $axios, route, store, app }) {
    const seoInfo = await app.$getSeoInfo(3)

    return $axios({
      method: 'get',
      url: '/web/Website/queryWebsiteModule',
      params: {
        type: 3
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
  }
}
</script>

<style lang="less" scoped>
section {
  .section-title {
    position: relative;
    font-size: 24px;
    font-weight: 400;
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
      left: 25%;
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
        margin-bottom: 60px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(114, 80, 80, 1);
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
          color: rgba(114, 80, 80, 1);
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 2px 0px 0px rgba(243, 224, 219, 1);
        }
      }
    }
  }
}
.recommend-pair-ring {
  border-top: 30px solid #ffffff;
  padding: 55px 0 34px 0;
  background-color: #fefbf6;

  .list {
    width: 1366px;
    margin: 0 auto;
    padding: 30px 17px 36px 17px;
    box-sizing: border-box;
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .item {
      padding-bottom: 30px;
      background-color: #ffffff;
      box-shadow: 0 0 0 0 #f3eeec;
      transition: box-shadow 0.2s linear;

      .image {
        width: 320px;
        height: 320px;
        font-size: 0;
        line-height: 0;
        margin-bottom: 10px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          display: block;
          transform: scale(1, 1);
          transition: all 0.2s linear;
        }
      }
      .price {
        padding: 0 10px;
        margin-bottom: 10px;
        font-size: 24px;
        font-family: twCenMT;
        font-weight: 400;
        color: #ba9c90;
        text-align: center;
      }
      .name {
        padding: 0 10px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        text-align: center;
      }

      &:hover {
        box-shadow: 0 0 0 17px #f3eeec;
        .image {
          img {
            transform: scale(1.2, 1.2);
          }
        }
      }
    }
  }
  .button-group {
    text-align: center;

    .more {
      width: 152px;
      height: 34px;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      cursor: pointer;
      background: #c6c0b6;
      transition: background-color 0.2s linear;

      &:hover {
        background: #959189;
      }
    }
  }
}
.recommend-ring {
  padding-top: 53px;
  .section-title-line {
    margin-bottom: 47px;
  }
  .recommend-category {
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
      .title-logo {
        margin-bottom: 15px;
        font-size: 0;
        line-height: 0;
      }
      .title {
        margin-bottom: 25px;
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
      .sub-title {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 24px;
        color: #333333;
      }
    }
    .products {
      display: flex;
      flex-direction: row;
      .list {
        list-style: none;
        display: flex;
        flex-direction: row;
        .item {
          position: relative;
          width: 240px;
          height: 280px;
          margin-right: 30px;
          background-color: #ffffff;
          box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
          .image {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 240px;
            font-size: 0;
            line-height: 0;
            overflow: hidden;
            img {
              max-width: 100%;
              max-height: 100%;
              transform: scale(1, 1);
              transition: all 0.2s linear;
            }
          }
          &:hover {
            .image {
              img {
                transform: scale(1.1, 1.1);
              }
            }
          }
        }
      }
      .more {
        position: relative;
        margin-bottom: 30px;
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

    &.lady-ring {
      .bg-content {
        top: 63px;
        left: 627px;
        width: 396px;
      }
      .products {
        margin-top: -186px;
        margin-bottom: 30px;
        align-items: flex-end;
        justify-content: flex-end;
      }
    }

    &.men-ring {
      .bg-content {
        top: 83px;
        left: 332px;
        width: 396px;
      }
      .products {
        margin-top: -156px;
        margin-bottom: 30px;
        align-items: flex-end;
        justify-content: flex-start;
        .list {
          margin-left: 140px;
        }
      }
    }

    &.wedding-ring {
      .bg-content {
        top: 50%;
        left: 966px;
        transform: translate(0, -50%);
        width: 250px;

        .sub-title {
          margin-bottom: 40px;
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
}
</style>
