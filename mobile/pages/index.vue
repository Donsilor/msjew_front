<template>
  <div class="page">
    <!-- 美国站点 -->
    <div v-if="platform == 31" class="us-page">
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

      <section class="hot">
        <div class="tit-box">HOT SALE
          <div class="line"></div>
        </div>

        <div class="swiper-box">
          <swiper2 ref="us-host-list" :item-width="40" :indicator="false" :style="{height:hotHeight * 1.7 + 'px'}">
            <div v-if="hot.ifShow" v-for="(hot, n) in hotUrl" :key="n" class="host-item">
              <a :href="hot.link">
                <div class="img-box" :style="{height:hotHeight + 'px'}">
                  <img class="product-image" :src="hot.url"/>
                </div>
              </a>
              
              <div class="price">{{ coin }} {{ formatMoney(hot.price) }}</div>
            </div>
          </swiper2>

          <div class="host-bar">
            <div class="left-button" :class="{'effects': ifEffects == 1}" @touchstart="nextHotSale(false, 1)"></div>
            <div class="right-button" :class="{'effects': ifEffects == 2}" @touchstart="nextHotSale(true, 2)"></div>
          </div>
        </div>
      </section>

      <section class="show-box">
        <a href="/marriage-ring/single-ring">
          <img src="/index-us/img-01.png" alt="">
        </a>
        <a href="/marriage-ring/single-ring?style=160">
          <img src="/index-us/img-02.png" alt="">
        </a>
        <a href="/accessories/list?actIndex=2">
          <img src="/index-us/img-03.png" alt="">
        </a>
      </section>

      <section class="hot">
        <div class="tit-box">NEW PRODUCTS
          <div class="line"></div>
        </div>

        <div class="swiper-box">
          <swiper2 ref="new-products" :item-width="40" :indicator="false" :style="{height:hotHeight * 1.7 + 'px'}">
            <div v-if="hot.ifShow" v-for="(hot, n) in newProducts" :key="n" class="host-item">
              <a :href="hot.link">
                <div class="img-box" :style="{height:hotHeight + 'px'}">
                  <img class="product-image" :src="hot.url"/>
                </div>
              </a>
              
                <div class="price">{{ coin }} {{ formatMoney(hot.price) }}</div>
            </div>
          </swiper2>

          <div class="host-bar">
            <div class="left-button" :class="{'effects': ifEffects == 3}" @touchstart="nextNewProduct(false, 3)"></div>
            <div class="right-button" :class="{'effects': ifEffects == 4}" @touchstart="nextNewProduct(true, 4)"></div>
          </div>
        </div>
      </section>

      <section class="sweet">
        <div class="tit-box">SWEET SHOW
          <div class="line"></div>
        </div>

        <div class="sweet-img-box">
          <div class="img-l">
            <img src="/index-us/sweet-1005.png" alt="">
          </div>
          <div class="img-r">
            <div class="img-r-t">
              <div class="img-r-t-l">
                <img src="/index-us/sweet-1006.png" alt="">
              </div>
              <div class="img-r-t-r">
                <img src="/index-us/sweet-1007.png" alt="">
              </div>
            </div>

            <div class="img-r-b">
              <div class="img-r-b-l">
                <img src="/index-us/sweet-1008.png" alt="">
              </div>
              <div class="img-r-b-r">
                <img src="/index-us/sweet-1009.png" alt="">
              </div>
            </div>
          </div>
        </div>

        <div class="sweet2">
          <img src="/index-us/sweet-1010.png" alt="">
        </div>
      </section>

      <section class="bg-color"></section>

      <section class="contact-us">
        <h1 class="title">{{ lang.contactUs }}</h1>
        <div class="info">
          <!-- <div class="info-row" v-show="this.$store.state.platform !== 21">
            <span class="line"></span>
            <span class="row-name">{{ lang.store }}</span>
            <span class="row-text">{{ lang.storeName }}</span>
          </div>
          <div class="info-row" v-show="this.$store.state.platform == 21">
            <span class="line"></span>
            <span class="row-name">{{ lang.address }}</span>
            <span class="row-text">{{ lang.addressDetail }}</span>
          </div> -->
          <!-- <div class="info-row" v-show="this.$store.state.platform == 31">
            <span class="line"></span>
            <span class="row-name">{{ lang.address }}</span>
            <span class="row-text">{{ lang.addressDetailUs }}</span>
          </div> -->
          <!-- <div class="info-row">
            <span class="line"></span>
            <span class="row-name">{{ lang.tel }}</span>
            <span class="row-text">
              <a v-if="this.$store.state.platform === 21" href="tel:19925412336">19925412336</a>
              <a v-else href="tel:+852 2165 3908">+852 2165 3908</a>
            </span>
            <span class="column-line"></span>
            <span class="row-icon">
              <a v-if="this.$store.state.platform == 21" href="tel:19925412336">
                <i class="iconfont iconphone"></i>
              </a>
              <a v-else href="tel:+852 2165 3908">
                <i class="iconfont iconphone"></i>
              </a>
            </span>
          </div> -->
          <div class="info-row">
            <span class="line"></span>
            <span class="row-name">{{ lang.email }}</span>
            <span class="row-text">
              <a v-if="this.$store.state.platform === 21" href="mailto:service@bddco.com">service@bddco.com</a>
              <a v-else href="mailto:service@bddco.com">service@bddco.com</a>
            </span>
            <span class="column-line"></span>
            <span class="row-icon">
              <a v-if="this.$store.state.platform == 21" href="mailto:service@bddco.com">
                <i class="iconfont iconyouxiang"></i>
              </a>
              <a v-else href="mailto:service@bddco.com">
                <i class="iconfont iconyouxiang"></i>
              </a>
            </span>
          </div>
          <div class="info-row" v-show="this.$store.state.platform !== 21">
            <nuxt-link :to="{ path: '/contact' }" >
              <button class="contact-button">{{ lang.callUs }}</button>
            </nuxt-link>
          </div>
        </div>
      </section>
    </div>
    <!-- 非美国站点 -->
    <div v-if="platform == 11 || platform == 21 || platform == 41">
      <!-- <tip-message></tip-message> -->
      <section class="ms-banner">
        <template v-if="banner.length > 1">
          <swiper1 :indicator="true" :auto="true" :duration="5000">
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
          </swiper1> 
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
                  <img src="/index-ms/banner01.png" @error="imageError"> 
                  <img src="/index-ms/banner02.png" @error="imageError"> 
                  <!-- <img :src="each.image" @error="imageError" /> -->
                </div>
              </a>
            </template>
            <template v-else>
              <div :key="n" class="swiper-item">
                <img src="/index-ms/banner01.png" @error="imageError"> 
                <img src="/index-ms/banner02.png" @error="imageError"> 
                <!-- <img :src="each.image" @error="imageError" /> -->
              </div>
            </template>
          </template>
        </template>
      </section>
      <section class="article">
        <p class="headline">{{ lang.headline1 }}</p>
        <p class="subtitle">{{ lang.subtitle1 }}</p>
      </section>
      <!-- 热卖 -->
      <section class="hot-sale">
        <div>
          <p class="headline">Hot sale</p>
          <p class="subtitle">{{ lang.headline2 }}</p>
        </div>
        <div class="swiper-box">
          <div class="img-box-more"> 
            <swiper :options="swiperOptionHot">
          　　<swiper-slide v-for="(hot, n) in hotProducts" :key="n">
          　　　　<a :href="hot.link">
                    <img :src="hot.url">
                  </a>
                  <i class="iconfont icongouwuche icon-cart"></i>
          　　</swiper-slide>
            </swiper>
            <!-- <div v-swiper:myssSwiper="swiperOptionHot">  
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(hot, n) in hotProducts" :key="n">
                  <a :href="hot.link">
                    <img :src="hot.url">
                  </a>
                  <i class="iconfont icongouwuche icon-cart"></i>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </section>
      <!-- 广告图 -->
      <section class="ads-pictures">
        <div class="ad-img">
          <img src="/index-ms/ad1.png" alt="">
        </div>
      </section>
      <!-- 分类 -->
      <section class="product-categories">
        <div class="part1">
          <p class="headline">{{ lang.headline3 }}</p>
        </div>
        <div class="part2">
          <div class="ring">
            <nuxt-link :to="{ path: '/marriage-ring/single-ring' }" >
              <img src="/index-ms/rings.png" alt="">
              <p class="title">{{ lang.ringTitle }}</p>
            </nuxt-link>
          </div>
          <div class="necklace">
            <nuxt-link :to="{ path: '/accessories/list?actIndex=0' }" >
              <img src="/index-ms/necklace.png" alt="">
              <p class="title">{{ lang.necklaceTitle }}</p>
            </nuxt-link>
          </div>
        </div>
        <div class="part3">
          <div class="ad-img">
            <img src="/index-ms/ad2.png" alt="">
          </div>
        </div>
        <div class="part4">
          <div class="bracelet">
            <nuxt-link :to="{ path: '/accessories/list?actIndex=2' }" >
              <img src="/index-ms/bracelet.png" alt="">
              <p class="title">{{ lang.braceletTitle }}</p>
            </nuxt-link>
          </div>
          <div class="earring">
            <nuxt-link :to="{ path: '/accessories/list?actIndex=4' }" >
              <img src="/index-ms/earring.png" alt="">
              <p class="title">{{ lang.earringTitle }}</p>
            </nuxt-link>
          </div>
        </div>
      </section>
      <!-- 定制广告图 -->
      <section class="customized-ads-image">
        <div class="ad-img">
          <img src="/index-ms/ad3.png" alt="">
        </div>
        <div class="ad-dec">
          <p class="headline">{{ lang.headline4 }}</p>
          <p class="subtitle">{{ lang.subtitle2 }}</p>
          <p class="subtitle">{{ lang.subtitle3 }}</p>
        </div>
      </section>
      <section class="learn-more">
        <div class="swiper-box">
          <div class="img-box-more"> 
            <swiper :options="swiperOptionMore" ref="mySwiper" :indicator="true">
          　　<swiper-slide v-for="(more, n) in More" :key="n">
          　　　　<img :src="more.url">
                <div class="descrip">
                  <p class="tip1">{{more.title}}</p>
                  <p class="tip2">{{more.dec}}</p>
                  <!-- <p class="tip3">{{more.learnMore}}</p> -->
                </div>
          　　</swiper-slide>
          　　<div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
        </div>
      </section>

      <!--    <site-switch ref="site-switch"></site-switch>-->
    </div>
  </div>
</template>

<script>
import Helpers from '@/assets/js/helpers.js'
import { formatMoney } from '@/assets/js/filterUtil.js'

export default {
  head() {
    return this.seoInfo || {}
  },
  data() {
    return {
      lang: this.LANGUAGE.index,
      coin: '',
      platform: 0,
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
          routerName: 'marriage-ring-pair-ring',
          // query: {
          //   type: 'lady'
          // }
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
      exhibitionImageStatus: true,
      hotUrl: [
        {
          'url': '/index-us/hot-202.png',
          'id': 682,
          'link': '/marriage-ring/single-ring-detail?goodId=682&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/hot-203.png',
          'id': 679,
          'link': '/marriage-ring/single-ring-detail?goodId=679&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/hot-204.png',
          'id': 684,
          'link': '/marriage-ring/single-ring-detail?goodId=684&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/hot-205.png',
          'id': 230,
          'link': '/marriage-ring/single-ring-detail?goodId=230&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/hot-206.png',
          'id': 147,
          'link': '/marriage-ring/single-ring-detail?goodId=147&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/hot-207.png',
          'id': 231,
          'link': '/marriage-ring/single-ring-detail?goodId=231&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/hot-208.png',
          'id': 126,
          'link': '/marriage-ring/single-ring-detail?goodId=126&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/hot-209.png',
          'id': 128,
          'link': '/marriage-ring/single-ring-detail?goodId=128&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/hot-210.png',
          'id': 150,
          'link': '/marriage-ring/single-ring-detail?goodId=150&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/hot-211.png',
          'id': 134,
          'link': '/marriage-ring/single-ring-detail?goodId=134&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/hot-212.png',
          'id': 118,
          'link': '/marriage-ring/single-ring-detail?goodId=118&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/hot-213.png',
          'id': 145,
          'link': '/marriage-ring/single-ring-detail?goodId=145&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/hot-214.png',
          'id': 120,
          'link': '/marriage-ring/single-ring-detail?goodId=120&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/hot-215.png',
          'id': 145,
          'link': '/marriage-ring/single-ring-detail?goodId=145&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/hot-216.png',
          'id': 233,
          'link': '/marriage-ring/single-ring-detail?goodId=233&ringType=single',
          'price': 0,
          'ifShow': false
        }
      ],
      newProducts: [
        {
          'url': '/index-us/newProduct-301.png',
          'id': 217,
          'link': '/marriage-ring/single-ring-detail?goodId=217&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/newProduct-302.png',
          'id': 212,
          'link': '/marriage-ring/single-ring-detail?goodId=212&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/newProduct-303.png',
          'id': 657,
          'link': '/marriage-ring/single-ring-detail?goodId=657&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/newProduct-304.png',
          'id': 614,
          'link': '/marriage-ring/single-ring-detail?goodId=614&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/newProduct-305.png',
          'id': 149,
          'link': '/marriage-ring/single-ring-detail?goodId=149&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/newProduct-306.png',
          'id': 137,
          'link': '/marriage-ring/single-ring-detail?goodId=137&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/newProduct-307.png',
          'id': 124,
          'link': '/marriage-ring/single-ring-detail?goodId=124&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/newProduct-309.png',
          'id': 139,
          'link': '/marriage-ring/single-ring-detail?goodId=139&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/newProduct-310.png',
          'id': 122,
          'link': '/marriage-ring/single-ring-detail?goodId=122&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/newProduct-311.png',
          'id': 234,
          'link': '/marriage-ring/single-ring-detail?goodId=234&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/newProduct-312.png',
          'id': 138,
          'link': '/marriage-ring/single-ring-detail?goodId=138&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/newProduct-313.png',
          'id': 123,
          'link': '/marriage-ring/single-ring-detail?goodId=123&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/newProduct-314.png',
          'id': 151,
          'link': '/marriage-ring/single-ring-detail?goodId=151&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/newProduct-315.png',
          'id': 125,
          'link': '/marriage-ring/single-ring-detail?goodId=125&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/newProduct-316.png',
          'id': 213,
          'link': '/marriage-ring/single-ring-detail?goodId=213&ringType=single',
          'price': 0,
          'ifShow': false
        }
      ],
      hotProducts:[
        {
          'url': '/index-ms/Hot1.png',
          'id': 694,
          'link': '/marriage-ring/single-ring-detail?goodId=694&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-ms/Hot2.png',
          'id': 679,
          'link': '/marriage-ring/single-ring-detail?goodId=679&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-ms/Hot3.png',
          'id': 684,
          'link': '/marriage-ring/single-ring-detail?goodId=684&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-ms/Hot4.png',
          'id': 670,
          'link': '/marriage-ring/single-ring-detail?goodId=670&ringType=single',
          'price': 0,
          'ifShow': false
        }
      ],
      More:[
        {
          'url': '/index-ms/more1.png',
          'title': this.LANGUAGE.index.tip1,
          'dec': this.LANGUAGE.index.tip1To1,
          'learnMore': this.LANGUAGE.index.tip,
        },
        {
          'url': '/index-ms/more2.png',
          'title': this.LANGUAGE.index.tip2,
          'dec': this.LANGUAGE.index.tip2To1,
          'learnMore': this.LANGUAGE.index.tip,
        },
        {
          'url': '/index-ms/more3.png',
          'title': this.LANGUAGE.index.tip3,
          'dec': this.LANGUAGE.index.tip3To1,
          'learnMore': this.LANGUAGE.index.tip,
        }
      ],
      hotHeight: 0,
      ifEffects: 0,
      swiperOptionHot: {
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 2.5,
        navigation: {
          nextEl: '.swiper-button-next'
        },
        on: {
          slideChange() {
            // console.log('onSlideChangeEnd', this);
          },
          tap() {
            // console.log('onTap', this);
          }
        }
      },
      swiperOptionMore: {
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 1,
        navigation: {
          nextEl: '.swiper-button-next'
        }, 
        pagination: {
          el: '.swiper-pagination',
          clickable:true
        },
        on: {
          slideChange() {
            // console.log('onSlideChangeEnd', this);
          },
          tap() {
            // console.log('onTap', this);
          }
        }
      },
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
      return data ;

      // for (let n = 0, length = data.length; n < length; n++) {
      //   result = result.concat(data[n].goods ? data[n].goods : [])
      //   result = result.concat(data[n].ring ? data[n].ring : [])
      // }
      // for (let n = 0, length = result.length; n < length; n++) {
      //   const keys = Object.keys(result[n].configAttriEntity)
      //   let configAttriEntity = []
      //   if (keys.length > 0) {
      //     keys.map(item => {
      //       configAttriEntity = configAttriEntity.concat(
      //         result[n].configAttriEntity[item]
      //       )
      //     })
      //   }
      //   result[n].showType = cardInfo.showType
      //   result[n].configAttriEntity = configAttriEntity
      // }
      // return result
    }
  },
  async asyncData({ $axios, route, store, app }) {
    const seoInfo = await app.$getSeoInfo('index')

    return $axios({
      method: 'get',
      url: '/wap/home/index/web-site',
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
  created() {
    var that = this;
    that.getPrice(that.hotUrl)
    that.getPrice(that.newProducts)
  },
  mounted(){

    this.platform = this.$store.state.platform
    this.coin = this.$store.state.coin

    this.getImgHeight()

  //   const _this = this
  //   _this.$nextTick(() => {
  //     // _this.getSetting()
  //     if (!_this.$store.state.coin || !_this.$store.state.language) {
  //       _this.$refs['site-switch'].show()
  //     }
  //   })

  },
  methods: {
    formatMoney: formatMoney,
    getSetting() {
      const _this = this
      _this
        .$axios({
          method: 'get',
          url: '/wap/home/index/web-site',
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
      // console.log('card====>', card)
      if (!card) {
        return
      }

      const configAttriEntity = card.configAttriEntity

      const configIds = []
      const configAttrIds = []

      let routerUrl = '/marriage-ring/single-ring-detail'
      let routerQuery = {
        goodId: card.id,
        ringType : 'single'
      }

      // configAttriEntity.map(item => {
      //   configIds.push(item.configId)
      //   configAttrIds.push(item.configAttrId)
      // })


      // const ringRouter = () => {
      //   if (configAttrIds.indexOf(60) > -1) {
      //     // 訂婚戒指
      //     routerUrl = '/engagement/engagement-rings'
      //     return
      //   }
      //   if (
      //     configAttrIds.indexOf(461) > -1 ||
      //     configAttrIds.indexOf(462) > -1
      //   ) {
      //     // 男女戒
      //     routerUrl = '/marriage-ring/single-ring-detail'
      //     return
      //   }
      //   if (configAttrIds.indexOf(59) > -1) {
      //     // 結婚戒指
      //     routerUrl = '/marriage-ring/pair-ring-detail'
      //     routerQuery = {
      //       goodId: card.id
      //     }
      //     return
      //   }
      //   if (configAttrIds.indexOf(61) > -1) {
      //     // 裝飾戒指
      //     routerUrl = '/marriage-ring/single-ring-detail'
      //     return
      //   }
      //   console.log('都不是')
      // }
      // switch (card.categoryId) {
      //   case 1:
      //     // 莫桑石
      //     routerUrl = '/diamond/diamonds'
      //     break
      //   case 2:
      //     // 戒指
      //     ringRouter()
      //     break
      //   case 3:
      //     // 珠宝饰品
      //     routerUrl = '/accessories/accessories'
      //     break
      //   case 4:
      //     // 项链
      //     routerUrl = '/accessories/accessories'
      //     break
      //   case 5:
      //     // 吊坠
      //     routerUrl = '/accessories/accessories'
      //     break
      //   case 6:
      //     // 耳钉
      //     routerUrl = '/accessories/accessories'
      //     break
      //   case 7:
      //     // 耳环
      //     routerUrl = '/accessories/accessories'
      //     break
      //   case 8:
      //     // 手链
      //     routerUrl = '/accessories/accessories'
      //     break
      //   case 9:
      //     // 手镯
      //     routerUrl = '/accessories/accessories'
      //     break
      // }

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
      this.$router.push({
            name: 'accessories-list',
            query: {
              actIndex: 0
            }
          })

      // const card = this.cards[this.activeCard]


      // console.log('card====>', card)
      // if (!card) {
      //   return
      // }


      // const configAttriEntity = card.configAttriEntity

      // const configIds = []
      // const configAttrIds = []

      // configAttriEntity.map(item => {
      //   configIds.push(item.configId)
      //   configAttrIds.push(item.configAttrId)
      // })

      // const ringRouter = () => {
      //   if (configAttrIds.indexOf(462) > -1) {
      //     // 女士
      //     this.$router.push({
      //       name: 'marriage-ring-single-ring',
      //       query: {
      //         type: 'lady'
      //       }
      //     })
      //     return
      //   }
      //   if (configAttrIds.indexOf(60) > -1) {
      //     // 訂婚戒指
      //     this.$router.push({
      //       name: 'marriage-ring-pair-ring'
      //     })
      //     return
      //   }
      //   if (configAttrIds.indexOf(59) > -1) {
      //     // 結婚戒指
      //     this.$router.push({
      //       name: 'marriage-ring-pair-ring'
      //     })
      //     return
      //   }
      //   if (configAttrIds.indexOf(61) > -1) {
      //     // 裝飾戒指
      //     this.$router.push({
      //       name: 'marriage-ring-single-ring'
      //     })
      //     return
      //   }
      //   console.log('都不是')
      // }

      // let routerName = ''
      // let routerQuery = {}

      // switch (card.categoryId) {
      //   case 1:
      //     // 莫桑石
      //     routerName = 'diamond-list'
      //     break
      //   case 2:
      //     // 戒指
      //     ringRouter()
      //     return
      //   case 3:
      //     // 珠宝饰品
      //     routerName = 'accessories-list'
      //     break
      //   case 4:
      //     // 项链
      //     routerName = 'accessories-list'
      //     routerQuery = {
      //       actIndex: 0
      //     }
      //     break
      //   case 5:
      //     // 吊坠
      //     routerName = 'accessories-list'
      //     routerQuery = {
      //       actIndex: 1
      //     }
      //     break
      //   case 6:
      //     // 耳钉
      //     routerName = 'accessories-list'
      //     routerQuery = {
      //       actIndex: 2
      //     }
      //     break
      //   case 7:
      //     // 耳环
      //     routerName = 'accessories-list'
      //     routerQuery = {
      //       actIndex: 3
      //     }
      //     break
      //   case 8:
      //     // 手链
      //     routerName = 'accessories-list'
      //     routerQuery = {
      //       actIndex: 4
      //     }
      //     break
      //   case 9:
      //     // 手镯
      //     routerName = 'accessories-list'
      //     routerQuery = {
      //       actIndex: 5
      //     }
      //     break
      // }

      this.$router.push({
        name: routerName,
        query: routerQuery
      })

      // console.log('configAttrIds===>', configAttrIds)
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
    },
    getImgHeight() {
      const image = new Image()
      var that = this, width = 0, height = 0, res = 0;
      image.src = '/index-us/hot-202.png'
      image.onload = result => {
        width = image.width;
        height = image.height;
      }

      if(width && height){
        this.hotHeight =
          Math.round((document.body.clientWidth * image.height) / image.width)
      }else{
        this.hotHeight =
          Math.round(document.body.clientWidth * 0.4)
      }
    },
    nextHotSale(type, k) {
      this.addEffcts(k)
      this.$refs['us-host-list'].goNext(type)
    },
    nextNewProduct(type, k) {
      this.addEffcts(k)
      this.$refs['new-products'].goNext(type)
    },
    addEffcts(k) {
      this.ifEffects = k;
      setTimeout(() => {
        this.ifEffects = 0
      },200)
    },
    getPrice(url) {
      var that = this, hot = [];
      url.forEach((o, i) => {
        hot[i] = o.id
      })

      this.$axios
        .post('/web/goods/style/search', {
          styleId: hot
        })
        .then(res => {
          var data = res.data;

          data.forEach((o, i) => {
            url.forEach((p, j) => {
              if(o.id == p.id){
                url[j].price = o.salePrice;
                url[j].ifShow = true;
              }
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="less">

// 猫闪
/*轮播区域*/
.ms-banner {
  width: 100%;
  height: 420px;
  // background-color: #f7e3dc;
  .swiper-item > img {
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
  }
  .swiper-item > img:first-child {
    position: absolute;
    top: 25%;
    left: 50%;
  }
  .swiper-item > img:last-child {
    position: absolute;
    top: 74.8%;
    left: 50%;
  }
}

// 文字区域
.article{
  padding: 20px 18px 30px 18px;
  .headline{
    font-family: SimSun;
    font-size: 22px;
    color: #000;
    padding-bottom: 20px;
  }
  .subtitle{
    font-size: 12px;
    line-height: 25px;
    color: #000;
  }
}

// 热卖区域
.hot-sale{
  margin-top: 10px;
  .headline{
    font-size: 22px;
    color: #000;
    padding-bottom: 5px;
    font-family: SimSun;
  }
  .subtitle{
    font-size: 18px;
    line-height: 25px;
    color: #000;
    font-family: SimSun;
  }
  .swiper-box{
    position: relative;
    
    .host-item{
      .product-image{
        height: 100%;
        width: 100%
      }

      .price{
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 15px;
        color: #444;
        opacity: 0;
      }
    }

  } 
  .img-box-more {
    width: 90%;
    // height: 13.1rem;
    overflow-x: scroll;
    margin: 20px 0px 20px 18px;
  }

  .img-box-more .swiper-slide {
    width: 144px;
    height: 140px;
    margin-right: 10px!important;
    position: relative;
    .icon-cart{
      position: absolute;
      right:10px;
      bottom: 5px;
    }
  }

  .img-box-more .swiper-button-next {
    width: 2rem;
    height: 3rem;
    // background: url(../../static/index/icon/right.png) no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    top: 6.1rem;
    right: 5%;
    transform: translateY(-50%);
    margin: 0;
  }
  .swiper-slide img{
    width: 100%;
    height: 100%;
  }
}

// 广告图区域
.ads-pictures{
  box-sizing: border-box;
  margin-top: 70px;
  .ad-img{
    position: relative;
    overflow: hidden;
    img{
      position: relative;
      width: 100%;
    }
  }
}

// 产品分类区域
.product-categories{
  margin: 30px 20px;
  .part1{
    .headline{
      font-size: 26px;
      font-family: SimSun;
      color: #000000;
      text-align: center;
    }
  }
  .part2{
    margin-top: 30px;
    position: relative;
    padding: 120px 0;
    .title{
      font-size: 16px;
      color: #000;
      font-family: SimSun;
      line-height: 35px;
    }
    .ring{
      width: 160px;
      height: 160px;
      position: absolute;
      top:0px;
      left:0px;
      img{
        position: relative;
        width: 100%;
      }
    }
    .necklace{
      width: 160px;
      height: 160px;
      position: absolute;
      top:40px;
      right: 0px;
      img{
        position: relative;
        width: 100%;
      }
    }
  }
  .part3{
    box-sizing: border-box;
    margin-top: 20px;
    .ad-img{
      position: relative;
      overflow: hidden;
      img{
        position: relative;
        width: 100%;
      }
    }
  }
  .part4{
    margin-top: 30px;
    position: relative;
    padding: 120px 0;
    .title{
      font-size: 16px;
      color: #000;
      font-family: SimSun;
      line-height: 35px;
    }
    .bracelet{
      width: 160px;
      height: 160px;
      position: absolute;
      top:40px;
      left:0px;
      img{
        position: relative;
        width: 100%;
      }
    }
    .earring{
      width: 160px;
      height: 160px;
      position: absolute;
      top:0px;
      right: 0px;
      img{
        position: relative;
        width: 100%;
      }
    }
  }
}

// 定制广告图区域
.customized-ads-image{
  box-sizing: border-box;
  margin-top: 50px;
  .ad-img{
    position: relative;
    overflow: hidden;
    img{
      position: relative;
      width: 100%;
    }
  }
  .ad-dec{
    margin-bottom: 50px;
    .headline{
      font-size: 26px;
      color: #000;
      line-height: 60px;
      font-family: SimSun;
    }
    .subtitle{
      font-size: 13px;
      color: #000; 
      line-height: 25px;
    }
  }
}

// 了解更多区域
.learn-more{
  .swiper-box{
    position: relative;
    
    .host-item{
      .product-image{
        height: 100%;
        width: 100%
      }

      .price{
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 15px;
        color: #444;
        opacity: 0;
      }
    }

  } 
  .img-box-more {
    width: 95%;
    // height: 300px;
    overflow-x: scroll;
    margin: 20px 0px 20px 10px;
  }

  .img-box-more .swiper-slide {
    width: 305px;
    // height: 150px;
    margin-right: 15px!important;
    position: relative;
    .icon-cart{
      position: absolute;
      right:10px;
      bottom: 5px;
    }
    .descrip{
      padding: 20px 0;
      background-color: #f8f8f8;
      .tip1{
        font-size: 18px;
        font-weight: bold;
      }
      .tip2{
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #000000;
        padding: 20px 0;
      }
      .tip3{
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #000000;
        padding-top: 10px;
      }
    }
  }

  .img-box-more .swiper-button-next {
    width: 2rem;
    height: 3rem;
    // background: url(../../static/index/icon/right.png) no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    top: 6.1rem;
    right: 5%;
    transform: translateY(-50%);
    margin: 0;
  }
  .swiper-slide img{
    width: 100%;
    height: 100%;
  }
   /* 分页器容器 */
  .img-box-more /deep/ .swiper-pagination {
    position: inherit;
    margin-top: 30px;
  }

  /* 分页器 */
  .img-box-more /deep/ .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background-color: #fff;
    border-radius: 12px;
    opacity: 1;
    border: 1px solid #b0b0b0;
    margin: 0 0.5rem;
  }

  /* 分页器选中 */
  .img-box-more /deep/ .swiper-pagination-bullet-active {
    background-color: #b0b0b0 !important;
  }

  .swiper-button-next:focus {
    outline: none;
  }
}



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
// .swiper-item > img {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   /*max-width: 100%;*/
//   max-height: 100%;
// }

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
  padding: 38px 15px 30px 15px;
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

.us-page{
  .hot{
    background-color: #f6f1eb;
    padding-bottom: 30px;

    .swiper-box{
      position: relative;
      
      .host-item{
        .product-image{
          height: 100%;
          width: 100%
        }

        .price{
          height: 60px;
          line-height: 60px;
          text-align: center;
          font-size: 15px;
          color: #444;
          opacity: 0;
        }
      }

    } 
  }

  .tit-box{
    position: relative;
    height: 100px;
    line-height: 110px;
    text-align: center;
    font-size: 24px;
    color: #444;

    .line{
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 15%;
      height: 1px;
      background-color: #999;
    }
  }

  .show-box{
    font-size: 0;

    a{
      display: inline-block;
      width: 100%;
      margin-bottom: 6px;

      img{
        width: 100%;
      }
    }
    a:last-child{
      margin-bottom: 0;
    }
  }

  .sweet{
    background-color: #fbf8f3;

    .sweet-img-box{
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      height: 250px;
      margin-top: 30px;

      div{
        position: relative;
      }

      img{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
      }

      .img-l{
        width: calc((100% - 10px) * 0.29);
        height: 100%;
        margin-right: 10px;
        flex-shrink: 0;
        flex-grow: 0;
      }

      .img-r{
        display: flex;
        flex-direction: column;
        width: calc((100% - 10px) * 0.71);
        height: 100%;
        flex-grow: 1;

        .img-r-t{
          display: flex;
          width: 100%;
          height: calc((100% - 10px) * 0.54);
          margin-bottom: 10px;
          flex-shrink: 0;
          flex-grow: 0;

          .img-r-t-l{
            width: calc((100% - 10px) * 0.51);
            margin-right: 10px;
            flex-shrink: 0;
            flex-grow: 0;
          }

          .img-r-t-r{
            width: calc((100% - 10px) * 0.49);
            flex-grow: 1;
          }
        }

        .img-r-b{
          display: flex;
          width: 100%;
          height: calc((100% - 10px) * 0.46);
          flex-grow: 1;

          .img-r-b-l{
            width: calc((100% - 10px) * 0.426);
            margin-right: 10px;
            flex-shrink: 0;
            flex-grow: 0;
          }

          .img-r-b-r{
            width: calc((100% - 10px) * 0.574);
            flex-grow: 1;
          }
        }
      }
    }

    .sweet2{
      margin: 10px 10px 20px;

      img{
        width: 100%;
      }
    }
  }

  .host-bar{
      position: absolute;
      bottom: 20px;
      left: 0px;
      width: 100%;
      height: 20px;
      z-index: 6;

      .left-button{
        width: 36px;
        height: 36px;
        background: #c9bdbf url('/index-us/icon-left.png') center;
        background-size: 80% 80%;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 14%;
        transform: translateY(-50%);
      }
      .right-button{
        width: 36px;
        height: 36px;
        background: #c9bdbf url('/index-us/icon-right.png') center;
        background-size: 80% 80%;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        right: 14%;
        transform: translateY(-50%);
      }
    }

    .effects {
      border-radius: 50%;
      transform: scale(0.94) translateY(-50%) !important;
      background-color: #e5d5c7 !important;
    }

    .bg-color{
      height: 8px;
      background-color: #f5f5f5;
    }
}
</style>
