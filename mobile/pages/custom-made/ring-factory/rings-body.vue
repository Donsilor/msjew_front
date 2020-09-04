<template>
  <div class="engagementRings-component">
    <div v-if="this.goodInfo.totalStock > 0">
      <div class="swiper-box">
        <swiper :auto="true" :duration="5000">
          <div v-for="(each, n) in goodsImages" :key="n">
            <nuxt-link
              :to="
                `/image-view?path=${$helpers.base64Encode(
                  JSON.stringify(goodsImages)
                )}`
              "
              ><img :src="each"
            /></nuxt-link>
          </div>
        </swiper>

        <div class="activity-sign" v-if="goodInfo.coupon.discount || goodInfo.coupon.money">
          <div class="triangle" v-if="goodInfo.coupon.discount">{{ language == 'en_US' ? discountUs(this.goodInfo.coupon.discount.discount)+'%' : discountConversion(this.goodInfo.coupon.discount.discount)}}{{ lang.discounts2 }}</div>
          <div class="triangle" v-if="goodInfo.coupon.money">{{ lang.discounts1 }}</div>
        </div>
      </div>

      <div class="border-bottom">
        <div class="title">
          <span class="discount-icon" v-if="goodInfo.coupon.discount">{{ language == 'en_US' ? discountUs(this.goodInfo.coupon.discount.discount)+'%' : discountConversion(this.goodInfo.coupon.discount.discount)}}{{ lang.discounts2 }}</span>
          <span class="discount-icon padding" v-if="goodInfo.coupon.money">￥</span>
          {{ goodInfo.goodsName }}
        </div>
        <div class="price" v-if="!goodInfo.coupon.discount">{{ formatCoin(goodInfo.coinType) }} {{ formatNumber(goodInfo.salePrice) }}</div>

        <div class="discount-price" v-else>
          <div class="old-price">{{ formatCoin(goodInfo.coinType) }} {{ formatNumber(showPi) }}</div>
          <div class="new-price">{{ formatCoin(goodInfo.coinType) }} {{ formatNumber(showP2) }}</div>
        </div>

        <div class="promise-box">
          <div
            v-for="(c, index) in goodInfo.goodsServicesJsons"
            :key="index"
            class="promise-info"
          >
            <div class="promise-img">
              <img :src="$IMG_URL + c.img" alt="" />
            </div>
            <span>{{ c.name }}</span>
          </div>
        </div>

        <div class="discount-activity" v-if="goodInfo.coupon.discount || goodInfo.coupon.money">
          <div class="discount-l">
            <div class="discoupon-d" v-if="goodInfo.coupon.discount">
              <div class="discoupon-d-l">
                <span class="text">{{ lang.discountsActive }}：</span>
                <span class="discount-icon">{{ language == 'en_US' ? discountUs(this.goodInfo.coupon.discount.discount)+'%' : discountConversion(this.goodInfo.coupon.discount.discount)}}{{ lang.discounts2 }}</span>
              </div>

              <div class="time">{{ lang.activityTime}}：{{activeTime}}</div>
            </div>

            <div class="discoupon-d" v-if="goodInfo.coupon.money">
              <div class="discoupon-d-l">
                <span class="text">{{ lang.discountsActive }}：</span>
                <span class="discount-icon">￥</span>
              </div>

              <div class="get" @click="getCoupon">{{ lang.getCoupon }} &gt;</div>
            </div>
          </div>
        </div>

        <div v-if="goodInfo.goodsMod === 1" class="include-box">
          <span>{{ lang.include }}</span>
          <div>
            <i class="iconfont iconstar-jt" />
          </div>
          <!--     <span>+</span>-->
          <!--      <div>-->
          <!--        <i class="iconfont iconicon-zuanshi" />-->
          <!--      </div>-->
        </div>
        <div class="select-line" v-if="goodInfo.carats">
          <span>
            <span>{{ lang.inlay }}</span>
          </span>
          <span @click="showSwiperTap1">
            {{ chooseCarat }}
            <i class="iconfont iconyou" />
          </span>
        </div>
        <div class="bd-b" v-if="goodInfo.carats"></div>
        <div class="select-line">
          <span>{{ lang.chooseColor }}</span>
          <span @click="showChooseEject(conditions[0])">
            {{ conditionText() }}
            <i class="iconfont iconyou" />
          </span>
        </div>
        <div class="bd-b"></div>
        <div class="select-line margin-bottom-10">
          <span>
            <span>{{ lang.chooseSize }}</span>
            <span>（{{ lang['us-version'] }}）</span>
            <div @click="openSize()">!</div>
          </span>
          <span @click="showSwiperTap">
            {{ chooseSize ? chooseSize : lang.stArrContent }}
            <i class="iconfont iconyou" />
          </span>
        </div>
        <!--首次进入-->
        <div
          v-if="
            parseInt($route.query.step) === 1 &&
              !$route.query.isBack &&
              inSale &&
              canAddCart
          "
          class="custom-made-word"
        >
          {{ lang.cmw }}
          <div class="triangle" />
        </div>
        <div
            v-if="
              parseInt($route.query.step) === 1 &&
                !$route.query.isBack &&
                inSale &&
                canAddCart
            "
            class="btn-common btn-white"
            @click="emitStep(1)"
          >
            <span>{{ lang.startDJ }}</span>
          </div>
        <!-- <div class="submit-btn">

          <div
            v-if="
              parseInt($route.query.step) === 1 &&
                !$route.query.isBack &&
                inSale &&
                canAddCart
            "
            class="btn-common btn-pink"
            @click="emitStep(1)"
          >
            <span>{{ lang.startDJ }}</span>
          </div>
          <div
            v-if="parseInt($route.query.step) === 1 && !$route.query.isBack"
            :class="['btn-common', inSale && canAddCart ? 'btn-pink' : 'btn-gray']"
            @click="addCart"
          >
            {{
              inSale
                ? canAddCart
                  ? lang.addCart
                  : lang.noTotalStock
                : lang.notInSale
            }}
          </div>
        </div> -->
        <!-- <div
          v-if="parseInt($route.query.step) === 1 && !$route.query.isBack"
          :class="['btn-common', inSale && canAddCart ? 'btn-white' : 'btn-gray']"
          @click="orderNow"
        >
          {{
            inSale
              ? canAddCart
                ? lang.buyNow
                : lang.noTotalStock
              : lang.notInSale
          }}
        </div> -->
        <div
          v-if="parseInt($route.query.step) === 2 && !$route.query.isBack"
          :class="['btn-common', inSale && canAddCart ? 'btn-white' : 'btn-gray']"
          @click="emitStep(2)"
        >
          <span>{{
            inSale
              ? canAddCart
                ? lang.sureCheck
                : lang.noTotalStock
              : lang.notInSale
          }}</span>
        </div>
        <!--步骤返回-->
        <div
          v-if="$route.query.isBack"
          :class="['btn-common', inSale && canAddCart ? 'btn-pink' : 'btn-gray']"
          @click="emitStep(2)"
        >
          <span>{{
            inSale
              ? canAddCart
                ? lang.sureCheck
                : lang.noTotalStock
              : lang.notInSale
          }}</span>
        </div>
      </div>

      <!-- <div class="wish-and-share">
        <i
          :class="[
            'iconfont',
            { 'iconicon-xinyuandan': !inWish },
            { 'iconxinyuandan-dianji': inWish },
            { active: inWish }
          ]"
          @click="setWish"
        />
        <div />
        <i class="iconfont iconfb" @click="$shareFacelook()" />
      </div> -->
      <div class="ring-details">
        <div class="details-title">
          {{ lang.goodsDetail }}
        </div>
        <div class="details-sku">
          {{ lang.goods }}ID：{{ goodInfo.goodsCode }}
        </div>
        <div class="sku-table">
          <div v-if="index < detailNum" v-for="(b, index) in goodInfo.specs" :key="index">
            <span>{{ b.configName }}</span>
            <span>{{ b.configAttrVal }}</span>
          </div>

          <div v-if="specsLength" :class="['icon',{'reverse': ifShowMore}]" @click="showMore"></div>
        </div>
        <div class="desc-content" v-html="goodInfo.goodsDesc"></div>
      </div>
      <!-- <div class="comment">
        <div class="comment-title">
          {{ lang.clientSay }} <span>({{ total_count }})</span>
        </div>
        <div class="comment-stars">
          <i
            v-for="index in 5"
            :key="index"
            :class="[
              `iconfont`,
              `iconxing`,
              { light: index <= Math.round(starNum) },
              { dark: index > Math.round(starNum) }
            ]"
          ></i>
          <span>{{ starNum.toFixed(1) }}</span>
        </div>
        <template v-if="total_count > 0">
          <div class="comment-box">
            <div class="client-user">
              {{ showEmail(comments.userAccount) }}
            </div>
            <div class="time-and-stars">
              <div class="about-time">
                {{ comments.createTime }}
              </div>
              <div class="about-stars">
                <i
                  v-for="index in 5"
                  :key="index"
                  :class="[
                    `iconfont`,
                    `iconxing`,
                    { light: index <= Math.round(comments.commentsLevel) },
                    { dark: index > Math.round(comments.commentsLevel) }
                  ]"
                ></i>
              </div>
            </div>
            <div class="comment-content ow-h2">
              {{ comments.commentsDesc }}
            </div>
          </div>
          <div
            class="comment-btn"
            @click="$router.push(`/comments?goodId=${$route.query.goodId}`)"
          >
            {{ lang.allComments }} >
          </div>
        </template>
        <template v-else>
          <div class="no-comment">
            {{ lang.noComments }}
          </div>
        </template>
      </div> -->
      <swiper-tap
        ref="caratsSuitability"
        :title="lang.inlay"
        :list="goodInfo.carats"
        :choose-line="caratLine"
        @clear="getCarats"
      ></swiper-tap>

      <swiper-tap
        ref="suitability"
        :title="lang.size"
        :list="goodInfo.sizes"
        :choose-line="sizeLine"
        @clear="getSortBy"
      ></swiper-tap>
      <choose-eject
        ref="quality-eject-choose-pro"
        :title="lang.fineness"
        :type="'quality'"
        :required="true"
        :options="conditions[0].options"
        @clear="clearQuality"
      ></choose-eject>
      <size-board ref="size-board"></size-board>

      <!-- 获取优惠券 -->
      <get-coupon v-if="ifShowCoupon" @closeCoupon="closeCo()" :moneyInfo="this.goodInfo.coupon.money"></get-coupon>
      <login-pop v-if="ifShowPop" @closePop="closePop"></login-pop>
    </div>
    <!-- <div v-else > -->
      <!-- <soleOut></soleOut> -->
    <!-- </div> -->
  </div>
</template>

<script>
import Mx from './ring-mixin'
// import soleOut from '@/components/goods-sole-out/index.vue'
export default {
  head() {
    return {
      title: this.goodInfo.goodsName,
      meta: [
        {
          name: 'title',
          content: this.goodInfo.goodsName,
        },
        {
          name: 'description',
          content: this.goodInfo.goodsName,
        },
        {
          name: 'keywords',
          content: this.goodInfo.goodsName,
        }
      ]
    }
  },
  data() {
    return{
      ifShowCoupon: false,
      language: this.$store.state.language,
      activeTime:'',
      ifShowMore: false,
      detailNum: 4,
      ifShowPop: false
    }
  },
  mixins: [Mx],
  components: {
    // soleOut
  },
  computed: {
    canAddCart() {
      const body = this.goodInfo.details
      if (this.goodInfo.totalStock > 0) {
        for (const i in body) {
          if (parseInt(this.sendDetailsId) === body[i].id) {
            return parseInt(body[i].stock) > 0
          }
        }
      } else {
        return false
      }
      return true
    },
    inSale() {
      return this.goodInfo.goodsStatus === 2
    },
    specsLength() {
      if(this.goodInfo && this.goodInfo.specs && this.goodInfo.specs.length > 4){
        return true
      }else{
        return false
      }
    }
  },
  mounted() {
    const _this = this
    if(this.goodInfo.coupon.hasOwnProperty('discount')){
      this.activeTime = this.changeTime(this.goodInfo.coupon.discount.end_time)
    }
    // this.language = this.getCookie('language')
  },
  methods:{
    closeCo() {
      this.ifShowCoupon = false
    },
    getCoupon() {
      // 获取优惠券
      if(!this.$store.getters.hadLogin) {
      	this.ifShowPop = true
        // this.$toast.show(this.lang.needLogin)
      }else{
        this.ifShowCoupon = true
      }
    },
    showMore(){
      this.ifShowMore = !this.ifShowMore
      this.detailNum = this.detailNum == 4 ? 100 : 4
    },
    closePop() {
      this.ifShowPop = false
    }
  }
}
</script>

<style scoped lang="less">

.engagementRings-component {
  .details-component(100%);
  .submit-btn{
    display: flex;
    justify-content: space-between;
    margin: 0 15px 20px;
    .btn-pink{
      width: 48%;
      margin: 0;
    }
    .btn-white{
      width: 48%;
      margin: 0;
    }
  }
  .btn-white{
    border:none!important;
  }
}
.ring-made-component{
  position: relative;
}
.time {
  color: #b49785;
}
</style>
<style scoped>
.desc-content >>> p,
.desc-content >>> div,
.desc-content >>> img {
  width: 100%;
}
</style>
