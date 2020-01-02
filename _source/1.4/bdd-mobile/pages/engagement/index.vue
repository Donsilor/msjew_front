<template>
  <div class="page">
    <tip-message></tip-message>
    <section class="banner">
      <template v-if="banner.length > 1">
        <swiper :indicator="false" :auto="true" :duration="5000">
          <template v-for="(each, n) in banner">
            <template v-if="each.url">
              <a
                :key="n"
                :href="each.url"
                :target="each.openType === 1 ? '_blank' : '_self'"
              >
                <div :key="n" class="swiper-item">
                  <img :src="each.image" @error="imageError" />
                </div>
              </a>
            </template>
            <template v-else>
              <div :key="n" class="swiper-item">
                <img :src="each.image" @error="imageError" />
              </div>
            </template>
          </template>
        </swiper>
      </template>
      <template v-else>
        <template v-for="(each, n) in banner">
          <template v-if="each.url">
            <a
              :key="n"
              :href="each.url"
              :target="each.openType === 1 ? '_blank' : '_self'"
            >
              <div :key="n" class="swiper-item">
                <img :src="each.image" @error="imageError" />
              </div>
            </a>
          </template>
          <template v-else>
            <div :key="n" class="swiper-item">
              <img :src="each.image" @error="imageError" />
            </div>
          </template>
        </template>
      </template>
    </section>
    <section class="customize">
      <div class="illustrate">
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
        <button @click="goToMade(2)">{{ lang['ring-first'] }}</button>
        <span>OR</span>
        <button @click="goToMade(1)">{{ lang['diamond-first'] }}</button>
      </div>
    </section>
    <section class="recommend">
      <div class="ring-info">
        <img class="bg" src="/engagement/bg.png" />
        <h1 class="title">{{ recommendInfo.moduleTitle }}</h1>
        <!--        <h1 class="title">ENGAMEMENT RINGS</h1>-->
        <!--        <h2 class="sub-title">{{ lang['sub-title'] }}</h2>-->
        <h3 class="title-line"></h3>
        <div class="product" @click="toDetail(activeRecommendInfo)">
          <div class="product-image">
            <img :src="activeRecommendInfo.image" @error="imageError" />
          </div>
          <div class="product-price">
            <span class="currency">{{ activeRecommendInfo.coinType }}</span>
            <span class="price">
              {{ formatNumber(activeRecommendInfo.salePrice) }}
            </span>
          </div>
          <div class="ow-h1 product-title">
            {{ activeRecommendInfo.goodsName }}
          </div>
        </div>
      </div>
      <div class="ring-list">
        <div
          v-for="(each, n) in recommends"
          :key="n"
          :class="['ring-item', { active: activeRecommend === n }]"
          @click="changeActivePairRing(n)"
        >
          <img :src="each.goodsImages[0]" @error="imageError" />
        </div>
      </div>
      <div class="others">
        <button class="see-more" @click="customMade">
          MORE
        </button>
      </div>
    </section>
    <section class="categories">
      <div
        v-for="(each, n) in designerSeries"
        :key="n"
        class="category"
        @click="toUrl(each)"
      >
        <img :src="imageStrToArray(each.wapImage)[0]" @error="imageError" />
      </div>
    </section>
  </div>
</template>

<script>
import Helpers from '@/assets/js/helpers.js'
export default {
  head() {
    return this.seoInfo || {}
  },
  data() {
    return {
      lang: this.LANGUAGE.engagement,
      ad: null,
      webSite: null,
      activeRecommend: 0
    }
  },
  computed: {
    banner() {
      const ad = JSON.parse(
        JSON.stringify(this.ad && this.ad[0] ? this.ad[0] : [])
      )

      let result = []
      if (ad.advertImgModelList && ad.advertImgModelList.length > 0) {
        result = ad.advertImgModelList
        for (let n = 0, length = result.length; n < length; n++) {
          result[n].openType = ad.tdOpenType
          result[n].image = this.completionImageStr(result[n].image)
          result[n].url = result[n].addres
        }
      } else {
        result.push({
          openType: ad.tdOpenType,
          image: this.completionImageStr(ad.dsImg),
          url: ''
        })
      }
      return result
    },
    recommendInfo() {
      const result = JSON.parse(
        JSON.stringify(this.webSite && this.webSite[0] ? this.webSite[0] : [])
      )
      return result
    },
    recommends() {
      const recommendInfo = this.recommendInfo
      let result = recommendInfo.moduleGoods || []
      result = result.map(item => {
        item = item.goods && item.goods[0] ? item.goods[0] : {}
        return item
      })
      result = result.map(item => {
        // console.log('item.goodsImages====>', item.goodsImages)
        item.showType = recommendInfo.showType
        item.goodsImages = this.imageStrToArray(item.goodsImages)
        return item
      })
      // console.log('recommends=====>', result)
      return result
    },
    activeRecommendInfo() {
      const result = JSON.parse(
        JSON.stringify(
          this.recommends && this.recommends[this.activeRecommend]
            ? this.recommends[this.activeRecommend]
            : {}
        )
      )

      result.image = ''
      if (result.goodsImages) {
        if (result.goodsImages[0]) {
          result.image = result.goodsImages[0]
        }
        // if (result.goodsImages[1]) {
        //   result.image = result.goodsImages[1]
        // }
      }
      return result
    },
    designerSeries() {
      const designer = JSON.parse(
        JSON.stringify(this.webSite && this.webSite[1] ? this.webSite[1] : [])
      )
      const result = designer.moduleActivity
      // result.map(item => {
      //   item.showType = designer.showType
      //   return item
      // })
      return result
    }
  },
  async asyncData({ $axios, route, store, app }) {
    const seoInfo = await app.$getSeoInfo(2)

    return $axios({
      method: 'get',
      url: '/wap/Website/queryWebsiteModuleWap',
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
      // _this.getSetting()
    })
  },
  methods: {
    getSetting() {
      const _this = this
      _this
        .$axios({
          method: 'get',
          url: '/wap/Website/queryWebsiteModuleWap',
          params: {
            type: 2
          }
        })
        .then(data => {
          _this.ad = data.advert
          _this.webSite = data.webSite
        })
        .catch(err => {
          console.error(err)
        })
    },
    customMade() {
      this.$router.push({
        name: 'custom-made-ring-made-ring-list',
        query: {
          melo: Helpers.base64Encode(
            JSON.stringify({
              steps: [
                {
                  goodsId: null,
                  goodsDetailsId: null,
                  ct: 2,
                  cartId: ``,
                  page: `list`
                },
                {
                  goodsId: null,
                  goodsDetailsId: null,
                  ct: null,
                  cartId: ``,
                  page: `list`
                }
              ]
            })
          ),
          step: 1
        }
      })
    },
    toDetail(info) {
      if (info.showType === 1) {
        window.open(`/engagement/engagement-rings?goodId=${info.id}`)
      } else {
        this.$router.push({
          name: 'engagement-engagement-rings',
          query: {
            goodId: this.activeRecommendInfo.id
          }
        })
      }
    },
    testClick() {
      console.log('testClick')
    },
    bannerChange(index) {
      console.log('bannerChange===>', index)
    },
    changeActivePairRing(index) {
      console.log('changeActivePairRing===>', index)
      this.activeRecommend = index
    },
    toUrl(info = {}) {
      if (!info.wapUrl) {
        return
      }
      if (info.showType === 1) {
        window.open(info.wapUrl)
      } else {
        window.location.href = info.wapUrl
      }
    },
    goToMade(i) {
      const obj = {
        steps: [
          {
            goodsId: null,
            goodsDetailsId: null,
            ct: i,
            cartId: ``,
            page: `list`
          },
          {
            goodsId: null,
            goodsDetailsId: null,
            ct: null,
            cartId: ``,
            page: `list`
          }
        ]
      }
      if (i === 1) {
        this.$router.push({
          name: `custom-made-diamond-made-diamond-list`,
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(obj)),
            step: 1
          }
        })
      } else if (i === 2) {
        this.$router.push({
          name: `custom-made-ring-made-ring-list`,
          query: {
            melo: this.$helpers.base64Encode(JSON.stringify(obj)),
            step: 1
          }
        })
      }
    },
    routerTo(routerName = '', query = {}) {
      if (!routerName) {
        return
      }
      this.$router.push({
        name: routerName,
        query: query
      })
    }
  }
}
</script>

<style lang="less" scoped>
/*轮播区域*/
.banner {
  width: 100%;
  height: 420px;
  background-color: #f7e3dc;
}
.swiper-item {
  position: relative;
  width: 100%;
  height: 100%;
  line-height: 0;
  font-size: 0;
  overflow: hidden;
}
.swiper-item > img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*max-width: 100%;*/
  max-height: 100%;
}

/*定制*/
.customize {
  padding: 15px 0 25px 0;
  /*height: 121px;*/

  .illustrate {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      margin: 0 4px;
    }
    .icon {
      width: 32px;
      height: 32px;
      background: rgba(194, 151, 145, 1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      .iconfont {
        font-size: 20px;
        color: #ffffff;
      }
    }
    .symbol {
      font-size: 20px;
      font-weight: bold;
      color: rgba(194, 151, 145, 1);
    }
  }
  .button-group {
    font-size: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      width: 130px;
      height: 30px;
      border: 1px solid rgba(65, 15, 6, 1); /*no*/
      font-size: 12px;
      font-weight: 400;
      color: rgba(65, 15, 6, 1);
      box-sizing: border-box;
    }
    span {
      margin: 0 11px;
      height: 7px;
      font-size: 9px;
      font-weight: 400;
      color: rgba(65, 15, 6, 1);
    }
  }
}

/*推荐对戒*/
.recommend {
  .ring-info {
    position: relative;
    /*height: 320px;*/
    /*background: #fbf6f6;*/
    overflow: hidden;

    .bg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 100%;
      z-index: -1;
    }
    .title {
      /*height: 15px;*/
      line-height: 15px;
      font-size: 18px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      text-align: center;
      padding-top: 31px;
      padding-bottom: 9px;
      box-sizing: content-box;
    }
    .sub-title {
      height: 15px;
      line-height: 15px;
      font-size: 15px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      text-align: center;
      padding-bottom: 15px;
      box-sizing: content-box;
    }
    .title-line {
      width: 50px;
      height: 1px; /*no*/
      margin: 0 auto;
      background-color: #000000;
    }

    .product {
      padding-bottom: 25px;

      .product-image {
        width: 48%;
        /*width: 181px;*/
        /*height: 181px;*/
        /*margin: -9px auto 6px auto;*/
        margin: 0 auto 6px auto;
        line-height: 0;
      }
      .product-image > img {
        width: 100%;
        /*height: 100%;*/
      }
      .product-price {
        height: 15px;
        line-height: 15px;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        color: rgba(186, 156, 144, 1);
        margin-bottom: 7px;
      }
      .product-title {
        margin: 0 30px;
        width: calc(100% - 60px);
        height: 12px;
        box-sizing: content-box;
        font-size: 12px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 12px;
        text-align: center;
      }
    }
  }
  .ring-list {
    width: 100%;
    height: 120px;
    font-size: 0;
    white-space: nowrap;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    overflow-x: auto;
    overflow-y: hidden;

    .ring-item {
      width: 90px;
      height: 90px;
      margin: 15px 10px;
      line-height: 0;
      box-shadow: 2px 2px 0 0 rgba(243, 224, 219, 1);
      display: inline-block;
    }
    .ring-item.active {
      box-shadow: 4px 4px 0 0 rgba(208, 171, 166, 1);
    }
    .ring-item > img {
      width: 100%;
      height: 100%;
    }
  }
  .ring-list::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .others {
    width: 100%;
    height: 81px;
    background: linear-gradient(90deg, #f5e9e8 0%, #ffffff 50%, #f5e9e8 100%);
    display: flex;
    align-items: center;
    justify-content: center;

    .see-more {
      width: 130px;
      height: 30px;
      background: #a18886;
      box-shadow: 3px 3px 1px 0 rgba(0, 0, 0, 0.1); /*no*/
      border-radius: 2px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}

/*分类*/
.categories {
  padding: 10px 5px 25px 5px;
  box-sizing: border-box;

  .category {
    margin-bottom: 5px;
    /*height: 162px;*/

    img {
      width: 100%;
      /*height: 100%;*/
    }
  }
}
</style>
