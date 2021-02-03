<template>
  <div class="accessories-component">
    <div v-if="this.goodInfo.totalStock > 0">
      <div class="swiper-box">
        <swiper1 :auto="true" :duration="5000">
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
        </swiper1>

        <div class="activity-sign" v-if="goodInfo.coupon.discount || goodInfo.coupon.money">
          <div class="triangle" v-if="goodInfo.coupon.discount">{{ language == 'en_US' ? discountUs(goodInfo.coupon.discount.discount)+'%' : discountConversion(goodInfo.coupon.discount.discount)}}{{ lang.discounts2 }}</div>
          <div class="triangle" v-if="goodInfo.coupon.money">{{ lang.discounts1 }}</div>
        </div>
      </div>

      <div class="border-bottom">
        <div class="title">
          <span class="discount-icon" v-if="goodInfo.coupon.discount">{{ language == 'en_US' ? discountUs(goodInfo.coupon.discount.discount)+'%' : discountConversion(goodInfo.coupon.discount.discount)}}{{ lang.discounts2 }}</span>
          <span class="discount-icon padding" v-if="goodInfo.coupon.money">￥</span>
          {{ goodInfo.goodsName }}
        </div>
        <div class="price" v-if="!goodInfo.coupon.discount">{{ formatCoin(goodInfo.coinType) }} {{ formatNumber(showPi) }}</div>
        
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
        <!--    <div v-if="goodInfo.goodsMod === 1" class="include-box">-->
        <!--      <span>{{ lang.include }}</span>-->
        <!--      <div>-->
        <!--        &lt;!&ndash;        <i class="iconfont iconstar-jt" />&ndash;&gt;-->
        <!--        <i-->
        <!--          :class="[-->
        <!--            'iconfont',-->
        <!--            { 'iconJewelry-necklace': parseInt(goodInfo.categoryId) === 4 },-->
        <!--            { 'iconJewelry-bracelet': parseInt(goodInfo.categoryId) === 8 }-->
        <!--          ]"-->
        <!--        />-->
        <!--      </div>-->
        <!--      &lt;!&ndash;      <span>+</span>&ndash;&gt;-->
        <!--      &lt;!&ndash;      <div>&ndash;&gt;-->
        <!--      &lt;!&ndash;        <i class="iconfont iconicon-zuanshi" />&ndash;&gt;-->
        <!--      &lt;!&ndash;      </div>&ndash;&gt;-->
        <!--    </div>-->

        <div class="discount-activity" v-if="goodInfo.coupon.discount || goodInfo.coupon.money">
          <div class="discount-l">
            <div class="discoupon-d" v-if="goodInfo.coupon.discount">
              <div class="discoupon-d-l">
                <span class="text">{{ lang.discountsActive }}：</span>
                <span class="discount-icon">{{ language == 'en_US' ? discountUs(goodInfo.coupon.discount.discount)+'%' : discountConversion(goodInfo.coupon.discount.discount)}}{{ lang.discounts2 }}</span>
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

        <div class="select-box" @click="showAttr = true">
          <div class="select-line" v-if="goodInfo.carats">
            <span>{{ lang.goodsCarat }}：</span>
            <span>{{ chooseCarats }}</span>
          </div>
          <!-- <div class="bd-b" v-if="goodInfo.carats"></div> -->
          <div class="select-line" v-if="goodInfo.materials.length > 0">
            <span>{{ lang.goodsMaterial }}：</span>
            <span>{{ chooseMaterials }}</span>
          </div>
          <!-- <div v-if="goodInfo.sizesConfig" class="bd-b"></div> -->
          <div v-if="goodInfo.sizesConfig" class="select-line margin-bottom-10">
            <span>{{ lang.goodsSize }}：</span>
            <span>{{ chooseSize }}</span>
          </div>
          <!-- 色彩 start -->
          <!-- <div class="bd-b" v-if="goodInfo.colors.length > 0"></div> -->
          <div class="select-line" v-if="goodInfo.colors.length > 0">
            <span>{{ lang.goodsColor }}：</span>
            <span>{{ chooseColors }}</span>
          </div>
          <!-- 色彩 end -->

          <i class="iconfont iconyou"></i>
        </div>

        <div
          v-if="goodInfo.goodsMod === 1"
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
        <div v-else>
          <div
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
          </div>
          <div
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
    
      <footer-bar></footer-bar>
      <swiper-tap
        ref="caratsSuitability"
        :title="lang.carat"
        :list="goodInfo.carats"
        @clear="getCarats"
      ></swiper-tap>

      <swiper-tap
        ref="suitability"
        :list="goodInfo.sizesConfig"
        @clear="getSortBy"
      ></swiper-tap>

      <swiper-tap
        ref="colorsSuitability"
        :title="lang.shade"
        :list="goodInfo.colors"
        @clear="getColors"
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

      <!-- 获取优惠券 -->
      <get-coupon v-if="ifShowCoupon" @closeCoupon="closeCo()" :moneyInfo="this.goodInfo.coupon.money"></get-coupon>
      <login-pop v-if="ifShowPop" @closePop="closePop"></login-pop>

      <!-- 商品属性 -->
      <goods-attr v-if="showAttr" :info="goodInfo" :attrIndex="attrIndex" @close="showAttr=false" @changeAttr="changeAttr"></goods-attr>
    </div>
    <div v-else>
      <soleOut></soleOut>
    </div>
  </div>
</template>

<script>
import Mx from '../accessories/accessories-mixin'
import soleOut from '@/components/goods-sole-out/index.vue'
export default {
   head() {
    return {
      lang: this.LANGUAGE.detailCommons,
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
      isLogin: !!this.$store.state.token,
      ifShowCoupon: false,
      language: this.$store.state.language,
      activeTime:'',
      ifShowMore: false,
      detailNum: 4,
      ifShowPop: false,
      showAttr: false,
      attrIndex: null
    }
  },
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
    console.log("uuuu",this.goodInfo)
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
    },
    changeAttr(select) {
      this.attrIndex = select
      this.chooseMaterialId = this.goodInfo.materials[select.materialsIndex].id;
      this.chooseMaterials = this.goodInfo.materials[select.materialsIndex].name;

      if(this.goodInfo.hasOwnProperty('sizes') && Array.isArray(this.goodInfo.sizes) && this.goodInfo.sizes.length){
        this.chooseSize = this.goodInfo.sizes[select.sizesIndex].content
        this.chooseSizeId = this.goodInfo.sizes[select.sizesIndex].sortBy
      }

      if(this.goodInfo.hasOwnProperty('carats') && Array.isArray(this.goodInfo.carats) && this.goodInfo.carats.length){
        this.chooseCarats = this.goodInfo.carats[select.caratsIndex].content
        this.chooseCaratsId = this.goodInfo.carats[select.caratsIndex].sortBy
      }

      if(this.goodInfo.hasOwnProperty('colors') && Array.isArray(this.goodInfo.colors) && this.goodInfo.colors.length){
        this.chooseColors = this.goodInfo.colors[select.colorsIndex].content
        this.chooseColorId = this.goodInfo.colors[select.colorsIndex].sortBy
      }

      this.colorAttrs[0].config_id = this.colorDetail
      this.colorAttrs[0].config_attr_id = this.chooseColorId

      this.goodInfo.details.map(item => {
        if (
          item.carat == (this.chooseCaratsId ? this.chooseCaratsId : item.carat) &&
          item.material == (this.chooseMaterialId ? this.chooseMaterialId : item.material) &&
          item.size == (this.chooseSizeId ? this.chooseSizeId : item.size)
        ) {
          this.showPi = item.retailMallPrice
          this.sendGoodsId = item.goodsId
          this.sendDetailsId = item.id
          this.categoryId = item.categoryId

          if(this.couponType(item.coupon) == 'discount'){
            this.showP2 = item.coupon.discount.price
          }else{
            this.showP2 = item.retailMallPrice
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.accessories-component {
  .details-component(100%);
  .btn-white{
    border:none!important;
  }
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
