<template>
  <div class="finish-component">
    <div class="title">
      {{ lang.checkMade }}
    </div>
    <div class="middle-two">
      <div class="ring one-block">
        <div class="img-block">
          <img :src="$IMG_URL + info1.goodsImages" />
        </div>
        <div class="content-block">
          <div class="content-title ow-h2 wordwrap">
            {{ info1.goodsName }}
          </div>
          <div class="content-desc">SKU：{{ info1.goodsCode }}</div>
          <div v-for="(c, index) in info1.simpleGoodsDetailsList" :key="index">
            <div v-if="parseInt(c.id) === parseInt(infoCheck)">
              <div
                v-for="m in info1.materialsConfig"
                v-show="parseInt(m.configAttrId) === parseInt(c.material)"
                :key="m.configAttrId"
                class="content-desc"
              >
                {{ lang.fineness }}：{{ m.configAttrIVal }}
              </div>
              <div
                v-for="s in info1.sizesConfig"
                v-show="parseInt(s.configAttrId) === parseInt(c.size)"
                :key="s.configAttrId"
                class="content-desc"
              >
                {{ lang.size }}：{{ s.configAttrIVal }}
              </div>
              <div class="content-price">
                {{ c.coinType }} {{ formatNumber(c.retailMallPrice) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="diamond one-block">
        <div class="img-block">
          <img :src="$IMG_URL + info2.goodsImages" />
        </div>
        <div class="content-block">
          <div class="content-title ow-h2 wordwrap">
            {{ info2.goodsName }}
          </div>
          <div class="content-desc">SKU：{{ info2.goodsCode }}</div>
          <div v-for="d in info2.baseConfig" :key="d.configId">
            <div v-if="parseInt(d.configId) === 31" class="content-desc">
              {{ lang.carat }}：{{ d.configAttrIVal }}
            </div>
            <div v-if="parseInt(d.configId) === 34" class="content-desc">
              {{ lang.color }}：{{ d.configAttrIVal }}
            </div>
            <div v-if="parseInt(d.configId) === 33" class="content-desc">
              {{ lang.cut }}：{{ d.configAttrIVal }}
            </div>
            <div v-if="parseInt(d.configId) === 35" class="content-desc">
              {{ lang.clarity }}：{{ d.configAttrIVal }}
            </div>
          </div>
          <div class="content-price">
            {{ info2.simpleGoodsDetailsList[0].coinType }}
            {{ formatNumber(info2.simpleGoodsDetailsList[0].retailMallPrice) }}
          </div>
        </div>
      </div>
    </div>
    <div class="add-cart-btn" @click="addCart">
      <span>{{ lang.addCart }} </span>
      <div v-for="(c, index) in info1.simpleGoodsDetailsList" :key="index">
        <span v-if="parseInt(c.id) === parseInt(infoCheck)" class="price-add">
          {{ c.coinType }}
          {{
            formatNumber(
              c.retailMallPrice +
                info2.simpleGoodsDetailsList[0].retailMallPrice
            )
          }}
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
        simpleGoodsDetailsList: [
          {
            coinType: `HKD`,
            retailMallPrice: 0
          }
        ]
      },
      infoCheck: 0,
      swiperImg: []
    }
  },
  watch: {
    bdArr: function() {
      this.getThatS()
      this.lock = false
    }
  },
  methods: {
    getThatS() {
      if (this.lock || this.bdArr.length < 2) return
      const melo = JSON.parse(
        this.$helpers.base64Decode(this.$route.query.melo)
      )
      console.log(`Carmelo Anthony=======>`, melo)
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
        url: `/wap/goods/goodsDetail`,
        params: {
          goodsId: i
        }
      })
        .then(res => {
          console.log(`finish's Diamond=======>`, res)
          res.goodsImages = res.goodsImages.split(`,`)[0] || ``
          this.info2 = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    makeOther(i) {
      this.$axios({
        method: `post`,
        url: `/wap/goods/goodsDetail`,
        params: {
          goodsId: i
        }
      })
        .then(res => {
          console.log(`finish's Other=======>`, res)
          this.swiperImg = res.goodsImages.split(`,`)
          res.goodsImages = res.goodsImages.split(`,`)[0] || ``
          this.info1 = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    addCart() {
      // console.log(this.canAddCart)
      // if (!this.canAddCart) {
      //   return
      // }
      this.$emit(`addCart`)
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
        margin-right: 20px;
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
  .swiper-title {
    text-align: center;
    margin: 10px auto 20px auto;
  }
  .bot-swiper {
    width: 345px;
    height: 345px;
    margin: 0 auto 32px auto;

    img {
      display: block;
      width: 330px;
      height: 330px;
    }
  }
}
</style>
