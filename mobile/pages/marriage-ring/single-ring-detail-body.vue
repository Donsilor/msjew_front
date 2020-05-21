<template>
  <div class="engagementRings-component">
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
        <div class="triangle" v-if="goodInfo.coupon.discount">{{discountConversion(this.goodInfo.coupon.discount.discount)}}折</div>
        <div class="triangle" v-if="goodInfo.coupon.money">优惠券</div>
      </div>
    </div>
    <div class="title">
      <span class="discount-icon" v-if="goodInfo.coupon.discount">{{discountConversion(this.goodInfo.coupon.discount.discount)}}折</span>
      <span class="discount-icon padding" v-if="goodInfo.coupon.money">￥</span>
      {{ goodInfo.goodsName }}
    </div>

    <div class="price" v-if="!goodInfo.coupon.discount">{{ goodInfo.coinType }} {{ formatNumber(goodInfo.salePrice) }}</div>

    <div class="discount-price" v-else>
      <div class="old-price">原   价{{ goodInfo.coinType }} {{ formatNumber(goodInfo.salePrice) }}</div>
      <div class="new-price">折后价{{ goodInfo.coinType }} {{ formatNumber(goodInfo.coupon.discount.price) }}</div>
    </div>

    <div class="promise-box">
      <div
        v-for="(c, index) in goodInfo.goodsServicesJsons"
        :key="index"
        class="promise-info"
      >
        <div class="promise-img">
          <img :src= url[index] alt="" />
        </div>
        <span>{{ c.name }}</span>
      </div>
    </div>

    <div class="discount-activity" v-if="goodInfo.coupon.discount || goodInfo.coupon.money">
      <div class="discount-l">
        <span class="text">优惠活动：</span>
        <div>
          <div v-if="goodInfo.coupon.discount">
            <span class="discount-icon">{{discountConversion(this.goodInfo.coupon.discount.discount)}}折</span>
          </div>
          <div class="discount-b-box" v-if="goodInfo.coupon.money">
            <span class="discount-icon">￥</span>
            <span class="get" @click="ifShowCoupon = true">领取优惠券&gt;</span>
          </div>
        </div>
      </div>
      <div class="discount-time">
        <span>活动时间：</span><span>2020.4.9</span>
      </div>
    </div>

    <div v-if="goodInfo.goodsMod === 1" class="include-box">
      <span>{{ lang.include }}</span>
      <div>
        <i class="iconfont iconstar-jt" />
      </div>
      <span>+</span>
      <div>
        <i class="iconfont iconicon-zuanshi" />
      </div>
    </div>
    <div class="select-line" v-if="goodInfo.carats">
      <span>
        <span>{{ lang.carat }}</span>
        <!-- <span>（{{ lang['us-version'] }}）</span> -->
        <!-- <div @click="getCarats()">!</div> -->
      </span>
      <span @click="showSwiperTap1()">
        {{ chooseCarats }}
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
        {{ chooseSize }}
        <i class="iconfont iconyou" />
      </span>
    </div>
    <div
      v-if="goodInfo.goodsMod === 1 && inSale && canAddCart"
      class="custom-made-word"
    >
      {{ lang['cmw'] }}
      <div class="triangle" />
    </div>
    <div
      v-if="goodInfo.goodsMod === 1 && inSale && canAddCart"
      class="btn-common btn-pink"
      @click="startCustomMade"
    >
      {{ lang.startDJ }}
    </div>
    <div
      v-if="goodInfo.goodsMod === 1"
      :class="['btn-common', inSale && canAddCart ? 'btn-white' : 'btn-gray']"
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
    <div
      v-else
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
        <div v-for="(b, index) in goodInfo.specs" :key="index">
          <span>{{ b.configName }}</span>
          <span>{{ b.configAttrVal }}</span>
        </div>
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
          <div class="client-user">{{ showEmail(comments.userAccount) }}</div>
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
    <footer-bar></footer-bar>
    <swiper-tap
      ref="caratsSuitability"
      :list="goodInfo.carats"
      @clear="getCarats"
    ></swiper-tap>

    <swiper-tap
      ref="suitability"
      :list="goodInfo.sizes"
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
  </div>
</template>

<script>
import Mx from './single-mixin'
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
  mixins: [Mx],
  data(){
    return {
      url:[
        require('../../static/marriage-ring/icon-01.png'),
        require('../../static/marriage-ring/icon-02.png'),
        require('../../static/marriage-ring/icon-03.png'),
        require('../../static/marriage-ring/icon-04.png')
      ],
      ifShowCoupon: false
    }
  },
  computed: {
    canAddCart() {
      // console.log("canAddCart",this.goodInfo.details)
      const body = this.goodInfo.details
      if (this.goodInfo.totalStock > 0) {
        for (const i in body) {
          if (parseInt(this.sendDetailsId) === body[i].id) {
            return body[i].stock > 0
          }
        }
      } else {
        return false
      }
      return true
    },
    inSale() {
      return this.goodInfo.goodsStatus === 2
    }
  },
  methods:{
    closeCo() {
      this.ifShowCoupon = false
    }
  }
}
</script>

<style scoped lang="less">
.engagementRings-component {
  .details-component(100%);
}
</style>
<style scoped>
.desc-content >>> p,
.desc-content >>> div,
.desc-content >>> img {
  width: 100%;
}
</style>
