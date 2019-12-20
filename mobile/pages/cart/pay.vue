<template>
  <div class="pay">
    <Header :title="lang.pay" tips="1" />
    <div class="proce">
      <span>{{ info.coinType }} </span>
      {{ formatMoney(price) }}
    </div>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <div v-show="price > 0 || (price == 0 && item.type === 5)">
          <img :src="item.url" />
          <div class="right">
            <span
              class="icon iconfont"
              :class="typeIndex === index ? 'icongou' : ''"
              @click="changeType(index)"
            ></span>
            <b
              >{{ item.title }}
              <span
                v-if="item.type == '5'"
                class="ph"
                @click="needtips = !needtips"
                >?</span
              >
            </b>

            <p>{{ item.des }}</p>
            <p v-if="item.des2">{{ item.des2 }}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="tips">
      <i class="icon iconfont icongantanhao1"></i><span>{{ lang.tips }}</span>
    </div>
    <div class="btn" @click="goPaySuccess">
      {{ list[typeIndex].title }}
      {{ lang.goPay }}
      {{ info.coinType }}
      {{ formatMoney(price) }}
    </div>

    <!--    unionPayHide-->
    <div v-show="false">
      <form :action="actionLink" method="post">
        <div v-for="(f, index) in form" :key="index">
          <label :for="f.name">{{ f.name }}</label>
          <input v-model="f.val" :name="f.name" />
        </div>
        <input id="unionPay" type="submit" value="akm" />
      </form>
    </div>

    <NeedKnow v-if="needtips" @close="needtips = !needtips" />
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
import NeedKnow from '@/components/cart/needKnow.vue'
import { formatMoney } from '@/assets/js/filterUtil.js'
export default {
  name: 'Pay',
  layout: 'no-bar',
  components: {
    Header,
    NeedKnow
  },
  data() {
    return {
      lang: this.LANGUAGE.cart.pay,
      coin: this.$store.state.coin,
      form: [],
      actionLink: '',
      list: [
        {
          url: '/cart/pay.png',
          type: 0,
          title: this.LANGUAGE.cart.pay.payType0,
          des: this.LANGUAGE.cart.pay.type0Text
        },
        {
          url: '/cart/card.png',
          type: 1,
          title: this.LANGUAGE.cart.pay.payType1,
          des: this.LANGUAGE.cart.pay.type1Text
        },
        {
          url: '/cart/up.png',
          type: 2,
          title: this.LANGUAGE.cart.pay.payType2,
          des: this.LANGUAGE.cart.pay.type2Text
        },
        {
          url: '/cart/ap.png',
          type: 3,
          title: this.LANGUAGE.cart.pay.payType3,
          des: this.LANGUAGE.cart.pay.type3Text
        },
        {
          url: '/cart/wac.png',
          type: 4,
          title: this.LANGUAGE.cart.pay.payType4,
          des: this.LANGUAGE.cart.pay.type4Text
        },
        {
          url: '/cart/ph.png',
          type: 5,
          title: this.LANGUAGE.cart.pay.payType5,
          des: this.LANGUAGE.cart.pay.type5Text,
          des2: this.LANGUAGE.cart.pay.type5Text2
        }
      ],
      sum: '2,120.00',
      info: JSON.parse(this.$route.query.info),
      price: JSON.parse(this.$route.query.info).orderAmount,
      needtips: false,
      typeIndex: JSON.parse(this.$route.query.info).orderAmount === 0 ? 5 : 0
    }
  },
  created() {
    console.log('w333', JSON.parse(this.$route.query.info))
  },
  methods: {
    formatMoney: formatMoney,
    changeType(ind) {
      this.typeIndex = ind
      if (ind === 5) {
        this.price = this.info.orderAmount * 0.985
      } else {
        this.price = this.info.orderAmount
      }
    },
    goPaySuccess() {
      this.isPay = true
      let pay = 0
      if (this.typeIndex === 5) {
        pay = 1
      } else if (this.typeIndex === 1 || this.typeIndex === 0) {
        pay = 2
      } else if (
        this.typeIndex === 4 ||
        this.typeIndex === 3 ||
        this.typeIndex === 2
      ) {
        pay = 7
      }
      this.$axios({
        method: 'post',
        url: `/wap/pay/toPay`,
        params: {
          orderId: this.info.orderId,
          payChannel: pay
        }
      })
        .then(res => {
          if (res) {
            if (pay !== 7) {
              window.location.replace(res)
            } else {
              const promise = new Promise((resolve, reject) => {
                this.form = []
                const obj = JSON.parse(res)
                const objKey = Object.keys(obj)
                for (const i in objKey) {
                  if (objKey[i] === 'url') {
                    this.actionLink = obj[objKey[i]]
                    continue
                  }
                  const o = {
                    name: objKey[i],
                    val: obj[objKey[i]]
                  }
                  this.form.push(o)
                }
                resolve()
              })
              promise.then(() => {
                setTimeout(() => {
                  this.isPay = false
                  document.getElementById('unionPay').click()
                }, 2000)
              })
            }
          } else if (!res) {
            this.isPay = false
            this.$router.replace({
              name: 'cart-paySuccess-orderId-price-coinType',
              params: {
                orderId: this.info.orderId,
                price: this.info.orderAmount,
                coinType: this.info.coinType
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$router.replace({
            name: 'cart-payFailed-orderId-price-coinType',
            params: {
              orderId: this.info.orderId,
              price: this.info.orderAmount,
              coinType: this.info.coinType
            }
          })
        })
    },
    showSelect() {
      console.log('6767')
    }
  }
}
</script>

<style scoped lang="less">
.pay {
  padding-bottom: 20px;
  .proce {
    padding: 30px 0 20px;
    font-size: 28px;
    font-family: twCenMt;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    border-bottom: 8px solid #f6f6f6;
    span {
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
  ul {
    li {
      width: 100%;
      img {
        width: 32px;
        height: 32px;
        margin: 16px;
        float: left;
      }
      .right {
        position: relative;
        text-align: left;
        margin-left: 64px;
        padding: 10px 0px 12px;
        border-bottom: 1px solid #dddddd; /*no*/
        span {
          float: right;
          width: 20px;
          height: 20px;
          margin: 12px 12px 0 0;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(187, 187, 187, 1); /*no*/
          border-radius: 50%;
        }
        .ph {
          display: inline-block;
          float: none;
          width: 16px;
          height: 16px;
          background: rgba(242, 155, 135, 1);
          border-radius: 50%;
          font-size: 12px;
          line-height: 16px;
          color: #ffffff;
          text-align: center;
          border: none;
        }
        .icongou {
          background: rgba(242, 155, 135, 1);
          border-radius: 50%;
          font-size: 18px;
          line-height: 20px;
          color: #ffffff;
          text-align: center;
          border: 1px solid rgba(242, 155, 135, 1); /*no*/
        }
        b {
          font-size: 14px;
          line-height: 24px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        p {
          font-size: 12px;
          line-height: 20px;
          width: 86%;
          word-break: keep-all;
          font-family: PingFangHK-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }
  .tips {
    padding: 15px 0 20px;
    i {
      font-size: 14px;
      color: #999999;
      margin-right: 2px;
    }
    span {
      font-size: 12px;
      line-height: 14px;
      color: #999999;
    }
  }
  .btn {
    width: 345px;
    height: 40px;
    margin: 0 auto;
    background: rgba(51, 51, 51, 1);
    border-radius: 8px;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
