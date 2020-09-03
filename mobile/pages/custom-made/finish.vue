<template>
  <div class="finish-component">
    <div class="title">
      {{ lang.checkMade }}
    </div>
    <div class="middle-two">
      <div class="ring one-block">
        <div class="img-block">
          <img :src="$IMG_URL + info1.goodsImages" />

          <div class="activity-sign" v-if="couponType(info1.coupon) == 'money' || couponType(info1.coupon) == 'discount'">
            <div class="triangle" v-if="couponType(info1.coupon) == 'discount'">{{ language == 'en_US' ? discountUs(this.info1.coupon.discount.discount)+'%' : discountConversion(this.info1.coupon.discount.discount)}}{{ lang.discounts2 }}</div>
            <div class="triangle" v-if="couponType(info1.coupon) == 'money'">{{ lang.discounts1 }}</div>
          </div>
        </div>
        <div class="content-block">
          <div class="content-title ow-h2 wordwrap">
            <span class="discount-icon" v-if="couponType(info1.coupon) == 'discount'">{{ language == 'en_US' ? discountUs(this.info1.coupon.discount.discount)+'%' : discountConversion(this.info1.coupon.discount.discount)}}{{ lang.discounts2 }}</span>
            <span class="discount-icon padding" v-if="couponType(info1.coupon) == 'money'">￥</span>

            {{ info1.goodsName }}
          </div>
          <div class="content-desc">SKU：{{ info1.goodsCode }}</div>
          <div v-for="d in info1.materials" :key="d.id">
            <div v-if="parseInt(d.id) === materialId" class="content-desc">
              {{ lang.fineness }}：{{ d.name }}
            </div>
          </div>
          <div v-for="d in info1.sizes" :key="d.id">
            <div v-if="parseInt(d.id) === sizeId" class="content-desc">
              {{ lang.size }}：{{ d.name }}
            </div>
          </div>
          <div v-for="(c, index) in info1.details" :key="index">
            <div v-if="parseInt(c.id) === parseInt(infoCheck)">
              <div
                v-for="m in info1.materials"
                v-show="parseInt(m.configAttrId) === parseInt(c.material)"
                :key="m.configAttrId"
                class="content-desc"
              >
                {{ lang.fineness }}：{{ m.configAttrVal }}
              </div>
              <div
                v-for="s in info1.sizes"
                v-show="parseInt(s.configAttrId) === parseInt(c.size)"
                :key="s.configAttrId"
                class="content-desc"
              >
                {{ lang.size }}：{{ s.configAttrVal }}
              </div>
              <div class="content-price">
                <div class="price" v-if="couponType(info1.coupon) !== 'discount'">{{ formatCoin(info1.coinType) }} {{ formatNumber(c.retailMallPrice) }}</div>

                <div class="discount-price" v-else>
                  <div class="old-price">{{ formatCoin(info1.coinType) }} {{ formatNumber(info1.salePrice) }}</div>
                  <div class="new-price">{{ formatCoin(info1.coinType) }} {{ formatNumber(price1) }}</div>
                </div>

                <!-- {{ c.coinType }} {{ formatNumber(c.retailMallPrice) }} -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="diamond one-block">
        <div class="img-block">
          <img :src="$IMG_URL + info2.goodsImages" />

          <div class="activity-sign" v-if="couponType(info2.coupon) == 'money' || couponType(info2.coupon) == 'discount'">
            <div class="triangle" v-if="couponType(info2.coupon) == 'discount'">{{ language == 'en_US' ? discountUs(this.info2.coupon.discount.discount)+'%' : discountConversion(this.info2.coupon.discount.discount)}}{{ lang.discounts2 }}</div>
            <div class="triangle" v-if="couponType(info2.coupon) == 'money'">{{ lang.discounts1 }}</div>
          </div>
        </div>
        <div class="content-block">
          <div class="content-title ow-h2 wordwrap">
            <span class="discount-icon" v-if="couponType(info2.coupon) == 'discount'">{{ language == 'en_US' ? discountUs(this.info2.coupon.discount.discount)+'%' : discountConversion(this.info2.coupon.discount.discount)}}{{ lang.discounts2 }}</span>
            <span class="discount-icon padding" v-if="couponType(info2.coupon) == 'money'">￥</span>

            {{ info2.goodsName }}
          </div>
          <div class="content-desc">SKU：{{ info2.goodsCode }}</div>
          <div v-for="d in info2.specs" :key="d.configId">
            <div v-if="parseInt(d.configId) === 5" class="content-desc">
              {{ lang.carat }}：{{ d.configAttrVal }}
            </div>
            <div v-if="parseInt(d.configId) === 7" class="content-desc">
              {{ lang.color }}：{{ d.configAttrVal }}
            </div>
            <div v-if="parseInt(d.configId) === 4" class="content-desc">
              {{ lang.cut }}：{{ d.configAttrVal }}
            </div>
            <div v-if="parseInt(d.configId) === 2" class="content-desc">
              {{ lang.clarity }}：{{ d.configAttrVal }}
            </div>
          </div>
          <div class="content-price">
            <div class="price" v-if="couponType(info2.coupon) !== 'discount'">{{ formatCoin(info2.coinType) }} {{ formatNumber(info2.salePrice) }}</div>

            <div class="discount-price" v-else>
              <div class="old-price">{{ formatCoin(info2.coinType) }} {{ formatNumber(info2.salePrice) }}</div>
              <div class="new-price">{{ formatCoin(info2.coinType) }} {{ formatNumber(price2) }}</div>
            </div>

            <!-- {{ info2.details[0].coinType }} -->
            <!-- {{ formatNumber(info2.details[0].retailMallPrice) }} -->
          </div>
        </div>
      </div>
    </div>
    <div class="add-cart-btn" @click="orderNow">
      <span>{{ lang.buyNow}} </span>
      <div v-for="(c, index) in info1.details" :key="index">
        <span v-if="parseInt(c.id) === parseInt(infoCheck)" class="price-add">
          {{ formatCoin(info1.coinType) }}
          {{ formatNumber(price1 + price2) }}
        </span>
      </div>
    </div>
    <div class="add-cart-btn add-cart" @click="addCart">
      <span>{{ lang.addCart }} </span>
      <div v-for="(c, index) in info1.details" :key="index">
        <span v-if="parseInt(c.id) === parseInt(infoCheck)" class="price-add">
          {{ formatCoin(info1.coinType) }}
          {{ formatNumber(price1 + price2) }}
        </span>
      </div>
    </div>
    
    <div class="swiper-title">{{ lang.swiperTitle }}</div>
    <div class="bot-swiper">
      <swiper :auto="true" :duration="5000">
        <div v-for="i in swiperImg" :key="i">
          <img :src="$IMG_URL + i" />
        </div>
      </swiper>
    </div>
    <footer-bar></footer-bar>
    <login-pop v-if="ifShowPop" @closePop="closePop"></login-pop>
  </div>
</template>

<script>
export default {
  props: {
    bdArr: {
      type: Array,
      required: false,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      lang: this.LANGUAGE['custom-made'],
      lock: false,
      info1: {},
      info2: {
        // details: [
        //   {
        //     coinType: `HKD`,
        //     retailMallPrice: 0
        //   }
        // ]
      },
      infoCheck: 0,
      swiperImg: [],
      language: this.$store.state.language,
      materialId:'',
      sizeId:''
      ifShowPop: false,
      isLogin: !!this.$store.state.token
    }
  },
  watch: {
    bdArr: function() {
      this.getThatS()
      this.lock = false
    }
  },
  computed:{
    price1() {
      var price1=0;
      for(var i=0; i<this.info1.details.length; i++){
        if(parseInt(this.info1.details[i].id) === parseInt(this.infoCheck)){
          if(this.info1.details[i].coupon.hasOwnProperty('discount') ){
            price1 = this.info1.details[i].coupon.discount.price
          }else{
            price1 = this.info1.details[i].coupon.price
          }
        }
      }
      return price1
    },
    price2() {
      var price2=0;
      if(this.info2.coupon.hasOwnProperty('discount') ){
        price2 = this.info2.coupon.discount.price
      }else{
        price2 = this.info2.coupon.price
      }

      return price2
    }
  },
  mounted() { 
    // this.language = this.getCookie('language')
  },
  methods: {
    getThatS() {
      // if (this.lock || this.bdArr.length < 2) return
      const melo = JSON.parse(
        this.$helpers.base64Decode(this.$route.query.melo)
      )
      // console.log(`Carmelo Anthony=======>`, melo)
      if (parseInt(melo.steps[0].ct) === 1) {
        this.makeDiamond(melo.steps[0].goodsId)
        this.makeOther(melo.steps[1].goodsId)
        this.infoCheck = melo.steps[1].goodsDetailsId
      } else {
        this.makeDiamond(melo.steps[1].goodsId)
        this.makeOther(melo.steps[0].goodsId)
        this.infoCheck = melo.steps[0].goodsDetailsId
      }
    },
    makeDiamond(i) {
      this.$axios({
        method: `post`,
        url: `/wap/goods/diamond/detail`,
        params: {
          goodsId: i
        }
      })
        .then(res => {
          // console.log(`finish's Diamond=======>`, res)
          res.goodsImages = res.goodsImages.split(`,`)[0] || ``
          this.info2 = res
          // 获取戒托所选的参数Id
          const melo = JSON.parse(
            this.$helpers.base64Decode(this.$route.query.melo)
          )
          let detailId = ''
          melo.steps.forEach((a, i) =>{
            detailId = a.goodsDetailsId
            this.info2.details.forEach((o, i) =>{
              if(detailId == o.id){
                if(o.material && o.size !== null){
                  this.materialId = o.material
                  this.sizeId = o.size
                }
              }
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    makeOther(i) {
      this.$axios({
        method: `post`,
        url: `/wap/goods/style/detail`,
        params: {
          goodsId: i
        }
      })
        .then(res => {
          // console.log(`finish's Other=======>`, res)
          this.swiperImg = res.goodsImages.split(`,`)
          res.goodsImages = res.goodsImages.split(`,`)[0] || ``
          this.info1 = res
          // 获取戒托所选的参数Id
          const melo = JSON.parse(
            this.$helpers.base64Decode(this.$route.query.melo)
          )
          let detailId = ''
          melo.steps.forEach((a, i) =>{
            detailId = a.goodsDetailsId
            this.info1.details.forEach((o, i) =>{
              if(detailId == o.id){
                if(o.material && o.size !== null){
                  this.materialId = o.material
                  this.sizeId = o.size
                }
              }
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    addCart() {
      this.$emit(`addCart`)
    },
    orderNow() {
      if(!this.isLogin && this.$store.state.platform == 21){
        this.ifShowPop = true
        return
      }

      this.$emit(`orderNow`)
    },
    closePop() {
      this.ifShowPop = false
    }
  }
}
</script>

<style scoped lang="less">
.finish-component {
  width: 100vw;
  .title {
    margin: 24px 0 44px;
    font-size: 18px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .middle-two {
    padding: 0 15px;
    .one-block {
      display: flex;
      margin-bottom: 35px;
      .img-block {
        width: 125px;
        height: 125px;
        margin-right: 20px;
        position: relative;
        img {
          display: block;
          width: 125px;
          height: 125px;
        }
      }
      .content-block {
        width: 200px;
        text-align: left;
        .content-title {
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          height: 20 * 2px;
          margin-bottom: 15px;
        }
        .content-desc {
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          margin-bottom: 10px;
          line-height: 14px;
        }
        .content-price {
          margin-top: 10px;
          font-family: twCenMt;
          color: @mcPink;
          font-size: 18px;
          line-height: 18px;
        }
        .new-price{
          color:#f29b87;
        }
      }
    }
  }
  .add-cart-btn {
    width: 345px;
    height: 40px;
    line-height: 40px;
    background: rgba(242, 155, 135, 1);
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    margin: 0 auto 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    .price-add {
      font-family: twCenMt;
      padding-left: 5px;
    }
  }
  .add-cart{
    background: #fff;
    color: rgba(242, 155, 135, 1);
    border:1px solid rgba(242, 155, 135, 1);
  }
  .swiper-title {
    text-align: center;
    margin: 10px auto 20px auto;
  }
  .bot-swiper {
    width: 344px;
    height: 344px;
    margin: 0 auto 32px auto;

    img {
      display: block;
      width: 330px;
      height: 330px;
    }
  }
}

.activity-sign{
  width: 50px;
  height: 50px;
  right: -4px;
  bottom: -6px;
}
.activity-sign .triangle{
  width: 50px;
  height: 50px;
  padding-top: 30px;
  font-size: 12px;
}
.discount-price{
  padding: 0;
}
</style>
