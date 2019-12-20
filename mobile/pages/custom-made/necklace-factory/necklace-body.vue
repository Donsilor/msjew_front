<template>
  <div class="accessories-component">
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
    </div>
    <div class="title">
      {{ goodInfo.goodsName }}
    </div>
    <div class="price">{{ goodInfo.coinType }} {{ formatNumber(showPi) }}</div>
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
    <div v-if="goodInfo.goodsMod === 1" class="include-box">
      <span>{{ lang.include }}</span>
      <div>
        <i class="iconfont iconJewelry-necklace" />
      </div>
      <!--     <span>+</span>-->
      <!--      <div>-->
      <!--        <i class="iconfont iconicon-zuanshi" />-->
      <!--      </div>-->
    </div>
    <div class="select-line">
      <span>{{ lang.chooseColor }}</span>
      <span @click="showChooseEject(conditions[0])">
        {{ conditionText() }}
        <i class="iconfont iconyou" />
      </span>
    </div>
    <div v-if="goodInfo.sizesConfig" class="bd-b"></div>
    <div v-if="goodInfo.sizesConfig" class="select-line margin-bottom-10">
      <span>
        <span>{{ lang.chooseSize }}</span>
        <!--        <span>（{{ lang['us-version'] }}）</span>-->
        <!--        <div @click="openSize()">?</div>-->
      </span>
      <span @click="showSwiperTap">
        {{ chooseSize }}
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
      class="btn-common btn-pink"
      @click="emitStep(1)"
    >
      <span>{{ lang.startDJ }}</span>
    </div>
    <div
      v-if="parseInt($route.query.step) === 1 && !$route.query.isBack"
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
      v-if="parseInt($route.query.step) === 2 && !$route.query.isBack"
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
    <div class="wish-and-share">
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
    </div>
    <div class="ring-details">
      <div class="details-title">
        {{ lang.goodsDetail }}
      </div>
      <div class="details-sku">
        {{ lang.goods }}ID：{{ goodInfo.goodsCode }}
      </div>
      <div class="sku-table">
        <div v-for="(b, index) in goodInfo.baseConfig" :key="index">
          <span>{{ b.configVal }}</span>
          <span>{{ b.configAttrIVal }}</span>
        </div>
      </div>
      <div class="desc-content" v-html="goodInfo.goodsDesc"></div>
    </div>
    <div class="comment">
      <div class="comment-title">
        {{ lang.clientSay }} <span>({{ totalCount }})</span>
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
      <template v-if="totalCount > 0">
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
    </div>
    <swiper-tap
      ref="suitability"
      :list="goodInfo.sizesConfig"
      :choose-line="sizeLine"
      @clear="getSortBy"
    ></swiper-tap>
    <choose-eject
      ref="quality-eject-choose"
      :title="lang.fineness"
      :type="'quality'"
      :required="true"
      :options="conditions[0].options"
      @clear="clearQuality"
    ></choose-eject>
    <size-board ref="size-board"></size-board>
  </div>
</template>

<script>
import Mx from './necklace-mixin'
export default {
  mixins: [Mx],
  computed: {
    canAddCart() {
      const body = this.goodInfo.simpleGoodsDetailsList
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
  }
}
</script>

<style scoped lang="less">
.accessories-component {
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
