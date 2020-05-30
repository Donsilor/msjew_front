<template>
  <div class="data-list">
    <div class="top-part">
      <div class="title">
        <button
          :class="{ active: gender === -1 }"
          @click="changeGender(-1)"
        >
          {{lang.own}}
        </button>
        <button
          :class="{ active: gender === 42 }"
          @click="changeGender(42)"
        >
          {{ lang.lady }}
        </button>
        <button
          :class="{ active: gender === 41 }"
          @click="changeGender(41)"
        >
          {{ lang.gentlemen }}
        </button>
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
              <div>{{ discountConversion(each.coupon.discount.discount) }}{{ lang.discounts2 }}</div>
            </div>

            <!-- 优惠券 -->
            <div class="discount-a-icon" v-if="couponType(each.coupon) == 'money'">
              <div>{{ lang.discounts1 }}</div>
            </div>

          </div>

          <!-- 折扣 -->
          <div class="info-title ow-h2" v-if="couponType(each.coupon) == 'discount'">
            <span class="discount-a-icon2">{{ discountConversion(each.coupon.discount.discount) }}{{ lang.discounts2 }}</span>
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
                <span class="coin">{{ each.coinType }}</span>
                <span class="price">{{ formatNumber(each.salePrice) }}</span>
              </div>
              <div class="info-price">
                <span class="coin">{{ each.coinType }}</span>
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

    <swiper-tap
      ref="suitability"
      :choose-line="0"
      @clear="getSortBy"
    ></swiper-tap>
    <choose-eject-pro
      ref="style-eject-choose-pro"
      :title="lang.style"
      :type="'style'"
      :required="true"
      :options="conditions[0].options"
      @clear="clearStyle"
    ></choose-eject-pro>
    <choose-eject-pro
      ref="quality-eject-choose-pro"
      :title="lang.fineness"
      :type="'quality'"
      :required="true"
      :options="conditions[1].options"
      @clear="clearQuality"
    ></choose-eject-pro>
    <!--价格选择底部弹出 -->
    <progress-bar ref="price-bar" @backOption="getBacks"></progress-bar>
  </div>
</template>

<script>
import Mixin from './mixin.js'
import List from '@/mixins/list.js'
import GoodListProps from '@/mixins/good-list-props.js'
export default {
  mixins: [Mixin, List, GoodListProps],
  data() {
    return {
      lang: this.LANGUAGE.listCommons,
      gender: 'all',

    }
  },
  watch: {
    $route(val, oldVal) {
      let style = typeof this.$route.query.style !== 'undefined' ? this.$route.query.style:''
      this.conditions[0].options = this.CONDITION_INFO.style.womanRings
      this.conditions[0].checked = style.toString()
      this.conditions[1].options = this.CONDITION_INFO.quality.rings
      this.conditions[1].checked = ``
      this.conditions[2].checked = ``
      this.conditions[2].options = []
      this.changeGender()

    },


  },
  created() {},
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      let style = typeof this.$route.query.style !== 'undefined' ? this.$route.query.style:''
      this.conditions[0].options = this.CONDITION_INFO.style.womanRings
      this.conditions[0].checked = style.toString()
      this.categoryId = 2
      let type = typeof this.$route.query.type !== 'undefined' ? this.$route.query.type:-1
      this.changeGender(type)

      // this.madeUpEv()
    })
  },
  methods: {
    changeGender(type = -1) {
      if ([-1,41, 42].indexOf(type) > -1) {
        this.gender = type
      }
      this.madeUpEv()
    },
    // 组装Ev
    madeUpEv() {
      this.ev = ``
      if (this.conditions[0].checked === ``) {
          this.ev += `marry_style_wom=-1`
        } else {
          this.ev += `marry_style_wom=${this.conditions[0].checked}`
        }

      if (this.conditions[1].checked !== ``) {
        this.ev += `^material=${this.conditions[1].checked}`
      }
      if (this.conditions[2].checked !== ``) {
        this.ev += `^sale_price=${this.conditions[2].checked
          .split(',')
          .join('-')}`
      }
      this.ev += `^gender=${this.gender}`
      this.research()
      console.log(this.ev)
    }
  }
}
</script>

<style scoped lang="less">
.data-list {
  position: relative;
  .top-part {
    .top-part(3);
    .title {
      font-size: 0;
      button {
        width: 100px;
        height: 30px;
        font-size: 14px;
        font-weight: 400;
        box-sizing: border-box;
        color: rgba(51, 51, 51, 1);
        background: rgba(251, 251, 251, 1);
        border: 1px solid rgba(221, 221, 221, 1);
        transition: all 0.2s linear;
      }
      button:nth-of-type(1) {
        border-right: 0;
        // border-radius: 15px 0 0 15px;
      }
      button:nth-of-type(3) {
        border-left: 0;
        // border-radius: 0 15px 15px 0;
      }
      button.active {
        color: rgba(255, 255, 255, 1);
        border: 0;
        background: rgba(242, 155, 135, 1);
      }
    }
  }
  .list-part {
    @listPart();
  }
}
</style>
