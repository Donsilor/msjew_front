<template>
  <div class="pay-success">
    <div v-show="stepPayVerify">
      <p  class="color-333 font-size-14 margin-top-10 handing">{{ lang.handing }}</p>
    </div>
    <div v-show="stepPayPending">
      <p  class="color-333 font-size-14 margin-top-10 pending1">{{ lang.PayPending1 }}</p>
      <p  class="color-333 font-size-14 margin-top-10 pending2">{{ lang.PayPending2 }}</p>
      <div class="btn-common btn-gray" @click="goIndex">
        {{ lang.continue }}
      </div>
    </div>
    <div v-show="stepPaySuccess">
      <!-- 已登录 -->
      <div v-if="hadLogin">
        <!-- <p v-show="this.$route.query.success == 'false' && this.verification_status == 'false'" class="color-333 font-size-14 margin-top-10 handing">{{ lang.handing }}</p> -->
        <div class="top">
          <img src="@/static/cart/success.png" />
          <p  class="color-333 font-size-14 margin-top-10 ">{{ lang.title }}</p>
          <p class="color-333 font-size-28 margin-top-10 margin-bottom-30">
            <span class="font-size-16">{{ info.coinCode }}</span>
            {{ info.orderAmount }}
          </p>
        </div>
        <div class="code">
          <span>{{ lang.orderNo }}</span
          ><span
            >{{ info.orderNo
            }}<i
              class="icon iconfont iconcopy copy-btn"
              :data-clipboard-text="info.orderNo"
              @click="copy"
            ></i
          ></span>
        </div>
        <ul class="price">
          <!-- <li v-if="info.preferFee || info.transPreferFee">
            <div class="title">
              {{ lang.preferFee }}
            </div>
            <div v-if="info.preferFee" class="info">
              <span>{{ lang.coupon }}</span>
              <span>-{{ info.coinCode }}{{ info.preferFee }}</span>
            </div>
            <div v-if="info.transPreferFee" class="info">
              <span> {{ lang.transPreferFee }}</span>
              <span>-{{ info.coinCode }}{{ info.transPreferFee }}</span>
            </div>
          </li> -->
          <li>
            <div class="title">
              {{ lang.payInfo }}
            </div>
            <div class="info">
              <span>{{ text }}{{ lang.pay }}</span>
              <span>{{ info.coinCode }}{{ formatMoney(info.orderAmount) }}</span>
            </div>
          </li>
          <li>
            <div class="title">
              <span>{{ lang.beneficiary }}</span>
              <span>BDD.Co.</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 未登录 -->
      <div v-else>
        <!-- <p v-show="this.$route.query.success == 'false' && this.verification_status == 'false'" class="color-333 font-size-14 margin-top-10 handing">{{ lang.handing }}</p> -->
        <div class="top" >
          <img src="@/static/cart/success.png"  />
          <p  class="color-333 font-size-14 margin-top-10 ">{{ lang.title }}</p>
          <p class="color-333 font-size-28 margin-top-10 margin-bottom-30">
            <span class="font-size-16">{{ orderinfo.coinCode }}</span>
            {{ orderinfo.orderAmount }}
          </p>
        </div>
        <div class="code">
          <span>{{ lang.orderNo }}</span
          ><span
            >{{ orderinfo.orderNo
            }}<i
              class="icon iconfont iconcopy copy-btn"
              :data-clipboard-text="orderinfo.orderNo"
              @click="copy"
            ></i
          ></span>
        </div>
        <ul class="price">
          <!-- <li v-if="orderinfo.preferFee || orderinfo.transPreferFee">
            <div class="title">
              {{ lang.preferFee }}
            </div>
            <div v-if="orderinfo.preferFee" class="info">
              <span>{{ lang.coupon }}</span>
              <span>-{{ orderinfo.coinCode }}{{ orderinfo.preferFee }}</span>
            </div>
            <div v-if="orderinfo.transPreferFee" class="info">
              <span> {{ lang.transPreferFee }}</span>
              <span>-{{ orderinfo.coinCode }}{{ orderinfo.transPreferFee }}</span>
            </div>
          </li> -->
          <li>
            <div class="title">
              {{ lang.payInfo }}
            </div>
            <div class="info">
              <span>{{ text }}{{ lang.pay }}</span>
              <span>{{ orderinfo.coinCode }}{{ formatMoney(orderinfo.orderAmount) }}</span>
            </div>
          </li>
          <li>
            <div class="title">
              <span>{{ lang.beneficiary }}</span>
              <span>BDD.Co.</span>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="!hadLogin" class="gologin">
        <i class="icon iconfont icongantanhao2"></i>
        <a @click="gologin(1)"> {{ lang.login }}</a> {{ lang.settlement }}
        <a @click="gologin">{{ lang.accont }}</a
        >{{ lang.any }}
      </div>
      <div class="server">
        <p>{{ lang.server }}</p>
        <p>{{ lang.send }}</p>
        <p>{{ info.afterMail }}</p>
      </div>
      <div class="btn">
        <div
          v-if="info.payChannel === 1"
          class="btn-common btn-black"
          @click="paytips = !paytips"
        >
          {{ lang.paytips }}
        </div>
        <div
          v-if="info.payChannel !== 1&&hadLogin"
          class="btn-common btn-black"
          @click="goDetails"
        >
          {{ lang.lookBill }}
        </div>
        <div
          v-if="info.payChannel !== 1"
          class="btn-common btn-gray btn-black"
          @click="goIndex"
        >
          {{ lang.continue }}
        </div>
        <div v-if="info.payChannel === 1" class="btn-more">
          <span class="btn-common btn-gray" @click="goDetails">{{
            lang.orderDetails
          }}</span>
          <span class="btn-common btn-gray" @click="goIndex">{{
            lang.continue
          }}</span>
        </div>
      </div>
      <PatTips v-if="paytips" @close="paytips = !paytips" />
    </div>
  </div>
</template>

<script>
const storage = process.client ? require('good-storage').default : {}
import { formatMoney } from '@/assets/js/filterUtil.js'
import PatTips from '@/components/cart/paytips.vue'
import Clipboard from 'clipboard'
export default {
  name: 'Paysuccess',
  layout: 'no-bar',
  components: {
    PatTips
  },
  data() {
    return {
      lang: this.LANGUAGE.cart.paySuccess,
      // orderId: this.$route.params.orderId,
      codeNum: 'BDDOR7712794',
      paytips: false,
      info: '',
      text: '',
      typeIndex: 0,
      orderinfo:'',
      isLogin: !!this.$store.state.token,
      list:[],
      stepPayPending:false,//等待处理
      stepPayVerify:true,//支付验证
      stepPaySuccess:false,//支付验证成功
      verifyCount:0,//支付验证次数
    }
  },
  computed: {
    hadLogin() {
      return this.$store.getters.hadLogin
    }
  },
  mounted() {
      if (this.$route.query.success === "false") {
          this.$router.push({
              name: 'cart-payFailed-orderId-price-coinType',
              query: {
                  orderId: this.$route.query.orderId||this.$route.query.order_sn,
              }
          })
      } else {

        if (this.isLogin) {
          this.getinfo()
        }else{
          this.getinfo2()
        }

        setTimeout(this.payVerify, 2000);
      }
  },
  methods: {
    formatMoney: formatMoney,
    showPayPending() {
      //展示成功页面信息
      this.stepPayPending = true
      this.stepPayVerify = false
    },
    goIndex() {
      this.$router.replace({
        name: 'index'
      })
    },
    getinfo() {
      this.$axios({
        url: '/web/member/order/detail',
        method: 'get',
        params: {
          orderId: this.$route.query.orderId
        }
      })
        .then(res => {

          this.info = res
          this.getChannelType(this.info.payChannel)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 未登录
    getinfo2() {
      this.$axios({
        url: '/web/member/order-tourist/detail',
        method: 'get',
        params: {
          order_sn: this.$route.query.order_sn
        }
      })
        .then(res => {
          console.log("dssadas",res)
          this.orderinfo = res
          this.getChannelType(this.orderinfo.payChannel)

        })
        .catch(err => {
          console.log(err)
        })
    },
    payVerify(){

      const _this = this

      this.verifyCount ++

      _this.$axios({
            url: '/web/pay/verify',
            method: 'post',
            timeout:8000,
            data: {
                return_url: window.location.href
            }
        })
        .then(data => {

          if(data.verification_status === 'completed') {
            const arr = []
            this.list.map((item, index) => {
              arr.push(item.localSn)
              this.$store.dispatch('removeCart', arr)
            })
            this.list = JSON.parse(storage.get('myCartList', 0))

            this.stepPaySuccess = true
            this.stepPayVerify = false

          } else if(data.verification_status === 'failed') {
              this.$router.push({
                  name: 'cart-payFailed-orderId-price-coinType',
                  query: {
                      orderId: this.$route.query.orderId||this.$route.query.order_sn,
                  }
              })
          }
          else {
            if(this.verifyCount < 2) {
              setTimeout(this.payVerify, 15000);
            }
            else {
              this.showPayPending()
            }
          }
      })
      .catch(err => {
        setTimeout(this.payVerify, 15000);
      })

    },
    getChannelType(type) {
      // 订单支付渠道(1-电汇,2-paypal,3-微信,4-支付宝,5-visa/Mastercard,6-銀聯,7-paydollar)
      switch (type) {
        case 1:
          this.text = this.lang.text1
          break
        case 6:
          this.text = this.lang.text2
          break
        case 3:
          this.text = this.lang.text3
          break
        case 4:
          this.text = this.lang.text4
          break
        case 5:
          this.text = this.lang.text5
          break
        // case 6:
        //   this.text = this.lang.text6
        //   break
        case 7:
          this.text = this.lang.text7
          break
        default:
          return ''
      }
    },
    returnBack() {
      this.$router.replace({
        name: 'pay',
        params: {
          orderId: this.$route.params.orderId,
          price: this.$route.params.price,
          coinType: this.$route.params.coinType
        }
      })
    },
    goToFail() {
      this.$router.push({
        name: 'paymentMethod'
      })
    },
    copy() {
      const clipboard = new Clipboard('.copy-btn')
      clipboard.on('success', e => {
        this.$toast.show(this.lang.toast1)
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$toast.show(this.lang.toast2)
        clipboard.destroy()
      })
    },
    changeType(ind) {
      this.typeIndex = ind
    },
    goDetails() {
      if (!this.hadLogin) {
        this.$router.replace({
          name: 'cart-anonymousDetail',
          query: {
            info: JSON.stringify(this.info)
          }
        })
      } else {
        this.$router.replace({
          name: 'personal-order'
        })
      }
    },
    gologin(type) {
      let name = 'register'
      if (type === 1) {
        name = 'login'
      }
      this.$router.push({
        name: name
      })
    },
    goOrder() {
      this.$router.replace({
        name: 'personal-order'
      })
    },
    showSelect() {
      console.log('6767')
    }
  }
}
</script>

<style scoped lang="less">
.handing,.pending1{
  padding: 20px;
  color:#f29b87;
  font-size: 20px;
}
.pending2 {
  padding: 20px;
  color:#666666;
  font-size: 12px;
}
.pay-success {
  width: 90%;
  margin: 0 5%;
  .top {
    border-bottom: 1px solid #dddddd;
    img {
      width: 60px;
      margin: 50px 0 10px;
    }
  }
  .code {
    display: flex;
    height: 44px;
    font-size: 14px;
    line-height: 44px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    justify-content: space-between;
    span {
      .iconcopy {
        padding: 6px;
        font-size: 18px;
        color: #a2a2ac;
      }
    }
  }
  .price {
    border-bottom: 1px solid #dddddd;
    border-top: 1px solid #dddddd;
    li {
      font-size: 12px;
      line-height: 25px;
      padding: 5px 10px;
      .title {
        text-align: left;
        font-weight: 400;
        color: #999999;
        display: flex;
        justify-content: space-between;
      }
      .info {
        font-family: PingFangHK-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        text-align: left;
        display: flex;
        justify-content: space-between;
        span {
          display: inline-block;
          font-size: 14px;
        }
        span:nth-child(2n) {
          text-align: right;
        }
      }
    }
    li:nth-child(1) {
      .info {
        color: #947465;
      }
    }
    li:nth-child(2n + 1) {
      background: #fafafa;
    }
  }
  .gologin {
    background: rgba(248, 244, 241, 1);
    border-radius: 5px;
    margin-top: 14px;
    font-size: 12px;
    padding: 5px 8px;
    word-break: keep-all;
    line-height: 18px;
    font-weight: 400;
    color: rgba(148, 116, 101, 1);
    .icongantanhao2 {
      font-size: 12px;
      color: #ffffff;
      background: rgba(189, 147, 127, 1);
      border-radius: 50%;
    }
    a {
      text-decoration: underline;
      color: rgba(148, 116, 101, 1);
    }
    .icongantanhao1 {
      font-size: 12px;
    }
  }
  .server {
    margin: 18px 22px;
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
  .btn {
    .btn-black {
      width: 100%;
    }
    padding-bottom: 25px;
    .btn-more {
      display: flex;
      width: 100%;
      justify-content: space-between;
      span {
        display: inline-block;
        width: 160px;
        margin: 0 0 15px 0;
      }
    }
  }
}
</style>
