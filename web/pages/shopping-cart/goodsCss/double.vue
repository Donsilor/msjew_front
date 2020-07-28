<template>
  <div class="double">
    <div class="good-info">
      <nuxt-link :to="getJumpLink(g)">
        <div class="good-img" @click="goDetail()">
          <img :src="imageStrToArray(g.image)[0]" alt="" />
          <!-- <div
            v-if="
              g.data[0].ringsSimpleGoodsEntity.simpleGoodsEntity.goodsStatus !==
                2 ||
                g.data[1].ringsSimpleGoodsEntity.simpleGoodsEntity
                  .goodsStatus !== 2
            "
            class="img-bord"
          >
            <span>{{ $t(`cart.Invalid`) }}</span>
          </div> -->
          <div
            v-if="
              parseInt(g.data[0].simpleGoodsEntity.goodsStatus) === 0
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
      </nuxt-link>
      <nuxt-link :to="getJumpLink(g)" class="good-desc-wrap">
        <div class="good-desc" @click="goDetail()">
          <div>
            {{ g.goodsName }}
          </div>
          <div>
            SKU：{{
              g.data[0].simpleGoodsEntity.goodsCode
            }}
          </div>
          <!-- <div>
            SKU：{{
              g.data[0].ring[1].goods_sn
            }}
          </div> -->
        </div>
      </nuxt-link>
      <div class="couple-rings">
        <div class="gender" v-for="(a, b) in g.data[0].ring[0].lang.goods_attr[26].value" :key="'gender='+b">
          <div>
            {{ a }}
          </div>
        </div>
        <div class="one-person">
          <div class="good-information">
            <!-- <div
              v-for="(i, k) in g.data[0].ring[0].lang.goods_attr"
              :key="'info1=' + k"
            >
              <div v-if="i.configId === 26" class="infos">
                <div>{{ i.configVal }}</div>
                <div>{{ i.configAttrIVal }}</div>
              </div>
            </div> -->
            <div
              v-for="(s, v) in g.data[0].ring[0].lang.goods_spec"
              :key="'info2=' + v"
              class="infos"
            >
              <div>{{ s.attr_name }}</div>
              <div>{{ s.attr_value }}</div>
            </div>
          </div>
          <div class="good-num">{{ g.data[0].goodsCount }}</div>
          <!-- <div class="good-price">
            {{ g.coinType }}
            {{
              formatNumber(
                g.data[0].ringsSimpleGoodsEntity.simpleGoodsEntity
                  .simpleGoodsDetails.retailMallPrice
              )
            }}
          </div> -->
        </div>
        <div class="gender2" v-for="(y, z) in g.data[0].ring[1].lang.goods_attr[26].value" :key="'gender2='+z">
          <div>
            {{ y }}
          </div>
        </div>
        <div class="one-person">
          <div class="good-information">
            <!-- <div
              v-for="(i, j) in g.data[0].ring[1].lang.goods_attr"
              :key="'info3=' + j"
            >
              <div v-if="i.configId === 26" class="infos">
                <div>{{ i.configVal }}</div>
                <div>{{ i.configAttrIVal }}</div>
              </div>
            </div> -->
            <div
              v-for="(i, d) in g.data[0].ring[1].lang.goods_spec"
              :key="'info4=' + d"
              class="infos"
            >
              <div>{{ i.attr_name }}</div>
              <div>{{ i.attr_value }}</div>
            </div>
          </div>
          <div class="good-num">{{ g.data[0].goodsCount }}</div>
          <!-- <div class="good-price">
            {{ g.coinType }}
            {{
              formatNumber(
                g.data[1].ringsSimpleGoodsEntity.simpleGoodsEntity
                  .simpleGoodsDetails.retailMallPrice
              )
            }}
          </div> -->
        </div>
        <div class="couple-line" />

      </div>

		<!-- 原金额 -->
		<div class="good-price" :class="{'old-price': couponType(g.data[0].coupon) == 'discount' }">
		  {{ formatCoin(g.coinType) }}
		  {{
			formatNumber(
			  g.price
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
              g.price
            )
          }}
        </span>
      </div>


      <!-- <div
        v-show="options"
        v-if="
          g.data[0].ringsSimpleGoodsEntity.simpleGoodsEntity.goodsStatus ===
            2 &&
            g.data[1].ringsSimpleGoodsEntity.simpleGoodsEntity.goodsStatus === 2
        "
        class="good-btn"
      > -->

      <div class="btn-box">
        <div
          v-if="
            g.data[0].simpleGoodsEntity.goodsStatus == 2
          "
          class="good-btn">
          <!-- <div class="wish-img">
            <i class="iconfont" @click="addWish(g)">&#xe645;</i> -->
          <!-- </div> -->
          <i class="iconfont iconlajitong" @click="deleteGood()" />
        </div>
        <div v-else class="lose-btn">
          <div @click="searchSimilar(g.data[0])">
            {{ $t(`cart.searchSimilar`) }}
          </div>
          <div />
          <i class="iconfont iconlajitong" @click="deleteGood()" />
        </div>
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
  name: 'Double',
  props: {
    g: {
      type: Object,
      default() {
        return {}
      }
    },
    options: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  mounted(){
    // console.log("double",this.g)
    // console.log("g",this.g.data[0])
  },
  methods: {
    goDetail() {},
    addWish() {
      const data = {
        goodsId: null,
        groupId: this.g.data[0].groupId,
        groupType: this.g.groupType,
        type: 1
      }
      this.$store
        .dispatch('addWish', data)
        .then(data => {
          this.$successMessage(this.$t(`cart.addWishSuccess`))
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
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
    },
    searchSimilar(info) {
      // console.log(33333,info)
      let routerName = ''
      switch (info.goodsType) {
        case 15:
          // 钻石
          routerName = '/diamonds/round-cut'
          break
        case 2:
          if(info.groupType == 1){
            //对戒
             routerName = '/wedding-rings/classic-series'
          }else{
            // 戒指
             routerName = '/wedding-rings/all'
          }


          break
        case 3:
          // 珠宝饰品
          routerName = '/jewellery/all'
          break
        case 4:
          // 项链
          routerName = '/jewellery/necklaces'
          break
        case 5:
          // 吊坠
          routerName = '/jewellery/pendants'
          break
        case 6:
          // 耳钉
          routerName = '/jewellery/ear-stud'
          break
        case 7:
          // 耳环
          routerName = '/jewellery/earrings'
          break
        case 8:
          // 手链
          routerName = '/jewellery/bracelets'
          break
        case 9:
          // 手镯
          routerName = '/jewellery/bangles'
          break
        case 12:
          routerName = '/engagement-rings/all'
          break

      }

      const routerJump = this.$router.resolve({
        path: routerName,
        query: {

        }
      })
      window.open(routerJump.href, '_blank')
      //  用分类id和商品id去搜索
    }
  }
}
</script>

<style scoped lang="less">
.double {
  border-bottom: 1px solid rgba(239, 239, 239, 1);
  width: calc(100% - 49px);
  .good-info {
    position: relative;
    height: 174 * 2+2px;
    border-bottom: 1px solid rgba(239, 239, 239, 1);
    display: flex;
    align-items: center;
    .good-img {
      position: relative;
      width: 120px;
      height: 120px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(221, 221, 221, 1);
      border-radius: 2px;
      display: flex;
      align-items: center;
      margin-right: 20px;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .good-desc {
      line-height: 18px;
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
      div:nth-child(3) {
        color: #999;
      }
    }
    .couple-rings {
      position: relative;
      width: calc((100% - 140px) * 0.53);
      .gender{
        position: absolute;
        top: 38px;
        left: 0;
        color: #666;
        width: 17%;
      }
      .gender2{
        position: absolute;
        top: 125px;
        left: 0;
        color: #666;
        width: 17%;
      }
      .one-person {
        margin-left: 17%;
        // height: 174px;
        width: 83%;
        height: 100px;
        display: flex;
        align-items: center;
        position: relative;
        .good-information {  
          width: 78%;    
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
        .good-num {
          width: 22%;
          text-align: center;
          font-size: 18px;
          color: #333;
          padding: 0 10px;
          box-sizing: border-box;
        }
        .good-price {
          font-family: twCenMt;
          width: calc((100% - 140px) * 0.14);
          font-size: 18px;
          color: #99999991;
          text-align: center;
          padding: 0 10px;
          box-sizing: border-box;
        }
        .now-price {
          font-family: twCenMt;
          width: calc((100% - 140px) * 0.14);
          font-size: 18px;
          color: #f29b87;
          text-align: center;
          padding: 0 10px;
          box-sizing: border-box;
        }
      }

      .couple-line {
        position: absolute;
        // top: 173px;
        top:94px;
        left: -56px;
        width: 400px;
        height: 1px;
        border-bottom: 1px dotted rgba(221, 221, 221, 1);
      }
    }
    .good-price {
      font-family: twCenMt;
      width: calc((100% - 140px) * 0.14);
      font-size: 18px;
      color: #99999991;
      text-align: center;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .now-price {
      font-family: twCenMt;
      width: calc((100% - 140px) * 0.14);
      font-size: 18px;
      color: #f29b87;
      text-align: center;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .good-btn {
      height: 21px;
      line-height: 21px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      i {
        display: block;
        width: 18px;
        height: 21px;
        line-height: 21px;
        color: #999999;
        font-size: 20px;
        cursor: pointer;
        margin: 0 auto;
      }
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

.good-desc-wrap{
  width: calc((100% - 140px) * 0.19);
  padding-right: 20px;
  box-sizing: border-box;
}

.btn-box{
  width: calc((100% - 140px) * 0.14);
}

.old-price{
	text-decoration: line-through;
}
</style>
