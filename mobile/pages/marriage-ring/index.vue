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
    <section class="categories">
      <div
        v-for="(each, n) in categories"
        :key="n"
        class="category"
        @click="routerTo(each.routerName, each.routerQuery)"
      >
        <div class="category-image">
          <img :src="each.image" />
        </div>
        <div class="category-name">
          {{ each.name }}
        </div>
      </div>
    </section>
    <section class="pair-ring">
      <div class="ring-info">
        <img class="bg" src="/marriage-ring/bg.png" />
        <h1 class="title">{{ recommendPairRingInfo.moduleTitle }}</h1>
        <!--        <h1 class="title">{{ lang['wendding-rings'] }}</h1>-->
        <!--        <h2 class="sub-title">{{ lang['recommend-pair-rings'] }}</h2>-->
        <h3 class="title-line"></h3>
        <div class="product" @click="toPairRingDetail(activePairRingInfo)">
          <div class="product-image">
            <img :src="activePairRingInfo.image" @error="imageError" />
          </div>
          <div class="product-price">
            <span class="currency">{{ activePairRingInfo.coinType }}</span>
            <span class="price">
              {{ formatNumber(activePairRingInfo.salePrice) }}
            </span>
          </div>
          <div class="ow-h1 product-title">
            {{ activePairRingInfo.name }}
          </div>
        </div>
      </div>
      <div class="ring-list">
        <div
          v-for="(each, n) in recommendPairRings"
          :key="n"
          :class="['ring-item', { active: activePairRing === n }]"
          @click="changeActivePairRing(n)"
        >
          <img :src="each.ringImg[0]" @error="imageError" />
        </div>
      </div>
      <div class="others">
        <button class="see-more" @click="routerTo('marriage-ring-pair-ring')">
          {{ lang['see-more'] }}
        </button>
      </div>
    </section>
    <section class="lady-ring">
      <div class="section-top">
        <img class="section-top-bg" src="/marriage-ring/lady-ring-bg.png" />
        <img
          class="section-top-image"
          src="/marriage-ring/lady-ring-image.png"
        />
        <div class="info">
          <h1 class="title">{{ recommendLadyRingInfo.title }}</h1>
          <!--          <h1 class="title">{{ lang['lady-ring'] }}</h1>-->
          <!--          <h2 class="sub-title">{{ lang['for-women'] }}</h2>-->
          <h3 class="title-line"></h3>
          <button
            class="more"
            @click="routerTo('marriage-ring-single-ring', { type: 'lady' })"
          >
            {{ lang['more'] }}
          </button>
        </div>
      </div>
      <div class="ring-list">
        <div
          v-for="(each, n) in recommendLadyRings"
          :key="n"
          class="ring-item"
          @click="toSingleRingDetail(each)"
        >
          <img :src="each.image" @error="imageError" />
        </div>
      </div>
    </section>
    <section class="gentlemen-ring">
      <div class="section-top">
        <img
          class="section-top-bg"
          src="/marriage-ring/gentleman-ring-bg.png"
        />
        <img
          class="section-top-image"
          src="/marriage-ring/gentleman-ring-image.png"
        />
        <div class="info">
          <h1 class="title">{{ recommendGentlemanRingInfo.title }}</h1>
          <!--          <h1 class="title">{{ lang['gentlemen-ring'] }}</h1>-->
          <!--          <h2 class="sub-title">{{ lang['for-men'] }}</h2>-->
          <h3 class="title-line"></h3>
          <button
            class="more"
            @click="
              routerTo('marriage-ring-single-ring', { type: 'gentlemen' })
            "
          >
            {{ lang['more'] }}
          </button>
        </div>
      </div>
      <div class="ring-list">
        <div
          v-for="(each, n) in recommendGentlemanRings"
          :key="n"
          class="ring-item"
          @click="toSingleRingDetail(each)"
        >
          <img :src="each.image" @error="imageError" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    return this.seoInfo || {}
  },
  data() {
    return {
      lang: this.LANGUAGE['marriage-ring'].index,
      ad: null,
      webSite: null,
      categories: [
        {
          name: this.LANGUAGE['marriage-ring'].index['marriage-ring'],
          image: '/marriage-ring/category-image-1.png',
          routerName: 'marriage-ring-pair-ring'
        },
        {
          name: this.LANGUAGE['marriage-ring'].index['lady-ring'],
          image: '/marriage-ring/category-image-2.png',
          routerName: 'marriage-ring-single-ring',
          routerQuery: {
            type: 'lady'
          }
        },
        {
          name: this.LANGUAGE['marriage-ring'].index['gentlemen-ring'],
          image: '/marriage-ring/category-image-3.png',
          routerName: 'marriage-ring-single-ring',
          routerQuery: {
            type: 'gentlemen'
          }
        }
      ],
      activePairRing: 0
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
    // 推荐对戒信息
    recommendPairRingInfo() {
      const result = JSON.parse(
        JSON.stringify(this.webSite && this.webSite[0] ? this.webSite[0] : [])
      )
      return result
    },
    // 推荐对戒
    recommendPairRings() {
      const recommendInfo = this.recommendPairRingInfo
      let result = recommendInfo.moduleGoods || []
      result = result.map(item => {
        item = item.ring && item.ring[0] ? item.ring[0] : {}
        return item
      })
      result = result.map(item => {
        item.showType = recommendInfo.showType
        item.ringImg = this.imageStrToArray(item.ringImg)
        return item
      })
      return result
    },
    activePairRingInfo() {
      const result = JSON.parse(
        JSON.stringify(
          this.recommendPairRings &&
            this.recommendPairRings[this.activePairRing]
            ? this.recommendPairRings[this.activePairRing]
            : {}
        )
      )
      // result.image =
      //   result.ringImg && result.ringImg[1] ? result.ringImg[1] : ''

      result.image = ''
      if (result.ringImg) {
        if (result.ringImg[0]) {
          result.image = result.ringImg[0]
        }
        // if (result.ringImg[1]) {
        //   result.image = result.ringImg[1]
        // }
      }
      return result
    },
    // 推荐女戒信息
    recommendLadyRingInfo() {
      const result = JSON.parse(
        JSON.stringify(this.webSite && this.webSite[1] ? this.webSite[1] : [])
      )
      return result
    },
    // 推荐女戒
    recommendLadyRings() {
      const recommendInfo = this.recommendLadyRingInfo
      let result = recommendInfo.moduleGoods || []
      result = result.map(item => {
        item = item.goods && item.goods[0] ? item.goods[0] : {}
        return item
      })
      result = result.map(item => {
        item.showType = recommendInfo.showType
        item.goodsImages = this.imageStrToArray(item.goodsImages)
        item.image = item.goodsImages[0] || ''
        return item
      })
      return result
    },
    // 推荐男戒信息
    recommendGentlemanRingInfo() {
      const result = JSON.parse(
        JSON.stringify(this.webSite && this.webSite[2] ? this.webSite[2] : [])
      )
      return result
    },
    // 推荐男戒
    recommendGentlemanRings() {
      const recommendInfo = this.recommendGentlemanRingInfo
      let result = recommendInfo.moduleGoods || []
      result = result.map(item => {
        item = item.goods && item.goods[0] ? item.goods[0] : {}
        return item
      })
      result = result.map(item => {
        item.showType = recommendInfo.showType
        item.goodsImages = this.imageStrToArray(item.goodsImages)
        item.image = item.goodsImages[0] || ''
        return item
      })
      return result
    }
  },
  async asyncData({ $axios, route, store, app }) {
    const seoInfo = await app.$getSeoInfo(3)

    return $axios({
      method: 'get',
      url: '/wap/Website/queryWebsiteModuleWap',
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
            type: 3
          }
        })
        .then(data => {
          console.log(data)
          _this.ad = data.advert
          _this.webSite = data.webSite
        })
        .catch(err => {
          console.error(err)
        })
    },
    toBannerUrl(info) {
      if (!info.url) {
        return
      }
      window.location.href = `${info.url}`
    },
    toPairRingDetail(info) {
      if (info.showType === 1) {
        window.open(`/marriage-ring/pair-ring-detail?ringId=${info.id}`)
      } else {
        this.$router.push({
          name: 'marriage-ring-pair-ring-detail',
          query: {
            ringId: info.id
          }
        })
      }
    },
    toSingleRingDetail(info) {
      if (info.showType === 1) {
        window.open(`/marriage-ring/single-ring-detail?goodId=${info.id}`)
      } else {
        this.$router.push({
          name: 'marriage-ring-single-ring-detail',
          query: {
            goodId: info.id
          }
        })
      }
    },
    routerTo(name, query = {}) {
      if (!name) {
        return
      }
      this.$router.push({
        name: name,
        query: query
      })
    },
    changeActivePairRing(index) {
      this.activePairRing = index
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

  .swiper-item {
    position: relative;
    width: 100%;
    height: 100%;
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
}

/*分类按钮*/
.categories {
  height: 147px;
  padding-top: 25px;
  box-sizing: border-box;
  display: flex;
}
.category {
  width: calc(100% / 3);
}
.category-image {
  width: 65px;
  height: 65px;
  margin: 0 auto 14px auto;
  border-radius: 100%;
  text-align: center;
  line-height: 0;
  background-color: #f0f0f0;
  overflow: hidden;
}
.category-image > img {
  width: 100%;
  height: 100%;
}
.category-name {
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

/*推荐对戒*/
.pair-ring {
  margin-bottom: 10px;

  .ring-info {
    position: relative;
    /*height: 320px;*/
    /*background: rgba(250, 247, 242, 1);*/

    .bg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
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
      box-shadow: 2px 2px 0 0 rgba(243, 238, 236, 1);
      display: inline-block;
    }
    .ring-item.active {
      box-shadow: 4px 4px 0 0 rgba(198, 192, 182, 1);
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
    background: linear-gradient(90deg, #efebe5 0%, #ffffff 50%, #efebe5 100%);
    display: flex;
    align-items: center;
    justify-content: center;

    .see-more {
      width: 130px;
      height: 30px;
      background: rgba(177, 170, 158, 1);
      box-shadow: 3px 3px 1px 0 rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}

/*女戒*/
.lady-ring,
.gentlemen-ring {
  .ring-list {
    padding: 15px 15px 0 15px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .ring-item {
      width: calc((100% - 15px) / 2);
      /*width: 165px;*/
      /*height: 165px;*/
      margin-bottom: 15px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.lady-ring {
  .section-top {
    position: relative;
    height: 200px;
    line-height: 0;
    overflow: hidden;
    /*display: flex;*/
    /*flex-direction: row;*/
    /*align-items: stretch;*/
    /*justify-content: flex-end;*/

    .section-top-bg {
      position: relative;
      width: 100%;
    }
    .section-top-image {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
      max-width: 46%;
      z-index: 0;
    }
    .info {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      /*flex-shrink: 0;*/
      /*flex-grow: 0;*/
      width: 224px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1;

      .title {
        font-size: 18px;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        line-height: 18px;
        text-align: center;
        margin-top: 19px;
        margin-bottom: 10px;
      }
      .sub-title {
        font-size: 15px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 15px;
        margin-bottom: 15px;
      }
      .title-line {
        width: 30px;
        height: 1px; /*no*/
        margin: 0 auto;
        background-color: #000000;
        margin-bottom: 20px;
      }
      .more {
        width: 70px;
        height: 25px;
        background: rgba(177, 170, 158, 1);
        border-radius: 2px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
.gentlemen-ring {
  .section-top {
    position: relative;
    height: 200px;
    line-height: 0;
    overflow: hidden;
    /*display: flex;*/
    /*flex-direction: row;*/
    /*align-items: stretch;*/
    /*justify-content: flex-start;*/

    .section-top-bg {
      position: relative;
      width: 100%;
    }
    .section-top-image {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      max-width: 50%;
      z-index: 0;
    }
    /*img {*/
    /*  position: absolute;*/
    /*  top: 0;*/
    /*  left: 0;*/
    /*  width: 100%;*/
    /*  height: 100%;*/
    /*  z-index: 0;*/
    /*}*/
    .info {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
      /*flex-shrink: 0;*/
      /*flex-grow: 0;*/
      width: 224px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1;

      .title {
        font-size: 18px;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        line-height: 18px;
        text-align: center;
        margin-top: 19px;
        margin-bottom: 10px;
      }
      .sub-title {
        font-size: 15px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 15px;
        margin-bottom: 15px;
      }
      .title-line {
        width: 30px;
        height: 1px; /*no*/
        margin: 0 auto;
        background-color: #000000;
        margin-bottom: 20px;
      }
      .more {
        width: 70px;
        height: 25px;
        background: rgba(177, 170, 158, 1);
        border-radius: 2px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
