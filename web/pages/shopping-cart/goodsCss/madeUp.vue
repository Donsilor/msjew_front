<template>
  <div class="madeUp">
    <div class="good-info">
      <nuxt-link :to="getJumpLink(g)" class="mid-box">
        <div class="good-info-line">
          <div class="good-img" @click="goDetail()" style="border: 2px solie saddlebrowns;">
            <img
              :src="imageStrToArray(g.data[0].simpleGoodsEntity.goodsImages)[0]"
            />
            <div
              v-if="
                g.data[0].simpleGoodsEntity.goodsStatus !== 2
              "
              class="img-bord"
            >
              <span>{{ $t(`cart.Invalid`) }}</span>
            </div>

            <!-- 折扣 -->
            <div class="list-discount-icon1" v-if="couponType(g.data[0].coupon) == 'discount'">
              <span>{{ language == 'en_US' ? discountUs(g.data[0].coupon.discount.discount)+'%' : discountConversion(g.data[0].coupon.discount.discount)}} {{ $t(`${lang}.discounts2`) }}</span>
            </div>

            <!-- 优惠券 -->
            <div class="list-discount-icon1" v-if="couponType(g.data[0].coupon) == 'money'">
              <span>{{ $t(`${lang}.discounts1`) }}</span>
            </div>
          </div>
          <div class="good-desc" @click="goDetail()">
            <div>
              {{ g.data[0].simpleGoodsEntity.goodsName }}
            </div>
            <div>
              SKU：{{
                g.data[0].simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode
              }}
            </div>
          </div>
          <div class="good-information">
            <div
              v-for="(s, k) in g.data[0].simpleGoodsEntity.detailConfig"
              :key="k"
              class="infos"
            >
              <div>{{ s.configVal }}</div>
              <div>{{ s.configAttrIVal }}</div>
            </div>
          </div>
          <div class="good-num">{{ g.data[0].goodsCount }}</div>

          <!-- 原金额 -->
          <div class="good-price" :class="{'old-price': couponType(g.data[0].coupon) == 'discount'}">
            {{ formatCoin(g.coinType) }}
            {{
              formatNumber(
                g.data[0].simpleGoodsEntity.simpleGoodsDetails.retailMallPrice
              )
            }}
          </div>

		      <!-- 优惠后金额 -->
          <div class="now-price">
            <span v-if="couponType(g.data[0].coupon) == 'discount'">
              {{ formatCoin(g.coinType) }}
              {{
                formatNumber(
                  g.data[0].coupon.discount.price
                )
              }}
            </span>
            <span  v-if="couponType(g.data[0].coupon) !== 'discount'">
              {{ formatCoin(g.coinType) }}
              {{
                formatNumber(
                  g.data[0].simpleGoodsEntity.simpleGoodsDetails.retailMallPrice
                )
              }}
            </span>
          </div>
        </div>
        <div class="good-info-dotted" />
        <div class="good-info-line">
          <div class="good-img" @click="goDetail()">
            <img
              :src="imageStrToArray(g.data[1].simpleGoodsEntity.goodsImages)[0]"
              alt=""
            />
            <div
              v-if="g.data[1].simpleGoodsEntity.goodsStatus !== 2
              "
              class="img-bord"
            >
              <span>{{ $t(`cart.Invalid`) }}</span>
            </div>

            <!-- 折扣 -->
            <div class="list-discount-icon1" v-if="couponType(g.data[1].coupon) == 'discount'">
              <span>{{ language == 'en_US' ? discountUs(g.data[1].coupon.discount.discount)+'%' : discountConversion(g.data[1].coupon.discount.discount)}} {{ $t(`${lang}.discounts2`) }}</span>
            </div>

            <!-- 优惠券 -->
            <div class="list-discount-icon1" v-if="couponType(g.data[1].coupon) == 'money'">
              <span>{{ $t(`${lang}.discounts1`) }}</span>
            </div>
          </div>
          <div class="good-desc" @click="goDetail()">
            <div>
              {{ g.data[1].simpleGoodsEntity.goodsName }}
            </div>
            <div>
              SKU：{{
                g.data[1].simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode
              }}
            </div>
          </div>
          <div class="good-information">
            <div
              v-for="(i, k) in g.data[1].simpleGoodsEntity.detailConfig"
              :key="k"
              class="infos"
            >
              <div>{{ i.configVal }}</div>
              <div>{{ i.configAttrIVal }}</div>
            </div>
            <!-- <span
              v-for="(i, k) in g.data[1].simpleGoodsEntity.baseConfig"
              :key="k"
            >
              <span
                v-if="k !== g.data[1].simpleGoodsEntity.baseConfig.length - 1"
                >{{ i.configAttrIVal }},</span
              >
              <span
                v-if="k === g.data[1].simpleGoodsEntity.baseConfig.length - 1"
                >{{ i.configAttrIVal }}</span
              >
            </span> -->
          </div>
          <div class="good-num">{{ g.data[1].goodsCount }}</div>

          <!-- 原金额 -->
          <div class="good-price" :class="{'old-price': couponType(g.data[1].coupon) == 'discount'}">
            {{formatCoin(g.coinType) }}
            {{
              formatNumber(
                g.data[1].simpleGoodsEntity.simpleGoodsDetails.retailMallPrice
              )
            }}
          </div>

          <!-- 优惠后金额 -->
         <div class="now-price">
            <span v-if="couponType(g.data[1].coupon) == 'discount'">
              {{ formatCoin(g.coinType) }}
              {{
                formatNumber(
                  g.data[1].coupon.discount.price
                )
              }}
            </span>
            <span  v-if="couponType(g.data[1].coupon) !== 'discount'">
              {{formatCoin(g.coinType) }}
              {{
                formatNumber(
                  g.data[1].simpleGoodsEntity.simpleGoodsDetails.retailMallPrice
                )
              }}
            </span>
          </div>
        </div>
      </nuxt-link>

      <div class="btn-box">
        <div
          v-if="
            g.data[0].simpleGoodsEntity.goodsStatus === 2 &&
              g.data[1].simpleGoodsEntity.goodsStatus === 2
          "
          class="good-btn"
        >
          <i class="iconfont iconlajitong" @click="deleteGood()" />
        </div>
        <div v-else class="lose-btn">
          <div @click="searchSimilar()">
            {{ $t(`cart.searchSimilar`) }}
          </div>
        </div>
      </div>
      <div class="good-dingzhi-logo">
        <i class="iconfont iconstar-jt" />
        <span>{{ word }}</span>
      </div>
    </div>
  </div>
</template>

<script>
const lang = 'cart'
export default {
  data() {
    return{
      lang,
      language: this.$store.state.language
    }
  },
  name: 'MadeUp',
  props: {
    g: {
      type: Object,
      default() {
        return {}
      }
    },
    word: {
      type: String,
      default() {
        return ``
      }
    },
    options: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  mounted() {
    // this.language = this.getCookie('language')
    // console.log(this.g)
  },
  methods: {
    goDetail() {
      // console.log(this.g)
      // this.getJumpLink(this.g)
    },
    deleteGood() {
      const data = [this.g.id]
      this.$store
        .dispatch(`removeCart`, data)
        .then(data => {
          this.$emit(`bottomData`)
          this.$successMessage(this.$t(`cart.deleteSuccess`))
          this.$emit(`reloadList`)
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
.madeUp {
  width: calc(100% - 49px);
  .good-info {
    position: relative;
    display: flex;
    height: 281px;
    border-bottom: 1px solid rgba(239, 239, 239, 1);
    .good-info-dotted {
      position: absolute;
      left: 142px;
      top: 140px;
      width: 956px;
      height: 1px;
      padding-left: 20px;
      border-bottom: 1px dotted rgba(221, 221, 221, 1);
    }
    .good-info-line {
      height: 140px;
      display: flex;
      align-items: center;
      .good-img {
        position: relative;
        width: 100px;
        height: 100px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(221, 221, 221, 1);
        border-radius: 2px;
        display: flex;
        align-items: center;
        margin-right: 40px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .good-desc {
        width: calc((100% - 140px) * 0.37);
        line-height: 18px;
        padding-right: 20px;
        box-sizing: border-box;
        div:nth-child(1) {
          max-height: 18 * 3px;
          margin-bottom: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          word-break: break-all;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        div:nth-child(2) {
          color: #999;
        }
      }
      .good-information {
        width: calc((100% - 140px) * 0.35);
        padding-right: 20px;
        box-sizing: border-box;
        .infos {
          width: 100%;
          display: flex;
          margin-bottom: 10px;
          div:nth-child(1) {
            width: 50%;
            color: #666;
          }
          div:nth-child(2) {
            width: 50%;
            color: #111;
          }
        }
      }
      .good-description {
        width: calc((100% - 140px) * 0.35);
        padding-right: 20px;
        box-sizing: border-box;
        line-height: 20px;
        max-height: 60px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-break: break-all;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .good-num {
        width: calc((100% - 140px) * 0.12);
        text-align: center;
        font-size: 18px;
        color: #333;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .good-price {
        width: calc((100% - 140px) * 0.16);
        font-family: twCenMt;
        font-size: 18px;
        color: #99999991;
        text-align: center;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .now-price {
        width: calc((100% - 140px) * 0.16);
        font-family: twCenMt;
        font-size: 18px;
        color: #f29b87;
        text-align: center;
        padding: 0 10px;
        box-sizing: border-box;
      }
    }
    .good-btn {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      i {
        display: block;
        height: 21px;
        line-height: 21px;
        color: #999999;
        font-size: 20px;
        cursor: pointer;
        margin: 0 auto;
      }
    }
  }
  .good-dingzhi-logo {
    position: absolute;
    width: 200px;
    height: 24px;
    left: 24px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    span {
      color: #999;
      font-size: 14px;
      line-height: 14px;
    }
    i {
      display: block;
      color: #aaa;
    }
  }

  .cart-radio {
    position: relative;
    .free-check {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 16px;
      height: 16px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(187, 187, 187, 1);
      border-radius: 4px;
      cursor: pointer;
    }
    .icongou {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      display: block;
      width: 16px;
      height: 16px;
      background: rgba(170, 138, 123, 1);
      border-radius: 2px;
      color: #fff;
      font-size: 16px;
      line-height: 16px;
      cursor: pointer;
    }
  }
  .img-bord {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #fff;
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    background-color: rgba(102, 102, 102, 0.4);
  }
  .lose-btn {
    width: 100px;
    height: 21px;
    line-height: 21px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;

    div:nth-child(1) {
      /*width: 43px;*/
      height: 15px;
      line-height: 15px;
      font-size: 14px;
      color: #aa8a7b;
      cursor: pointer;
    }
    div:nth-child(2) {
      width: 1px;
      height: 21px;
      background-color: rgba(166, 166, 166, 1);
    }
    i {
      display: block;
      width: 18px;
      height: 21px;
      line-height: 21px;
      color: #999999;
      font-size: 20px;
      cursor: pointer;
    }
  }
}

.mid-box{
  width: calc(100% * 0.892);
}

.btn-box{
  width: calc(100% * 0.108);
  display: flex;
  align-items: center;
}
</style>
