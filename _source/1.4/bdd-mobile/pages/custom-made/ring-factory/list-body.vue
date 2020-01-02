<template>
  <div class="engagement-part">
    <div class="top-part">
      <div class="title">{{ lang.ringList }}</div>
      <div class="choose-box">
        <div
          v-for="(each, n) in conditions"
          :key="n"
          :class="['choose-btn', { active: each.checked.length > 0 }]"
          @click="showChooseEject(each)"
        >
          <div>{{ each.name }}</div>
          <div class="ow-h1">
            {{ each.checked.length > 0 ? conditionText(each) : lang.all }}
          </div>
          <!--          <div-->
          <!--            v-show="each.checked.length > 0"-->
          <!--            class="triangle-down triangle"-->
          <!--          />-->
        </div>
      </div>
    </div>
    <!--    list start-->
    <div class="list-part">
      <div class="title">
        <div>
          {{ lang.total }}
          <span>{{ (pageInfo && pageInfo.totalCount) || 0 }}</span>
          {{ lang.goods }}
        </div>
        <div @click="showSwiperTap">
          <span>{{ conditionWord }}</span>
          <i class="iconfont iconshaixuan" />
        </div>
      </div>
      <div class="list">
        <div
          v-for="(each, index) in showData"
          :key="index"
          @click="clickData(each)"
        >
          <div class="info-image">
            <img
              :src="imageStrToArray(each.goodsImages)[0]"
              @error="imageError"
            />
          </div>
          <div class="info-title ow-h2">
            {{ each.goodsName }}
          </div>
          <div class="info-price">
            {{ each.coinType }} {{ formatNumber(each.salePrice) }}
          </div>
        </div>
      </div>
      <bdd-empty
        v-if="noListData"
        :type="'list'"
        @searchAgain="research"
      ></bdd-empty>
      <requesting v-if="requestingListData"></requesting>
      <!--      <no-more-data v-if="noMoreListData"></no-more-data>-->
      <footer-bar v-if="noMoreListData"></footer-bar>
    </div>
    <!--匹配度select-->
    <swiper-tap ref="suitability" @clear="getSortBy"></swiper-tap>
    <!--形状选择底部弹出-->
    <choose-eject-pro
      ref="style-eject-choose-pro"
      :title="lang.style"
      :type="'style'"
      :required="true"
      :multiple="false"
      :options="conditions[0].options"
      @clear="clearStyle"
    ></choose-eject-pro>
    <!--成色-->
    <choose-eject-pro
      ref="quality-eject-choose-pro"
      :title="lang.fineness"
      :required="true"
      :type="'quality'"
      :options="conditions[1].options"
      @clear="clearQuality"
    ></choose-eject-pro>
    <!--价格选择底部弹出-->
    <progress-bar ref="price-bar" @backOption="getBacks"></progress-bar>
  </div>
</template>

<script>
import Mixin from './mixin.js'
import List from '@/mixins/list.js'
import GoodListProps from '@/mixins/good-list-props.js'
export default {
  name: 'List',
  mixins: [Mixin, List, GoodListProps]
}
</script>

<style scoped lang="less">
.engagement-part {
  position: relative;
  .top-part {
    .top-part(3);
  }
  .list-part {
    @listPart();
  }
}
.eject-choose-pro-title {
  display: flex;
  align-items: center;
  justify-content: center;
  div:nth-child(1) {
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-right: 3px;
  }
  div:nth-child(2) {
    width: 16px;
    height: 16px;
    line-height: 16px;
    background: rgba(242, 155, 135, 1);
    border-radius: 50%;
    color: #fff;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
