<template>
  <div class="data-list">
    <div class="top-part">
      <div class="title">
        <button
          :class="{ active: gender === 'lady' }"
          @click="changeGender('lady')"
        >
          {{ lang.lady }}
        </button>
        <button
          :class="{ active: gender === 'gentlemen' }"
          @click="changeGender('gentlemen')"
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
    <swiper-tap ref="suitability" @clear="getSortBy"></swiper-tap>
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
      gender: 'lady'
    }
  },
  watch: {
    $route(val, oldVal) {
      this.changeGender(val.query.type)
    }
  },
  created() {},
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      this.conditions[0].options = this.CONDITION_INFO.style.womanRings
      this.categoryId = 2
      this.changeGender(this.$route.query.type)
      // this.madeUpEv()
    })
  },
  methods: {
    changeGender(type = 'lady') {
      if (['lady', 'gentlemen'].indexOf(type) > -1) {
        this.gender = type
      }
      this.conditions[0].options =
        type === `lady`
          ? this.CONDITION_INFO.style.womanRings
          : this.CONDITION_INFO.style.manRings
      this.conditions[0].checked = ''
      this.conditions[1].checked = ''
      this.madeUpEv()
    },
    // 组装Ev
    madeUpEv() {
      this.ev = ``
      if (this.gender === `lady`) {
        if (this.conditions[0].checked === ``) {
          this.ev += `marry_style_wom=-1`
        } else {
          this.ev += `marry_style_wom=${this.conditions[0].checked}`
        }
      } else if (this.conditions[0].checked === ``) {
        this.ev += `marry_style_man=-1`
      } else {
        this.ev += `marry_style_man=${this.conditions[0].checked}`
      }

      if (this.conditions[1].checked !== ``) {
        this.ev += `^material=${this.conditions[1].checked}`
      }
      if (this.conditions[2].checked !== ``) {
        this.ev += `^sale_price=${this.conditions[2].checked
          .split(',')
          .join('-')}`
      }
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
        border-radius: 15px 0 0 15px;
      }
      button:nth-of-type(2) {
        border-left: 0;
        border-radius: 0 15px 15px 0;
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
