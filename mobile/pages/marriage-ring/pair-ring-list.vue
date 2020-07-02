<template>
  <div class="data-list">
    <div class="top-part">
      <div class="title">{{ lang['couple-rings'] }}</div>
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
              <div>{{ language == 'en_US' ? discountUs(each.coupon.discount.discount)+'%' : discountConversion(each.coupon.discount.discount)}}{{ lang.discounts2 }}</div>
            </div>

            <!-- 优惠券 -->
            <div class="discount-a-icon" v-if="couponType(each.coupon) == 'money'">
              <div>{{ lang.discounts1 }}</div>
            </div>

          </div>

          <!-- 折扣 -->
          <div class="info-title ow-h2" v-if="couponType(each.coupon) == 'discount'">
            <span class="discount-a-icon2">{{ language == 'en_US' ? discountUs(each.coupon.discount.discount)+'%' : discountConversion(each.coupon.discount.discount)}}{{ lang.discounts2 }}</span>
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
                <span class="coin">{{ formatCoin(each.coinType) }}</span>
                <span class="price">{{ formatNumber(each.salePrice) }}</span>
              </div>
            </div>

            <!-- 折扣 -->
            <div class="list-discount-price" v-if="couponType(each.coupon) == 'discount'">
              <div class="info-price old-price-2">
                <span class="coin">{{ formatCoin(each.coinType) }}</span>
                <span class="price">{{ formatNumber(each.salePrice) }}</span>
              </div>
              <div class="info-price">
                <span class="coin">{{ formatCoin(each.coinType) }}</span>
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
import Axios from 'axios'
import Mixin from './mixin.js'
import List from '@/mixins/list.js'
import GoodListProps from '@/mixins/good-list-props.js'
const CancelToken = Axios.CancelToken
export default {
  mixins: [Mixin, List,GoodListProps],
  data() {
    return {
      lang: this.LANGUAGE.listCommons,
      language: this.$store.state.language
      // listUrl: `/wap/goods/style/search`,
      // beginPrice: 0,
      // endPrice: 100000000
    }
  },
  watch: {
    $route(val, oldVal) {
      let style = typeof this.$route.query.style !== 'undefined' ? this.$route.query.style:''
      this.conditions[0].options = this.CONDITION_INFO.style.coupleRings
      this.conditions[0].checked = style.toString()
      this.conditions[1].options = this.CONDITION_INFO.quality.rings
      this.conditions[1].checked = ``
      this.conditions[2].checked = ``
      this.conditions[2].options = []
      this.madeUpEv()
    },
  },
  created() {},
  mounted() {
    // console.log(11111111111)
    const _this = this
    _this.$nextTick(() => {
      // this.conditions[0].options = this.CONDITION_INFO.style.coupleRings
      // console.log("价格",this.conditions)
      let style = typeof this.$route.query.style !== 'undefined' ? this.$route.query.style:''
      this.conditions[0].options = this.CONDITION_INFO.style.coupleRings
      this.conditions[0].checked = style.toString()
      this.categoryId = 19
      let type = typeof this.$route.query.type !== 'undefined' ? this.$route.query.type:-1
      // this.changeGender(type)
      this.madeUpEv()
    })
  },
  methods: {
    // getBacks(val) {
    //   console.log("val",val)
    //   if (val.content.length !== 0) {
    //     this.conditions[2].checked = `${val.content[0].id},${val.content[1].id}`
    //     this.beginPrice = val.content[0].id || 0
    //     this.endPrice = val.content[1].id || 99999999
    //   } else {
    //     this.conditions[2].checked = ``
    //     this.beginPrice = 0
    //     this.endPrice = 99999999
    //   }
    //   this.conditions[2].options = val.content
    //   this.research()
    // },
    // 组装Ev
    madeUpEv() {
      this.ev = ``
      if (this.conditions[0].checked !== ``) {
        this.ev += `^ring_style=${this.conditions[0].checked}`
      }

      if (this.conditions[1].checked !== ``) {
        this.ev += `^material=${this.conditions[1].checked}`
      }
      if (this.conditions[2].checked !== ``) {
        this.ev += `^sale_price=${this.conditions[2].checked
          .split(',')
          .join('-')}`
      }
      // this.ev += `^gender=${this.gender}`
      this.research()
      console.log(this.ev)
    },
    // 请求当前页数据
    // getPageInfo(page = 1) {
    //   const _this = this
    //   const keyword = _this.keyword

    //   if (!_this.canSearchWithoutKeyword && !keyword) {
    //     _this.$toast('keyword is required')
    //     return
    //   }

    //   // 此次请求标识
    //   const reqMark = `${page}-${keyword}`

    //   if (this.isRequesting(reqMark)) {
    //     // console.log('不重复请求')
    //     return
    //   }

    //   const options = {
    //     cancelToken: new CancelToken(cancel => {
    //       _this.addRequesting(reqMark, cancel)
    //     }),
    //     params: {
    //       // beginPrice: _this.beginPrice,
    //       // endPrice: _this.endPrice,
    //       page: page,
    //       materialValue: _this.conditions[1].checked,  //款式
    //       orderParam: _this.sortBy,
    //       orderType: _this.sortType,
    //       page_size: 6,
    //       styleValue: _this.conditions[0].checked,  //成色
    //       userId: null,
    //       categoryId: 19
    //     }
    //   }

    //   //console.log(`请求页码为：${page}`)

    //   _this
    //     .$axios({
    //       method: 'post',
    //       url: _this.listUrl,
    //       headers: options.headers || {},
    //       params: Object.assign(options.params || {}, _this.specialParams),
    //       data: options.data || {}
    //     })
    //     .then(res => {
    //       console.log("res",res)
    //       if (res.data) {
    //         _this.listData[page] = JSON.parse(JSON.stringify(res.data))
    //       }
    //       // _this.listData[page] = JSON.parse(JSON.stringify(res.data || []))
    //       delete res.data
    //       _this.setPageInfo(res)
    //       _this.removeRequesting(reqMark)
    //     })
    //     .catch(err => {
    //       console.error(err)
    //       if (err instanceof Error) {
    //         console.log('这是一个错误')
    //       } else {
    //         console.log('这是一个错误数据')
    //       }
    //       _this.removeRequesting(reqMark)
    //     })
    // }
  }
}
</script>

<style scoped lang="less">
.data-list {
  position: relative;
  .top-part {
    .top-part(3);
  }
  .list-part {
    @listPart();
  }
}
</style>
