<template>
  <div class="diamond-part">
    <div class="top-part">
      <div class="title">
        {{ lang.bddOnlyDiamond }}
      </div>
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
      <div class="title" v-show="pageInfo && pageInfo.total_count">
        <div>
          {{ lang.total }}
          <span>{{ (pageInfo && pageInfo.total_count) || 0 }}</span>
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

            <!-- 折扣 -->
            <div class="discount-a-icon" v-if="couponType(each.coupon) == 'discount'">
              <div>{{ discountConversion(each.coupon.discount.discount) }}折</div>
            </div>

            <!-- 优惠券 -->
            <div class="discount-a-icon" v-if="couponType(each.coupon) == 'money'">
              <div>优惠券</div>
            </div>
          </div>

          <!-- 折扣 -->
          <div class="info-title ow-h2" v-if="couponType(each.coupon) == 'discount'">
            <span class="discount-a-icon2">{{ discountConversion(each.coupon.discount.discount) }}折</span>
            {{ each.goodsName }}
          </div>

          <!-- 优惠券 -->
          <div class="info-title ow-h2" v-if="couponType(each.coupon) == 'money'">
            <span class="discount-b-icon2">￥</span>
            {{ each.goodsName }}
          </div>

          <div class="product-price">
            <div class="list-discount-price" v-if="couponType(each.coupon) !== 'discount'">
              <div class="info-price">
                <span class="coin">{{ each.coinType }}</span>
                <span class="price">{{ formatNumber(each.salePrice) }}</span>
              </div>
            </div>
          
            <!-- 折扣 -->
            <div class="list-discount-price" v-if="couponType(each.coupon) == 'discount'">
              <div class="info-price old-price-2">
                <span class="coin">原  价{{ each.coinType }}</span>
                <span class="price">{{ formatNumber(each.salePrice) }}</span>
              </div>
              <div class="info-price">
                <span class="coin">折后加{{ each.coinType }}</span>
                <span class="price">{{ formatNumber(each.coupon.discount.price) }}</span>
              </div>
            </div>
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
    <swiper-tap
      ref="suitability"
      :list="CONDITION_INFO.sortBy.diamond"
      @clear="getSortBy"
    ></swiper-tap>
    <!--形状选择底部弹出-->
    <choose-eject-pro
      ref="shape-eject-choose-pro"
      :type="'shape'"
      :required="true"
      :options="conditions[0].options"
      @clear="clearShape"
    >
      <template slot="title">
        <div class="eject-choose-pro-title">
          <div>{{ lang.shape }}</div>
          <div @click="showChoose(`diamondChoose`)">?</div>
        </div>
      </template>
    </choose-eject-pro>
    <diamond-choose ref="diamondChoose"></diamond-choose>
    <!--克拉选择底部弹出-->
    <carat-progress-bar
      ref="carat-bar"
      @help="showChoose(`caratChoose`)"
      @backOption="getBacks"
    ></carat-progress-bar>
    <carat-choose ref="caratChoose"></carat-choose>
    <!--颜色选择底部弹出-->
    <color-progress-bar
      ref="color-bar"
      @help="showChoose(`colorChoose`)"
      @backOption="getBacks"
    ></color-progress-bar>
    <color-choose ref="colorChoose"></color-choose>
    <!--净度选择底部弹出-->
    <clarity-progress-bar
      ref="clarity-bar"
      @help="showChoose(`clarityChoose`)"
      @backOption="getBacks"
    ></clarity-progress-bar>
    <clarity-choose ref="clarityChoose"></clarity-choose>
    <!--切割选择底部弹出-->
    <cuts-progress-bar
      ref="cut-bar"
      @help="showChoose(`cutChoose`)"
      @backOption="getBacks"
    ></cuts-progress-bar>
    <cut-choose ref="cutChoose"></cut-choose>
    <!--价格选择底部弹出-->
    <progress-bar ref="price-bar" @backOption="getBacks"></progress-bar>
    <!--光泽选择底部弹出-->
    <luster-progress-bar
      ref="luster-bar"
      @backOption="getBacks"
    ></luster-progress-bar>
    <!--对称选择底部弹出-->
    <symmetry-progress-bar
      ref="symmetry-bar"
      @backOption="getBacks"
    ></symmetry-progress-bar>
  </div>
</template>

<script>
import Mixin from './mixin.js'
import List from '@/mixins/list.js'
import GoodListProps from '@/mixins/good-diamond-list-props.js'
export default {
  name: 'List',
  mixins: [Mixin, List, GoodListProps]
}
</script>

<style scoped lang="less">
.list-page {
  background: white;
}
.diamond-part {
  position: relative;
  .top-part {
    .top-part(4);
  }
  .list-part {
    @listPart();
    background: white;
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
