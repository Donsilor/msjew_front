<template>
  <div class="engagementRings-component">
    <div v-if="this.goodInfo.goodsStatus === 2">
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
        <div class="price" v-if="!goodInfo.coupon.discount">
          {{ formatCoin(goodInfo.coinType) }}{{ formatNumber(showPrice) }}
        </div>

        <div class="discount-price" v-else>
          <div class="old-price">{{ formatCoin(goodInfo.coinType) }} {{ formatNumber(showPrice) }}</div>
          <div class="new-price">{{ formatCoin(goodInfo.coinType) }} {{ formatNumber(showPrice2) }}</div>
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

        <!-- 优惠活动 -->
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

        <div class="include-box">
          <span>{{ lang.include }}</span>
          <div>
            <i class="iconfont icontaojie" />
          </div>
          <span>{{ lang.pairRing }}*1</span>
        </div>

        <!--      第一个戒指-->
        <div class="select-box">
          <div class="select-line">
            <span>
              <span
                :class="[
                  'sex-icon',
                  ['lady', 'gentlemen', 'neutral'][firstRing.userSex]
                ]"
              >
                <i
                  :class="[
                    'iconfont',
                    ['icon_nv', 'icon_nan', 'iconnannv'][firstRing.userSex]
                  ]"
                />
              </span>
              {{ lang.goodsMaterial }}
            </span>
            <span>{{ firstRingMaterialText }}</span>
          </div>
          <!-- <div class="bd-b"></div> -->
          <div class="select-line first" v-if="firstRing.carats.length >0">
            <span>{{ lang.goodsCarat }}</span>
            <span>{{ firstRingCaratText }}</span>
          </div>
          <!-- <div class="bd-b" v-if="firstRing.carats.length >0"></div> -->
          <div class="select-line">
            <span>
              <span>{{ lang.goodsSize }}（{{ lang['us-version'] }}）</span>
              <div @click="openSize()">!</div>：
            </span>
            <span>{{ firstRingSizeText }}</span>
          </div>
          <!-- <div class="bd-b"></div> -->
          <!-- 色彩 start -->
          <div class="select-line first" v-if="firstRing.colors.length >0">
            <span>{{ lang.goodsColor }}</span>
            <span>{{ firstRingColorText }}</span>
          </div>
          <!-- <div class="bd-b" v-if="firstRing.colors.length >0"></div> -->
          <!-- 色彩 end -->

          <i class="iconfont iconyou" @click="showAttr=true, double='doubleA'" />
        </div>

        <!-- 第二个戒指 -->
        <div class="select-box">
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
                      ['icon_nv', 'icon_nan', 'iconnannv'][firstRing.userSex]
                    ]"
                  />
                </span>
              {{ lang.goodsMaterial }}
            </span>
            <span>{{ secondRingmaterialText }}</span>
          </div>
          <!-- <div class="bd-b"></div> -->
          <div class="select-line second" v-if="secondRing.carats.length >0">
            <span>{{ lang.goodsCarat }}</span>
            <span>{{ secondRingCaratText }}</span>
          </div>
          <!-- <div class="bd-b" v-if="secondRing.carats.length >0"></div> -->
          <div class="select-line">
            <span>
              <span>{{ lang.goodsSize }}（{{ lang['us-version'] }}）</span>
              <div @click="openSize()">!</div>：
            </span>
            <span>{{ secondRingSizeText }}</span>
          </div>
          <!-- 色彩 start -->
          <!-- <div class="bd-b" v-if="secondRing.colors.length >0"></div> -->
          <div class="select-line second" v-if="secondRing.colors.length >0">
            <span>{{ lang.goodsColor }}</span>
            <span>{{ secondRingColorText }}</span>
          </div>
          <!-- 色彩 end -->

          <i class="iconfont iconyou" @click="showAttr=true, double='doubleB'"/>
        </div>

        <div
          :class="['btn-common btn-gray', { btnActive: canAddCart }]"
          
          @click="orderNow"
        >
        {{
            lang.buyNow
          }}
          <!-- {{
            inSale ? canAddCart ? lang.addCart : lang.noTotalStock: lang.notInSale
          }} -->
        </div>
        <!-- ['btn-common', canAddCart ? 'btn-gray' : 'btn-pink'] :disabled="!canAddCart"-->
        <div
          :class="['btn-common btn-gray', { btnActivePink: canAddCart }]"
          
          @click="addCart"
        >
        {{
            lang.addCart
          }}
          <!-- {{
            inSale ? canAddCart ? lang.addCart : lang.noTotalStock: lang.notInSale
          }} -->
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
        <div class="details-sku">{{ lang.goods }}ID：{{ goodInfo.goodsCode }}</div>
        <div class="base-info">
          <div class="details-title">
            {{ firstRing.userSexText }}
          </div>
          <div class="sku-table">
            <div v-if="index < detailNum" v-for="(b, index) in firstRing.specs" :key="index">
              <span>{{ b.configName }}</span>
              <span>{{ b.configAttrVal }}</span>
            </div>

            <div v-if="specsLength" :class="['icon',{'reverse': ifShowMore}]" @click="showMore"></div>
          </div>
        </div>
        <div class="base-info">
          <div class="details-title">
            {{ secondRing.userSexText }}
          </div>
          <div class="sku-table">
            <div v-if="index < detailNumT" v-for="(b, index) in secondRing.specs" :key="index">
              <span>{{ b.configName }}</span>
              <span>{{ b.configAttrVal }}</span>
            </div>

            <div v-if="specsLengthT" :class="['icon',{'reverse': ifShowMoreT}]" @click="showMoreT"></div>
          </div>
        </div>
        <div class="desc-content" v-html="ringDetail"></div>
      </div>
  
      <footer-bar></footer-bar>
      <swiper-tap
        ref="first-ring-carat"
        :title="`${lang.carat}`"
        :list="firstRing.carats"
        @clear="firstRingClearCarat"
      ></swiper-tap>
      <swiper-tap
        ref="first-ring-suitability"
        :list="firstRing.sizes"
        @clear="firstRingClearSize"
      ></swiper-tap>
      <swiper-tap
        ref="first-ring-color"
        :title="`${lang.shade}`"
        :list="firstRing.colors"
        @clear="firstRingClearColor"
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
        ref="second-ring-carat"
        :title="`${lang.carat}`"
        :list="secondRing.carats"
        @clear="secondRingClearCarat"
      ></swiper-tap>
      <swiper-tap
        ref="second-ring-suitability"
        :list="secondRing.sizes"
        @clear="secondRingClearSize"
      ></swiper-tap>
      <swiper-tap
        ref="second-ring-color"
        :title="`${lang.shade}`"
        :list="secondRing.colors"
        @clear="secondRingClearColor"
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
      <!-- 获取优惠券 -->
      <get-coupon v-if="ifShowCoupon" @closeCoupon="closeCo()" :moneyInfo="this.goodInfo.coupon.money"></get-coupon>
      <login-pop v-if="ifShowPop" @closePop="closePop"></login-pop>

      <!-- 商品属性 -->
      <goods-attr
        v-if="showAttr"
        :info="goodInfo"
        :doubleType="double"
        :attrIndex="attrIndex"
        :attrIndexB="attrIndexB"
        @close="showAttr=false"
        @changeAttr="changeAttr"
        :firstRing="firstRing"
        :secondRing="secondRing"
        :goodsAttrA="goodsAttrA"
        :goodsAttrB="goodsAttrB"
        :firstRingId="firstRingId"
        :secondRingId="secondRingId"
        :attrRegroupA="attrRegroupA"
        :attrRegroupB="attrRegroupB"
      ></goods-attr>
    </div>
    <div v-else >
      <soleOut></soleOut>
    </div>
  </div>
</template>

<script>
import Mx from '../marriage-ring/pair-mixin'
import soleOut from '@/components/goods-sole-out/index.vue'
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
  components: {
    soleOut
  },
  data(){
    return{
      url:[
        require('../../static/marriage-ring/icon-01.png'),
        require('../../static/marriage-ring/icon-02.png'),
        require('../../static/marriage-ring/icon-03.png'),
        require('../../static/marriage-ring/icon-04.png')
      ],
      ifShowCoupon: false,
      language: this.$store.state.language,
      activeTime:'',
      ifShowMore: false,
      detailNum: 4,
      ifShowMoreT: false,
      detailNumT: 4,
      ifShowPop: false,
      isLogin: !!this.$store.state.token,
      showAttr: false,
      attrIndex: null,
      attrIndexB: null,
      double: '',
      attrRegroupA: '',
      attrRegroupB: ''
    }
  },
  computed: {
    canAddCart() {
      if (this.firstRing.totalStock > 0 && this.secondRing.totalStock > 0) {
        if (this.firstStock <= 0 || this.secondStock <= 0){
          return false
        }
      } else{
        return false
      }
      if(this.goodsId){
        return true
      }
      
      return false
    },
    inSale() {
      return (
        this.goodInfo.goodsStatus === 2
      )
    },
    specsLength() {
      if(this.firstRing && this.firstRing.specs && this.firstRing.specs.length > 4){
        return true
      }else{
        return false
      }
    },
    specsLengthT() {
      if(this.secondRing && this.secondRing.specs && this.secondRing.specs.length > 4){
        return true
      }else{
        return false
      }
    }
  },
  mounted(){
    const _this = this
    if(this.goodInfo.coupon.hasOwnProperty('discount')){
      this.activeTime = this.changeTime(this.goodInfo.coupon.discount.end_time)
    }
    // console.log("ddddd",this.canAddCart)this.firstRingId
      // const secondRing = _this.secondRingId
    // console.log("ooooooooo",this.secondRing)
  },
  methods:{
    closeCo() {
      this.ifShowCoupon = false
    },
    // 获取优惠券
    getCoupon() {
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
    showMoreT(){
      this.ifShowMoreT = !this.ifShowMoreT
      this.detailNumT = this.detailNumT == 4 ? 100 : 4
    },
    closePop() {
      this.ifShowPop = false
    },
    changeAttr(select) {
      if(select.type == 'doubleA'){
        if(select.firstId){
          this.firstRingId = select.firstId
        }

        if(typeof(select.material) == 'object'){
          this.firstRingMaterial = {
            id: select.material.id,
            text: select.material.name
          }
        }

        if(typeof(select.carat) == 'object'){
          this.firstRingCarat = {
            id: select.carat.sortBy,
            text: select.carat.content
          }
        }

        if(typeof(select.size) == 'object'){
          this.firstRingSize = {
            id: select.size.sortType,
            text: select.size.content
          }
        }

        if(typeof(select.color) == 'object'){
          this.firstRingColor = {
            id: select.color.sortType,
            text: select.color.content
          }
          this.firstRingColorAttrs[0].config_id = this.firstRingColorDetail
          this.firstRingColorAttrs[0].config_attr_id = this.firstRingColor.id
        }

        this.attrIndex = select.select

        if(select.attrRegroup){
          this.attrRegroupA = select.attrRegroup
        }
      }else{
        if(select.secondId){
          this.secondRingId = select.secondId
        }

        if(typeof(select.material) == 'object'){
          this.secondRingMaterial = {
            id: select.material.id,
            text: select.material.name
          }
        }

        if(typeof(select.carat) == 'object'){
          this.secondRingCarat = {
            id: select.carat.sortBy,
            text: select.carat.content
          }
        }

        if(typeof(select.size) == 'object'){
          this.secondRingSize = {
            id: select.size.sortType,
            text: select.size.content
          }
        }

        if(typeof(select.color) == 'object'){
          this.secondRingColor = {
            id: select.color.sortType,
            text: select.color.content
          }
          this.secondRingColorAttrs[0].config_id = this.secondRingColorDetail
          this.secondRingColorAttrs[0].config_attr_id = this.secondRingColor.id
        }

        this.attrIndexB = select.select

        if(select.attrRegroup){
          this.attrRegroupB = select.attrRegroup
        }
      }

      this.showPi = select.price
      this.sendDetailsId = select.id

      let item;
      for(let i=0, len=this.goodInfo.details.length; i<len; i++){
        item = this.goodInfo.details[i]
        if(item.id == select.id){
          this.coupleLadyId = item.ladyRing
          this.coupleMenId = item.menRing
          this.goodsId = item.id
          this.styleId = item.goodsId
          this.categoryId = item.categoryId
          this.goodInfo.salePrice = item.retailMallPrice
          if(this.goodInfo.coupon.discount){
            this.goodInfo.coupon.discount.price = item.coupon.discount.price
          }
          this.stock = item.stock
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.engagementRings-component {
  .details-component(100%);
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
