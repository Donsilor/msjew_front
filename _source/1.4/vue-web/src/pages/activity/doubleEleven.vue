<template>
  <div
    v-if="activityStart"
    class="page-content">
    <section class="banner">
      <div class="bg">
        <img src="../../../static/images/activity/doubleEleven/bg.png" >
      </div>
      <div class="title-content">
        <div class="title-image">
          <img :src="bannerTitle" >
        </div>
        <div class="coupon">
          {{ lang.coupon }}:
        </div>
        <div class="coupon-code">{{lang.sss}}}</div>
      </div>
      <div class="text-content">
        <h2 class="title">{{ lang.differentDoubleElevenTitle }}</h2>
        <h3 class="sub-title">{{ lang.differentDoubleElevenSubTitle }}</h3>
      </div>
      <div class="button-group">
        <button
          @click="moreRecommend">SHOP NOW</button>
      </div>
    </section>

    <section class="custom-area">
      <div
        v-if="recommends.length>0"
        class="adv">
        <img :src="recommends[activeRecommendIndex].banner" >
      </div>
      <div class="custom-list">
        <div class="custom-swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide">
              <div>
                <router-link :to="activeRecommendProduct.to">
                  <img
                    :src="activeRecommendProduct.goodMainImage"
                    alt
                    class="img-top">
                  <div>{{ coinType }} {{ formatMoney(activeRecommendProduct.salePrice) }}</div>
                  <p>{{ activeRecommendProduct.goodsName }}</p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <span
            v-for="(item,index) in recommends"
            v-if="index<=5"
            :key="index"
            :class="activeRecommendIndex===index?'active':''"
            @click="changeActiveRecommendIndex(index)"/>
        </div>
        <div
          class="custom-next swiper-button-next swiper-button-black"
          @click="nextActiveRecommend"/>
        <div
          class="custom-prev swiper-button-prev swiper-button-black"
          @click="prevActiveRecommend"/>
      </div>
      <ul>
        <li
          v-for="(item,index) in recommends"
          v-if="index<=4"
          :key="index"
          :class="activeRecommendIndex===index?'active':''"
          @click="changeActiveRecommendIndex(index)"><img :src="item.goodMainImage" ></li>
      </ul>
      <div
        class="more"
        @click="moreRecommend">MORE
        <img src="../../../static/images/weddingRing/jiantou.png" >
      </div>
    </section>
    <section
      v-if="showActivityProducts"
      class="activity-products">
      <div class="type-group special-offer">
        <h2 class="title">{{ lang.specialOffer }}</h2>
        <h4 class="sub-title">{{ lang.only1111 }}</h4>
        <div class="product-list">
          <div
            v-for="(item, index) in specialOffer"
            :key="index"
            class="product">
            <router-link :to="item.to">
              <div class="image">
                <img
                  :src="item.goodMainImage"
                  class="main-image" >
                <img
                  class="activity-logo"
                  src="../../../static/images/activity/doubleEleven/11icon.png" >
              </div>
              <div class="name">
                {{ item.goodsName }}
              </div>
              <div class="sale-price">
                {{ coinType }}&nbsp; {{ formatMoney(item.salePrice) }}
              </div>
              <div class="activity-price">
                {{ coinType }}&nbsp; {{ formatMoney(item.activityPrice) }}
              </div>
              <div class="button-group">
                <button>{{ lang.buyNow }}</button>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="type-group best-seller">
        <h2 class="title">{{ lang.bestSeller }}</h2>
        <div class="product-list">
          <div
            v-for="(item, index) in bestSeller"
            :key="index"
            :style="{ order: item.order }"
            class="product">
            <router-link :to="item.to">
              <div class="image">
                <img
                  :src="item.goodMainImage"
                  class="main-image" >
                <img
                  class="activity-logo"
                  src="../../../static/images/activity/doubleEleven/11icon.png" >
              </div>
              <div class="name">
                {{ item.goodsName }}
              </div>
              <div class="sale-price">
                {{ coinType }}&nbsp; {{ formatMoney(item.salePrice) }}
              </div>
              <div class="activity-price">
                {{ coinType }}&nbsp; {{ formatMoney(item.activityPrice) }}
              </div>
              <div class="button-group">
                <button>{{ lang.buyNow }}</button>
              </div>
            </router-link>
          </div>

          <div
            v-for="(adItem, adIndex) in bestSellerAd"
            :key="adIndex + '-ad'"
            :style="{ order: adItem.order }"
            class="best-seller-ad">
            <img :src="adItem.image" >
          </div>

          <div class="more-product">
            <router-link :to="{ name: 'jewelleryAccessories', params: { id: 206, key: 1 } }">
              <button>{{ lang.seeMore }}</button>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div
    v-else
    class="activity-end">
    <div class="content">
      <div class="end-box-bg">
        <img src="../../../static/images/activity/doubleEleven/is-end.png" >
      </div>
      <div class="message">
        <div class="content-message">
          {{ lang.activityEnd }}
        </div>
        <div class="content-timeout">
          {{ timeOutNum }}{{ lang.second }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from 'moment';
import { formatMoney } from '@/api/filterUtil.js';
const language = localStorage.getItem('locale') || 'en_US';
const coinType = 'HKD';

const nowTime = Moment().format('X');
const activityStartTime = Moment('2019-10-28 00:00').format('X');
// const activityEndTime = Moment('2019-10-31 12:59').format('X');
const activityEndTime = Moment('2019-12-01 00:00').format('X');
const activityProductsShowTime = Moment('2019-11-10 12:00').format('X');

export default {
  data() {
    return {
      lang: this.$LANGUAGE.activity.doubleEleven,
      bannerTitle: language === 'en_US' ? require('../../../static/images/activity/doubleEleven/en-title.png') : require('../../../static/images/activity/doubleEleven/zh-title.png'),
      coinType: coinType,
      recommends: [
        {
          banner: require('../../../static/images/activity/doubleEleven/recommend/595/banner.png'),
          goodMainImage: require('../../../static/images/activity/doubleEleven/recommend/595/main.png'),
          salePrice: 2250,
          goodsName: {
            'en_US': 'Classic Four-Claw Solitaire Engagement Ring Setting',
            'zh_TW': '經典四爪單石訂婚戒托'
          }[language],
          to: {
            name: 'seleceEngagement',
            params: {
              id: 595,
              key: 0
            }
          }
        },
        {
          banner: require('../../../static/images/activity/doubleEleven/recommend/599/banner.png'),
          goodMainImage: require('../../../static/images/activity/doubleEleven/recommend/599/main.png'),
          salePrice: 4555,
          goodsName: {
            'en_US': 'Micro Pave Diamond Engagement Ring Setting (0.176 ct. tw.)',
            'zh_TW': '經典密釘鑽石訂婚戒托（0.176 克拉總重量)'
          }[language],
          to: {
            name: 'seleceEngagement',
            params: {
              id: 599,
              key: 0
            }
          }
        },
        {
          banner: require('../../../static/images/activity/doubleEleven/recommend/605/banner.png'),
          goodMainImage: require('../../../static/images/activity/doubleEleven/recommend/605/main.png'),
          salePrice: 6600,
          goodsName: {
            'en_US': 'Split Shank Diamond Engagement Ring Setting (0.251 ct. tw.)',
            'zh_TW': '分叉戒環訂婚戒托（0.251 克拉總重量）'
          }[language],
          to: {
            name: 'seleceEngagement',
            params: {
              id: 605,
              key: 0
            }
          }
        },
        {
          banner: require('../../../static/images/activity/doubleEleven/recommend/606/banner.png'),
          goodMainImage: require('../../../static/images/activity/doubleEleven/recommend/606/main.png'),
          salePrice: 6685,
          goodsName: {
            'en_US': '14K White Gold Petal Diamond Engagement Ring Setting (0.145 ct. tw.)',
            'zh_TW': '14K白金花瓣鑽石訂婚戒托（0.145 克拉總重量）'
          }[language],
          to: {
            name: 'seleceEngagement',
            params: {
              id: 606,
              key: 0
            }
          }
        },
        {
          banner: require('../../../static/images/activity/doubleEleven/recommend/617/banner.png'),
          goodMainImage: require('../../../static/images/activity/doubleEleven/recommend/617/main.png'),
          salePrice: 4355,
          goodsName: {
            'en_US': 'Platinum Classic Four-Claw Solitaire Engagement Ring Setting',
            'zh_TW': '鉑金經典四爪單石訂婚戒托'
          }[language],
          to: {
            name: 'seleceEngagement',
            params: {
              id: 617,
              key: 0
            }
          }
        }
      ],
      activeRecommendIndex: 0,

      specialOffer: [
        {
          goodMainImage: require('../../../static/images/activity/doubleEleven/special-offer/1.png'),
          salePrice: 1303,
          activityPrice: 1111,
          goodsName: {
            'en_US': '18K White Gold Diamond Necklace',
            'zh_TW': '18K白金鑽石項鍊'
          }[language],
          to: {
            name: 'seleceJewellery',
            params: {
              id: 583,
              key: 0
            }
          }
        },
        {
          goodMainImage: require('../../../static/images/activity/doubleEleven/special-offer/2.png'),
          salePrice: 1317,
          activityPrice: 1111,
          goodsName: {
            'en_US': '18K White Gold Diamond Necklace',
            'zh_TW': '18K白金鑽石項鍊'
          }[language],
          to: {
            name: 'seleceJewellery',
            params: {
              id: 584,
              key: 0
            }
          }
        },
        {
          goodMainImage: require('../../../static/images/activity/doubleEleven/special-offer/3.png'),
          salePrice: 1186,
          activityPrice: 1111,
          goodsName: {
            'en_US': '18K White Gold Diamond Necklace',
            'zh_TW': '18K白金鑽石項鍊'
          }[language],
          to: {
            name: 'seleceJewellery',
            params: {
              id: 590,
              key: 0
            }
          }
        },
        {
          goodMainImage: require('../../../static/images/activity/doubleEleven/special-offer/4.png'),
          salePrice: 1323,
          activityPrice: 1111,
          goodsName: {
            'en_US': '18K White Gold Diamond Necklace',
            'zh_TW': '18K白金鑽石項鍊'
          }[language],
          to: {
            name: 'seleceJewellery',
            params: {
              id: 591,
              key: 0
            }
          }
        },
        {
          goodMainImage: require('../../../static/images/activity/doubleEleven/special-offer/5.png'),
          salePrice: 1340,
          activityPrice: 1111,
          goodsName: {
            'en_US': '18K White Gold Diamond Bracelet',
            'zh_TW': '18K白金鑽石手鍊'
          }[language],
          to: {
            name: 'seleceJewellery',
            params: {
              id: 522,
              key: 0
            }
          }
        },
        {
          goodMainImage: require('../../../static/images/activity/doubleEleven/special-offer/6.png'),
          salePrice: 1181,
          activityPrice: 1111,
          goodsName: {
            'en_US': '18K White Gold Diamond Bracelet',
            'zh_TW': '18K白金鑽石手鍊'
          }[language],
          to: {
            name: 'seleceJewellery',
            params: {
              id: 523,
              key: 0
            }
          }
        }
      ],
      bestSeller: [
        {
          order: 1,
          goodMainImage: require('../../../static/images/activity/doubleEleven/best-seller/1.png'),
          salePrice: 19310,
          activityPrice: 16980,
          goodsName: {
            'en_US': '18K White Gold Diamond Bangle',
            'zh_TW': '18K白金密鑲鑽石手鐲'
          }[language],
          to: {
            name: 'seleceJewellery',
            params: {
              id: 165,
              key: 0
            }
          }
        },
        {
          order: 2,
          goodMainImage: require('../../../static/images/activity/doubleEleven/best-seller/2.png'),
          salePrice: 15135,
          activityPrice: 12000,
          goodsName: {
            'en_US': '14K Rose Gold Diamond Bangle',
            'zh_TW': '14K玫瑰金密鑲鑽石手鐲'
          }[language],
          to: {
            name: 'seleceJewellery',
            params: {
              id: 154,
              key: 0
            }
          }
        },
        {
          order: 4,
          goodMainImage: require('../../../static/images/activity/doubleEleven/best-seller/3.png'),
          salePrice: 5500,
          activityPrice: 4670,
          goodsName: {
            'en_US': '18K White Gold Diamond  Bracelet',
            'zh_TW': '18K白金鑽石手鍊'
          }[language],
          to: {
            name: 'seleceJewellery',
            params: {
              id: 134,
              key: 0
            }
          }
        },
        {
          order: 5,
          goodMainImage: require('../../../static/images/activity/doubleEleven/best-seller/4.png'),
          salePrice: 7520,
          activityPrice: 6390,
          goodsName: {
            'en_US': '18K White Gold Diamond  Bracelet',
            'zh_TW': '18K白金鑽石手鍊'
          }[language],
          to: {
            name: 'seleceJewellery',
            params: {
              id: 140,
              key: 0
            }
          }
        }
      ],
      bestSellerAd: [
        {
          order: 3,
          image: require('../../../static/images/activity/doubleEleven/ad-1.png')
        },
        {
          order: 6,
          image: require('../../../static/images/activity/doubleEleven/ad-2.png')
        }
      ],
      nowTime,

      timeInterval: null,
      secondInterval: null,

      timeOutNum: 3
    };
  },
  computed: {
    activityStart() {
      return (activityStartTime <= this.nowTime) && (this.nowTime <= activityEndTime);
    },
    showActivityProducts() {
      return this.nowTime >= activityProductsShowTime;
    },
    activeRecommendProduct() {
      return this.recommends[this.activeRecommendIndex];
    }
  },
  created() {
    const _this = this;
    if (!_this.activityStart) {
      _this.leaveOut();
      return;
    }
    _this.timeInterval = setInterval(() => {
      _this.nowTime = Moment().format('X');
      if (!_this.activityStart) {
        _this.leaveOut();
      }
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.secondInterval);
    clearInterval(this.timeInterval);
  },
  mounted() {
    this.$nextTick(() => {
      document.title = this.lang.pageTitle;
    });
  },
  methods: {
    formatMoney: formatMoney,
    changeActiveRecommendIndex(index) {
      this.activeRecommendIndex = index;
    },
    nextActiveRecommend() {
      const nextIndex = this.activeRecommendIndex + 1;
      this.changeActiveRecommendIndex(nextIndex > 4 ? 0 : nextIndex);
    },
    prevActiveRecommend() {
      const prevIndex = this.activeRecommendIndex - 1;
      this.changeActiveRecommendIndex(prevIndex < 0 ? 4 : prevIndex);
    },
    moreRecommend() {
      this.$router.push({
        name: 'engagementRing',
        params: {
          id: 0,
          key: 1
        }
      });
    },
    leaveOut() {
      const _this = this;
      _this.secondInterval = setInterval(() => {
        console.log('before===>', _this.timeOutNum);
        _this.timeOutNum--;
        console.log('after===>', _this.timeOutNum);
        if (_this.timeOutNum < 0) {
          clearInterval(_this.secondInterval);
          _this.$router.push({
            name: 'index'
          });
        }
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
  .page-content {
    min-width: 1360px;
    .banner {
      position: relative;
      .bg {
        position: relative;
        font-size: 0;
        line-height: 0;

        img {
          width: 100%;
        }
      }
      .title-content {
        position: absolute;
        top: 16%;
        left: 50%;
        transform: translate(-50%, 0);

        .title-image {
          margin-bottom: 20px;
          font-size: 0;
          line-height: 0;

          img {
            height: 96px;
          }
        }

        .coupon {
          margin-bottom: 5px;
          text-align: center;
          font-size:24px;
          font-weight:300;
          color:rgba(78,58,85,1);
          line-height:49px;
        }

        .coupon-code {
          margin: auto;
          padding: 10px 20px;
          background-color: #bf91ab;
          font-size:30px;
          font-weight:400;
          color:rgba(252,250,255,1);
          display: inline-block;
        }
      }
      .text-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 0);

        .title {
          margin-bottom: 10px;
          text-align: center;
          font-size:36px;
          font-weight:400;
          color:rgba(0,0,0,1);
        }

        .sub-title {
          text-align: center;
          font-size:18px;
          font-weight:300;
          color:rgba(0,0,0,1);
        }
      }
      .button-group {
        position: absolute;
        top: 88%;
        left: 22%;
        button {
          padding: 10px 30px;
          font-size:16px;
          font-weight:300;
          color:rgba(0,0,0,1);
          background-color: #ffffff;
          outline: none;
          border: 0;
        }
      }
    }
    .custom-area {
      width: 1360px;
      margin: 0 auto;
      position: relative;
      .custom-list {
        float: right;
        width: 640px;
        padding-top: 39px;
        overflow: hidden;
        height: 500px;
        position: relative;
        .pagination {
          margin-top: 16px;
          outline: none;
          span {
            width: 14px;
            height: 14px;
            background: #FDDEDF;
            border-radius: 50%;
            display: inline-block;
            cursor: pointer;
            margin-left: 12px;
            &:first-child {
              margin-left: 0px;
            }
          }
          .active {
            background: #A78B99;
          }
        }
        .swiper-button-black {
          height: 16px;
          cursor: pointer;
          position: absolute;
          outline: none;
        }
        .custom-swiper-container {
          width: 500px;
          margin: 0 auto;
          overflow: hidden;
          box-shadow: 0px 0px 10px 0px #FDDEDF;
          .swiper-slide {
            width: 500px;
            height: 420px;
            cursor: pointer;
            >div {
              width: 360px;
              margin: 0 auto;
              img {
                height: 312px;
                width: 312px;
                display: block;
                margin: 0 auto;
                margin-bottom: 14px;
              }
              div:nth-child(2) {
                font-size: 24px;
                color: rgba(242, 155, 135, 1);
                margin-bottom: 10px;
                font-weight: 300;
                font-family: twCenMt;
              }
              div:nth-child(3) {
                font-size: 14px;
                color: #333333;
              }
            }
          }
        }
      }
      .more {
        width: 98px;
        height: 34px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(178, 172, 164, 1);
        line-height: 34px;
        position: absolute;
        color: #B2ACA4;
        font-size: 14px;
        cursor: pointer;
        right: 22px;
        bottom: 132px;
        img {
          position: absolute;
          width: 40px;
          top: 12px;
          right: -20px;
        }
      }
      .adv {
        width: 720px;
        height: 500px;
        display: flex;
        align-items: center;
        float: left;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      ul {
        clear: both;
        overflow: auto;
        padding-top: 30px;
        padding-left: 5px;
        padding-bottom: 60px;
        li {
          cursor: pointer;
          float: left;
          height: 180px;
          width: 180px;
          cursor: pointer;
          margin-right: 60px;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .active {
          box-shadow: 0px 0px 10px 0px #FDDEDF;
        }
      }
    }
    .activity-products {
      width: 1360px;
      padding: 80px 140px 40px 140px;
      box-sizing: border-box;
      margin: 0 auto;
      background-color: #FFF7F8;

      .type-group {
        .title {
          margin-bottom: 13px;
          text-align: center;
          font-size:36px;
          font-weight:400;
          color:rgba(0,0,0,1);
        }
        .sub-title {
          margin-bottom: 70px;
          text-align: center;
          font-size:18px;
          font-weight:300;
          color:rgba(0,0,0,1);
        }
        .product-list {
          padding: 50px 60px 10px 60px;
          box-sizing: border-box;
          background-color: #ffffff;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .product {
            margin-bottom: 40px;
            width: 419px;
            text-align: center;
            box-sizing: border-box;
            transition: all 0.3s linear;

            &:hover {
            }

            .image {
              position: relative;
              width: 344px;
              height: 344px;
              margin: 0 auto;
              font-size: 0;
              line-height: 0;

              .main-image {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: 100%;
                max-height: 100%;
              }
              .activity-logo {
                position: absolute;
                bottom: 20px;
                right: 20px;
                width: 46px;
                height: 46px;
              }
            }
            .name {
              text-align: center;
              font-size:24px;
              font-weight:400;
              color:rgba(51,51,51,1);
              line-height:56px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
            .sale-price {
              font-size:16px;
              font-weight:400;
              color:rgba(51,51,51,1);
              text-decoration-line: line-through;
              font-family: twCenMt;
            }
            .activity-price {
              font-size:30px;
              font-weight:400;
              color:rgba(249,62,131,1);
              line-height:56px;
              font-family: twCenMt;
            }
            .button-group {
              text-align: center;

              button {
                outline: none;
                border: 0;
                padding: 10px 35px;
                color: #ffffff;
                font-size:16px;
                font-weight:300;
                background-color: #F93E83;
              }
            }
          }
        }

        &.special-offer {
          margin-bottom: 100px;
        }

        &.best-seller {
          .title {
            margin-bottom: 70px;
          }
          .product-list {
            .product {
              margin-bottom: 151px;

              &:nth-last-of-type(1) {
                margin-bottom: 50px;
              }
              &:nth-last-of-type(2) {
                margin-bottom: 50px;
              }

              .image {
                height: 225px;
              }
            }
            .best-seller-ad {
              position: relative;
              width: 419px;
              height: 419px;
              font-size: 0;
              line-height: 0;

              img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: 100%;
                max-height: 100%;
              }
            }
          }
          .more-product {
            order: 999;
            margin-bottom: 60px;
            width: 100%;
            text-align: center;
            button {
              outline: none;
              border: 0;
              padding: 13px 25px;
              font-size:16px;
              font-weight:400;
              color:rgba(255,255,255,1);
              background-color: #FF9081;
            }
          }
        }
      }
    }
  }

  .activity-end {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1000;

    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .end-box-bg {
        font-size: 0;
        line-height: 0;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }

      .message {
        position: absolute;
        left: 0;
        top: 70px;
        width: 100%;

        .content-message {
          margin-top: 10px;
          font-size: 20px;
          color: #ffffff;
          text-align: center;
        }

        .content-timeout {
          font-size: 20px;
          color: #ffffff;
          text-align: center;
        }
      }

    }
  }
</style>
