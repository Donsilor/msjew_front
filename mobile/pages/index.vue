<template>
  <div class="page">
    <tip-message></tip-message>
    <section class="banner">
      <template v-if="banner.length > 1">
        <swiper :indicator="true" :auto="true" :duration="5000">
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
      <h1 class="title margin-bottom-40">{{ lang.diySubTitle }}</h1>
      <!--      <h2 class="sub-title">{{ lang.diySubTitle }}</h2>-->
      <div class="exhibition">
        <img
          v-show="exhibitionImageStatus"
          ref="exhibition-image"
          src="/index/exhibition.png"
          @click="clickVideoCover"
        />
        <video
          v-show="!exhibitionImageStatus"
          ref="exhibition-video"
          src="/index/exhibition.mp4"
          webkit-playsinline
          playsinline
          x5-playsinline
          @click="clickVideo"
          @ended="videoEnded"
        ></video>
      </div>
      <div class="button-group">
        <button @click="goToMade(2)">{{ lang.startFromRing }}</button>
        <span>OR</span>
        <button @click="goToMade(1)">{{ lang.startFromDiamond }}</button>
      </div>
      <!--      <div class="tips">-->
      <!--        <h2>{{ lang.syiwo }}</h2>-->
      <!--        <h3 @click="goToMade(2)">{{ lang.ig }}</h3>-->
      <!--      </div>-->
    </section>
    <section class="categories">
      <div
        v-for="(each, n) in categories"
        :key="n"
        :class="['category', `${each.textAlign}-title`]"
        @click="routerTo(each.routerName, each.query)"
      >
        <img class="category-bg" :src="each.bg" />
        <img class="category-image" :src="each.image" />
        <div class="info">
          <div class="title">{{ each.title }}</div>
          <div class="sub-title">{{ each.subTitle }}</div>
        </div>
      </div>
    </section>
    <section class="recommend">
      <h1 class="title">{{ cardsInfo.moduleTitle }}</h1>
      <!--      <h1 class="title">{{ lang.fineJewelry }}</h1>-->
      <!--      <h2 class="sub-title">{{ lang.recommend }}</h2>-->
      <h3 class="title-line"></h3>
      <div class="cards">
        <swiper
          :item-width="77.3"
          :indicator="false"
          :scale="true"
          :auto="true"
          :duration="5000"
          @change="changeCard"
        >
          <div
            v-for="(each, n) in cards"
            :key="n"
            class="recommend-item"
            @click="toCardDetail(each)"
          >
            <div class="product-image">
              <img
                :src="imageStrToArray(each.goodsImages)[0]"
                @error="imageError"
              />
            </div>
            <div class="product-price">
              <span>{{ each.coinType }}</span>
              <span>{{ formatNumber(each.salePrice) }}</span>
            </div>
            <div class="product-name ow-h1">{{ each.goodsName }}</div>
            <div class="more">
              <span>{{ lang.checkDetail }}</span>
            </div>
          </div>
        </swiper>
      </div>
      <div class="indicator">
        <span
          v-for="(each, n) in cards"
          :key="n"
          :class="['indicator-item', { active: activeCard === n }]"
        ></span>
      </div>
      <div class="others">
        <button class="see-more" @click="moreCard">{{ lang.seeMore }}</button>
      </div>
    </section>
    <section class="contact-us">
      <h1 class="title">{{ lang.callUs }}</h1>
      <div class="map">
        <img src="/index/map.png" />
      </div>
      <div class="info">
        <div class="info-row">
          <span class="line"></span>
          <span class="row-name">{{ lang.store }}</span>
          <span class="row-text">{{ lang.storeName }}</span>
        </div>
        <div class="info-row">
          <span class="line"></span>
          <span class="row-name">{{ lang.address }}</span>
          <span class="row-text">{{ lang.addressDetail }}</span>
        </div>
        <div class="info-row">
          <span class="line"></span>
          <span class="row-name">{{ lang.tel }}</span>
          <span class="row-text">
            <a href="tel:+852 2165 3905">+852 2165 3905</a>
          </span>
          <span class="column-line"></span>
          <span class="row-icon">
            <a href="tel:+852 2165 3905">
              <i class="iconfont iconphone"></i>
            </a>
          </span>
        </div>
        <div class="info-row">
          <span class="line"></span>
          <span class="row-name">{{ lang.email }}</span>
          <span class="row-text">
            <a href="mailto:service@bddco.com">service@bddco.com</a>
          </span>
          <span class="column-line"></span>
          <span class="row-icon">
            <a href="mailto:service@bddco.com">
              <i class="iconfont iconyouxiang"></i>
            </a>
          </span>
        </div>
        <div class="info-row">
          <nuxt-link :to="{ path: '/contact' }">
            <button class="contact-button">{{ lang.callUs }}</button>
          </nuxt-link>
        </div>
      </div>
    </section>
    <!--    <site-switch ref="site-switch"></site-switch>-->
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
      lang: this.LANGUAGE.index,
      ad: null,
      categories: [
        {
          textAlign: 'right',
          title: this.LANGUAGE.index.bddRecommend,
          subTitle: this.LANGUAGE.index.diamond,
          bg: '/index/category-bg-1.png',
          image: '/index/category-image-1.png',
          routerName: 'diamond-list'
        },
        {
          textAlign: 'left',
          title: this.LANGUAGE.index.diy,
          subTitle: this.LANGUAGE.index.engagement,
          bg: '/index/category-bg-2.png',
          image: '/index/category-image-2.png',
          routerName: 'custom-made-ring-made-ring-list',
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
        },
        {
          textAlign: 'right',
          title: this.LANGUAGE.index.find,
          subTitle: this.LANGUAGE.index.marriageRing,
          bg: '/index/category-bg-3.png',
          image: '/index/category-image-3.png',
          routerName: 'marriage-ring-single-ring',
          query: {
            type: 'lady'
          }
        },
        {
          textAlign: 'left',
          title: this.LANGUAGE.index.buy,
          subTitle: this.LANGUAGE.index.accessories,
          bg: '/index/category-bg-4.png',
          image: '/index/category-image-4.png',
          routerName: 'accessories-list'
        }
      ],
      activeCard: 0,
      webSite: null,

      exhibitionImageStatus: true
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
    cardsInfo() {
      const result = JSON.parse(
        JSON.stringify(this.webSite && this.webSite[0] ? this.webSite[0] : [])
      )
      // console.log('result====>', result)
      return result
    },
    cards() {
      let result = []
      const cardInfo = this.cardsInfo
      const data = cardInfo.moduleGoods || []

      for (let n = 0, length = data.length; n < length; n++) {
        result = result.concat(data[n].goods ? data[n].goods : [])
        result = result.concat(data[n].ring ? data[n].ring : [])
      }

      for (let n = 0, length = result.length; n < length; n++) {
        const keys = Object.keys(result[n].configAttriEntity)
        let configAttriEntity = []
        if (keys.length > 0) {
          keys.map(item => {
            configAttriEntity = configAttriEntity.concat(
              result[n].configAttriEntity[item]
            )
          })
        }
        result[n].showType = cardInfo.showType
        result[n].configAttriEntity = configAttriEntity
      }
      return result
    }
  },
  async asyncData({ $axios, route, store, app }) {
    const seoInfo = await app.$getSeoInfo(1)

    return $axios({
      method: 'get',
      url: '/wap/Website/queryWebsiteModuleWap',
      params: {
        type: 1
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
  // mounted() {
  //   const _this = this
  //   _this.$nextTick(() => {
  //     // _this.getSetting()
  //     if (!_this.$store.state.coin || !_this.$store.state.language) {
  //       _this.$refs['site-switch'].show()
  //     }
  //   })
  // },
  methods: {
    getSetting() {
      const _this = this
      _this
        .$axios({
          method: 'get',
          url: '/wap/Website/queryWebsiteModuleWap',
          params: {
            type: 1
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
    clickVideoCover() {
      const video = this.$refs['exhibition-video']
      this.exhibitionImageStatus = false
      video.play()
    },
    clickVideo() {
      const video = this.$refs['exhibition-video']
      this.fullScreen(video)
    },
    videoEnded() {
      const video = this.$refs['exhibition-video']
      video.pause()
      this.exitFullscreen()
      this.exhibitionImageStatus = true
    },
    changeCard(index) {
      this.activeCard = index
    },
    toCardDetail(card) {
      console.log('card====>', card)
      if (!card) {
        return
      }

      const configAttriEntity = card.configAttriEntity

      const configIds = []
      const configAttrIds = []

      let routerUrl = ''
      let routerQuery = {
        goodId: card.id
      }

      configAttriEntity.map(item => {
        configIds.push(item.configId)
        configAttrIds.push(item.configAttrId)
      })

      const ringRouter = () => {
        if (configAttrIds.indexOf(60) > -1) {
          // 訂婚戒指
          routerUrl = '/engagement/engagement-rings'
          return
        }
        if (
          configAttrIds.indexOf(461) > -1 ||
          configAttrIds.indexOf(462) > -1
        ) {
          // 男女戒
          routerUrl = '/marriage-ring/single-ring-detail'
          return
        }
        if (configAttrIds.indexOf(59) > -1) {
          // 結婚戒指
          routerUrl = '/marriage-ring/pair-ring-detail'
          routerQuery = {
            ringId: card.id
          }
          return
        }
        if (configAttrIds.indexOf(61) > -1) {
          // 裝飾戒指
          routerUrl = '/marriage-ring/single-ring-detail'
          return
        }
        console.log('都不是')
      }

      switch (card.categoryId) {
        case 1:
          // 钻石
          routerUrl = '/diamond/diamonds'
          break
        case 2:
          // 戒指
          ringRouter()
          break
        case 3:
          // 珠宝饰品
          routerUrl = '/accessories/accessories'
          break
        case 4:
          // 项链
          routerUrl = '/accessories/accessories'
          break
        case 5:
          // 吊坠
          routerUrl = '/accessories/accessories'
          break
        case 6:
          // 耳钉
          routerUrl = '/accessories/accessories'
          break
        case 7:
          // 耳环
          routerUrl = '/accessories/accessories'
          break
        case 8:
          // 手链
          routerUrl = '/accessories/accessories'
          break
        case 9:
          // 手镯
          routerUrl = '/accessories/accessories'
          break
      }

      const queryStr = Object.keys(routerQuery)
        .map(key => {
          return `${key}=${routerQuery[key]}`
        })
        .join('&')
      if (card.showType === 1) {
        window.open(`${routerUrl}?${queryStr}`)
      } else {
        this.$router.push(`${routerUrl}?${queryStr}`)
      }
    },
    moreCard() {
      const card = this.cards[this.activeCard]

      console.log('card====>', card)
      if (!card) {
        return
      }

      const configAttriEntity = card.configAttriEntity

      const configIds = []
      const configAttrIds = []

      configAttriEntity.map(item => {
        configIds.push(item.configId)
        configAttrIds.push(item.configAttrId)
      })

      const ringRouter = () => {
        if (configAttrIds.indexOf(462) > -1) {
          // 女士
          this.$router.push({
            name: 'marriage-ring-single-ring',
            query: {
              type: 'lady'
            }
          })
          return
        }
        if (configAttrIds.indexOf(60) > -1) {
          // 訂婚戒指
          this.$router.push({
            name: 'marriage-ring-pair-ring'
          })
          return
        }
        if (configAttrIds.indexOf(59) > -1) {
          // 結婚戒指
          this.$router.push({
            name: 'marriage-ring-pair-ring'
          })
          return
        }
        if (configAttrIds.indexOf(61) > -1) {
          // 裝飾戒指
          this.$router.push({
            name: 'marriage-ring-single-ring'
          })
          return
        }
        console.log('都不是')
      }

      let routerName = ''
      let routerQuery = {}

      switch (card.categoryId) {
        case 1:
          // 钻石
          routerName = 'diamond-list'
          break
        case 2:
          // 戒指
          ringRouter()
          return
        case 3:
          // 珠宝饰品
          routerName = 'accessories-list'
          break
        case 4:
          // 项链
          routerName = 'accessories-list'
          routerQuery = {
            actIndex: 0
          }
          break
        case 5:
          // 吊坠
          routerName = 'accessories-list'
          routerQuery = {
            actIndex: 1
          }
          break
        case 6:
          // 耳钉
          routerName = 'accessories-list'
          routerQuery = {
            actIndex: 2
          }
          break
        case 7:
          // 耳环
          routerName = 'accessories-list'
          routerQuery = {
            actIndex: 3
          }
          break
        case 8:
          // 手链
          routerName = 'accessories-list'
          routerQuery = {
            actIndex: 4
          }
          break
        case 9:
          // 手镯
          routerName = 'accessories-list'
          routerQuery = {
            actIndex: 5
          }
          break
      }

      this.$router.push({
        name: routerName,
        query: routerQuery
      })

      console.log('configAttrIds===>', configAttrIds)
    },
    routerTo(routerName = '', query = {}) {
      if (!routerName) {
        return
      }
      this.$router.push({
        name: routerName,
        query: query
      })
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
    isFullscreen() {
      return (
        document.fullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        false
      )
    },
    // 进入全屏
    fullScreen(el) {
      if (el.requestFullscreen) {
        el.requestFullscreen()
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen()
      } else if (el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen()
      }
    },
    // 退出全屏
    exitFullscreen() {
      if (!this.isFullscreen()) {
        return
      }
      const de = document
      if (de.exitFullscreen) {
        de.exitFullscreen()
      } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen()
      } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen()
      }
    }
  }
}
</script>

<style scoped lang="less">
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
  /*width: 375px;*/
  /*height: 420px;*/
  /*width: 200px;*/
  /*height: 200px;*/
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

/*定制区域*/
.customize {
  padding-top: 29px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-bottom: 30px;
    height: 18px;
    font-size: 18px;
    font-weight: bold;
    color: rgba(1, 1, 1, 1);
  }
  .sub-title {
    margin-bottom: 25px;
    height: 15px;
    font-size: 15px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }
  .exhibition {
    margin: 0 15px 35px 15px;
    width: calc(100% - 30px);
    /*height: 194px;*/
    overflow: hidden;
    box-shadow: 0 4px 7px 0 rgba(40, 40, 40, 0.08);
    line-height: 0;
    font-size: 0;

    img {
      width: 100%;
      /*height: 100%;*/
    }
    video {
      width: 100%;
    }
  }
  .button-group {
    margin-bottom: 20px;
    font-size: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      width: 150px;
      height: 36px;
      border: 1px solid rgba(102, 102, 102, 1); /*no*/
      font-size: 12px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    span {
      margin: 0 11px;
      font-size: 9px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
  .tips {
    text-align: center;

    h2 {
      margin-bottom: 5px;
      height: 12px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(1, 1, 1, 1);
    }
    h3 {
      height: 12px;
      font-size: 12px;
      font-weight: 400;
      text-decoration: underline;
      color: rgba(254, 132, 131, 1);
    }
  }
}

/*分类区域*/
.categories {
  padding: 5px;
  box-sizing: border-box;

  .category {
    position: relative;
    /*height: 162px;*/
    margin-bottom: 5px;
    /*display: flex;*/
    /*flex-direction: row;*/
    /*align-items: stretch;*/
    overflow: hidden;

    .category-bg {
      position: relative;
      width: 100%;
    }
    .category-image {
      position: absolute;
      max-width: 65%;
      max-height: 110%;
      top: 50%;
      transform: translate(0, -50%);
      z-index: 0;
    }
    .info {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      /*flex-shrink: 0;*/
      /*flex-grow: 0;*/
      /*width: 224px;*/
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1;

      .title {
        margin-bottom: 9px;
        height: 12px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        text-align: center;
      }
      .sub-title {
        height: 18px;
        font-size: 18px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        text-align: center;
      }
    }
  }
  .category.left-title {
    /*justify-content: flex-start;*/
    .category-image {
      right: 0;
    }
    .info {
      width: 221px;
      left: 0;
    }
  }
  .category.right-title {
    /*justify-content: flex-end;*/
    .category-image {
      left: 0;
    }
    .info {
      width: 181px;
      right: 0;
    }
  }
}

/*推荐区域*/
.recommend {
  padding: 41px 0;
  background: rgba(255, 242, 242, 1);

  .title {
    /*letter-spacing: 2px;*/
    margin-bottom: 9px;
    /*height: 18px;*/
    font-size: 18px;
    font-weight: bold;
    color: rgba(1, 1, 1, 1);
  }
  .sub-title {
    margin-bottom: 15px;
    height: 15px;
    font-size: 15px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }
  .title-line {
    margin: 0 auto 30px auto;
    width: 50px;
    height: 1px; /*no*/
    background-color: #000000;
  }
  .cards {
    margin-bottom: 20px;
    height: 360px;
    background-color: #fff2f2;

    .recommend-item {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 10px 10px 0 10px;
      box-sizing: border-box;
      background-color: #ffffff;

      .product-image {
        position: relative;
        width: 100%;
        height: 270px;
        font-size: 0;
        line-height: 0;
        margin-bottom: 10px;
        /*background-color: #cebeb0;*/

        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-width: 100%;
          max-height: 100%;
        }
      }
      .product-price {
        margin-bottom: 7px;
        height: 18px;
        text-align: center;
        font-size: 18px;
        font-weight: 400;
        color: rgba(242, 155, 135, 1);
        line-height: 17px;

        span {
          margin: 0 5px;
        }
      }
      .product-name {
        margin-bottom: 11px;
        height: 14px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .more {
        height: 10px;
        font-size: 9px;
        font-weight: 400;
        text-align: center;
        text-decoration: underline;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  .indicator {
    margin-bottom: 20px;
    text-align: center;

    .indicator-item {
      margin: 0 5px;
      width: 10px;
      height: 10px;
      background-color: #ffffff;
      border-radius: 2px;
      display: inline-block;
    }
    .indicator-item.active {
      background: #d0a2a4;
    }
  }
  .others {
    width: 100%;
    text-align: center;

    .see-more {
      width: 130px;
      height: 30px;
      background: rgba(208, 162, 164, 1);
      box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.1); /*no*/
      border-radius: 2px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}

/*联系我们*/
.contact-us {
  padding: 18px 15px 30px 15px;
  box-sizing: border-box;

  .title {
    position: relative;
    margin-bottom: 26px;
    height: 15px;
    font-size: 15px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    text-align: center;

    &:after {
      content: '';
      position: absolute;
      top: 24px;
      left: calc(50% - 22px);
      width: 44px;
      height: 1px; /*no*/
      background: rgba(221, 221, 221, 1);
    }
  }
  .map {
    margin-bottom: 15px;

    img {
      width: 100%;
    }
  }
  .info {
    .info-row {
      min-height: 50px;
      padding: 10px 0;
      border-top: 1px solid rgba(190, 190, 190, 1); /*no*/
      display: flex;
      align-items: center;
      justify-content: center;

      .line {
        margin-right: 6px;
        width: 30px;
        height: 1px; /*no*/
        background: rgba(190, 190, 190, 1);
        flex-grow: 0;
        flex-shrink: 0;
      }
      .row-name {
        width: 66px;
        height: 9px;
        font-size: 9px;
        font-weight: 400;
        text-align: left;
        color: rgba(153, 153, 153, 1);
        flex-grow: 0;
        flex-shrink: 0;
      }
      .row-text {
        /*height: 12px;*/
        font-size: 12px;
        font-weight: 400;
        text-align: left;
        color: rgba(0, 0, 0, 1);
        flex-grow: 1;
        flex-shrink: 1;

        a {
          color: initial;
        }
      }
      .column-line {
        width: 1px; /*no*/
        height: 30px;
        background: rgba(190, 190, 190, 1);
        flex-grow: 0;
        flex-shrink: 0;
      }
      .row-icon {
        width: 70px;
        flex-grow: 0;
        flex-shrink: 0;

        .iconfont {
          color: #a3a3a3;
        }
        .iconphone {
          font-size: 24px;
        }
        .iconyouxiang {
          font-size: 31px;
        }
      }
      .contact-button {
        width: 170px;
        height: 30px;
        background: rgba(208, 162, 164, 1);
        box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.1); /*no*/
        border-radius: 2px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }

    .info-row:nth-of-type(1) {
      border-bottom: 0;
      /*border-bottom: 1px solid rgba(190, 190, 190, 1); !*no*!*/
    }
  }
}
</style>
