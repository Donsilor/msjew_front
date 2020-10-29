<template>
  <div class="page">
    <!-- 美国站点 -->
    <div v-if="platform == 30" class="us-page">
      <section class="banner">
        <el-carousel trigger="click" :autoplay="true" :height="bannerHeight + 'px'">
          <el-carousel-item v-for="(item, index) in banner" :key="index" class="banner-item">
            <a :href="item.addres || ''" target="_blank">
              <img class="banner-img" :src="item.image" alt="">
            </a>
          </el-carousel-item>
        </el-carousel>
      </section>

      <div class="bg-color"> 
        <section class="design">
          <h1 class="section-title">
            HOT SALE
            <!-- {{ $t(`${lang}.designYourEngagementRing`) }} -->
          </h1>
          <div class="section-title-line"></div>

          <div class="us-host-box">
            <div class="us-host-list" :style="{height:sImgHeight + 'px'}">
              <swiper2 ref="us-host-list" :item-width="25" :indicator="false" :swiper-type="2" :style="{height:sImgHeight + 'px'}">
                <div v-if="hot.ifShow" v-for="(hot, n) in hotImgUrl" :key="n" class="host-item">
                  <a :href="hot.link" target="_blank" class="item-box">
                    <div class="product-image" :height="sImgHeight + 'px'">
                      <img class="product-image" :src="hot.url"/>
                    </div>
                  
                    <div class="price">{{ coin }} {{ formatMoney(hot.price) }}</div>
                  </a>
                </div>
              </swiper2>
            </div>

            <div class="host-list-bar">
              <div class="left-button" :class="{'effects': ifEffects == 1}" :style="{'top': arrowsTop + 'px'}" @click="nextHotSale(false, 1)"></div>
              <div class="right-button" :class="{'effects': ifEffects == 2}" :style="{'top': arrowsTop + 'px'}" @click="nextHotSale(true, 2)"></div>
            </div>
          </div>
        </section>

        <section class="recommend-category">
          <div class="categories">
            <div v-for="(category, index) in usRecommendCategories" :key="index" class="category-item">
              <a :href="category.to" target="_blank">
                <div class="bg">
                  <img :src="category.bgImage" />
                  <div class="hover-cover"></div>
                </div>
                <div class="info">
                  <h1 class="title" :style="{'fontSize': fontSize + 'px'}">{{ category.title }}</h1>
                  <h2 class="sub-title" :style="{'fontSize': fontSize + 'px'}">{{ category.subTitle }}</h2>
                  <div class="info-border-line border-t"></div>
                  <div class="info-border-line border-r"></div>
                  <div class="info-border-line border-b"></div>
                  <div class="info-border-line border-l"></div>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section class="design">
          <h1 class="section-title">
            NEW PRODUCTS
            <!-- {{ $t(`${lang}.designYourEngagementRing`) }} -->
          </h1>
          <div class="section-title-line"></div>

          <div class="new-products-box">
            <div class="new-products" :style="{height:sImgHeight + 'px'}">
              <swiper2 ref="new-products" :item-width="25" :indicator="false" :swiper-type="2" :style="{height:sImgHeight + 'px'}">
                <div v-if="item.ifShow" v-for="(item, n) in newProducts" :key="n" class="host-item">
                  <a :href="item.link" target="_blank" class="item-box">
                    <div class="product-image">
                      <img class="product-image" :src="item.url" />
                    </div>

                    <div class="price">{{ coin }} {{ formatMoney(item.price) }}</div>
                  </a>
                </div>
              </swiper2>
            </div>

            <div class="host-list-bar">
              <div class="left-button" :class="{'effects': ifEffects == 3}" :style="{top:arrowsTop + 'px'}" @click="nextNewProducts(false, 3)"></div>
              <div class="right-button" :class="{'effects': ifEffects == 4}" :style="{top:arrowsTop + 'px'}" @click="nextNewProducts(true, 4)"></div>
            </div>
          </div>
          
        </section>
      </div>

      <section class="sweet">
        <h1 class="section-title">
          SWEET SHOW
          <!-- {{ $t(`${lang}.designYourEngagementRing`) }} -->
        </h1>
        <div class="section-title-line"></div>

        <div class="sweet-img">
          <div class="img-l sweet-img-box">
            <img src="/index-us/sweet-401.png" alt="" class="img-a">
            <div class="mask-layer"></div>
          </div>

          <div class="img-m">
            <div class="img-m-t">
              <div class="img-m-t-l sweet-img-box">
                <img src="/index-us/sweet-402.png" alt="" class="img-a">
                <div class="mask-layer"></div>
              </div>
              <div class="img-m-t-r sweet-img-box">
                <img src="/index-us/sweet-403.png" alt="" class="img-a">
                <div class="mask-layer"></div>
              </div>
            </div>
            <div class="img-m-b">
              <div class="img-m-b-l sweet-img-box">
                <img src="/index-us/sweet-405.png" alt="" class="img-a">
                <div class="mask-layer"></div>
              </div>
              <div class="img-m-b-r sweet-img-box">
                <img src="/index-us/sweet-406.png" alt="" class="img-a">
                <div class="mask-layer"></div>
              </div>
            </div>
          </div>

          <div class="img-r">
            <div class="img-r-t sweet-img-box">
              <img src="/index-us/sweet-404.png" alt="" class="img-b">
              <div class="mask-layer"></div>
            </div>
            <div class="img-r-b sweet-img-box">
              <img src="/index-us/sweet-407.png" alt="" class="img-a">
              <div class="mask-layer"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="waiting-you">
        <h1 class="section-title">
          YOUR DIAMOND IS WAITING HEAR...
          <!-- {{ $t(`${lang}.yourDiamondWaiting`) }} -->
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

    <!-- 非美国站点 -->
    <div v-if="platform == 10 || platform == 20 || platform == 40" class="ms-page">
      <section class="banner">
        <div :height="bannerHeight + 'px'" class="banner-box">
          <div><img style="width:100%;" class="banner-img" src="../static/index/banner1.jpg" alt=""></div>
          <div><img style="width:100%;margin-top: -4px" class="banner-img" src="../static/index/banner2.jpg" alt=""></div>
          <div><img style="width:100%;margin-top: -3px" class="banner-img" src="../static/index/banner3.jpg" alt=""></div>
        </div>
        <!-- <el-carousel trigger="click" :autoplay="true" :height="bannerHeight + 'px'" class="banner-box">
          <el-carousel-item v-for="(item, index) in banner" :key="index" class="banner-item">
            <a :href="item.addres || ''">
              <img class="banner-img" :src="item.image" alt="">
            </a>
          </el-carousel-item> -->

        <!-- <el-carousel-item v-for="(item, index) in banner" :key="index">
                   有链接地址，且是外部链接
          <a
            v-if="item.openType === 1 && item.url"
            :href="item.url"
            target="_blank"
          >
            <div class="banner-item">
              <img :src="item.image" />
            </div>
          </a>
                   有链接地址，且不是外部链接
          <nuxt-link
            v-else-if="item.url && !item.isOutUrl"
            :to="{ path: item.url }"
          >
            <div class="banner-item">
              <img :src="item.image" />
            </div>
          </nuxt-link>
                   有链接地址，且是外部链接
          <a v-else-if="item.url && item.isOutUrl" :href="item.url">
            <div class="banner-item">
              <img :src="item.image" />
            </div>
          </a>
                   没有链接地址
          <div v-else-if="!item.url" class="banner-item">
            <img :src="item.image" />
          </div>
        </el-carousel-item> -->
      <!-- </el-carousel> -->
    </section>

    <!--    首頁商品推薦模塊-->
     <div class="bg-color"> 
        <section class="design">
          <p class="section-title-en">
            Hot sale
          </p>
          <p class="section-title-cn">
            {{ $t(`${lang}.hotSale`) }}
          </p>

          <div class="us-host-box">
            <div class="us-host-list" :style="{height:sImgHeight + 'px'}">
              <swiper2 ref="us-host-list" :item-width="25" :indicator="false" :swiper-type="2" :style="{height:sImgHeight + 'px'}">
                <div v-show="hot.ifShow" v-for="(hot, n) in msHotImgUrl" :key="n" class="host-item">
                  <a :href="hot.link" target="_blank" class="item-box">
                    <div class="product-image" :height="sImgHeight + 'px'">
                      <img class="main-image" :src="hot.url[0]"/>
                      <img class="sub-image" :src="hot.url[1] || hot.url[0]"/>
                      <!-- <i class="iconfont icongouwuche cart-icon"></i> -->
                    </div>
                    <!-- <div class="price">{{ coin }} {{ formatMoney(hot.price) }}</div> -->
                  </a>
                </div>
              </swiper2>
            </div>

            <!-- <div class="host-list-bar">
              <div class="left-button" :class="{'effects': ifEffects == 1}" :style="{'top': arrowsTop + 'px'}" @click="nextHotSale(false, 1)"></div>
              <div class="right-button" :class="{'effects': ifEffects == 2}" :style="{'top': arrowsTop + 'px'}" @click="nextHotSale(true, 2)"></div>
            </div> -->
          </div>
        </section>

      </div>

    <section class="diamond-gia">
      <div class="bg">
        <img src="/index-ms/ad1.jpg" />
        <img src="/index-ms/ad2.jpg" />
        <img src="/index-ms/ad3.jpg" />
      </div>
    </section>

    <section class="jewellery">
      <div class="section-content">
        <ul class="categories">
          <li class="item sort1">
            <img src="/index-ms/sort1.png" alt="">
            <div class="category">
              <div class="bg">
                <nuxt-link to="/wedding-rings/all">
                  <img src="/index-ms/rings.png" />
                </nuxt-link>
              </div>
            </div>
          </li>
          <li class="item sort2">
            <img style="margin-top:-3px;" src="/index-ms/sort2.jpg" alt="">
            <div class="category">
              <div class="bg">
                <nuxt-link to="/jewellery/necklaces">
                  <img src="/index-ms/necklace.png" />
                </nuxt-link>
              </div>
            </div>
          </li>
          <li class="item sort3">
           <img style="margin-top:-3px;" src="/index-ms/sort3.jpg" alt="">
             
          </li>
           <li class="item">
           <img style="margin-top:-3px;" src="/index-ms/sort4.jpg" alt="">
            <div class="category">
              <div class="bg">
                <nuxt-link to="/jewellery/earrings-stud">
                  <img src="/index-ms/earring.png" />
                </nuxt-link>
              </div>
            </div>
          </li>
           <li class="item">
           <img style="margin-top:-3px;" src="/index-ms/sort5.jpg" alt="">
            <div class="category">
              <div class="bg">
                <nuxt-link to="/jewellery/bracelets">
                  <img src="/index-ms/bracelet.png" />
                </nuxt-link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="made-gia">
      <div class="bg">
        <img src="/index-ms/made1.jpg" />
        <img src="/index-ms/made2.jpg" />
        <img src="/index-ms/made3.jpg" />
      </div>
    </section>

    <section class="waiting-you">
      <div class="section-content">
        <div class="item left-item">
          <div class="picture">
            <img src="/index-ms/more1.png" />
          </div>
          <div class="content">
            <p class="title1">{{$t(`${lang}.tip1`)}}</p>
            <p class="title2">{{$t(`${lang}.tip1To1`)}}</p>
            <!-- <p class="title3">{{$t(`${lang}.tip`)}}</p> -->
          </div>
        </div>
        <div class="item center-item">
          <div class="picture">
            <img src="/index-ms/more2.png" />
          </div>
          <div class="content">
            <p class="title1">{{$t(`${lang}.tip2`)}}</p>
            <p class="title2">{{$t(`${lang}.tip2To1`)}}</p>
            <!-- <p class="title3">{{$t(`${lang}.tip`)}}</p> -->
          </div>
        </div>
        <div class="item right-item">
          <div class="picture">
            <img src="/index-ms/more3.png" />
          </div>
          <div class="content">
            <p class="title1">{{$t(`${lang}.tip3`)}}</p>
            <p class="title2">{{$t(`${lang}.tip3To1`)}}</p>
            <!-- <p class="title3">{{$t(`${lang}.tip`)}}</p> -->
          </div>
        </div>
      </div>
    </section>
  </div>
  </div>
</template>

<script>
import CategoryIndexPage from '@/mixins/category-index-page.js'
import Interactive from '@/pageComponents/index/interactive.vue'
import Bus from '../assets/js/bus.js'
const lang = 'index'
export default {
  head () {
    return this.seoInfo || {}
  },
  components: {
    Interactive
  },
  mixins: [CategoryIndexPage],
  data () {
    return {
      lang,
      coin: '',
      platform: 0,
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
      usRecommendCategories: [
        {
          // title: this.$t(`${lang}.engagementRings`),
          title: 'Proposal and engagement',
          subTitle: '',
          bgImage: '/index-us/img-251.png',
          to: '/wedding-rings/all'
        },
        {
          title: 'Weddings and anniversaries',
          subTitle: '',
          bgImage: '/index-us/img-252.png',
          to: '/wedding-rings/engagement-ring'
        },
        {
          title: 'Fashion jewelry',
          subTitle: '',
          bgImage: '/index-us/img-253.png',
          to: '/jewellery/earrings-stud'
        }
      ],
      activeHotProductIndex: 0,

      diamonds: [
        {
          id: '16',
          name: this.$t(`${lang}.round`),
          desc: this.$t(`${lang}.roundDesc`),
          img: '/index/round.png',
          to: {
            path: '/diamonds/round-cut'
          }
        },
        {
          id: '54',
          name: this.$t(`${lang}.princessSquare`),
          desc: this.$t(`${lang}.princessSquareDesc`),
          img: '/index/pincess.png',
          to: {
            path: '/diamonds/princess-cut'
          }
        },
        {
          id: '55',
          name: this.$t(`${lang}.octagonalTrapezoid`),
          desc: this.$t(`${lang}.octagonalTrapezoidDesc`),
          img: '/index/emerald.png',
          to: {
            path: '/diamonds/emerald-cut'
          }
        },
        {
          id: '60',
          name: this.$t(`${lang}.laserSquare`),
          desc: this.$t(`${lang}.laserSquareDesc`),
          img: '/index/asscher.png',
          to: {
            path: '/diamonds/asscher-cut'
          }
        },
        {
          id: '58',
          name: this.$t(`${lang}.pincushion`),
          desc: this.$t(`${lang}.pincushionDesc`),
          img: '/index/cushion.png',
          to: {
            path: '/diamonds/cushion-cut'
          }
        },
        {
          id: '57',
          name: this.$t(`${lang}.marquise`),
          desc: this.$t(`${lang}.marquiseDesc`),
          img: '/index/marquise.png',
          to: {
            path: '/diamonds/marquise-cut'
          }
        },
        {
          id: '61',
          name: this.$t(`${lang}.octagonalLaser`),
          desc: this.$t(`${lang}.octagonalLaserDesc`),
          img: '/index/radiant.png',
          to: {
            path: '/diamonds/radiant-cut'
          }
        },
        {
          id: '17',
          name: this.$t(`${lang}.oval`),
          desc: this.$t(`${lang}.ovalDesc`),
          img: '/index/oval.png',
          to: {
            path: '/diamonds/oval-cut'
          }
        },
        {
          id: '59',
          name: this.$t(`${lang}.dropShape`),
          desc: this.$t(`${lang}.dropShapeDesc`),
          img: '/index/pear.png',
          to: {
            path: '/diamonds/pear-shaped'
          }
        },
        {
          id: '56',
          name: this.$t(`${lang}.heartShaped`),
          desc: this.$t(`${lang}.heartShapedDesc`),
          img: '/index/heart.png',
          to: {
            path: '/diamonds/heart-shaped'
          }
        }
      ],
      activeDiamondIndex: 0,
      hotImgUrl: [
        {
          'url': '/index-us/ring-202.png',
          'id': 682,
          'link': '/ring/wedding-rings/682?goodId=682&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-203.png',
          'id': 679,
          'link': '/ring/wedding-rings/679?goodId=679&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-204.png',
          'id': 684,
          'link': '/ring/wedding-rings/684?goodId=684&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-205.png',
          'id': 230,
          'link': '/ring/wedding-rings/230?goodId=230&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-206.png',
          'id': 147,
          'link': '/ring/wedding-rings/147?goodId=147&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-207.png',
          'id': 231,
          'link': '/ring/wedding-rings/231?goodId=231&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-208.png',
          'id': 126,
          'link': '/ring/wedding-rings/126?goodId=126&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-209.png',
          'id': 128,
          'link': '/ring/wedding-rings/128?goodId=128&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-210.png',
          'id': 150,
          'link': '/ring/wedding-rings/150?goodId=150&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-211.png',
          'id': 134,
          'link': '/ring/wedding-rings/134?goodId=134&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-212.png',
          'id': 118,
          'link': '/ring/wedding-rings/118?goodId=118&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-213.png',
          'id': 145,
          'link': '/ring/wedding-rings/145?goodId=145&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-214.png',
          'id': 120,
          'link': '/ring/wedding-rings/120?goodId=120&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-215.png',
          'id': 145,
          'link': '/ring/wedding-rings/145?goodId=145&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-216.png',
          'id': 233,
          'link': '/ring/wedding-rings/233?goodId=233&ringType=single',
          'price': 0,
          'ifShow': false
        }
      ],
      newProducts: [
        {
          'url': '/index-us/ring-301.png',
          'id': 217,
          'link': '/ring/wedding-rings/217?goodId=217&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-302.png',
          'id': 212,
          'link': '/ring/wedding-rings/212?goodId=212&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-303.png',
          'id': 657,
          'link': '/ring/wedding-rings/657?goodId=657&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-304.png',
          'id': 614,
          'link': '/ring/wedding-rings/614?goodId=614&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-305.png',
          'id': 149,
          'link': '/ring/wedding-rings/149?goodId=149&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-306.png',
          'id': 137,
          'link': '/ring/wedding-rings/137?goodId=137&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-307.png',
          'id': 124,
          'link': '/ring/wedding-rings/124?goodId=124&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-309.png',
          'id': 139,
          'link': '/ring/wedding-rings/139?goodId=139&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-310.png',
          'id': 122,
          'link': '/ring/wedding-rings/122?goodId=122&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-311.png',
          'id': 234,
          'link': '/ring/wedding-rings/234?goodId=234&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-312.png',
          'id': 138,
          'link': '/ring/wedding-rings/138?goodId=138&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-313.png',
          'id': 123,
          'link': '/ring/wedding-rings/123?goodId=123&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-314.png',
          'id': 151,
          'link': '/ring/wedding-rings/151?goodId=151&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-315.png',
          'id': 125,
          'link': '/ring/wedding-rings/125?goodId=125&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          'url': '/index-us/ring-316.png',
          'id': 213,
          'link': '/ring/wedding-rings/213?goodId=213&ringType=single',
          'price': 0,
          'ifShow': false
        }
      ],
      msHotImgUrl:[
        {
          // 'url': '/index-ms/1.png',
          'url':['/index-ms/1.png','/index-ms/1-1.png'],
          'id': 694,
          'link': '/ring/wedding-rings/694?goodId=694&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          // 'url': '/index-ms/2.png',
          'url': ['/index-ms/2.png','/index-ms/2-2.png'],
          'id': 670,
          'link': '/ring/wedding-rings/670?goodId=670&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          // 'url': '/index-ms/3.png',
          'url': ['/index-ms/3.png','/index-ms/3-3.png'],
          'id': 679,
          'link': '/ring/wedding-rings/679?goodId=679&ringType=single',
          'price': 0,
          'ifShow': false
        },
        {
          // 'url': '/index-ms/4.png',
          'url': ['/index-ms/4.png','/index-ms/4-4.png'],
          'id': 684,
          'link': '/ring/wedding-rings/684?goodId=684&ringType=single',
          'price': 0,
          'ifShow': false
        }
      ],

      ifEffects: 0,
      bannerHeight: 0,
      lineWidth: '',
      sImgHeight: 0,
      arrowsTop: 0,
      sweetHeight: 0,
      fontSize: 0,
      hotHeight: 0,
      hotPadding: 0,
      diamondsPadding: 0
    }
  },
  computed: {
    hotProductInfo () {
      const webSite = JSON.parse(
        JSON.stringify(this.webSite ? this.webSite : [])
      )

      const result = {
        title: webSite.moduleTitle
      }
      const products = []

      if (webSite.moduleGoods) {
        webSite.moduleGoods.forEach(item => {
          const product = item
          product.showType = webSite.showType
          product.goodsImages = this.imageStrToArray(product.goodsImages || '')
          // 删除后端无故增加的一层嵌套
          // product.configAttriEntity = product.configAttriEntity[product.id]
          product.to = {
            path: `/ring/engagement-rings/${product.id.replace(
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
      // console.log(result)
      return result
    },
    activeHotProductInfo () {
      // console.log(1111,this.activeHotProductIndex)
      return this.hotProductInfo.products[this.activeHotProductIndex] || {}
    },
    activeDiamondInfo () {
      return this.diamonds[this.activeDiamondIndex] || {}
    }
  },
  async asyncData ({ $axios, route, store, app }) {
    const seoInfo = await app.$getSeoInfo('index')
    // console.log(seoInfo)

    return $axios({
      method: 'get',
      url: '/web/home/index/web-site',
      params: {
        // type: 1,
      }
    })
      .then(data => {
        var data = data.data;

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
  created() {
    var that = this;
    var hot = [];
    that.hotImgUrl.forEach((o, i) => {
      hot[i] = o.id
    })

    // let mshot = [];
    that.msHotImgUrl.forEach((o, i) => {
      hot[i] = o.id
    })

    this.$axios
      .post('/web/goods/style/search', {
        styleId: hot
      })
      .then(res => {
        var data = res.data.data;
        // console.log("datya",data)
        data.forEach((o, i) => {
          that.hotImgUrl.forEach((p, j) => {
            if(o.id == p.id){
              that.hotImgUrl[j].price = o.salePrice
              that.hotImgUrl[j].ifShow = true;
            }
          })

          that.msHotImgUrl.forEach((p, j) => {
            if(o.id == p.id){
              that.msHotImgUrl[j].price = o.salePrice
              that.msHotImgUrl[j].ifShow = true;
            }
          })
        })
        
      })
      .catch(err => {
        console.log(err)
      })

    var product = [];
    that.newProducts.forEach((o, i) => {
      product[i] = o.id
    })

    this.$axios
      .post('/web/goods/style/search', {
        styleId: product
      })
      .then(res => {
        var data = res.data.data;

        data.forEach((o, i) => {
          that.newProducts.forEach((p, j) => {
            if(o.id == p.id){
              that.newProducts[j].price = o.salePrice;
              that.newProducts[j].ifShow = true;
            }
          })
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted () {
    const _this = this
    _this.$nextTick(() => {
      _this.onResize()
    })

    Bus.$on('resizeFn', (val) => {
      _this.onResize()
    })

    this.platform = this.$store.state.platform
    this.coin = this.$store.state.coin
  },
  methods: {
    changeActiveHotProduct (data) {
      this.activeHotProductIndex = data.index
    },
    nextActiveHotProduct (type) {
      this.$refs['hot-product-list'].goNext(type)
    },
    changeActiveDiamond (data) {
      this.activeDiamondIndex = data.index
    },
    nextActiveDiamond (type) {
      this.$refs['diamond-list'].goNext(type)
    },
    nextHotSale (type, k) {
      this.addEffcts(k)
      this.$refs['us-host-list'].goNext(type)
    },
    nextNewProducts (type, k) {
      this.addEffcts(k)
      this.$refs['new-products'].goNext(type)
    },
    addEffcts(k) {
      this.ifEffects = k;
      setTimeout(() => {
        this.ifEffects = 0
      },200)
    },
    onResize() {
      var that = this;
      var bWidth = document.body.clientWidth;

      if(bWidth < 1366){
        bWidth = 1366
      }else if(bWidth > 1520){
        bWidth = 1520
      }

      var cWidth = document.body.clientWidth;
      if(cWidth < 1200){
        cWidth = 1200
      }

      that.sImgHeight = Math.round(bWidth * 0.2) + 70;
      that.arrowsTop = Math.round(bWidth * 0.1) - 20;
      that.sweetHeight = Math.round((bWidth / 1520) * 710);
      that.fontSize = Math.round((bWidth / 1366) * 38);
      that.hotHeight = Math.round(cWidth * 0.144);
      that.hotPadding = Math.round(cWidth * 0.04 + 40);
      that.diamondsPadding = Math.round(cWidth * 0.05);
      if(that.fontSize > 48){
        that.fontSize = 48
      }

      if (that.banner[0] && that.banner[0].image) {
        const image = new Image()
        var width = 0, height = 0;
        image.src = that.banner[0].image
        image.onload = result => {
          width = image.width;
          height = image.height;
        }

        if(width && height){
          that.bannerHeight =
            Math.round((document.body.clientWidth * image.height) / image.width)
        }else{
          that.bannerHeight =
            Math.round((document.body.clientWidth * 640) / 1920)
        }
      }
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
    padding: 30px 0;
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
  max-width: 1920px;
  min-width: 1200px;
  margin: 0 auto;

  overflow-x: hidden;
  .banner-item {
    width: 100%;
    height: 100%;
    line-height: 0;
    font-size: 0;
    overflow: hidden;

    .banner-img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: auto;
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
  // padding-top: 53px;
  width: 80%;
  margin: 0 auto;
  // background-color: #fbf8f3;
  overflow-x: hidden;
  position: relative;

  .hot-list {
    width: 100%;
    background-color: #ffffff;

    .product-item {
      height: 100%;
      .product-image {
        height: 100%;
        font-size: 0;
        line-height: 0;
        position: relative;
        overflow: hidden;

        .product-image {
          position: absolute;
          width: 100%;
          height: auto;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
  .hot-list-bar {
    position: absolute;
    top: 0;
    left: -5%;
    width: 110%;
    height: 100%;
    z-index: -1;
    box-sizing: border-box;
    .arrow{
      font-size: 30px;
    }

    .left-button{
      position: absolute;
      left: 0;
    }
    .right-button{
      position: absolute;
      right: 0;
      top:117px
    }
    // .left-button,
    // .right-button {
    //   font-size: 0;
    //   line-height: 0;
    //   cursor: pointer;
    //   img {
    //     width: 64px;
    //   }
    // }

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

.made-gia {
  overflow-x: hidden;
  position: relative;
  margin-top: 50px;

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
  width: 80%;
  margin: 0 auto;
  padding: 40px 0 60px;
  background-color: #ffffff;
  overflow-x: hidden;

  .section-title-line {
    margin-bottom: 20px;
  }

  .diamond-list {
    width: 100%;
    box-sizing: content-box;
    background-color: #ffffff;

    .product-item {
      height: 100%;
      .product-image {
        height: 100%;
        font-size: 0;
        line-height: 0;
        position: relative;
        overflow: hidden;

        .product-image {
          position: absolute;
          width: 100%;
          height: auto;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
  .diamond-list-bar {
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
  padding: 140px 0 60px 0;
  min-width: 1200px;
  max-width: 1366px;
  margin: 0 auto;

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
      // display: flex;
      // flex-direction: row;
      // align-items: center;

      &:nth-last-of-type(1) {
        margin-right: 0;
      }

      .picture {
        flex-grow: 0;
        flex-shrink: 0;
        width: 100%;
        // height: 100%;
        font-size: 0;
        line-height: 0;

        img {
          width: 100%;
          height: 237px;
        }
      }
      .content {
        flex-grow: 1;
        flex-shrink: 1;
        // height: 236px;
        // height: calc(100% - 150px);
        // border: 1px solid #ffffff;
        box-sizing: border-box;
        // padding: 5% 3.7% 5.5% 3.7%;
        padding: 50px 0 50px 0;

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
        // background-color: #f8f8f8;
        // background-color: #f0e2da;

        .content {
          // margin-right: 20px;
          background-color: #f8f8f8;
          border-left: 0;
          text-align: center;
          .title1{
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #000000;
            font-weight: bold;
          }
          .title2{
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #666666;
            padding-top: 20px;
            // padding: 20px 0;
          }
          .title3{
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #000000;
          }
        }
      }

      &.center-item {
        background-color: #f8f8f8;
        // background-color: #f0e2da;

        .content {
          // margin-right: 20px;
          border-left: 0;
          text-align: center;
          .title1{
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #000000;
            font-weight: bold;
          }
          .title2{
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #666666;
            padding-top: 20px;
            // padding: 20px 0;
          }
          .title3{
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #000000;
          }
        }
      }

      &.right-item {
        background-color: #f8f8f8;
        // background-color: #f4eade;

        .content {
          // margin-left: 20px;
          border-right: 0;
          text-align: center;
          .title1{
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #000000;
            font-weight: bold;
          }
          .title2{
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #666666;
            padding-top: 20px;
            // padding: 20px 0;
          }
          .title3{
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #000000;
          }
        }
      }
    }
  }
}

// 美国站点
.us-page {
  .bg-color {
    background-color: #f6f1eb;
  }

  .banner-item {
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 2;
    }
  }

  .design,
  .recommend-category {
    background: none;
    overflow: hidden;
  }
  .section-title-line {
    margin-bottom: 76px;
  }
  .us-host-box,
  .new-products-box {
    max-width: 1360px;
    min-width: 1000px;
    width: 80%;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }
  .us-host-list,
  .new-products {
    max-width: 1360px;
    min-width: 1000px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }
  .host-item {
    width: 100%;
    font-size: 0;
    text-align: center;

    .item-box {
      display: inline-block;
      width: 80%;

      .product-image {
        width: 100%;
        overflow: hidden;

        img {
          width: 90%;
          height: 90%;
          margin: 5% 0;
        }
      }
      .product-image:hover img {
        transform: scale(1.11);
      }

      .price {
        font-size: 18px;
        line-height: 50px;
      }
    }
  }

  .host-list-bar {
    position: absolute;
    top: 0;
    left: -5%;
    width: 110%;
    height: 100%;
    z-index: -1;
    box-sizing: border-box;

    .left-button {
      position: absolute;
      left: 0;
      top: 30%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      background: #cebeb0 url('/index-us/icon-left.png') no-repeat 48% 48%;
      background-size: 90% 90%;
      border-radius: 2px;
    }

    .right-button {
      position: absolute;
      right: 0;
      top: 30%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      background: #cebeb0 url('/index-us/icon-right.png') no-repeat 48% 48%;
      background-size: 90% 90%;
      border-radius: 2px;
    }
  }

  .sweet {
    padding: 100px 0;
    box-sizing: border-box;
    background-color: #fbf8f3;

    // .sweet-img{
    //   max-width: 1520px;
    //   width: 80%;
    //   height: 700px;
    //   margin: 0 auto;
    //   display: flex;
    //   div{
    //     overflow: hidden;
    //   }

    //   .img-l{
    //     width: calc((100% - 40px) * 0.18);
    //     height: 100%;
    //     position: relative;
    //   }

    //   .img-m{
    //     width: calc((100% - 40px) * 0.46);
    //     margin: 0 20px;
    //     display: flex;
    //     flex-direction: column;

    //     .img-m-t{
    //       height: 54%;
    //       margin-bottom: 20px;
    //       width: 100%;
    //       flex-shrink: 0;
    //       display: flex;

    //       .img-m-t-l{
    //         width: 50%;
    //         height: 100%;
    //         margin-right: 20px;
    //         position: relative;
    //       }
    //       .img-m-t-r{
    //         width: 50%;
    //         height: 100%;
    //         position: relative;
    //       }
    //     }

    //     .img-m-b{
    //       width: 100%;
    //       height: 20%;
    //       display: flex;
    //       flex-grow: 1;

    //       .img-m-b-l{
    //         width: 54%;
    //         height: 100%;
    //         margin-right: 20px;
    //         position: relative;
    //         flex-shrink: 0;
    //       }
    //       .img-m-b-r{
    //         width: 50%;
    //         height: 100%;
    //         position: relative;
    //       }
    //     }
    //   }
    //   .img-r{
    //     width: calc((100% - 40px) * 0.36);
    //     height: 100%;
    //     display: flex;
    //     flex-direction: column;

    //     .img-r-t{
    //       width: 100%;
    //       height: 40%;
    //       position: relative;
    //       margin-bottom: 20px;
    //       flex-shrink: 0;
    //     }
    //     .img-r-b{
    //       width: 100%;
    //       height: 60%;
    //       position: relative;
    //     }
    //   }
      

    //   .img-a{
    //     position: absolute;
    //     top: 50%;
    //     left: 50%;
    //     transform: translate(-50%, -50%);
    //     height: 100%;
    //     width: auto;
    //   }
    //   .img-b{
    //     position: absolute;
    //     top: 50%;
    //     left: 50%;
    //     transform: translate(-50%, -50%);
    //     width: 100%;
    //     height: auto;
    //   }
    // }

    .sweet-img {
      display: flex;
      width: 1520px;
      height: 706px;
      margin: 0 auto;

      div {
        overflow: hidden;
        position: relative;
      }

      .img-l {
        width: 276px;
        height: 100%;
      }

      .img-m {
        display: flex;
        flex-direction: column;
        width: 674px;
        height: 100%;
        margin: 0 20px;


        .img-m-t {
          display: flex;
          height: 378px;
          margin-bottom: 20px;

          .img-m-t-l {
            width: 330px;
            height: 100%;
            margin-right: 20px;
          }
          .img-m-t-r {
            width: 324px;
            height: 100%;
          }
        }
        .img-m-b {
          display: flex;
          height: 308px;

          .img-m-b-l {
            width: 357px;
            height: 100%;
            margin-right: 20px;
          }
          .img-m-b-r {
            width: 297px;
            height: 100%;
          }
        }

      }

      .img-r {
        width: 530px;
        height: 100%;
        display: flex;
        flex-direction: column;

        .img-r-t {
          height: 280px;
          margin-bottom: 20px;
        }

        .img-r-b {
          height: 406px;
        }
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    .mask-layer {
      position: absolute !important;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0);
      // display: none;
    }

    .mask-layer:hover {
      background-color: rgba(0, 0, 0, 0.3);
      transition: background-color 0.3s ease-in;
    }
  }

  .effects {
    transform: scale(0.96) translateY(-50%) !important;
    background-color: #e5d5c7 !important;
    border-radius: 3px !important;
  }
}


// ms
.ms-page {
  .section-content{
    padding-top: 0px;
    background-color: #fff;
    img{
      width: 100%;
    }
  }
  .categories{
    padding-top: 370px;
    .bg img:hover{
      border:1px solid #c8c8c8;
    }
  }
  .item{
    position: relative;
  }
  .item .category{
    width: 27% !important;
    margin-left:0!important;
  }
  // .item:nth-of-type(1) .category{
  //   width: 27% !important;
  // }
  .item:nth-of-type(1) .category{
    position: absolute!important;
    z-index: 9;
    left:22%;
    top:-83%;
  }
  .item:nth-of-type(2) .category{
    position: absolute!important;
    z-index: 9;
    left:50%;
    top:-123%;
  }
  .item:nth-of-type(4) .category{
    position: absolute!important;
    z-index: 9;
    left:50%;
    top:-55%;
  }
  .item:nth-of-type(5) .category{
    position: absolute!important;
    z-index: 9;
    left:22%;
    top:-45%;
  }
  // .sort1{
  //   height: 100%;
  //   background: url(../static/index-ms/sort1.png) no-repeat;
  // }
  .design {
  .us-host-box {
    min-width: 1200px;
    max-width: 1366px;
    margin: 0 auto;
    padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
    height: 341px;

    .us-host-list {
      flex-grow: 0;
      flex-shrink: 0;
      width: 90%;
      margin-bottom: 3px;
      box-sizing: border-box;
      transition: all 0.2s linear;
      .host-item {
        position: relative;
        .product-image {
          position: relative;
          overflow: hidden;
          .cart-icon{
            position: absolute;
            bottom: 25px;
            right:20px;
            font-size: 20px;
          }
          .main-image,
          .sub-image {
            width: 100%;
            // height: 200px;
            display: inline-block;
          }
          .sub-image {
            display: none;
          }
        }
      }
      .host-item:hover {
        .product-image {
          .main-image {
            display: none;
          }
          .sub-image {
            display: inline-block;
          }
          .wish-state {
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }
  }
  
}
  .section-title-en{
    padding-bottom: 5px;
    font-size: 26px;
    text-align: center;
    font-family: SimSun;
  }
  .section-title-cn{
    font-size: 24px;
    text-align: center;
    padding-bottom: 60px;
    font-family: SimSun;
  }
  .design{
    padding-top: 60px;
  }

  .banner-item {
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 2;
    }
  }

  .design,
  .recommend-category {
    background: none;
    overflow: hidden;
  }
  .section-title-line {
    margin-bottom: 76px;
  }
  .us-host-box,
  .new-products-box {
    max-width: 1360px;
    min-width: 1000px;
    width: 80%;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }
  .us-host-list,
  .new-products {
    max-width: 1360px;
    min-width: 1000px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }
  .host-item {
    width: 100%;
    font-size: 0;
    text-align: center;

    .item-box {
      display: inline-block;
      width: 90%;

      .product-image {
        width: 100%;
        overflow: hidden;

        img {
          width: 90%;
          height: 90%;
          margin: 5% 0;
        }
      }
      // .product-image:hover img {
      //   transform: scale(1.11);
      // }

      .price {
        font-size: 18px;
        line-height: 50px;
      }
    }
  }

  .host-list-bar {
    position: absolute;
    top: 0;
    left: 0%;
    width: 100%;
    height: 100%;
    z-index: -1;
    box-sizing: border-box;

    .left-button {
      position: absolute;
      left: 0;
      top: 100px;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      background: #cebeb0 url('/index-us/icon-left.png') no-repeat 48% 48%;
      background-size: 90% 90%;
      border-radius: 2px;
    }

    .right-button {
      position: absolute;
      right: 0;
      top: 30%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      background: #cebeb0 url('/index-us/icon-right.png') no-repeat 48% 48%;
      background-size: 90% 90%;
      border-radius: 2px;
    }
  }

  .sweet {
    padding: 100px 0;
    box-sizing: border-box;
    background-color: #fbf8f3;

    .sweet-img {
      display: flex;
      width: 1520px;
      height: 706px;
      margin: 0 auto;

      div {
        overflow: hidden;
        position: relative;
      }

      .img-l {
        width: 276px;
        height: 100%;
      }

      .img-m {
        display: flex;
        flex-direction: column;
        width: 674px;
        height: 100%;
        margin: 0 20px;


        .img-m-t {
          display: flex;
          height: 378px;
          margin-bottom: 20px;

          .img-m-t-l {
            width: 330px;
            height: 100%;
            margin-right: 20px;
          }
          .img-m-t-r {
            width: 324px;
            height: 100%;
          }
        }
        .img-m-b {
          display: flex;
          height: 308px;

          .img-m-b-l {
            width: 357px;
            height: 100%;
            margin-right: 20px;
          }
          .img-m-b-r {
            width: 297px;
            height: 100%;
          }
        }

      }

      .img-r {
        width: 530px;
        height: 100%;
        display: flex;
        flex-direction: column;

        .img-r-t {
          height: 280px;
          margin-bottom: 20px;
        }

        .img-r-b {
          height: 406px;
        }
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    .mask-layer {
      position: absolute !important;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0);
      // display: none;
    }

    .mask-layer:hover {
      background-color: rgba(0, 0, 0, 0.3);
      transition: background-color 0.3s ease-in;
    }
  }

  .effects {
    transform: scale(0.96) translateY(-50%) !important;
    background-color: #e5d5c7 !important;
    border-radius: 3px !important;
  }
}
</style>
