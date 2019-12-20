<template>
  <div v-if="activityStart" class="single-dog">
    <div class="banner">
      <img
        src="../../static/activity/double-eleven/banner.png"
        class="background-banner"
      />
      <img
        v-if="$store.state.language === `zh_TW`"
        src="../../static/activity/double-eleven/chinese-word.png"
        class="word"
      />
      <img
        v-else
        src="../../static/activity/double-eleven/english-word.png"
        class="word"
      />
      <div class="promotion-code-word">{{ lang.promotionCode }}</div>
      <div class="promotion-code-code">SINGLESDAY11</div>
    </div>
    <div class="middle-banner">
      <div class="not-the-same">{{ lang.notTheSame }}</div>
      <div class="proDesign">{{ lang.proDesign }}</div>
      <img
        src="../../static/activity/double-eleven/not-the-same.png"
        class="nts-banner"
      />
      <div class="btn" @click="goGangLian()">SHOP NOW</div>
    </div>
    <section class="recommend">
      <div class="ring-info">
        <img class="bg" src="../../static/activity/double-eleven/BG-n.png" />
        <h1 class="title">ENGAGEMENT RINGS</h1>
        <h2 class="sub-title">{{ lang.chooseRing }}</h2>
        <h4 class="small-title">{{ lang.promise }}</h4>
        <h3 class="title-line"></h3>
        <div class="product" @click="toDetail(activeRecommendInfo)">
          <div class="product-image">
            <img :src="activeRecommendInfo.goodMainImage" @error="imageError" />
          </div>
          <div class="product-price">
            <span class="currency">{{ coinType }}</span>
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
          <img
            :src="imageStrToArray(each.goodMainImage)[0]"
            @error="imageError"
          />
        </div>
      </div>
      <div class="others">
        <a :href="customMade" target="_blank"
          ><button class="see-more">
            MORE
          </button>
        </a>
      </div>
    </section>
    <div v-if="showActivityProducts" class="special-show">
      <div class="special-show-title">{{ lang.specialShow }}</div>
      <div class="special-show-sub-title">{{ lang.writeDie }}</div>
      <div class="good-box">
        <div
          v-for="(g, index) in specialOffer"
          :key="index"
          class="good-block"
          @click="toDetail(g)"
        >
          <div class="good-img">
            <img
              :src="imageStrToArray(g.goodMainImage)[0]"
              class="good-img-good"
              @error="imageError"
            />
            <img
              src="../../static/activity/double-eleven/11icon.png"
              class="icon11"
            />
          </div>
          <div class="good-title">{{ g.goodsName }}</div>
          <div class="good-price-fake">
            {{ coinType }} {{ formatNumber(g.salePrice) }}
          </div>
          <div class="good-price-real">
            {{ coinType }} {{ formatNumber(g.activityPrice) }}
          </div>
          <div class="good-buy-btn" @click="toDetail(g)">{{ lang.btn }}</div>
        </div>
      </div>
    </div>
    <div v-if="showActivityProducts" class="special-show">
      <div class="special-show-title">Best Seller</div>
      <div class="special-show-sub-title"></div>
      <div class="good-box">
        <div
          v-for="(g, index) in bestSeller"
          :key="index"
          class="good-block"
          @click="toDetail(g)"
        >
          <div class="good-img">
            <img
              :src="imageStrToArray(g.goodMainImage)[0]"
              class="good-img-good"
              @error="imageError"
            />
            <img
              src="../../static/activity/double-eleven/11icon.png"
              class="icon11"
            />
          </div>
          <div class="good-title">{{ g.goodsName }}</div>
          <div class="good-price-fake">
            {{ coinType }} {{ formatNumber(g.salePrice) }}
          </div>
          <div class="good-price-real">
            {{ coinType }} {{ formatNumber(g.activityPrice) }}
          </div>
          <div class="good-buy-btn">{{ lang.btn }}</div>
        </div>
      </div>
    </div>
    <div v-if="showActivityProducts" class="see-more-why">
      <div class="see-more-btn" @click="shopNow()">SEE MORE</div>
    </div>
  </div>
  <div v-else-if="!activityStart && nowTime !== 0" class="endGame">
    <div class="sb-endBox">
      <img src="../../static/activity/double-eleven/endGame.png" />
      <div>{{ lang.end }}</div>
      <span class="sb-time"> {{ sbTime }} S </span>
    </div>
  </div>
</template>

<script>
import Moment from 'moment/moment'
const activityStartTime = Moment('2019-10-28 00:00').format('X')
const activityEndTime = Moment('2019-11-12 00:00').format('X')
const activityProductsShowTime = Moment('2019-11-10 12:00').format('X')
export default {
  head() {
    return this.seoInfo || {}
  },
  name: 'SingleDogFestival',
  data() {
    return {
      lang: this.LANGUAGE.singleDog,
      recommends: [
        {
          goodMainImage: require('../../static/activity/double-eleven/recommend/595/main.png'),
          salePrice: 2250,
          goodsName: {
            en_US: 'Classic Four-Claw Solitaire Engagement Ring Setting',
            zh_TW: '經典四爪單石訂婚戒托'
          }[this.$store.state.language],
          to: {
            name: 'engagement-engagement-rings',
            query: {
              goodId: 595
            }
          }
        },
        {
          goodMainImage: require('../../static/activity/double-eleven/recommend/599/main.png'),
          salePrice: 4555,
          goodsName: {
            en_US: 'Micro Pave Diamond Engagement Ring Setting (0.176 ct. tw.)',
            zh_TW: '經典密釘鑽石訂婚戒托（0.176 克拉總重量)'
          }[this.$store.state.language],
          to: {
            name: 'engagement-engagement-rings',
            query: {
              goodId: 599
            }
          }
        },
        {
          goodMainImage: require('../../static/activity/double-eleven/recommend/605/main.png'),
          salePrice: 6600,
          goodsName: {
            en_US:
              'Split Shank Diamond Engagement Ring Setting (0.251 ct. tw.)',
            zh_TW: '分叉戒環訂婚戒托（0.251 克拉總重量）'
          }[this.$store.state.language],
          to: {
            name: 'engagement-engagement-rings',
            query: {
              goodId: 605
            }
          }
        },
        {
          goodMainImage: require('../../static/activity/double-eleven/recommend/606/main.png'),
          salePrice: 6685,
          goodsName: {
            en_US:
              '14K White Gold Petal Diamond Engagement Ring Setting (0.145 ct. tw.)',
            zh_TW: '14K白金花瓣鑽石訂婚戒托（0.145 克拉總重量）'
          }[this.$store.state.language],
          to: {
            name: 'engagement-engagement-rings',
            query: {
              goodId: 606
            }
          }
        },
        {
          goodMainImage: require('../../static/activity/double-eleven/recommend/617/main.png'),
          salePrice: 4355,
          goodsName: {
            en_US:
              'Platinum Classic Four-Claw Solitaire Engagement Ring Setting',
            zh_TW: '鉑金經典四爪單石訂婚戒托'
          }[this.$store.state.language],
          to: {
            name: 'engagement-engagement-rings',
            query: {
              goodId: 617
            }
          }
        }
      ],
      activeRecommend: 0,
      coinType: `HKD`,
      specialOffer: [
        {
          goodMainImage: require('../../static/activity/double-eleven/special-offer/1.png'),
          salePrice: 1303,
          activityPrice: 1111,
          goodsName: {
            en_US: '18K White Gold Diamond Necklace',
            zh_TW: '18K白金鑽石項鍊'
          }[this.$store.state.language],
          to: {
            name: 'accessories-accessories',
            query: {
              goodId: 583
            }
          }
        },
        {
          goodMainImage: require('../../static/activity/double-eleven/special-offer/2.png'),
          salePrice: 1317,
          activityPrice: 1111,
          goodsName: {
            en_US: '18K White Gold Diamond Necklace',
            zh_TW: '18K白金鑽石項鍊'
          }[this.$store.state.language],
          to: {
            name: 'accessories-accessories',
            query: {
              goodId: 584
            }
          }
        },
        {
          goodMainImage: require('../../static/activity/double-eleven/special-offer/3.png'),
          salePrice: 1186,
          activityPrice: 1111,
          goodsName: {
            en_US: '18K White Gold Diamond Necklace',
            zh_TW: '18K白金鑽石項鍊'
          }[this.$store.state.language],
          to: {
            name: 'accessories-accessories',
            query: {
              goodId: 590
            }
          }
        },
        {
          goodMainImage: require('../../static/activity/double-eleven/special-offer/4.png'),
          salePrice: 1323,
          activityPrice: 1111,
          goodsName: {
            en_US: '18K White Gold Diamond Necklace',
            zh_TW: '18K白金鑽石項鍊'
          }[this.$store.state.language],
          to: {
            name: 'accessories-accessories',
            query: {
              goodId: 591
            }
          }
        },
        {
          goodMainImage: require('../../static/activity/double-eleven/special-offer/5.png'),
          salePrice: 1340,
          activityPrice: 1111,
          goodsName: {
            en_US: '18K White Gold Diamond Bracelet',
            zh_TW: '18K白金鑽石手鍊'
          }[this.$store.state.language],
          to: {
            name: 'accessories-accessories',
            query: {
              goodId: 522
            }
          }
        },
        {
          goodMainImage: require('../../static/activity/double-eleven/special-offer/6.png'),
          salePrice: 1181,
          activityPrice: 1111,
          goodsName: {
            en_US: '18K White Gold Diamond Bracelet',
            zh_TW: '18K白金鑽石手鍊'
          }[this.$store.state.language],
          to: {
            name: 'accessories-accessories',
            query: {
              goodId: 523
            }
          }
        }
      ],
      bestSeller: [
        {
          order: 1,
          goodMainImage: require('../../static/activity/double-eleven/best-seller/1.png'),
          salePrice: 19310,
          activityPrice: 16980,
          goodsName: {
            en_US: '18K White Gold Diamond Bangle',
            zh_TW: '18K白金密鑲鑽石手鐲'
          }[this.$store.state.language],
          to: {
            name: 'accessories-accessories',
            query: {
              goodId: 165
            }
          }
        },
        {
          order: 2,
          goodMainImage: require('../../static/activity/double-eleven/best-seller/2.png'),
          salePrice: 15135,
          activityPrice: 12000,
          goodsName: {
            en_US: '14K Rose Gold Diamond Bangle',
            zh_TW: '14K玫瑰金密鑲鑽石手鐲'
          }[this.$store.state.language],
          to: {
            name: 'accessories-accessories',
            query: {
              goodId: 154
            }
          }
        },
        {
          order: 4,
          goodMainImage: require('../../static/activity/double-eleven/best-seller/3.png'),
          salePrice: 5500,
          activityPrice: 4670,
          goodsName: {
            en_US: '18K White Gold Diamond  Bracelet',
            zh_TW: '18K白金鑽石手鍊'
          }[this.$store.state.language],
          to: {
            name: 'accessories-accessories',
            query: {
              goodId: 134
            }
          }
        },
        {
          order: 5,
          goodMainImage: require('../../static/activity/double-eleven/best-seller/4.png'),
          salePrice: 7520,
          activityPrice: 6390,
          goodsName: {
            en_US: '18K White Gold Diamond  Bracelet',
            zh_TW: '18K白金鑽石手鍊'
          }[this.$store.state.language],
          to: {
            name: 'accessories-accessories',
            query: {
              goodId: 140
            }
          }
        }
      ],
      nowTime: 0,
      sbTime: 3,
      sbCheck: null
    }
  },
  computed: {
    activeRecommendInfo() {
      return this.recommends[this.activeRecommend]
    },
    activityStart() {
      return (
        activityStartTime <= this.nowTime && this.nowTime <= activityEndTime
      )
      // return false
    },
    showActivityProducts() {
      return this.nowTime >= activityProductsShowTime
      // return true
    },
    customMade() {
      const melo = {
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
            ct: 1,
            cartId: ``,
            page: `list`
          }
        ]
      }
      return `/custom-made/ring-made/ring-list?step=1&melo=${this.$helpers.base64Encode(
        JSON.stringify(melo)
      )}`
    }
  },
  // layout: `no-footer-bar`,
  asyncData({ app, $axios, route, store }) {
    return {
      seoInfo: {
        title: app.$bddLanguage.singleDog.pageTitle
      }
    }
  },
  mounted() {
    this.sbCheck = setInterval(() => {
      this.nowTime = Moment().format('X')
      this.sbXuQiu()
    }, 1000)
  },
  methods: {
    changeActivePairRing(n) {
      this.activeRecommend = n
    },
    toDetail(obj) {
      this.$router.push(obj.to)
    },
    shopNow() {
      this.$router.push(`/accessories/list`)
    },
    goGangLian() {
      const melo = {
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
            ct: 1,
            cartId: ``,
            page: `list`
          }
        ]
      }
      this.$router.push({
        name: `custom-made-ring-made-ring-list`,
        query: {
          melo: this.$helpers.base64Encode(JSON.stringify(melo)),
          step: 1
        }
      })
    },
    sbXuQiu() {
      if (!this.activityStart) {
        // setTimeout(() => {
        //   this.$router.push(`/`)
        // }, 5000)
        const sbT = setInterval(() => {
          this.sbTime--
          if (this.sbTime <= 0) {
            this.$router.push(`/`)
            this.sbTime = 0
            clearInterval(sbT)
            clearInterval(this.sbCheck)
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.single-dog {
  width: 100%;
  position: relative;
  overflow: hidden;
  .banner {
    width: 100%;
    height: 480px;
    position: relative;
    overflow: hidden;
    margin-bottom: 40px;
    background: #fcdbdc;
    .background-banner {
      display: block;
      height: 480px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    .word {
      width: 47.733333%;
      max-width: 180px;
      position: absolute;
      bottom: 34.47916%;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .promotion-code-word {
      width: 100%;
      font-size: 12px;
      text-align: center;
      color: rgba(78, 58, 85, 1);
      line-height: 12px;
      position: absolute;
      bottom: percentage(279/960);
    }
    .promotion-code-code {
      width: 110px;
      height: 20px;
      font-size: 15px;
      text-align: center;
      color: #ffffff;
      line-height: 20px;
      position: absolute;
      bottom: percentage(225/960);
      left: 0;
      right: 0;
      background: #bf91ab;
      margin: 0 auto;
    }
  }
  .middle-banner {
    width: 100%;
    position: relative;
    overflow: hidden;
    margin-bottom: 40px;
    .not-the-same {
      font-size: 18px;
      line-height: 18px;
      color: #000;
      margin-bottom: 9px;
    }
    .proDesign {
      font-size: 12px;
      line-height: 12px;
      font-weight: 300;
      margin-bottom: 40px;
    }
    .nts-banner {
      width: 100%;
    }
    .btn {
      width: 130px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #ffffff;
      font-size: 12px;
      background: rgba(255, 94, 142, 1);
      /*box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.1);*/
      border-radius: 2px;
      margin: 0 auto;
    }
  }
  /*推荐对戒*/
  .recommend {
    margin-bottom: 10px;
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
      .small-title {
        height: 10px;
        line-height: 10px;
        font-size: 10px;
        font-weight: 300;
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
          color: #de9595;
          margin-bottom: 7px;
          font-family: twCenMt;
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
        height: 92px;
        margin: 15px 10px;
        line-height: 0;
        /*box-shadow: 2px 2px 0 0 rgba(243, 224, 219, 1);*/
        display: inline-block;
        box-sizing: border-box;
        border-bottom: 2px solid rgba(243, 224, 219, 1);
      }
      .ring-item.active {
        /*box-shadow: 4px 4px 0 0 rgba(208, 171, 166, 1);*/
        height: 94px;
        border-bottom: 4px solid #de9595;
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
        background: #ff5e8e;
        box-shadow: 3px 3px 1px 0 rgba(0, 0, 0, 0.1); /*no*/
        border-radius: 2px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .special-show {
    width: 100%;
    position: relative;
    overflow: hidden;
    background: rgba(255, 247, 248, 1);
    padding-top: 40px;
    .special-show-title {
      font-size: 18px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 18px;
      margin-bottom: 9px;
    }
    .special-show-sub-title {
      font-size: 12px;
      font-weight: 300;
      color: rgba(0, 0, 0, 1);
      line-height: 12px;
      margin-bottom: 40px;
    }
    .good-box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 5px;
      .good-block {
        width: calc((100% - 5px) / 2);
        background: #fff;
        margin-bottom: 5px;
        overflow: hidden;
        .good-img {
          width: 180px;
          height: 180px;
          margin: 0 auto 24.5-9.5px;
          position: relative;
          font-size: 0;
          line-height: 0;
          .good-img-good {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 100%;
            max-height: 100%;
          }
          .icon11 {
            width: 23px;
            height: 23px;
            display: block;
            position: absolute;
            bottom: 9.5px;
            right: 14.5px;
          }
        }
        .good-title {
          width: 180px;
          text-align: center;
          font-size: 12px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /* autoprefixer: ignore next */
          -webkit-box-orient: vertical;
          margin: 0 auto 10px;
        }
        .good-price-fake {
          width: 180px;
          text-align: center;
          height: 10px;
          font-size: 10px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 10px;
          text-decoration: line-through;
          margin: 0 auto 8.5px;
        }
        .good-price-real {
          width: 180px;
          height: 14px;
          font-size: 14px;
          font-family: twCenMt;
          font-weight: 400;
          color: rgba(249, 62, 131, 1);
          line-height: 14px;
          margin: 0 auto 7.5px;
        }
        .good-buy-btn {
          width: 100px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          font-size: 12px;
          font-weight: 300;
          color: #ffffff;
          background: rgba(249, 62, 131, 1);
          border-radius: 5px;
          margin: 0 auto 14px;
        }
      }
    }
  }
  .see-more-why {
    width: 100%;
    height: 90px;
    background: rgba(255, 247, 248, 1);
    padding: 30px 0;
    .see-more-btn {
      width: 130px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      color: #ffffff;
      text-align: center;
      background: rgba(255, 144, 129, 1);
      margin: 0 auto;
    }
  }
}
.endGame {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 900;
  .sb-endBox {
    width: 280px;
    height: 120px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    img {
      display: block;
      width: 280px;
      height: 120px;
    }
    div {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      /*bottom: 0;*/
      margin: 60px auto 0;
      color: white;
      font-size: 20px;
      padding: 0 10px;
      /*text-align: center;*/
      /*margin-top: 70px;*/
    }
  }
  .sb-time {
    position: absolute;
    left: 0;
    right: 0;
    margin: 10px auto;
    color: white;
    font-size: 20px;
  }
}
</style>
