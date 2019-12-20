<template>
  <div class="engagementRings-component">
    <div class="swiper-box">
      <swiper :auto="true" :duration="5000">
        <div v-for="(each, n) in ringBanners" :key="n">
          <nuxt-link
            :to="
              `/image-view?path=${$helpers.base64Encode(
                JSON.stringify(ringBanners)
              )}`
            "
            ><img :src="each"
          /></nuxt-link>
        </div>
      </swiper>
    </div>
    <div class="title">
      {{ goodInfo.name }}
    </div>
    <div class="price">
      {{ goodInfo.coinType }} {{ formatNumber(showPrice) }}
    </div>
    <div class="promise-box">
      <div
        v-for="(c, index) in goodsServicesJsons"
        :key="index"
        class="promise-info"
      >
        <div class="promise-img">
          <img :src="$IMG_URL + c.img" alt="" />
        </div>
        <span>{{ c.name }}</span>
      </div>
    </div>
    <div class="include-box">
      <span>{{ lang.include }}</span>
      <div>
        <i class="iconfont icontaojie" />
      </div>
      <span>{{ lang.pairRing }}*1</span>
    </div>
    <div>
      <!--      第一个戒指-->
      <div class="select-line">
        <span>
          <span
            :class="[
              'sex-icon',
              ['lady', 'gentlemen', 'neutral'][firstRing.userSex]
            ]"
          >
            <!--            <i v-if="firstRing.userSex === 0" class="iconfont icon_nv" />-->
            <!--            <i v-if="firstRing.userSex === 1" class="iconfont icon_nan" />-->
            <i
              :class="[
                'iconfont',
                ['icon_nv', 'icon_nan', 'iconnannv'][firstRing.userSex]
              ]"
            />
          </span>
          {{ lang.chooseColor }}
        </span>
        <span @click="showFirstRingQualityChoose">
          {{ firstRingQualityText }}
          <i class="iconfont iconyou" />
        </span>
      </div>
      <div class="bd-b"></div>
      <div class="select-line">
        <span>
          <span>{{ lang.chooseSize }}</span>
          <span>（{{ lang['us-version'] }}）</span>
          <div @click="openSize()">!</div>
        </span>
        <span @click="showFirstRingSizeChoose">
          {{ firstRingSizeText }}
          <i class="iconfont iconyou" />
        </span>
      </div>
      <div class="bd-b"></div>
      <!--      第二个戒指-->
      <div class="select-line">
        <span>
          <span
            :class="[
              'sex-icon',
              ['lady', 'gentlemen', 'neutral'][secondRing.userSex]
            ]"
          >
            <i
              :class="[
                'iconfont',
                ['icon_nv', 'icon_nan', 'iconnannv'][secondRing.userSex]
              ]"
            />
          </span>
          {{ lang.chooseColor }}
        </span>
        <span @click="showSecondRingQualityChoose">
          {{ secondRingQualityText }}
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
        <span @click="showSecondRingSizeChoose">
          {{ secondRingSizeText }}
          <i class="iconfont iconyou" />
        </span>
      </div>
    </div>
    <div
      :class="['btn-common', canAddCart ? 'btn-pink' : 'btn-gray']"
      :disabled="!canAddCart"
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
      <div class="details-sku">{{ lang.goods }}ID：{{ goodInfo.ringCode }}</div>
      <div class="base-info">
        <div class="details-title">
          {{ firstRing.userSexText }}
        </div>
        <div class="sku-table">
          <div v-for="(b, index) in firstRing.baseConfig" :key="index">
            <span>{{ b.configVal }}</span>
            <span>{{ b.configAttrIVal }}</span>
          </div>
        </div>
      </div>
      <div class="base-info">
        <div class="details-title">
          {{ secondRing.userSexText }}
        </div>
        <div class="sku-table">
          <div v-for="(b, index) in secondRing.baseConfig" :key="index">
            <span>{{ b.configVal }}</span>
            <span>{{ b.configAttrIVal }}</span>
          </div>
        </div>
      </div>
      <div class="desc-content" v-html="ringDetail"></div>
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
          @click="$router.push(`/comments?groupId=${$route.query.ringId}`)"
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
    <footer-bar></footer-bar>

    <swiper-tap
      ref="first-ring-suitability"
      :list="firstRing.sizesConfig"
      @clear="firstRingClearSize"
    ></swiper-tap>
    <choose-eject
      ref="first-ring-quality-choose"
      :title="`${lang.fineness}`"
      :type="'quality'"
      :required="true"
      :options="firstRingQuality.options"
      @clear="firstRingClearQuality"
    ></choose-eject>

    <swiper-tap
      ref="second-ring-suitability"
      :list="secondRing.sizesConfig"
      @clear="secondRingClearSize"
    ></swiper-tap>
    <choose-eject
      ref="second-ring-quality-choose"
      :title="`${lang.fineness}`"
      :type="'quality'"
      :required="true"
      :options="secondRingQuality.options"
      @clear="secondRingClearQuality"
    ></choose-eject>
    <size-board ref="size-board"></size-board>
  </div>
</template>

<script>
import Mx from './pair-mixin'
export default {
  mixins: [Mx],
  computed: {
    canAddCart() {
      if (this.firstRing.totalStock > 0 && this.secondRing.totalStock > 0) {
        if (
          (this.firstRingSimpleDetail &&
            this.firstRingSimpleDetail.stock &&
            this.firstRingSimpleDetail.stock <= 0) ||
          (this.secondRingSimpleDetail &&
            this.secondRingSimpleDetail.stock &&
            this.secondRingSimpleDetail.stock <= 0)
        ) {
          return false
        }
      } else {
        return false
      }
      return true
      // return this.firstRing.totalStock > 0 && this.secondRing.totalStock > 0
    },
    inSale() {
      return (
        this.firstRing.goodsStatus === 2 && this.secondRing.goodsStatus === 2
      )
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
