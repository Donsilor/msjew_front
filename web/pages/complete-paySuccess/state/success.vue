<template>
  <div class="success">
    <div class="order-step">
      <div class="one-step">
        <div class="step-img">
          <img src="../../../static/order/step.png" alt="" />
          <span>1</span>
        </div>
        <div class="step-arrow">
          <img src="../../../static/order/arrow.png" alt="" />
        </div>
        <div class="step-title">{{ $t(`${lang}.confirmOrder`) }}</div>
        <div class="step-desc">{{ $t(`${lang}.finishOrderInfo`) }}</div>
      </div>
      <div class="one-step">
        <div class="step-img">
          <img src="../../../static/order/step.png" alt="" />
          <span>2</span>
        </div>
        <div class="step-arrow">
          <img src="../../../static/order/arrow.png" alt="" />
        </div>
        <div class="step-title">{{ $t(`${lang}.orderPay`) }}</div>
        <div class="step-desc">{{ $t(`${lang}.payWay`) }}</div>
      </div>
      <div class="one-step">
        <div class="step-img">
          <img src="../../../static/order/step.png" alt="" />
          <span>3</span>
        </div>
        <div class="step-arrow">
          <img src="../../../static/order/arrow.png" alt="" />
        </div>
        <div class="step-title">{{ $t(`${lang}.finishPay`) }}</div>
        <div class="step-desc">{{ $t(`${lang}.balabalabala`) }}</div>
      </div>
      <div class="step-line" />
    </div>
    <no-ssr>
      <!--登陆的中间信息-->
      <div v-if="$store.getters.hadLogin" class="success-info-in">
        <div v-show="stepPaySuccess">
          <div class="diamond-img">
            <img src="../../../static/order/diamond.png" alt="" />
            <div><i class="iconfont icongou" /></div>
          </div>
          <div class="order-email">
            <!-- <span>{{ $t(`${lang}.weWillSendTo`) }}</span
            ><span>{{ data.afterMail }}</span
            > -->
            <!-- <i class="iconfont iconzuoshangjiantou" /> -->
          </div>
          <div class="order-send">{{ $t(`${lang}.daysGone`) }}</div>
          <div class="order-num">
            {{ $t(`${lang}.orderCode`) }}
              <nuxt-link :to="`/account/order-details?orderId=${this.oid}`">
                <span class="underline" >{{ data.orderNo }}</span>
              </nuxt-link>
          </div>
          <nuxt-link :to="{name: '/order-details'}"></nuxt-link>
          <!-- <div class="order-num">
            <nuxt-link :to="{name: '/account/orders'}">{{ $t(`${lang}.comeBack`) }}</nuxt-link>
          </div> -->
        </div>
        <div v-show="stepPayVerify">
          <p class="handing">{{ $t(`${lang}.handing`) }}</p>
        </div>
        <div v-show="stepPayPending">
          <p class="pending1">{{ $t(`${lang}.PayPending1`) }}</p>
          <p class="pending2">{{ $t(`${lang}.PayPending2`) }}</p>
        </div>
      </div>

      <!--未登陆的中间信息-->
      <div v-else class="success-info-out">
        <div class="left-side">
          <div v-show="stepPaySuccess">
            <div class="diamond-img">
              <img src="../../../static/order/diamond.png" alt="" />
              <div><i class="iconfont icongou" /></div>
            </div>
            <div class="order-email">
              <!-- <span>{{ $t(`${lang}.weWillSendTo`) }}</span>
              <span>{{ data.afterMail }}</span> -->
              <!-- <i class="iconfont iconzuoshangjiantou" /> -->
            </div>
            <div class="order-send">{{ $t(`${lang}.daysGone`) }}</div>
            <div class="order-num">
            {{ $t(`${lang}.orderCode`) }}
              <!-- <nuxt-link :to="`/account/order-details?orderId=${this.oid}`"> -->
                <span>{{ data2.orderNo }}</span>
                <i class="icon iconfont iconcopy copy-btn" :data-clipboard-text="data2.orderNo" @click="copy"></i>
              <!-- </nuxt-link> -->
          </div>
          </div>
          <div v-show="stepPayVerify">
            <p class="handing">{{ $t(`${lang}.handing`) }}</p>
          </div>
          <div v-show="stepPayPending">
            <p class="pending1">{{ $t(`${lang}.PayPending1`) }}</p>
            <p class="pending2">{{ $t(`${lang}.PayPending2`) }}</p>
          </div>
        </div>
        <!-- <div class="right-side">
          <div class="new-address-title">
            <div class="na-line" />
            <div class="na-title">{{ $t(`${lang}.registered`) }}</div>
          </div>
          <div class="login-word">
            {{ $t(`${lang}.balabalabalaAgain`) }}
          </div>
          <div class="login-btn" @click="toLogin">
            {{ $t(`${lang}.registered`) }}
          </div>
        </div> -->
      </div>
      <div class="order-info">
      </div>
    </no-ssr>
  </div>
</template>

<script>

const lang = `finishPay`
import Clipboard from 'clipboard'
// console.log("aa",$t(`${lang}.hangding`))
export default {
  name: 'Success',
  data() {
    return {
      lang,
      oid: this.$route.query.order_sn||this.$route.query.orderId,
      orderSn:this.$route.query.orderSn,
      return_url:'',
      data: {
        allSend: null,
        coinCode: null,
        coinId: null,
        id: null,
        logisticsFee: null,
        address: {
          address: null,
          addressType: null,
          cityId: null,
          cityName: null,
          countryId: null,
          countryName: null,
          createTime: null,
          firstName: '',
          id: null,
          lastName: '',
          orderId: null,
          provinceId: null,
          provinceName: null,
          userAccount: null,
          userId: null,
          userMail: null,
          userTel: null,
          userTelCode: null,
          zipCode: null
        },
        orderAmount: null,
        orderNo: null,
        orderStatus: null,
        otherFee: null,
        preferFee: null,
        productAmount: null,
        productCount: null,
        recvType: null,
        safeFee: null,
        taxFee: null
      },
      data2: {
        allSend: null,
        coinCode: null,
        coinId: null,
        id: null,
        logisticsFee: null,
        address: {
          address: null,
          addressType: null,
          cityId: null,
          cityName: null,
          countryId: null,
          countryName: null,
          createTime: null,
          firstName: '',
          id: null,
          lastName: '',
          orderId: null,
          provinceId: null,
          provinceName: null,
          userAccount: null,
          userId: null,
          userMail: null,
          userTel: null,
          userTelCode: null,
          zipCode: null
        },
        orderAmount: null,
        orderNo: null,
        orderStatus: null,
        otherFee: null,
        preferFee: null,
        productAmount: null,
        productCount: null,
        recvType: null,
        safeFee: null,
        taxFee: null
      },
      verify_statue:'',
      stepPayPending:true,//等待处理
      stepPayVerify:false,//支付验证
      stepPaySuccess:false,//支付验证成功
      verifyCount:0  ,//支付验证次数
      goodsInfo: {
        value: 0,
        currency: '',
        content_ids: [],
        content_type: 'product'
      },
      ChannelType:this.$route.query.ChannelType,
    }
  },
  mounted() {
      if(this.$route.query.success === "false") {
        this.$router.replace({
          path: '/complete-paySuccess/state/failed',
          query: {
            orderId: this.$route.query.orderId || this.$route.query.order_sn,
          }
        })
      } else {
        //订单信息
        this.orderInfo()

        //验证
        setTimeout(this.payVerify, 2000);
      }
  },
  methods: {
    copy() {
      const clipboard = new Clipboard('.copy-btn')
      clipboard.on('success', e => {
        this.$successMessage(this.$t(`${lang}.toast1`))
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$errorMessage(this.$t(`${lang}.toast2`))
        clipboard.destroy()
      })
    },
    toLogin() {
      this.$router.push(`/login`)
    },
    showPaySuccess() {
      //展示成功页面信息
      this.stepPaySuccess = true
      this.stepPayPending = false

      // facebook 购买成功统计-start
      fbq('track','Purchase',this.goodsInfo);
      // facebook 购买成功统计-end

      //移除本地购物车
      this.$store.dispatch('getLocalCartOrder').then(v => {
        this.$store.dispatch('removeCart', v.split(','))
      })
    },
    showPayFailed() {
      //验证失败，跳转到失败页面
      this.$router.replace({
        path: '/complete-paySuccess/state/failed',
        query: {
          orderId: this.$route.query.orderId || this.$route.query.order_sn
        }
      })
    },
    showPayPending() {
      //展示成功页面信息
      this.stepPayPending = true
      this.stepPayVerify = false
    },
    orderInfo() {
    if(this.$store.getters.hadLogin){
        this.$axios
          .get('/web/member/order/detail', {
            params: {
              orderId: this.oid
            }
          })
          .then(res => {
            // console.log('res',res.data)
            this.data = res.data
            this.goodsInfo.value = res.data.payAmount;
            this.goodsInfo.currency = res.data.coinCode;

            var details = res.data.details;

            details.forEach((o, i) =>{
                this.goodsInfo.content_ids[i] = o.goodsId
            })

            // console.log(777, this.goodsInfo)

          })
          .catch(err => {
            if (!err.response) {
              this.$message.error(err.message)
            } else {
              // console.log(err)
            }
        })
      }else{
        this.$axios
          .get('/web/member/order-tourist/detail', {
            params: {
              order_sn: this.oid
            }
          })
          .then(res => {
            this.data2 = res.data
            this.goodsInfo.value = res.data.payAmount;
            this.goodsInfo.currency = res.data.coinCode;

            var details = res.data.details;

            details.forEach((o, i) => {
              this.goodsInfo.content_ids[i] = o.goodsId
            })


          })
          .catch(err => {
            if (!err.response) {
              this.$message.error(err.message)
            } else {
              // console.log(err)
            }
        })
      }
    },
    payVerify() {
      let baseUrl=this.$store.getters.baseUrl
      this.verifyCount++
      let order_sn = this.orderSn
      let return_url =''
      if(this.ChannelType == 1){
        return_url = baseUrl+'/verify?order_sn='+order_sn
      } else {
        return_url = window.location.href
      }
      this.$axios({
          url: '/web/pay/verify',
          method: 'post',
          //timeout:60000,
          data: {
            return_url: return_url
          }
      }).then(res => {
          const data = res.data
          if (data.verification_status === 'completed') {
            this.showPaySuccess()
          } else if (data.verification_status === 'failed') {
            this.showPayFailed()
          } else {
            //对处理中的状态，重试查询5次后，展示留意消息
            if (this.verifyCount < 2) {
              setTimeout(this.payVerify, 15000)
            }
            else {
              this.showPayPending()
            }
          }
        })
        .catch(err => {
          setTimeout(this.payVerify, 15000)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.handing,.pending1{
  padding: 20px;
  color:#f29b87;
  font-size: 40px;
}
.pending2 {
  padding: 20px;
  color:#666666;
  font-size: 18px;
}
div {
  box-sizing: border-box;
}
.success {
  max-width: 1360px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  text-align: left;
  background: rgba(248, 248, 248, 1);
  padding: 33px 30px 38px;
  box-sizing: border-box;
  .order-step {
    max-width: 1300px;
    height: 182px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    position: relative;
    justify-content: center;
    padding-top: 36px;
    margin-bottom: 20px;
    .one-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      margin-right: 250-31-31px;
      position: relative;
      z-index: 9;
      .step-img {
        width: 58px;
        height: 58px;
        background: rgba(225, 225, 225, 1);
        border: 4px solid rgba(217, 217, 217, 1);
        border-radius: 50%;
        text-align: center;
        line-height: 50px;
        color: #fff;
        font-size: 22px;
        position: relative;
        box-sizing: border-box;
        margin-bottom: 4px;
        img {
          position: absolute;
          top: -4px;
          left: -4px;
          width: 58px;
          height: 58px;
          display: block;
        }
        span {
          position: relative;
          z-index: 10;
        }
      }
      .step-arrow {
        width: 12px;
        height: 6px;
        margin-bottom: 9px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .step-title {
        font-size: 18px;
        color: #666;
        line-height: 18px;
        margin-bottom: 10px;
      }
      .step-desc {
        color: #666;
        line-height: 16px;
        width: 121px;
        text-align: center;
        font-size: 12px;
      }
    }
    .one-step:nth-child(3) {
      margin-right: 0;
    }
    .step-line {
      position: absolute;
      top: 65px;
      left: 50%;
      transform: translateX(-50%);
      width: 250 * 2+58+20px;
      height: 4px;
      background: linear-gradient(
        270deg,
        rgba(234, 186, 196, 1) 0%,
        rgba(215, 136, 155, 1) 97%
      );
      box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0);
      z-index: 0;
    }
  }
  .success-info-in {
    max-width: 1300px;
    height: 340px;
    background: rgba(255, 255, 255, 1);
    padding-top: 59px;
    text-align: center;
    .diamond-img {
      width: 75px;
      height: 59px;
      margin: 0 auto 27px;
      position: relative;
      img {
        width: 75px;
        /*height: 59px;*/
        display: block;
      }
      div {
        position: absolute;
        width: 34px;
        height: 34px;
        background: rgba(207, 164, 141, 1);
        border-radius: 50%;
        text-align: center;
        right: -8px;
        bottom: -8px;
        i {
          display: block;
          width: 34px;
          height: 34px;
          line-height: 34px;
          color: #fff;
          font-size: 20px;
        }
      }
    }
    .order-email {
      font-size: 14px;
      color: #333;
      line-height: 14px;
      /*display: flex;*/
      /*align-items: center;*/
      /*justify-content: center;*/
      span:nth-child(2) {
        color: #aa8a7b;
        text-decoration: underline;
        cursor: pointer;
      }
      i {
        /*display: block;*/
        width: 19px;
        height: 20px;
        color: #666;
        font-size: 20px;
        line-height: 20px;
      }
    }
    .order-send {
      margin-top: 7px;
      font-size: 14px;
      color: #333;
      line-height: 14px;
    }
    .order-num {
      margin: 8px 0 30px;
      font-size: 14px;
      color: #333;
      line-height: 14px;
      span {
        color: #d9423e;
      }
    }
    .order-guide {
      width: 160px;
      height: 30px;
      line-height: 30px;
      background: rgba(176, 160, 155, 1);
      margin: 0 auto;
      color: #fff;
      text-align: center;
      cursor: pointer;
      font-size: 14px;
    }
  }
  .success-info-out {
    width: 1300px;
    height: 340px;
    background: rgba(255, 255, 255, 1);
    text-align: center;
    display: flex;
    justify-content: center;
    .left-side {
      width: 50%;
      padding-top: 59px;
      .diamond-img {
        width: 75px;
        height: 59px;
        margin: 0 auto 27px;
        position: relative;
        img {
          width: 75px;
          /*height: 59px;*/
          display: block;
        }
        div {
          position: absolute;
          width: 34px;
          height: 34px;
          background: rgba(207, 164, 141, 1);
          border-radius: 50%;
          text-align: center;
          right: -8px;
          bottom: -8px;
          i {
            display: block;
            width: 34px;
            height: 34px;
            line-height: 34px;
            color: #fff;
            font-size: 20px;
          }
        }
      }
      .order-email {
        font-size: 14px;
        color: #333;
        line-height: 14px;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        span:nth-child(2) {
          color: #aa8a7b;
          text-decoration: underline;
          cursor: pointer;
        }
        i {
          /*display: block;*/
          width: 19px;
          height: 20px;
          color: #666;
          font-size: 20px;
          line-height: 20px;
        }
      }
      .order-send {
        margin-top: 7px;
        font-size: 14px;
        color: #333;
        line-height: 14px;
      }
      .order-num {
        margin: 8px 0 30px;
        font-size: 14px;
        color: #333;
        line-height: 14px;
        span {
          color: #d9423e;
        }
      }
      .order-guide {
        width: 160px;
        height: 30px;
        line-height: 30px;
        background: rgba(176, 160, 155, 1);
        margin: 0 auto;
        color: #fff;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
      }
    }
    .right-side {
      width: 50%;
      padding: 60px 0 0 50px;
      .new-address-title {
        width: 1300-51-36px;
        height: 20px;
        display: flex;
        align-items: flex-end;
        margin-bottom: 38px;
        .na-line {
          width: 4px;
          height: 20px;
          background: rgba(207, 164, 141, 1);
          border-radius: 2px;
          margin-right: 8px;
        }
        .na-title {
          font-size: 20px;
          color: #333;
          line-height: 20px;
          margin-right: 11px;
        }
      }
      .login-word {
        line-height: 30px;
        font-size: 14px;
        color: #333;
        width: 442px;
        margin: 0 0 41px 8px;
        text-align: left;
      }
      .login-btn {
        width: 160px;
        height: 30px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(139, 118, 108, 1);
        margin-left: 8px;
        text-align: center;
        line-height: 30px;
        color: #8b766c;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
  .middle-bar {
    font-size: 16px;
    color: #fff;
    text-align: center;
    width: 1300px;
    height: 30px;
    background: linear-gradient(
      270deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(218, 146, 163, 1) 47%,
      rgba(255, 255, 255, 1) 100%
    );
    line-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      display: block;
      width: 24px;
      height: 19px;
      line-height: 19px;
      font-size: 28px;
      margin-right: 6px;
    }
  }
  .order-info {
    width: 1300px;
    display: flex;
    justify-content: space-between;
    .left-info {
      width: 635px;
      height: 520px;
      .address-info {
        width: 635px;
        height: 230px;
        background: rgba(255, 255, 255, 1);
        margin-bottom: 22px;
        padding: 26px 53px 0 50px;
        position: relative;
        .new-address-title {
          width: 1300-51-36px;
          height: 20px;
          display: flex;
          align-items: flex-end;
          margin-bottom: 17px;
          .na-line {
            width: 4px;
            height: 20px;
            background: rgba(207, 164, 141, 1);
            border-radius: 2px;
            margin-right: 8px;
          }
          .na-title {
            font-size: 20px;
            color: #333;
            line-height: 20px;
            margin-right: 11px;
          }
        }
        .user-info {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          .user-name {
            font-size: 22px;
            color: #111;
            line-height: 22px;
            span {
              font-size: 16px;
            }
          }
          .user-phone {
            font-size: 20px;
            color: #333;
            span {
              font-size: 16px;
            }
          }
        }
        .user-address {
          font-size: 12px;
          color: #666;
          width: 100%;
          height: 16 * 2px;
          line-height: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          word-break: break-all;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 8px;
        }
        .user-phone {
          display: flex;
          align-items: flex-end;
          font-family: twCenMt;
          font-size: 18px;
          color: #333;
          margin-bottom: 5px;
          div:nth-child(1) {
            font-size: 14px;
            margin-right: 5px;
          }
        }
        .post-num,
        .email-address,
        .country-code {
          font-size: 12px;
          color: #666;
          line-height: 12px;
          margin-bottom: 9px;
        }
        .line {
          position: absolute;
          width: 100%;
          height: 10px;
          bottom: 0;
          left: 0;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .send-info {
        width: 635px;
        height: 280px;
        background: rgba(255, 255, 255, 1);
        padding: 25px 50px;
        .new-address-title {
          width: 1300-51-36px;
          height: 20px;
          display: flex;
          align-items: flex-end;
          margin-bottom: 17px;
          .na-line {
            width: 4px;
            height: 20px;
            background: rgba(207, 164, 141, 1);
            border-radius: 2px;
            margin-right: 8px;
          }
          .na-title {
            font-size: 20px;
            color: #333;
            line-height: 20px;
            margin-right: 11px;
          }
        }
        .send-infos {
          font-size: 12px;
          color: #333;
          line-height: 22px;
          span {
            color: #aa8a7b;
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
    .right-info {
      width: 635px;
      height: 432px;
      background: rgba(255, 255, 255, 1);
      padding: 23px 40px 0 35px;
      .new-address-title {
        width: 1300-51-36px;
        height: 20px;
        display: flex;
        align-items: flex-end;
        margin-bottom: 17px;
        .na-line {
          width: 4px;
          height: 20px;
          background: rgba(207, 164, 141, 1);
          border-radius: 2px;
          margin-right: 8px;
        }
        .na-title {
          font-size: 20px;
          color: #333;
          line-height: 20px;
          margin-right: 11px;
        }
      }
      .order-infos {
        .info-line {
          width: 100%;
          height: 36px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 11px 0 16px;
          input {
            text-align: right;
            width: 230px;
            height: 18px;
            font-size: 16px;
            line-height: 16px;
            -webkit-appearance: none;
            border: 0;
            outline: 0;
            padding: 0;
            margin: 0;
            background: white;
          }
          .ff {
            font-family: twCenMt;
            font-size: 12px;
            color: #111;
          }
          .copy-btn {
            float: right;
            width: 40px;
            height: 20px;
            line-height: 18px;
            background: rgba(245, 244, 244, 1);
            border: 1px solid rgba(174, 174, 174, 1);
            border-radius: 4px;
            text-align: center;
            cursor: pointer;
            margin-left: 10px;
            color: #666;
            font-size: 12px;
          }
          .label {
            font-size: 12px;
            color: #656565;
          }
          .color-gold {
            color: #aa8a7b;
            font-size: 16px;
            line-height: 20px;
          }
          .color-pink {
            color: #f29b87;
          }
        }
        .info-line:nth-child(2n) {
          background: rgba(249, 249, 249, 1);
        }
        .big-info {
          margin-top: 19px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 11px 0 15px;
          div:nth-child(1) {
            font-size: 16px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
          }
          div:nth-child(2) {
            font-size: 20px;
            font-family: twCenMt;
            font-weight: bold;
            color: rgba(27, 27, 27, 1);
          }
        }
      }
    }
  }
}
.underline{
  text-decoration:underline
}

.copy-btn{
  cursor: pointer;
}
</style>
